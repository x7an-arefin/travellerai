import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { WithdrawalRequest } from '../data-access/models/withdrawals.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-withdrawals-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmBadgeImports, ...HlmButtonImports],
  template: `
    @if (withdrawal) {
      <div class="space-y-6 pt-2 text-xs">
        <!-- Amount Box -->
        <div class="p-5 rounded-xl bg-muted/40 border border-border/40 text-center space-y-1">
          <span class="text-[11px] text-muted-foreground uppercase font-semibold">Net Settlement Amount</span>
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

        <!-- Settlement Workflow Actions -->
        @if (withdrawal.status === 'pending') {
          <div class="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
            <h5 class="text-xs font-bold text-foreground">Complete Banking Wire / Stripe Payout</h5>
            <p class="text-[11px] text-muted-foreground">
              Enter the bank transaction reference or Stripe payout ID to mark funds as settled.
            </p>

            <div class="space-y-1">
              <label class="font-medium text-foreground">Transaction / Wire Reference #</label>
              <input
                type="text"
                [(ngModel)]="wireReference"
                placeholder="e.g. WIRE-CH-99201948"
                class="w-full px-3 py-1.5 rounded-lg border border-border bg-background font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              hlmBtn
              variant="default"
              class="w-full text-xs cursor-pointer"
              (click)="onApprove()"
            >
              Confirm Settlement (\${{ withdrawal.netAmount | number:'1.2-2' }})
            </button>
          </div>

          <div class="p-4 rounded-xl border border-destructive/20 bg-destructive/5 space-y-2">
            <h5 class="text-xs font-bold text-destructive">Reject Payout Request</h5>
            <p class="text-[11px] text-muted-foreground">
              Rejecting will automatically unlock and reverse the reserved balance back to the operator's live ledger.
            </p>
            <input
              type="text"
              [(ngModel)]="rejectionReason"
              placeholder="Reason for rejection (e.g. Bank IBAN mismatch)..."
              class="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-destructive"
            />
            <button
              hlmBtn
              variant="destructive"
              class="w-full text-xs cursor-pointer"
              [disabled]="!rejectionReason.trim()"
              (click)="onReject()"
            >
              Reject Payout & Return Funds
            </button>
          </div>
        }
      </div>
    }
  `,
})
export class WithdrawalsDetailComponent {
  @Input() withdrawal: WithdrawalRequest | null = null
  @Output() settlePayout = new EventEmitter<{ id: string; reference: string }>()
  @Output() rejectPayout = new EventEmitter<{ id: string; reason: string }>()

  wireReference = ''
  rejectionReason = ''

  onApprove(): void {
    if (!this.withdrawal) return
    this.settlePayout.emit({
      id: this.withdrawal.id,
      reference: this.wireReference.trim() || `WIRE-${Date.now().toString().slice(-6)}`,
    })
  }

  onReject(): void {
    if (!this.withdrawal || !this.rejectionReason.trim()) return
    this.rejectPayout.emit({
      id: this.withdrawal.id,
      reason: this.rejectionReason.trim(),
    })
  }
}
