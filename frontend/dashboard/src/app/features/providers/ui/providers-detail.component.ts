import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideBuilding2,
  lucideShieldCheck,
  lucideMapPin,
  lucideMail,
  lucidePhone,
  lucideGlobe,
  lucideStar,
  lucideCalendar,
  lucideCheckCircle2,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { Provider } from '../data-access/models/providers.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-providers-detail',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideBuilding2,
      lucideShieldCheck,
      lucideMapPin,
      lucideMail,
      lucidePhone,
      lucideGlobe,
      lucideStar,
      lucideCalendar,
      lucideCheckCircle2,
      lucideAlertTriangle,
    }),
  ],
  template: `
    @if (provider) {
      <div class="space-y-6 pt-2">
        <!-- Header -->
        <div class="p-4 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <ng-icon name="lucideBuilding2" class="size-6" />
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h3 class="text-base font-bold text-foreground">{{ provider.displayName }}</h3>
                @if (provider.verifiedBadge) {
                  <ng-icon name="lucideShieldCheck" class="size-4 text-emerald-500" title="KYC Verified" />
                }
              </div>
              <p class="text-xs text-muted-foreground">{{ provider.legalName }}</p>
            </div>
          </div>

          <span hlmBadge variant="outline" class="text-xs uppercase font-semibold">
            {{ provider.providerType.replace('_', ' ') }}
          </span>
        </div>

        <!-- Metric Summary -->
        <div class="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-muted/40 border border-border/40 text-center">
          <div>
            <span class="text-[11px] text-muted-foreground uppercase font-semibold">Commission</span>
            <div class="text-base font-bold text-foreground mt-0.5">{{ provider.commissionRate }}%</div>
            <span class="text-[10px] text-muted-foreground">Standard rate</span>
          </div>

          <div>
            <span class="text-[11px] text-muted-foreground uppercase font-semibold">Rating</span>
            <div class="text-base font-bold text-amber-500 flex items-center justify-center gap-1 mt-0.5">
              <ng-icon name="lucideStar" class="size-3.5 fill-amber-500" />
              <span>{{ provider.rating }}</span>
            </div>
            <span class="text-[10px] text-muted-foreground">Customer score</span>
          </div>

          <div>
            <span class="text-[11px] text-muted-foreground uppercase font-semibold">Completed</span>
            <div class="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {{ provider.totalBookings }}
            </div>
            <span class="text-[10px] text-muted-foreground">Tours fulfilled</span>
          </div>
        </div>

        <!-- Verification Status & Actions -->
        <div class="p-4 rounded-xl border border-border/50 bg-card space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-muted-foreground">KYC & Compliance</span>
            @if (provider.kycStatus === 'approved') {
              <span hlmBadge variant="default" class="text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Verified Provider
              </span>
            } @else {
              <span hlmBadge variant="outline" class="text-xs text-amber-600 dark:text-amber-400 border-amber-500/30">
                Action Required
              </span>
            }
          </div>

          <p class="text-xs text-muted-foreground leading-relaxed">
            @if (provider.kycStatus === 'approved') {
              Government trade license, tax certificates, liability insurance, and guide licenses are verified and in good standing.
            } @else {
              Registration documents uploaded are under review by compliance team. Withdrawals restricted until verification completes.
            }
          </p>

          @if (provider.kycStatus !== 'approved') {
            <div class="flex items-center gap-2 pt-1">
              <button hlmBtn variant="default" size="sm" class="text-xs w-full" (click)="approveKyc.emit(provider.id)">
                Approve KYC Verification
              </button>
            </div>
          }
        </div>

        <!-- Contact & Legal Info -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact & Registration</h4>
          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground">Country Hub</span>
              <span class="font-semibold text-foreground">{{ provider.country }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground">Registration #</span>
              <span class="font-mono text-foreground">{{ provider.registrationNumber || 'N/A' }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground flex items-center gap-1">
                <ng-icon name="lucideMail" class="size-3 text-muted-foreground" />
                Email
              </span>
              <span class="font-semibold text-foreground">{{ provider.contactEmail }}</span>
            </div>

            @if (provider.contactPhone) {
              <div class="flex items-center justify-between py-1.5 border-b border-border/30">
                <span class="text-muted-foreground flex items-center gap-1">
                  <ng-icon name="lucidePhone" class="size-3 text-muted-foreground" />
                  Phone
                </span>
                <span class="font-semibold text-foreground">{{ provider.contactPhone }}</span>
              </div>
            }

            @if (provider.website) {
              <div class="flex items-center justify-between py-1.5 border-b border-border/30">
                <span class="text-muted-foreground flex items-center gap-1">
                  <ng-icon name="lucideGlobe" class="size-3 text-muted-foreground" />
                  Website
                </span>
                <a [href]="provider.website" target="_blank" class="text-primary hover:underline font-medium">
                  {{ provider.website }}
                </a>
              </div>
            }
          </div>
        </div>

        <!-- Description -->
        @if (provider.description) {
          <div class="space-y-1.5">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Business Overview</h4>
            <p class="text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/30">
              {{ provider.description }}
            </p>
          </div>
        }
      </div>
    }
  `,
})
export class ProvidersDetailComponent {
  @Input() provider: Provider | null = null
  @Output() approveKyc = new EventEmitter<string>()
}
