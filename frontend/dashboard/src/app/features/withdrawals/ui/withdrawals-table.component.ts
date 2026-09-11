import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideEye,
  lucideCreditCard,
  lucideCheckCircle2,
  lucideClock,
  lucideBuilding2,
} from '@ng-icons/lucide'
import { WithdrawalRequest } from '../data-access/models/withdrawals.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-withdrawals-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideEye,
      lucideCreditCard,
      lucideCheckCircle2,
      lucideClock,
      lucideBuilding2,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Provider Agency</th>
              <th scope="col" class="py-3.5 px-4">Payout Method</th>
              <th scope="col" class="py-3.5 px-4">Gross Amount</th>
              <th scope="col" class="py-3.5 px-4">Net Payout</th>
              <th scope="col" class="py-3.5 px-4">Status</th>
              <th scope="col" class="py-3.5 px-4">Requested Date</th>
              <th scope="col" class="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-6 w-36 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-20 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-8 w-16 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (rows.length === 0) {
              <tr>
                <td colspan="7" class="py-12 text-center text-muted-foreground">
                  <p class="text-sm font-medium">No withdrawal requests found.</p>
                </td>
              </tr>
            } @else {
              @for (w of rows; track w.id) {
                <tr class="hover:bg-muted/20 transition-colors group">
                  <!-- Provider Agency -->
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-2">
                      <ng-icon name="lucideBuilding2" class="size-4 text-primary shrink-0" />
                      <span class="font-semibold text-foreground text-sm truncate">
                        {{ w.providerName }}
                      </span>
                    </div>
                  </td>

                  <!-- Payout Method -->
                  <td class="py-3.5 px-4">
                    <div class="text-xs font-medium text-foreground capitalize">
                      {{ w.payoutMethod ? w.payoutMethod.replace('_', ' ') : 'Bank Transfer' }}
                    </div>
                    @if (w.accountLast4) {
                      <div class="text-[10px] text-muted-foreground font-mono">
                        •••• {{ w.accountLast4 }}
                      </div>
                    }
                  </td>

                  <!-- Gross Amount -->
                  <td class="py-3.5 px-4 text-xs text-muted-foreground tabular-nums">
                    \${{ w.amount | number:'1.2-2' }}
                  </td>

                  <!-- Net Payout -->
                  <td class="py-3.5 px-4 font-bold text-foreground text-sm tabular-nums">
                    \${{ w.netAmount | number:'1.2-2' }} {{ w.currency }}
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4">
                    @if (w.status === 'completed') {
                      <span hlmBadge variant="default" class="text-[11px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        Completed
                      </span>
                    } @else if (w.status === 'pending') {
                      <span hlmBadge variant="outline" class="text-[11px] text-amber-600 dark:text-amber-400 border-amber-500/30">
                        Pending Approval
                      </span>
                    } @else {
                      <span hlmBadge variant="secondary" class="text-[11px]">
                        {{ w.status }}
                      </span>
                    }
                  </td>

                  <!-- Created At -->
                  <td class="py-3.5 px-4 text-xs text-muted-foreground">
                    {{ w.createdAt | date:'mediumDate' }}
                  </td>

                  <!-- Action -->
                  <td class="py-3.5 px-4 text-right">
                    <button
                      hlmBtn
                      variant="outline"
                      size="sm"
                      class="text-xs h-8"
                      (click)="viewClicked.emit(w.id)"
                    >
                      Review Payout
                    </button>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class WithdrawalsTableComponent {
  @Input() rows: WithdrawalRequest[] = []
  @Input() isLoading: boolean = false

  @Output() viewClicked = new EventEmitter<string>()
}
