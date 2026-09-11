import { Component, signal, computed } from '@angular/core'
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

export interface CalendarEvent {
  id: string
  title: string
  date: number // day of current month (1..31)
  time: string
  type: 'meeting' | 'launch' | 'demo' | 'review'
  attendees: { name: string; avatar?: string }[]
  location?: string
}

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
          <h1 class="text-2xl font-bold tracking-tight">Calendar & Schedule</h1>
          <p class="text-xs text-muted-foreground">Manage organization events, sprint meetings, and client demos.</p>
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
            <span class="text-xs font-semibold px-2">August 2026</span>
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

          <button hlmBtn size="sm" (click)="openAddEvent()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Schedule Event</span>
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
                    [class.bg-primary]="day.day === 6 && day.isCurrentMonth"
                    [class.text-primary-foreground]="day.day === 6 && day.isCurrentMonth"
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
              <h3 class="text-sm font-bold text-foreground">Agenda for Day {{ selectedDay() }}</h3>
              <span hlmBadge variant="secondary" class="text-[10px]">
                {{ getEventsForDay(selectedDay(), true).length }} events
              </span>
            </div>

            <div class="space-y-3 mt-3">
              @if (getEventsForDay(selectedDay(), true).length === 0) {
                <div class="py-8 text-center text-xs text-muted-foreground">
                  No scheduled events for this date.
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
                      <ng-icon name="lucideVideo" class="size-3.5" />
                      <span>{{ evt.location }}</span>
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
            <span>Schedule on this day</span>
          </button>
        </div>
      </div>
    </app-main>

    <!-- Schedule Event Side Sheet (size="sm") -->
    <hlm-sheet [isOpen]="addSheetOpen()" position="right" [size]="'sm'" (closed)="addSheetOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Schedule Event</h3>
        <p hlmSheetDescription>Book a meeting, client presentation, or team demo.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Event Title</label>
          <input hlmInput [(ngModel)]="newTitle" placeholder="e.g. Q3 Roadmap Review" />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Event Category</label>
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
            <label class="font-semibold text-foreground">Time Slot</label>
            <input hlmInput [(ngModel)]="newTime" placeholder="10:00 AM" />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Meeting Link / Location</label>
          <input hlmInput [(ngModel)]="newLocation" placeholder="https://meet.google.com/xyz-abc" />
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto">
        <button hlmBtn variant="outline" (click)="addSheetOpen.set(false)" class="cursor-pointer">Cancel</button>
        <button hlmBtn [disabled]="!newTitle.trim()" (click)="saveEvent()" class="cursor-pointer">Create Event</button>
      </div>
    </hlm-sheet>
  `,
})
export class CalendarComponent {
  readonly selectedDay = signal<number>(6)
  readonly addSheetOpen = signal<boolean>(false)

  newTitle = ''
  newType: any = 'meeting'
  newDay = 6
  newTime = '10:00 AM'
  newLocation = 'Google Meet'

  readonly typeOptions: SelectOption[] = [
    { label: 'Team Meeting', value: 'meeting' },
    { label: 'Product Launch', value: 'launch' },
    { label: 'Client Demo', value: 'demo' },
    { label: 'Sprint Review', value: 'review' },
  ]

  readonly events = signal<CalendarEvent[]>([
    {
      id: 'e1',
      title: 'Daily Standup & Sprint Sync',
      date: 6,
      time: '09:30 AM',
      type: 'meeting',
      attendees: [
        { name: 'Sat Naing', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
        { name: 'Sarah Miller', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      ],
      location: 'meet.google.com/sync-team',
    },
    {
      id: 'e2',
      title: 'Spartan UI v2 Design Review',
      date: 6,
      time: '02:00 PM',
      type: 'review',
      attendees: [
        { name: 'Alex John', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      ],
      location: 'zoom.us/j/889214',
    },
    {
      id: 'e3',
      title: 'Enterprise Client Architecture Demo',
      date: 12,
      time: '11:00 AM',
      type: 'demo',
      attendees: [
        { name: 'Olivia Martin', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80' },
      ],
      location: 'meet.google.com/demo-enterprise',
    },
    {
      id: 'e4',
      title: 'Production v2.4 Release Deployment',
      date: 20,
      time: '04:30 PM',
      type: 'launch',
      attendees: [
        { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
      ],
    },
  ])

  calendarDays(): { day: number; isCurrentMonth: boolean }[] {
    const days = []
    for (let i = 27; i <= 31; i++) days.push({ day: i, isCurrentMonth: false })
    for (let i = 1; i <= 31; i++) days.push({ day: i, isCurrentMonth: true })
    for (let i = 1; i <= 6; i++) days.push({ day: i, isCurrentMonth: false })
    return days
  }

  getEventsForDay(day: number, isCurrentMonth: boolean): CalendarEvent[] {
    if (!isCurrentMonth) return []
    return this.events().filter((e) => e.date === day)
  }

  getEventChipStyle(type: string): string {
    switch (type) {
      case 'launch': return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
      case 'demo': return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900'
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
    this.addSheetOpen.set(true)
  }

  saveEvent(): void {
    if (!this.newTitle.trim()) return
    const newEvt: CalendarEvent = {
      id: 'evt-' + Date.now(),
      title: this.newTitle,
      date: Number(this.newDay),
      time: this.newTime,
      type: this.newType,
      attendees: [{ name: 'Sat Naing' }],
      location: this.newLocation,
    }

    this.events.update((list) => [...list, newEvt])
    this.addSheetOpen.set(false)
    toast.success(`Event "${newEvt.title}" scheduled!`)
  }

  deleteEvent(id: string): void {
    this.events.update((list) => list.filter((e) => e.id !== id))
    toast.success('Event deleted from schedule.')
  }

  prevMonth(): void {
    toast.info('Viewing July 2026')
  }

  nextMonth(): void {
    toast.info('Viewing September 2026')
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
