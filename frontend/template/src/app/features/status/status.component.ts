import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCheckCircle2,
  lucideActivity,
  lucideServer,
  lucideDatabase,
  lucideGlobe,
  lucideShieldCheck,
  lucideAlertTriangle,
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

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    CommonModule,
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
  ],
  providers: [
    provideIcons({
      lucideCheckCircle2,
      lucideActivity,
      lucideServer,
      lucideDatabase,
      lucideGlobe,
      lucideShieldCheck,
      lucideAlertTriangle,
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
    <app-main [fixed]="true" class="space-y-8 max-w-4xl mx-auto py-6">
      <!-- Operational Hero Banner -->
      <div class="p-6 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-between shadow-xs">
        <div class="flex items-center gap-3.5">
          <div class="relative flex size-4">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex size-4 rounded-full bg-emerald-500"></span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-emerald-800 dark:text-emerald-300">All Systems Operational</h1>
            <p class="text-xs text-muted-foreground mt-0.5">Updated 1 minute ago • 99.98% uptime in the last 90 days</p>
          </div>
        </div>

        <span hlmBadge variant="outline" class="hidden sm:inline-flex bg-background text-xs font-mono font-bold">
          99.98%
        </span>
      </div>

      <!-- 90-Day Uptime Micro-Bar Matrix -->
      <div hlmCard class="p-6 space-y-6 shadow-sm">
        <h3 class="text-sm font-bold uppercase tracking-wider text-muted-foreground">Service Health Matrix</h3>

        <div class="space-y-6">
          @for (service of services; track service.name) {
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-2 font-semibold text-foreground">
                  <ng-icon [name]="service.icon" class="size-4 text-muted-foreground" />
                  <span>{{ service.name }}</span>
                </div>
                <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{{ service.uptime }}</span>
              </div>

              <!-- 45 micro bars representing days -->
              <div class="flex items-center gap-[3px]">
                @for (day of service.bars; track $index) {
                  <div
                    class="h-7 flex-1 rounded-[2px] transition-all hover:scale-y-125 cursor-pointer"
                    [class.bg-emerald-500]="day === 1"
                    [class.bg-amber-400]="day === 2"
                    [class.bg-rose-500]="day === 3"
                    title="Uptime: 100%"
                  ></div>
                }
              </div>

              <div class="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>90 days ago</span>
                <span>Today</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Historical Incident Report Log -->
      <div hlmCard class="p-6 space-y-4 shadow-sm">
        <h3 class="text-sm font-bold uppercase tracking-wider text-muted-foreground">Past Incident History</h3>

        <div class="space-y-4 divide-y divide-border">
          <div class="pt-3 space-y-1.5 first:pt-0">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-foreground">CDN Cache Revalidation Latency Spike</span>
              <span hlmBadge variant="outline" class="text-[9px] text-emerald-600 bg-emerald-500/10">Resolved</span>
            </div>
            <p class="text-xs text-muted-foreground leading-relaxed">
              We experienced elevated response times on our Western European edge edge nodes. The issue was traced to DNS routing and resolved in 8 minutes.
            </p>
            <p class="text-[10px] font-mono text-muted-foreground/70">Aug 02, 2026 • Duration: 8m</p>
          </div>

          <div class="pt-3 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-foreground">Scheduled Database Maintenance</span>
              <span hlmBadge variant="outline" class="text-[9px] text-sky-600 bg-sky-500/10">Completed</span>
            </div>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Scheduled memory optimization and PostgreSQL version upgrade completed with 0 client downtime.
            </p>
            <p class="text-[10px] font-mono text-muted-foreground/70">Jul 18, 2026 • Duration: 15m</p>
          </div>
        </div>
      </div>
    </app-main>
  `,
})
export class StatusComponent {
  readonly services = [
    { name: 'API Gateway & GraphQL Endpoints', icon: 'lucideServer', uptime: '99.99%', bars: Array(45).fill(1) },
    { name: 'Authentication & Session Cluster', icon: 'lucideShieldCheck', uptime: '100.0%', bars: Array(45).fill(1) },
    { name: 'Primary Database & Read Replicas', icon: 'lucideDatabase', uptime: '99.95%', bars: [...Array(38).fill(1), 2, ...Array(6).fill(1)] },
    { name: 'Global CDN & Edge Assets Network', icon: 'lucideGlobe', uptime: '100.0%', bars: Array(45).fill(1) },
  ]
}
