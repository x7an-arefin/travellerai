import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideTrendingDown,
  lucideTrendingUp,
  lucideUsers,
  lucideShoppingCart,
  lucideCreditCard,
  lucideCheckCircle2,
  lucideEye,
  lucideGlobe,
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
import { HlmTableImports } from '../../ui/table/hlm-table.components'

export interface FunnelStep {
  stepNumber: number
  title: string
  visitors: number
  conversionRate: string
  dropOffRate: string
  color: string
  icon: string
}

@Component({
  selector: 'app-funnel',
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
    ...HlmTableImports,
  ],
  providers: [
    provideIcons({
      lucideTrendingDown,
      lucideTrendingUp,
      lucideUsers,
      lucideShoppingCart,
      lucideCreditCard,
      lucideCheckCircle2,
      lucideEye,
      lucideGlobe,
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

    <!-- Main Funnel Analysis -->
    <app-main [fixed]="true" class="space-y-6 max-w-5xl mx-auto py-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Conversion Funnel Analytics</h1>
          <p class="text-xs text-muted-foreground">Analyze user drop-off across the customer purchase journey.</p>
        </div>

        <div class="flex items-center gap-2">
          <span hlmBadge variant="outline" class="text-xs font-mono font-bold text-emerald-600 bg-emerald-500/10">
            Overall Conversion: 5.12%
          </span>
        </div>
      </div>

      <!-- Funnel Step Progression Cards -->
      <div class="grid gap-3 sm:grid-cols-5">
        @for (step of funnelSteps; track step.stepNumber) {
          <div hlmCard class="p-4 space-y-2 hover:border-primary/50 transition-colors shadow-2xs relative">
            <div class="flex items-center justify-between">
              <span class="size-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                {{ step.stepNumber }}
              </span>
              <ng-icon [name]="step.icon" class="size-4 text-muted-foreground" />
            </div>

            <div>
              <p class="text-xs font-bold text-foreground truncate">{{ step.title }}</p>
              <div class="text-lg font-extrabold text-foreground mt-1">{{ step.visitors | number }}</div>
            </div>

            <div class="pt-1 border-t border-border/40 space-y-0.5 text-[10px]">
              <div class="flex justify-between text-emerald-600 font-semibold">
                <span>Retained:</span>
                <span>{{ step.conversionRate }}</span>
              </div>
              <div class="flex justify-between text-rose-500 font-medium">
                <span>Drop-off:</span>
                <span>-{{ step.dropOffRate }}</span>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Visual Funnel Proportion Bars -->
      <div hlmCard class="p-6 space-y-6 shadow-sm">
        <h3 class="text-sm font-bold uppercase tracking-wider text-muted-foreground">Visual Funnel Progression</h3>

        <div class="space-y-4">
          @for (step of funnelSteps; track step.stepNumber) {
            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-2 font-semibold">
                  <ng-icon [name]="step.icon" class="size-4 text-muted-foreground" />
                  <span>{{ step.stepNumber }}. {{ step.title }}</span>
                </div>
                <div class="flex items-center gap-3 font-mono">
                  <span class="font-bold">{{ step.visitors | number }} visitors</span>
                  <span class="text-muted-foreground">({{ step.conversionRate }})</span>
                </div>
              </div>

              <!-- Funnel bar with width matching percentage -->
              <div class="h-4 w-full bg-muted rounded-full overflow-hidden p-0.5">
                <div
                  class="h-full rounded-full transition-all duration-700 ease-out shadow-xs"
                  [ngClass]="step.color"
                  [style.width]="step.conversionRate"
                ></div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Top Converting Countries Table -->
      <div hlmCard class="p-6 space-y-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-semibold text-foreground">Traffic by Country & Conversion</h3>
            <p class="text-xs text-muted-foreground">Regional conversion effectiveness across global traffic.</p>
          </div>
        </div>

        <div class="rounded-lg border border-border overflow-x-auto">
          <table hlmTable class="min-w-[550px]">
            <thead hlmTableHeader>
              <tr hlmTableRow>
                <th hlmTableHead class="ps-4">Country</th>
                <th hlmTableHead>Visitors</th>
                <th hlmTableHead>Purchases</th>
                <th hlmTableHead class="text-right pe-4">Conversion Rate</th>
              </tr>
            </thead>
            <tbody hlmTableBody>
              @for (c of countries; track c.name) {
                <tr hlmTableRow>
                  <td hlmTableCell class="ps-4 font-semibold text-xs text-foreground">
                    <div class="flex items-center gap-2">
                      <span class="text-sm">{{ c.flag }}</span>
                      <span>{{ c.name }}</span>
                    </div>
                  </td>
                  <td hlmTableCell class="text-xs font-mono text-muted-foreground">{{ c.visitors | number }}</td>
                  <td hlmTableCell class="text-xs font-mono text-foreground font-semibold">{{ c.purchases | number }}</td>
                  <td hlmTableCell class="text-right pe-4 font-bold text-xs text-emerald-600">
                    {{ c.rate }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </app-main>
  `,
})
export class FunnelComponent {
  readonly funnelSteps: FunnelStep[] = [
    { stepNumber: 1, title: 'Website Visitors', visitors: 100000, conversionRate: '100%', dropOffRate: '0%', color: 'bg-primary', icon: 'lucideUsers' },
    { stepNumber: 2, title: 'Product Page Views', visitors: 42000, conversionRate: '42.0%', dropOffRate: '58.0%', color: 'bg-sky-500', icon: 'lucideEye' },
    { stepNumber: 3, title: 'Added to Cart', visitors: 18400, conversionRate: '18.4%', dropOffRate: '56.2%', color: 'bg-amber-500', icon: 'lucideShoppingCart' },
    { stepNumber: 4, title: 'Initiated Checkout', visitors: 8200, conversionRate: '8.2%', dropOffRate: '55.4%', color: 'bg-violet-500', icon: 'lucideCreditCard' },
    { stepNumber: 5, title: 'Completed Purchase', visitors: 5120, conversionRate: '5.12%', dropOffRate: '37.6%', color: 'bg-emerald-500', icon: 'lucideCheckCircle2' },
  ]

  readonly countries = [
    { name: 'United States', flag: '🇺🇸', visitors: 48200, purchases: 3120, rate: '6.47%' },
    { name: 'United Kingdom', flag: '🇬🇧', visitors: 18400, purchases: 1040, rate: '5.65%' },
    { name: 'Germany', flag: '🇩🇪', visitors: 14100, purchases: 720, rate: '5.10%' },
    { name: 'Canada', flag: '🇨🇦', visitors: 9800, purchases: 490, rate: '5.00%' },
    { name: 'Japan', flag: '🇯🇵', visitors: 7500, purchases: 320, rate: '4.26%' },
  ]
}
