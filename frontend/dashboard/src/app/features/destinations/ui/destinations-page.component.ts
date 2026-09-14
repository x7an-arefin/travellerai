import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucidePlus,
  lucideSearch,
  lucideFilter,
  lucideMapPin,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { DestinationsFacade } from '../data-access/destinations.facade'
import { DestinationsTableComponent } from './destinations-table.component'
import { DestinationsFormComponent } from './destinations-form.component'
import { DestinationsDetailComponent } from './destinations-detail.component'
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

@Component({
  selector: 'app-destinations-page',
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
    DestinationsTableComponent,
    DestinationsFormComponent,
    DestinationsDetailComponent,
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucidePlus,
      lucideSearch,
      lucideFilter,
      lucideMapPin,
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
            <h1 class="text-2xl font-bold tracking-tight">Destinations Hub</h1>
            <span hlmBadge variant="outline" class="text-xs">
              {{ facade.allItems().length }} Regions
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Manage global travel destinations, country hubs, regional guidelines, and package associations.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="default"
            size="sm"
            class="gap-1.5 cursor-pointer h-9 shadow-xs"
            (click)="facade.openAddDrawer()"
          >
            <ng-icon name="lucidePlus" class="size-4" />
            <span>Add Destination</span>
          </button>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative w-full sm:w-72">
          <ng-icon
            name="lucideSearch"
            class="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search by country, region, or name..."
            [ngModel]="facade.searchQuery()"
            (ngModelChange)="facade.setSearchQuery($event)"
            class="w-full rounded-md border border-input bg-card pl-8.5 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <!-- Status Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          @for (tab of statusTabs; track tab.value) {
            <button
              hlmBtn
              [variant]="facade.statusFilter() === tab.value ? 'default' : 'ghost'"
              size="sm"
              class="h-7 text-xs px-2.5 rounded-lg cursor-pointer"
              (click)="facade.setStatusFilter(tab.value)"
            >
              {{ tab.label }}
            </button>
          }
        </div>
      </div>

      <!-- Table Section -->
      <app-destinations-table
        [items]="facade.items()"
        [isLoading]="facade.isLoading()"
        (view)="facade.openDetailDrawer($event)"
        (edit)="facade.openEditDrawer($event)"
        (delete)="facade.requestDeleteConfirm($event)"
      />
    </app-main>

    <!-- Slide-over Drawer for Add/Edit/Detail -->
    <hlm-sheet [isOpen]="facade.isDrawerOpen()" (closed)="facade.closeDrawer()" sheetSize="md" side="right">
      <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div class="pb-3 border-b border-border/40 mb-4">
            <h3 class="text-base font-bold text-foreground">
              @if (facade.drawerMode() === 'add') {
                Register New Destination
              } @else if (facade.drawerMode() === 'edit') {
                Edit Destination Hub
              } @else {
                Destination Profile
              }
            </h3>
            <p class="text-xs text-muted-foreground mt-0.5">
              @if (facade.drawerMode() === 'add') {
                Fill in destination parameters, coordinates, guide details, and SEO metadata.
              } @else if (facade.drawerMode() === 'edit') {
                Update regional insights, weather info, and visibility settings.
              } @else {
                Overview of regional inventory and practical travel guidance.
              }
            </p>
          </div>

          <!-- Dynamic Drawer Body -->
          <div class="py-2">
            @if (facade.drawerMode() === 'add') {
              <app-destinations-form
                [isEdit]="false"
                (save)="onSave($event)"
                (cancel)="facade.closeDrawer()"
              />
            } @else if (facade.drawerMode() === 'edit') {
              <app-destinations-form
                [isEdit]="true"
                [destination]="facade.selected()"
                (save)="onSave($event)"
                (cancel)="facade.closeDrawer()"
              />
            } @else if (facade.drawerMode() === 'detail') {
              <app-destinations-detail [destination]="facade.selected()" />
            }
          </div>
        </div>
      </div>
    </hlm-sheet>

    <!-- Delete Confirmation Dialog -->
    <hlm-dialog [isOpen]="!!facade.deleteConfirmId()" (closed)="facade.cancelDelete()">
      <div class="space-y-4">
        <div class="flex items-center gap-2 text-destructive">
          <ng-icon name="lucideAlertTriangle" class="size-5" />
          <h3 class="text-base font-bold">Delete Destination?</h3>
        </div>
        <p class="text-xs text-muted-foreground">
          Are you sure you want to remove this destination hub? Packages linked to this destination may need reassignment.
        </p>
        <div class="flex items-center justify-end gap-2 pt-2">
          <button hlmBtn variant="outline" size="sm" (click)="facade.cancelDelete()" class="cursor-pointer">
            Cancel
          </button>
          <button hlmBtn variant="destructive" size="sm" (click)="onConfirmDelete()" class="cursor-pointer">
            Delete Destination
          </button>
        </div>
      </div>
    </hlm-dialog>
  `,
})
export class DestinationsPageComponent implements OnInit {
  readonly facade = inject(DestinationsFacade)

  readonly statusTabs = [
    { label: 'All Destinations', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Draft', value: 'draft' },
    { label: 'Inactive', value: 'inactive' },
  ]

  ngOnInit(): void {
    this.facade.loadAll()
  }

  async onSave(dto: any): Promise<void> {
    if (this.facade.drawerMode() === 'add') {
      const ok = await this.facade.create(dto)
      if (ok) toast.success('Destination registered successfully!')
      else toast.error('Failed to register destination.')
    } else if (this.facade.drawerMode() === 'edit') {
      const id = this.facade.selected()?.id
      if (id) {
        const ok = await this.facade.update(id, dto)
        if (ok) toast.success('Destination updated successfully!')
        else toast.error('Failed to update destination.')
      }
    }
  }

  async onConfirmDelete(): Promise<void> {
    const id = this.facade.deleteConfirmId()
    if (id) {
      const ok = await this.facade.remove(id)
      if (ok) toast.success('Destination deleted.')
      else toast.error('Failed to delete destination.')
    }
  }
}
