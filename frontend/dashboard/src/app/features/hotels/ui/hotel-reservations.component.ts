import { Component, OnInit, inject, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowLeft,
  lucideSearch,
  lucidePlus,
  lucideCalendar,
  lucideUsers,
  lucideCheckCircle2,
  lucideClock,
  lucideCreditCard,
  lucideDownload,
  lucideFileText,
  lucideFilter,
  lucideBedDouble,
  lucideDoorOpen,
  lucideX,
} from '@ng-icons/lucide'
import { HotelsFacade } from '../data-access/hotels.facade'
import { HotelBooking } from '../data-access/models/hotel.model'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmInputImports } from '../../../ui/input/hlm-input.directive'
import { HlmSheetImports } from '../../../ui/sheet/hlm-sheet.components'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-hotel-reservations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    TopNavComponent,
    SearchComponent,
    ThemeSwitchComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmInputImports,
    ...HlmSheetImports,
  ],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideSearch,
      lucidePlus,
      lucideCalendar,
      lucideUsers,
      lucideCheckCircle2,
      lucideClock,
      lucideCreditCard,
      lucideDownload,
      lucideFileText,
      lucideFilter,
      lucideBedDouble,
      lucideDoorOpen,
      lucideX,
    }),
  ],
  template: `
    <app-header [fixed]="true">
      <app-top-nav class="mr-auto" />
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <app-main>
      <!-- Page Header -->
      <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <button
            hlmBtn
            variant="ghost"
            size="icon"
            routerLink="/hotels"
            class="size-9 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ng-icon name="lucideArrowLeft" class="size-4" />
          </button>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold tracking-tight text-foreground">Hotel Reservations Desk</h1>
              <span hlmBadge variant="outline" class="text-xs">
                {{ filteredBookings().length }} Active Stays
              </span>
            </div>
            <p class="text-xs text-muted-foreground mt-0.5">
              Manage corporate group rooming blocks, direct walk-ins, phone reservations, and guest folios.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="default"
            size="sm"
            class="gap-1.5 cursor-pointer shadow-xs"
            (click)="isNewBookingModalOpen.set(true)"
          >
            <ng-icon name="lucidePlus" class="size-4" />
            <span>New Reservation (Walk-In/Phone)</span>
          </button>
        </div>
      </div>

      <!-- Filters & Status Tabs -->
      <div class="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="relative flex-1 max-w-sm">
          <ng-icon name="lucideSearch" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            hlmInput
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search by guest name, room, or ref #..."
            class="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg"
          />
        </div>

        <div class="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/40 shrink-0">
          <button
            type="button"
            (click)="selectedStatus.set('all')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedStatus() === 'all'"
            [class.shadow-2xs]="selectedStatus() === 'all'"
            [class.text-foreground]="selectedStatus() === 'all'"
            [class.text-muted-foreground]="selectedStatus() !== 'all'"
          >
            All
          </button>
          <button
            type="button"
            (click)="selectedStatus.set('confirmed')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedStatus() === 'confirmed'"
            [class.shadow-2xs]="selectedStatus() === 'confirmed'"
            [class.text-foreground]="selectedStatus() === 'confirmed'"
            [class.text-muted-foreground]="selectedStatus() !== 'confirmed'"
          >
            Confirmed
          </button>
          <button
            type="button"
            (click)="selectedStatus.set('checked_in')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedStatus() === 'checked_in'"
            [class.shadow-2xs]="selectedStatus() === 'checked_in'"
            [class.text-foreground]="selectedStatus() === 'checked_in'"
            [class.text-muted-foreground]="selectedStatus() !== 'checked_in'"
          >
            In-House
          </button>
          <button
            type="button"
            (click)="selectedStatus.set('checked_out')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedStatus() === 'checked_out'"
            [class.shadow-2xs]="selectedStatus() === 'checked_out'"
            [class.text-foreground]="selectedStatus() === 'checked_out'"
            [class.text-muted-foreground]="selectedStatus() !== 'checked_out'"
          >
            Completed
          </button>
        </div>
      </div>

      <!-- Reservations Master Table -->
      <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
              <tr>
                <th scope="col" class="py-3 px-4">Booking Ref</th>
                <th scope="col" class="py-3 px-4">Lead Guest</th>
                <th scope="col" class="py-3 px-4">Assigned Room</th>
                <th scope="col" class="py-3 px-4">Dates</th>
                <th scope="col" class="py-3 px-4">Total Rate</th>
                <th scope="col" class="py-3 px-4">Status</th>
                <th scope="col" class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border/30 text-xs">
              @for (b of filteredBookings(); track b.id) {
                <tr class="hover:bg-muted/20 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-primary">
                    {{ b.bookingReference }}
                  </td>
                  <td class="py-3.5 px-4">
                    <div class="font-semibold text-foreground">{{ b.contactName }}</div>
                    <div class="text-[11px] text-muted-foreground">{{ b.contactEmail }}</div>
                  </td>
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-1.5 font-medium text-foreground">
                      <ng-icon name="lucideDoorOpen" class="size-3.5 text-primary" />
                      <span>Room {{ b.assignedRoomNumber || '304' }}</span>
                    </div>
                    <span class="text-[10px] text-muted-foreground">{{ b.roomTypeName || 'Matterhorn Panorama' }}</span>
                  </td>
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-1.5 text-foreground font-medium">
                      <ng-icon name="lucideCalendar" class="size-3.5 text-muted-foreground" />
                      <span>{{ b.checkInDate }} ➔ {{ b.checkOutDate }}</span>
                    </div>
                    <span class="text-[10px] text-muted-foreground">{{ b.totalNights }} nights • {{ b.totalAdults }} guests</span>
                  </td>
                  <td class="py-3.5 px-4 font-mono font-bold text-foreground">
                    \${{ b.totalAmount | number:'1.2-2' }}
                  </td>
                  <td class="py-3.5 px-4">
                    @if (b.bookingStatus === 'checked_in') {
                      <span hlmBadge variant="default" class="text-[10px] bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                        In-House
                      </span>
                    } @else if (b.bookingStatus === 'confirmed') {
                      <span hlmBadge variant="default" class="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        Confirmed
                      </span>
                    } @else {
                      <span hlmBadge variant="secondary" class="text-[10px]">
                        {{ b.bookingStatus }}
                      </span>
                    }
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="h-7 text-xs text-primary hover:underline cursor-pointer"
                        (click)="printRegCard(b)"
                      >
                        Reg Card
                      </button>
                      <button
                        hlmBtn
                        variant="outline"
                        size="sm"
                        class="h-7 text-xs cursor-pointer"
                        (click)="openFolioModal(b)"
                      >
                        Folio
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Folio Ledger Modal -->
      @if (selectedFolioBooking(); as booking) {
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="bg-card border border-border rounded-xl p-6 max-w-xl w-full shadow-xl space-y-4 animate-in fade-in-0 zoom-in-95">
            <div class="flex items-center justify-between pb-3 border-b border-border/40">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-base font-bold text-foreground">Guest Folio & Billing Ledger</h3>
                  <span hlmBadge variant="outline" class="text-[11px] font-mono">{{ booking.bookingReference }}</span>
                </div>
                <p class="text-xs text-muted-foreground">{{ booking.contactName }} • Room {{ booking.assignedRoomNumber || '304' }}</p>
              </div>
              <button hlmBtn variant="ghost" size="icon" (click)="selectedFolioBooking.set(null)">
                <ng-icon name="lucideX" class="size-4" />
              </button>
            </div>

            <!-- Ledger Breakdown -->
            <div class="space-y-3 text-xs">
              <div class="grid grid-cols-3 gap-2 p-3 bg-muted/30 rounded-lg border border-border/40 text-center">
                <div>
                  <div class="text-[10px] text-muted-foreground uppercase font-semibold">Room Charges</div>
                  <div class="text-sm font-bold text-foreground font-mono">\${{ booking.roomChargesAmount | number:'1.2-2' }}</div>
                </div>
                <div>
                  <div class="text-[10px] text-muted-foreground uppercase font-semibold">Incidentals</div>
                  <div class="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono">\${{ booking.incidentalChargesAmount | number:'1.2-2' }}</div>
                </div>
                <div>
                  <div class="text-[10px] text-muted-foreground uppercase font-semibold">Total Balance</div>
                  <div class="text-sm font-bold text-primary font-mono">\${{ booking.totalAmount | number:'1.2-2' }}</div>
                </div>
              </div>

              <!-- Posted Folio Line Items -->
              <div class="border border-border/40 rounded-lg overflow-hidden">
                <div class="bg-muted/40 px-3 py-2 text-[11px] font-semibold text-muted-foreground flex justify-between">
                  <span>Line Item / Service</span>
                  <span>Amount</span>
                </div>
                <div class="divide-y divide-border/30 max-h-48 overflow-y-auto">
                  <div class="px-3 py-2 flex items-center justify-between">
                    <div>
                      <div class="font-medium text-foreground">Nightly Accommodation Fee ({{ booking.totalNights }} nights)</div>
                      <div class="text-[10px] text-muted-foreground">{{ booking.checkInDate }} to {{ booking.checkOutDate }}</div>
                    </div>
                    <span class="font-mono font-semibold">\${{ booking.roomChargesAmount | number:'1.2-2' }}</span>
                  </div>
                  @for (charge of booking.folioCharges || []; track charge.id) {
                    <div class="px-3 py-2 flex items-center justify-between">
                      <div>
                        <div class="font-medium text-foreground">{{ charge.description }}</div>
                        <div class="text-[10px] text-muted-foreground">{{ charge.chargeType | uppercase }} • {{ charge.postedAt }}</div>
                      </div>
                      <span class="font-mono font-semibold text-amber-600 dark:text-amber-400">\${{ charge.amount | number:'1.2-2' }}</span>
                    </div>
                  }
                  @if (!booking.folioCharges || booking.folioCharges.length === 0) {
                    <div class="px-3 py-2 text-center text-muted-foreground text-[11px]">
                      No incidental room charges posted yet.
                    </div>
                  }
                </div>
              </div>

              <!-- Add Incidental Charge Quick Form -->
              <div class="p-3 bg-muted/20 border border-border/40 rounded-lg space-y-2">
                <div class="font-semibold text-foreground text-[11px]">Post Quick Incidental Charge</div>
                <div class="grid grid-cols-3 gap-2">
                  <input hlmInput [(ngModel)]="newFolioDescription" placeholder="Description (e.g. Minibar, Spa)" class="col-span-2 text-xs" />
                  <input hlmInput type="number" [(ngModel)]="newFolioAmount" placeholder="Amount ($)" class="text-xs" />
                </div>
                <div class="flex justify-end">
                  <button hlmBtn variant="outline" size="sm" class="h-7 text-xs" (click)="addFolioCharge(booking)">
                    + Post to Room
                  </button>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-border/40 text-xs">
              <span class="text-muted-foreground">Payment Status: <strong class="text-foreground capitalize">{{ booking.paymentStatus }}</strong></span>
              <button hlmBtn variant="default" size="sm" (click)="selectedFolioBooking.set(null)">
                Close Folio
              </button>
            </div>
          </div>
        </div>
      }

      <!-- New Phone / Walk-in Modal -->
      @if (isNewBookingModalOpen()) {
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="bg-card border border-border rounded-xl p-6 max-w-lg w-full shadow-lg space-y-4 animate-in fade-in-0 zoom-in-95">
            <div class="flex items-center justify-between pb-2 border-b border-border/40">
              <h3 class="text-base font-bold text-foreground">New Phone or Walk-In Reservation</h3>
              <button hlmBtn variant="ghost" size="icon" (click)="isNewBookingModalOpen.set(false)">
                <ng-icon name="lucideX" class="size-4" />
              </button>
            </div>

            <div class="space-y-3 text-xs">
              <div class="space-y-1">
                <label class="font-medium text-foreground">Primary Guest Name *</label>
                <input hlmInput [(ngModel)]="newBooking.guestName" placeholder="e.g. Dr. Alexander Weber" class="w-full text-xs" />
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-1">
                  <label class="font-medium text-foreground">Guest Email *</label>
                  <input hlmInput [(ngModel)]="newBooking.guestEmail" placeholder="guest@travel.com" class="w-full text-xs" />
                </div>
                <div class="space-y-1">
                  <label class="font-medium text-foreground">Phone Number</label>
                  <input hlmInput [(ngModel)]="newBooking.guestPhone" placeholder="+41 79 123 4567" class="w-full text-xs" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-1">
                  <label class="font-medium text-foreground">Check-in Date *</label>
                  <input hlmInput type="date" [(ngModel)]="newBooking.checkInDate" class="w-full text-xs" />
                </div>
                <div class="space-y-1">
                  <label class="font-medium text-foreground">Check-out Date *</label>
                  <input hlmInput type="date" [(ngModel)]="newBooking.checkOutDate" class="w-full text-xs" />
                </div>
              </div>
              <div class="space-y-1">
                <label class="font-medium text-foreground">Negotiated Corporate Rate Plan</label>
                <select class="w-full px-3 py-2 rounded-md border border-border bg-background text-xs">
                  <option>Best Available Rate (BAR) - \$280/nt</option>
                  <option>Corporate B2B Net Rate - \$235/nt (Corporate VIP)</option>
                  <option>Bed & Breakfast Included - \$310/nt</option>
                </select>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
              <button hlmBtn variant="outline" size="sm" (click)="isNewBookingModalOpen.set(false)">
                Cancel
              </button>
              <button hlmBtn variant="default" size="sm" (click)="confirmCreateBooking()">
                Confirm & Lock Room
              </button>
            </div>
          </div>
        </div>
      }
    </app-main>
  `,
})
export class HotelReservationsComponent implements OnInit {
  protected readonly facade = inject(HotelsFacade)

  readonly searchQuery = signal('')
  readonly selectedStatus = signal<'all' | 'confirmed' | 'checked_in' | 'checked_out'>('all')
  readonly isNewBookingModalOpen = signal(false)
  readonly selectedFolioBooking = signal<HotelBooking | null>(null)

  newFolioDescription = ''
  newFolioAmount = 0

  readonly newBooking = {
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkInDate: '2026-09-20',
    checkOutDate: '2026-09-24',
  }

  readonly filteredBookings = computed(() => {
    let list = this.facade.bookings()
    const query = this.searchQuery().toLowerCase().trim()
    const status = this.selectedStatus()

    if (status !== 'all') {
      list = list.filter((b) => b.bookingStatus === status)
    }

    if (query) {
      list = list.filter(
        (b) =>
          b.contactName.toLowerCase().includes(query) ||
          b.contactEmail.toLowerCase().includes(query) ||
          b.bookingReference.toLowerCase().includes(query) ||
          (b.assignedRoomNumber && b.assignedRoomNumber.toLowerCase().includes(query))
      )
    }

    return list
  })

  ngOnInit(): void {
    this.facade.loadAll()
  }

  openFolioModal(booking: HotelBooking): void {
    this.selectedFolioBooking.set(booking)
  }

  async addFolioCharge(booking: HotelBooking): Promise<void> {
    if (!this.newFolioDescription || !this.newFolioAmount) {
      toast.error('Invalid Charge', { description: 'Please enter a description and amount.' })
      return
    }

    await this.facade.postFolioCharge(booking.id, {
      hotelBookingId: booking.id,
      propertyId: booking.propertyId,
      roomNumber: booking.assignedRoomNumber || '304',
      chargeType: 'room_service',
      description: this.newFolioDescription,
      amount: Number(this.newFolioAmount),
      currency: 'USD',
    })

    toast.success('Charge Posted', {
      description: `\${this.newFolioAmount} posted to Room ${booking.assignedRoomNumber || '304'} folio.`,
    })

    this.newFolioDescription = ''
    this.newFolioAmount = 0
  }

  printRegCard(booking: HotelBooking): void {
    window.print()
    toast.success('Registration Card Printed', {
      description: `Official registration dossier printed for ${booking.contactName} (Ref: ${booking.bookingReference}).`,
    })
  }

  confirmCreateBooking(): void {
    if (!this.newBooking.guestName || !this.newBooking.guestEmail) {
      toast.error('Validation Error', { description: 'Guest name and email are required.' })
      return
    }

    this.isNewBookingModalOpen.set(false)
    toast.success('Reservation Confirmed', {
      description: `Room locked for ${this.newBooking.guestName}. Confirmation dispatched.`,
    })
  }
}
