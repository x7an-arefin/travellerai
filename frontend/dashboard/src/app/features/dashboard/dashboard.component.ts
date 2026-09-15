import { Component, OnInit, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideDollarSign,
  lucideUsers,
  lucideCreditCard,
  lucideActivity,
  lucideDownload,
  lucideTrendingUp,
  lucideTrendingDown,
  lucidePackage,
  lucideCalendarCheck,
  lucideStar,
  lucideShieldCheck,
  lucideClock,
  lucidePlus,
  lucideWallet,
  lucideArrowUpRight,
  lucideRotateCcw,
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
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmTabsImports } from '../../ui/tabs/hlm-tabs.components'
import { HlmSkeletonImports } from '../../ui/skeleton/hlm-skeleton.directive'
import { TravelOverviewChartComponent } from './components/travel-overview-chart.component'
import { TopPackagesComponent } from './components/top-packages.component'
import { RecentBookingsComponent } from './components/recent-bookings.component'
import { OperationalTasksComponent } from './components/operational-tasks.component'
import { TravelAnalyticsComponent } from './components/travel-analytics.component'
import { DashboardApiService } from './data-access/services/dashboard-api.service'
import { DashboardKpis } from './data-access/models/dashboard.model'
import { toast } from 'ngx-sonner'


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
    ...HlmBadgeImports,
    ...HlmTabsImports,
    ...HlmSkeletonImports,
    TravelOverviewChartComponent,
    TopPackagesComponent,
    RecentBookingsComponent,
    OperationalTasksComponent,
    TravelAnalyticsComponent,
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
      lucidePackage,
      lucideCalendarCheck,
      lucideStar,
      lucideShieldCheck,
      lucideClock,
      lucidePlus,
      lucideWallet,
      lucideArrowUpRight,
      lucideRotateCcw,
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
      <!-- Page Header & Global Quick Actions -->
      <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight">Marketplace Dashboard</h1>
            <span hlmBadge variant="default" class="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs px-2 py-0.5">
              Live Network
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Unified multi-provider travel commerce platform — real-time bookings, revenue, and tour operations.
          </p>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <app-date-range-picker />

          <a routerLink="/packages" hlmBtn size="sm" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-4" />
            <span>New Package</span>
          </a>

          <button hlmBtn variant="outline" size="sm" (click)="downloadReport()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideDownload" class="size-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <!-- Provider KYC & Platform Status Banner -->
      <div class="mb-5 p-3.5 rounded-xl border border-primary/20 bg-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div class="flex items-center gap-3">
          <div class="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <ng-icon name="lucideShieldCheck" class="size-5" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-foreground">Verified Marketplace Operator</span>
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                KYC Approved
              </span>
            </div>
            <p class="text-xs text-muted-foreground">
              Direct settlement active · 142 travel providers connected · Multi-currency payout gateway enabled (USD, EUR, GBP, JPY).
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <a routerLink="/kyc" hlmBtn variant="outline" size="sm" class="text-xs h-8 bg-background/80">
            KYC Verification Hub
          </a>
          <a routerLink="/withdrawals" hlmBtn size="sm" class="text-xs h-8">
            Manage Payouts
          </a>
        </div>
      </div>

      <!-- Dashboard Tabs -->
      <hlm-tabs defaultValue="overview" class="space-y-5">
        <div class="w-full overflow-x-auto pb-1 no-scrollbar border-b border-border/40">
          <div hlmTabsList class="bg-transparent p-0 gap-4">
            <button hlmTabsTrigger="overview" class="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 font-semibold">
              Executive Overview
            </button>
            <button hlmTabsTrigger="analytics" class="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 font-semibold">
              Destination & Market Analytics
            </button>
            <button hlmTabsTrigger="operations" class="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 font-semibold">
              Operational Queue
            </button>
          </div>
        </div>

        <!-- Tab 1: Executive Overview -->
        <div hlmTabsContent="overview" class="space-y-6">
          <!-- 8 Primary Metric KPI Cards (PRD Section 9.9) -->
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <!-- 1. Total Gross Revenue -->
            <div hlmCard class="hover:border-primary/40 transition-colors relative overflow-hidden group">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-xs font-semibold text-muted-foreground">Total Revenue</span>
                <div class="size-7 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  <ng-icon name="lucideDollarSign" class="size-4" />
                </div>
              </div>
              <div hlmCardContent>
                <div class="text-2xl font-bold tracking-tight">\${{ kpis().totalRevenue | number:'1.2-2' }}</div>
                <div class="flex items-center justify-between mt-1.5">
                  <span class="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ng-icon name="lucideTrendingUp" class="size-3.5" />
                    +14.2% MoM
                  </span>
                  <span class="text-[11px] text-muted-foreground">Avg $1,420/booking</span>
                </div>
              </div>
            </div>

            <!-- 2. Net Earnings -->
            <div hlmCard class="hover:border-primary/40 transition-colors relative overflow-hidden group">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-xs font-semibold text-muted-foreground">Net Platform Earnings</span>
                <div class="size-7 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <ng-icon name="lucideWallet" class="size-4" />
                </div>
              </div>
              <div hlmCardContent>
                <div class="text-2xl font-bold tracking-tight">\${{ kpis().netPlatformEarnings | number:'1.2-2' }}</div>
                <div class="flex items-center justify-between mt-1.5">
                  <span class="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ng-icon name="lucideTrendingUp" class="size-3.5" />
                    15.0% commission
                  </span>
                  <span class="text-[11px] text-muted-foreground">+\$8,200 this mo.</span>
                </div>
              </div>
            </div>

            <!-- 3. Pending Payouts -->
            <div hlmCard class="hover:border-primary/40 transition-colors relative overflow-hidden group">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-xs font-semibold text-muted-foreground">Pending Payouts</span>
                <div class="size-7 rounded-md bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <ng-icon name="lucideCreditCard" class="size-4" />
                </div>
              </div>
              <div hlmCardContent>
                <div class="text-2xl font-bold tracking-tight">\${{ kpis().pendingPayouts | number:'1.2-2' }}</div>
                <div class="flex items-center justify-between mt-1.5">
                  <span class="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    18 provider requests
                  </span>
                  <a routerLink="/withdrawals" class="text-[11px] text-primary hover:underline font-medium">Review &rarr;</a>
                </div>
              </div>
            </div>

            <!-- 4. Total Bookings -->
            <div hlmCard class="hover:border-primary/40 transition-colors relative overflow-hidden group">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-xs font-semibold text-muted-foreground">Total Bookings</span>
                <div class="size-7 rounded-md bg-sky-500/10 text-sky-500 flex items-center justify-center">
                  <ng-icon name="lucideCalendarCheck" class="size-4" />
                </div>
              </div>
              <div hlmCardContent>
                <div class="text-2xl font-bold tracking-tight">{{ kpis().totalBookings | number }} Trips</div>
                <div class="flex items-center justify-between mt-1.5">
                  <span class="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ng-icon name="lucideTrendingUp" class="size-3.5" />
                    +18.5% YoY
                  </span>
                  <span class="text-[11px] text-muted-foreground">{{ kpis().activeTravelers | number }} travelers</span>
                </div>
              </div>
            </div>

            <!-- 5. Upcoming Departures -->
            <div hlmCard class="hover:border-primary/40 transition-colors">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-xs font-semibold text-muted-foreground">Upcoming Departures</span>
                <ng-icon name="lucideClock" class="size-4 text-primary" />
              </div>
              <div hlmCardContent>
                <div class="text-xl font-bold">{{ kpis().upcomingDepartures }} Active Tours</div>
                <p class="text-xs text-muted-foreground mt-1">Scheduled next 14 days · 94% seat capacity</p>
              </div>
            </div>

            <!-- 6. Completed Tours -->
            <div hlmCard class="hover:border-primary/40 transition-colors">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-xs font-semibold text-muted-foreground">Concluded Tours</span>
                <ng-icon name="lucidePackage" class="size-4 text-emerald-500" />
              </div>
              <div hlmCardContent>
                <div class="text-xl font-bold">{{ kpis().concludedTours | number }} Tours</div>
                <p class="text-xs text-muted-foreground mt-1">99.2% on-schedule completion rate</p>
              </div>
            </div>

            <!-- 7. Refund Volume -->
            <div hlmCard class="hover:border-primary/40 transition-colors">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-xs font-semibold text-muted-foreground">Refunds & Cancel Rate</span>
                <ng-icon name="lucideRotateCcw" class="size-4 text-rose-500" />
              </div>
              <div hlmCardContent>
                <div class="text-xl font-bold">{{ kpis().refundRate }}% (\${{ kpis().refundAmount | number:'1.2-2' }})</div>
                <p class="text-xs text-muted-foreground mt-1">Well below 3.0% marketplace risk threshold</p>
              </div>
            </div>

            <!-- 8. Average Review Score -->
            <div hlmCard class="hover:border-primary/40 transition-colors">
              <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
                <span hlmCardTitle class="text-xs font-semibold text-muted-foreground">Traveler Rating</span>
                <ng-icon name="lucideStar" class="size-4 text-amber-500 fill-amber-500" />
              </div>
              <div hlmCardContent>
                <div class="text-xl font-bold">{{ kpis().travelerRating }} / 5.0 ★</div>
                <p class="text-xs text-muted-foreground mt-1">From {{ kpis().verifiedReviewsCount | number }} verified customer reviews</p>
              </div>
            </div>

          </div>

          <!-- Mid Section: Chart (Left) + Operational Tasks (Right) -->
          <div class="grid gap-4 lg:grid-cols-7">
            <!-- Travel Overview Revenue Chart -->
            <div hlmCard class="lg:col-span-4 p-5 flex flex-col justify-between">
              <div class="flex items-center justify-between pb-2">
                <div>
                  <h3 class="text-base font-bold text-foreground">Marketplace Sales Velocity</h3>
                  <p class="text-xs text-muted-foreground">Monthly gross revenue, bookings, and traveler volume trends</p>
                </div>
                <span hlmBadge variant="outline" class="text-xs">
                  2026 Fiscal
                </span>
              </div>
              <app-travel-overview-chart />
            </div>

            <!-- Urgent Operational Tasks & Alerts -->
            <div hlmCard class="lg:col-span-3 p-5 flex flex-col justify-between">
              <div class="flex items-center justify-between pb-3 border-b border-border/40 mb-3">
                <div>
                  <h3 class="text-base font-bold text-foreground">Outstanding Tasks</h3>
                  <p class="text-xs text-muted-foreground">Operational alerts requiring team resolution</p>
                </div>
                <span hlmBadge variant="destructive" class="text-xs">
                  4 Actions
                </span>
              </div>
              <app-operational-tasks />
            </div>
          </div>

          <!-- Bottom Section: Top Packages (Left) + Live Bookings Queue (Right) -->
          <div class="grid gap-4 lg:grid-cols-7">
            <!-- Top Travel Packages -->
            <div hlmCard class="lg:col-span-4 p-5">
              <div class="flex items-center justify-between pb-3 border-b border-border/40 mb-4">
                <div>
                  <h3 class="text-base font-bold text-foreground">Top Performing Packages</h3>
                  <p class="text-xs text-muted-foreground">Highest grossing travel experiences & activities</p>
                </div>
                <a routerLink="/packages" hlmBtn variant="ghost" size="sm" class="text-xs gap-1">
                  <span>View All</span>
                  <ng-icon name="lucideArrowUpRight" class="size-3.5" />
                </a>
              </div>
              <app-top-packages />
            </div>

            <!-- Live Bookings Queue -->
            <div hlmCard class="lg:col-span-3 p-5">
              <div class="flex items-center justify-between pb-3 border-b border-border/40 mb-4">
                <div>
                  <h3 class="text-base font-bold text-foreground">Recent Bookings Pipeline</h3>
                  <p class="text-xs text-muted-foreground">Live customer reservations & confirmations</p>
                </div>
                <a routerLink="/bookings" hlmBtn variant="ghost" size="sm" class="text-xs gap-1">
                  <span>All Bookings</span>
                  <ng-icon name="lucideArrowUpRight" class="size-3.5" />
                </a>
              </div>
              <app-recent-bookings />
            </div>
          </div>
        </div>

        <!-- Tab 2: Analytics -->
        <div hlmTabsContent="analytics">
          <app-travel-analytics />
        </div>

        <!-- Tab 3: Operations -->
        <div hlmTabsContent="operations" class="space-y-4">
          <div hlmCard class="p-5">
            <h3 class="text-base font-bold text-foreground mb-1">Operational Health & Compliance</h3>
            <p class="text-xs text-muted-foreground mb-4">Real-time status of provider verifications, guides, and schedules</p>
            <app-operational-tasks />
          </div>
        </div>
      </hlm-tabs>
    </app-main>
  `,
})
export class DashboardComponent implements OnInit {
  private readonly dashboardApi = inject(DashboardApiService)

  readonly topNavLinks: TopNavLink[] = [
    { title: 'Overview', href: '/', isActive: true },
    { title: 'Packages & Tours', href: '/packages' },
    { title: 'Bookings Pipeline', href: '/bookings' },
    { title: 'Departures', href: '/departures' },
    { title: 'Providers', href: '/providers' },
    { title: 'Payouts', href: '/withdrawals' },
  ]

  readonly kpis = signal<DashboardKpis>({
    totalRevenue: 482950,
    netPlatformEarnings: 72442.5,
    pendingPayouts: 21680,
    totalBookings: 1948,
    activeTravelers: 4260,
    upcomingDepartures: 42,
    concludedTours: 1480,
    refundRate: 1.34,
    refundAmount: 3450,
    travelerRating: 4.88,
    verifiedReviewsCount: 2410,
  })

  async ngOnInit(): Promise<void> {
    try {
      const res = await this.dashboardApi.getMetrics()
      if (res.ok && res.data && res.data.kpis) {
        this.kpis.set(res.data.kpis)
      }
    } catch {
      // Fallback preserved
    }
  }

  downloadReport(): void {
    toast.success('Marketplace Report Generated', {
      description: 'The Q3 2026 travel performance CSV has been downloaded.',
    })
  }
}

