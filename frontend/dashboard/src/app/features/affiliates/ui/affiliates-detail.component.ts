import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCopy,
  lucideExternalLink,
  lucideTrendingUp,
  lucideDollarSign,
  lucideUsers,
  lucideShare2,
} from '@ng-icons/lucide'
import { AffiliateAccount } from '../data-access/models/affiliates.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-affiliates-detail',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideCopy,
      lucideExternalLink,
      lucideTrendingUp,
      lucideDollarSign,
      lucideUsers,
      lucideShare2,
    }),
  ],
  template: `
    @if (affiliate) {
      <div class="space-y-6 pt-2 text-xs">
        <!-- Partner Identification Header -->
        <div class="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-muted-foreground font-semibold uppercase">Affiliate ID: {{ affiliate.id }}</span>
            <span hlmBadge [variant]="affiliate.status === 'active' ? 'default' : 'secondary'" class="text-[10px] capitalize">
              {{ affiliate.status }}
            </span>
          </div>
          <h4 class="text-base font-bold text-foreground">{{ affiliate.partnerName }}</h4>
          <p class="text-xs text-muted-foreground">{{ affiliate.partnerEmail }}</p>
        </div>

        <!-- Tracking Link Share Box -->
        <div class="space-y-2">
          <label class="font-semibold text-foreground">Dedicated Referral Tracking Link</label>
          <div class="flex items-center gap-2 p-2.5 rounded-lg border border-primary/30 bg-primary/5">
            <input
              type="text"
              readonly
              [value]="affiliate.referralUrl || 'https://traveller.ai/?ref=' + affiliate.referralCode"
              class="w-full bg-transparent font-mono text-[11px] text-foreground focus:outline-none select-all"
            />
            <button
              type="button"
              (click)="copyLink(affiliate.referralUrl || 'https://traveller.ai/?ref=' + affiliate.referralCode)"
              class="px-2 py-1 rounded bg-primary text-primary-foreground font-semibold text-[10px] hover:bg-primary/90 transition-colors shrink-0 cursor-pointer flex items-center gap-1"
            >
              <ng-icon name="lucideCopy" class="size-3" />
              <span>Copy</span>
            </button>
          </div>
        </div>

        <!-- Attribution Metrics KPI Cards -->
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3.5 rounded-xl border border-border/50 bg-card space-y-1">
            <span class="text-[10px] font-semibold uppercase text-muted-foreground">Total Bookings</span>
            <div class="text-2xl font-bold text-foreground">{{ affiliate.totalBookings }}</div>
            <p class="text-[10px] text-muted-foreground">{{ affiliate.totalClicks | number }} clicks received</p>
          </div>

          <div class="p-3.5 rounded-xl border border-border/50 bg-card space-y-1">
            <span class="text-[10px] font-semibold uppercase text-muted-foreground">Commission Rate</span>
            <div class="text-2xl font-bold text-foreground">{{ affiliate.commissionRate }}%</div>
            <p class="text-[10px] text-muted-foreground">Per confirmed departure</p>
          </div>

          <div class="p-3.5 rounded-xl border border-border/50 bg-card space-y-1">
            <span class="text-[10px] font-semibold uppercase text-muted-foreground">Lifetime Earnings</span>
            <div class="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              \${{ affiliate.totalCommissionEarned | number:'1.2-2' }}
            </div>
            <p class="text-[10px] text-muted-foreground">Settled & cleared</p>
          </div>

          <div class="p-3.5 rounded-xl border border-border/50 bg-card space-y-1">
            <span class="text-[10px] font-semibold uppercase text-muted-foreground">Pending Payout</span>
            <div class="text-xl font-bold text-amber-600 dark:text-amber-400">
              \${{ affiliate.pendingPayout | number:'1.2-2' }}
            </div>
            <p class="text-[10px] text-muted-foreground">Scheduled next cycle</p>
          </div>
        </div>

        <!-- Quick Lifecycle Operations -->
        <div class="space-y-2 pt-2 border-t border-border/40">
          <label class="font-semibold text-foreground">Partner Status Transitions</label>
          <div class="flex items-center gap-2">
            @if (affiliate.status !== 'active') {
              <button
                hlmBtn
                variant="default"
                size="sm"
                class="w-full cursor-pointer text-xs"
                (click)="statusChange.emit({ id: affiliate.id, status: 'active' })"
              >
                Approve & Activate Partner
              </button>
            }
            @if (affiliate.status === 'active') {
              <button
                hlmBtn
                variant="destructive"
                size="sm"
                class="w-full cursor-pointer text-xs"
                (click)="statusChange.emit({ id: affiliate.id, status: 'suspended' })"
              >
                Suspend Affiliate
              </button>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class AffiliatesDetailComponent {
  @Input() affiliate: AffiliateAccount | null = null
  @Output() statusChange = new EventEmitter<{ id: string; status: 'pending' | 'active' | 'suspended' | 'rejected' }>()

  copyLink(url: string): void {
    navigator.clipboard.writeText(url)
    toast.success('Affiliate link copied to clipboard!', { description: url })
  }
}
