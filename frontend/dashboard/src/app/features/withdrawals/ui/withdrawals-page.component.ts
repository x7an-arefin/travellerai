import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCreditCard,
  lucideDownload,
  lucideFilter,
} from '@ng-icons/lucide'
import { WithdrawalsFacade } from '../data-access/withdrawals.facade'
import { WithdrawalRequest } from '../data-access/models/withdrawals.model'
import { ExportService } from '../../../core/services/export.service'
import { WithdrawalsTableComponent } from './withdrawals-table.component'
import { WithdrawalsDetailComponent } from './withdrawals-detail.component'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmSheetImports } from '../../../ui/sheet/hlm-sheet.components'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-withdrawals-page',
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
    WithdrawalsTableComponent,
    WithdrawalsDetailComponent,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucideCreditCard,
      lucideDownload,
      lucideFilter,
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
    <app-main>
      <!-- Page Header -->
      <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight">Payouts & Withdrawals</h1>
            <span hlmBadge variant="outline" class="text-xs">
              18 Pending Payouts
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Review earnings withdrawals requested by partner agencies, tour operators, and local hosts.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            size="sm"
            class="gap-1.5 cursor-pointer h-9 shadow-xs"
            (click)="exportSummary()"
          >
            <ng-icon name="lucideDownload" class="size-4" />
            <span>Export Settlement Log</span>
          </button>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-4 flex items-center justify-between gap-3">
        <div class="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/40 shrink-0">
          <button
            type="button"
            (click)="facade.setStatusFilter('all')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.statusFilter() === 'all'"
            [class.shadow-2xs]="facade.statusFilter() === 'all'"
            [class.text-foreground]="facade.statusFilter() === 'all'"
            [class.text-muted-foreground]="facade.statusFilter() !== 'all'"
          >
            All Requests
          </button>
          <button
            type="button"
            (click)="facade.setStatusFilter('pending')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.statusFilter() === 'pending'"
            [class.shadow-2xs]="facade.statusFilter() === 'pending'"
            [class.text-foreground]="facade.statusFilter() === 'pending'"
            [class.text-muted-foreground]="facade.statusFilter() !== 'pending'"
          >
            Pending
          </button>
          <button
            type="button"
            (click)="facade.setStatusFilter('completed')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.statusFilter() === 'completed'"
            [class.shadow-2xs]="facade.statusFilter() === 'completed'"
            [class.text-foreground]="facade.statusFilter() === 'completed'"
            [class.text-muted-foreground]="facade.statusFilter() !== 'completed'"
          >
            Disbursed
          </button>
        </div>
      </div>

      <!-- Withdrawals Table -->
      <app-withdrawals-table
        [rows]="facade.items()"
        [isLoading]="facade.isLoading()"
        (viewClicked)="facade.openDetailDrawer($event)"
      />

      <!-- Right Drawer for Payout Review -->
      <hlm-sheet
        [isOpen]="facade.drawerMode() === 'detail'"
        (closed)="facade.closeDrawer()"
        sheetSize="md"
        side="right"
      >
        <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
          <div>
            <div class="pb-3 border-b border-border/40 mb-3">
              <h3 class="text-lg font-bold text-foreground">Withdrawal Settlement Review</h3>
              <p class="text-xs text-muted-foreground">Verify provider bank credentials and authorize wire disbursement.</p>
            </div>

            <app-withdrawals-detail
              [withdrawal]="facade.selected()"
              (settlePayout)="onSettlePayout($event)"
              (rejectPayout)="onRejectPayout($event)"
            />
          </div>

          <div class="pt-4 mt-6 border-t border-border/40 flex justify-end gap-2">
            <button
              hlmBtn
              variant="outline"
              size="sm"
              (click)="facade.closeDrawer()"
            >
              Close
            </button>
          </div>
        </div>
      </hlm-sheet>
    </app-main>
  `,
})
export class WithdrawalsPageComponent implements OnInit {
  protected readonly facade = inject(WithdrawalsFacade)
  private readonly exportService = inject(ExportService)

  ngOnInit(): void {
    this.facade.loadAll()
  }

  exportSummary(): void {
    this.exportService.exportToCsv('withdrawal-settlements-batch', this.facade.items(), [
      { header: 'Withdrawal ID', accessor: (w: WithdrawalRequest) => w.id },
      { header: 'Provider', accessor: (w: WithdrawalRequest) => w.providerName },
      { header: 'Amount ($)', accessor: (w: WithdrawalRequest) => w.amount },
      { header: 'Fee ($)', accessor: (w: WithdrawalRequest) => w.feeAmount || 0 },
      { header: 'Net Settlement ($)', accessor: (w: WithdrawalRequest) => w.netAmount },
      { header: 'Payout Method', accessor: (w: WithdrawalRequest) => w.payoutMethod },
      { header: 'Account Last 4', accessor: (w: WithdrawalRequest) => w.accountLast4 || '' },
      { header: 'Status', accessor: (w: WithdrawalRequest) => w.status },
      { header: 'Requested At', accessor: (w: WithdrawalRequest) => w.createdAt },
      { header: 'Processed At', accessor: (w: WithdrawalRequest) => w.processedAt || '' },
    ])
    toast.success('Settlement Batch CSV Downloaded')
  }

  async onSettlePayout(evt: { id: string; reference: string }): Promise<void> {
    const ok = await this.facade.update(evt.id, {
      status: 'completed',
      processedAt: new Date().toISOString(),
    })
    if (ok) {
      toast.success('Payout Settlement Finalized', {
        description: `Wire reference ${evt.reference} recorded and funds cleared.`,
      })
      this.facade.closeDrawer()
    }
  }

  async onRejectPayout(evt: { id: string; reason: string }): Promise<void> {
    const ok = await this.facade.update(evt.id, {
      status: 'rejected',
      processedAt: new Date().toISOString(),
    })
    if (ok) {
      toast.error('Payout Request Rejected', {
        description: `Funds returned to provider wallet. Reason: ${evt.reason}`,
      })
      this.facade.closeDrawer()
    }
  }
}
