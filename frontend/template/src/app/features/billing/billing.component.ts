import { Component } from '@angular/core'
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
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmTableImports } from '../../ui/table/hlm-table.components'
import { toast } from 'ngx-sonner'

export interface Invoice {
  id: string
  date: string
  period: string
  amount: string
  status: 'paid' | 'pending' | 'refunded'
}

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    CommonModule,
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
                Current Plan
              </span>
              <span class="text-xs font-medium text-muted-foreground">Renews on Sep 01, 2026</span>
            </div>

            <div class="mt-4 space-y-1">
              <h2 class="text-3xl font-extrabold text-foreground">Enterprise Pro</h2>
              <p class="text-xs text-muted-foreground">
                Unlimited project workflows, high-throughput webhooks, and 24/7 dedicated support.
              </p>
            </div>
          </div>

          <div class="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
            <div class="text-2xl font-bold tracking-tight">
              \$99.00 <span class="text-xs font-normal text-muted-foreground">/ month</span>
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
                <p class="text-sm font-semibold text-foreground">Mastercard ending in 8892</p>
                <p class="text-[11px] text-muted-foreground">Expires 08/2029 • Primary card</p>
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
            <span class="text-xs font-mono font-bold">18.4 / 50 GB</span>
          </div>
          <div class="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full" style="width: 36.8%;"></div>
          </div>
          <p class="text-[11px] text-muted-foreground">36.8% of allocated cloud storage</p>
        </div>

        <!-- API Calls -->
        <div hlmCard class="p-4 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-xs font-semibold text-foreground">
              <ng-icon name="lucideActivity" class="size-4 text-sky-500" />
              <span>API Requests</span>
            </div>
            <span class="text-xs font-mono font-bold">342k / 500k</span>
          </div>
          <div class="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-sky-500 rounded-full" style="width: 68.4%;"></div>
          </div>
          <p class="text-[11px] text-muted-foreground">68.4% of monthly quota consumed</p>
        </div>

        <!-- Seats -->
        <div hlmCard class="p-4 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-xs font-semibold text-foreground">
              <ng-icon name="lucideUsers" class="size-4 text-emerald-500" />
              <span>Team Seats</span>
            </div>
            <span class="text-xs font-mono font-bold">8 / 10 Active</span>
          </div>
          <div class="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500 rounded-full" style="width: 80%;"></div>
          </div>
          <p class="text-[11px] text-muted-foreground">2 team member invitations remaining</p>
        </div>
      </div>

      <!-- Invoices History Table -->
      <div hlmCard class="p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-semibold text-foreground">Invoice History</h3>
            <p class="text-xs text-muted-foreground">Download past payment receipts and tax statements.</p>
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
              @for (inv of invoices; track inv.id) {
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
    </app-main>
  `,
})
export class BillingComponent {
  readonly invoices: Invoice[] = [
    { id: 'INV-2026-088', date: 'Aug 01, 2026', period: 'Aug 01 – Aug 31, 2026', amount: '$99.00', status: 'paid' },
    { id: 'INV-2026-074', date: 'Jul 01, 2026', period: 'Jul 01 – Jul 31, 2026', amount: '$99.00', status: 'paid' },
    { id: 'INV-2026-061', date: 'Jun 01, 2026', period: 'Jun 01 – Jun 30, 2026', amount: '$99.00', status: 'paid' },
    { id: 'INV-2026-048', date: 'May 01, 2026', period: 'May 01 – May 31, 2026', amount: '$99.00', status: 'paid' },
    { id: 'INV-2026-035', date: 'Apr 01, 2026', period: 'Apr 01 – Apr 30, 2026', amount: '$99.00', status: 'paid' },
  ]

  managePlan(): void {
    toast.info('Plan settings opened.')
  }

  upgradePlan(): void {
    toast.success('Redirecting to Enterprise tier upgrade...')
  }

  updatePaymentMethod(): void {
    toast.info('Payment method editor opened.')
  }

  downloadInvoicePdf(inv: Invoice): void {
    toast.success(`Downloading PDF receipt for ${inv.id}...`)
  }

  downloadAllInvoices(): void {
    toast.success('Exporting all tax receipts as ZIP archive...')
  }
}
