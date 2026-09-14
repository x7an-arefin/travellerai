import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideEye,
  lucidePercent,
  lucideCopy,
  lucideCheck,
  lucideMoreVertical,
  lucideTrash2,
  lucideShieldAlert,
  lucideShieldCheck,
} from '@ng-icons/lucide'
import { AffiliateAccount } from '../data-access/models/affiliates.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-affiliates-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideEye,
      lucidePercent,
      lucideCopy,
      lucideCheck,
      lucideMoreVertical,
      lucideTrash2,
      lucideShieldAlert,
      lucideShieldCheck,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Partner Name & Contact</th>
              <th scope="col" class="py-3.5 px-4">Referral Code</th>
              <th scope="col" class="py-3.5 px-4 text-center">Commission Rate</th>
              <th scope="col" class="py-3.5 px-4 text-right">Traffic / Bookings</th>
              <th scope="col" class="py-3.5 px-4 text-right">Earned Total</th>
              <th scope="col" class="py-3.5 px-4 text-right">Pending Payout</th>
              <th scope="col" class="py-3.5 px-4 text-center">Status</th>
              <th scope="col" class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3, 4]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-4 w-36 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-center"><div class="h-4 w-12 bg-muted rounded mx-auto"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-4 w-20 bg-muted rounded ml-auto"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-4 w-16 bg-muted rounded ml-auto"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-4 w-16 bg-muted rounded ml-auto"></div></td>
                  <td class="py-4 px-4 text-center"><div class="h-5 w-14 bg-muted rounded-full mx-auto"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-6 w-16 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (items.length === 0) {
              <tr>
                <td colspan="8" class="py-12 text-center text-muted-foreground text-xs">
                  No affiliate accounts found matching current filters.
                </td>
              </tr>
            } @else {
              @for (item of items; track item.id) {
                <tr class="hover:bg-muted/20 transition-colors text-xs">
                  <td class="py-3.5 px-4">
                    <div class="font-semibold text-foreground">{{ item.partnerName }}</div>
                    <div class="text-[11px] text-muted-foreground">{{ item.partnerEmail }}</div>
                  </td>

                  <td class="py-3.5 px-4">
                    <button
                      type="button"
                      (click)="copyCode(item.referralCode)"
                      class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-muted/60 hover:bg-muted font-mono text-[11px] text-foreground transition-colors cursor-pointer border border-border/40 group"
                      title="Copy referral code"
                    >
                      <span>{{ item.referralCode }}</span>
                      <ng-icon name="lucideCopy" class="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                  </td>

                  <td class="py-3.5 px-4 text-center">
                    <span class="inline-flex items-center gap-0.5 font-semibold text-foreground">
                      {{ item.commissionRate }}%
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <div class="font-medium text-foreground">{{ item.totalBookings }} bookings</div>
                    <div class="text-[11px] text-muted-foreground">{{ item.totalClicks | number }} clicks</div>
                  </td>

                  <td class="py-3.5 px-4 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                    \${{ item.totalCommissionEarned | number:'1.2-2' }}
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <span class="font-medium" [class.text-amber-600]="item.pendingPayout > 0" [class.dark:text-amber-400]="item.pendingPayout > 0">
                      \${{ item.pendingPayout | number:'1.2-2' }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-center">
                    <span
                      hlmBadge
                      [variant]="getStatusVariant(item.status)"
                      class="text-[10px] capitalize font-medium"
                    >
                      {{ item.status }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-foreground"
                        (click)="viewDetail.emit(item)"
                        title="View Partner Dossier"
                      >
                        <ng-icon name="lucideEye" class="size-3.5" />
                      </button>

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-primary"
                        (click)="adjustRate.emit(item)"
                        title="Adjust Commission Rate"
                      >
                        <ng-icon name="lucidePercent" class="size-3.5" />
                      </button>

                      @if (item.status === 'active') {
                        <button
                          hlmBtn
                          variant="ghost"
                          size="sm"
                          class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-amber-500"
                          (click)="statusChange.emit({ id: item.id, status: 'suspended' })"
                          title="Suspend Partner"
                        >
                          <ng-icon name="lucideShieldAlert" class="size-3.5" />
                        </button>
                      } @else if (item.status === 'suspended' || item.status === 'pending') {
                        <button
                          hlmBtn
                          variant="ghost"
                          size="sm"
                          class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-emerald-500"
                          (click)="statusChange.emit({ id: item.id, status: 'active' })"
                          title="Activate Partner"
                        >
                          <ng-icon name="lucideShieldCheck" class="size-3.5" />
                        </button>
                      }

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-rose-500"
                        (click)="deleteItem.emit(item.id)"
                        title="Delete Partner"
                      >
                        <ng-icon name="lucideTrash2" class="size-3.5" />
                      </button>
                    </div>
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
export class AffiliatesTableComponent {
  @Input() items: AffiliateAccount[] = []
  @Input() isLoading = false
  @Output() viewDetail = new EventEmitter<AffiliateAccount>()
  @Output() adjustRate = new EventEmitter<AffiliateAccount>()
  @Output() statusChange = new EventEmitter<{ id: string; status: 'pending' | 'active' | 'suspended' | 'rejected' }>()
  @Output() deleteItem = new EventEmitter<string>()

  getStatusVariant(status: string): 'default' | 'secondary' | 'outline' | 'destructive' {
    switch (status) {
      case 'active':
        return 'default'
      case 'pending':
        return 'secondary'
      case 'suspended':
      case 'rejected':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  copyCode(code: string): void {
    navigator.clipboard.writeText(code)
    toast.success('Referral code copied to clipboard!', { description: code })
  }
}
