import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { TravelAnalyticsComponent } from '../dashboard/components/travel-analytics.component'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MainComponent,
    TopNavComponent,
    SearchComponent,
    ThemeSwitchComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    TravelAnalyticsComponent,
    ...HlmBadgeImports,
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
      <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight">Marketplace & Revenue Analytics</h1>
            <span hlmBadge variant="outline" class="text-xs">
              Real-time BI
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Conversion metrics, top destination revenue, provider take-rate, and search-to-booking performance indicators.
          </p>
        </div>
      </div>

      <!-- Analytics Body -->
      <app-travel-analytics />
    </app-main>
  `,
})
export class AnalyticsPageComponent {}
