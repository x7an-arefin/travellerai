import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideShare2,
  lucideLink,
  lucideDollarSign,
  lucideTrendingUp,
  lucideCopy,
  lucideCheck,
  lucideUsers,
  lucideDownload,
  lucideSearch,
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

export interface PartnerPayout {
  id: string
  partnerName: string
  referralCode: string
  totalClicks: number
  paidConversions: number
  commissionEarned: string
  status: 'paid' | 'pending'
}

@Component({
  selector: 'app-affiliates',
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
  ],
  providers: [
    provideIcons({
      lucideShare2,
      lucideLink,
      lucideDollarSign,
      lucideTrendingUp,
      lucideCopy,
      lucideCheck,
      lucideUsers,
      lucideDownload,
      lucideSearch,
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
      <!-- Header Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Affiliate & Partner Referral Portal</h1>
          <p class="text-xs text-muted-foreground">Manage creator referral links, track conversion attribution, and schedule monthly payouts.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="exportPayouts()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
            <span>Export Payouts</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Total Referral Revenue</span>
          <div class="text-2xl font-bold text-foreground">\$148,200</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+22% month over month</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Active Partner Affiliates</span>
          <div class="text-2xl font-bold text-foreground">342 Creators</div>
          <p class="text-[11px] text-sky-500 font-semibold">Across YouTube & Blogs</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Paid Commissions</span>
          <div class="text-2xl font-bold text-emerald-600">\$29,640</div>
          <p class="text-[11px] text-muted-foreground">Avg 20% commission rate</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Referral Conversion Rate</span>
          <div class="text-2xl font-bold text-foreground">8.4%</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+1.8% vs organic</p>
        </div>
      </div>

      <!-- Referral Link Generator Box -->
      <div hlmCard class="p-5 space-y-3 shadow-2xs">
        <h3 class="font-bold text-sm text-foreground">Your Primary Partner Referral Link</h3>
        <div class="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            readonly
            [value]="referralUrl"
            class="h-9 flex-1 w-full rounded-md border border-input bg-muted/40 font-mono text-xs px-3 text-foreground outline-none"
          />
          <button hlmBtn size="sm" (click)="copyReferral()" class="gap-1.5 cursor-pointer h-9 w-full sm:w-auto shadow-xs">
            <ng-icon name="lucideCopy" class="size-3.5" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      <!-- Partner Payouts Table -->
      <div hlmCard class="p-0 overflow-hidden shadow-2xs">
        <table hlmTable class="w-full text-xs">
          <thead hlmTableHeader>
            <tr hlmTableRow>
              <th hlmTableHead class="ps-4">Partner Name</th>
              <th hlmTableHead>Referral Code</th>
              <th hlmTableHead>Total Clicks</th>
              <th hlmTableHead>Conversions</th>
              <th hlmTableHead>Earnings</th>
              <th hlmTableHead class="text-right pe-4">Status</th>
            </tr>
          </thead>
          <tbody hlmTableBody>
            @for (p of payouts; track p.id) {
              <tr hlmTableRow class="hover:bg-muted/40 transition-colors">
                <td hlmTableCell class="ps-4 font-bold text-foreground">{{ p.partnerName }}</td>
                <td hlmTableCell class="font-mono text-muted-foreground">{{ p.referralCode }}</td>
                <td hlmTableCell class="font-semibold">{{ p.totalClicks | number }}</td>
                <td hlmTableCell class="font-bold text-emerald-600">{{ p.paidConversions }} sales</td>
                <td hlmTableCell class="font-mono font-bold text-foreground">{{ p.commissionEarned }}</td>
                <td hlmTableCell class="text-right pe-4">
                  <span
                    class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border"
                    [class.bg-emerald-500/10]="p.status === 'paid'"
                    [class.text-emerald-600]="p.status === 'paid'"
                    [class.border-emerald-200]="p.status === 'paid'"
                    [class.bg-amber-500/10]="p.status === 'pending'"
                    [class.text-amber-600]="p.status === 'pending'"
                    [class.border-amber-200]="p.status === 'pending'"
                  >
                    {{ p.status }}
                  </span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </app-main>
  `,
})
export class AffiliatesComponent {
  referralUrl = 'https://spartan.ng/ref/partner-8842'

  readonly payouts: PartnerPayout[] = [
    { id: 'p-1', partnerName: 'Frontend Masters Daily', referralCode: 'FRONTEND20', totalClicks: 14200, paidConversions: 340, commissionEarned: '$6,800.00', status: 'paid' },
    { id: 'p-2', partnerName: 'Modern Angular Weekly', referralCode: 'ANGULAR21', totalClicks: 8900, paidConversions: 210, commissionEarned: '$4,200.00', status: 'paid' },
    { id: 'p-3', partnerName: 'SaaS Dev Hub', referralCode: 'SAASDEV', totalClicks: 4300, paidConversions: 84, commissionEarned: '$1,680.00', status: 'pending' },
  ]

  copyReferral(): void {
    toast.success('Referral link copied to clipboard.')
  }

  exportPayouts(): void {
    toast.success('Payout ledger exported.')
  }
}
