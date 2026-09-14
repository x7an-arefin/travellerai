import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideStar,
  lucideSearch,
  lucideDownload,
  lucideMessageSquare,
  lucideShieldCheck,
  lucideShieldAlert,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { ReviewsFacade } from '../data-access/reviews.facade'
import { ReviewsTableComponent } from './reviews-table.component'
import { ReviewResponseDrawerComponent } from './review-response-drawer.component'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmSheetImports } from '../../../ui/sheet/hlm-sheet.components'
import { HlmDialogImports } from '../../../ui/dialog/hlm-dialog.components'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { ExportService } from '../../../core/services/export.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-reviews-page',
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
    ReviewsTableComponent,
    ReviewResponseDrawerComponent,
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmBadgeImports,
    ...HlmButtonImports,
  ],
  providers: [
    provideIcons({
      lucideStar,
      lucideSearch,
      lucideDownload,
      lucideMessageSquare,
      lucideShieldCheck,
      lucideShieldAlert,
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
    <app-main [fixed]="true" class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2.5">
            <div class="size-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <ng-icon name="lucideStar" class="size-4.5" />
            </div>
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-foreground">Verified Reviews & Ratings</h1>
              <p class="text-xs text-muted-foreground mt-0.5">
                Authentic traveler feedback, departure experience ratings, moderation queue, and official operator replies.
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="exportReviewsCsv()"
            class="gap-1.5 cursor-pointer shadow-xs text-xs"
          >
            <ng-icon name="lucideDownload" class="size-3.5" />
            <span>Export Sentiment CSV</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Marketplace Average</span>
            <ng-icon name="lucideStar" class="size-4 text-amber-500" />
          </div>
          <div class="text-2xl font-bold text-foreground flex items-center gap-1.5">
            <span>{{ facade.averageRating() }}</span>
            <span class="text-xs font-normal text-muted-foreground">/ 5.0</span>
          </div>
          <p class="text-[10px] text-muted-foreground">Weighted customer rating</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Published Reviews</span>
            <ng-icon name="lucideShieldCheck" class="size-4 text-emerald-500" />
          </div>
          <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ facade.totalPublished() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Public on listing pages</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Flagged for Moderation</span>
            <ng-icon name="lucideShieldAlert" class="size-4 text-rose-500" />
          </div>
          <div class="text-2xl font-bold text-rose-600 dark:text-rose-400">
            {{ facade.totalFlagged() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Awaiting admin review</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Total Reviews</span>
            <ng-icon name="lucideMessageSquare" class="size-4 text-purple-500" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            {{ facade.allItems().length }}
          </div>
          <p class="text-[10px] text-muted-foreground">All verified submissions</p>
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
            placeholder="Search traveler, tour title, keywords in comments..."
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

      <!-- Reviews Table -->
      <app-reviews-table
        [items]="facade.items()"
        [isLoading]="facade.isLoading()"
        (replyClick)="facade.openReplyDrawer($event)"
        (statusChange)="onStatusChange($event)"
        (deleteClick)="facade.requestDelete($event)"
      />
    </app-main>

    <!-- Reply / Response Slide-over Drawer -->
    <hlm-sheet [isOpen]="facade.drawerMode() === 'reply'" (closed)="facade.closeDrawer()" sheetSize="md" side="right">
      <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div class="pb-3 border-b border-border/40 mb-4">
            <h3 class="text-base font-bold text-foreground">Official Operator Response</h3>
            <p class="text-xs text-muted-foreground mt-0.5">
              Draft and publish a verified public response to this traveler's verified review.
            </p>
          </div>

          <app-review-response-drawer
            [review]="facade.selected()"
            (saveResponse)="onSaveResponse($event)"
            (cancel)="facade.closeDrawer()"
          />
        </div>
      </div>
    </hlm-sheet>

    <!-- Delete Confirmation Modal -->
    <hlm-dialog [isOpen]="!!facade.deleteConfirmId()" (closed)="facade.cancelDelete()">
      <div class="space-y-4 text-xs">
        <div class="flex items-center gap-2 text-destructive">
          <ng-icon name="lucideAlertTriangle" class="size-5" />
          <h3 class="text-base font-bold">Remove Traveler Review?</h3>
        </div>
        <p class="text-muted-foreground">
          Are you sure you want to permanently delete this review? This action cannot be undone and will recalculate the package's aggregate rating.
        </p>
        <div class="flex items-center justify-end gap-2 pt-2">
          <button hlmBtn variant="outline" size="sm" (click)="facade.cancelDelete()" class="cursor-pointer">
            Cancel
          </button>
          <button hlmBtn variant="destructive" size="sm" (click)="onConfirmDelete()" class="cursor-pointer">
            Delete Review
          </button>
        </div>
      </div>
    </hlm-dialog>
  `,
})
export class ReviewsPageComponent implements OnInit {
  readonly facade = inject(ReviewsFacade)
  private readonly exportService = inject(ExportService)

  readonly statusTabs = [
    { label: 'All Reviews', value: 'all' },
    { label: 'Published', value: 'published' },
    { label: 'Submitted', value: 'submitted' },
    { label: 'Flagged', value: 'flagged' },
  ]

  ngOnInit(): void {
    this.facade.loadAll()
  }

  async onStatusChange(evt: { id: string; status: any }): Promise<void> {
    const ok = await this.facade.updateStatus(evt.id, { status: evt.status })
    if (ok) {
      toast.success('Review Status Updated', {
        description: `Review is now marked as "${evt.status}".`,
      })
    }
  }

  async onSaveResponse(evt: { reviewId: string; providerId: string; responseText: string }): Promise<void> {
    const ok = await this.facade.submitResponse(evt)
    if (ok) {
      toast.success('Operator Response Published', {
        description: 'Your response is now visible on the public tour listing page.',
      })
    }
  }

  async onConfirmDelete(): Promise<void> {
    const id = this.facade.deleteConfirmId()
    if (id) {
      const ok = await this.facade.remove(id)
      if (ok) {
        toast.success('Review Deleted')
      }
    }
  }

  exportReviewsCsv(): void {
    this.exportService.exportToCsv('traveler-reviews-sentiment', this.facade.items(), [
      { header: 'Review ID', accessor: r => r.id },
      { header: 'Traveler Name', accessor: r => r.travelerName },
      { header: 'Tour Package', accessor: r => r.packageTitle },
      { header: 'Provider', accessor: r => r.providerName || '' },
      { header: 'Overall Rating (1-5)', accessor: r => r.overallRating },
      { header: 'Review Title', accessor: r => r.title },
      { header: 'Review Content', accessor: r => r.content },
      { header: 'Verified Booking', accessor: r => r.isVerifiedBooking ? 'Yes' : 'No' },
      { header: 'Operator Replied', accessor: r => r.response ? 'Yes' : 'No' },
      { header: 'Operator Response', accessor: r => r.response?.responseText || '' },
      { header: 'Status', accessor: r => r.status },
      { header: 'Date', accessor: r => r.createdAt },
    ])
    toast.success('Reviews sentiment CSV exported')
  }
}
