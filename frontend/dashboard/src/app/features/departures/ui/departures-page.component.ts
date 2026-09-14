import { Component, OnInit, inject } from '@angular/core'
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
  lucideDownload,
  lucideCheckCircle2,
} from '@ng-icons/lucide'
import { DeparturesFacade } from '../data-access/departures.facade'
import { DeparturesTableComponent } from './departures-table.component'
import { DeparturesFormComponent } from './departures-form.component'
import { DeparturesManifestModalComponent } from './departures-manifest-modal.component'
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
import { ExportService } from '../../../core/services/export.service'
import { toast } from 'ngx-sonner'

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
    DeparturesTableComponent,
    DeparturesFormComponent,
    DeparturesManifestModalComponent,
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
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
      lucideDownload,
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
    <app-main [fixed]="true" class="space-y-6">
      <!-- Header Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2.5">
            <div class="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ng-icon name="lucideClock" class="size-4.5" />
            </div>
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-foreground">Departures & Tour Scheduling</h1>
              <p class="text-xs text-muted-foreground mt-0.5">
                Real-time departure calendar, seat allocation, guide assignments, and passenger boarding manifests.
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="exportAllCsv()"
            class="gap-1.5 cursor-pointer shadow-xs text-xs"
          >
            <ng-icon name="lucideDownload" class="size-3.5" />
            <span>Export Schedule CSV</span>
          </button>

          <button
            hlmBtn
            variant="default"
            size="sm"
            (click)="facade.openAddDrawer()"
            class="gap-1.5 cursor-pointer shadow-xs text-xs"
          >
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Schedule Departure</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Total Scheduled Seats</span>
            <ng-icon name="lucideUsers" class="size-4 text-blue-500" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            {{ facade.totalScheduledSeats() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Inventory across all dates</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Booked Passengers</span>
            <ng-icon name="lucideCheckCircle2" class="size-4 text-emerald-500" />
          </div>
          <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ facade.totalBookedSeats() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Confirmed group members</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Average Occupancy</span>
            <ng-icon name="lucideCalendar" class="size-4 text-amber-500" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            {{ facade.averageOccupancyRate() }}%
          </div>
          <p class="text-[10px] text-muted-foreground">Fleet utilization</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Scheduled Departures</span>
            <ng-icon name="lucideClock" class="size-4 text-purple-500" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            {{ facade.allItems().length }}
          </div>
          <p class="text-[10px] text-muted-foreground">Active tour runs</p>
        </div>
      </div>

      <!-- Search & Status Filter Bar -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="relative flex-1 max-w-sm">
          <ng-icon name="lucideSearch" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            [ngModel]="facade.searchQuery()"
            (ngModelChange)="facade.setSearchQuery($event)"
            placeholder="Search code, package title, destination, guide..."
            class="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          @for (tab of statusTabs; track tab.value) {
            <button
              hlmBtn
              [variant]="facade.activeStatusFilter() === tab.value ? 'default' : 'ghost'"
              size="sm"
              class="h-7 text-xs px-2.5 rounded-lg cursor-pointer"
              (click)="facade.setStatusFilter(tab.value)"
            >
              {{ tab.label }}
            </button>
          }
        </div>
      </div>

      <!-- Departures Table -->
      <app-departures-table
        [items]="facade.items()"
        [isLoading]="facade.isLoading()"
        (manifestClick)="facade.openManifestModal($event)"
        (editClick)="facade.openEditDrawer($event)"
        (deleteClick)="facade.requestDelete($event)"
      />
    </app-main>

    <!-- Create / Edit Departure Slide-over Drawer -->
    <hlm-sheet [isOpen]="facade.drawerMode() === 'add' || facade.drawerMode() === 'edit'" (closed)="facade.closeDrawer()" sheetSize="md" side="right">
      <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div class="pb-3 border-b border-border/40 mb-4">
            <h3 class="text-base font-bold text-foreground">
              {{ facade.drawerMode() === 'add' ? 'Schedule New Departure' : 'Edit Departure' }}
            </h3>
            <p class="text-xs text-muted-foreground mt-0.5">
              Set calendar dates, max passenger quota, assigned mountain/cultural guide, and meeting point.
            </p>
          </div>

          <app-departures-form
            [initialValue]="facade.selected()"
            [isEdit]="facade.drawerMode() === 'edit'"
            (save)="onSaveDeparture($event)"
            (cancel)="facade.closeDrawer()"
          />
        </div>
      </div>
    </hlm-sheet>

    <!-- Boarding Manifest Modal -->
    <hlm-dialog [isOpen]="facade.drawerMode() === 'manifest'" (closed)="facade.closeDrawer()">
      <app-departures-manifest-modal
        [departure]="facade.selected()"
        (close)="facade.closeDrawer()"
      />
    </hlm-dialog>

    <!-- Delete Confirmation Modal -->
    <hlm-dialog [isOpen]="!!facade.deleteConfirmId()" (closed)="facade.cancelDelete()">
      <div class="space-y-4 text-xs">
        <div class="flex items-center gap-2 text-destructive">
          <ng-icon name="lucideAlertTriangle" class="size-5" />
          <h3 class="text-base font-bold">Cancel & Delete Departure?</h3>
        </div>
        <p class="text-muted-foreground">
          Are you sure you want to cancel this scheduled tour departure? Confirmed passengers will need reassignment or refunds issued.
        </p>
        <div class="flex items-center justify-end gap-2 pt-2">
          <button hlmBtn variant="outline" size="sm" (click)="facade.cancelDelete()" class="cursor-pointer">
            Cancel
          </button>
          <button hlmBtn variant="destructive" size="sm" (click)="onConfirmDelete()" class="cursor-pointer">
            Delete Departure
          </button>
        </div>
      </div>
    </hlm-dialog>
  `,
})
export class DeparturesPageComponent implements OnInit {
  readonly facade = inject(DeparturesFacade)
  private readonly exportService = inject(ExportService)

  readonly statusTabs = [
    { label: 'All Departures', value: 'all' },
    { label: 'Available', value: 'available' },
    { label: 'Limited Seats', value: 'limited' },
    { label: 'Sold Out', value: 'sold_out' },
    { label: 'Cancelled', value: 'cancelled' },
  ]

  ngOnInit(): void {
    this.facade.loadAll()
  }

  async onSaveDeparture(dto: any): Promise<void> {
    if (this.facade.drawerMode() === 'add') {
      const ok = await this.facade.create(dto)
      if (ok) {
        toast.success('Departure Scheduled', {
          description: `Tour departure "${dto.departureCode}" created successfully.`,
        })
      }
    } else if (this.facade.drawerMode() === 'edit' && this.facade.selected()) {
      const ok = await this.facade.update(this.facade.selected()!.id, dto)
      if (ok) {
        toast.success('Departure Updated', {
          description: `Departure "${dto.departureCode}" saved.`,
        })
      }
    }
  }

  async onConfirmDelete(): Promise<void> {
    const id = this.facade.deleteConfirmId()
    if (id) {
      const ok = await this.facade.remove(id)
      if (ok) {
        toast.success('Departure Cancelled and Removed')
      }
    }
  }

  exportAllCsv(): void {
    this.exportService.exportToCsv('departures-schedule', this.facade.items(), [
      { header: 'Departure Code', accessor: d => d.departureCode },
      { header: 'Package Title', accessor: d => d.packageTitle || '' },
      { header: 'Destination', accessor: d => d.destination || '' },
      { header: 'Start Date', accessor: d => d.startDate },
      { header: 'End Date', accessor: d => d.endDate },
      { header: 'Capacity', accessor: d => d.capacity },
      { header: 'Booked Seats', accessor: d => d.bookedCount },
      { header: 'Available Seats', accessor: d => d.availableCount },
      { header: 'Assigned Guide', accessor: d => d.assignedGuideName || 'Unassigned' },
      { header: 'Price Override ($)', accessor: d => d.priceOverride || '' },
      { header: 'Status', accessor: d => d.status },
      { header: 'Meeting Point', accessor: d => d.meetingPoint || '' },
    ])
    toast.success('Departures schedule CSV exported')
  }
}
