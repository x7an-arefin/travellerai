import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideSearch,
  lucideFilter,
  lucideDownload,
  lucideShoppingBag,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { BookingsFacade } from '../data-access/bookings.facade'
import { BookingsTableComponent } from './bookings-table.component'
import { BookingsDetailComponent } from './bookings-detail.component'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmSheetImports } from '../../../ui/sheet/hlm-sheet.components'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-bookings-page',
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
    BookingsTableComponent,
    BookingsDetailComponent,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucideSearch,
      lucideFilter,
      lucideDownload,
      lucideShoppingBag,
      lucideAlertTriangle,
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
            <h1 class="text-2xl font-bold tracking-tight">Bookings Pipeline</h1>
            <span hlmBadge variant="outline" class="text-xs">
              {{ facade.allItems().length }} Active
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Monitor customer reservations, payment verifications, and traveler check-in statuses.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            size="sm"
            class="gap-1.5 cursor-pointer h-9 shadow-xs"
            (click)="exportManifest()"
          >
            <ng-icon name="lucideDownload" class="size-4" />
            <span>Export Passenger Manifest</span>
          </button>
        </div>
      </div>

      <!-- Filter & Search Bar -->
      <div class="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <!-- Search Input -->
        <div class="relative flex-1 max-w-sm">
          <ng-icon name="lucideSearch" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            [ngModel]="facade.searchQuery()"
            (ngModelChange)="facade.setSearchQuery($event)"
            placeholder="Search by reference, traveler name or email..."
            class="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <!-- Status Filter Tabs -->
        <div class="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/40 shrink-0">
          <button
            type="button"
            (click)="facade.setStatusFilter('all')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.statusFilter() === 'all'"
            [class.shadow-2xs]="facade.statusFilter() === 'all'"
            [class.text-foreground]="facade.statusFilter() === 'all'"
            [class.text-muted-foreground]="facade.statusFilter() !== 'all'"
          >
            All Bookings
          </button>
          <button
            type="button"
            (click)="facade.setStatusFilter('confirmed')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.statusFilter() === 'confirmed'"
            [class.shadow-2xs]="facade.statusFilter() === 'confirmed'"
            [class.text-foreground]="facade.statusFilter() === 'confirmed'"
            [class.text-muted-foreground]="facade.statusFilter() !== 'confirmed'"
          >
            Confirmed
          </button>
          <button
            type="button"
            (click)="facade.setStatusFilter('pending_payment')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.statusFilter() === 'pending_payment'"
            [class.shadow-2xs]="facade.statusFilter() === 'pending_payment'"
            [class.text-foreground]="facade.statusFilter() === 'pending_payment'"
            [class.text-muted-foreground]="facade.statusFilter() !== 'pending_payment'"
          >
            Pending Payment
          </button>
          <button
            type="button"
            (click)="facade.setStatusFilter('completed')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.statusFilter() === 'completed'"
            [class.shadow-2xs]="facade.statusFilter() === 'completed'"
            [class.text-foreground]="facade.statusFilter() === 'completed'"
            [class.text-muted-foreground]="facade.statusFilter() !== 'completed'"
          >
            Completed
          </button>
        </div>
      </div>

      <!-- Bookings Table -->
      <app-bookings-table
        [rows]="facade.items()"
        [isLoading]="facade.isLoading()"
        (viewClicked)="facade.openDetailDrawer($event)"
        (deleteClicked)="facade.requestDeleteConfirm($event)"
      />

      <!-- Right Drawer for Booking Details -->
      <hlm-sheet
        [isOpen]="facade.drawerMode() === 'detail'"
        (closed)="facade.closeDrawer()"
        sheetSize="md"
        side="right"
      >
        <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
          <div>
            <div class="pb-3 border-b border-border/40 mb-3">
              <h3 class="text-lg font-bold text-foreground">Booking Voucher & Traveler Dossier</h3>
              <p class="text-xs text-muted-foreground">Complete itinerary, participant details, and voucher access.</p>
            </div>

            <app-bookings-detail
              [booking]="facade.selected()"
              (checkin)="onCheckin($event)"
              (requestRefund)="onRequestRefund($event)"
            />
          </div>

          <div class="pt-4 mt-6 border-t border-border/40 flex justify-end gap-2">
            <button
              hlmBtn
              variant="outline"
              size="sm"
              (click)="facade.closeDrawer()"
            >
              Close
            </button>
            <button
              hlmBtn
              variant="default"
              size="sm"
              (click)="printVoucher()"
            >
              Print Voucher
            </button>
          </div>
        </div>
      </hlm-sheet>

      <!-- Delete Confirmation -->
      @if (facade.deleteConfirmId()) {
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="bg-card border border-border rounded-xl p-5 max-w-md w-full shadow-lg space-y-4 animate-in fade-in-0 zoom-in-95">
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                <ng-icon name="lucideAlertTriangle" class="size-5" />
              </div>
              <div>
                <h4 class="text-base font-bold text-foreground">Cancel Booking Reservation?</h4>
                <p class="text-xs text-muted-foreground">
                  This will release the reserved inventory seats and initiate the standard refund protocol.
                </p>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2">
              <button
                hlmBtn
                variant="outline"
                size="sm"
                (click)="facade.cancelDelete()"
              >
                Keep Booking
              </button>
              <button
                hlmBtn
                variant="destructive"
                size="sm"
                (click)="confirmDelete()"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      }
    </app-main>
  `,
})
export class BookingsPageComponent implements OnInit {
  protected readonly facade = inject(BookingsFacade)

  ngOnInit(): void {
    this.facade.loadAll()
  }

  exportManifest(): void {
    toast.success('Passenger Manifest Exported', {
      description: 'The CSV manifest has been generated for tour operators.',
    })
  }

  printVoucher(): void {
    const selected = this.facade.selected()
    if (selected?.voucherUrl) {
      window.open(selected.voucherUrl, '_blank')
    } else {
      window.print()
    }
    toast.success('Voucher Dossier Generated', {
      description: `Dispatched voucher document for ${selected?.bookingReference || 'reservation'}.`,
    })
  }

  async onCheckin(id: string): Promise<void> {
    const ok = await this.facade.update(id, {
      checkinStatus: 'checked_in',
      checkinTime: new Date().toISOString(),
    })
    if (ok) {
      toast.success('Guest Checked In', {
        description: 'Passenger verified and marked as boarded/checked-in.',
      })
    }
  }

  async onRequestRefund(id: string): Promise<void> {
    this.facade.requestDeleteConfirm(id)
  }

  async confirmDelete(): Promise<void> {
    const id = this.facade.deleteConfirmId()
    if (id) {
      const ok = await this.facade.remove(id)
      if (ok) {
        toast.success('Booking Cancelled', {
          description: 'The booking reservation has been successfully cancelled.',
        })
      }
    }
  }
}
