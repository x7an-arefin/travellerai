import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideRadio,
  lucideGlobe,
  lucideActivity,
  lucidePlay,
  lucidePause,
  lucideRefreshCw,
  lucideTrendingUp,
  lucideUsers,
  lucideSmartphone,
  lucideMonitor,
  lucideTablet,
  lucideZap,
  lucideServer,
  lucideClock,
  lucideArrowUpRight,
  lucideLayers,
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
import { HlmSheetImports } from '../../ui/sheet/hlm-sheet.components'
import { HlmTableImports } from '../../ui/table/hlm-table.components'
import { toast } from 'ngx-sonner'

export interface RealtimeEvent {
  id: string
  time: string
  action: string
  location: string
  ip: string
  type: 'signup' | 'checkout' | 'pageview' | 'api'
}

export interface RegionTraffic {
  region: string
  visitors: number
  percentage: number
  latencyMs: number
  topCity: string
}

@Component({
  selector: 'app-realtime',
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
    ...HlmSheetImports,
    ...HlmTableImports,
  ],
  providers: [
    provideIcons({
      lucideRadio,
      lucideGlobe,
      lucideActivity,
      lucidePlay,
      lucidePause,
      lucideRefreshCw,
      lucideTrendingUp,
      lucideUsers,
      lucideSmartphone,
      lucideMonitor,
      lucideTablet,
      lucideZap,
      lucideServer,
      lucideClock,
      lucideArrowUpRight,
      lucideLayers,
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
    <app-main [fixed]="true" class="space-y-6">
      <!-- Title & Live Controller Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight text-foreground">Live Telemetry & Geo Traffic</h1>
            <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-200">
              <span class="size-2 rounded-full bg-emerald-500" [class.animate-ping]="isLive()"></span>
              {{ isLive() ? 'STREAMING ACTIVE' : 'STREAM PAUSED' }}
            </span>
          </div>
          <p class="text-xs text-muted-foreground">Real-time concurrent users, active telemetry events, and edge latency monitors.</p>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="toggleLiveStream()"
            class="gap-1.5 cursor-pointer h-9 shadow-xs"
          >
            <ng-icon [name]="isLive() ? 'lucidePause' : 'lucidePlay'" class="size-3.5" />
            <span>{{ isLive() ? 'Pause Stream' : 'Resume Stream' }}</span>
          </button>
          <button hlmBtn variant="outline" size="sm" (click)="clearLogs()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideRefreshCw" class="size-3.5 text-muted-foreground" />
            <span>Clear Buffer</span>
          </button>
        </div>
      </div>

      <!-- Live Radar Active User Deck -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 bg-gradient-to-br from-card to-muted/30 border-primary/30 shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Active Concurrent Users</span>
          <div class="text-3xl font-black tracking-tight text-foreground font-mono">
            {{ activeUsers() | number }}
          </div>
          <p class="text-[11px] text-emerald-600 font-semibold">+142 peak users vs 1 hour ago</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Global CDN Edge Latency</span>
          <div class="text-3xl font-black text-foreground font-mono">
            {{ avgLatency() }} ms
          </div>
          <p class="text-[11px] text-emerald-600 font-semibold">99.98% cache hit on Edge</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Events per Second</span>
          <div class="text-3xl font-black text-foreground font-mono">
            {{ eventsPerSec() }} req/s
          </div>
          <p class="text-[11px] text-sky-500 font-semibold">Zero throttled connections</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Active Web Sessions</span>
          <div class="text-3xl font-black text-foreground font-mono">
            {{ Math.round(activeUsers() * 1.34) | number }}
          </div>
          <p class="text-[11px] text-muted-foreground">Avg 4.8 pages / session</p>
        </div>
      </div>

      <!-- Regional Distribution & Real-time Live Log Stream -->
      <div class="grid gap-6 lg:grid-cols-5">
        <!-- Regional Distribution (3 Cols) -->
        <div hlmCard class="lg:col-span-3 p-5 space-y-4 shadow-2xs flex flex-col">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-sm text-foreground">Global Traffic by Continent</h3>
              <p class="text-xs text-muted-foreground">Active connections distributed across Cloudflare PoPs</p>
            </div>
            <button hlmBtn variant="ghost" size="sm" (click)="openRegionDrawer()" class="text-xs cursor-pointer">
              View Regional Drilldown
            </button>
          </div>

          <div class="space-y-3.5 flex-1 justify-center flex flex-col">
            @for (reg of regions(); track reg.region) {
              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-xs font-medium">
                  <span class="text-foreground font-semibold">{{ reg.region }}</span>
                  <div class="flex items-center gap-3 text-muted-foreground">
                    <span class="font-mono">{{ reg.latencyMs }}ms</span>
                    <span class="font-bold text-foreground">{{ reg.visitors }} users ({{ reg.percentage }}%)</span>
                  </div>
                </div>
                <div class="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    class="h-full bg-primary rounded-full transition-all duration-700"
                    [style.width.%]="reg.percentage"
                  ></div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Device & Platform Breakdown (2 Cols) -->
        <div hlmCard class="lg:col-span-2 p-5 space-y-4 shadow-2xs flex flex-col">
          <div>
            <h3 class="font-bold text-sm text-foreground">Client Environment</h3>
            <p class="text-xs text-muted-foreground">Device form factor and operating systems</p>
          </div>

          <div class="space-y-3 flex-1 flex flex-col justify-around">
            <div class="p-3 rounded-xl border border-border bg-card flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <ng-icon name="lucideMonitor" class="size-4" />
                </div>
                <div>
                  <div class="font-bold text-xs text-foreground">Desktop Browser</div>
                  <div class="text-[10px] text-muted-foreground">macOS, Windows, Linux</div>
                </div>
              </div>
              <span class="font-bold text-sm text-foreground">62.4%</span>
            </div>

            <div class="p-3 rounded-xl border border-border bg-card flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="size-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center">
                  <ng-icon name="lucideSmartphone" class="size-4" />
                </div>
                <div>
                  <div class="font-bold text-xs text-foreground">Mobile Devices</div>
                  <div class="text-[10px] text-muted-foreground">iOS, Android</div>
                </div>
              </div>
              <span class="font-bold text-sm text-foreground">31.2%</span>
            </div>

            <div class="p-3 rounded-xl border border-border bg-card flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="size-8 rounded-lg bg-violet-500/10 text-violet-600 flex items-center justify-center">
                  <ng-icon name="lucideTablet" class="size-4" />
                </div>
                <div>
                  <div class="font-bold text-xs text-foreground">Tablet Devices</div>
                  <div class="text-[10px] text-muted-foreground">iPadOS, Android Tab</div>
                </div>
              </div>
              <span class="font-bold text-sm text-foreground">6.4%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Active Pages & Realtime Stream Log -->
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Top Active URLs Table -->
        <div hlmCard class="p-0 overflow-hidden shadow-2xs">
          <div class="p-4 border-b border-border">
            <h3 class="font-bold text-sm text-foreground">Top Active Page Routes</h3>
            <p class="text-xs text-muted-foreground">Pages with highest concurrent viewer sessions</p>
          </div>
          <table hlmTable class="w-full text-xs">
            <thead hlmTableHeader>
              <tr hlmTableRow>
                <th hlmTableHead class="ps-4">Route Path</th>
                <th hlmTableHead>Active Viewers</th>
                <th hlmTableHead class="text-right pe-4">Share</th>
              </tr>
            </thead>
            <tbody hlmTableBody>
              @for (route of activeRoutes; track route.path) {
                <tr hlmTableRow>
                  <td hlmTableCell class="ps-4 font-mono font-medium text-foreground">{{ route.path }}</td>
                  <td hlmTableCell class="font-bold text-foreground">{{ route.viewers }} users</td>
                  <td hlmTableCell class="text-right pe-4 font-semibold text-emerald-600">{{ route.share }}%</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Live Realtime Event Log -->
        <div hlmCard class="p-4 space-y-3 shadow-2xs flex flex-col">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-sm text-foreground">Live Ingestion Event Feed</h3>
              <p class="text-xs text-muted-foreground">Streaming user interactions and microservice requests</p>
            </div>
            <span class="text-[10px] font-mono text-muted-foreground">{{ events().length }} captured</span>
          </div>

          <div class="flex-1 max-h-[300px] overflow-y-auto space-y-2 font-mono text-xs pr-1 no-scrollbar">
            @for (ev of events(); track ev.id) {
              <div class="p-2.5 rounded-lg border border-border/80 bg-muted/20 flex items-center justify-between text-[11px] animate-in fade-in-0 duration-200">
                <div class="flex items-center gap-2">
                  <span class="text-zinc-500">{{ ev.time }}</span>
                  <span class="font-semibold text-foreground">{{ ev.action }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-muted-foreground">{{ ev.location }}</span>
                  <span class="rounded bg-muted px-1.5 py-0.5 text-[9px] font-bold text-foreground">{{ ev.type }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </app-main>

    <!-- Regional Drilldown Sheet (size="sm" = 1/3 screen width) -->
    <hlm-sheet [isOpen]="regionDrawerOpen()" position="right" [size]="'sm'" (closed)="regionDrawerOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Regional Edge Point Telemetry</h3>
        <p hlmSheetDescription class="text-xs">Edge server metrics, TTFB performance, and routing health.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
          <div class="font-bold text-foreground">Cloudflare Edge Points: 310+ Locations</div>
          <p class="text-muted-foreground leading-relaxed">
            Traffic is automatically routed via Anycast DNS to the nearest data center. Average cold-start time is 18ms.
          </p>
        </div>

        <div class="space-y-3">
          <h4 class="font-bold text-foreground">Top Regional Hubs</h4>
          <div class="divide-y divide-border border rounded-xl overflow-hidden">
            @for (reg of regions(); track reg.region) {
              <div class="p-3 bg-card space-y-1">
                <div class="flex justify-between font-semibold">
                  <span class="text-foreground">{{ reg.region }}</span>
                  <span class="font-mono text-emerald-600">{{ reg.latencyMs }}ms</span>
                </div>
                <div class="flex justify-between text-[11px] text-muted-foreground">
                  <span>Primary Hub: {{ reg.topCity }}</span>
                  <span>{{ reg.visitors }} concurrents</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-end gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="regionDrawerOpen.set(false)" class="cursor-pointer text-xs">
          Close
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class RealtimeComponent implements OnInit, OnDestroy {
  readonly isLive = signal<boolean>(true)
  readonly regionDrawerOpen = signal<boolean>(false)
  readonly activeUsers = signal<number>(1482)
  readonly avgLatency = signal<number>(24)
  readonly eventsPerSec = signal<number>(318)
  protected readonly Math = Math

  private timer: any = null

  readonly regions = signal<RegionTraffic[]>([
    { region: 'North America', visitors: 620, percentage: 42, latencyMs: 14, topCity: 'Ashburn, VA' },
    { region: 'Europe', visitors: 460, percentage: 31, latencyMs: 22, topCity: 'Frankfurt, DE' },
    { region: 'Asia-Pacific', visitors: 250, percentage: 17, latencyMs: 48, topCity: 'Tokyo, JP' },
    { region: 'Latin America', visitors: 98, percentage: 7, latencyMs: 65, topCity: 'São Paulo, BR' },
    { region: 'Middle East & Africa', visitors: 54, percentage: 3, latencyMs: 78, topCity: 'Dubai, UAE' },
  ])

  readonly activeRoutes = [
    { path: '/', viewers: 480, share: 32 },
    { path: '/pricing', viewers: 310, share: 21 },
    { path: '/tasks', viewers: 240, share: 16 },
    { path: '/checkout', viewers: 180, share: 12 },
    { path: '/ai-workflows', viewers: 140, share: 9 },
    { path: '/files', viewers: 132, share: 10 },
  ]

  readonly events = signal<RealtimeEvent[]>([
    { id: 'ev-1', time: '14:28:12', action: 'Checkout Completed ($299.00)', location: 'New York, US', ip: '172.56.21.x', type: 'checkout' },
    { id: 'ev-2', time: '14:28:10', action: 'New User Registered', location: 'London, UK', ip: '82.14.99.x', type: 'signup' },
    { id: 'ev-3', time: '14:28:09', action: 'API Token Verified', location: 'Tokyo, JP', ip: '133.242.1.x', type: 'api' },
    { id: 'ev-4', time: '14:28:06', action: 'Page View: /pricing', location: 'Berlin, DE', ip: '91.42.18.x', type: 'pageview' },
    { id: 'ev-5', time: '14:28:04', action: 'Subscription Upgraded', location: 'Sydney, AU', ip: '139.130.4.x', type: 'signup' },
  ])

  ngOnInit(): void {
    this.timer = setInterval(() => {
      if (this.isLive()) {
        const delta = Math.floor(Math.random() * 9) - 4
        this.activeUsers.update((u) => Math.max(1200, u + delta))
        this.eventsPerSec.set(Math.floor(290 + Math.random() * 50))
      }
    }, 2000)
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer)
  }

  toggleLiveStream(): void {
    this.isLive.update((l) => !l)
    toast.info(this.isLive() ? 'Telemetry live streaming resumed.' : 'Live stream paused.')
  }

  clearLogs(): void {
    this.events.set([])
    toast.success('Realtime event log cleared.')
  }

  openRegionDrawer(): void {
    this.regionDrawerOpen.set(true)
  }
}
