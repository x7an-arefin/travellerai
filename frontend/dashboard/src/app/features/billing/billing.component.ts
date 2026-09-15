import { Component, OnInit, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCreditCard,
  lucideDownload,
  lucideSparkles,
  lucideCheckCircle2,
  lucideHardDrive,
  lucideActivity,
  lucideUsers,
  lucideArrowUpRight,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { FormsModule } from '@angular/forms'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmTableImports } from '../../ui/table/hlm-table.components'
import { HlmSheetImports } from '../../ui/sheet/hlm-sheet.components'
import { BillingApiService } from './data-access/services/billing-api.service'
import {
  BillingInvoiceReceipt,
  BillingPlanInfo,
  BillingUsageMeters,
  PaymentMethodInfo,
} from './data-access/models/billing.model'
import { toast } from 'ngx-sonner'

export type Invoice = BillingInvoiceReceipt

@Component({
  selector: 'app-billing',
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
    ...HlmTableImports,
    ...HlmSheetImports,
  ],
  providers: [
    provideIcons({
      lucideCreditCard,
      lucideDownload,
      lucideSparkles,
      lucideCheckCircle2,
      lucideHardDrive,
      lucideActivity,
      lucideUsers,
      lucideArrowUpRight,
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

    <!-- Main Content -->
    <app-main [fixed]="true" class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Billing & Invoices</h1>
        <p class="text-xs text-muted-foreground">
          Manage your organization subscription plan, resource usage, and invoice receipts.
        </p>
      </div>

      <!-- Plan Hero Banner & Payment Card Grid -->
      <div class="grid gap-4 md:grid-cols-3">
        <!-- Active Subscription Plan -->
        <div hlmCard class="md:col-span-2 p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-card to-accent/20 border-primary/20">
          <div>
            <div class="flex items-center justify-between">
              <span hlmBadge variant="default" class="text-[10px] uppercase font-bold tracking-wider gap-1">
                <ng-icon name="lucideSparkles" class="size-3" />
                {{ plan().badge }}
              </span>
              <span class="text-xs font-medium text-muted-foreground">Renews on {{ plan().renewalDate }}</span>
            </div>

            <div class="mt-4 space-y-1">
              <h2 class="text-3xl font-extrabold text-foreground">{{ plan().name }}</h2>
              <p class="text-xs text-muted-foreground">
                High-throughput booking pipeline, multi-vendor split escrow, and 24/7 dedicated support.
              </p>
            </div>
          </div>

          <div class="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
            <div class="text-2xl font-bold tracking-tight">
              {{ plan().priceFormatted }} <span class="text-xs font-normal text-muted-foreground">/ {{ plan().billingCycle }}</span>
            </div>

            <div class="flex items-center gap-2">
              <button hlmBtn variant="outline" size="sm" (click)="managePlan()" class="cursor-pointer">
                Cancel Plan
              </button>
              <button hlmBtn size="sm" (click)="upgradePlan()" class="gap-1.5 cursor-pointer shadow-xs">
                <span>Upgrade Tier</span>
                <ng-icon name="lucideArrowUpRight" class="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Payment Method Card -->
        <div hlmCard class="p-6 flex flex-col justify-between">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payment Method</span>
            <div class="flex items-center gap-3 mt-4 p-3 rounded-xl border border-border bg-muted/30">
              <div class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ng-icon name="lucideCreditCard" class="size-5" />
              </div>
              <div>
                <p class="text-sm font-semibold text-foreground">{{ paymentMethod().brand }} ending in {{ paymentMethod().last4 }}</p>
                <p class="text-[11px] text-muted-foreground">Expires {{ paymentMethod().expiry }} • Primary card</p>
              </div>
            </div>
          </div>

          <button hlmBtn variant="outline" size="sm" (click)="updatePaymentMethod()" class="w-full mt-4 cursor-pointer text-xs">
            Update Payment Details
          </button>
        </div>
      </div>

      <!-- Resource Usage Progress Bars -->
      <div class="grid gap-4 sm:grid-cols-3">
        <!-- Storage -->
        <div hlmCard class="p-4 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-xs font-semibold text-foreground">
              <ng-icon name="lucideHardDrive" class="size-4 text-primary" />
              <span>Storage Used</span>
            </div>
            <span class="text-xs font-mono font-bold">{{ usage().cloudStorageUsedGb }} / {{ usage().cloudStorageLimitGb }} GB</span>
          </div>
          <div class="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full" [style.width.%]="(usage().cloudStorageUsedGb / usage().cloudStorageLimitGb) * 100"></div>
          </div>
          <p class="text-[11px] text-muted-foreground">Cloud media and voucher storage</p>
        </div>

        <!-- Bookings -->
        <div hlmCard class="p-4 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-xs font-semibold text-foreground">
              <ng-icon name="lucideActivity" class="size-4 text-sky-500" />
              <span>Bookings Volume</span>
            </div>
            <span class="text-xs font-mono font-bold">{{ usage().bookingsCount | number }} / {{ usage().bookingsLimit | number }}</span>
          </div>
          <div class="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-sky-500 rounded-full" [style.width.%]="(usage().bookingsCount / usage().bookingsLimit) * 100"></div>
          </div>
          <p class="text-[11px] text-muted-foreground">Live customer bookings processed</p>
        </div>

        <!-- SMS -->
        <div hlmCard class="p-4 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-xs font-semibold text-foreground">
              <ng-icon name="lucideUsers" class="size-4 text-emerald-500" />
              <span>SMS Dispatches</span>
            </div>
            <span class="text-xs font-mono font-bold">{{ usage().smsNotificationsSent | number }} / {{ usage().smsLimit | number }}</span>
          </div>
          <div class="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500 rounded-full" [style.width.%]="(usage().smsNotificationsSent / usage().smsLimit) * 100"></div>
          </div>
          <p class="text-[11px] text-muted-foreground">Instant OTP and driver notifications</p>
        </div>
      </div>

      <!-- Invoices Receipt Table -->
      <div hlmCard class="p-6 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 class="text-base font-bold text-foreground">Invoice Receipts</h3>
            <p class="text-xs text-muted-foreground">Download tax and payment receipts for business expenses.</p>
          </div>

          <button hlmBtn variant="outline" size="sm" (click)="downloadAllInvoices()" class="gap-1.5 cursor-pointer text-xs">
            <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
            <span>Download All</span>
          </button>
        </div>

        <div class="rounded-lg border border-border overflow-x-auto">
          <table hlmTable class="min-w-[600px]">
            <thead hlmTableHeader>
              <tr hlmTableRow>
                <th hlmTableHead class="ps-4">Invoice ID</th>
                <th hlmTableHead>Billing Date</th>
                <th hlmTableHead>Period</th>
                <th hlmTableHead>Amount</th>
                <th hlmTableHead>Status</th>
                <th hlmTableHead class="w-24 text-right pe-4">Receipt</th>
              </tr>
            </thead>
            <tbody hlmTableBody>
              @for (inv of invoices(); track inv.id) {
                <tr hlmTableRow>
                  <td hlmTableCell class="font-mono text-xs font-semibold text-foreground ps-4">
                    {{ inv.id }}
                  </td>
                  <td hlmTableCell class="text-xs text-muted-foreground">
                    {{ inv.date }}
                  </td>
                  <td hlmTableCell class="text-xs text-muted-foreground">
                    {{ inv.period }}
                  </td>
                  <td hlmTableCell class="font-semibold text-xs text-foreground">
                    {{ inv.amount }}
                  </td>
                  <td hlmTableCell>
                    <span
                      class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold border capitalize"
                      [class.bg-emerald-500/10]="inv.status === 'paid'"
                      [class.text-emerald-600]="inv.status === 'paid'"
                      [class.border-emerald-200]="inv.status === 'paid'"
                      [class.bg-amber-500/10]="inv.status === 'pending'"
                      [class.text-amber-600]="inv.status === 'pending'"
                      [class.border-amber-200]="inv.status === 'pending'"
                    >
                      {{ inv.status }}
                    </span>
                  </td>
                  <td hlmTableCell class="text-right pe-4">
                    <button
                      hlmBtn
                      variant="ghost"
                      size="sm"
                      (click)="downloadInvoicePdf(inv)"
                      class="h-7 px-2 text-xs gap-1 cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                      <ng-icon name="lucideDownload" class="size-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Plan Settings Sheet -->
      <hlm-sheet [isOpen]="planSheetOpen()" position="right" [size]="'sm'" (closed)="planSheetOpen.set(false)">
        <div hlmSheetHeader>
          <h3 hlmSheetTitle>Subscription Plan Settings</h3>
          <p hlmSheetDescription class="text-xs">Configure billing cycle, license seats, and SLA support levels.</p>
        </div>

        <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Active Subscription Tier</label>
            <select
              [(ngModel)]="selectedPlanTier"
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="Team Starter">Team Starter — $390 / quarter</option>
              <option value="Enterprise Pro">Enterprise Pro — $1,250 / quarter</option>
              <option value="Custom SLA">Global Carrier Custom SLA — $3,800 / quarter</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Billing Interval</label>
            <div class="flex gap-2">
              <button
                hlmBtn
                [variant]="selectedInterval === 'monthly' ? 'default' : 'outline'"
                size="sm"
                (click)="selectedInterval = 'monthly'"
                class="flex-1 text-xs cursor-pointer"
              >
                Monthly
              </button>
              <button
                hlmBtn
                [variant]="selectedInterval === 'quarterly' ? 'default' : 'outline'"
                size="sm"
                (click)="selectedInterval = 'quarterly'"
                class="flex-1 text-xs cursor-pointer"
              >
                Quarterly (Save 15%)
              </button>
            </div>
          </div>

          <div class="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-1.5 text-xs text-muted-foreground">
            <div class="font-semibold text-foreground">Included in this tier:</div>
            <div>• Up to 5,000 monthly transactions</div>
            <div>• Real-time Stripe Connect multi-party escrow</div>
            <div>• 99.95% API SLA & 24/7 incident response</div>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="planSheetOpen.set(false)" class="cursor-pointer text-xs">
            Cancel
          </button>
          <button hlmBtn (click)="savePlanSettings()" class="cursor-pointer text-xs">
            <span>Update Subscription</span>
          </button>
        </div>
      </hlm-sheet>

      <!-- Payment Method Editor Sheet -->
      <hlm-sheet [isOpen]="paymentMethodSheetOpen()" position="right" [size]="'sm'" (closed)="paymentMethodSheetOpen.set(false)">
        <div hlmSheetHeader>
          <h3 hlmSheetTitle>Update Payment Method</h3>
          <p hlmSheetDescription class="text-xs">Add or change the primary card used for recurring SaaS charges.</p>
        </div>

        <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Cardholder Full Name</label>
            <input
              type="text"
              [(ngModel)]="newCard.name"
              placeholder="e.g. Sultanul Arefin"
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Card Number</label>
            <input
              type="text"
              [(ngModel)]="newCard.number"
              placeholder="•••• •••• •••• 4242"
              class="h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Expiry (MM/YY)</label>
              <input
                type="text"
                [(ngModel)]="newCard.expiry"
                placeholder="12/28"
                class="h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">CVC</label>
              <input
                type="password"
                maxlength="4"
                [(ngModel)]="newCard.cvc"
                placeholder="•••"
                class="h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="paymentMethodSheetOpen.set(false)" class="cursor-pointer text-xs">
            Cancel
          </button>
          <button hlmBtn (click)="savePaymentMethod()" class="cursor-pointer text-xs">
            <span>Save Payment Method</span>
          </button>
        </div>
      </hlm-sheet>
    </app-main>
  `,
})
export class BillingComponent implements OnInit {
  private readonly billingApi = inject(BillingApiService)

  readonly plan = signal<BillingPlanInfo>({
    name: 'Enterprise Pro',
    badge: 'Current Plan',
    priceFormatted: '$1,250',
    billingCycle: 'quarterly',
    renewalDate: 'Nov 01, 2026',
    status: 'active',
    features: [],
  })

  readonly paymentMethod = signal<PaymentMethodInfo>({
    brand: 'Mastercard',
    last4: '4242',
    expiry: '12/28',
    billingEmail: 'billing@traveller.ai',
  })

  readonly usage = signal<BillingUsageMeters>({
    bookingsCount: 1948,
    bookingsLimit: 5000,
    smsNotificationsSent: 3420,
    smsLimit: 10000,
    cloudStorageUsedGb: 14.8,
    cloudStorageLimitGb: 100,
  })

  readonly invoices = signal<BillingInvoiceReceipt[]>([
    { id: 'INV-2026-088', date: 'Aug 01, 2026', period: 'Aug 01 – Aug 31, 2026', amount: '$2,900.00', status: 'paid' },
    { id: 'INV-2026-074', date: 'Jul 01, 2026', period: 'Jul 01 – Jul 31, 2026', amount: '$3,840.00', status: 'paid' },
    { id: 'INV-2026-061', date: 'Jun 01, 2026', period: 'Jun 01 – Jun 30, 2026', amount: '$840.00', status: 'paid' },
    { id: 'INV-2026-048', date: 'May 01, 2026', period: 'May 01 – May 31, 2026', amount: '$890.00', status: 'paid' },
    { id: 'INV-2026-035', date: 'Apr 01, 2026', period: 'Apr 01 – Apr 30, 2026', amount: '$390.00', status: 'paid' },
  ])

  async ngOnInit(): Promise<void> {
    const res = await this.billingApi.getBillingOverview()
    if (res.ok && res.data) {
      this.plan.set(res.data.plan)
      this.paymentMethod.set(res.data.paymentMethod)
      this.usage.set(res.data.usage)
      if (res.data.invoices.length > 0) {
        this.invoices.set(res.data.invoices)
      }
    }
  }

  readonly planSheetOpen = signal<boolean>(false)
  readonly paymentMethodSheetOpen = signal<boolean>(false)

  selectedPlanTier = 'Enterprise Pro'
  selectedInterval = 'quarterly'

  newCard = {
    name: '',
    number: '',
    expiry: '',
    cvc: '',
  }

  managePlan(): void {
    this.selectedPlanTier = this.plan().name
    this.selectedInterval = this.plan().billingCycle
    this.planSheetOpen.set(true)
  }

  savePlanSettings(): void {
    const current = this.plan()
    this.plan.set({
      ...current,
      name: this.selectedPlanTier,
      billingCycle: this.selectedInterval as any,
      priceFormatted: this.selectedPlanTier === 'Team Starter' ? '$390' : this.selectedPlanTier === 'Custom SLA' ? '$3,800' : '$1,250',
    })
    this.planSheetOpen.set(false)
    toast.success(`Subscription updated to ${this.selectedPlanTier} (${this.selectedInterval})!`)
  }

  upgradePlan(): void {
    this.selectedPlanTier = 'Custom SLA'
    this.planSheetOpen.set(true)
  }

  updatePaymentMethod(): void {
    this.newCard = {
      name: '',
      number: '',
      expiry: '',
      cvc: '',
    }
    this.paymentMethodSheetOpen.set(true)
  }

  savePaymentMethod(): void {
    if (!this.newCard.number.trim()) {
      toast.error('Card number is required.')
      return
    }
    const cleanNum = this.newCard.number.replace(/\s+/g, '')
    const last4 = cleanNum.length >= 4 ? cleanNum.slice(-4) : '8890'
    this.paymentMethod.set({
      brand: 'Visa',
      last4,
      expiry: this.newCard.expiry || '09/29',
      billingEmail: this.paymentMethod().billingEmail || 'billing@operator.com',
    })
    this.paymentMethodSheetOpen.set(false)
    toast.success(`Payment card ending in ${last4} updated!`)
  }

  downloadInvoicePdf(inv: Invoice): void {
    toast.success(`Downloading PDF receipt for ${inv.id}...`)
  }

  downloadAllInvoices(): void {
    toast.success('Exporting all tax receipts as ZIP archive...')
  }
}
