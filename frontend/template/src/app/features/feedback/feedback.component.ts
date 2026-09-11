import { Component, signal } from '@angular/core'
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
  providers: [provideIcons({ lucideStar, lucideMessageSquare, lucideHeart, lucideThumbsUp, lucideSend, lucideCheckCircle2 })],
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
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Customer Feedback & NPS</h1>
        <p class="text-xs text-muted-foreground">Monitor user sentiment, customer satisfaction ratings, and feature requests.</p>
      </div>

      <!-- NPS Overview Score Cards -->
      <div class="grid gap-4 sm:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Net Promoter Score</span>
          <div class="text-3xl font-extrabold text-primary">+68</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Excellent (Top 5%)</p>
        </div>

        <div hlmCard class="p-4 space-y-1 shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Promoters (9-10)</span>
          <div class="text-3xl font-bold text-emerald-600">74%</div>
          <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500 rounded-full" style="width: 74%;"></div>
          </div>
        </div>

        <div hlmCard class="p-4 space-y-1 shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Passives (7-8)</span>
          <div class="text-3xl font-bold text-amber-500">20%</div>
          <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-amber-500 rounded-full" style="width: 20%;"></div>
          </div>
        </div>

        <div hlmCard class="p-4 space-y-1 shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Detractors (0-6)</span>
          <div class="text-3xl font-bold text-rose-500">6%</div>
          <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-rose-500 rounded-full" style="width: 6%;"></div>
          </div>
        </div>
      </div>

      <!-- Customer Reviews Stream -->
      <div class="space-y-4">
        <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent Customer Reviews</h3>

        <div class="space-y-3">
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
        </div>
      </div>
    </app-main>
  `,
})
export class FeedbackComponent {
  readonly feedbackList = signal<FeedbackItem[]>([
    {
      id: 'fb-1',
      user: { name: 'Alex John', email: 'alex@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      rating: 5,
      sentiment: 'positive',
      category: 'UI Components',
      comment: 'The Spartan UI integration in Angular is incredibly smooth. The signals reactivity and Tailwind v4 support make building pages 10x faster.',
      date: 'Today, 11:30 AM',
    },
    {
      id: 'fb-2',
      user: { name: 'Sarah Miller', email: 'sarah.miller@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      rating: 5,
      sentiment: 'positive',
      category: 'Design & Theming',
      comment: 'The OKLCH theme switcher and corner radius customization are top notch! Very close fidelity to the original React version.',
      date: 'Yesterday',
    },
    {
      id: 'fb-3',
      user: { name: 'David Kim', email: 'david.kim@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
      rating: 4,
      sentiment: 'positive',
      category: 'Performance',
      comment: 'Zero bundle bloat and fast compile times with Vite. Would love to see more drag and drop Kanban features.',
      date: 'Aug 03, 2026',
    },
  ])

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
