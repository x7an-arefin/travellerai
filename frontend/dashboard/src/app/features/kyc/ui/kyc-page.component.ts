import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideShieldCheck,
  lucideShieldAlert,
  lucideFileText,
  lucideSearch,
  lucideDownload,
  lucideCheckCircle2,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { KycFacade } from '../data-access/kyc.facade'
import { KycTableComponent } from './kyc-table.component'
import { KycReviewModalComponent } from './kyc-review-modal.component'
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
  selector: 'app-kyc-page',
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
    KycTableComponent,
    KycReviewModalComponent,
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucideShieldCheck,
      lucideShieldAlert,
      lucideFileText,
      lucideSearch,
      lucideDownload,
      lucideCheckCircle2,
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
            <div class="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ng-icon name="lucideShieldCheck" class="size-4.5" />
            </div>
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-foreground">KYC & Compliance Verification</h1>
              <p class="text-xs text-muted-foreground mt-0.5">
                Audit trade licenses, commercial liability insurances, guide certifications, and official operator registries.
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="exportComplianceCsv()"
            class="gap-1.5 cursor-pointer shadow-xs text-xs"
          >
            <ng-icon name="lucideDownload" class="size-3.5" />
            <span>Export Compliance CSV</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Pending Review</span>
            <ng-icon name="lucideAlertTriangle" class="size-4 text-amber-500" />
          </div>
          <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {{ facade.pendingReviewCount() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Action required by compliance desk</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Approved Documents</span>
            <ng-icon name="lucideCheckCircle2" class="size-4 text-emerald-500" />
          </div>
          <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ facade.approvedCount() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Legally verified & active</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Rejected</span>
            <ng-icon name="lucideShieldAlert" class="size-4 text-rose-500" />
          </div>
          <div class="text-2xl font-bold text-rose-600 dark:text-rose-400">
            {{ facade.rejectedCount() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Requires operator re-submission</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Total Documents</span>
            <ng-icon name="lucideFileText" class="size-4 text-purple-500" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            {{ facade.allItems().length }}
          </div>
          <p class="text-[10px] text-muted-foreground">In legal audit repository</p>
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
            placeholder="Search provider, document type, license #, file name..."
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

      <!-- KYC Documents Table -->
      <app-kyc-table
        [items]="facade.items()"
        [isLoading]="facade.isLoading()"
        (reviewClick)="facade.openReviewDrawer($event)"
        (deleteClick)="facade.requestDelete($event)"
      />
    </app-main>

    <!-- Document Review Slide-over Drawer -->
    <hlm-sheet [isOpen]="facade.drawerMode() === 'review'" (closed)="facade.closeDrawer()" sheetSize="md" side="right">
      <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div class="pb-3 border-b border-border/40 mb-4">
            <h3 class="text-base font-bold text-foreground">Inspect Compliance Document</h3>
            <p class="text-xs text-muted-foreground mt-0.5">
              Verify legal credentials, check regulatory registries, and issue approval or rejection decisions.
            </p>
          </div>

          <app-kyc-review-modal
            [document]="facade.selected()"
            (decide)="onReviewDecision($event)"
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
          <h3 class="text-base font-bold">Remove Compliance Document?</h3>
        </div>
        <p class="text-muted-foreground">
          Are you sure you want to remove this document from the compliance archive?
        </p>
        <div class="flex items-center justify-end gap-2 pt-2">
          <button hlmBtn variant="outline" size="sm" (click)="facade.cancelDelete()" class="cursor-pointer">
            Cancel
          </button>
          <button hlmBtn variant="destructive" size="sm" (click)="onConfirmDelete()" class="cursor-pointer">
            Delete Document
          </button>
        </div>
      </div>
    </hlm-dialog>
  `,
})
export class KycPageComponent implements OnInit {
  readonly facade = inject(KycFacade)
  private readonly exportService = inject(ExportService)

  readonly statusTabs = [
    { label: 'All Documents', value: 'all' },
    { label: 'Under Review', value: 'under_review' },
    { label: 'Submitted', value: 'submitted' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
  ]

  ngOnInit(): void {
    this.facade.loadAll()
  }

  async onReviewDecision(evt: { id: string; status: 'approved' | 'rejected'; reviewNotes: string }): Promise<void> {
    const ok = await this.facade.reviewDocument(evt.id, {
      status: evt.status,
      reviewNotes: evt.reviewNotes,
    })
    if (ok) {
      toast.success(`Document ${evt.status === 'approved' ? 'Approved' : 'Rejected'}`, {
        description: `Compliance decision logged: ${evt.reviewNotes}`,
      })
    }
  }

  async onConfirmDelete(): Promise<void> {
    const id = this.facade.deleteConfirmId()
    if (id) {
      const ok = await this.facade.remove(id)
      if (ok) {
        toast.success('Document Removed')
      }
    }
  }

  exportComplianceCsv(): void {
    this.exportService.exportToCsv('kyc-compliance-audit', this.facade.items(), [
      { header: 'Document ID', accessor: d => d.id },
      { header: 'Provider Name', accessor: d => d.providerName || '' },
      { header: 'Provider Email', accessor: d => d.providerEmail || '' },
      { header: 'Document Type', accessor: d => d.documentType },
      { header: 'Document Number', accessor: d => d.documentNumber || '' },
      { header: 'File Name', accessor: d => d.fileName || '' },
      { header: 'File URL', accessor: d => d.fileUrl },
      { header: 'Expiry Date', accessor: d => d.expiryDate || 'N/A' },
      { header: 'Status', accessor: d => d.status },
      { header: 'Audited By', accessor: d => d.reviewedByName || '' },
      { header: 'Review Notes', accessor: d => d.reviewNotes || '' },
      { header: 'Date Uploaded', accessor: d => d.createdAt },
    ])
    toast.success('Compliance audit CSV exported')
  }
}
