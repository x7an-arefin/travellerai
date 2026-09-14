import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideShare2,
  lucidePlus,
  lucideSearch,
  lucideDownload,
  lucidePrinter,
  lucideDollarSign,
  lucideTrendingUp,
  lucideUsers,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { AffiliatesFacade } from '../data-access/affiliates.facade'
import { AffiliatesTableComponent } from './affiliates-table.component'
import { AffiliatesFormComponent } from './affiliates-form.component'
import { AffiliatesDetailComponent } from './affiliates-detail.component'
import { AffiliatesRateModalComponent } from './affiliates-rate-modal.component'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmSheetImports } from '../../../ui/sheet/hlm-sheet.components'
import { HlmDialogImports } from '../../../ui/dialog/hlm-dialog.components'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { ExportService } from '../../../core/services/export.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-affiliates-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    TopNavComponent,
    SearchComponent,
    ThemeSwitchComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    AffiliatesTableComponent,
    AffiliatesFormComponent,
    AffiliatesDetailComponent,
    AffiliatesRateModalComponent,
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucideShare2,
      lucidePlus,
      lucideSearch,
      lucideDownload,
      lucidePrinter,
      lucideDollarSign,
      lucideTrendingUp,
      lucideUsers,
      lucideAlertTriangle,
    }),
  ],
  template: `
    <!-- Top Header -->
    <app-header [fixed]="true">
      <app-top-nav class="mr-auto" />
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main Content -->
    <app-main [fixed]="true" class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2.5">
            <div class="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ng-icon name="lucideShare2" class="size-4.5" />
            </div>
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-foreground">Affiliate & Referral Portal</h1>
              <p class="text-xs text-muted-foreground mt-0.5">
                Manage travel creator partnerships, attribution tracking links, commission rates, and payout schedules.
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="printReport()"
            class="gap-1.5 cursor-pointer shadow-xs text-xs"
            title="Print Partner Directory"
          >
            <ng-icon name="lucidePrinter" class="size-3.5" />
            <span>Print</span>
          </button>

          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="exportCsv()"
            class="gap-1.5 cursor-pointer shadow-xs text-xs"
          >
            <ng-icon name="lucideDownload" class="size-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            hlmBtn
            variant="default"
            size="sm"
            (click)="facade.openAddDrawer()"
            class="gap-1.5 cursor-pointer shadow-xs text-xs"
          >
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>New Partner</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Total Lifetime Earnings</span>
            <ng-icon name="lucideDollarSign" class="size-4 text-emerald-500" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            \${{ facade.totalCommissionSummary() | number:'1.2-2' }}
          </div>
          <p class="text-[10px] text-muted-foreground">Settled creator commissions</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Pending Payout Batch</span>
            <ng-icon name="lucideTrendingUp" class="size-4 text-amber-500" />
          </div>
          <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">
            \${{ facade.pendingPayoutsSummary() | number:'1.2-2' }}
          </div>
          <p class="text-[10px] text-muted-foreground">Due at next settlement cycle</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Attributed Bookings</span>
            <ng-icon name="lucideShare2" class="size-4 text-blue-500" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            {{ facade.totalBookingsAttributed() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Direct departure conversions</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Active Partners</span>
            <ng-icon name="lucideUsers" class="size-4 text-purple-500" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            {{ facade.allItems().length }}
          </div>
          <p class="text-[10px] text-muted-foreground">Verified creator network</p>
        </div>
      </div>

      <!-- Search & Status Filter Bar -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="relative flex-1 max-w-sm">
          <ng-icon name="lucideSearch" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            [ngModel]="facade.searchQuery()"
            (ngModelChange)="facade.setSearchQuery($event)"
            placeholder="Search partners, referral codes, emails..."
            class="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          @for (tab of statusTabs; track tab.value) {
            <button
              hlmBtn
              [variant]="facade.activeStatusFilter() === tab.value ? 'default' : 'ghost'"
              size="sm"
              class="h-7 text-xs px-2.5 rounded-lg cursor-pointer"
              (click)="facade.setStatusFilter(tab.value)"
            >
              {{ tab.label }}
            </button>
          }
        </div>
      </div>

      <!-- Affiliates Table -->
      <app-affiliates-table
        [items]="facade.items()"
        [isLoading]="facade.isLoading()"
        (viewDetail)="facade.openDetailDrawer($event)"
        (adjustRate)="facade.openRateDrawer($event)"
        (statusChange)="onStatusChange($event)"
        (deleteItem)="facade.requestDelete($event)"
      />
    </app-main>

    <!-- Slide-over Drawer for Registering Partner -->
    <hlm-sheet [isOpen]="facade.drawerMode() === 'add'" (closed)="facade.closeDrawer()" sheetSize="md" side="right">
      <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div class="pb-3 border-b border-border/40 mb-4">
            <h3 class="text-base font-bold text-foreground">Onboard Affiliate Partner</h3>
            <p class="text-xs text-muted-foreground mt-0.5">
              Create an affiliate account, assign a unique referral voucher code, and set commission terms.
            </p>
          </div>

          <app-affiliates-form
            (save)="onCreatePartner($event)"
            (cancel)="facade.closeDrawer()"
          />
        </div>
      </div>
    </hlm-sheet>

    <!-- Slide-over Drawer for Partner Dossier -->
    <hlm-sheet [isOpen]="facade.drawerMode() === 'detail'" (closed)="facade.closeDrawer()" sheetSize="md" side="right">
      <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div class="pb-3 border-b border-border/40 mb-4">
            <h3 class="text-base font-bold text-foreground">Partner Attribution Dossier</h3>
            <p class="text-xs text-muted-foreground mt-0.5">
              Comprehensive conversion telemetry, dedicated referral URL, and payout history.
            </p>
          </div>

          <app-affiliates-detail
            [affiliate]="facade.selected()"
            (statusChange)="onStatusChange($event)"
          />
        </div>
      </div>
    </hlm-sheet>

    <!-- Commission Rate Adjustment Modal -->
    <hlm-dialog [isOpen]="facade.drawerMode() === 'rate'" (closed)="facade.closeDrawer()">
      <app-affiliates-rate-modal
        [affiliate]="facade.selected()"
        (save)="onSaveRate($event)"
        (cancel)="facade.closeDrawer()"
      />
    </hlm-dialog>

    <!-- Delete Confirmation Modal -->
    <hlm-dialog [isOpen]="!!facade.deleteConfirmId()" (closed)="facade.cancelDelete()">
      <div class="space-y-4">
        <div class="flex items-center gap-2 text-destructive">
          <ng-icon name="lucideAlertTriangle" class="size-5" />
          <h3 class="text-base font-bold">Remove Affiliate Account?</h3>
        </div>
        <p class="text-xs text-muted-foreground">
          Are you sure you want to deactivate and remove this affiliate partner? Any uncashed referral links will cease attributing future bookings.
        </p>
        <div class="flex items-center justify-end gap-2 pt-2">
          <button hlmBtn variant="outline" size="sm" (click)="facade.cancelDelete()" class="cursor-pointer">
            Cancel
          </button>
          <button hlmBtn variant="destructive" size="sm" (click)="onConfirmDelete()" class="cursor-pointer">
            Remove Partner
          </button>
        </div>
      </div>
    </hlm-dialog>
  `,
})
export class AffiliatesPageComponent implements OnInit {
  readonly facade = inject(AffiliatesFacade)
  private readonly exportService = inject(ExportService)

  readonly statusTabs = [
    { label: 'All Partners', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Pending Review', value: 'pending' },
    { label: 'Suspended', value: 'suspended' },
  ]

  ngOnInit(): void {
    this.facade.loadAll()
  }

  async onCreatePartner(dto: any): Promise<void> {
    const ok = await this.facade.create(dto)
    if (ok) {
      toast.success('Affiliate Partner Registered', {
        description: `Partner "${dto.partnerName}" created with referral code ${dto.referralCode}.`,
      })
    } else {
      toast.error('Failed to register partner')
    }
  }

  async onStatusChange(evt: { id: string; status: any }): Promise<void> {
    const ok = await this.facade.updateStatus(evt.id, evt.status)
    if (ok) {
      toast.success('Partner Status Updated', {
        description: `Status changed to ${evt.status}.`,
      })
    }
  }

  async onSaveRate(rate: number): Promise<void> {
    const item = this.facade.selected()
    if (item) {
      const ok = await this.facade.updateCommissionRate(item.id, rate)
      if (ok) {
        toast.success('Commission Rate Updated', {
          description: `${item.partnerName}'s rate adjusted to ${rate}%.`,
        })
      }
    }
  }

  async onConfirmDelete(): Promise<void> {
    const id = this.facade.deleteConfirmId()
    if (id) {
      const ok = await this.facade.remove(id)
      if (ok) {
        toast.success('Partner Removed')
      }
    }
  }

  exportCsv(): void {
    this.exportService.exportToCsv('affiliate-partner-payouts', this.facade.items(), [
      { header: 'Partner ID', accessor: item => item.id },
      { header: 'Partner Name', accessor: item => item.partnerName },
      { header: 'Partner Email', accessor: item => item.partnerEmail },
      { header: 'Referral Code', accessor: item => item.referralCode },
      { header: 'Commission Rate (%)', accessor: item => item.commissionRate },
      { header: 'Total Clicks', accessor: item => item.totalClicks },
      { header: 'Total Bookings', accessor: item => item.totalBookings },
      { header: 'Total Commission Earned ($)', accessor: item => item.totalCommissionEarned },
      { header: 'Pending Payout ($)', accessor: item => item.pendingPayout },
      { header: 'Currency', accessor: item => item.currency },
      { header: 'Status', accessor: item => item.status },
      { header: 'Created Date', accessor: item => item.createdAt },
    ])
    toast.success('Affiliate CSV Exported')
  }

  printReport(): void {
    const rows = this.facade.items().map(a => `
      <tr>
        <td><strong>${a.partnerName}</strong><br><small>${a.partnerEmail}</small></td>
        <td><code>${a.referralCode}</code></td>
        <td style="text-align: center;">${a.commissionRate}%</td>
        <td style="text-align: right;">${a.totalBookings} / ${a.totalClicks}</td>
        <td style="text-align: right; font-weight: bold;">$${a.totalCommissionEarned.toFixed(2)}</td>
        <td style="text-align: right; color: #d97706;">$${a.pendingPayout.toFixed(2)}</td>
        <td style="text-align: center; text-transform: uppercase;">${a.status}</td>
      </tr>
    `).join('')

    this.exportService.printDocument('Affiliate & Partner Referral Directory', `
      <table>
        <thead>
          <tr>
            <th>Partner Name</th>
            <th>Referral Code</th>
            <th style="text-align: center;">Rate</th>
            <th style="text-align: right;">Bookings / Clicks</th>
            <th style="text-align: right;">Total Earned</th>
            <th style="text-align: right;">Pending Payout</th>
            <th style="text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `)
  }
}
