import { Component, Input, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'

export type ChartMetric = 'revenue' | 'sales' | 'subscriptions'

interface MonthlyData {
  name: string
  revenue: number
  sales: number
  subscriptions: number
}

@Component({
  selector: 'app-overview-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full flex flex-col justify-between pt-2">
      <!-- Metric & Range Selector Switchers -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pb-3 px-1 border-b border-border/40 mb-2 gap-2">
        <div class="flex items-center gap-1.5">
          <span class="text-xs font-semibold text-muted-foreground">Trends</span>
          <div class="flex items-center gap-1 bg-muted/40 p-0.5 rounded-md border border-border/30">
            <button
              type="button"
              (click)="activeRange.set('7d')"
              class="px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer"
              [class.bg-background]="activeRange() === '7d'"
              [class.text-foreground]="activeRange() === '7d'"
              [class.shadow-2xs]="activeRange() === '7d'"
              [class.text-muted-foreground]="activeRange() !== '7d'"
            >
              7D
            </button>
            <button
              type="button"
              (click)="activeRange.set('30d')"
              class="px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer"
              [class.bg-background]="activeRange() === '30d'"
              [class.text-foreground]="activeRange() === '30d'"
              [class.shadow-2xs]="activeRange() === '30d'"
              [class.text-muted-foreground]="activeRange() !== '30d'"
            >
              30D
            </button>
            <button
              type="button"
              (click)="activeRange.set('ytd')"
              class="px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer"
              [class.bg-background]="activeRange() === 'ytd'"
              [class.text-foreground]="activeRange() === 'ytd'"
              [class.shadow-2xs]="activeRange() === 'ytd'"
              [class.text-muted-foreground]="activeRange() !== 'ytd'"
            >
              YTD
            </button>
          </div>
        </div>

        <div class="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg border border-border/40">
          <button
            type="button"
            (click)="activeMetric.set('revenue')"
            class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer"
            [class.bg-background]="activeMetric() === 'revenue'"
            [class.text-foreground]="activeMetric() === 'revenue'"
            [class.shadow-2xs]="activeMetric() === 'revenue'"
            [class.text-muted-foreground]="activeMetric() !== 'revenue'"
          >
            Revenue
          </button>

          <button
            type="button"
            (click)="activeMetric.set('sales')"
            class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer"
            [class.bg-background]="activeMetric() === 'sales'"
            [class.text-foreground]="activeMetric() === 'sales'"
            [class.shadow-2xs]="activeMetric() === 'sales'"
            [class.text-muted-foreground]="activeMetric() !== 'sales'"
          >
            Sales
          </button>

          <button
            type="button"
            (click)="activeMetric.set('subscriptions')"
            class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer"
            [class.bg-background]="activeMetric() === 'subscriptions'"
            [class.text-foreground]="activeMetric() === 'subscriptions'"
            [class.shadow-2xs]="activeMetric() === 'subscriptions'"
            [class.text-muted-foreground]="activeMetric() !== 'subscriptions'"
          >
            Subscribers
          </button>
        </div>
      </div>

      <!-- Bars container -->
      <div class="flex items-end justify-between gap-1 sm:gap-2 h-56 sm:h-64 px-1 sm:px-2 pt-2">
        @for (item of filteredData(); track item.name; let i = $index) {
          <div class="flex-1 flex flex-col items-center gap-1.5 sm:gap-2 group h-full justify-end min-w-0">
            <!-- Tooltip on hover -->
            <div class="opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-border text-popover-foreground text-[10px] sm:text-[11px] font-semibold py-0.5 sm:py-1 px-1.5 sm:px-2 rounded-md shadow-lg mb-1 whitespace-nowrap pointer-events-none z-10">
              @if (activeMetric() === 'revenue') {
                &#36;{{ item.revenue | number }}
              } @else if (activeMetric() === 'sales') {
                {{ item.sales | number }} sales
              } @else {
                +{{ item.subscriptions | number }} subs
              }
            </div>

            <!-- Bar with smooth height transition -->
            <div
              class="w-full max-w-[18px] sm:max-w-[32px] md:max-w-[42px] bg-primary rounded-t-xs sm:rounded-t-sm transition-all duration-500 ease-out group-hover:bg-primary/80 animate-chart-grow"
              [style.height.%]="(getCurrentValue(item) / maxValue()) * 100"
              [style.animation-delay.ms]="i * 45"
            ></div>

            <!-- Label -->
            <span class="text-[10px] sm:text-xs text-muted-foreground font-medium truncate text-center">
              {{ item.name }}
            </span>
          </div>
        }
      </div>
    </div>
  `,
})
export class OverviewChartComponent {
  readonly activeMetric = signal<ChartMetric>('revenue')
  readonly activeRange = signal<'7d' | '30d' | 'ytd'>('ytd')

  readonly fullData: MonthlyData[] = [
    { name: 'Jan', revenue: 4200, sales: 240, subscriptions: 80 },
    { name: 'Feb', revenue: 3100, sales: 190, subscriptions: 65 },
    { name: 'Mar', revenue: 5400, sales: 320, subscriptions: 110 },
    { name: 'Apr', revenue: 4900, sales: 280, subscriptions: 95 },
    { name: 'May', revenue: 6200, sales: 410, subscriptions: 140 },
    { name: 'Jun', revenue: 5800, sales: 380, subscriptions: 130 },
    { name: 'Jul', revenue: 6900, sales: 460, subscriptions: 175 },
    { name: 'Aug', revenue: 7200, sales: 510, subscriptions: 210 },
    { name: 'Sep', revenue: 5100, sales: 340, subscriptions: 120 },
    { name: 'Oct', revenue: 6400, sales: 430, subscriptions: 155 },
    { name: 'Nov', revenue: 7800, sales: 560, subscriptions: 230 },
    { name: 'Dec', revenue: 8500, sales: 620, subscriptions: 260 },
  ]

  readonly filteredData = computed(() => {
    const range = this.activeRange()
    if (range === '7d') {
      return this.fullData.slice(-4)
    }
    if (range === '30d') {
      return this.fullData.slice(-6)
    }
    return this.fullData
  })

  getCurrentValue(item: MonthlyData): number {
    return item[this.activeMetric()]
  }

  readonly maxValue = computed(() => {
    const metric = this.activeMetric()
    const data = this.filteredData()
    const max = Math.max(...data.map((d) => d[metric]))
    return max * 1.15
  })
}
