import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'

export type TravelChartMetric = 'revenue' | 'bookings' | 'travelers'

interface MonthlyTrend {
  month: string
  revenue: number
  bookings: number
  travelers: number
}

@Component({
  selector: 'app-travel-overview-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full flex flex-col justify-between pt-2">
      <!-- Metric & Range Switchers -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pb-3 px-1 border-b border-border/40 mb-2 gap-2">
        <div class="flex items-center gap-1.5">
          <span class="text-xs font-semibold text-muted-foreground">Period:</span>
          <div class="flex items-center gap-1 bg-muted/40 p-0.5 rounded-md border border-border/30">
            <button
              type="button"
              (click)="activeRange.set('7d')"
              class="px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-all"
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
              class="px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-all"
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
              class="px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-all"
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
            Gross Revenue
          </button>
          <button
            type="button"
            (click)="activeMetric.set('bookings')"
            class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer"
            [class.bg-background]="activeMetric() === 'bookings'"
            [class.text-foreground]="activeMetric() === 'bookings'"
            [class.shadow-2xs]="activeMetric() === 'bookings'"
            [class.text-muted-foreground]="activeMetric() !== 'bookings'"
          >
            Confirmed Bookings
          </button>
          <button
            type="button"
            (click)="activeMetric.set('travelers')"
            class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer"
            [class.bg-background]="activeMetric() === 'travelers'"
            [class.text-foreground]="activeMetric() === 'travelers'"
            [class.shadow-2xs]="activeMetric() === 'travelers'"
            [class.text-muted-foreground]="activeMetric() !== 'travelers'"
          >
            Travelers
          </button>
        </div>
      </div>

      <!-- Trend Visualization Bars -->
      <div class="flex items-end justify-between gap-1 sm:gap-2 h-56 sm:h-64 px-1 sm:px-2 pt-2">
        @for (item of currentData(); track item.month) {
          <div class="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
            <!-- Tooltip Hover Value -->
            <div
              class="opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-[10px] font-bold px-2 py-0.5 rounded shadow-md pointer-events-none mb-1 whitespace-nowrap border border-border/50"
            >
              {{ formatMetricValue(item) }}
            </div>

            <!-- Bar -->
            <div class="w-full max-w-[42px] bg-muted/30 rounded-t-md relative flex items-end h-[85%] overflow-hidden">
              <div
                class="w-full transition-all duration-500 rounded-t-md relative"
                [style.height.%]="getBarHeight(item)"
                [class.bg-primary]="activeMetric() === 'revenue'"
                [class.bg-emerald-500]="activeMetric() === 'bookings'"
                [class.bg-amber-500]="activeMetric() === 'travelers'"
              >
                <!-- Highlight sheen -->
                <div class="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            <!-- Label -->
            <span class="text-[11px] text-muted-foreground font-medium mt-2">
              {{ item.month }}
            </span>
          </div>
        }
      </div>

      <div class="flex items-center justify-between pt-3 text-[11px] text-muted-foreground border-t border-border/30 mt-2">
        <span class="flex items-center gap-1.5 font-medium">
          <span class="size-2 rounded-full"
                [class.bg-primary]="activeMetric() === 'revenue'"
                [class.bg-emerald-500]="activeMetric() === 'bookings'"
                [class.bg-amber-500]="activeMetric() === 'travelers'"></span>
          <span>Peak travel season velocity (Q2–Q3)</span>
        </span>
        <span class="font-semibold text-foreground">
          Average basket: $1,420 / booking
        </span>
      </div>
    </div>
  `,
})
export class TravelOverviewChartComponent {
  readonly activeRange = signal<'7d' | '30d' | 'ytd'>('ytd')
  readonly activeMetric = signal<TravelChartMetric>('revenue')

  readonly ytdData: MonthlyTrend[] = [
    { month: 'Jan', revenue: 24500, bookings: 98,  travelers: 210 },
    { month: 'Feb', revenue: 28900, bookings: 114, travelers: 246 },
    { month: 'Mar', revenue: 34200, bookings: 138, travelers: 312 },
    { month: 'Apr', revenue: 42100, bookings: 168, travelers: 390 },
    { month: 'May', revenue: 51200, bookings: 210, travelers: 480 },
    { month: 'Jun', revenue: 64800, bookings: 265, travelers: 610 },
    { month: 'Jul', revenue: 78500, bookings: 312, travelers: 740 },
    { month: 'Aug', revenue: 72300, bookings: 290, travelers: 690 },
    { month: 'Sep', revenue: 48200, bookings: 198, travelers: 470 },
    { month: 'Oct', revenue: 38400, bookings: 156, travelers: 360 },
  ]

  readonly currentData = computed(() => {
    if (this.activeRange() === '7d') {
      return this.ytdData.slice(-4)
    }
    if (this.activeRange() === '30d') {
      return this.ytdData.slice(-6)
    }
    return this.ytdData
  })

  private readonly maxValues = computed(() => {
    const data = this.currentData()
    return {
      revenue: Math.max(...data.map(d => d.revenue), 1),
      bookings: Math.max(...data.map(d => d.bookings), 1),
      travelers: Math.max(...data.map(d => d.travelers), 1),
    }
  })

  getBarHeight(item: MonthlyTrend): number {
    const metric = this.activeMetric()
    const max = this.maxValues()[metric]
    const val = item[metric]
    return Math.max(10, Math.round((val / max) * 100))
  }

  formatMetricValue(item: MonthlyTrend): string {
    const metric = this.activeMetric()
    if (metric === 'revenue') {
      return `\$${item.revenue.toLocaleString()}`
    }
    if (metric === 'bookings') {
      return `${item.bookings} bookings`
    }
    return `${item.travelers} travelers`
  }
}
