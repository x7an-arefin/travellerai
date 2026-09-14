import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucidePlus,
  lucideSearch,
  lucideMessagesSquare,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { InquiriesFacade } from '../data-access/inquiries.facade'
import { InquiriesTableComponent } from './inquiries-table.component'
import { QuotationFormComponent } from './quotation-form.component'
import { InquiriesDetailComponent } from './inquiries-detail.component'
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
  selector: 'app-inquiries-page',
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
    InquiriesTableComponent,
    QuotationFormComponent,
    InquiriesDetailComponent,
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucidePlus,
      lucideSearch,
      lucideMessagesSquare,
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
            <h1 class="text-2xl font-bold tracking-tight">Trip Inquiries & Custom Quotes</h1>
            <span hlmBadge variant="outline" class="text-xs">
              {{ facade.allItems().length }} Requests
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Manage bespoke traveler trip inquiries, tailor itinerary quotations, and convert proposals to bookings.
          </p>
        </div>
      </div>

      <!-- Filters Toolbar -->
      <div class="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative w-full sm:w-72">
          <ng-icon
            name="lucideSearch"
            class="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search traveler, email, or destination..."
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
      <app-inquiries-table
        [items]="facade.items()"
        [isLoading]="facade.isLoading()"
        (view)="facade.openDetailDrawer($event)"
        (quote)="facade.openQuoteDrawer($event)"
        (delete)="facade.requestDeleteConfirm($event)"
      />
    </app-main>

    <!-- Slide-over Drawer for Quote/Detail -->
    <hlm-sheet [isOpen]="facade.isDrawerOpen()" (closed)="facade.closeDrawer()" sheetSize="md" side="right">
      <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div class="pb-3 border-b border-border/40 mb-4">
            <h3 class="text-base font-bold text-foreground">
              {{ facade.drawerMode() === 'quote' ? 'Prepare Custom Quotation' : 'Trip Inquiry Dossier' }}
            </h3>
            <p class="text-xs text-muted-foreground mt-0.5">
              {{ facade.drawerMode() === 'quote' ? 'Submit an itemized bespoke quotation proposal to the client.' : 'Review traveler requests, group preferences, and quote history.' }}
            </p>
          </div>

          <div class="py-2">
            @if (facade.drawerMode() === 'quote') {
              <app-quotation-form
                [inquiry]="facade.selected()"
                (submitQuote)="onSubmitQuote($event)"
                (cancel)="facade.closeDrawer()"
              />
            } @else if (facade.drawerMode() === 'detail') {
              <app-inquiries-detail
                [inquiry]="facade.selected()"
                (quote)="facade.openQuoteDrawer($event)"
              />
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
          <h3 class="text-base font-bold">Delete Inquiry?</h3>
        </div>
        <p class="text-xs text-muted-foreground">
          Are you sure you want to remove this trip inquiry? Any pending quotations will be invalidated.
        </p>
        <div class="flex items-center justify-end gap-2 pt-2">
          <button hlmBtn variant="outline" size="sm" (click)="facade.cancelDelete()" class="cursor-pointer">
            Cancel
          </button>
          <button hlmBtn variant="destructive" size="sm" (click)="onConfirmDelete()" class="cursor-pointer">
            Delete Inquiry
          </button>
        </div>
      </div>
    </hlm-dialog>
  `,
})
export class InquiriesPageComponent implements OnInit {
  readonly facade = inject(InquiriesFacade)

  readonly statusTabs = [
    { label: 'All Inquiries', value: 'all' },
    { label: 'Open', value: 'open' },
    { label: 'Quoted', value: 'quoted' },
    { label: 'Accepted', value: 'accepted' },
  ]

  ngOnInit(): void {
    this.facade.loadAll()
  }

  async onSubmitQuote(quote: any): Promise<void> {
    const inquiryId = this.facade.selected()?.id
    if (inquiryId) {
      const ok = await this.facade.submitQuotation(inquiryId, quote)
      if (ok) toast.success('Custom quotation submitted to traveler!')
      else toast.error('Failed to submit quotation.')
    }
  }

  async onConfirmDelete(): Promise<void> {
    const id = this.facade.deleteConfirmId()
    if (id) {
      const ok = await this.facade.remove(id)
      if (ok) toast.success('Trip inquiry deleted.')
      else toast.error('Failed to delete inquiry.')
    }
  }
}
