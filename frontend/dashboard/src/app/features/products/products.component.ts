import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideBoxes,
  lucidePackage,
  lucideSearch,
  lucidePlus,
  lucideFilter,
  lucideDownload,
  lucideEdit,
  lucideTrash2,
  lucideEye,
  lucideLayoutGrid,
  lucideList,
  lucideArrowUpDown,
  lucideCheck,
  lucideAlertTriangle,
  lucideTrendingUp,
  lucideDollarSign,
  lucideLayers,
  lucideTag,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmSheetImports } from '../../ui/sheet/hlm-sheet.components'
import { HlmDialogImports } from '../../ui/dialog/hlm-dialog.components'
import { HlmTableImports } from '../../ui/table/hlm-table.components'
import { HlmSelectImports, SelectOption } from '../../ui/select/hlm-select.components'
import { toast } from 'ngx-sonner'

export interface ProductItem {
  id: string
  sku: string
  name: string
  category: string
  price: number
  costPrice: number
  stock: number
  minStock: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  rating: number
  salesCount: number
  image: string
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    SearchComponent,
    ThemeSwitchComponent,
    ConfigDrawerComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmTableImports,
    ...HlmSelectImports,
  ],
  providers: [
    provideIcons({
      lucideBoxes,
      lucidePackage,
      lucideSearch,
      lucidePlus,
      lucideFilter,
      lucideDownload,
      lucideEdit,
      lucideTrash2,
      lucideEye,
      lucideLayoutGrid,
      lucideList,
      lucideArrowUpDown,
      lucideCheck,
      lucideAlertTriangle,
      lucideTrendingUp,
      lucideDollarSign,
      lucideLayers,
      lucideTag,
    }),
  ],
  template: `
    <!-- Top Header -->
    <app-header [fixed]="true">
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-config-drawer />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main Content -->
    <app-main [fixed]="true" class="space-y-6">
      <!-- Title & Actions Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Product & Inventory Hub</h1>
          <p class="text-xs text-muted-foreground">Manage multi-channel product catalog, track stock thresholds, and update pricing.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="exportCatalog()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
            <span>Export CSV</span>
          </button>
          <button hlmBtn size="sm" (click)="openCreateDrawer()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Total Catalog SKUs</span>
          <div class="text-2xl font-bold text-foreground">{{ products().length }} Products</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+12 new this quarter</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Low Stock Warnings</span>
          <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ lowStockCount() }} Items</div>
          <p class="text-[11px] text-amber-600 font-semibold">Requires restock soon</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Total Inventory Value</span>
          <div class="text-2xl font-bold text-foreground">\${{ totalInventoryValue() | number:'1.0-0' }}</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Avg 48.2% gross margin</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Active Categories</span>
          <div class="text-2xl font-bold text-foreground">6 Sectors</div>
          <p class="text-[11px] text-sky-500 font-semibold">100% catalog mapped</p>
        </div>
      </div>

      <!-- Filter Controls & View Switcher -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <!-- Search input -->
          <div class="relative w-full sm:w-64">
            <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Search product, SKU..."
              class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <!-- Category filter -->
          <div class="w-40">
            <hlm-custom-select
              [options]="categoryOptions"
              [ngModel]="selectedCategory()"
              (valueChange)="selectedCategory.set($event)"
              placeholder="All Categories"
            />
          </div>

          <!-- Stock filter -->
          <div class="w-36">
            <hlm-custom-select
              [options]="statusOptions"
              [ngModel]="selectedStatus()"
              (valueChange)="selectedStatus.set($event)"
              placeholder="All Stock"
            />
          </div>
        </div>

        <!-- View switcher and stats -->
        <div class="flex items-center gap-2 self-end lg:self-auto">
          <span class="text-xs text-muted-foreground">Showing {{ filteredProducts().length }} of {{ products().length }}</span>
          <div class="flex items-center rounded-lg border border-border p-0.5 bg-muted/30">
            <button
              type="button"
              (click)="viewMode.set('grid')"
              class="p-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
              [class.bg-background]="viewMode() === 'grid'"
              [class.shadow-2xs]="viewMode() === 'grid'"
              [class.text-foreground]="viewMode() === 'grid'"
              [class.text-muted-foreground]="viewMode() !== 'grid'"
            >
              <ng-icon name="lucideLayoutGrid" class="size-4" />
            </button>
            <button
              type="button"
              (click)="viewMode.set('table')"
              class="p-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
              [class.bg-background]="viewMode() === 'table'"
              [class.shadow-2xs]="viewMode() === 'table'"
              [class.text-foreground]="viewMode() === 'table'"
              [class.text-muted-foreground]="viewMode() !== 'table'"
            >
              <ng-icon name="lucideList" class="size-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- View Mode: Card Grid -->
      @if (viewMode() === 'grid') {
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          @for (prod of filteredProducts(); track prod.id) {
            <div hlmCard class="p-0 overflow-hidden flex flex-col group hover:border-primary/40 transition-all duration-200 shadow-2xs">
              <!-- Image Banner -->
              <div class="relative h-44 w-full bg-muted/40 overflow-hidden">
                <img
                  [src]="prod.image"
                  [alt]="prod.name"
                  class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute top-2.5 right-2.5">
                  <span
                    class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold border uppercase tracking-wider bg-background/90 backdrop-blur-xs shadow-xs"
                    [ngClass]="getStatusBadgeClass(prod.status)"
                  >
                    {{ formatStatus(prod.status) }}
                  </span>
                </div>
                <div class="absolute top-2.5 left-2.5">
                  <span class="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold bg-black/60 text-white backdrop-blur-xs font-mono">
                    {{ prod.sku }}
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{{ prod.category }}</div>
                  <h3 class="font-bold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">{{ prod.name }}</h3>
                </div>

                <!-- Stock Bar -->
                <div class="space-y-1">
                  <div class="flex justify-between text-[11px]">
                    <span class="text-muted-foreground">In Stock</span>
                    <span class="font-semibold text-foreground">{{ prod.stock }} units</span>
                  </div>
                  <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-500"
                      [style.width.%]="getStockPercentage(prod)"
                      [class.bg-emerald-500]="prod.status === 'in_stock'"
                      [class.bg-amber-500]="prod.status === 'low_stock'"
                      [class.bg-destructive]="prod.status === 'out_of_stock'"
                    ></div>
                  </div>
                </div>

                <!-- Price and Action Row -->
                <div class="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <span class="text-base font-bold text-foreground">\${{ prod.price | number:'1.2-2' }}</span>
                    <span class="text-[10px] text-muted-foreground ml-1">Cost: \${{ prod.costPrice }}</span>
                  </div>

                  <div class="flex items-center gap-1">
                    <button
                      hlmBtn
                      variant="ghost"
                      size="sm"
                      (click)="openEditDrawer(prod)"
                      class="h-7 w-7 p-0 cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                      <ng-icon name="lucideEdit" class="size-3.5" />
                    </button>
                    <button
                      hlmBtn
                      variant="ghost"
                      size="sm"
                      (click)="openAdjustDialog(prod)"
                      class="h-7 w-7 p-0 cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                      <ng-icon name="lucideLayers" class="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      } @else {
        <!-- View Mode: Data Table -->
        <div hlmCard class="p-0 shadow-2xs">
          <div class="overflow-x-auto">
            <table hlmTable class="w-full min-w-[720px]">
              <thead hlmTableHeader>
                <tr hlmTableRow>
                  <th hlmTableHead class="ps-4">Product & SKU</th>
                  <th hlmTableHead>Category</th>
                  <th hlmTableHead>Price / Margin</th>
                  <th hlmTableHead>Inventory</th>
                  <th hlmTableHead>Status</th>
                  <th hlmTableHead>Sales</th>
                  <th hlmTableHead class="text-right pe-4">Actions</th>
                </tr>
              </thead>
              <tbody hlmTableBody>
                @for (prod of filteredProducts(); track prod.id) {
                  <tr hlmTableRow class="hover:bg-muted/40 transition-colors">
                    <td hlmTableCell class="ps-4 py-3">
                      <div class="flex items-center gap-3">
                        <img [src]="prod.image" [alt]="prod.name" class="size-10 rounded-lg object-cover border border-border shrink-0" />
                        <div>
                          <div class="font-bold text-xs text-foreground">{{ prod.name }}</div>
                          <div class="font-mono text-[11px] text-muted-foreground">{{ prod.sku }}</div>
                        </div>
                      </div>
                    </td>
                    <td hlmTableCell class="text-xs">
                      <span hlmBadge variant="outline" class="font-medium text-[11px]">{{ prod.category }}</span>
                    </td>
                    <td hlmTableCell class="text-xs">
                      <div class="font-bold text-foreground">\${{ prod.price | number:'1.2-2' }}</div>
                      <div class="text-[10px] text-emerald-600 font-medium">
                        +{{ getMargin(prod) }}% margin
                      </div>
                    </td>
                    <td hlmTableCell class="text-xs">
                      <div class="font-semibold text-foreground">{{ prod.stock }} units</div>
                      <div class="text-[10px] text-muted-foreground">Min: {{ prod.minStock }}</div>
                    </td>
                    <td hlmTableCell>
                      <span
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold border uppercase tracking-wider"
                        [ngClass]="getStatusBadgeClass(prod.status)"
                      >
                        {{ formatStatus(prod.status) }}
                      </span>
                    </td>
                    <td hlmTableCell class="text-xs font-semibold text-foreground">
                      {{ prod.salesCount | number }} units
                    </td>
                    <td hlmTableCell class="text-right pe-4">
                      <div class="flex items-center justify-end gap-1">
                        <button hlmBtn variant="outline" size="sm" (click)="openAdjustDialog(prod)" class="h-7 text-xs px-2 cursor-pointer">
                          Stock
                        </button>
                        <button hlmBtn variant="outline" size="sm" (click)="openEditDrawer(prod)" class="h-7 text-xs px-2 cursor-pointer">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </app-main>

    <!-- Add / Edit Product Side Sheet (size="md" = 1/2 screen width) -->
    <hlm-sheet [isOpen]="drawerOpen()" position="right" [size]="'md'" (closed)="drawerOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>{{ isEditing() ? 'Edit Product: ' + activeProduct()?.name : 'Create New Product' }}</h3>
        <p hlmSheetDescription class="text-xs">Enter product specifications, inventory tracking thresholds, and pricing structure.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <!-- Form Inputs -->
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Product Title</label>
          <input
            type="text"
            [(ngModel)]="formData.name"
            placeholder="e.g. Wireless Noise-Cancelling Headphones"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">SKU Code</label>
            <input
              type="text"
              [(ngModel)]="formData.sku"
              placeholder="PRD-SKU-990"
              class="h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Category</label>
            <hlm-custom-select
              [options]="formCategoryOptions"
              [ngModel]="formData.category"
              (valueChange)="formData.category = $event"
              placeholder="Select Category"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Retail Price (\$)</label>
            <input
              type="number"
              [(ngModel)]="formData.price"
              placeholder="199.99"
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Cost Price (\$)</label>
            <input
              type="number"
              [(ngModel)]="formData.costPrice"
              placeholder="95.00"
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Initial Stock Units</label>
            <input
              type="number"
              [(ngModel)]="formData.stock"
              placeholder="150"
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Low Stock Threshold</label>
            <input
              type="number"
              [(ngModel)]="formData.minStock"
              placeholder="20"
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <!-- Image Upload Dropzone Simulation -->
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Product Image URL</label>
          <input
            type="text"
            [(ngModel)]="formData.image"
            placeholder="https://images.unsplash.com/..."
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="drawerOpen.set(false)" class="cursor-pointer text-xs">
          Cancel
        </button>
        <button hlmBtn (click)="saveProduct()" class="cursor-pointer text-xs">
          {{ isEditing() ? 'Save Changes' : 'Create Product' }}
        </button>
      </div>
    </hlm-sheet>

    <!-- Quick Stock Adjustment Modal -->
    <hlm-dialog [isOpen]="adjustDialogOpen()" (closed)="adjustDialogOpen.set(false)" class="max-w-md">
      @if (activeProduct(); as p) {
        <div class="space-y-4">
          <div>
            <h3 class="text-base font-bold text-foreground">Adjust Stock: {{ p.name }}</h3>
            <p class="text-xs text-muted-foreground">Current level: <span class="font-bold text-foreground">{{ p.stock }} units</span></p>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-semibold text-foreground">Quantity Adjustment (+/-)</label>
            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="adjustQuantity = adjustQuantity - 5"
                class="size-9 rounded-md border border-input bg-background font-bold text-sm hover:bg-muted cursor-pointer"
              >
                -5
              </button>
              <button
                type="button"
                (click)="adjustQuantity = adjustQuantity - 1"
                class="size-9 rounded-md border border-input bg-background font-bold text-sm hover:bg-muted cursor-pointer"
              >
                -1
              </button>
              <input
                type="number"
                [(ngModel)]="adjustQuantity"
                class="h-9 flex-1 text-center rounded-md border border-input bg-background font-bold text-sm"
              />
              <button
                type="button"
                (click)="adjustQuantity = adjustQuantity + 1"
                class="size-9 rounded-md border border-input bg-background font-bold text-sm hover:bg-muted cursor-pointer"
              >
                +1
              </button>
              <button
                type="button"
                (click)="adjustQuantity = adjustQuantity + 5"
                class="size-9 rounded-md border border-input bg-background font-bold text-sm hover:bg-muted cursor-pointer"
              >
                +5
              </button>
            </div>
            <p class="text-[11px] text-muted-foreground">
              New Projected Stock: <span class="font-bold text-foreground">{{ p.stock + adjustQuantity }}</span>
            </p>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Reason Code</label>
            <hlm-custom-select
              [options]="adjustReasons"
              [ngModel]="adjustReason"
              (valueChange)="adjustReason = $event"
              placeholder="Select Reason"
            />
          </div>

          <div class="flex justify-end gap-2 pt-2 border-t border-border">
            <button hlmBtn variant="outline" size="sm" (click)="adjustDialogOpen.set(false)" class="cursor-pointer text-xs">
              Cancel
            </button>
            <button hlmBtn size="sm" (click)="confirmStockAdjustment()" class="cursor-pointer text-xs">
              Apply Adjustment
            </button>
          </div>
        </div>
      }
    </hlm-dialog>
  `,
})
export class ProductsComponent {
  readonly viewMode = signal<'grid' | 'table'>('grid')
  readonly drawerOpen = signal<boolean>(false)
  readonly adjustDialogOpen = signal<boolean>(false)
  readonly isEditing = signal<boolean>(false)
  readonly activeProduct = signal<ProductItem | null>(null)

  searchQuery = ''
  readonly selectedCategory = signal<string>('all')
  readonly selectedStatus = signal<string>('all')

  adjustQuantity = 10
  adjustReason = 'restock'

  formData: Partial<ProductItem> = {
    name: '',
    sku: '',
    category: 'Electronics',
    price: 129.99,
    costPrice: 65.0,
    stock: 80,
    minStock: 15,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
  }

  readonly categoryOptions: readonly SelectOption[] = [
    { label: 'All Categories', value: 'all' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Audio & Sound', value: 'Audio & Sound' },
    { label: 'Wearables', value: 'Wearables' },
    { label: 'Accessories', value: 'Accessories' },
    { label: 'Office & Desk', value: 'Office & Desk' },
  ]

  readonly formCategoryOptions: readonly SelectOption[] = [
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Audio & Sound', value: 'Audio & Sound' },
    { label: 'Wearables', value: 'Wearables' },
    { label: 'Accessories', value: 'Accessories' },
    { label: 'Office & Desk', value: 'Office & Desk' },
  ]

  readonly statusOptions: readonly SelectOption[] = [
    { label: 'All Stock Levels', value: 'all' },
    { label: 'In Stock', value: 'in_stock' },
    { label: 'Low Stock', value: 'low_stock' },
    { label: 'Out of Stock', value: 'out_of_stock' },
  ]

  readonly adjustReasons: readonly SelectOption[] = [
    { label: 'Supplier Restock', value: 'restock' },
    { label: 'Inventory Audit Correction', value: 'audit' },
    { label: 'Damaged Goods Write-off', value: 'damaged' },
    { label: 'Customer Return', value: 'return' },
  ]

  readonly products = signal<ProductItem[]>([
    {
      id: 'prd-1',
      sku: 'AUD-WL-901',
      name: 'Wireless Studio Noise-Cancelling Headphones',
      category: 'Audio & Sound',
      price: 299.99,
      costPrice: 145.0,
      stock: 142,
      minStock: 25,
      status: 'in_stock',
      rating: 4.9,
      salesCount: 1420,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prd-2',
      sku: 'WCH-SM-440',
      name: 'Titanium Smart Watch Pro with OLED Display',
      category: 'Wearables',
      price: 449.0,
      costPrice: 210.0,
      stock: 14,
      minStock: 20,
      status: 'low_stock',
      rating: 4.8,
      salesCount: 890,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prd-3',
      sku: 'MEC-KB-600',
      name: 'Ergonomic Custom Mechanical Keyboard (Linear Red)',
      category: 'Office & Desk',
      price: 179.5,
      costPrice: 82.0,
      stock: 64,
      minStock: 15,
      status: 'in_stock',
      rating: 4.95,
      salesCount: 2150,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prd-4',
      sku: 'LNS-DL-105',
      name: 'Ultra-Wide Cinema Prime Camera Lens 35mm F1.4',
      category: 'Electronics',
      price: 899.0,
      costPrice: 520.0,
      stock: 0,
      minStock: 5,
      status: 'out_of_stock',
      rating: 4.7,
      salesCount: 310,
      image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prd-5',
      sku: 'ACC-CH-012',
      name: 'MagSafe 3-in-1 Fast Wireless Charging Station',
      category: 'Accessories',
      price: 89.99,
      costPrice: 38.0,
      stock: 210,
      minStock: 30,
      status: 'in_stock',
      rating: 4.85,
      salesCount: 4600,
      image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prd-6',
      sku: 'AUD-SP-770',
      name: 'Portable Waterproof Hi-Fi Bluetooth Speaker',
      category: 'Audio & Sound',
      price: 129.0,
      costPrice: 58.0,
      stock: 18,
      minStock: 25,
      status: 'low_stock',
      rating: 4.6,
      salesCount: 1180,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60',
    },
  ])

  readonly filteredProducts = computed(() => {
    const q = this.searchQuery.toLowerCase().trim()
    const cat = this.selectedCategory()
    const stat = this.selectedStatus()

    return this.products().filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      const matchesCat = cat === 'all' || p.category === cat
      const matchesStat = stat === 'all' || p.status === stat
      return matchesQuery && matchesCat && matchesStat
    })
  })

  readonly lowStockCount = computed(() => {
    return this.products().filter((p) => p.status === 'low_stock' || p.status === 'out_of_stock').length
  })

  readonly totalInventoryValue = computed(() => {
    return this.products().reduce((sum, p) => sum + p.price * p.stock, 0)
  })

  getStockPercentage(prod: ProductItem): number {
    const maxTarget = 200
    return Math.min(100, Math.round((prod.stock / maxTarget) * 100))
  }

  getMargin(prod: ProductItem): number {
    return Math.round(((prod.price - prod.costPrice) / prod.price) * 100)
  }

  formatStatus(status: string): string {
    return status.replace(/_/g, ' ')
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'in_stock':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800'
      case 'low_stock':
        return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800'
      case 'out_of_stock':
        return 'bg-destructive/10 text-destructive border-destructive/20'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  openCreateDrawer(): void {
    this.isEditing.set(false)
    this.activeProduct.set(null)
    this.formData = {
      name: '',
      sku: 'SKU-' + Math.floor(1000 + Math.random() * 9000),
      category: 'Electronics',
      price: 99.0,
      costPrice: 45.0,
      stock: 50,
      minStock: 10,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    }
    this.drawerOpen.set(true)
  }

  openEditDrawer(prod: ProductItem): void {
    this.isEditing.set(true)
    this.activeProduct.set(prod)
    this.formData = { ...prod }
    this.drawerOpen.set(true)
  }

  openAdjustDialog(prod: ProductItem): void {
    this.activeProduct.set(prod)
    this.adjustQuantity = 10
    this.adjustDialogOpen.set(true)
  }

  saveProduct(): void {
    if (!this.formData.name || !this.formData.sku) {
      toast.error('Please provide a valid product name and SKU.')
      return
    }

    if (this.isEditing() && this.activeProduct()) {
      const updated = this.products().map((p) => {
        if (p.id === this.activeProduct()!.id) {
          const stock = Number(this.formData.stock) || 0
          const minStock = Number(this.formData.minStock) || 10
          let status: ProductItem['status'] = 'in_stock'
          if (stock === 0) status = 'out_of_stock'
          else if (stock <= minStock) status = 'low_stock'

          return {
            ...p,
            ...this.formData,
            stock,
            minStock,
            status,
          } as ProductItem
        }
        return p
      })
      this.products.set(updated)
      toast.success(`Updated ${this.formData.name} successfully.`)
    } else {
      const stock = Number(this.formData.stock) || 0
      const minStock = Number(this.formData.minStock) || 10
      let status: ProductItem['status'] = 'in_stock'
      if (stock === 0) status = 'out_of_stock'
      else if (stock <= minStock) status = 'low_stock'

      const newProd: ProductItem = {
        id: 'prd-' + (this.products().length + 1),
        sku: this.formData.sku || 'SKU-000',
        name: this.formData.name || 'Untitled Product',
        category: this.formData.category || 'Electronics',
        price: Number(this.formData.price) || 0,
        costPrice: Number(this.formData.costPrice) || 0,
        stock,
        minStock,
        status,
        rating: 5.0,
        salesCount: 0,
        image: this.formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
      }
      this.products.update((list) => [newProd, ...list])
      toast.success(`Created product ${newProd.name}.`)
    }

    this.drawerOpen.set(false)
  }

  confirmStockAdjustment(): void {
    const prod = this.activeProduct()
    if (!prod) return

    const newStock = Math.max(0, prod.stock + this.adjustQuantity)
    let newStatus: ProductItem['status'] = 'in_stock'
    if (newStock === 0) newStatus = 'out_of_stock'
    else if (newStock <= prod.minStock) newStatus = 'low_stock'

    this.products.update((list) =>
      list.map((p) => (p.id === prod.id ? { ...p, stock: newStock, status: newStatus } : p))
    )

    toast.success(`Stock for ${prod.name} updated to ${newStock} units.`)
    this.adjustDialogOpen.set(false)
  }

  exportCatalog(): void {
    toast.success('Product catalog exported to CSV.')
  }
}
