import { Component, signal, computed, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCalendar,
  lucideChevronLeft,
  lucideChevronRight,
  lucidePlus,
  lucideClock,
  lucideVideo,
  lucideUsers,
  lucideCheck,
  lucideMoreVertical,
  lucideTrash2,
  lucideRefreshCw,
  lucideMapPin,
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
import { HlmInputImports } from '../../ui/input/hlm-input.directive'
import { HlmSelectImports, SelectOption } from '../../ui/select/hlm-select.components'
import { HlmAvatarImports } from '../../ui/avatar/hlm-avatar.components'
import { getDisplayNameInitials } from '../../core/utils/initials'
import { toast } from 'ngx-sonner'
import { CalendarEvent, CalendarEventType, CalendarApiService } from './data-access'

@Component({
  selector: 'app-calendar',
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
    ...HlmInputImports,
    ...HlmSelectImports,
    ...HlmAvatarImports,
  ],
  providers: [
    provideIcons({
      lucideCalendar,
      lucideChevronLeft,
      lucideChevronRight,
      lucidePlus,
      lucideClock,
      lucideVideo,
      lucideUsers,
      lucideCheck,
      lucideMoreVertical,
      lucideTrash2,
      lucideRefreshCw,
      lucideMapPin,
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
      <!-- Title & Calendar Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Departures & Operations Calendar</h1>
          <p class="text-xs text-muted-foreground">Coordinate tour departures, guide briefings, fleet handovers, and guest arrivals.</p>
        </div>

        <div class="flex items-center gap-2">
          <!-- Month Navigation -->
          <div class="flex items-center gap-1 border border-border rounded-lg p-0.5 bg-background shadow-xs">
            <button
              hlmBtn
              variant="ghost"
              size="icon"
              (click)="prevMonth()"
              class="size-8 cursor-pointer"
              aria-label="Previous month"
            >
              <ng-icon name="lucideChevronLeft" class="size-4" />
            </button>
            <span class="text-xs font-semibold px-2">September 2026</span>
            <button
              hlmBtn
              variant="ghost"
              size="icon"
              (click)="nextMonth()"
              class="size-8 cursor-pointer"
              aria-label="Next month"
            >
              <ng-icon name="lucideChevronRight" class="size-4" />
            </button>
          </div>

          <button hlmBtn variant="outline" size="sm" (click)="loadEvents()" [disabled]="isLoading()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideRefreshCw" class="size-3.5 text-muted-foreground" [class.animate-spin]="isLoading()" />
            <span>Sync</span>
          </button>

          <button hlmBtn size="sm" (click)="openAddEvent()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Schedule Departure</span>
          </button>
        </div>
      </div>

      <!-- Main Calendar Grid & Mini Agenda Grid -->
      <div class="grid gap-6 lg:grid-cols-4">
        <!-- 3-Column Calendar Monthly Grid -->
        <div hlmCard class="lg:col-span-3 p-4 shadow-sm space-y-2">
          <!-- Days of Week Header -->
          <div class="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground pb-2 border-b border-border/60">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          <!-- Days Grid -->
          <div class="grid grid-cols-7 gap-1">
            @for (day of calendarDays(); track $index) {
              <div
                (click)="selectDay(day.day)"
                class="min-h-24 sm:min-h-28 p-1.5 rounded-lg border border-border/40 transition-colors flex flex-col justify-between cursor-pointer hover:bg-muted/30"
                [class.bg-muted/10]="!day.isCurrentMonth"
                [class.border-primary]="selectedDay() === day.day && day.isCurrentMonth"
                [class.bg-primary/5]="selectedDay() === day.day && day.isCurrentMonth"
              >
                <!-- Day Number -->
                <div class="flex items-center justify-between text-xs">
                  <span
                    class="font-semibold size-6 rounded-full flex items-center justify-center"
                    [class.text-muted-foreground]="!day.isCurrentMonth"
                    [class.bg-primary]="day.day === 15 && day.isCurrentMonth"
                    [class.text-primary-foreground]="day.day === 15 && day.isCurrentMonth"
                  >
                    {{ day.day }}
                  </span>
                </div>

                <!-- Event Chips in Day Cell -->
                <div class="space-y-1 mt-1 overflow-hidden">
                  @for (evt of getEventsForDay(day.day, day.isCurrentMonth); track evt.id) {
                    <div
                      class="text-[10px] font-semibold px-1.5 py-0.5 rounded truncate shadow-2xs"
                      [ngClass]="getEventChipStyle(evt.type)"
                      [title]="evt.title + ' (' + evt.time + ')'"
                    >
                      {{ evt.time }} {{ evt.title }}
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Right Side: Today's Agenda Sidebar -->
        <div hlmCard class="p-4 space-y-4 shadow-sm justify-between">
          <div>
            <div class="flex items-center justify-between pb-3 border-b border-border">
              <h3 class="text-sm font-bold text-foreground">Schedule for Day {{ selectedDay() }}</h3>
              <span hlmBadge variant="secondary" class="text-[10px]">
                {{ getEventsForDay(selectedDay(), true).length }} events
              </span>
            </div>

            <div class="space-y-3 mt-3">
              @if (getEventsForDay(selectedDay(), true).length === 0) {
                <div class="py-8 text-center text-xs text-muted-foreground">
                  No scheduled departures or meetings for this date.
                </div>
              }

              @for (evt of getEventsForDay(selectedDay(), true); track evt.id) {
                <div class="p-3 rounded-xl border border-border bg-muted/20 space-y-2">
                  <div class="flex items-start justify-between gap-1">
                    <h4 class="text-xs font-bold text-foreground leading-snug">{{ evt.title }}</h4>
                    <span hlmBadge variant="outline" class="text-[9px] uppercase font-bold capitalize">
                      {{ evt.type }}
                    </span>
                  </div>

                  <div class="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <ng-icon name="lucideClock" class="size-3.5" />
                    <span>{{ evt.time }}</span>
                  </div>

                  @if (evt.location) {
                    <div class="flex items-center gap-1.5 text-xs text-primary font-medium">
                      <ng-icon name="lucideMapPin" class="size-3.5" />
                      <span class="truncate">{{ evt.location }}</span>
                    </div>
                  }

                  <div class="flex items-center justify-between pt-1 border-t border-border/40 text-[11px] text-muted-foreground">
                    <div class="flex -space-x-1.5">
                      @for (att of evt.attendees; track att.name) {
                        <hlm-avatar class="size-5 ring-1 ring-background shadow-2xs">
                          <img hlmAvatarImage [src]="att.avatar || ''" [alt]="att.name" />
                          <span hlmAvatarFallback class="text-[8px]">{{ initials(att.name) }}</span>
                        </hlm-avatar>
                      }
                    </div>

                    <button
                      hlmBtn
                      variant="ghost"
                      size="icon"
                      (click)="deleteEvent(evt.id)"
                      class="size-6 text-muted-foreground hover:text-destructive cursor-pointer"
                      aria-label="Delete event"
                    >
                      <ng-icon name="lucideTrash2" class="size-3" />
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>

          <button hlmBtn variant="outline" size="sm" (click)="openAddEvent()" class="w-full text-xs gap-1.5 cursor-pointer">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Schedule on day {{ selectedDay() }}</span>
          </button>
        </div>
      </div>
    </app-main>

    <!-- Schedule Event Side Sheet -->
    <hlm-sheet [isOpen]="addSheetOpen()" position="right" [size]="'sm'" (closed)="addSheetOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Schedule Departure / Operation</h3>
        <p hlmSheetDescription>Book a tour departure, guide briefing, or equipment transfer.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Event / Tour Title</label>
          <input hlmInput [(ngModel)]="newTitle" placeholder="e.g. Swiss Alps Panoramic Rail Departure" />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Operational Category</label>
          <hlm-custom-select
            [options]="typeOptions"
            [(ngModel)]="newType"
            placeholder="Select category"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Day of Month</label>
            <input hlmInput type="number" [(ngModel)]="newDay" min="1" max="31" />
          </div>

          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Departure / Meeting Time</label>
            <input hlmInput [(ngModel)]="newTime" placeholder="09:00 AM" />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Meeting Point / Station</label>
          <input hlmInput [(ngModel)]="newLocation" placeholder="e.g. Zurich Airport Terminal 1, Gate B" />
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto">
        <button hlmBtn variant="outline" (click)="addSheetOpen.set(false)" class="cursor-pointer">Cancel</button>
        <button hlmBtn [disabled]="!newTitle.trim()" (click)="saveEvent()" class="cursor-pointer">Create Event</button>
      </div>
    </hlm-sheet>
  `,
})
export class CalendarComponent implements OnInit {
  private readonly calendarApi = inject(CalendarApiService)

  readonly selectedDay = signal<number>(15)
  readonly addSheetOpen = signal<boolean>(false)
  readonly isLoading = signal<boolean>(false)

  newTitle = ''
  newType: CalendarEventType = 'departure'
  newDay = 15
  newTime = '09:00 AM'
  newLocation = 'Main Terminal Desk'

  readonly typeOptions: SelectOption[] = [
    { label: 'Tour Departure', value: 'departure' },
    { label: 'Operational Review', value: 'review' },
    { label: 'Experience Demo / Tasting', value: 'demo' },
    { label: 'Guide & Crew Briefing', value: 'meeting' },
    { label: 'Season / Route Launch', value: 'launch' },
  ]

  readonly events = signal<CalendarEvent[]>([])

  ngOnInit(): void {
    this.loadEvents()
  }

  async loadEvents(): Promise<void> {
    this.isLoading.set(true)
    try {
      const data = await this.calendarApi.loadEvents()
      this.events.set(data)
    } catch {
      toast.error('Could not sync departures; loaded cached events.')
    } finally {
      this.isLoading.set(false)
    }
  }

  calendarDays(): { day: number; isCurrentMonth: boolean }[] {
    const days = []
    for (let i = 30; i <= 31; i++) days.push({ day: i, isCurrentMonth: false })
    for (let i = 1; i <= 30; i++) days.push({ day: i, isCurrentMonth: true })
    for (let i = 1; i <= 10; i++) days.push({ day: i, isCurrentMonth: false })
    return days
  }

  getEventsForDay(day: number, isCurrentMonth: boolean): CalendarEvent[] {
    if (!isCurrentMonth) return []
    return this.events().filter((e) => e.date === day)
  }

  getEventChipStyle(type: string): string {
    switch (type) {
      case 'departure': return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900'
      case 'launch': return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
      case 'demo': return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900'
      case 'review': return 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-900'
      default: return 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-900'
    }
  }

  selectDay(day: number): void {
    this.selectedDay.set(day)
    this.newDay = day
  }

  openAddEvent(): void {
    this.newTitle = ''
    this.newDay = this.selectedDay()
    this.addSheetOpen.set(true)
  }

  async saveEvent(): Promise<void> {
    if (!this.newTitle.trim()) return

    try {
      const created = await this.calendarApi.createEvent({
        title: this.newTitle,
        date: Number(this.newDay),
        time: this.newTime,
        type: this.newType,
        location: this.newLocation,
      })

      this.events.update((list) => [...list, created])
      this.addSheetOpen.set(false)
      toast.success(`Scheduled departure "${created.title}"!`)
    } catch {
      toast.error('Failed to schedule event.')
    }
  }

  async deleteEvent(id: string): Promise<void> {
    await this.calendarApi.deleteEvent(id)
    this.events.update((list) => list.filter((e) => e.id !== id))
    toast.success('Event removed from schedule.')
  }

  prevMonth(): void {
    toast.info('Viewing August 2026')
  }

  nextMonth(): void {
    toast.info('Viewing October 2026')
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
