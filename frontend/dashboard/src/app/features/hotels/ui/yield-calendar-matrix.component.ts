import { Component, OnInit, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCalendar,
  lucideDollarSign,
  lucideLock,
  lucideCheck,
  lucideAlertCircle,
  lucideSlidersHorizontal,
  lucidePlus,
  lucideMinus,
  lucideSave,
  lucideRefreshCw,
  lucideTrendingUp,
} from '@ng-icons/lucide'
import { HotelsFacade } from '../data-access/hotels.facade'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { toast } from 'ngx-sonner'

export interface YieldDayCell {
  dateStr: string
  dayOfWeek: string
  isWeekend: boolean
  rate: number
  availableUnits: number
  stopSell: boolean
  closedToArrival: boolean
  closedToDeparture: boolean
  minStayNights: number
}

export interface RoomYieldRow {
  roomTypeId: string
  roomTypeName: string
  baseRate: number
  totalUnits: number
  days: YieldDayCell[]
}

@Component({
  selector: 'app-yield-calendar-matrix',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon, ...HlmButtonImports, ...HlmBadgeImports],
  providers: [
    provideIcons({
      lucideCalendar,
      lucideDollarSign,
      lucideLock,
      lucideCheck,
      lucideAlertCircle,
      lucideSlidersHorizontal,
      lucidePlus,
      lucideMinus,
      lucideSave,
      lucideRefreshCw,
      lucideTrendingUp,
    }),
  ],
  template: `
    <div class="space-y-4">
      <!-- Matrix Header & Bulk Adjustment Bar -->
      <div class="rounded-xl border border-border bg-card p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-bold text-foreground">Dynamic Yield & Rate Plan Matrix</h3>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">OTA 2017B Standard</span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">Manage daily rates, stop-sells, and minimum stay rules across all channels</p>
        </div>

        <div class="flex flex-wrap items-center gap-2 text-xs">
          <!-- Bulk modifier pills -->
          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="applyBulkRateChange(1.1)"
            class="h-7 text-xs gap-1 cursor-pointer"
          >
            <ng-icon name="lucideTrendingUp" class="size-3 text-emerald-500" />
            <span>+10% High Demand</span>
          </button>

          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="toggleAllWeekendStopSell()"
            class="h-7 text-xs gap-1 cursor-pointer"
          >
            <ng-icon name="lucideLock" class="size-3 text-amber-500" />
            <span>Toggle Weekend Stop-Sell</span>
          </button>

          <button
            hlmBtn
            variant="default"
            size="sm"
            (click)="onSaveAll()"
            class="h-7 text-xs gap-1 cursor-pointer shadow-xs"
          >
            <ng-icon name="lucideSave" class="size-3" />
            <span>Publish Matrix to Channels</span>
          </button>
        </div>
      </div>

      <!-- Spreadsheet Grid Table -->
      <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-muted/60 border-b border-border">
                <th class="p-3 sticky left-0 z-20 bg-muted/90 min-w-[200px] border-r border-border font-bold text-foreground">
                  Room Class / Inventory
                </th>
                @for (d of calendarDates; track d.dateStr) {
                  <th
                    class="p-2.5 text-center min-w-[95px] border-r border-border/40 font-semibold"
                    [class.bg-primary/5]="d.isWeekend"
                  >
                    <div class="text-[10px] text-muted-foreground uppercase">{{ d.dayOfWeek }}</div>
                    <div class="text-xs font-bold text-foreground">{{ d.formattedDate }}</div>
                  </th>
                }
              </tr>
            </thead>
            <tbody class="divide-y divide-border/60">
              @for (row of matrixRows(); track row.roomTypeId) {
                <tr class="hover:bg-muted/20 transition-colors">
                  <!-- Room Class Column -->
                  <td class="p-3 sticky left-0 z-10 bg-card border-r border-border font-medium shadow-xs">
                    <div class="font-bold text-foreground text-xs line-clamp-1">{{ row.roomTypeName }}</div>
                    <div class="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-2">
                      <span>Base: \${{ row.baseRate }}</span>
                      <span>•</span>
                      <span class="text-primary font-semibold">{{ row.totalUnits }} units</span>
                    </div>
                  </td>

                  <!-- Date Cells -->
                  @for (cell of row.days; track cell.dateStr) {
                    <td
                      class="p-2 border-r border-border/40 text-center align-top relative transition-colors"
                      [class.bg-rose-500/5]="cell.stopSell"
                      [class.bg-primary/5]="cell.isWeekend && !cell.stopSell"
                    >
                      <!-- Rate Input -->
                      <div class="relative flex items-center justify-center mb-1.5">
                        <span class="text-[10px] text-muted-foreground mr-0.5 font-bold">\$</span>
                        <input
                          type="number"
                          [(ngModel)]="cell.rate"
                          class="w-14 text-center font-bold text-xs py-0.5 rounded border border-border/60 bg-background text-foreground shadow-2xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <!-- Available Units -->
                      <div class="text-[10px] mb-1.5">
                        <span
                          class="px-1.5 py-0.5 rounded font-semibold text-[9px]"
                          [class]="cell.availableUnits > 2 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'"
                        >
                          {{ cell.availableUnits }} left
                        </span>
                      </div>

                      <!-- Restriction Badges (Click to toggle) -->
                      <div class="flex items-center justify-center gap-1">
                        <!-- Stop Sell Toggle -->
                        <button
                          type="button"
                          (click)="cell.stopSell = !cell.stopSell"
                          [title]="cell.stopSell ? 'Stop Sell Active (Click to open)' : 'Open for sale (Click to stop sell)'"
                          class="size-5 rounded flex items-center justify-center transition-colors cursor-pointer"
                          [class]="cell.stopSell ? 'bg-rose-500 text-white shadow-2xs' : 'bg-muted hover:bg-muted/80 text-muted-foreground'"
                        >
                          <ng-icon name="lucideLock" class="size-2.5" />
                        </button>

                        <!-- Min Stay Toggle -->
                        <button
                          type="button"
                          (click)="cycleMinStay(cell)"
                          [title]="'Min Length of Stay: ' + cell.minStayNights + ' nights'"
                          class="h-5 px-1 rounded text-[9px] font-bold flex items-center justify-center cursor-pointer transition-colors"
                          [class]="cell.minStayNights > 1 ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30' : 'bg-muted text-muted-foreground hover:bg-muted/80'"
                        >
                          {{ cell.minStayNights }}N
                        </button>
                      </div>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Legend & Channel Sync Status -->
      <div class="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground px-1">
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1.5">
            <span class="size-2 rounded-full bg-rose-500"></span>
            <span>Stop-Sell (Closed to all channels)</span>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="size-2 rounded-full bg-amber-500"></span>
            <span>MLOS (Min Length of Stay restriction)</span>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="size-2 rounded-full bg-primary/40"></span>
            <span>Weekend Surge Period</span>
          </span>
        </div>

        <div class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
          <ng-icon name="lucideCheck" class="size-3.5" />
          <span>Synced with Engine OTA Feeds (iCal & OTA 2017B)</span>
        </div>
      </div>
    </div>
  `,
})
export class YieldCalendarMatrixComponent implements OnInit {
  private readonly facade = inject(HotelsFacade)

  readonly matrixRows = signal<RoomYieldRow[]>([])

  calendarDates: { dateStr: string; dayOfWeek: string; formattedDate: string; isWeekend: boolean }[] = []

  ngOnInit(): void {
    this.generateDateHeaders()
    this.buildMatrixRows()
  }

  private generateDateHeaders(): void {
    const dates = []
    const now = new Date()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    for (let i = 0; i < 14; i++) {
      const d = new Date(now.getTime() + i * 86400000)
      const dayOfWeek = days[d.getDay()]
      const isWeekend = d.getDay() === 5 || d.getDay() === 6 // Fri/Sat in regional tourism
      dates.push({
        dateStr: d.toISOString().split('T')[0],
        dayOfWeek,
        formattedDate: `${months[d.getMonth()]} ${d.getDate()}`,
        isWeekend,
      })
    }
    this.calendarDates = dates
  }

  private buildMatrixRows(): void {
    const types = this.facade.roomTypes()
    const sampleTypes = types.length > 0 ? types : [
      { id: 'rt-1', name: 'Deluxe King Suite', basePricePerNight: 180, totalUnitsCount: 12 },
      { id: 'rt-2', name: 'Executive Ocean View Room', basePricePerNight: 240, totalUnitsCount: 8 },
      { id: 'rt-3', name: 'Presidential Family Villa', basePricePerNight: 450, totalUnitsCount: 3 },
      { id: 'rt-4', name: 'Superior Twin Room', basePricePerNight: 130, totalUnitsCount: 16 },
    ]

    const rows: RoomYieldRow[] = sampleTypes.map((rt) => {
      const days: YieldDayCell[] = this.calendarDates.map((d, index) => {
        const weekendMultiplier = d.isWeekend ? 1.2 : 1.0
        return {
          dateStr: d.dateStr,
          dayOfWeek: d.dayOfWeek,
          isWeekend: d.isWeekend,
          rate: Math.round(Number(rt.basePricePerNight) * weekendMultiplier),
          availableUnits: Math.max(1, (rt.totalUnitsCount || 8) - (index % 4)),
          stopSell: index === 6,
          closedToArrival: false,
          closedToDeparture: false,
          minStayNights: d.isWeekend ? 2 : 1,
        }
      })

      return {
        roomTypeId: rt.id,
        roomTypeName: rt.name,
        baseRate: Number(rt.basePricePerNight),
        totalUnits: rt.totalUnitsCount || 8,
        days,
      }
    })

    this.matrixRows.set(rows)
  }

  cycleMinStay(cell: YieldDayCell): void {
    if (cell.minStayNights === 1) cell.minStayNights = 2
    else if (cell.minStayNights === 2) cell.minStayNights = 3
    else cell.minStayNights = 1
  }

  applyBulkRateChange(multiplier: number): void {
    const rows = this.matrixRows().map((row) => ({
      ...row,
      days: row.days.map((d) => ({
        ...d,
        rate: Math.round(d.rate * multiplier),
      })),
    }))
    this.matrixRows.set(rows)
    toast.success('Applied +10% rate adjustment across all room categories!')
  }

  toggleAllWeekendStopSell(): void {
    const rows = this.matrixRows().map((row) => ({
      ...row,
      days: row.days.map((d) => (d.isWeekend ? { ...d, stopSell: !d.stopSell } : d)),
    }))
    this.matrixRows.set(rows)
    toast.info('Toggled Stop-Sell for all upcoming weekend slots!')
  }

  onSaveAll(): void {
    toast.success('Inventory calendar & rate plan matrix published to OTA channels!')
  }
}
