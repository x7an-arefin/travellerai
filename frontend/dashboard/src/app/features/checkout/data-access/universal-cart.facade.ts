import { Injectable, signal, computed, inject } from '@angular/core'
import { CartItem, SplitSettlementAllocation } from './models/cart.model'
import { CheckoutApiService } from './services/checkout-api.service'
import { CheckoutCustomerInfo, CheckoutPaymentInfo, CheckoutPayload } from './models/checkout-api.types'

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'BDT' | 'AED'

export interface CurrencyRate {
  code: CurrencyCode
  symbol: string
  rate: number // Multiplier against USD
}

export const SUPPORTED_CURRENCIES: Record<CurrencyCode, CurrencyRate> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78 },
  BDT: { code: 'BDT', symbol: '৳', rate: 121.5 },
  AED: { code: 'AED', symbol: 'AED ', rate: 3.67 },
}

@Injectable({
  providedIn: 'root',
})
export class UniversalCartFacade {
  private readonly checkoutApi = inject(CheckoutApiService)

  // Sample multi-vendor bundle representing an all-in-one trip
  readonly items = signal<CartItem[]>([
    {
      id: 'cart-1',
      type: 'hotel_stay',
      providerId: 'prov-hotel-101',
      providerName: 'Grand Sylhet 5-Star Resort & Spa',
      title: 'Deluxe King Suite (Bed & Breakfast)',
      subtitle: '3 Nights • Sep 18 - Sep 21 • 2 Adults',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500',
      startDate: '2026-09-18',
      endDate: '2026-09-21',
      quantityOrGuests: 2,
      unitPrice: 180,
      totalPrice: 540,
      cancellationPolicy: 'flexible_24h',
      metadata: { roomUnitType: 'Deluxe King', floor: 4 },
    },
    {
      id: 'cart-2',
      type: 'airport_transfer',
      providerId: 'prov-fleet-202',
      providerName: 'Apex Chauffeur Fleet Services',
      title: 'Airport Meet & Greet Transfer',
      subtitle: 'Sylhet Osmani Airport (ZYL) ➔ Grand Sylhet Resort',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500',
      startDate: '2026-09-18',
      quantityOrGuests: 2,
      unitPrice: 65,
      totalPrice: 65,
      securityDeposit: 0,
      cancellationPolicy: 'flexible_24h',
      metadata: { vehicleCategory: 'VIP Chauffeur Sedan', flightNumber: 'BG-601' },
    },
    {
      id: 'cart-3',
      type: 'tour_package',
      providerId: 'prov-tour-303',
      providerName: 'Bengal Trailblazers Tour Operations',
      title: 'Ratargul Freshwater Swamp Forest & Tea Highlands Trek',
      subtitle: 'Full-Day Guided Eco-Expedition • All Gear Included',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500',
      startDate: '2026-09-19',
      quantityOrGuests: 2,
      unitPrice: 120,
      totalPrice: 240,
      cancellationPolicy: 'moderate_5d',
      metadata: { guideIncluded: true, lunchIncluded: true },
    },
    {
      id: 'cart-4',
      type: 'vehicle_rental',
      providerId: 'prov-fleet-202',
      providerName: 'Apex Chauffeur Fleet Services',
      title: 'Self-Drive 4x4 Expedition SUV (Mahindra Thar / Pajero)',
      subtitle: '1 Day Day-Trip Rental • CDW Collision Protection Included',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500',
      startDate: '2026-09-20',
      endDate: '2026-09-21',
      quantityOrGuests: 1,
      unitPrice: 110,
      totalPrice: 110,
      securityDeposit: 150, // Refundable hold
      cancellationPolicy: 'flexible_24h',
      metadata: { freeKm: 200, fuelPolicy: 'full_to_full' },
    },
  ])

  readonly selectedCurrency = signal<CurrencyCode>('USD')
  readonly isCheckingOut = signal<boolean>(false)
  readonly checkoutSuccess = signal<boolean>(false)
  readonly lastBookingReference = signal<string>('')
  readonly lastBookingId = signal<string>('')

  // Currency helper
  readonly activeCurrency = computed(() => SUPPORTED_CURRENCIES[this.selectedCurrency()])

  // Price calculations
  readonly subtotal = computed(() => {
    return this.items().reduce((sum, item) => sum + item.totalPrice, 0)
  })

  // Dynamic Multi-Modal Bundle Discount: 12% off if 2 or more distinct service categories are in cart!
  readonly isBundleEligible = computed(() => {
    const distinctTypes = new Set(this.items().map((i) => i.type))
    return distinctTypes.size >= 2
  })

  readonly bundleDiscountAmount = computed(() => {
    if (!this.isBundleEligible()) return 0
    // 12% bundle discount on base services
    return Math.round(this.subtotal() * 0.12)
  })

  readonly refundableSecurityDepositTotal = computed(() => {
    return this.items().reduce((sum, item) => sum + (item.securityDeposit || 0), 0)
  })

  readonly platformServiceFee = computed(() => {
    // 3.5% marketplace processing & guarantee fee
    return Math.round(this.subtotal() * 0.035)
  })

  readonly grandTotal = computed(() => {
    return this.subtotal() - this.bundleDiscountAmount() + this.platformServiceFee() + this.refundableSecurityDepositTotal()
  })

  // Multi-Party Split Settlement Breakdown
  readonly splitAllocation = computed<SplitSettlementAllocation>(() => {
    const items = this.items()
    const subtotal = this.subtotal()
    const platformCommission = Math.round(subtotal * 0.12) // Average 12% marketplace commission
    const escrowDeposit = this.refundableSecurityDepositTotal()

    const vendorMap = new Map<string, { providerId: string; providerName: string; serviceType: string; netAmount: number }>()

    for (const item of items) {
      const net = Math.round(item.totalPrice * 0.88)
      if (vendorMap.has(item.providerId)) {
        const existing = vendorMap.get(item.providerId)!
        existing.netAmount += net
      } else {
        vendorMap.set(item.providerId, {
          providerId: item.providerId,
          providerName: item.providerName,
          serviceType: item.type.replace('_', ' ').toUpperCase(),
          netAmount: net,
        })
      }
    }

    return {
      totalAmount: this.grandTotal(),
      platformCommission,
      refundableEscrowDeposit: escrowDeposit,
      vendorPayouts: Array.from(vendorMap.values()),
    }
  })

  // Currency Converter helper
  formatMoney(amountInUsd: number): string {
    const currency = this.activeCurrency()
    const converted = amountInUsd * currency.rate
    return `${currency.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: currency.code === 'BDT' ? 0 : 2, maximumFractionDigits: currency.code === 'BDT' ? 0 : 2 })}`
  }

  // Cart operations
  addItem(item: CartItem): void {
    this.items.update((list) => [...list, item])
  }

  removeItem(itemId: string): void {
    this.items.update((list) => list.filter((i) => i.id !== itemId))
  }

  clearCart(): void {
    this.items.set([])
  }

  setCurrency(code: CurrencyCode): void {
    this.selectedCurrency.set(code)
  }

  async processCheckout(customer?: CheckoutCustomerInfo, payment?: CheckoutPaymentInfo): Promise<string> {
    this.isCheckingOut.set(true)
    try {
      const payload: CheckoutPayload = {
        customer: customer || {
          firstName: 'Sultanul',
          lastName: 'Arefin',
          email: 'arefin@traveller.ai',
          phone: '+880 1711 999888',
        },
        payment: payment || {
          method: 'card',
          gateway: 'stripe',
        },
        items: this.items(),
        splitAllocation: this.splitAllocation(),
        subtotal: this.subtotal(),
        bundleDiscountAmount: this.bundleDiscountAmount(),
        platformServiceFee: this.platformServiceFee(),
        refundableSecurityDepositTotal: this.refundableSecurityDepositTotal(),
        grandTotal: this.grandTotal(),
        currencyCode: this.selectedCurrency(),
      }

      const res = await this.checkoutApi.executeCheckout(payload)
      if (res.ok) {
        this.lastBookingReference.set(res.data.bookingReference)
        this.lastBookingId.set(res.data.bookingId)
        this.checkoutSuccess.set(true)
        return res.data.bookingReference
      }
      throw new Error(res.error)
    } finally {
      this.isCheckingOut.set(false)
    }
  }

  resetCheckout(): void {
    this.checkoutSuccess.set(false)
    this.lastBookingReference.set('')
    this.lastBookingId.set('')
  }
}

