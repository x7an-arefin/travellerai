import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideWallet,
  lucideTrendingUp,
  lucideClock,
  lucideCreditCard,
  lucideShieldCheck,
  lucidePlus,
} from '@ng-icons/lucide'
import { ProviderWallet, PayoutAccount } from '../data-access/models/wallets.model'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'

@Component({
  selector: 'app-wallets-overview',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmCardImports, ...HlmButtonImports, ...HlmBadgeImports],
  providers: [
    provideIcons({
      lucideWallet,
      lucideTrendingUp,
      lucideClock,
      lucideCreditCard,
      lucideShieldCheck,
      lucidePlus,
    }),
  ],
  template: `
    <div class="space-y-6">
      <!-- Balance KPI Grid -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Available Balance -->
        <div hlmCard class="p-5 relative overflow-hidden bg-card border border-border/50 shadow-xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Available for Payout</span>
            <div class="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ng-icon name="lucideWallet" class="size-4" />
            </div>
          </div>
          <div class="mt-3">
            <span class="text-2xl font-bold tracking-tight text-foreground">
              \${{ (wallet?.availableBalance || 0) | number:'1.2-2' }}
            </span>
            <span class="text-xs text-muted-foreground ml-1">{{ wallet?.currency || 'USD' }}</span>
          </div>
          <p class="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <ng-icon name="lucideShieldCheck" class="size-3" />
            <span>Ready for withdrawal</span>
          </p>
        </div>

        <!-- Pending Clearance -->
        <div hlmCard class="p-5 relative overflow-hidden bg-card border border-border/50 shadow-xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pending Settlements</span>
            <div class="size-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <ng-icon name="lucideClock" class="size-4" />
            </div>
          </div>
          <div class="mt-3">
            <span class="text-2xl font-bold tracking-tight text-foreground">
              \${{ (wallet?.pendingBalance || 0) | number:'1.2-2' }}
            </span>
            <span class="text-xs text-muted-foreground ml-1">{{ wallet?.currency || 'USD' }}</span>
          </div>
          <p class="text-[11px] text-muted-foreground mt-1">
            Maturing upon tour departure completion
          </p>
        </div>

        <!-- Reserved Escrow -->
        <div hlmCard class="p-5 relative overflow-hidden bg-card border border-border/50 shadow-xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Security Reserve</span>
            <div class="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ng-icon name="lucideShieldCheck" class="size-4" />
            </div>
          </div>
          <div class="mt-3">
            <span class="text-2xl font-bold tracking-tight text-foreground">
              \${{ (wallet?.reservedBalance || 0) | number:'1.2-2' }}
            </span>
            <span class="text-xs text-muted-foreground ml-1">{{ wallet?.currency || 'USD' }}</span>
          </div>
          <p class="text-[11px] text-muted-foreground mt-1">
            Dispute & chargeback protection buffer
          </p>
        </div>

        <!-- Total Withdrawn -->
        <div hlmCard class="p-5 relative overflow-hidden bg-card border border-border/50 shadow-xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Lifetime Paid</span>
            <div class="size-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <ng-icon name="lucideTrendingUp" class="size-4" />
            </div>
          </div>
          <div class="mt-3">
            <span class="text-2xl font-bold tracking-tight text-foreground">
              \${{ (wallet?.withdrawnBalance || 0) | number:'1.2-2' }}
            </span>
            <span class="text-xs text-muted-foreground ml-1">{{ wallet?.currency || 'USD' }}</span>
          </div>
          <p class="text-[11px] text-muted-foreground mt-1">
            Disbursed across verified bank accounts
          </p>
        </div>
      </div>

      <!-- Connected Payout Accounts Section -->
      <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs">
        <div class="flex items-center justify-between mb-3">
          <div>
            <h4 class="text-sm font-bold text-foreground">Linked Payout Accounts</h4>
            <p class="text-xs text-muted-foreground">Bank destinations for automated settlement disbursements.</p>
          </div>
          <button
            hlmBtn
            variant="outline"
            size="sm"
            class="h-8 gap-1.5 cursor-pointer text-xs"
            (click)="addAccount.emit()"
          >
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Connect Payout Method</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          @for (acc of payoutAccounts; track acc.id) {
            <div class="p-3.5 rounded-lg border border-border/40 bg-muted/20 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <ng-icon name="lucideCreditCard" class="size-4" />
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="font-semibold text-foreground text-xs">{{ acc.institutionName }}</span>
                    @if (acc.isDefault) {
                      <span class="text-[10px] px-1.5 py-0.2 rounded bg-primary/10 text-primary font-medium">Default</span>
                    }
                  </div>
                  <p class="text-[11px] text-muted-foreground font-mono">{{ acc.accountNumberMasked }} · {{ acc.currency }}</p>
                </div>
              </div>

              <span
                hlmBadge
                variant="outline"
                class="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/30 capitalize"
              >
                {{ acc.verificationStatus }}
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class WalletsOverviewComponent {
  @Input() wallet: ProviderWallet | null = null
  @Input() payoutAccounts: PayoutAccount[] = []

  @Output() addAccount = new EventEmitter<void>()
}
