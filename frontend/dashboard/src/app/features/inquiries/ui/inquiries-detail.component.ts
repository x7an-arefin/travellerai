import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideUsers,
  lucideDollarSign,
  lucideCalendar,
  lucideSend,
  lucideCheckCircle2,
  lucideCompass,
  lucideCopy,
  lucideCheck,
} from '@ng-icons/lucide'
import { TripInquiry } from '../data-access/models/inquiries.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-inquiries-detail',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideUsers,
      lucideDollarSign,
      lucideCalendar,
      lucideSend,
      lucideCheckCircle2,
      lucideCompass,
      lucideCopy,
      lucideCheck,
    }),
  ],
  template: `
    @if (inquiry) {
      <div class="space-y-6 pt-2">
        <!-- Header Summary -->
        <div class="p-4 rounded-xl bg-card border border-border/50 shadow-xs">
          <div class="flex items-center justify-between gap-2 mb-2">
            <span
              hlmBadge
              [variant]="inquiry.status === 'accepted' ? 'default' : inquiry.status === 'quoted' ? 'secondary' : 'outline'"
              class="text-xs capitalize font-semibold"
            >
              {{ inquiry.status }}
            </span>
            <span class="text-xs text-muted-foreground">ID: {{ inquiry.id }}</span>
          </div>

          <h3 class="text-lg font-bold text-foreground">{{ inquiry.destinationName }}</h3>
          <p class="text-xs text-muted-foreground mt-0.5">
            Submitted by <strong>{{ inquiry.contactName }}</strong> ({{ inquiry.contactEmail }})
          </p>
        </div>

        <!-- Metric Specs -->
        <div class="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-muted/40 border border-border/40 text-center">
          <div>
            <span class="text-[10px] text-muted-foreground uppercase font-semibold">Group Size</span>
            <p class="text-base font-bold text-foreground mt-0.5">{{ inquiry.travelerCount }} Guests</p>
          </div>
          <div class="border-x border-border/50">
            <span class="text-[10px] text-muted-foreground uppercase font-semibold">Est. Budget</span>
            <p class="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              \${{ inquiry.estimatedBudget | number }}
            </p>
          </div>
          <div>
            <span class="text-[10px] text-muted-foreground uppercase font-semibold">Quotes Sent</span>
            <p class="text-base font-bold text-primary mt-0.5">{{ inquiry.quotations?.length || 0 }}</p>
          </div>
        </div>

        <!-- Preferences & Requests -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Traveler Preferences</h4>
          <div class="p-3 rounded-lg bg-muted/20 border border-border/30 space-y-2 text-xs">
            <p><strong>Accommodation:</strong> {{ inquiry.preferences?.accommodationStyle || 'Boutique' }}</p>
            <p><strong>Pace:</strong> {{ inquiry.preferences?.travelPace || 'Balanced' }}</p>
            @if (inquiry.specialRequests) {
              <div class="pt-1.5 border-t border-border/40 text-muted-foreground">
                <strong class="text-foreground">Special Request Notes:</strong>
                <p class="mt-0.5 leading-relaxed">{{ inquiry.specialRequests }}</p>
              </div>
            }
          </div>
        </div>

        <!-- Existing Quotations List -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Submitted Quotations</h4>
            <button
              hlmBtn
              variant="outline"
              size="sm"
              class="h-7 text-xs gap-1 cursor-pointer"
              (click)="quote.emit(inquiry.id)"
            >
              <ng-icon name="lucideSend" class="size-3" />
              <span>Submit New Quote</span>
            </button>
          </div>

          @if (inquiry.quotations && inquiry.quotations.length) {
            <div class="space-y-2">
              @for (q of inquiry.quotations; track q.id) {
                <div class="p-3 rounded-lg border border-border/50 bg-card shadow-2xs space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-foreground">{{ q.title }}</span>
                    <span class="text-xs font-bold text-primary">\${{ q.totalPrice | number }} {{ q.currency }}</span>
                  </div>
                  <p class="text-[11px] text-muted-foreground">By: {{ q.providerName || 'Certified Operator' }}</p>
                  @if (q.terms) {
                    <p class="text-[10px] text-muted-foreground italic border-t border-border/30 pt-1">{{ q.terms }}</p>
                  }
                  <div class="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                    <span>Valid until: {{ q.validUntil | date:'mediumDate' }}</span>
                    <span
                      hlmBadge
                      [variant]="q.status === 'accepted' ? 'default' : 'secondary'"
                      class="text-[9px] capitalize"
                    >
                      {{ q.status }}
                    </span>
                  </div>

                  <!-- Inclusions Badges -->
                  @if (q.inclusions && q.inclusions.length) {
                    <div class="flex flex-wrap gap-1 pt-1.5 border-t border-border/30">
                      @for (inc of q.inclusions; track inc) {
                        <span class="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                          {{ inc }}
                        </span>
                      }
                    </div>
                  }

                  <!-- Actions: Copy Payment Link -->
                  <div class="flex items-center justify-between pt-2 border-t border-border/40">
                    <button
                      hlmBtn
                      variant="ghost"
                      size="sm"
                      class="h-6 px-2 text-[10px] gap-1 cursor-pointer text-muted-foreground hover:text-foreground"
                      (click)="onCopyPaymentLink(q.id)"
                    >
                      <ng-icon name="lucideCopy" class="size-3" />
                      <span>Copy Client Payment Link</span>
                    </button>

                    <button
                      hlmBtn
                      variant="default"
                      size="sm"
                      class="h-6 px-2.5 text-[10px] cursor-pointer"
                    >
                      Accept & Book
                    </button>
                  </div>
                </div>
              }
            </div>
          } @else {
            <div class="p-4 rounded-lg bg-muted/20 border border-border/30 text-center text-xs text-muted-foreground">
              No quotations prepared yet for this inquiry.
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class InquiriesDetailComponent {
  @Input() inquiry: TripInquiry | null = null
  @Output() quote = new EventEmitter<string>()

  onCopyPaymentLink(quoteId: string): void {
    const link = `${window.location.origin}/checkout?quoteId=${quoteId}`
    navigator.clipboard.writeText(link)
    toast.success('Client payment checkout link copied to clipboard!')
  }
}
