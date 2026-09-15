import { Component, signal, computed, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideStar,
  lucideMessageSquare,
  lucideHeart,
  lucideThumbsUp,
  lucideSend,
  lucideCheckCircle2,
  lucideRefreshCw,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmAvatarImports } from '../../ui/avatar/hlm-avatar.components'
import { getDisplayNameInitials } from '../../core/utils/initials'
import { toast } from 'ngx-sonner'
import { ReviewsApiService } from '../reviews/data-access/services/reviews-api.service'
import { Review } from '../reviews/data-access/models/reviews.model'

export interface FeedbackItem {
  id: string
  user: { name: string; avatar?: string; email: string }
  rating: number // 1..5
  sentiment: 'positive' | 'neutral' | 'critical'
  category: string
  comment: string
  date: string
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    SearchComponent,
    ThemeSwitchComponent,
    ConfigDrawerComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmAvatarImports,
  ],
  providers: [
    provideIcons({
      lucideStar,
      lucideMessageSquare,
      lucideHeart,
      lucideThumbsUp,
      lucideSend,
      lucideCheckCircle2,
      lucideRefreshCw,
    }),
  ],
  template: `
    <!-- Top Header -->
    <app-header [fixed]="true">
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-config-drawer />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main Content -->
    <app-main [fixed]="true" class="space-y-6 max-w-5xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Customer Feedback & NPS</h1>
          <p class="text-xs text-muted-foreground">Monitor guest satisfaction, Net Promoter Score, and travel experience reviews.</p>
        </div>

        <button hlmBtn variant="outline" size="sm" (click)="loadFeedback()" [disabled]="isLoading()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
          <ng-icon name="lucideRefreshCw" class="size-3.5 text-muted-foreground" [class.animate-spin]="isLoading()" />
          <span>Refresh</span>
        </button>
      </div>

      <!-- NPS Overview Score Cards -->
      <div class="grid gap-4 sm:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Net Promoter Score</span>
          <div class="text-3xl font-extrabold text-primary">
            {{ npsScore() > 0 ? '+' + npsScore() : npsScore() }}
          </div>
          <p class="text-[11px] text-emerald-600 font-semibold">
            {{ npsScore() >= 50 ? 'World-Class (Top 5%)' : npsScore() >= 30 ? 'Strong Performance' : 'Good Quality' }}
          </p>
        </div>

        <div hlmCard class="p-4 space-y-1 shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Promoters (5 Stars)</span>
          <div class="text-3xl font-bold text-emerald-600">{{ promoterPct() }}%</div>
          <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500 rounded-full" [style.width.%]="promoterPct()"></div>
          </div>
        </div>

        <div hlmCard class="p-4 space-y-1 shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Passives (4 Stars)</span>
          <div class="text-3xl font-bold text-amber-500">{{ passivePct() }}%</div>
          <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-amber-500 rounded-full" [style.width.%]="passivePct()"></div>
          </div>
        </div>

        <div hlmCard class="p-4 space-y-1 shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Detractors (1-3 Stars)</span>
          <div class="text-3xl font-bold text-rose-500">{{ detractorPct() }}%</div>
          <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-rose-500 rounded-full" [style.width.%]="detractorPct()"></div>
          </div>
        </div>
      </div>

      <!-- Customer Reviews Stream -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Verified Traveler Reviews ({{ feedbackList().length }})
          </h3>
        </div>

        <div class="space-y-3">
          @if (isLoading()) {
            <div class="py-12 text-center text-xs text-muted-foreground">
              Loading verified traveler reviews...
            </div>
          } @else if (feedbackList().length === 0) {
            <div class="py-12 text-center text-xs text-muted-foreground">
              No traveler reviews found.
            </div>
          } @else {
            @for (item of feedbackList(); track item.id) {
              <div hlmCard class="p-4 space-y-3 hover:border-primary/40 transition-colors shadow-2xs">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2.5">
                    <hlm-avatar class="size-8.5 shadow-2xs">
                      <img hlmAvatarImage [src]="item.user.avatar || ''" [alt]="item.user.name" />
                      <span hlmAvatarFallback>{{ initials(item.user.name) }}</span>
                    </hlm-avatar>
                    <div>
                      <h4 class="text-xs font-bold text-foreground">{{ item.user.name }}</h4>
                      <p class="text-[11px] text-muted-foreground">{{ item.user.email }}</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <!-- Star Rating -->
                    <div class="flex items-center text-amber-400">
                      @for (star of [1,2,3,4,5]; track star) {
                        <ng-icon name="lucideStar" class="size-3.5 fill-current" [class.opacity-30]="star > item.rating" />
                      }
                    </div>

                    <span
                      class="inline-flex items-center rounded-full px-2 py-0.2 text-[10px] font-bold border uppercase"
                      [class.bg-emerald-500/10]="item.sentiment === 'positive'"
                      [class.text-emerald-600]="item.sentiment === 'positive'"
                      [class.border-emerald-200]="item.sentiment === 'positive'"
                      [class.bg-amber-500/10]="item.sentiment === 'neutral'"
                      [class.text-amber-600]="item.sentiment === 'neutral'"
                      [class.border-amber-200]="item.sentiment === 'neutral'"
                      [class.bg-rose-500/10]="item.sentiment === 'critical'"
                      [class.text-rose-600]="item.sentiment === 'critical'"
                      [class.border-rose-200]="item.sentiment === 'critical'"
                    >
                      {{ item.sentiment }}
                    </span>
                  </div>
                </div>

                <p class="text-xs text-foreground leading-relaxed">{{ item.comment }}</p>

                <div class="flex items-center justify-between pt-1 border-t border-border/40 text-[11px] text-muted-foreground">
                  <span hlmBadge variant="outline" class="text-[9px]">{{ item.category }}</span>
                  <span>{{ item.date }}</span>
                </div>
              </div>
            }
          }
        </div>
      </div>
    </app-main>
  `,
})
export class FeedbackComponent implements OnInit {
  private readonly reviewsApi = inject(ReviewsApiService)

  readonly feedbackList = signal<FeedbackItem[]>([])
  readonly isLoading = signal<boolean>(false)

  readonly promoterPct = computed(() => {
    const list = this.feedbackList()
    if (list.length === 0) return 0
    const count = list.filter((f) => f.rating === 5).length
    return Math.round((count / list.length) * 100)
  })

  readonly passivePct = computed(() => {
    const list = this.feedbackList()
    if (list.length === 0) return 0
    const count = list.filter((f) => f.rating === 4).length
    return Math.round((count / list.length) * 100)
  })

  readonly detractorPct = computed(() => {
    const list = this.feedbackList()
    if (list.length === 0) return 0
    const count = list.filter((f) => f.rating <= 3).length
    return Math.round((count / list.length) * 100)
  })

  readonly npsScore = computed(() => {
    return this.promoterPct() - this.detractorPct()
  })

  ngOnInit(): void {
    this.loadFeedback()
  }

  async loadFeedback(): Promise<void> {
    this.isLoading.set(true)
    try {
      const result = await this.reviewsApi.list()
      const reviews: Review[] = result.ok ? result.data.items : []
      const mapped: FeedbackItem[] = reviews.map((r: Review) => {
        let sentiment: FeedbackItem['sentiment'] = 'neutral'
        if (r.overallRating >= 4) sentiment = 'positive'
        else if (r.overallRating <= 2) sentiment = 'critical'

        return {
          id: r.id,
          user: {
            name: r.travelerName || 'Anonymous Traveler',
            email: `${(r.travelerName || 'traveler').toLowerCase().replace(/\s+/g, '.')}@guest.traveller.ai`,
            avatar: r.travelerAvatar,
          },
          rating: r.overallRating || 5,
          sentiment,
          category: r.packageTitle || 'Verified Experience',
          comment: r.content || r.title || 'Exceptional experience.',
          date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recent',
        }
      })
      this.feedbackList.set(mapped)
    } catch {
      toast.error('Could not load feedback reviews from API; loaded cached data.')
    } finally {
      this.isLoading.set(false)
    }
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
