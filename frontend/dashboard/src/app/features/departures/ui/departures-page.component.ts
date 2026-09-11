import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideClock,
  lucidePlus,
  lucideCalendar,
  lucideUsers,
  lucideMapPin,
  lucideSearch,
  lucideAlertTriangle,
  lucideCheckCircle2,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'
import { toast } from 'ngx-sonner'
import { Departure } from '../data-access/models/departures.model'

@Component({
  selector: 'app-departures-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    TopNavComponent,
    SearchComponent,
    ThemeSwitchComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmBadgeImports,
    ...HlmButtonImports,
    ...HlmCardImports,
  ],
  providers: [
    provideIcons({
      lucideClock,
      lucidePlus,
      lucideCalendar,
      lucideUsers,
      lucideMapPin,
      lucideSearch,
      lucideAlertTriangle,
      lucideCheckCircle2,
    }),
  ],
  template: `
    <!-- Top Header -->
    <app-header [fixed]="true">
      <app-top-nav class="mr-auto" />
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main Content -->
    <app-main>
      <!-- Page Header -->
      <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight">Departures & Schedules</h1>
            <span hlmBadge variant="outline" class="text-xs">
              {{ departures().length }} Scheduled
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Manage seasonal dates, seat inventory caps, and certified tour guide assignments.
          </p>
        </div>

        <button
          hlmBtn
          variant="default"
          size="sm"
          class="gap-1.5 cursor-pointer h-9 shadow-xs"
          (click)="scheduleDeparture()"
        >
          <ng-icon name="lucidePlus" class="size-4" />
          <span>Add Departure</span>
        </button>
      </div>

      <!-- Quick Metrics -->
      <div class="grid gap-4 sm:grid-cols-3 mb-6">
        <div hlmCard class="p-4">
          <div class="text-xs text-muted-foreground font-semibold uppercase">Upcoming Next 14 Days</div>
          <div class="text-2xl font-bold text-foreground mt-1">42 Departures</div>
          <div class="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">94% seat fill rate</div>
        </div>

        <div hlmCard class="p-4">
          <div class="text-xs text-muted-foreground font-semibold uppercase">Unassigned Guides</div>
          <div class="text-2xl font-bold text-amber-500 mt-1">1 Tour</div>
          <div class="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">Swiss Alps (Sep 18)</div>
        </div>

        <div hlmCard class="p-4">
          <div class="text-xs text-muted-foreground font-semibold uppercase">Total Guaranteed Seats</div>
          <div class="text-2xl font-bold text-foreground mt-1">680 Seats</div>
          <div class="text-xs text-muted-foreground mt-1">Across all operating destinations</div>
        </div>
      </div>

      <!-- Departures Schedule List -->
      <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
              <tr>
                <th scope="col" class="py-3.5 px-4">Tour Experience</th>
                <th scope="col" class="py-3.5 px-4">Departure Dates</th>
                <th scope="col" class="py-3.5 px-4">Capacity & Booked</th>
                <th scope="col" class="py-3.5 px-4">Assigned Guide</th>
                <th scope="col" class="py-3.5 px-4">Status</th>
                <th scope="col" class="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border/30">
              @for (dep of departures(); track dep.id) {
                <tr class="hover:bg-muted/20 transition-colors">
                  <!-- Tour -->
                  <td class="py-3.5 px-4 max-w-xs">
                    <div class="font-semibold text-foreground text-sm truncate">
                      {{ dep.packageTitle }}
                    </div>
                    <div class="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <ng-icon name="lucideMapPin" class="size-3 text-primary" />
                      <span>{{ dep.destination }}</span>
                    </div>
                  </td>

                  <!-- Dates -->
                  <td class="py-3.5 px-4 text-xs font-medium text-foreground">
                    <div class="flex items-center gap-1.5">
                      <ng-icon name="lucideCalendar" class="size-3.5 text-muted-foreground" />
                      <span>{{ dep.startDate }} &rarr; {{ dep.endDate }}</span>
                    </div>
                  </td>

                  <!-- Capacity -->
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-2">
                      <div class="text-xs font-bold tabular-nums">
                        {{ dep.bookedCount }} / {{ dep.capacity }}
                      </div>
                      <span class="text-[10px] text-muted-foreground">({{ Math.round((dep.bookedCount / dep.capacity) * 100) }}%)</span>
                    </div>
                    <div class="h-1.5 w-24 bg-muted/50 rounded-full overflow-hidden mt-1">
                      <div
                        class="h-full bg-primary rounded-full"
                        [style.width.%]="(dep.bookedCount / dep.capacity) * 100"
                      ></div>
                    </div>
                  </td>

                  <!-- Guide -->
                  <td class="py-3.5 px-4 text-xs">
                    @if (dep.assignedGuideName) {
                      <span class="font-medium text-foreground">{{ dep.assignedGuideName }}</span>
                    } @else {
                      <span class="text-amber-500 font-semibold flex items-center gap-1">
                        <ng-icon name="lucideAlertTriangle" class="size-3.5" />
                        Unassigned
                      </span>
                    }
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4">
                    @if (dep.status === 'available') {
                      <span hlmBadge variant="default" class="text-[11px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        Available
                      </span>
                    } @else if (dep.status === 'limited') {
                      <span hlmBadge variant="outline" class="text-[11px] text-amber-600 dark:text-amber-400 border-amber-500/30">
                        Few Seats
                      </span>
                    } @else if (dep.status === 'sold_out') {
                      <span hlmBadge variant="secondary" class="text-[11px]">
                        Sold Out
                      </span>
                    }
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 text-right">
                    <button
                      hlmBtn
                      variant="outline"
                      size="sm"
                      class="text-xs h-8"
                      (click)="editDeparture(dep)"
                    >
                      Manage
                    </button>
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
export class DeparturesPageComponent {
  readonly Math = Math

  readonly departures = signal<Departure[]>([
    {
      id: 'dep-1',
      packageId: 'pkg-1',
      packageTitle: 'Swiss Alps Grand Panorama Express',
      destination: 'Switzerland',
      startDate: 'Sep 18, 2026',
      endDate: 'Sep 23, 2026',
      capacity: 16,
      bookedCount: 14,
      minParticipants: 4,
      assignedGuideName: undefined,
      status: 'limited',
      meetingPoint: 'Zurich Main Station Concourse',
    },
    {
      id: 'dep-2',
      packageId: 'pkg-2',
      packageTitle: 'Ubud Sacred Valley & Waterfalls',
      destination: 'Bali, Indonesia',
      startDate: 'Sep 15, 2026',
      endDate: 'Sep 18, 2026',
      capacity: 12,
      bookedCount: 12,
      minParticipants: 2,
      assignedGuideName: 'Wayan Sudarta',
      status: 'sold_out',
      meetingPoint: 'Ubud Palace Gates',
    },
    {
      id: 'dep-3',
      packageId: 'pkg-3',
      packageTitle: 'Serengeti Migration Luxury Safari',
      destination: 'Tanzania',
      startDate: 'Sep 24, 2026',
      endDate: 'Sep 30, 2026',
      capacity: 8,
      bookedCount: 6,
      minParticipants: 2,
      assignedGuideName: 'Juma Mwamba',
      status: 'available',
      meetingPoint: 'Arusha Safari Center',
    },
    {
      id: 'dep-4',
      packageId: 'pkg-4',
      packageTitle: 'Kyoto Ancient Temples & Tea Rituals',
      destination: 'Kyoto, Japan',
      startDate: 'Oct 02, 2026',
      endDate: 'Oct 06, 2026',
      capacity: 10,
      bookedCount: 8,
      minParticipants: 2,
      assignedGuideName: 'Kenji Sato',
      status: 'available',
      meetingPoint: 'Kyoto Station North Exit',
    },
    {
      id: 'dep-5',
      packageId: 'pkg-5',
      packageTitle: 'Santorini Sunset Sailing & Catamaran',
      destination: 'Santorini, Greece',
      startDate: 'Sep 12, 2026',
      endDate: 'Sep 12, 2026',
      capacity: 16,
      bookedCount: 16,
      minParticipants: 4,
      assignedGuideName: 'Nikos Katsaros',
      status: 'sold_out',
      meetingPoint: 'Amoudi Bay Dock',
    },
  ])

  scheduleDeparture(): void {
    toast.success('Departure Created', {
      description: 'New departure schedule opened for booking.',
    })
  }

  editDeparture(dep: Departure): void {
    toast.info('Departure Management', {
      description: `Editing departure for ${dep.packageTitle}.`,
    })
  }
}
