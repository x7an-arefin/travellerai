import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideStar,
  lucideMessageSquare,
  lucideCheckCircle2,
  lucideShieldAlert,
  lucideTrash2,
  lucideEye,
  lucideCheck,
} from '@ng-icons/lucide'
import { Review } from '../data-access/models/reviews.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-reviews-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideStar,
      lucideMessageSquare,
      lucideCheckCircle2,
      lucideShieldAlert,
      lucideTrash2,
      lucideEye,
      lucideCheck,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Traveler & Verified Trip</th>
              <th scope="col" class="py-3.5 px-4">Rating</th>
              <th scope="col" class="py-3.5 px-4">Review Content</th>
              <th scope="col" class="py-3.5 px-4">Tour Experience</th>
              <th scope="col" class="py-3.5 px-4 text-center">Status</th>
              <th scope="col" class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-4 w-32 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-20 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-52 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-36 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-center"><div class="h-5 w-14 bg-muted rounded-full mx-auto"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-6 w-20 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (items.length === 0) {
              <tr>
                <td colspan="6" class="py-12 text-center text-muted-foreground text-xs">
                  No traveler reviews found matching current filters.
                </td>
              </tr>
            } @else {
              @for (r of items; track r.id) {
                <tr class="hover:bg-muted/20 transition-colors text-xs">
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-2.5">
                      <div class="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                        {{ r.travelerName.charAt(0) }}
                      </div>
                      <div>
                        <div class="font-semibold text-foreground">{{ r.travelerName }}</div>
                        @if (r.isVerifiedBooking) {
                          <span class="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                            <ng-icon name="lucideCheckCircle2" class="size-2.5" />
                            <span>Verified Booking</span>
                          </span>
                        }
                      </div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-0.5 text-amber-500">
                      @for (s of [1, 2, 3, 4, 5]; track s) {
                        <ng-icon
                          name="lucideStar"
                          class="size-3.5"
                          [class.opacity-30]="s > r.overallRating"
                        />
                      }
                      <span class="ml-1 text-xs font-bold text-foreground">{{ r.overallRating }}.0</span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 max-w-xs">
                    <div class="font-semibold text-foreground line-clamp-1">{{ r.title }}</div>
                    <div class="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{{ r.content }}</div>
                    @if (r.response) {
                      <div class="mt-1.5 p-1.5 rounded bg-muted/50 border border-border/40 text-[10px] text-muted-foreground flex items-center gap-1">
                        <ng-icon name="lucideMessageSquare" class="size-3 text-primary shrink-0" />
                        <span class="font-semibold text-foreground">Operator Replied:</span>
                        <span class="truncate">{{ r.response.responseText }}</span>
                      </div>
                    }
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="font-medium text-foreground line-clamp-1">{{ r.packageTitle }}</div>
                    <div class="text-[10px] text-muted-foreground">{{ r.providerName || 'Provider' }}</div>
                  </td>

                  <td class="py-3.5 px-4 text-center">
                    <span
                      hlmBadge
                      [variant]="getStatusVariant(r.status)"
                      class="text-[10px] capitalize font-medium"
                    >
                      {{ r.status }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="outline"
                        size="sm"
                        class="h-7 text-xs px-2 gap-1 cursor-pointer"
                        (click)="replyClick.emit(r)"
                        title="View and Reply to Review"
                      >
                        <ng-icon name="lucideMessageSquare" class="size-3.5 text-primary" />
                        <span>{{ r.response ? 'Edit Reply' : 'Reply' }}</span>
                      </button>

                      @if (r.status !== 'published') {
                        <button
                          hlmBtn
                          variant="ghost"
                          size="sm"
                          class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-emerald-500"
                          (click)="statusChange.emit({ id: r.id, status: 'published' })"
                          title="Publish Review"
                        >
                          <ng-icon name="lucideCheck" class="size-3.5" />
                        </button>
                      } @else {
                        <button
                          hlmBtn
                          variant="ghost"
                          size="sm"
                          class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-amber-500"
                          (click)="statusChange.emit({ id: r.id, status: 'flagged' })"
                          title="Flag for Moderation"
                        >
                          <ng-icon name="lucideShieldAlert" class="size-3.5" />
                        </button>
                      }

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-rose-500"
                        (click)="deleteClick.emit(r.id)"
                        title="Delete Review"
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
export class ReviewsTableComponent {
  @Input() items: Review[] = []
  @Input() isLoading = false
  @Output() replyClick = new EventEmitter<Review>()
  @Output() statusChange = new EventEmitter<{ id: string; status: any }>()
  @Output() deleteClick = new EventEmitter<string>()

  getStatusVariant(status: string): 'default' | 'secondary' | 'outline' | 'destructive' {
    switch (status) {
      case 'published':
        return 'default'
      case 'submitted':
        return 'secondary'
      case 'flagged':
      case 'hidden':
      case 'rejected':
        return 'destructive'
      default:
        return 'outline'
    }
  }
}
