import { Component, OnInit, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideWallet,
  lucideTrendingUp,
  lucideFilter,
  lucideArrowUpRight,
  lucideFileSpreadsheet,
} from '@ng-icons/lucide'
import { WalletsFacade } from '../data-access/wallets.facade'
import { WalletsOverviewComponent } from './wallets-overview.component'
import { LedgerTableComponent } from './ledger-table.component'
import { PayoutAccountModalComponent } from './payout-account-modal.component'
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
  selector: 'app-wallets-page',
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
    WalletsOverviewComponent,
    LedgerTableComponent,
    PayoutAccountModalComponent,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucideWallet,
      lucideTrendingUp,
      lucideFilter,
      lucideArrowUpRight,
      lucideFileSpreadsheet,
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
      <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2.5">
            <div class="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ng-icon name="lucideWallet" class="size-4.5" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl font-bold tracking-tight">Financial Wallet & Ledger</h1>
                <span hlmBadge variant="outline" class="text-xs">
                  Live Balance
                </span>
              </div>
              <p class="text-xs text-muted-foreground mt-0.5">
                Audit-grade double-entry financial ledger, operator balance clearance, and settlement payout accounts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Wallet Balances & Linked Accounts -->
      <app-wallets-overview
        [wallet]="facade.wallet()"
        [payoutAccounts]="facade.payoutAccounts()"
        (addAccount)="isAddAccountOpen.set(true)"
      />

      <!-- Ledger Filter Bar & Header -->
      <div class="mt-8 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="text-base font-bold text-foreground">Double-Entry Transaction Ledger</h3>
          <p class="text-xs text-muted-foreground">Immutable audit log of all booking earnings, platform commissions, and refunds.</p>
        </div>

        <!-- Filter Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          @for (tab of ledgerFilterTabs; track tab.value) {
            <button
              hlmBtn
              [variant]="facade.ledgerFilter() === tab.value ? 'default' : 'ghost'"
              size="sm"
              class="h-7 text-xs px-2.5 rounded-lg cursor-pointer"
              (click)="facade.setLedgerFilter(tab.value)"
            >
              {{ tab.label }}
            </button>
          }
        </div>
      </div>

      <!-- Ledger Table -->
      <app-ledger-table [items]="facade.ledger()" />
    </app-main>

    <!-- Add Payout Account Drawer -->
    <hlm-sheet [isOpen]="isAddAccountOpen()" (closed)="isAddAccountOpen.set(false)" sheetSize="md" side="right">
      <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div class="pb-3 border-b border-border/40 mb-4">
            <h3 class="text-base font-bold text-foreground">Connect Payout Method</h3>
            <p class="text-xs text-muted-foreground mt-0.5">
              Configure a verified bank account or Stripe Express destination for automatic withdrawal payouts.
            </p>
          </div>

          <div class="py-2">
            <app-payout-account-modal
              (save)="onSaveAccount($event)"
              (cancel)="isAddAccountOpen.set(false)"
            />
          </div>
        </div>
      </div>
    </hlm-sheet>
  `,
})
export class WalletsPageComponent implements OnInit {
  readonly facade = inject(WalletsFacade)
  readonly isAddAccountOpen = signal<boolean>(false)

  readonly ledgerFilterTabs = [
    { label: 'All Transactions', value: 'all' },
    { label: 'Earnings (+)', value: 'credit' },
    { label: 'Debits (-)', value: 'debit' },
    { label: 'Commissions', value: 'platform_commission' },
    { label: 'Withdrawals', value: 'withdrawal' },
  ]

  ngOnInit(): void {
    this.facade.loadWalletData()
  }

  async onSaveAccount(dto: any): Promise<void> {
    const ok = await this.facade.addPayoutAccount(dto)
    if (ok) {
      toast.success('Payout method connected successfully!')
      this.isAddAccountOpen.set(false)
    } else {
      toast.error('Failed to link payout account.')
    }
  }
}
