import { Component, signal, computed } from '@angular/core'
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
    <app-main [fixed]="true" class="space-y-6 max-w-5xl mx-auto py-6">
      <div class="space-y-1">
        <h1 class="text-2xl font-bold tracking-tight">Checkout & Payment</h1>
        <p class="text-xs text-muted-foreground">Complete your workspace subscription and license activation.</p>
      </div>

      <!-- Split 2-Pane Checkout Layout -->
      <div class="grid gap-6 md:grid-cols-5 items-start">
        <!-- Left 3 Columns: Billing & Payment Form -->
        <div hlmCard class="p-6 md:col-span-3 space-y-6 shadow-sm">
          <!-- Contact Info -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Customer Details</h3>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="text-xs font-semibold">First Name</label>
                <input hlmInput [(ngModel)]="firstName" placeholder="Sat" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold">Last Name</label>
                <input hlmInput [(ngModel)]="lastName" placeholder="Naing" />
              </div>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-semibold">Email Address</label>
              <input hlmInput type="email" [(ngModel)]="email" placeholder="satnaingdev@gmail.com" />
            </div>
          </div>

          <div class="h-px bg-border"></div>

          <!-- Payment Details -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Payment Method</h3>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold">Card Number</label>
              <div class="relative">
                <input hlmInput [(ngModel)]="cardNumber" placeholder="4242 •••• •••• 8892" />
                <ng-icon name="lucideCreditCard" class="absolute right-3 top-2.5 size-4 text-muted-foreground" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="text-xs font-semibold">Expires (MM/YY)</label>
                <input hlmInput [(ngModel)]="cardExpiry" placeholder="08/29" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold">CVC / Security Code</label>
                <input hlmInput [(ngModel)]="cardCvc" placeholder="•••" />
              </div>
            </div>
          </div>

          <!-- Submit Payment Button -->
          <button
            hlmBtn
            (click)="processPayment()"
            class="w-full h-11 text-sm font-bold shadow-md cursor-pointer gap-2"
          >
            <ng-icon name="lucideLock" class="size-4" />
            <span>Pay \${{ finalTotal() }} & Activate License</span>
          </button>

          <p class="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1.5">
            <ng-icon name="lucideShieldCheck" class="size-4 text-emerald-600" />
            <span>Encrypted with 256-bit TLS security. Instant license delivery.</span>
          </p>
        </div>

        <!-- Right 2 Columns: Order Summary Card -->
        <div hlmCard class="p-6 md:col-span-2 space-y-4 shadow-sm bg-muted/20">
          <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Order Summary</h3>

          <!-- Items Breakdown -->
          <div class="space-y-3 divide-y divide-border/60 text-xs">
            <div class="flex items-center justify-between pt-1">
              <div>
                <p class="font-bold text-foreground">Spartan UI Pro License</p>
                <p class="text-[11px] text-muted-foreground">Annual Workspace Plan</p>
              </div>
              <span class="font-bold text-foreground">\$240.00</span>
            </div>

            <div class="flex items-center justify-between pt-2">
              <div>
                <p class="font-semibold text-foreground">Developer Seat Add-on (x2)</p>
                <p class="text-[11px] text-muted-foreground">Billed annually</p>
              </div>
              <span class="font-semibold text-foreground">\$60.00</span>
            </div>
          </div>

          <!-- Coupon Code Input -->
          <div class="pt-2">
            <div class="flex gap-2">
              <input hlmInput [(ngModel)]="couponCode" placeholder="SPARTAN20" class="h-8 text-xs font-mono uppercase" />
              <button hlmBtn variant="outline" size="sm" (click)="applyCoupon()" class="h-8 text-xs cursor-pointer shrink-0">
                Apply
              </button>
            </div>
            @if (discountApplied()) {
              <p class="text-[11px] text-emerald-600 font-semibold mt-1">20% discount applied!</p>
            }
          </div>

          <!-- Price Calculation -->
          <div class="space-y-1.5 pt-2 border-t border-border text-xs">
            <div class="flex justify-between text-muted-foreground">
              <span>Subtotal:</span>
              <span class="font-mono">\$300.00</span>
            </div>
            @if (discountApplied()) {
              <div class="flex justify-between text-emerald-600 font-semibold">
                <span>Discount (20%):</span>
                <span class="font-mono">-\$60.00</span>
              </div>
            }
            <div class="flex justify-between text-muted-foreground">
              <span>Tax (8%):</span>
              <span class="font-mono">\${{ taxAmount() }}</span>
            </div>
            <div class="flex justify-between text-sm font-extrabold text-foreground pt-2 border-t border-border">
              <span>Total Due:</span>
              <span class="font-mono text-primary">\${{ finalTotal() }}</span>
            </div>
          </div>
        </div>
      </div>
    </app-main>
  `,
})
export class CheckoutComponent {
  firstName = 'Sat'
  lastName = 'Naing'
  email = 'satnaingdev@gmail.com'
  cardNumber = '4242 8892 1042 9821'
  cardExpiry = '08/29'
  cardCvc = '892'
  couponCode = 'SPARTAN20'
  readonly discountApplied = signal<boolean>(true)

  constructor(private router: Router) {}

  readonly subtotal = 300.0

  readonly taxAmount = computed(() => {
    const base = this.discountApplied() ? 240.0 : 300.0
    return (base * 0.08).toFixed(2)
  })

  readonly finalTotal = computed(() => {
    const base = this.discountApplied() ? 240.0 : 300.0
    const tax = base * 0.08
    return (base + tax).toFixed(2)
  })

  applyCoupon(): void {
    if (this.couponCode.toUpperCase() === 'SPARTAN20') {
      this.discountApplied.set(true)
      toast.success('Coupon code applied: 20% discount!')
    } else {
      toast.error('Invalid coupon code.')
    }
  }

  processPayment(): void {
    toast.success('Payment authorized successfully! Welcome to Spartan Pro.')
    setTimeout(() => {
      this.router.navigate(['/billing'])
    }, 1000)
  }
}
