import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideStar, lucideCheckCircle2, lucideMessageSquare } from '@ng-icons/lucide'
import { Review } from '../data-access/models/reviews.model'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'

@Component({
  selector: 'app-review-response-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon, ...HlmButtonImports, ...HlmBadgeImports],
  providers: [
    provideIcons({
      lucideStar,
      lucideCheckCircle2,
      lucideMessageSquare,
    }),
  ],
  template: `
    @if (review) {
      <div class="space-y-6 text-xs">
        <!-- Review Traveler & Rating Box -->
        <div class="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="font-bold text-foreground">{{ review.travelerName }}</span>
              @if (review.isVerifiedBooking) {
                <span class="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <ng-icon name="lucideCheckCircle2" class="size-2.5" />
                  <span>Verified Booking</span>
                </span>
              }
            </div>
            <span hlmBadge [variant]="review.status === 'published' ? 'default' : 'secondary'" class="text-[10px] capitalize">
              {{ review.status }}
            </span>
          </div>

          <div class="flex items-center gap-1 text-amber-500">
            @for (s of [1, 2, 3, 4, 5]; track s) {
              <ng-icon
                name="lucideStar"
                class="size-4"
                [class.opacity-30]="s > review.overallRating"
              />
            }
            <span class="ml-1.5 text-sm font-bold text-foreground">{{ review.overallRating }}.0 / 5.0</span>
          </div>

          <div>
            <h4 class="font-bold text-foreground text-sm">{{ review.title }}</h4>
            <p class="text-xs text-muted-foreground mt-1 leading-relaxed">{{ review.content }}</p>
          </div>

          <div class="text-[10px] text-muted-foreground pt-1 border-t border-border/30">
            <span>Tour: <strong>{{ review.packageTitle }}</strong></span> •
            <span>Submitted {{ review.createdAt | date:'mediumDate' }}</span>
          </div>
        </div>

        <!-- Sub-ratings Grid if available -->
        <div class="grid grid-cols-2 gap-2 p-3 rounded-lg border border-border/40 bg-card text-[11px]">
          <div class="flex justify-between">
            <span class="text-muted-foreground">Tour Package Quality:</span>
            <span class="font-semibold">{{ review.packageRating || review.overallRating }}/5</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Guide Leadership:</span>
            <span class="font-semibold">{{ review.guideRating || review.overallRating }}/5</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Value for Money:</span>
            <span class="font-semibold">{{ review.valueRating || review.overallRating }}/5</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Customer Service:</span>
            <span class="font-semibold">{{ review.serviceRating || review.overallRating }}/5</span>
          </div>
        </div>

        <!-- Official Tour Operator Response Form -->
        <div class="space-y-2 pt-2 border-t border-border/40">
          <label class="font-semibold text-foreground flex items-center gap-1.5">
            <ng-icon name="lucideMessageSquare" class="size-3.5 text-primary" />
            <span>Official Tour Operator Public Response</span>
          </label>
          <p class="text-muted-foreground text-[11px]">
            This response will be published directly beneath {{ review.travelerName }}'s review on the public marketplace tour listing.
          </p>

          <textarea
            [(ngModel)]="responseText"
            rows="4"
            placeholder="Thank the traveler, address specific feedback, or explain logistics..."
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none text-xs"
          ></textarea>
        </div>

        <!-- Action Footer -->
        <div class="flex items-center justify-end gap-2 pt-4 border-t border-border/40">
          <button
            type="button"
            hlmBtn
            variant="outline"
            size="sm"
            (click)="cancel.emit()"
            class="cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            hlmBtn
            variant="default"
            size="sm"
            [disabled]="!responseText.trim()"
            (click)="onSaveResponse()"
            class="cursor-pointer"
          >
            Publish Response
          </button>
        </div>
      </div>
    }
  `,
})
export class ReviewResponseDrawerComponent implements OnInit {
  @Input() review: Review | null = null
  @Output() saveResponse = new EventEmitter<{ reviewId: string; providerId: string; responseText: string }>()
  @Output() cancel = new EventEmitter<void>()

  responseText = ''

  ngOnInit(): void {
    if (this.review && this.review.response) {
      this.responseText = this.review.response.responseText
    }
  }

  onSaveResponse(): void {
    if (!this.review || !this.responseText.trim()) return
    this.saveResponse.emit({
      reviewId: this.review.id,
      providerId: this.review.providerId,
      responseText: this.responseText.trim(),
    })
  }
}
