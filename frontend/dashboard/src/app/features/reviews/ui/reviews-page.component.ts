import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideStar,
  lucideSearch,
  lucideCheckCircle2,
  lucideXCircle,
  lucideThumbsUp,
  lucideShieldCheck,
  lucideMessageSquare,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'
import { HlmAvatarImports } from '../../../ui/avatar/hlm-avatar.components'
import { toast } from 'ngx-sonner'

export interface ReviewItem {
  id: string
  packageTitle: string
  travelerName: string
  travelerAvatar: string
  rating: number
  title: string
  comment: string
  date: string
  status: 'published' | 'under_moderation' | 'flagged'
  verifiedTrip: boolean
  providerResponse?: string
}

@Component({
  selector: 'app-reviews-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    TopNavComponent,
    SearchComponent,
    ThemeSwitchComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmBadgeImports,
    ...HlmButtonImports,
    ...HlmCardImports,
    ...HlmAvatarImports,
  ],
  providers: [
    provideIcons({
      lucideStar,
      lucideSearch,
      lucideCheckCircle2,
      lucideXCircle,
      lucideThumbsUp,
      lucideShieldCheck,
      lucideMessageSquare,
    }),
  ],
  template: `
    <!-- Top Header -->
    <app-header [fixed]="true">
      <app-top-nav class="mr-auto" />
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main Content -->
    <app-main>
      <!-- Page Header -->
      <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight">Verified Traveler Reviews</h1>
            <span hlmBadge variant="outline" class="text-xs">
              4.88 / 5.0 ★
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Monitor customer satisfaction, moderate verified feedback, and manage provider responses.
          </p>
        </div>
      </div>

      <!-- Quick Ratings Breakdown Cards -->
      <div class="grid gap-4 sm:grid-cols-4 mb-6">
        <div hlmCard class="p-4">
          <div class="text-xs text-muted-foreground font-semibold uppercase">Overall Rating</div>
          <div class="text-3xl font-bold text-amber-500 mt-1 flex items-center gap-1.5">
            <ng-icon name="lucideStar" class="size-6 fill-amber-500" />
            4.88
          </div>
          <div class="text-xs text-muted-foreground mt-1">2,410 verified travelers</div>
        </div>

        <div hlmCard class="p-4">
          <div class="text-xs text-muted-foreground font-semibold uppercase">5-Star Reviews</div>
          <div class="text-2xl font-bold text-foreground mt-1">94.2%</div>
          <div class="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">2,270 five-star ratings</div>
        </div>

        <div hlmCard class="p-4">
          <div class="text-xs text-muted-foreground font-semibold uppercase">Response Rate</div>
          <div class="text-2xl font-bold text-foreground mt-1">96.8%</div>
          <div class="text-xs text-muted-foreground mt-1">Avg 2.4 hours response time</div>
        </div>

        <div hlmCard class="p-4">
          <div class="text-xs text-muted-foreground font-semibold uppercase">Flagged / Disputes</div>
          <div class="text-2xl font-bold text-emerald-500 mt-1">0 Pending</div>
          <div class="text-xs text-muted-foreground mt-1">All disputes resolved</div>
        </div>
      </div>

      <!-- Reviews Feed List -->
      <div class="space-y-4">
        @for (rev of reviews(); track rev.id) {
          <div hlmCard class="p-5 space-y-3 hover:border-primary/40 transition-colors">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-3">
                <hlm-avatar class="size-10 border border-border/50">
                  <img hlmAvatarImage [src]="rev.travelerAvatar" [alt]="rev.travelerName" />
                  <span hlmAvatarFallback>{{ rev.travelerName.slice(0, 2) }}</span>
                </hlm-avatar>

                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="text-sm font-bold text-foreground">{{ rev.travelerName }}</h4>
                    @if (rev.verifiedTrip) {
                      <span class="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        <ng-icon name="lucideShieldCheck" class="size-3" />
                        Verified Traveler
                      </span>
                    }
                  </div>
                  <p class="text-xs text-muted-foreground">{{ rev.packageTitle }}</p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <div class="flex items-center text-amber-500">
                  @for (s of [1, 2, 3, 4, 5]; track s) {
                    <ng-icon
                      name="lucideStar"
                      class="size-4"
                      [class.fill-amber-500]="s <= rev.rating"
                      [class.text-amber-500]="s <= rev.rating"
                      [class.text-muted]="s > rev.rating"
                    />
                  }
                </div>
                <span class="text-xs text-muted-foreground">{{ rev.date }}</span>
              </div>
            </div>

            <div>
              <h5 class="text-sm font-semibold text-foreground mb-1">{{ rev.title }}</h5>
              <p class="text-xs text-muted-foreground leading-relaxed">{{ rev.comment }}</p>
            </div>

            @if (rev.providerResponse) {
              <div class="p-3 rounded-lg bg-muted/40 border border-border/30 text-xs space-y-1">
                <span class="font-bold text-foreground flex items-center gap-1">
                  <ng-icon name="lucideMessageSquare" class="size-3.5 text-primary" />
                  Provider Response
                </span>
                <p class="text-muted-foreground">{{ rev.providerResponse }}</p>
              </div>
            }
          </div>
        }
      </div>
    </app-main>
  `,
})
export class ReviewsPageComponent {
  readonly reviews = signal<ReviewItem[]>([
    {
      id: 'rev-1',
      packageTitle: 'Swiss Alps Grand Panorama Express & Glacier Hike',
      travelerName: 'Sarah Jenkins',
      travelerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      rating: 5,
      title: 'A truly breathtaking lifetime experience!',
      comment: 'From the private cogwheel train to the glacier walk, the itinerary was executed with surgical precision. Our guide Marc made everyone feel safe and shared so much Alpine history. Worth every penny!',
      date: 'Sep 08, 2026',
      status: 'published',
      verifiedTrip: true,
      providerResponse: 'Thank you Sarah! It was our pleasure hosting you in the Jungfrau region. See you in the winter!',
    },
    {
      id: 'rev-2',
      packageTitle: 'Serengeti Migration Luxury Safari & Balloon Flight',
      travelerName: 'Dr. Michael Chen',
      travelerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 5,
      title: 'Sunrise hot air balloon flight was magical',
      comment: 'Watching thousands of wildebeests crossing the Mara river from above was surreal. The tented lodge had 5-star amenities in the middle of nature.',
      date: 'Sep 02, 2026',
      status: 'published',
      verifiedTrip: true,
      providerResponse: 'Asante sana Dr. Chen! The Great Migration this year was spectacular. Juma and the crew send their regards.',
    },
    {
      id: 'rev-3',
      packageTitle: 'Ubud Sacred Valley & Cultural Immersion',
      travelerName: 'Claire Laurent',
      travelerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      rating: 5,
      title: 'Authentic and peaceful experience',
      comment: 'Wayan was an extraordinary guide. The water purification ceremony at Tirta Empul and the private villa retreat in the rice paddies felt deeply authentic, far away from regular tourist crowds.',
      date: 'Aug 29, 2026',
      status: 'published',
      verifiedTrip: true,
    },
  ])
}
