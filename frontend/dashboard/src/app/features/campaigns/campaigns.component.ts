import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideTag,
  lucidePlus,
  lucideSearch,
  lucideDownload,
  lucideTrendingUp,
  lucideCheckCircle2,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { CampaignsFacade } from './data-access/campaigns.facade'
import { CampaignsTableComponent } from './ui/campaigns-table.component'
import { CampaignsFormComponent } from './ui/campaigns-form.component'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmSheetImports } from '../../ui/sheet/hlm-sheet.components'
import { HlmDialogImports } from '../../ui/dialog/hlm-dialog.components'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { ExportService } from '../../core/services/export.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-campaigns',
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
    CampaignsTableComponent,
    CampaignsFormComponent,
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucideTag,
      lucidePlus,
      lucideSearch,
      lucideDownload,
      lucideTrendingUp,
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
              <ng-icon name="lucideTag" class="size-4.5" />
            </div>
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-foreground">Promotions & Discount Coupons</h1>
              <p class="text-xs text-muted-foreground mt-0.5">
                Manage promotional discount codes, minimum order requirements, redemption caps, and expiration schedules.
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="exportCouponsCsv()"
            class="gap-1.5 cursor-pointer shadow-xs text-xs"
          >
            <ng-icon name="lucideDownload" class="size-3.5" />
            <span>Export Coupons CSV</span>
          </button>

          <button
            hlmBtn
            variant="default"
            size="sm"
            (click)="facade.openAddDrawer()"
            class="gap-1.5 cursor-pointer shadow-xs text-xs"
          >
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>New Promo Code</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Total Redemptions</span>
            <ng-icon name="lucideTrendingUp" class="size-4 text-emerald-500" />
          </div>
          <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ facade.totalRedemptions() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Times coupons applied</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Active Coupons</span>
            <ng-icon name="lucideCheckCircle2" class="size-4 text-primary" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            {{ facade.activeCouponsCount() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Currently redeemable</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Total Promo Campaigns</span>
            <ng-icon name="lucideTag" class="size-4 text-purple-500" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            {{ facade.allItems().length }}
          </div>
          <p class="text-[10px] text-muted-foreground">Vouchers configured</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Conversion Incentive</span>
            <ng-icon name="lucideCheckCircle2" class="size-4 text-blue-500" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            15% Avg
          </div>
          <p class="text-[10px] text-muted-foreground">Effective discount tier</p>
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
            placeholder="Search code, campaign name, discount type..."
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

      <!-- Coupons Table -->
      <app-campaigns-table
        [items]="facade.items()"
        [isLoading]="facade.isLoading()"
        (toggleActive)="onToggleActive($event)"
        (editClick)="facade.openEditDrawer($event)"
        (deleteClick)="facade.requestDelete($event)"
      />
    </app-main>

    <!-- Create / Edit Slide-over Drawer -->
    <hlm-sheet [isOpen]="facade.drawerMode() === 'add' || facade.drawerMode() === 'edit'" (closed)="facade.closeDrawer()" sheetSize="md" side="right">
      <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div class="pb-3 border-b border-border/40 mb-4">
            <h3 class="text-base font-bold text-foreground">
              {{ facade.drawerMode() === 'add' ? 'Create Promo Coupon' : 'Edit Coupon Rules' }}
            </h3>
            <p class="text-xs text-muted-foreground mt-0.5">
              Set discount rates, order qualification thresholds, redemptions limit, and cost funder.
            </p>
          </div>

          <app-campaigns-form
            [initialValue]="facade.selected()"
            [isEdit]="facade.drawerMode() === 'edit'"
            (save)="onSaveCoupon($event)"
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
          <h3 class="text-base font-bold">Delete Promo Coupon?</h3>
        </div>
        <p class="text-muted-foreground">
          Are you sure you want to permanently revoke this voucher code? Travelers will no longer be able to apply it at checkout.
        </p>
        <div class="flex items-center justify-end gap-2 pt-2">
          <button hlmBtn variant="outline" size="sm" (click)="facade.cancelDelete()" class="cursor-pointer">
            Cancel
          </button>
          <button hlmBtn variant="destructive" size="sm" (click)="onConfirmDelete()" class="cursor-pointer">
            Delete Coupon
          </button>
        </div>
      </div>
    </hlm-dialog>
  `,
})
export class CampaignsComponent implements OnInit {
  readonly facade = inject(CampaignsFacade)
  private readonly exportService = inject(ExportService)

  readonly statusTabs = [
    { label: 'All Coupons', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Expired', value: 'expired' },
  ]

  ngOnInit(): void {
    this.facade.loadAll()
  }

  async onSaveCoupon(dto: any): Promise<void> {
    if (this.facade.drawerMode() === 'add') {
      const ok = await this.facade.create(dto)
      if (ok) {
        toast.success('Promo Code Created', {
          description: `Voucher "${dto.code}" is ready for traveler checkout.`,
        })
      }
    } else if (this.facade.drawerMode() === 'edit' && this.facade.selected()) {
      const ok = await this.facade.update(this.facade.selected()!.id, dto)
      if (ok) {
        toast.success('Coupon Updated', {
          description: `Rules for "${dto.code}" saved.`,
        })
      }
    }
  }

  async onToggleActive(id: string): Promise<void> {
    const ok = await this.facade.toggleStatus(id)
    if (ok) {
      toast.success('Coupon Status Toggled')
    }
  }

  async onConfirmDelete(): Promise<void> {
    const id = this.facade.deleteConfirmId()
    if (id) {
      const ok = await this.facade.remove(id)
      if (ok) {
        toast.success('Coupon Revoked and Deleted')
      }
    }
  }

  exportCouponsCsv(): void {
    this.exportService.exportToCsv('promo-coupons-campaigns', this.facade.items(), [
      { header: 'Coupon Code', accessor: c => c.code },
      { header: 'Description', accessor: c => c.description || '' },
      { header: 'Discount Type', accessor: c => c.discountType },
      { header: 'Discount Value', accessor: c => c.discountValue },
      { header: 'Times Used', accessor: c => c.usedCount },
      { header: 'Max Cap', accessor: c => c.maxUses || 'Unlimited' },
      { header: 'Min Booking Value ($)', accessor: c => c.minBookingValue || 'None' },
      { header: 'Max Discount ($)', accessor: c => c.maxDiscount || 'None' },
      { header: 'Funder', accessor: c => c.funder },
      { header: 'Status', accessor: c => c.status },
      { header: 'Expiry Date', accessor: c => c.expiresAt || 'No Expiry' },
    ])
    toast.success('Coupons CSV exported')
  }
}
