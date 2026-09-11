import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucidePlus,
  lucideSearch,
  lucideFilter,
  lucideDownload,
  lucidePackage,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { PackagesFacade } from '../data-access/packages.facade'
import { PackagesTableComponent } from './packages-table.component'
import { PackagesFormComponent } from './packages-form.component'
import { PackagesDetailComponent } from './packages-detail.component'
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
  selector: 'app-packages-page',
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
    PackagesTableComponent,
    PackagesFormComponent,
    PackagesDetailComponent,
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
      lucideDownload,
      lucidePackage,
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
            <h1 class="text-2xl font-bold tracking-tight">Packages & Tours</h1>
            <span hlmBadge variant="outline" class="text-xs">
              {{ facade.allItems().length }} Total
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Manage travel inventory, multi-day tours, city activities, and departures.
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
            <span>Create Package</span>
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
            placeholder="Search packages by title or destination..."
            class="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <!-- Status Filter Tabs -->
        <div class="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/40 shrink-0">
          <button
            type="button"
            (click)="facade.setStatusFilter('all')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.activeStatusFilter() === 'all'"
            [class.shadow-2xs]="facade.activeStatusFilter() === 'all'"
            [class.text-foreground]="facade.activeStatusFilter() === 'all'"
            [class.text-muted-foreground]="facade.activeStatusFilter() !== 'all'"
          >
            All
          </button>
          <button
            type="button"
            (click)="facade.setStatusFilter('published')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.activeStatusFilter() === 'published'"
            [class.shadow-2xs]="facade.activeStatusFilter() === 'published'"
            [class.text-foreground]="facade.activeStatusFilter() === 'published'"
            [class.text-muted-foreground]="facade.activeStatusFilter() !== 'published'"
          >
            Published
          </button>
          <button
            type="button"
            (click)="facade.setStatusFilter('under_review')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.activeStatusFilter() === 'under_review'"
            [class.shadow-2xs]="facade.activeStatusFilter() === 'under_review'"
            [class.text-foreground]="facade.activeStatusFilter() === 'under_review'"
            [class.text-muted-foreground]="facade.activeStatusFilter() !== 'under_review'"
          >
            Under Review
          </button>
          <button
            type="button"
            (click)="facade.setStatusFilter('draft')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.activeStatusFilter() === 'draft'"
            [class.shadow-2xs]="facade.activeStatusFilter() === 'draft'"
            [class.text-foreground]="facade.activeStatusFilter() === 'draft'"
            [class.text-muted-foreground]="facade.activeStatusFilter() !== 'draft'"
          >
            Draft
          </button>
        </div>
      </div>

      <!-- Packages Table -->
      <app-packages-table
        [rows]="facade.items()"
        [isLoading]="facade.isLoading()"
        (viewClicked)="facade.openDetailDrawer($event)"
        (editClicked)="facade.openEditDrawer($event)"
        (deleteClicked)="facade.requestDeleteConfirm($event)"
      />

      <!-- Right Drawer for Create / Edit -->
      <hlm-sheet
        [isOpen]="facade.drawerMode() === 'add' || facade.drawerMode() === 'edit'"
        (closed)="facade.closeDrawer()"
        sheetSize="md"
        side="right"
      >
        <div class="h-full flex flex-col justify-between p-6">
          <div>
            <div class="pb-4 border-b border-border/40">
              <h3 class="text-lg font-bold text-foreground">
                {{ facade.drawerMode() === 'add' ? 'Create Travel Package' : 'Edit Travel Package' }}
              </h3>
              <p class="text-xs text-muted-foreground mt-0.5">
                {{ facade.drawerMode() === 'add' ? 'Add a new experience, pricing, and itinerary.' : 'Update listing specifications and details.' }}
              </p>
            </div>

            <app-packages-form
              [initialValue]="facade.selected()"
              [isLoading]="facade.isLoading()"
              (formSubmit)="onFormSubmit($event)"
              (cancel)="facade.closeDrawer()"
            />
          </div>
        </div>
      </hlm-sheet>

      <!-- Right Drawer for Details Inspection -->
      <hlm-sheet
        [isOpen]="facade.drawerMode() === 'detail'"
        (closed)="facade.closeDrawer()"
        sheetSize="md"
        side="right"
      >
        <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
          <div>
            <div class="pb-3 border-b border-border/40 mb-3">
              <h3 class="text-lg font-bold text-foreground">Package Dossier</h3>
              <p class="text-xs text-muted-foreground">Detailed specifications, inclusions, and statistics.</p>
            </div>

            <app-packages-detail [package]="facade.selected()" />
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
              (click)="facade.openEditDrawer(facade.selected()!.id)"
            >
              Edit Package
            </button>
          </div>
        </div>
      </hlm-sheet>

      <!-- Delete Confirmation Dialog -->
      @if (facade.deleteConfirmId()) {
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="bg-card border border-border rounded-xl p-5 max-w-md w-full shadow-lg space-y-4 animate-in fade-in-0 zoom-in-95">
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                <ng-icon name="lucideAlertTriangle" class="size-5" />
              </div>
              <div>
                <h4 class="text-base font-bold text-foreground">Delete Travel Package?</h4>
                <p class="text-xs text-muted-foreground">
                  This will remove the package from the marketplace and cancel unconfirmed departures.
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
                Cancel
              </button>
              <button
                hlmBtn
                variant="destructive"
                size="sm"
                (click)="confirmDelete()"
              >
                Delete Package
              </button>
            </div>
          </div>
        </div>
      }
    </app-main>
  `,
})
export class PackagesPageComponent implements OnInit {
  protected readonly facade = inject(PackagesFacade)

  ngOnInit(): void {
    this.facade.loadAll()
  }

  async onFormSubmit(dto: any): Promise<void> {
    if (this.facade.drawerMode() === 'add') {
      const ok = await this.facade.create(dto)
      if (ok) {
        toast.success('Package Created', {
          description: `"${dto.title}" has been successfully added to inventory.`,
        })
      }
    } else if (this.facade.drawerMode() === 'edit' && this.facade.selected()) {
      const ok = await this.facade.update(this.facade.selected()!.id, dto)
      if (ok) {
        toast.success('Package Updated', {
          description: 'The travel package details have been saved.',
        })
      }
    }
  }

  async confirmDelete(): Promise<void> {
    const id = this.facade.deleteConfirmId()
    if (id) {
      const ok = await this.facade.remove(id)
      if (ok) {
        toast.success('Package Removed', {
          description: 'The travel package has been removed from inventory.',
        })
      }
    }
  }
}
