import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucidePlus,
  lucideSearch,
  lucideBuilding2,
  lucideShieldCheck,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { ProvidersFacade } from '../data-access/providers.facade'
import { ProvidersTableComponent } from './providers-table.component'
import { ProvidersDetailComponent } from './providers-detail.component'
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
  selector: 'app-providers-page',
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
    ProvidersTableComponent,
    ProvidersDetailComponent,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucidePlus,
      lucideSearch,
      lucideBuilding2,
      lucideShieldCheck,
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
            <h1 class="text-2xl font-bold tracking-tight">Travel Providers & Agencies</h1>
            <span hlmBadge variant="outline" class="text-xs">
              {{ facade.allItems().length }} Registered
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Onboard independent travel agencies, tour operators, and verify business compliance documents.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="default"
            size="sm"
            class="gap-1.5 cursor-pointer h-9 shadow-xs"
            (click)="onAddProviderClick()"
          >
            <ng-icon name="lucidePlus" class="size-4" />
            <span>Onboard Provider</span>
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
            placeholder="Search providers by name, country or email..."
            class="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <!-- KYC Status Filter Tabs -->
        <div class="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/40 shrink-0">
          <button
            type="button"
            (click)="facade.setKycFilter('all')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.kycFilter() === 'all'"
            [class.shadow-2xs]="facade.kycFilter() === 'all'"
            [class.text-foreground]="facade.kycFilter() === 'all'"
            [class.text-muted-foreground]="facade.kycFilter() !== 'all'"
          >
            All Providers
          </button>
          <button
            type="button"
            (click)="facade.setKycFilter('approved')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.kycFilter() === 'approved'"
            [class.shadow-2xs]="facade.kycFilter() === 'approved'"
            [class.text-foreground]="facade.kycFilter() === 'approved'"
            [class.text-muted-foreground]="facade.kycFilter() !== 'approved'"
          >
            Verified Only
          </button>
          <button
            type="button"
            (click)="facade.setKycFilter('under_review')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="facade.kycFilter() === 'under_review'"
            [class.shadow-2xs]="facade.kycFilter() === 'under_review'"
            [class.text-foreground]="facade.kycFilter() === 'under_review'"
            [class.text-muted-foreground]="facade.kycFilter() !== 'under_review'"
          >
            Pending Review
          </button>
        </div>
      </div>

      <!-- Providers Table -->
      <app-providers-table
        [rows]="facade.items()"
        [isLoading]="facade.isLoading()"
        (viewClicked)="facade.openDetailDrawer($event)"
        (editClicked)="facade.openEditDrawer($event)"
      />

      <!-- Right Drawer for Details & KYC Approval -->
      <hlm-sheet
        [isOpen]="facade.drawerMode() === 'detail'"
        (closed)="facade.closeDrawer()"
        sheetSize="md"
        side="right"
      >
        <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
          <div>
            <div class="pb-3 border-b border-border/40 mb-3">
              <h3 class="text-lg font-bold text-foreground">Provider Dossier & Verification</h3>
              <p class="text-xs text-muted-foreground">Business license, legal entity records, and payout parameters.</p>
            </div>

            <app-providers-detail
              [provider]="facade.selected()"
              (approveKyc)="onApproveKyc($event)"
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
          </div>
        </div>
      </hlm-sheet>
    </app-main>
  `,
})
export class ProvidersPageComponent implements OnInit {
  protected readonly facade = inject(ProvidersFacade)

  ngOnInit(): void {
    this.facade.loadAll()
  }

  onAddProviderClick(): void {
    this.facade.openAddDrawer()
  }


  async onApproveKyc(id: string): Promise<void> {
    const ok = await this.facade.update(id, {
      kycStatus: 'approved',
      approvalStatus: 'approved',
      verifiedBadge: true,
      isWithdrawalRestricted: false,
      riskLevel: 'low',
    })
    if (ok) {
      toast.success('KYC Approved', {
        description: 'The travel provider has been verified and withdrawal restrictions lifted.',
      })
      this.facade.closeDrawer()
    }
  }
}
