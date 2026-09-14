import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCopy,
  lucideTag,
  lucideEdit,
  lucideTrash2,
  lucideCheck,
  lucidePower,
  lucideCalendar,
} from '@ng-icons/lucide'
import { Coupon } from '../data-access/models/campaigns.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-campaigns-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideCopy,
      lucideTag,
      lucideEdit,
      lucideTrash2,
      lucideCheck,
      lucidePower,
      lucideCalendar,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Coupon Code & Description</th>
              <th scope="col" class="py-3.5 px-4">Discount Value</th>
              <th scope="col" class="py-3.5 px-4 text-center">Redemptions / Cap</th>
              <th scope="col" class="py-3.5 px-4">Min. Cart & Cap</th>
              <th scope="col" class="py-3.5 px-4">Validity Expiry</th>
              <th scope="col" class="py-3.5 px-4 text-center">Status</th>
              <th scope="col" class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-4 w-36 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-20 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-center"><div class="h-4 w-20 bg-muted rounded mx-auto"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-center"><div class="h-5 w-16 bg-muted rounded-full mx-auto"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-6 w-20 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (items.length === 0) {
              <tr>
                <td colspan="7" class="py-12 text-center text-muted-foreground text-xs">
                  No discount campaigns or promo codes found matching current filters.
                </td>
              </tr>
            } @else {
              @for (c of items; track c.id) {
                <tr class="hover:bg-muted/20 transition-colors text-xs">
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        (click)="copyCode(c.code)"
                        class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-muted/60 hover:bg-muted font-mono text-[11px] font-bold text-foreground transition-colors cursor-pointer border border-border/40 group"
                        title="Click to copy code"
                      >
                        <span>{{ c.code }}</span>
                        <ng-icon name="lucideCopy" class="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </button>
                      <span class="text-[10px] text-muted-foreground capitalize">({{ c.funder }} funded)</span>
                    </div>
                    @if (c.description) {
                      <div class="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{{ c.description }}</div>
                    }
                  </td>

                  <td class="py-3.5 px-4">
                    <span
                      hlmBadge
                      variant="default"
                      class="font-mono text-xs font-bold"
                    >
                      {{ c.discountType === 'percentage' ? c.discountValue + '% OFF' : '-$' + c.discountValue }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-center">
                    <div class="font-medium text-foreground">
                      {{ c.usedCount }} / {{ c.maxUses || '∞' }}
                    </div>
                    @if (c.maxUses) {
                      <div class="w-20 mx-auto bg-muted rounded-full h-1 mt-1 overflow-hidden">
                        <div
                          class="h-full bg-primary rounded-full"
                          [style.width.%]="Math.min(100, (c.usedCount / c.maxUses) * 100)"
                        ></div>
                      </div>
                    }
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="text-foreground font-medium">
                      {{ c.minBookingValue ? 'Min: $' + c.minBookingValue : 'No Min' }}
                    </div>
                    @if (c.maxDiscount) {
                      <div class="text-[10px] text-muted-foreground">Max cap: \${{ c.maxDiscount }}</div>
                    }
                  </td>

                  <td class="py-3.5 px-4">
                    @if (c.expiresAt) {
                      <div class="font-medium text-foreground">{{ c.expiresAt | date:'mediumDate' }}</div>
                      @if (isExpired(c.expiresAt)) {
                        <span class="text-[10px] text-rose-500 font-semibold">Expired</span>
                      }
                    } @else {
                      <span class="text-muted-foreground">No Expiry</span>
                    }
                  </td>

                  <td class="py-3.5 px-4 text-center">
                    <span
                      hlmBadge
                      [variant]="getStatusVariant(c.status)"
                      class="text-[10px] capitalize font-medium"
                    >
                      {{ c.status }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0 cursor-pointer"
                        [class.text-emerald-500]="c.status === 'active'"
                        [class.text-muted-foreground]="c.status !== 'active'"
                        (click)="toggleActive.emit(c.id)"
                        title="Toggle Active Status"
                      >
                        <ng-icon name="lucidePower" class="size-3.5" />
                      </button>

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-foreground"
                        (click)="editClick.emit(c)"
                        title="Edit Promo Rules"
                      >
                        <ng-icon name="lucideEdit" class="size-3.5" />
                      </button>

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-rose-500"
                        (click)="deleteClick.emit(c.id)"
                        title="Delete Coupon"
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
export class CampaignsTableComponent {
  @Input() items: Coupon[] = []
  @Input() isLoading = false
  @Output() toggleActive = new EventEmitter<string>()
  @Output() editClick = new EventEmitter<Coupon>()
  @Output() deleteClick = new EventEmitter<string>()

  readonly Math = Math

  copyCode(code: string): void {
    navigator.clipboard.writeText(code)
    toast.success('Voucher code copied!', { description: code })
  }

  isExpired(dateStr?: string): boolean {
    if (!dateStr) return false
    return new Date(dateStr) < new Date()
  }

  getStatusVariant(status: string): 'default' | 'secondary' | 'outline' | 'destructive' {
    switch (status) {
      case 'active':
        return 'default'
      case 'inactive':
        return 'secondary'
      case 'expired':
        return 'destructive'
      default:
        return 'outline'
    }
  }
}
