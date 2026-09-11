import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideDollarSign,
  lucideUsers,
  lucideCreditCard,
  lucideActivity,
  lucideDownload,
  lucideTrendingUp,
  lucideTrendingDown,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { TopNavComponent, TopNavLink } from '../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { DateRangePickerComponent } from '../../shared/components/date-range-picker/date-range-picker.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmTabsImports } from '../../ui/tabs/hlm-tabs.components'
import { HlmSkeletonImports } from '../../ui/skeleton/hlm-skeleton.directive'
import { OverviewChartComponent } from './components/overview-chart.component'
import { RecentSalesComponent } from './components/recent-sales.component'
import { AnalyticsComponent } from './components/analytics.component'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    TopNavComponent,
    SearchComponent,
    ThemeSwitchComponent,
    ConfigDrawerComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    DateRangePickerComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmTabsImports,
    ...HlmSkeletonImports,
    OverviewChartComponent,
    RecentSalesComponent,
    AnalyticsComponent,
  ],
  providers: [
    provideIcons({
      lucideDollarSign,
      lucideUsers,
      lucideCreditCard,
      lucideActivity,
      lucideDownload,
      lucideTrendingUp,
      lucideTrendingDown,
    }),
  ],
  template: `
    <!-- Top Header -->
    <app-header [fixed]="true">
      <app-top-nav [links]="topNavLinks" class="mr-auto" />
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-config-drawer />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main Content -->
    <app-main>
      <div class="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p class="text-xs text-muted-foreground">Monitor performance, revenue, and team activity analytics.</p>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <!-- Interactive Date Range Picker -->
          <app-date-range-picker />

          <button hlmBtn size="sm" (click)="downloadReport()" class="gap-2 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideDownload" class="size-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <!-- Dashboard Tabs -->
      <hlm-tabs defaultValue="overview" class="space-y-4">
        <div class="w-full overflow-x-auto pb-1 no-scrollbar">
          <div hlmTabsList>
            <button hlmTabsTrigger="overview">Overview</button>
            <button hlmTabsTrigger="analytics">Analytics</button>
            <button hlmTabsTrigger="reports" class="opacity-50 pointer-events-none">Reports</button>
            <button hlmTabsTrigger="notifications" class="opacity-50 pointer-events-none">Notifications</button>
          </div>
        </div>

        <!-- Tab 1: Overview -->
        <div hlmTabsContent="overview" class="space-y-4">
          <!-- 4 Stat KPI Cards with Sparkline Charts -->
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <!-- Card 1: Total Revenue -->
            <div hlmCard class="hover:border-primary/40 transition-colors relative overflow-hidden">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-sm font-medium">Total Revenue</span>
                <ng-icon name="lucideDollarSign" class="size-4 text-muted-foreground" />
              </div>
              <div hlmCardContent>
                <div class="text-2xl font-bold">\$45,231.89</div>
                <div class="flex items-center justify-between mt-1">
                  <span class="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ng-icon name="lucideTrendingUp" class="size-3.5" />
                    +20.1%
                  </span>
                  <!-- Mini Sparkline SVG -->
                  <svg class="h-6 w-16 stroke-emerald-500 fill-emerald-500/15" viewBox="0 0 64 24">
                    <path d="M0,20 Q16,5 32,15 T64,2 L64,24 L0,24 Z" stroke-width="0" />
                    <path d="M0,20 Q16,5 32,15 T64,2" fill="none" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Card 2: Subscriptions -->
            <div hlmCard class="hover:border-primary/40 transition-colors relative overflow-hidden">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-sm font-medium">Subscriptions</span>
                <ng-icon name="lucideUsers" class="size-4 text-muted-foreground" />
              </div>
              <div hlmCardContent>
                <div class="text-2xl font-bold">+2,350</div>
                <div class="flex items-center justify-between mt-1">
                  <span class="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ng-icon name="lucideTrendingUp" class="size-3.5" />
                    +180.1%
                  </span>
                  <!-- Mini Sparkline SVG -->
                  <svg class="h-6 w-16 stroke-primary fill-primary/15" viewBox="0 0 64 24">
                    <path d="M0,22 Q16,18 32,8 T64,2 L64,24 L0,24 Z" stroke-width="0" />
                    <path d="M0,22 Q16,18 32,8 T64,2" fill="none" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Card 3: Sales -->
            <div hlmCard class="hover:border-primary/40 transition-colors relative overflow-hidden">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-sm font-medium">Sales</span>
                <ng-icon name="lucideCreditCard" class="size-4 text-muted-foreground" />
              </div>
              <div hlmCardContent>
                <div class="text-2xl font-bold">+12,234</div>
                <div class="flex items-center justify-between mt-1">
                  <span class="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ng-icon name="lucideTrendingUp" class="size-3.5" />
                    +19%
                  </span>
                  <!-- Mini Sparkline SVG -->
                  <svg class="h-6 w-16 stroke-sky-500 fill-sky-500/15" viewBox="0 0 64 24">
                    <path d="M0,18 Q16,12 32,16 T64,4 L64,24 L0,24 Z" stroke-width="0" />
                    <path d="M0,18 Q16,12 32,16 T64,4" fill="none" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Card 4: Active Now -->
            <div hlmCard class="hover:border-primary/40 transition-colors relative overflow-hidden">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-sm font-medium">Active Now</span>
                <ng-icon name="lucideActivity" class="size-4 text-muted-foreground" />
              </div>
              <div hlmCardContent>
                <div class="text-2xl font-bold">+573</div>
                <div class="flex items-center justify-between mt-1">
                  <span class="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ng-icon name="lucideTrendingUp" class="size-3.5" />
                    +201
                  </span>
                  <!-- Mini Sparkline SVG -->
                  <svg class="h-6 w-16 stroke-amber-500 fill-amber-500/15" viewBox="0 0 64 24">
                    <path d="M0,16 Q16,20 32,8 T64,3 L64,24 L0,24 Z" stroke-width="0" />
                    <path d="M0,16 Q16,20 32,8 T64,3" fill="none" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Overview Chart & Recent Sales Grid with @defer Performance -->
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <div hlmCard class="col-span-1 lg:col-span-4">
              <div hlmCardHeader>
                <h3 hlmCardTitle>Overview</h3>
                <p hlmCardDescription>Monthly metrics breakdown with metric switcher.</p>
              </div>
              <div hlmCardContent class="px-2">
                @defer (on viewport) {
                  <app-overview-chart />
                } @placeholder {
                  <div hlmSkeleton class="h-[320px] sm:h-[350px] w-full rounded-lg"></div>
                }
              </div>
            </div>

            <div hlmCard class="col-span-1 lg:col-span-3">
              <div hlmCardHeader>
                <h3 hlmCardTitle>Recent Sales</h3>
                <p hlmCardDescription>You made 265 sales this month.</p>
              </div>
              <div hlmCardContent>
                @defer (on viewport) {
                  <app-recent-sales />
                } @placeholder {
                  <div class="space-y-4">
                    <div hlmSkeleton class="h-10 w-full rounded-md"></div>
                    <div hlmSkeleton class="h-10 w-full rounded-md"></div>
                    <div hlmSkeleton class="h-10 w-full rounded-md"></div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2: Analytics -->
        <div hlmTabsContent="analytics" class="space-y-4">
          @defer (on viewport) {
            <app-analytics />
          } @placeholder {
            <div hlmSkeleton class="h-96 w-full rounded-xl"></div>
          }
        </div>
      </hlm-tabs>
    </app-main>
  `,
})
export class DashboardComponent {
  readonly topNavLinks: TopNavLink[] = [
    { title: 'Overview', href: '/', isActive: true },
    { title: 'Customers', href: '/users', isActive: false },
    { title: 'Products', href: '/apps', isActive: false },
    { title: 'Settings', href: '/settings', isActive: false },
  ]

  downloadReport(): void {
    toast.success('Dashboard report generated and downloaded!')
  }
}
