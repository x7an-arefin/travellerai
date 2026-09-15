import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCreditCard,
  lucideShieldCheck,
  lucideLock,
  lucideCheck,
  lucideSparkles,
  lucideArrowRight,
  lucideBedDouble,
  lucideCar,
  lucideMapPin,
  lucideClock,
  lucideTrash2,
  lucideQrCode,
  lucidePrinter,
  lucideBuilding2,
  lucideDollarSign,
  lucideRefreshCw,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmInputImports } from '../../ui/input/hlm-input.directive'
import { UniversalCartFacade, CurrencyCode } from './data-access/universal-cart.facade'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    SearchComponent,
    ThemeSwitchComponent,
    ConfigDrawerComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmInputImports,
  ],
  providers: [
    provideIcons({
      lucideCreditCard,
      lucideShieldCheck,
      lucideLock,
      lucideCheck,
      lucideSparkles,
      lucideArrowRight,
      lucideBedDouble,
      lucideCar,
      lucideMapPin,
      lucideClock,
      lucideTrash2,
      lucideQrCode,
      lucidePrinter,
      lucideBuilding2,
      lucideDollarSign,
      lucideRefreshCw,
    }),
  ],
  template: `
    <!-- Top Header -->
    <app-header [fixed]="true">
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-config-drawer />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main Checkout View -->
    <app-main [fixed]="true" class="space-y-6 max-w-6xl mx-auto py-6">
      <!-- Title & Currency Bar -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight text-foreground">Universal Travel Checkout</h1>
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              Multi-Vendor Aggregator
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Single payment checkout combining hotels, vehicle transfers, and tour experiences with automated escrow settlement.
          </p>
        </div>

        <!-- Multi-Currency Selector -->
        <div class="flex items-center gap-1.5 p-1 rounded-lg border border-border bg-card shadow-2xs">
          <span class="text-[11px] font-semibold text-muted-foreground px-2">Currency:</span>
          @for (c of currencies; track c) {
            <button
              type="button"
              (click)="cart.setCurrency(c)"
              [class]="cart.selectedCurrency() === c ? 'bg-primary text-primary-foreground font-bold shadow-2xs' : 'hover:bg-muted text-muted-foreground'"
              class="px-2.5 py-1 rounded text-xs transition-colors cursor-pointer"
            >
              {{ c }}
            </button>
          }
        </div>
      </div>

      @if (cart.checkoutSuccess()) {
        <!-- ========================================================================= -->
        <!-- SUCCESS CONFIRMATION SCREEN (DIGITAL TRIP PASS GENERATED) -->
        <!-- ========================================================================= -->
        <div class="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8 space-y-6 animate-in fade-in-50 duration-300">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-6">
            <div class="flex items-center gap-3.5">
              <div class="size-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <ng-icon name="lucideCheck" class="size-6 stroke-[3]" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-foreground">Booking Confirmed & Trip Pass Issued!</h2>
                <p class="text-xs text-muted-foreground mt-0.5">
                  Universal Master Reference: <strong class="text-primary font-mono text-sm">{{ cart.lastBookingReference() }}</strong>
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button
                hlmBtn
                variant="outline"
                size="sm"
                (click)="onPrintPass()"
                class="gap-1.5 text-xs cursor-pointer"
              >
                <ng-icon name="lucidePrinter" class="size-3.5" />
                <span>Print All Vouchers</span>
              </button>

              <button
                hlmBtn
                variant="default"
                size="sm"
                (click)="cart.resetCheckout()"
                class="gap-1.5 text-xs cursor-pointer shadow-xs"
              >
                <span>Back to Marketplace</span>
              </button>
            </div>
          </div>

          <!-- Individual Multi-Modal Travel Vouchers -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Digital Service Passes</h3>
            <div class="grid gap-3 md:grid-cols-2">
              @for (item of cart.items(); track item.id) {
                <div class="rounded-xl border border-border bg-card p-4 shadow-2xs flex items-start justify-between gap-4">
                  <div class="space-y-1">
                    <span
                      class="text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider"
                      [class]="item.type === 'hotel_stay' ? 'bg-primary/10 text-primary' : item.type === 'airport_transfer' ? 'bg-blue-500/10 text-blue-600' : 'bg-emerald-500/10 text-emerald-600'"
                    >
                      {{ item.type.replace('_', ' ') }}
                    </span>
                    <h4 class="text-xs font-bold text-foreground line-clamp-1 mt-1">{{ item.title }}</h4>
                    <p class="text-[11px] text-muted-foreground">{{ item.subtitle }}</p>
                    <p class="text-[10px] text-primary/80 font-medium">Provider: {{ item.providerName }}</p>
                  </div>

                  <div class="size-16 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border/60">
                    <ng-icon name="lucideQrCode" class="size-10 text-foreground" />
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Escrow Split Payout Guarantee Banner -->
          <div class="rounded-xl border border-border/60 bg-card/60 p-4 text-xs space-y-1">
            <div class="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
              <ng-icon name="lucideShieldCheck" class="size-4" />
              <span>Multi-Vendor Escrow Payout Protection Active</span>
            </div>
            <p class="text-[11px] text-muted-foreground leading-relaxed">
              Your payment has been securely split. Service provider payouts are held in escrow and released automatically 24 hours after check-in/service delivery. Vehicle security deposit will be released within 48 hours of vehicle return.
            </p>
          </div>
        </div>
      } @else {
        <!-- ========================================================================= -->
        <!-- CHECKOUT SPLIT 2-PANE FORM -->
        <!-- ========================================================================= -->
        <div class="grid gap-6 lg:grid-cols-5 items-start">
          <!-- Left 3 Columns: Cart Review & Payment Info -->
          <div class="lg:col-span-3 space-y-6">
            <!-- Traveler Contact Card -->
            <div hlmCard class="p-5 space-y-4 shadow-2xs">
              <div class="flex items-center justify-between border-b border-border pb-3">
                <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <ng-icon name="lucideCheck" class="size-4 text-primary" />
                  1. Lead Traveler Details
                </h3>
                <span class="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                  <ng-icon name="lucideShieldCheck" class="size-3.5" />
                  Verified Session
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="text-xs font-semibold">First Name *</label>
                  <input hlmInput [(ngModel)]="traveler.firstName" placeholder="Sultanul" />
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-semibold">Last Name *</label>
                  <input hlmInput [(ngModel)]="traveler.lastName" placeholder="Arefin" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="text-xs font-semibold">Email Address *</label>
                  <input hlmInput type="email" [(ngModel)]="traveler.email" placeholder="arefin@traveller.ai" />
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-semibold">Mobile Phone (WhatsApp) *</label>
                  <input hlmInput [(ngModel)]="traveler.phone" placeholder="+880 1711 000000" />
                </div>
              </div>
            </div>

            <!-- Multi-Item Travel Cart Review -->
            <div hlmCard class="p-5 space-y-4 shadow-2xs">
              <div class="flex items-center justify-between border-b border-border pb-3">
                <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <ng-icon name="lucideCheck" class="size-4 text-primary" />
                  2. Review Bundled Experiences ({{ cart.items().length }} Items)
                </h3>
                <span class="text-[11px] text-primary font-semibold">Universal Cart</span>
              </div>

              <div class="divide-y divide-border/60">
                @for (item of cart.items(); track item.id) {
                  <div class="py-3 flex items-start justify-between gap-3 text-xs">
                    <div class="flex items-start gap-3">
                      <img
                        [src]="item.imageUrl"
                        [alt]="item.title"
                        class="size-14 rounded-lg object-cover border border-border/40 shrink-0"
                      />
                      <div class="space-y-0.5">
                        <div class="flex items-center gap-1.5">
                          <span
                            class="text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase"
                            [class]="item.type === 'hotel_stay' ? 'bg-primary/10 text-primary' : item.type === 'airport_transfer' ? 'bg-blue-500/10 text-blue-600' : item.type === 'vehicle_rental' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'"
                          >
                            {{ item.type.replace('_', ' ') }}
                          </span>
                          <span class="text-[10px] text-muted-foreground">• {{ item.providerName }}</span>
                        </div>
                        <h4 class="font-bold text-foreground text-xs line-clamp-1">{{ item.title }}</h4>
                        <p class="text-[11px] text-muted-foreground">{{ item.subtitle }}</p>
                        @if (item.securityDeposit) {
                          <span class="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                            Includes {{ cart.formatMoney(item.securityDeposit) }} refundable security hold
                          </span>
                        }
                      </div>
                    </div>

                    <div class="text-right shrink-0">
                      <div class="font-bold text-foreground text-xs">{{ cart.formatMoney(item.totalPrice) }}</div>
                      <button
                        type="button"
                        (click)="cart.removeItem(item.id)"
                        class="text-muted-foreground hover:text-rose-500 transition-colors p-1 mt-1 cursor-pointer"
                        title="Remove from cart"
                      >
                        <ng-icon name="lucideTrash2" class="size-3.5" />
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Payment Method Card -->
            <div hlmCard class="p-5 space-y-4 shadow-2xs">
              <div class="flex items-center justify-between border-b border-border pb-3">
                <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <ng-icon name="lucideCreditCard" class="size-4 text-primary" />
                  3. Secure Payment Gateway
                </h3>
                <span class="text-[11px] text-muted-foreground flex items-center gap-1">
                  <ng-icon name="lucideLock" class="size-3" />
                  256-Bit SSL Encrypted
                </span>
              </div>

              <!-- Gateway Selection Tabs -->
              <div class="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  (click)="paymentMethod.set('card')"
                  [class]="paymentMethod() === 'card' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-border text-muted-foreground hover:bg-muted/40'"
                  class="p-2.5 rounded-lg border text-xs flex flex-col items-center gap-1 transition-colors cursor-pointer"
                >
                  <ng-icon name="lucideCreditCard" class="size-4" />
                  <span>Stripe Cards</span>
                </button>

                <button
                  type="button"
                  (click)="paymentMethod.set('mfs')"
                  [class]="paymentMethod() === 'mfs' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-border text-muted-foreground hover:bg-muted/40'"
                  class="p-2.5 rounded-lg border text-xs flex flex-col items-center gap-1 transition-colors cursor-pointer"
                >
                  <ng-icon name="lucideSparkles" class="size-4" />
                  <span>bKash / Nagad</span>
                </button>

                <button
                  type="button"
                  (click)="paymentMethod.set('bank')"
                  [class]="paymentMethod() === 'bank' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-border text-muted-foreground hover:bg-muted/40'"
                  class="p-2.5 rounded-lg border text-xs flex flex-col items-center gap-1 transition-colors cursor-pointer"
                >
                  <ng-icon name="lucideBuilding2" class="size-4" />
                  <span>B2B Bank Wire</span>
                </button>
              </div>

              @if (paymentMethod() === 'card') {
                <div class="space-y-3 pt-2">
                  <div class="space-y-1">
                    <label class="text-xs font-semibold">Card Number</label>
                    <input hlmInput [(ngModel)]="paymentCard.number" placeholder="4242 •••• •••• 4242" />
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="space-y-1">
                      <label class="text-xs font-semibold">Expires (MM/YY)</label>
                      <input hlmInput [(ngModel)]="paymentCard.expiry" placeholder="12/28" />
                    </div>
                    <div class="space-y-1">
                      <label class="text-xs font-semibold">CVC / CVV</label>
                      <input hlmInput [(ngModel)]="paymentCard.cvc" placeholder="888" />
                    </div>
                  </div>
                </div>
              } @else if (paymentMethod() === 'mfs') {
                <div class="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs space-y-2 pt-2">
                  <p class="font-bold text-foreground">bKash & Nagad Instant Merchant Checkout</p>
                  <p class="text-[11px] text-muted-foreground">
                    You will be securely redirected to the wallet gateway to confirm your PIN and receive instant SMS confirmation.
                  </p>
                </div>
              } @else {
                <div class="rounded-lg border border-border bg-muted/20 p-3 text-xs space-y-1 pt-2">
                  <p class="font-bold text-foreground">Corporate Agency Invoicing & Wire</p>
                  <p class="text-[11px] text-muted-foreground">
                    Invoice will be dispatched with SWIFT details. Booking confirmation holds for 48 hours pending wire receipt.
                  </p>
                </div>
              }
            </div>
          </div>

          <!-- Right 2 Columns: Summary & Split Escrow Ledger -->
          <div class="lg:col-span-2 space-y-4">
            <!-- Order Summary Card -->
            <div hlmCard class="p-5 space-y-4 shadow-2xs sticky top-20">
              <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-3">
                Order Summary & Pricing
              </h3>

              <!-- Bundle Discount Banner -->
              @if (cart.isBundleEligible()) {
                <div class="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between">
                  <div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <ng-icon name="lucideSparkles" class="size-4" />
                    <span>Multi-Modal Bundle Savings</span>
                  </div>
                  <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    -{{ cart.formatMoney(cart.bundleDiscountAmount()) }}
                  </span>
                </div>
              }

              <!-- Pricing Line Items -->
              <div class="space-y-2 text-xs">
                <div class="flex items-center justify-between text-muted-foreground">
                  <span>Experiences Subtotal</span>
                  <span class="text-foreground font-semibold">{{ cart.formatMoney(cart.subtotal()) }}</span>
                </div>

                @if (cart.bundleDiscountAmount() > 0) {
                  <div class="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Package Discount (12%)</span>
                    <span>-{{ cart.formatMoney(cart.bundleDiscountAmount()) }}</span>
                  </div>
                }

                <div class="flex items-center justify-between text-muted-foreground">
                  <span>Platform Marketplace Fee (3.5%)</span>
                  <span class="text-foreground font-semibold">{{ cart.formatMoney(cart.platformServiceFee()) }}</span>
                </div>

                @if (cart.refundableSecurityDepositTotal() > 0) {
                  <div class="flex items-center justify-between text-amber-600 dark:text-amber-400">
                    <span>Refundable Vehicle Deposit</span>
                    <span class="font-semibold">{{ cart.formatMoney(cart.refundableSecurityDepositTotal()) }}</span>
                  </div>
                }

                <div class="border-t border-border pt-3 flex items-center justify-between">
                  <div>
                    <span class="text-xs font-bold text-foreground">Total Payable Now</span>
                    <p class="text-[10px] text-muted-foreground">All taxes & fees included</p>
                  </div>
                  <div class="text-xl font-extrabold text-primary">
                    {{ cart.formatMoney(cart.grandTotal()) }}
                  </div>
                </div>
              </div>

              <!-- Automated Split Settlement Ledger Preview -->
              <div class="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-2 text-[11px]">
                <div class="flex items-center justify-between font-bold text-foreground">
                  <span>Automated Split Settlement</span>
                  <span class="text-[10px] font-semibold text-primary">Escrow Ledger</span>
                </div>

                <div class="space-y-1 text-muted-foreground text-[10px]">
                  @for (v of cart.splitAllocation().vendorPayouts; track v.providerId) {
                    <div class="flex items-center justify-between">
                      <span class="truncate max-w-[170px]">{{ v.providerName }}</span>
                      <span class="font-mono text-foreground">{{ cart.formatMoney(v.netAmount) }}</span>
                    </div>
                  }
                  <div class="flex items-center justify-between text-primary/90 font-medium pt-1 border-t border-border/40">
                    <span>Marketplace Commission</span>
                    <span class="font-mono">{{ cart.formatMoney(cart.splitAllocation().platformCommission) }}</span>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                hlmBtn
                variant="default"
                size="lg"
                [disabled]="cart.isCheckingOut() || cart.items().length === 0"
                (click)="onConfirmPayment()"
                class="w-full gap-2 shadow-sm font-bold text-sm cursor-pointer"
              >
                @if (cart.isCheckingOut()) {
                  <ng-icon name="lucideRefreshCw" class="size-4 animate-spin" />
                  <span>Processing Secure Checkout...</span>
                } @else {
                  <span>Authorize & Issue Digital Trip Pass</span>
                  <ng-icon name="lucideArrowRight" class="size-4" />
                }
              </button>

              <div class="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1.5 pt-1">
                <ng-icon name="lucideShieldCheck" class="size-3.5 text-emerald-500" />
                <span>Zero Cancellation Fee within 24 Hours • 100% Refund Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      }
    </app-main>
  `,
})
export class CheckoutComponent {
  readonly cart = inject(UniversalCartFacade)
  private readonly router = inject(Router)

  readonly currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'BDT', 'AED']
  readonly paymentMethod = signal<'card' | 'mfs' | 'bank'>('card')

  traveler = {
    firstName: 'Sultanul',
    lastName: 'Arefin',
    email: 'arefin@traveller.ai',
    phone: '+880 1711 999888',
  }

  paymentCard = {
    number: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvc: '888',
  }

  async onConfirmPayment(): Promise<void> {
    if (!this.traveler.firstName || !this.traveler.email) {
      toast.error('Please complete lead traveler information')
      return
    }

    try {
      const ref = await this.cart.processCheckout(
        {
          firstName: this.traveler.firstName,
          lastName: this.traveler.lastName,
          email: this.traveler.email,
          phone: this.traveler.phone,
        },
        {
          method: this.paymentMethod(),
          gateway: this.paymentMethod() === 'mfs' ? 'bkash' : 'stripe',
          cardNumberLast4: this.paymentCard.number.slice(-4),
        }
      )
      toast.success(`Booking confirmed! Master Reference: ${ref}`)
    } catch {
      toast.error('Payment processing failed. Please try again.')
    }
  }


  onPrintPass(): void {
    window.print()
  }
}
