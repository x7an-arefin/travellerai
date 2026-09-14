import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowDownLeft,
  lucideArrowUpRight,
  lucideFileSpreadsheet,
} from '@ng-icons/lucide'
import { LedgerEntry } from '../data-access/models/wallets.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'

@Component({
  selector: 'app-ledger-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports],
  providers: [
    provideIcons({
      lucideArrowDownLeft,
      lucideArrowUpRight,
      lucideFileSpreadsheet,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Transaction / Type</th>
              <th scope="col" class="py-3.5 px-4">Account Classification</th>
              <th scope="col" class="py-3.5 px-4">Reference</th>
              <th scope="col" class="py-3.5 px-4">Amount</th>
              <th scope="col" class="py-3.5 px-4">Running Balance</th>
              <th scope="col" class="py-3.5 px-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (items.length === 0) {
              <tr>
                <td colspan="6" class="py-12 text-center text-muted-foreground text-sm">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <ng-icon name="lucideFileSpreadsheet" class="size-8 text-muted-foreground/50" />
                    <p>No financial ledger entries recorded</p>
                  </div>
                </td>
              </tr>
            } @else {
              @for (entry of items; track entry.id) {
                <tr class="hover:bg-muted/20 transition-colors text-xs">
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-2.5">
                      <div
                        class="size-7 rounded-full flex items-center justify-center shrink-0"
                        [class.bg-emerald-500/15]="entry.entryType === 'credit'"
                        [class.text-emerald-600]="entry.entryType === 'credit'"
                        [class.dark:text-emerald-400]="entry.entryType === 'credit'"
                        [class.bg-rose-500/15]="entry.entryType === 'debit'"
                        [class.text-rose-600]="entry.entryType === 'debit'"
                      >
                        @if (entry.entryType === 'credit') {
                          <ng-icon name="lucideArrowDownLeft" class="size-3.5" />
                        } @else {
                          <ng-icon name="lucideArrowUpRight" class="size-3.5" />
                        }
                      </div>
                      <div class="min-w-0">
                        <p class="font-semibold text-foreground truncate max-w-sm">{{ entry.description || 'Ledger Entry' }}</p>
                        <span class="text-[10px] text-muted-foreground uppercase font-mono">{{ entry.id }}</span>
                      </div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <span
                      hlmBadge
                      variant="outline"
                      class="text-[10px] capitalize font-medium"
                    >
                      {{ entry.accountType.replace('_', ' ') }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 font-mono text-[11px] text-muted-foreground">
                    {{ entry.referenceType }}: {{ entry.referenceId }}
                  </td>

                  <td class="py-3.5 px-4">
                    <span
                      class="font-bold font-mono"
                      [class.text-emerald-600]="entry.entryType === 'credit'"
                      [class.dark:text-emerald-400]="entry.entryType === 'credit'"
                      [class.text-rose-500]="entry.entryType === 'debit'"
                    >
                      {{ entry.entryType === 'credit' ? '+' : '-' }}\${{ entry.amount | number:'1.2-2' }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 font-mono font-medium text-foreground">
                    \${{ (entry.balanceAfter || 0) | number:'1.2-2' }}
                  </td>

                  <td class="py-3.5 px-4 text-right text-muted-foreground">
                    {{ entry.createdAt | date:'short' }}
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
export class LedgerTableComponent {
  @Input() items: LedgerEntry[] = []
}
