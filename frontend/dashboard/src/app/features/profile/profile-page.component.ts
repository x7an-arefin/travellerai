import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideMapPin,
  lucideLink,
  lucideCalendar,
  lucideEdit3,
  lucideCheckCircle2,
  lucideGitPullRequest,
  lucideStar,
  lucideAward,
  lucideFlame,
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
import { HlmTabsImports } from '../../ui/tabs/hlm-tabs.components'
import { AuthService } from '../../core/services/auth.service'
import { getDisplayNameInitials } from '../../core/utils/initials'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
    ...HlmTabsImports,
  ],
  providers: [
    provideIcons({
      lucideMapPin,
      lucideLink,
      lucideCalendar,
      lucideEdit3,
      lucideCheckCircle2,
      lucideGitPullRequest,
      lucideStar,
      lucideAward,
      lucideFlame,
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

    <!-- Main Profile Content -->
    <app-main [fixed]="true" class="space-y-6 max-w-5xl mx-auto py-4">
      <!-- Profile Header Hero Banner -->
      <div hlmCard class="overflow-hidden shadow-sm">
        <!-- Cover Banner Image -->
        <div class="h-36 sm:h-44 w-full bg-gradient-to-r from-primary/30 via-sky-500/20 to-violet-500/30 relative"></div>

        <div class="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12">
          <!-- Avatar + Details -->
          <div class="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
            <hlm-avatar class="size-24 ring-4 ring-background shadow-xl">
              <img
                hlmAvatarImage
                [src]="authService.user()?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'"
                [alt]="authService.user()?.name || 'Sat Naing'"
              />
              <span hlmAvatarFallback class="text-xl font-bold">{{ initials(authService.user()?.name || 'SN') }}</span>
            </hlm-avatar>

            <div class="space-y-1 pb-1">
              <div class="flex items-center gap-2 justify-center sm:justify-start">
                <h1 class="text-xl font-bold text-foreground">{{ authService.user()?.name || 'Sat Naing' }}</h1>
                <span hlmBadge variant="default" class="text-[10px] uppercase font-bold">Pro</span>
              </div>
              <p class="text-xs text-muted-foreground">&#64;satnaing • Frontend Lead & Open Source Maintainer</p>
            </div>
          </div>

          <!-- Edit Profile Action Button -->
          <a routerLink="/settings" hlmBtn variant="outline" size="sm" class="gap-1.5 cursor-pointer text-xs shadow-xs">
            <ng-icon name="lucideEdit3" class="size-3.5 text-muted-foreground" />
            <span>Edit Profile</span>
          </a>
        </div>

        <!-- Meta Bar -->
        <div class="px-6 pb-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border/40 pt-3">
          <div class="flex items-center gap-1.5">
            <ng-icon name="lucideMapPin" class="size-3.5" />
            <span>San Francisco, CA</span>
          </div>
          <div class="flex items-center gap-1.5">
            <ng-icon name="lucideLink" class="size-3.5" />
            <a href="https://satnaing.dev" target="_blank" class="text-primary hover:underline">satnaing.dev</a>
          </div>
          <div class="flex items-center gap-1.5">
            <ng-icon name="lucideCalendar" class="size-3.5" />
            <span>Joined August 2024</span>
          </div>
        </div>
      </div>

      <!-- Contribution Heatmap Grid (GitHub-style) -->
      <div hlmCard class="p-6 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <ng-icon name="lucideFlame" class="size-4 text-amber-500" />
            <h3 class="text-xs font-bold uppercase tracking-wider text-foreground">584 Contributions in 2026</h3>
          </div>
          <span class="text-xs text-muted-foreground">Longest streak: 28 days</span>
        </div>

        <!-- 52-week heatmap grid -->
        <div class="overflow-x-auto pb-1 no-scrollbar">
          <div class="grid grid-flow-col grid-rows-7 gap-1 w-max">
            @for (cell of heatmapCells; track $index) {
              <div
                class="size-3 rounded-[2px] transition-colors cursor-pointer"
                [ngClass]="getHeatmapColor(cell)"
                [title]="cell + ' contributions'"
              ></div>
            }
          </div>
        </div>

        <div class="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
          <span>Learn how we count contributions</span>
          <div class="flex items-center gap-1.5">
            <span>Less</span>
            <span class="size-2.5 rounded-[2px] bg-muted"></span>
            <span class="size-2.5 rounded-[2px] bg-emerald-300 dark:bg-emerald-950"></span>
            <span class="size-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-800"></span>
            <span class="size-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-600"></span>
            <span class="size-2.5 rounded-[2px] bg-emerald-600 dark:bg-emerald-400"></span>
            <span>More</span>
          </div>
        </div>
      </div>

      <!-- Showcase Projects Grid -->
      <div class="space-y-3">
        <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Featured Repositories & Projects</h3>

        <div class="grid gap-3 sm:grid-cols-2">
          <div hlmCard class="p-4 space-y-3 hover:border-primary/50 transition-colors shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-primary font-mono">fast-admin</span>
              <span hlmBadge variant="outline" class="text-[10px]">Public</span>
            </div>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Modern admin dashboard template built with Angular 21, Spartan UI, and Tailwind CSS v4.
            </p>
            <div class="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span class="flex items-center gap-1"><span class="size-2 rounded-full bg-red-500"></span>TypeScript</span>
              <span class="flex items-center gap-1"><ng-icon name="lucideStar" class="size-3 text-amber-500" /> 1.2k</span>
              <span class="flex items-center gap-1"><ng-icon name="lucideGitPullRequest" class="size-3" /> 84</span>
            </div>
          </div>

          <div hlmCard class="p-4 space-y-3 hover:border-primary/50 transition-colors shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-primary font-mono">spartan-ng-components</span>
              <span hlmBadge variant="outline" class="text-[10px]">Public</span>
            </div>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Curated collection of accessible Brain & Helm primitives for modern Angular applications.
            </p>
            <div class="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span class="flex items-center gap-1"><span class="size-2 rounded-full bg-red-500"></span>TypeScript</span>
              <span class="flex items-center gap-1"><ng-icon name="lucideStar" class="size-3 text-amber-500" /> 840</span>
              <span class="flex items-center gap-1"><ng-icon name="lucideGitPullRequest" class="size-3" /> 42</span>
            </div>
          </div>
        </div>
      </div>
    </app-main>
  `,
})
export class ProfilePageComponent {
  readonly heatmapCells: number[] = Array.from({ length: 364 }, () => Math.floor(Math.random() * 8))

  constructor(public authService: AuthService) {}

  getHeatmapColor(val: number): string {
    if (val === 0) return 'bg-muted'
    if (val <= 2) return 'bg-emerald-300 dark:bg-emerald-950'
    if (val <= 4) return 'bg-emerald-400 dark:bg-emerald-800'
    if (val <= 6) return 'bg-emerald-500 dark:bg-emerald-600'
    return 'bg-emerald-600 dark:bg-emerald-400'
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
