import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCreditCard,
  lucideBuilding2,
  lucideCheckCircle2,
  lucideClock,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { WithdrawalRequest } from '../data-access/models/withdrawals.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-withdrawals-detail',
  standalone: true,
  imports: [CommonModule, ...HlmBadgeImports, ...HlmButtonImports],
  template: `
    @if (withdrawal) {
      <div class="space-y-6 pt-2">
        <!-- Amount Box -->
        <div class="p-5 rounded-xl bg-muted/40 border border-border/40 text-center space-y-1">
          <span class="text-xs text-muted-foreground uppercase font-semibold">Net Settlement Amount</span>
          <div class="text-3xl font-bold text-foreground tabular-nums">
            \${{ withdrawal.netAmount | number:'1.2-2' }}
          </div>
          <span class="text-xs text-muted-foreground">{{ withdrawal.currency }} via {{ withdrawal.payoutMethod?.replace('_', ' ') }}</span>
        </div>

        <!-- Specifications -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Transaction Breakdown</h4>
          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground">Provider Beneficiary</span>
              <span class="font-semibold text-foreground">{{ withdrawal.providerName }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground">Requested Gross</span>
              <span class="font-medium text-foreground">\${{ withdrawal.amount | number:'1.2-2' }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground">Gateway Wire Fee</span>
              <span class="font-medium text-foreground">\${{ withdrawal.feeAmount || 0 | number:'1.2-2' }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground">Target Account</span>
              <span class="font-mono text-foreground">•••• {{ withdrawal.accountLast4 || '4489' }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground">Status</span>
              <span class="font-semibold capitalize text-foreground">{{ withdrawal.status }}</span>
            </div>
          </div>
        </div>

        <!-- Settlement Actions -->
        @if (withdrawal.status === 'pending') {
          <div class="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
            <h5 class="text-xs font-bold text-foreground">Approve & Disburse Payout</h5>
            <p class="text-xs text-muted-foreground">
              Confirming will initiate automated wire transfer to the provider's verified payout account.
            </p>
            <button
              hlmBtn
              variant="default"
              class="w-full text-xs"
              (click)="approvePayout.emit(withdrawal.id)"
            >
              Approve & Wire Payout (\${{ withdrawal.netAmount | number:'1.2-2' }})
            </button>
          </div>
        }
      </div>
    }
  `,
})
export class WithdrawalsDetailComponent {
  @Input() withdrawal: WithdrawalRequest | null = null
  @Output() approvePayout = new EventEmitter<string>()
}
