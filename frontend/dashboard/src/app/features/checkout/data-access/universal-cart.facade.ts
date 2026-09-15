import { Injectable, signal, computed, inject } from '@angular/core'
import { toast } from 'ngx-sonner'
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

const STORAGE_KEY = 'travellerai_cart_v2'

@Injectable({
  providedIn: 'root',
})
export class UniversalCartFacade {
  private readonly checkoutApi = inject(CheckoutApiService)

  readonly items = signal<CartItem[]>(this.loadFromStorage())
  readonly totalItems = computed(() => this.items().length)

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
    if (this.items().some((i) => i.id === item.id)) {
      toast.info(`"${item.title}" is already in your cart.`)
      return
    }
    const updated = [...this.items(), item]
    this.items.set(updated)
    this.persist(updated)
    toast.success(`"${item.title}" added to cart!`)
  }

  removeItem(itemId: string): void {
    const updated = this.items().filter((i) => i.id !== itemId)
    this.items.set(updated)
    this.persist(updated)
  }

  clearCart(): void {
    this.items.set([])
    this.persist([])
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
        this.clearCart()
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

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  private persist(items: CartItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }
}
