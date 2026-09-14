import { Component, OnInit, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideBuilding2,
  lucideBedDouble,
  lucideCalendar,
  lucideUserCheck,
  lucideSparkles,
  lucideCheckCircle2,
  lucideQrCode,
  lucideReceipt,
  lucideWrench,
  lucideAlertCircle,
  lucideTrendingUp,
  lucidePlus,
  lucideSearch,
  lucideFilter,
  lucideClock,
  lucideUsers,
  lucideDollarSign,
  lucideX,
  lucideStar,
  lucideMapPin,
  lucidePhone,
  lucideMail,
} from '@ng-icons/lucide'
import { HotelsFacade } from '../data-access/hotels.facade'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmSheetImports } from '../../../ui/sheet/hlm-sheet.components'
import { HlmDialogImports } from '../../../ui/dialog/hlm-dialog.components'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { toast } from 'ngx-sonner'
import { HotelBooking, HotelProperty, RoomUnit } from '../data-access/models/hotel.model'

@Component({
  selector: 'app-hotels-page',
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
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucideBuilding2,
      lucideBedDouble,
      lucideCalendar,
      lucideUserCheck,
      lucideSparkles,
      lucideCheckCircle2,
      lucideQrCode,
      lucideReceipt,
      lucideWrench,
      lucideAlertCircle,
      lucideTrendingUp,
      lucidePlus,
      lucideSearch,
      lucideFilter,
      lucideClock,
      lucideUsers,
      lucideDollarSign,
      lucideX,
      lucideStar,
      lucideMapPin,
      lucidePhone,
      lucideMail,
    }),
  ],
  template: `
    <app-header>
      <app-top-nav>
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hospitality</span>
          <span class="text-muted-foreground/40">/</span>
          <span class="text-xs font-semibold text-foreground">Property Management System</span>
        </div>
      </app-top-nav>
      <div class="ml-auto flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <app-main>
      <div class="space-y-6 pb-12">
        <!-- Top Banner / Title Row -->
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Hotel & Accommodation PMS</h1>
              <span class="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500 border border-emerald-500/20">OTA 2017B Standard</span>
            </div>
            <p class="text-sm text-muted-foreground mt-1">
              Multi-property operations, front-desk arrival queues, room rack management, folio incidentals & dynamic yield control.
            </p>
          </div>

          <!-- Controls: Property Switcher + Action -->
          <div class="flex items-center gap-3">
            <select
              [ngModel]="facade.selectedPropertyId()"
              (ngModelChange)="onSelectProperty($event)"
              class="h-10 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary"
            >
              @for (prop of facade.properties(); track prop.id) {
                <option [value]="prop.id">{{ prop.name }} ({{ prop.city }})</option>
              }
            </select>

            <button
              hlmBtn
              variant="default"
              class="flex items-center gap-1.5 shadow-sm"
              (click)="openPropertyDrawer()"
            >
              <ng-icon name="lucidePlus" class="text-base" />
              <span>Register Property</span>
            </button>
          </div>
        </div>

        <!-- KPI Quick Metric Bar -->
        @if (facade.analytics(); as a) {
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">Occupancy</span>
                <ng-icon name="lucideBedDouble" class="text-primary text-base" />
              </div>
              <div class="mt-1 flex items-baseline gap-1.5">
                <span class="text-xl font-bold text-foreground">{{ a.occupancyRatePercent }}%</span>
                <span class="text-[11px] font-semibold text-emerald-500">+{{ a.occupancyRateChangePercent }}%</span>
              </div>
            </div>

            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">ADR</span>
                <ng-icon name="lucideDollarSign" class="text-blue-500 text-base" />
              </div>
              <div class="mt-1 flex items-baseline gap-1.5">
                <span class="text-xl font-bold text-foreground">\${{ a.adr }}</span>
                <span class="text-[11px] font-semibold text-emerald-500">+{{ a.adrChangePercent }}%</span>
              </div>
            </div>

            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">RevPAR</span>
                <ng-icon name="lucideTrendingUp" class="text-indigo-500 text-base" />
              </div>
              <div class="mt-1 flex items-baseline gap-1.5">
                <span class="text-xl font-bold text-foreground">\${{ a.revPar }}</span>
                <span class="text-[11px] font-semibold text-emerald-500">+{{ a.revParChangePercent }}%</span>
              </div>
            </div>

            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">Today Arrivals</span>
                <ng-icon name="lucideClock" class="text-amber-500 text-base" />
              </div>
              <div class="mt-1">
                <span class="text-xl font-bold text-foreground">{{ facade.expectedArrivalsToday().length }}</span>
                <span class="text-xs text-muted-foreground ml-1">guests</span>
              </div>
            </div>

            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">In-House</span>
                <ng-icon name="lucideUsers" class="text-purple-500 text-base" />
              </div>
              <div class="mt-1">
                <span class="text-xl font-bold text-foreground">{{ facade.inHouseGuests().length }}</span>
                <span class="text-xs text-muted-foreground ml-1">rooms</span>
              </div>
            </div>

            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">Housekeeping</span>
                <ng-icon name="lucideSparkles" class="text-rose-500 text-base" />
              </div>
              <div class="mt-1 flex items-baseline gap-2">
                <span class="text-sm font-bold text-rose-500">{{ facade.dirtyRooms().length }} Dirty</span>
                <span class="text-xs text-muted-foreground">/ {{ facade.cleanRooms().length }} Clean</span>
              </div>
            </div>
          </div>
        }

        <!-- Navigation Tabs -->
        <div class="flex overflow-x-auto border-b border-border no-scrollbar gap-2">
          <button
            (click)="activeTab.set('front-desk')"
            [class]="activeTab() === 'front-desk' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucideUserCheck" class="text-base" />
            <span>Front Desk Console</span>
            <span class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{{ facade.expectedArrivalsToday().length }}</span>
          </button>

          <button
            (click)="activeTab.set('housekeeping')"
            [class]="activeTab() === 'housekeeping' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucideSparkles" class="text-base" />
            <span>Housekeeping Board</span>
            @if (facade.dirtyRooms().length > 0) {
              <span class="rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-bold text-rose-500">{{ facade.dirtyRooms().length }}</span>
            }
          </button>

          <button
            (click)="activeTab.set('properties')"
            [class]="activeTab() === 'properties' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucideBuilding2" class="text-base" />
            <span>Properties & Units</span>
          </button>

          <button
            (click)="activeTab.set('rates')"
            [class]="activeTab() === 'rates' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucideDollarSign" class="text-base" />
            <span>Rate Plans & Yield</span>
          </button>

          <button
            (click)="activeTab.set('calendar')"
            [class]="activeTab() === 'calendar' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucideCalendar" class="text-base" />
            <span>Availability Calendar</span>
          </button>

          <button
            (click)="activeTab.set('analytics')"
            [class]="activeTab() === 'analytics' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucideTrendingUp" class="text-base" />
            <span>RevPAR Analytics</span>
          </button>
        </div>

        <!-- ========================================================================================= -->
        <!-- TAB 1: FRONT DESK LIVE OPERATIONS CONSOLE -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'front-desk') {
          <div class="space-y-6 animate-in fade-in-50 duration-200">
            <!-- Sub-Header: Queues Summary -->
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <!-- Expected Arrivals Card -->
              <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                <div class="bg-amber-500/10 px-4 py-3 border-b border-amber-500/20 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <h3 class="text-sm font-semibold text-foreground">Expected Arrivals Today</h3>
                  </div>
                  <span class="rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-500">{{ facade.expectedArrivalsToday().length }}</span>
                </div>
                <div class="divide-y divide-border/60 max-h-[360px] overflow-y-auto">
                  @for (bk of facade.expectedArrivalsToday(); track bk.id) {
                    <div class="p-3.5 hover:bg-muted/40 transition-colors flex flex-col gap-2">
                      <div class="flex items-start justify-between">
                        <div>
                          <div class="font-semibold text-sm text-foreground">{{ bk.contactName }}</div>
                          <div class="text-xs text-muted-foreground font-mono">{{ bk.bookingReference }} · {{ bk.roomTypeName }}</div>
                        </div>
                        <span class="rounded bg-muted px-2 py-0.5 text-xs font-medium font-mono text-muted-foreground">{{ bk.estimatedArrivalTime || '14:00' }}</span>
                      </div>
                      <div class="flex items-center justify-between pt-1">
                        <div class="flex items-center gap-2 text-xs">
                          @if (bk.assignedRoomNumber) {
                            <span class="font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Room {{ bk.assignedRoomNumber }}</span>
                          } @else {
                            <span class="font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Unassigned</span>
                          }
                          <span class="text-muted-foreground font-bold">\${{ bk.totalAmount }}</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                          @if (!bk.assignedRoomNumber) {
                            <button
                              class="px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80 text-foreground font-medium"
                              (click)="openAssignRoomModal(bk)"
                            >
                              Assign Room
                            </button>
                          }
                          <button
                            class="px-2.5 py-1 text-xs rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1 shadow-xs"
                            (click)="executeCheckIn(bk)"
                          >
                            <ng-icon name="lucideQrCode" class="text-xs" />
                            <span>Check In</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  } @empty {
                    <div class="p-8 text-center text-xs text-muted-foreground">No pending arrivals today.</div>
                  }
                </div>
              </div>

              <!-- In-House Guests Card -->
              <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                <div class="bg-blue-500/10 px-4 py-3 border-b border-blue-500/20 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                    <h3 class="text-sm font-semibold text-foreground">In-House Guests (Folio Active)</h3>
                  </div>
                  <span class="rounded-md bg-blue-500/20 px-2 py-0.5 text-xs font-bold text-blue-500">{{ facade.inHouseGuests().length }}</span>
                </div>
                <div class="divide-y divide-border/60 max-h-[360px] overflow-y-auto">
                  @for (bk of facade.inHouseGuests(); track bk.id) {
                    <div class="p-3.5 hover:bg-muted/40 transition-colors flex flex-col gap-2">
                      <div class="flex items-start justify-between">
                        <div>
                          <div class="font-semibold text-sm text-foreground flex items-center gap-1.5">
                            <span>Room {{ bk.assignedRoomNumber }}</span>
                            <span class="text-muted-foreground font-normal">· {{ bk.contactName }}</span>
                          </div>
                          <div class="text-xs text-muted-foreground font-mono">Check out: {{ bk.checkOutDate }}</div>
                        </div>
                        <span class="rounded bg-emerald-500/10 text-emerald-500 px-2 py-0.5 text-[11px] font-semibold border border-emerald-500/20">Checked In</span>
                      </div>
                      <div class="flex items-center justify-between pt-1">
                        <div class="text-xs text-muted-foreground">
                          Folio Total: <strong class="text-foreground">\${{ bk.totalAmount }}</strong>
                          @if (bk.incidentalChargesAmount > 0) {
                            <span class="text-blue-500 ml-1">(+\${{ bk.incidentalChargesAmount }} extras)</span>
                          }
                        </div>
                        <div class="flex items-center gap-1.5">
                          <button
                            class="px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80 text-foreground font-medium flex items-center gap-1"
                            (click)="openGuestFolio(bk)"
                          >
                            <ng-icon name="lucideReceipt" class="text-xs" />
                            <span>Folio</span>
                          </button>
                          <button
                            class="px-2 py-1 text-xs rounded bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-xs"
                            (click)="executeCheckOut(bk)"
                          >
                            Check Out
                          </button>
                        </div>
                      </div>
                    </div>
                  } @empty {
                    <div class="p-8 text-center text-xs text-muted-foreground">No in-house guests at this moment.</div>
                  }
                </div>
              </div>

              <!-- Scheduled Departures Card -->
              <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                <div class="bg-purple-500/10 px-4 py-3 border-b border-purple-500/20 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-purple-500"></span>
                    <h3 class="text-sm font-semibold text-foreground">Departures & Settlement</h3>
                  </div>
                  <span class="rounded-md bg-purple-500/20 px-2 py-0.5 text-xs font-bold text-purple-500">{{ facade.scheduledDeparturesToday().length }}</span>
                </div>
                <div class="divide-y divide-border/60 max-h-[360px] overflow-y-auto">
                  @for (bk of facade.scheduledDeparturesToday(); track bk.id) {
                    <div class="p-3.5 hover:bg-muted/40 transition-colors flex flex-col gap-2">
                      <div class="flex items-start justify-between">
                        <div>
                          <div class="font-semibold text-sm text-foreground">Room {{ bk.assignedRoomNumber }} · {{ bk.contactName }}</div>
                          <div class="text-xs text-muted-foreground">{{ bk.totalNights }} nights · Balance Due: <strong class="text-emerald-500">\$0.00 (Settled)</strong></div>
                        </div>
                        <button
                          class="px-2.5 py-1 text-xs rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-xs"
                          (click)="executeCheckOut(bk)"
                        >
                          Express Checkout
                        </button>
                      </div>
                    </div>
                  } @empty {
                    <div class="p-8 text-center text-xs text-muted-foreground">No departures scheduled today.</div>
                  }
                </div>
              </div>
            </div>

            <!-- Master Front Desk Reservations Table -->
            <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
              <div class="px-5 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-foreground">All Reservations Pipeline</h3>
                  <p class="text-xs text-muted-foreground">Confirmed and active bookings for the selected property</p>
                </div>
                <div class="flex items-center gap-2">
                  <div class="relative">
                    <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 text-muted-foreground text-xs" />
                    <input
                      type="text"
                      placeholder="Search guest or ref..."
                      [(ngModel)]="searchQuery"
                      class="h-9 w-60 rounded-md border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead class="bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                    <tr>
                      <th class="px-4 py-3">Reference</th>
                      <th class="px-4 py-3">Guest</th>
                      <th class="px-4 py-3">Room Type</th>
                      <th class="px-4 py-3">Dates</th>
                      <th class="px-4 py-3">Room Unit</th>
                      <th class="px-4 py-3">Total</th>
                      <th class="px-4 py-3">Status</th>
                      <th class="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border/60">
                    @for (bk of filteredBookings(); track bk.id) {
                      <tr class="hover:bg-muted/30 transition-colors">
                        <td class="px-4 py-3.5 font-mono text-xs font-semibold text-primary">{{ bk.bookingReference }}</td>
                        <td class="px-4 py-3.5">
                          <div class="font-medium text-foreground">{{ bk.contactName }}</div>
                          <div class="text-xs text-muted-foreground">{{ bk.contactEmail }}</div>
                        </td>
                        <td class="px-4 py-3.5 text-xs text-muted-foreground">{{ bk.roomTypeName }}</td>
                        <td class="px-4 py-3.5 text-xs">
                          <div>{{ bk.checkInDate }} → {{ bk.checkOutDate }}</div>
                          <div class="text-[11px] text-muted-foreground">({{ bk.totalNights }} nights)</div>
                        </td>
                        <td class="px-4 py-3.5">
                          @if (bk.assignedRoomNumber) {
                            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                              Room {{ bk.assignedRoomNumber }}
                            </span>
                          } @else {
                            <button
                              class="text-xs text-amber-500 hover:underline font-medium"
                              (click)="openAssignRoomModal(bk)"
                            >
                              + Assign Room
                            </button>
                          }
                        </td>
                        <td class="px-4 py-3.5 font-mono text-xs font-bold text-foreground">\${{ bk.totalAmount }}</td>
                        <td class="px-4 py-3.5">
                          <span
                            [class]="
                              bk.bookingStatus === 'checked_in'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : bk.bookingStatus === 'checked_out'
                                ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                                : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            "
                            class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold border"
                          >
                            {{ bk.bookingStatus }}
                          </span>
                        </td>
                        <td class="px-4 py-3.5 text-right">
                          <div class="flex items-center justify-end gap-1.5">
                            @if (bk.bookingStatus === 'confirmed') {
                              <button
                                hlmBtn
                                variant="outline"
                                size="sm"
                                class="h-7 px-2 text-xs text-emerald-500 border-emerald-500/30"
                                (click)="executeCheckIn(bk)"
                              >
                                Check In
                              </button>
                            }
                            @if (bk.bookingStatus === 'checked_in') {
                              <button
                                hlmBtn
                                variant="outline"
                                size="sm"
                                class="h-7 px-2 text-xs"
                                (click)="openGuestFolio(bk)"
                              >
                                Folio (\${{ bk.folioCharges?.length || 0 }})
                              </button>
                            }
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }

        <!-- ========================================================================================= -->
        <!-- TAB 2: HOUSEKEEPING MOBILE-FIRST ROOM STATUS RACK -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'housekeeping') {
          <div class="space-y-6 animate-in fade-in-50 duration-200">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-muted/40 p-4 border border-border">
              <div>
                <h3 class="font-bold text-base text-foreground flex items-center gap-2">
                  <ng-icon name="lucideSparkles" class="text-rose-500" />
                  <span>Real-Time Housekeeping Room Rack Board</span>
                </h3>
                <p class="text-xs text-muted-foreground mt-0.5">
                  Live status of all room units across floors. Housekeeping supervisors can update cleaning stages and log maintenance tickets.
                </p>
              </div>

              <div class="flex items-center gap-2">
                <button
                  hlmBtn
                  variant="outline"
                  size="sm"
                  class="flex items-center gap-1 text-xs"
                  (click)="openMaintenanceModal()"
                >
                  <ng-icon name="lucideWrench" class="text-amber-500" />
                  <span>Log Maintenance Issue</span>
                </button>
              </div>
            </div>

            <!-- Room Units Grid by Status -->
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              @for (unit of facade.roomUnits(); track unit.id) {
                <div
                  [class]="
                    unit.physicalStatus === 'dirty'
                      ? 'border-rose-500/40 bg-rose-500/5 hover:border-rose-500'
                      : unit.physicalStatus === 'cleaning_in_progress'
                      ? 'border-amber-500/40 bg-amber-500/5 hover:border-amber-500'
                      : unit.physicalStatus === 'inspected'
                      ? 'border-blue-500/40 bg-blue-500/5 hover:border-blue-500'
                      : unit.physicalStatus === 'clean'
                      ? 'border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500'
                      : 'border-muted-foreground/30 bg-muted/30'
                  "
                  class="rounded-xl border p-3 flex flex-col justify-between shadow-xs transition-all hover:scale-[1.02]"
                >
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="text-lg font-black text-foreground">{{ unit.roomNumber }}</span>
                      <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Fl. {{ unit.floorNumber }}</span>
                    </div>
                    <div class="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{{ unit.roomTypeName }}</div>
                  </div>

                  <div class="mt-3 pt-2 border-t border-border/40">
                    <div class="flex items-center justify-between text-[11px] font-semibold mb-2">
                      <span
                        [class]="
                          unit.physicalStatus === 'dirty'
                            ? 'text-rose-500'
                            : unit.physicalStatus === 'cleaning_in_progress'
                            ? 'text-amber-500'
                            : unit.physicalStatus === 'inspected'
                            ? 'text-blue-500'
                            : unit.physicalStatus === 'clean'
                            ? 'text-emerald-500'
                            : 'text-muted-foreground'
                        "
                        class="uppercase"
                      >
                        {{ unit.physicalStatus.replace('_', ' ') }}
                      </span>
                      @if (unit.currentOccupancyStatus === 'occupied') {
                        <span class="text-purple-500">Occupied</span>
                      } @else {
                        <span class="text-muted-foreground">Vacant</span>
                      }
                    </div>

                    <!-- Status Quick-Change Actions -->
                    <div class="grid grid-cols-2 gap-1">
                      <button
                        (click)="setRoomCleanStatus(unit, 'cleaning_in_progress')"
                        class="text-[10px] py-1 font-medium rounded bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white transition-colors"
                      >
                        Cleaning
                      </button>
                      <button
                        (click)="setRoomCleanStatus(unit, 'clean')"
                        class="text-[10px] py-1 font-medium rounded bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                      >
                        Clean
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Maintenance Tickets Section -->
            <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden mt-8">
              <div class="px-5 py-4 border-b border-border flex items-center justify-between bg-muted/20">
                <div>
                  <h3 class="font-bold text-foreground flex items-center gap-2">
                    <ng-icon name="lucideWrench" class="text-amber-500" />
                    <span>Active Room Maintenance Tickets</span>
                  </h3>
                  <p class="text-xs text-muted-foreground">Work orders reported by housekeeping or guests</p>
                </div>
              </div>

              <div class="divide-y divide-border/60">
                @for (ticket of facade.maintenanceTickets(); track ticket.id) {
                  <div class="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-muted/20">
                    <div class="flex items-start gap-3">
                      <span class="rounded-lg bg-amber-500/10 p-2 text-amber-500 border border-amber-500/20">
                        <ng-icon name="lucideAlertCircle" class="text-lg" />
                      </span>
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-bold text-sm text-foreground">Room {{ ticket.roomNumber }}</span>
                          <span class="rounded bg-muted px-2 py-0.5 text-xs font-semibold uppercase text-muted-foreground">{{ ticket.issueCategory }}</span>
                          <span
                            [class]="ticket.priority === 'urgent' ? 'text-rose-500 bg-rose-500/10' : 'text-amber-500 bg-amber-500/10'"
                            class="rounded px-2 py-0.5 text-xs font-bold uppercase"
                          >
                            {{ ticket.priority }} Priority
                          </span>
                        </div>
                        <p class="text-xs text-muted-foreground mt-1">{{ ticket.description }}</p>
                      </div>
                    </div>

                    <div class="flex items-center gap-3 text-xs">
                      @if (ticket.assignedTo) {
                        <div class="text-muted-foreground">Assigned: <strong class="text-foreground">{{ ticket.assignedTo }}</strong></div>
                      }
                      <span class="rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2.5 py-1 font-semibold uppercase">
                        {{ ticket.status }}
                      </span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }

        <!-- ========================================================================================= -->
        <!-- TAB 3: PROPERTIES & ROOM TYPES -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'properties') {
          <div class="space-y-6 animate-in fade-in-50 duration-200">
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              @for (prop of facade.properties(); track prop.id) {
                <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between hover:border-primary/50 transition-colors">
                  <div>
                    <div class="relative h-44 w-full overflow-hidden bg-muted">
                      <img [src]="prop.coverImageUrl" [alt]="prop.name" class="h-full w-full object-cover" />
                      <div class="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-xs flex items-center gap-1">
                        <ng-icon name="lucideStar" class="text-amber-400 text-xs" />
                        <span>{{ prop.starRating }} Stars</span>
                      </div>
                      <div class="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white uppercase backdrop-blur-xs">
                        {{ prop.propertyType.replace('_', ' ') }}
                      </div>
                    </div>

                    <div class="p-4">
                      <h3 class="font-bold text-base text-foreground">{{ prop.name }}</h3>
                      <div class="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                        <ng-icon name="lucideMapPin" class="text-primary text-xs" />
                        <span>{{ prop.address }}, {{ prop.city }}, {{ prop.country }}</span>
                      </div>
                      <p class="text-xs text-muted-foreground line-clamp-2 mt-2">{{ prop.description }}</p>

                      <div class="mt-4 grid grid-cols-2 gap-2 border-t border-border/60 pt-3 text-xs">
                        <div>
                          <span class="text-muted-foreground">Check-in:</span>
                          <span class="font-semibold text-foreground ml-1">{{ prop.checkInTime }}</span>
                        </div>
                        <div>
                          <span class="text-muted-foreground">Check-out:</span>
                          <span class="font-semibold text-foreground ml-1">{{ prop.checkOutTime }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="px-4 py-3 bg-muted/30 border-t border-border flex items-center justify-between text-xs">
                    <div>
                      <span class="text-muted-foreground">From</span>
                      <strong class="text-base text-foreground font-mono ml-1">\${{ prop.startingPrice }}</strong>
                      <span class="text-muted-foreground">/nt</span>
                    </div>
                    <button
                      hlmBtn
                      variant="outline"
                      size="sm"
                      class="h-7 text-xs"
                      (click)="onSelectProperty(prop.id)"
                    >
                      Manage Property
                    </button>
                  </div>
                </div>
              }
            </div>

            <!-- Room Categories Table for Selected Property -->
            <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden mt-8">
              <div class="px-5 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-foreground">Room Inventory Categories</h3>
                  @if (facade.selectedProperty(); as prop) {
                    <p class="text-xs text-muted-foreground">Room classes configured for {{ prop.name }}</p>
                  }
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead class="bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                    <tr>
                      <th class="px-4 py-3">Room Category</th>
                      <th class="px-4 py-3">Bedding</th>
                      <th class="px-4 py-3">Capacity</th>
                      <th class="px-4 py-3">Size & View</th>
                      <th class="px-4 py-3">Base Price</th>
                      <th class="px-4 py-3">Inventory</th>
                      <th class="px-4 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border/60">
                    @for (rt of facade.roomTypes(); track rt.id) {
                      <tr class="hover:bg-muted/30 transition-colors">
                        <td class="px-4 py-3.5">
                          <div class="font-bold text-foreground">{{ rt.name }}</div>
                          <div class="text-xs text-muted-foreground uppercase">{{ rt.category.replace('_', ' ') }}</div>
                        </td>
                        <td class="px-4 py-3.5 text-xs text-muted-foreground capitalize">{{ rt.baseBedType }} Bed</td>
                        <td class="px-4 py-3.5 text-xs text-muted-foreground">Max {{ rt.maxTotalGuests }} guests ({{ rt.maxOccupancyAdults }} Ad, {{ rt.maxOccupancyChildren }} Ch)</td>
                        <td class="px-4 py-3.5 text-xs text-muted-foreground">{{ rt.roomSizeSqm }}m² · {{ rt.viewType.replace('_', ' ') }}</td>
                        <td class="px-4 py-3.5 font-mono text-xs font-bold text-emerald-500">\${{ rt.basePricePerNight }} / nt</td>
                        <td class="px-4 py-3.5 text-xs font-semibold text-foreground">{{ rt.availableUnitsCount }} Avail / {{ rt.totalUnitsCount }} Total</td>
                        <td class="px-4 py-3.5 text-right">
                          <span class="rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 text-xs font-semibold">Active</span>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }

        <!-- ========================================================================================= -->
        <!-- TAB 4: RATE PLANS & YIELD RULES -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'rates') {
          <div class="space-y-6 animate-in fade-in-50 duration-200">
            <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
              <div class="px-5 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-foreground">OTA Rate Plan Hierarchy</h3>
                  <p class="text-xs text-muted-foreground">BAR, non-refundable, and meal plan rate structures complying with OpenTravel Alliance specifications</p>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead class="bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                    <tr>
                      <th class="px-4 py-3">Plan Code & Name</th>
                      <th class="px-4 py-3">Meal Plan</th>
                      <th class="px-4 py-3">Cancellation Policy</th>
                      <th class="px-4 py-3">Min Stay</th>
                      <th class="px-4 py-3">Price Multiplier</th>
                      <th class="px-4 py-3">Channel Access</th>
                      <th class="px-4 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border/60">
                    @for (rp of facade.ratePlans(); track rp.id) {
                      <tr class="hover:bg-muted/30 transition-colors">
                        <td class="px-4 py-3.5">
                          <span class="font-mono text-xs font-bold text-primary mr-2">{{ rp.planCode }}</span>
                          <span class="font-medium text-foreground">{{ rp.name }}</span>
                        </td>
                        <td class="px-4 py-3.5">
                          <span class="rounded bg-muted px-2 py-0.5 text-xs font-semibold uppercase text-muted-foreground">
                            {{ rp.mealPlanType.replace('_', ' ') }}
                          </span>
                        </td>
                        <td class="px-4 py-3.5 text-xs text-muted-foreground">
                          {{ rp.cancellationPolicyType.replace('_', ' ') }}
                          @if (rp.cancellationCutoffHours > 0) {
                            <span>({{ rp.cancellationCutoffHours }}h cut-off)</span>
                          }
                        </td>
                        <td class="px-4 py-3.5 text-xs text-foreground font-semibold">{{ rp.minimumStayNights }} nights</td>
                        <td class="px-4 py-3.5 font-mono text-xs font-bold text-foreground">{{ rp.basePriceMultiplier }}x Base</td>
                        <td class="px-4 py-3.5">
                          @if (rp.isB2BExclusive) {
                            <span class="rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20 px-2 py-0.5 text-xs font-bold">B2B Wholesale Only</span>
                          } @else {
                            <span class="rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 text-xs font-semibold">Public & OTA</span>
                          }
                        </td>
                        <td class="px-4 py-3.5 text-right">
                          <span class="rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 text-xs font-semibold">Active</span>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }

        <!-- ========================================================================================= -->
        <!-- TAB 5: AVAILABILITY & YIELD CALENDAR GRID -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'calendar') {
          <div class="space-y-6 animate-in fade-in-50 duration-200">
            <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
              <div class="px-5 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-foreground">Spreadsheet-Style Availability Matrix</h3>
                  <p class="text-xs text-muted-foreground">Daily inventory allotments, stop-sell switches, and rate multipliers</p>
                </div>
                <div class="flex items-center gap-2 text-xs">
                  <span class="flex items-center gap-1"><span class="h-2.5 w-2.5 rounded bg-emerald-500"></span> Available</span>
                  <span class="flex items-center gap-1"><span class="h-2.5 w-2.5 rounded bg-rose-500"></span> Stop Sell</span>
                </div>
              </div>

              <!-- Calendar Spreadsheet Demo Grid -->
              <div class="overflow-x-auto">
                <table class="w-full text-center text-xs border-collapse">
                  <thead class="bg-muted text-muted-foreground border-b border-border">
                    <tr>
                      <th class="p-3 text-left font-bold min-w-[200px] border-r border-border">Room Category</th>
                      <th class="p-2 border-r border-border">Today<br><span class="text-[10px] font-normal">Sep 14</span></th>
                      <th class="p-2 border-r border-border">Tue<br><span class="text-[10px] font-normal">Sep 15</span></th>
                      <th class="p-2 border-r border-border">Wed<br><span class="text-[10px] font-normal">Sep 16</span></th>
                      <th class="p-2 border-r border-border">Thu<br><span class="text-[10px] font-normal">Sep 17</span></th>
                      <th class="p-2 border-r border-border font-bold text-primary">Fri (Wknd)<br><span class="text-[10px] font-normal">Sep 18</span></th>
                      <th class="p-2 border-r border-border font-bold text-primary">Sat (Wknd)<br><span class="text-[10px] font-normal">Sep 19</span></th>
                      <th class="p-2">Sun<br><span class="text-[10px] font-normal">Sep 20</span></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border">
                    @for (rt of facade.roomTypes(); track rt.id) {
                      <tr class="hover:bg-muted/20">
                        <td class="p-3 text-left font-semibold text-foreground border-r border-border">
                          <div>{{ rt.name }}</div>
                          <div class="text-[10px] text-muted-foreground font-mono">Base: \${{ rt.basePricePerNight }}</div>
                        </td>
                        <td class="p-2 border-r border-border bg-emerald-500/5">
                          <div class="font-bold text-emerald-500">14 Avail</div>
                          <div class="text-[10px] text-muted-foreground">\${{ rt.basePricePerNight }}</div>
                        </td>
                        <td class="p-2 border-r border-border bg-emerald-500/5">
                          <div class="font-bold text-emerald-500">12 Avail</div>
                          <div class="text-[10px] text-muted-foreground">\${{ rt.basePricePerNight }}</div>
                        </td>
                        <td class="p-2 border-r border-border bg-emerald-500/5">
                          <div class="font-bold text-emerald-500">9 Avail</div>
                          <div class="text-[10px] text-muted-foreground">\${{ rt.basePricePerNight }}</div>
                        </td>
                        <td class="p-2 border-r border-border bg-emerald-500/5">
                          <div class="font-bold text-emerald-500">6 Avail</div>
                          <div class="text-[10px] text-muted-foreground">\${{ rt.basePricePerNight }}</div>
                        </td>
                        <td class="p-2 border-r border-border bg-amber-500/10">
                          <div class="font-bold text-amber-500">2 Left</div>
                          <div class="text-[10px] text-amber-500 font-bold">\${{ rt.basePricePerNight * 1.25 }} (1.25x)</div>
                        </td>
                        <td class="p-2 border-r border-border bg-rose-500/10">
                          <div class="font-bold text-rose-500">Sold Out</div>
                          <div class="text-[10px] text-rose-500">Stop Sell</div>
                        </td>
                        <td class="p-2 bg-emerald-500/5">
                          <div class="font-bold text-emerald-500">8 Avail</div>
                          <div class="text-[10px] text-muted-foreground">\${{ rt.basePricePerNight }}</div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }

        <!-- ========================================================================================= -->
        <!-- TAB 6: REVPAR REVENUE ANALYTICS -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'analytics') {
          <div class="space-y-6 animate-in fade-in-50 duration-200">
            @if (facade.analytics(); as a) {
              <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div class="rounded-xl border border-border bg-card p-5 shadow-xs">
                  <h3 class="font-bold text-base text-foreground mb-4">Hospitality Financial KPIs</h3>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between border-b border-border/60 pb-3">
                      <div>
                        <div class="font-semibold text-sm text-foreground">Average Daily Rate (ADR)</div>
                        <div class="text-xs text-muted-foreground">Total Room Revenue ÷ Paid Occupied Rooms</div>
                      </div>
                      <span class="text-lg font-mono font-bold text-foreground">\${{ a.adr }}</span>
                    </div>

                    <div class="flex items-center justify-between border-b border-border/60 pb-3">
                      <div>
                        <div class="font-semibold text-sm text-foreground">RevPAR (Revenue Per Available Room)</div>
                        <div class="text-xs text-muted-foreground">ADR × Occupancy Rate %</div>
                      </div>
                      <span class="text-lg font-mono font-bold text-indigo-500">\${{ a.revPar }}</span>
                    </div>

                    <div class="flex items-center justify-between border-b border-border/60 pb-3">
                      <div>
                        <div class="font-semibold text-sm text-foreground">GOPPAR (Gross Operating Profit PAR)</div>
                        <div class="text-xs text-muted-foreground">Operating Profit ÷ Available Rooms</div>
                      </div>
                      <span class="text-lg font-mono font-bold text-emerald-500">\${{ a.goppar }}</span>
                    </div>

                    <div class="flex items-center justify-between pt-1">
                      <div>
                        <div class="font-semibold text-sm text-foreground">Total Ancillary Contribution</div>
                        <div class="text-xs text-muted-foreground">Food & Beverage, Mini-bar, Spa & Incidentals</div>
                      </div>
                      <span class="text-lg font-mono font-bold text-purple-500">\${{ a.totalAncillaryRevenue }}</span>
                    </div>
                  </div>
                </div>

                <div class="rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 class="font-bold text-base text-foreground mb-1">Channel Contribution Breakdown</h3>
                    <p class="text-xs text-muted-foreground mb-4">Direct website vs OTAs vs B2B Wholesale channels</p>

                    <div class="space-y-3">
                      <div>
                        <div class="flex justify-between text-xs font-semibold mb-1">
                          <span>Direct Bookings (0% Commission)</span>
                          <span>42%</span>
                        </div>
                        <div class="h-2 rounded-full bg-muted overflow-hidden">
                          <div class="h-full bg-emerald-500 rounded-full" style="width: 42%"></div>
                        </div>
                      </div>

                      <div>
                        <div class="flex justify-between text-xs font-semibold mb-1">
                          <span>Booking.com & Expedia Sync</span>
                          <span>38%</span>
                        </div>
                        <div class="h-2 rounded-full bg-muted overflow-hidden">
                          <div class="h-full bg-blue-500 rounded-full" style="width: 38%"></div>
                        </div>
                      </div>

                      <div>
                        <div class="flex justify-between text-xs font-semibold mb-1">
                          <span>B2B Travel Agent Tour Packages</span>
                          <span>20%</span>
                        </div>
                        <div class="h-2 rounded-full bg-muted overflow-hidden">
                          <div class="h-full bg-purple-500 rounded-full" style="width: 20%"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="rounded-lg bg-muted/40 p-3 mt-6 text-xs text-muted-foreground border border-border">
                    💡 <strong>Yield Recommendation</strong>: Weekend demand for Grand Sylhet is pacing 24% ahead of last month. Consider raising BAR rate multiplier from 1.25x to 1.35x for Sep 18–19.
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>

      <!-- ========================================================================================= -->
      <!-- MODAL: GUEST FOLIO INCIDENTALS DRAWER -->
      <!-- ========================================================================================= -->
      @if (activeFolioBooking(); as bk) {
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in-0 duration-200">
          <div class="w-full max-w-md bg-card h-full p-6 shadow-2xl border-l border-border flex flex-col justify-between overflow-y-auto">
            <div>
              <div class="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 class="font-bold text-lg text-foreground">Guest Incidentals Folio</h3>
                  <p class="text-xs text-muted-foreground font-mono">Room {{ bk.assignedRoomNumber }} · {{ bk.contactName }}</p>
                </div>
                <button (click)="activeFolioBooking.set(null)" class="text-muted-foreground hover:text-foreground">
                  <ng-icon name="lucideX" class="text-xl" />
                </button>
              </div>

              <!-- Itemized Folio Items -->
              <div class="mt-4 space-y-3">
                <div class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Posted Charges</div>
                <div class="divide-y divide-border/60 border border-border rounded-lg overflow-hidden">
                  @for (c of bk.folioCharges; track c.id) {
                    <div class="p-3 text-xs flex items-center justify-between bg-card">
                      <div>
                        <div class="font-semibold text-foreground capitalize">{{ c.description }}</div>
                        <div class="text-[10px] text-muted-foreground uppercase">{{ c.chargeType.replace('_', ' ') }} · {{ c.postedAt | date:'shortTime' }}</div>
                      </div>
                      <div class="font-mono font-bold text-foreground">\${{ c.amount }}</div>
                    </div>
                  } @empty {
                    <div class="p-4 text-center text-xs text-muted-foreground">No incidental charges posted yet.</div>
                  }
                </div>

                <!-- Add Charge Form -->
                <div class="mt-6 rounded-lg border border-border p-3 bg-muted/20 space-y-3">
                  <div class="text-xs font-bold text-foreground">Post New Charge</div>
                  <div>
                    <label class="text-[11px] text-muted-foreground">Charge Type</label>
                    <select
                      [(ngModel)]="newChargeType"
                      class="mt-1 w-full rounded border border-border bg-card px-2.5 py-1 text-xs text-foreground"
                    >
                      <option value="room_service">Room Service (F&B)</option>
                      <option value="minibar">Minibar Consumption</option>
                      <option value="laundry">Laundry & Dry Cleaning</option>
                      <option value="spa">Spa & Wellness Treatment</option>
                      <option value="late_checkout">Late Checkout Fee</option>
                      <option value="damage">Property Damage</option>
                    </select>
                  </div>

                  <div>
                    <label class="text-[11px] text-muted-foreground">Description</label>
                    <input
                      type="text"
                      [(ngModel)]="newChargeDescription"
                      placeholder="e.g. 2x Mango Juice & Club Sandwich"
                      class="mt-1 w-full rounded border border-border bg-card px-2.5 py-1 text-xs text-foreground"
                    />
                  </div>

                  <div>
                    <label class="text-[11px] text-muted-foreground">Amount (USD)</label>
                    <input
                      type="number"
                      [(ngModel)]="newChargeAmount"
                      placeholder="25.00"
                      class="mt-1 w-full rounded border border-border bg-card px-2.5 py-1 text-xs text-foreground font-mono"
                    />
                  </div>

                  <button
                    hlmBtn
                    variant="default"
                    size="sm"
                    class="w-full text-xs font-semibold"
                    (click)="submitFolioCharge(bk)"
                  >
                    Post to Folio
                  </button>
                </div>
              </div>
            </div>

            <!-- Footer Balance & Settlement -->
            <div class="pt-4 border-t border-border mt-6">
              <div class="flex items-center justify-between text-sm mb-4">
                <span class="font-bold text-foreground">Total Bill Balance:</span>
                <span class="text-xl font-black font-mono text-emerald-500">\${{ bk.totalAmount }}</span>
              </div>
              <button
                hlmBtn
                variant="outline"
                class="w-full text-xs"
                (click)="activeFolioBooking.set(null)"
              >
                Close Folio
              </button>
            </div>
          </div>
        </div>
      }

      <!-- ========================================================================================= -->
      <!-- MODAL: ROOM ASSIGNMENT MODAL -->
      <!-- ========================================================================================= -->
      @if (activeAssignBooking(); as bk) {
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-0 duration-200">
          <div class="w-full max-w-md bg-card rounded-xl p-6 shadow-2xl border border-border">
            <h3 class="font-bold text-lg text-foreground">Assign Clean Room Unit</h3>
            <p class="text-xs text-muted-foreground mt-1">
              Guest: <strong>{{ bk.contactName }}</strong> · Requested: <strong>{{ bk.roomTypeName }}</strong>
            </p>

            <div class="mt-4 space-y-2 max-h-60 overflow-y-auto">
              @for (unit of cleanUnits(); track unit.id) {
                <div
                  (click)="selectedUnitId = unit.id"
                  [class]="selectedUnitId === unit.id ? 'border-primary bg-primary/10' : 'border-border bg-muted/20 hover:border-primary/50'"
                  class="cursor-pointer rounded-lg border p-3 flex items-center justify-between transition-colors"
                >
                  <div>
                    <div class="font-bold text-sm text-foreground">Room {{ unit.roomNumber }}</div>
                    <div class="text-[11px] text-muted-foreground">Floor {{ unit.floorNumber }} · {{ unit.wingOrBuilding }}</div>
                  </div>
                  <span class="rounded bg-emerald-500/10 text-emerald-500 px-2 py-0.5 text-xs font-bold uppercase">
                    {{ unit.physicalStatus }}
                  </span>
                </div>
              } @empty {
                <div class="p-6 text-center text-xs text-muted-foreground">No clean vacant rooms available. Please check Housekeeping Board.</div>
              }
            </div>

            <div class="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border">
              <button hlmBtn variant="outline" size="sm" (click)="activeAssignBooking.set(null)">Cancel</button>
              <button
                hlmBtn
                variant="default"
                size="sm"
                [disabled]="!selectedUnitId"
                (click)="confirmRoomAssignment(bk)"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      }
    </app-main>
  `,
})
export class HotelsPageComponent implements OnInit {
  readonly facade = inject(HotelsFacade)

  readonly activeTab = signal<'front-desk' | 'housekeeping' | 'properties' | 'rates' | 'calendar' | 'analytics'>('front-desk')
  readonly activeFolioBooking = signal<HotelBooking | null>(null)
  readonly activeAssignBooking = signal<HotelBooking | null>(null)
  selectedUnitId: string | null = null

  searchQuery = ''
  newChargeType: any = 'room_service'
  newChargeDescription = ''
  newChargeAmount = 25

  ngOnInit(): void {
    this.facade.loadAll()
  }

  onSelectProperty(id: string): void {
    this.facade.selectProperty(id)
  }

  filteredBookings(): HotelBooking[] {
    const query = this.searchQuery.toLowerCase().trim()
    const all = this.facade.bookings()
    if (!query) return all
    return all.filter(
      (b) =>
        b.contactName.toLowerCase().includes(query) ||
        b.bookingReference.toLowerCase().includes(query) ||
        (b.assignedRoomNumber && b.assignedRoomNumber.toLowerCase().includes(query))
    )
  }

  cleanUnits(): RoomUnit[] {
    return this.facade.roomUnits().filter((u) => u.physicalStatus === 'clean' && u.currentOccupancyStatus === 'vacant')
  }

  openAssignRoomModal(bk: HotelBooking): void {
    this.selectedUnitId = null
    this.activeAssignBooking.set(bk)
  }

  async confirmRoomAssignment(bk: HotelBooking): Promise<void> {
    if (!this.selectedUnitId) return
    await this.facade.assignRoomUnit(bk.id, this.selectedUnitId)
    toast.success(`Room assigned successfully to ${bk.contactName}!`)
    this.activeAssignBooking.set(null)
  }

  async executeCheckIn(bk: HotelBooking): Promise<void> {
    if (!bk.assignedRoomNumber) {
      this.openAssignRoomModal(bk)
      return
    }
    await this.facade.checkIn(bk.id)
    toast.success(`Guest ${bk.contactName} checked in to Room ${bk.assignedRoomNumber}!`)
  }

  async executeCheckOut(bk: HotelBooking): Promise<void> {
    await this.facade.checkOut(bk.id)
    toast.success(`Room ${bk.assignedRoomNumber} checked out. Room marked Dirty for Housekeeping.`)
  }

  openGuestFolio(bk: HotelBooking): void {
    this.newChargeDescription = ''
    this.newChargeAmount = 25
    this.activeFolioBooking.set(bk)
  }

  async submitFolioCharge(bk: HotelBooking): Promise<void> {
    if (!this.newChargeDescription || !this.newChargeAmount) {
      toast.error('Please enter description and amount')
      return
    }
    await this.facade.postFolioCharge(bk.id, {
      hotelBookingId: bk.id,
      propertyId: bk.propertyId,
      roomNumber: bk.assignedRoomNumber || 'N/A',
      chargeType: this.newChargeType,
      description: this.newChargeDescription,
      amount: Number(this.newChargeAmount),
      currency: 'USD',
    })
    toast.success('Charge posted to guest folio!')
    this.newChargeDescription = ''
  }

  async setRoomCleanStatus(unit: RoomUnit, status: RoomUnit['physicalStatus']): Promise<void> {
    await this.facade.updateRoomStatus(unit.id, status)
    toast.success(`Room ${unit.roomNumber} updated to ${status.replace('_', ' ')}!`)
  }

  openPropertyDrawer(): void {
    toast.info('Property registration drawer ready.')
  }

  openMaintenanceModal(): void {
    toast.info('Opening maintenance ticket creation form...')
  }
}
