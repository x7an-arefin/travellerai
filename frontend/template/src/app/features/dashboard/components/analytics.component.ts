import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideTrendingUp,
  lucideUsers,
  lucideMousePointerClick,
  lucideClock,
  lucideEye,
} from '@ng-icons/lucide'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmCardImports],
  providers: [
    provideIcons({
      lucideTrendingUp,
      lucideUsers,
      lucideMousePointerClick,
      lucideClock,
      lucideEye,
    }),
  ],
  template: `
    <div class="space-y-4">
      <!-- 4 Analytics Metric Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Metric 1 -->
        <div hlmCard class="hover:border-primary/40 transition-colors">
          <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
            <span hlmCardTitle class="text-sm font-medium">Total Clicks</span>
            <ng-icon name="lucideMousePointerClick" class="size-4 text-muted-foreground" />
          </div>
          <div hlmCardContent>
            <div class="text-2xl font-bold">1,248</div>
            <p class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">+12.4% vs last week</p>
          </div>
        </div>

        <!-- Metric 2 -->
        <div hlmCard class="hover:border-primary/40 transition-colors">
          <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
            <span hlmCardTitle class="text-sm font-medium">Unique Visitors</span>
            <ng-icon name="lucideUsers" class="size-4 text-muted-foreground" />
          </div>
          <div hlmCardContent>
            <div class="text-2xl font-bold">832</div>
            <p class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">+5.8% vs last week</p>
          </div>
        </div>

        <!-- Metric 3 -->
        <div hlmCard class="hover:border-primary/40 transition-colors">
          <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
            <span hlmCardTitle class="text-sm font-medium">Bounce Rate</span>
            <ng-icon name="lucideTrendingUp" class="size-4 text-muted-foreground" />
          </div>
          <div hlmCardContent>
            <div class="text-2xl font-bold">42%</div>
            <p class="text-xs text-rose-500 font-semibold mt-1">-3.2% vs last week</p>
          </div>
        </div>

        <!-- Metric 4 -->
        <div hlmCard class="hover:border-primary/40 transition-colors">
          <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
            <span hlmCardTitle class="text-sm font-medium">Avg. Session</span>
            <ng-icon name="lucideClock" class="size-4 text-muted-foreground" />
          </div>
          <div hlmCardContent>
            <div class="text-2xl font-bold">3m 24s</div>
            <p class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">+18s vs last week</p>
          </div>
        </div>
      </div>

      <!-- Traffic Area Curve Chart Card -->
      <div hlmCard class="p-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-2 border-b border-border/40">
          <div>
            <h3 class="text-base font-semibold text-foreground">Traffic Impressions & Clicks</h3>
            <p class="text-xs text-muted-foreground">Daily analytics curve for the current week</p>
          </div>

          <div class="flex items-center gap-4 text-xs">
            <div class="flex items-center gap-1.5 font-medium">
              <span class="size-2.5 rounded-full bg-primary"></span>
              <span>Impressions</span>
            </div>
            <div class="flex items-center gap-1.5 font-medium text-muted-foreground">
              <span class="size-2.5 rounded-full bg-sky-400"></span>
              <span>Visitors</span>
            </div>
          </div>
        </div>

        <!-- SVG Area Curve Visualization -->
        <div class="h-64 w-full pt-4 flex flex-col justify-end">
          <svg class="w-full h-48 overflow-visible" viewBox="0 0 600 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.3" />
                <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0.0" />
              </linearGradient>
              <linearGradient id="areaGradSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            <!-- Grid Lines -->
            <line x1="0" y1="30" x2="600" y2="30" stroke="currentColor" stroke-dasharray="3 3" opacity="0.1" />
            <line x1="0" y1="80" x2="600" y2="80" stroke="currentColor" stroke-dasharray="3 3" opacity="0.1" />
            <line x1="0" y1="130" x2="600" y2="130" stroke="currentColor" stroke-dasharray="3 3" opacity="0.1" />

            <!-- Series 1 Area & Line (Impressions) -->
            <path d="M0,140 Q100,50 200,100 T400,40 T600,20 L600,180 L0,180 Z" fill="url(#areaGrad)" />
            <path d="M0,140 Q100,50 200,100 T400,40 T600,20" fill="none" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" class="animate-chart-path" />

            <!-- Series 2 Area & Line (Visitors) -->
            <path d="M0,160 Q100,110 200,130 T400,80 T600,60 L600,180 L0,180 Z" fill="url(#areaGradSky)" />
            <path d="M0,160 Q100,110 200,130 T400,80 T600,60" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" class="animate-chart-path" />

            <!-- Data Point Dots -->
            <circle cx="200" cy="100" r="4.5" fill="var(--color-primary)" stroke="#fff" stroke-width="2" />
            <circle cx="400" cy="40" r="4.5" fill="var(--color-primary)" stroke="#fff" stroke-width="2" />
            <circle cx="600" cy="20" r="4.5" fill="var(--color-primary)" stroke="#fff" stroke-width="2" />
          </svg>

          <!-- Day Labels -->
          <div class="flex items-center justify-between text-xs text-muted-foreground pt-3 px-1 border-t border-border/40 font-medium">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </div>

      <!-- Traffic Referrers & Devices Breakdown -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div hlmCard class="col-span-1 lg:col-span-4">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Referrers</h3>
            <p hlmCardDescription>Top sources driving traffic to your app</p>
          </div>
          <div hlmCardContent class="space-y-4">
            @for (ref of referrers; track ref.name) {
              <div class="flex items-center justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <div class="mb-1 truncate text-xs text-muted-foreground font-medium">{{ ref.name }}</div>
                  <div class="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div class="h-full bg-primary rounded-full transition-all duration-500" [style.width.%]="(ref.value / 600) * 100"></div>
                  </div>
                </div>
                <div class="text-xs font-semibold tabular-nums">{{ ref.value }}</div>
              </div>
            }
          </div>
        </div>

        <div hlmCard class="col-span-1 lg:col-span-3">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Devices</h3>
            <p hlmCardDescription>How users access your app</p>
          </div>
          <div hlmCardContent class="space-y-4">
            @for (dev of devices; track dev.name) {
              <div class="flex items-center justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <div class="mb-1 truncate text-xs text-muted-foreground font-medium">{{ dev.name }}</div>
                  <div class="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div class="h-full bg-muted-foreground/80 rounded-full transition-all duration-500" [style.width.%]="dev.value"></div>
                  </div>
                </div>
                <div class="text-xs font-semibold tabular-nums">{{ dev.value }}%</div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AnalyticsComponent {
  readonly referrers = [
    { name: 'Direct', value: 512 },
    { name: 'Product Hunt', value: 238 },
    { name: 'Twitter / X', value: 174 },
    { name: 'Blog / Medium', value: 104 },
  ]

  readonly devices = [
    { name: 'Desktop', value: 74 },
    { name: 'Mobile', value: 22 },
    { name: 'Tablet', value: 4 },
  ]
}
