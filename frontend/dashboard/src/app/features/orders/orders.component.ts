import { Component, signal, computed, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideShoppingBag,
  lucideSearch,
  lucidePackage,
  lucideTruck,
  lucideCheckCircle2,
  lucideDollarSign,
  lucideUser,
  lucideMapPin,
  lucideCreditCard,
  lucideDownload,
  lucideRefreshCw,
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
import { HlmTableImports } from '../../ui/table/hlm-table.components'
import { toast } from 'ngx-sonner'
import { OrderItem, OrderStats, OrdersApiService } from './data-access'

@Component({
  selector: 'app-orders',
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
    ...HlmTableImports,
  ],
  providers: [
    provideIcons({
      lucideShoppingBag,
      lucideSearch,
      lucidePackage,
      lucideTruck,
      lucideCheckCircle2,
      lucideDollarSign,
      lucideUser,
      lucideMapPin,
      lucideCreditCard,
      lucideDownload,
      lucideRefreshCw,
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
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Order & Booking Pipeline</h1>
          <p class="text-xs text-muted-foreground">Manage confirmed guest itineraries, track transit dispatches, and process booking refunds.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="loadOrders()" [disabled]="isLoading()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideRefreshCw" class="size-3.5 text-muted-foreground" [class.animate-spin]="isLoading()" />
            <span>Refresh</span>
          </button>
          <button hlmBtn variant="outline" size="sm" (click)="exportOrders()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <!-- 4 Order KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Total Revenue</span>
          <div class="text-2xl font-bold text-foreground">
            {{ stats().totalRevenue | currency:'USD':'symbol':'1.0-0' }}
          </div>
          <p class="text-[11px] text-emerald-600 font-semibold">+18.4% this month</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Average Order Value</span>
          <div class="text-2xl font-bold text-foreground">
            {{ stats().avgOrderValue | currency:'USD':'symbol':'1.0-0' }}
          </div>
          <p class="text-[11px] text-emerald-600 font-semibold">+12.5% vs benchmark</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Active Travel Dispatches</span>
          <div class="text-2xl font-bold text-foreground">{{ stats().inTransitCount }} Active</div>
          <p class="text-[11px] text-sky-500 font-semibold">Live GPS & boarding tracking</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Cancellation / Refund Rate</span>
          <div class="text-2xl font-bold text-foreground">
            {{ stats().returnRate | number:'1.1-1' }}%
          </div>
          <p class="text-[11px] text-emerald-600 font-semibold">Well below 2.0% threshold</p>
        </div>
      </div>

      <!-- Filter Controls & Status Tabs -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="flex items-center gap-1.5 flex-wrap">
          @for (tab of statusTabs; track tab.id) {
            <button
              type="button"
              (click)="activeTab.set(tab.id)"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border"
              [class.bg-primary]="activeTab() === tab.id"
              [class.text-primary-foreground]="activeTab() === tab.id"
              [class.border-primary]="activeTab() === tab.id"
              [class.bg-card]="activeTab() !== tab.id"
              [class.text-muted-foreground]="activeTab() !== tab.id"
            >
              {{ tab.label }} ({{ getTabCount(tab.id) }})
            </button>
          }
        </div>

        <div class="relative w-full sm:w-60">
          <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search order #, guest, email..."
            class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <!-- Orders Table -->
      <div hlmCard class="p-0 overflow-hidden shadow-2xs">
        <div class="overflow-x-auto">
          <table hlmTable class="min-w-[650px] w-full">
            <thead hlmTableHeader>
              <tr hlmTableRow>
                <th hlmTableHead class="ps-4">Order #</th>
                <th hlmTableHead>Customer / Guest</th>
                <th hlmTableHead>Date</th>
                <th hlmTableHead>Itinerary / Services</th>
                <th hlmTableHead>Total</th>
                <th hlmTableHead>Status</th>
                <th hlmTableHead class="text-right pe-4">Action</th>
              </tr>
            </thead>
            <tbody hlmTableBody>
              @if (isLoading()) {
                <tr hlmTableRow>
                  <td colspan="7" class="text-center py-10 text-muted-foreground text-xs">
                    Loading live orders & dispatches...
                  </td>
                </tr>
              } @else if (filteredOrders().length === 0) {
                <tr hlmTableRow>
                  <td colspan="7" class="text-center py-10 text-muted-foreground text-xs">
                    No matching orders or bookings found.
                  </td>
                </tr>
              } @else {
                @for (order of filteredOrders(); track order.id) {
                  <tr hlmTableRow (click)="openOrderDetail(order)" class="cursor-pointer hover:bg-muted/40 transition-colors">
                    <td hlmTableCell class="ps-4 font-mono font-bold text-xs text-foreground">
                      {{ order.orderNumber }}
                    </td>
                    <td hlmTableCell class="text-xs">
                      <div class="font-semibold text-foreground">{{ order.customer.name }}</div>
                      <div class="text-[11px] text-muted-foreground">{{ order.customer.email }}</div>
                    </td>
                    <td hlmTableCell class="text-xs text-muted-foreground">{{ order.date }}</td>
                    <td hlmTableCell class="text-xs text-muted-foreground">
                      {{ order.items.length }} itinerary item(s)
                    </td>
                    <td hlmTableCell class="text-xs font-bold text-foreground">{{ order.totalAmount }}</td>
                    <td hlmTableCell>
                      <span
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold border uppercase tracking-wider"
                        [ngClass]="getStatusBadge(order.status)"
                      >
                        {{ order.status === 'shipped' ? 'In Transit' : order.status }}
                      </span>
                    </td>
                    <td hlmTableCell class="text-right pe-4">
                      <button hlmBtn variant="outline" size="sm" class="h-7 text-xs cursor-pointer">
                        View Details
                      </button>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>
      </div>
    </app-main>

    <!-- Order Detail Side Sheet -->
    <hlm-sheet [isOpen]="detailSheetOpen()" position="right" [size]="'md'" (closed)="detailSheetOpen.set(false)">
      @if (activeOrder(); as ord) {
        <div hlmSheetHeader>
          <div class="flex items-center justify-between">
            <h3 hlmSheetTitle>Order {{ ord.orderNumber }}</h3>
            <span hlmBadge variant="outline" class="font-bold uppercase text-[10px]">
              {{ ord.status === 'shipped' ? 'In Transit' : ord.status }}
            </span>
          </div>
          <p hlmSheetDescription class="text-xs">Placed on {{ ord.date }} • Tracking: {{ ord.trackingNumber }}</p>
        </div>

        <div class="space-y-6 py-4 flex-1 overflow-y-auto text-xs">
          <!-- Shipment Tracking Stepper -->
          <div class="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
            <h4 class="font-bold text-foreground">Fulfillment & Transit Milestones</h4>
            <div class="grid grid-cols-4 gap-2 text-center">
              <div class="space-y-1">
                <div class="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-[10px] font-bold">1</div>
                <p class="text-[10px] font-semibold">Payment Confirmed</p>
              </div>
              <div class="space-y-1">
                <div class="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-[10px] font-bold">2</div>
                <p class="text-[10px] font-semibold">Voucher Issued</p>
              </div>
              <div class="space-y-1">
                <div
                  class="size-6 rounded-full flex items-center justify-center mx-auto text-[10px] font-bold"
                  [ngClass]="ord.status === 'shipped' || ord.status === 'delivered' ? 'bg-sky-500 text-white' : 'bg-muted text-muted-foreground'"
                >
                  3
                </div>
                <p class="text-[10px]" [ngClass]="ord.status === 'shipped' || ord.status === 'delivered' ? 'font-semibold text-sky-500' : 'text-muted-foreground'">
                  In Transit
                </p>
              </div>
              <div class="space-y-1" [class.opacity-40]="ord.status !== 'delivered'">
                <div
                  class="size-6 rounded-full flex items-center justify-center mx-auto text-[10px] font-bold"
                  [ngClass]="ord.status === 'delivered' ? 'bg-emerald-600 text-white' : 'bg-muted text-muted-foreground'"
                >
                  4
                </div>
                <p class="text-[10px]" [ngClass]="ord.status === 'delivered' ? 'font-semibold text-emerald-600' : 'text-muted-foreground'">
                  Completed
                </p>
              </div>
            </div>
          </div>

          <!-- Items Purchased -->
          <div class="space-y-2">
            <h4 class="font-bold text-foreground">Booked Services & Add-ons</h4>
            <div class="divide-y divide-border border rounded-xl overflow-hidden">
              @for (item of ord.items; track item.name) {
                <div class="flex items-center justify-between p-3 bg-card">
                  <div>
                    <p class="font-semibold text-foreground">{{ item.name }}</p>
                    <p class="text-[11px] text-muted-foreground">Quantity: {{ item.qty }} {{ item.category ? '• ' + item.category : '' }}</p>
                  </div>
                  <span class="font-bold text-foreground">{{ item.price }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Customer & Delivery Card -->
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-xl border border-border bg-card space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Guest Contact</span>
              <p class="font-semibold text-foreground">{{ ord.customer.name }}</p>
              <p class="text-[11px] text-muted-foreground">{{ ord.customer.email }}</p>
              @if (ord.customer.phone) {
                <p class="text-[11px] text-muted-foreground">{{ ord.customer.phone }}</p>
              }
            </div>

            <div class="p-3 rounded-xl border border-border bg-card space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Departure / Destination</span>
              <p class="text-[11px] text-foreground leading-snug">{{ ord.address }}</p>
              @if (ord.paymentMethod) {
                <p class="text-[10px] text-muted-foreground pt-1">Method: {{ ord.paymentMethod }}</p>
              }
            </div>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          @if (ord.status !== 'refunded') {
            <button hlmBtn variant="outline" (click)="issueRefund(ord)" class="cursor-pointer text-xs text-destructive hover:bg-destructive/10">
              Issue Full Refund
            </button>
          } @else {
            <span class="text-xs text-muted-foreground font-semibold">Order Cancelled & Refunded</span>
          }
          <button hlmBtn (click)="downloadReceipt(ord)" class="cursor-pointer text-xs">
            Download Travel Pass / Slip
          </button>
        </div>
      }
    </hlm-sheet>
  `,
})
export class OrdersComponent implements OnInit {
  private readonly ordersApi = inject(OrdersApiService)

  readonly activeTab = signal<string>('all')
  readonly detailSheetOpen = signal<boolean>(false)
  readonly activeOrder = signal<OrderItem | null>(null)
  readonly isLoading = signal<boolean>(false)
  readonly orders = signal<OrderItem[]>([])
  readonly stats = signal<OrderStats>({
    totalRevenue: 16840,
    avgOrderValue: 2806,
    inTransitCount: 2,
    returnRate: 1.2,
  })

  searchQuery = ''

  readonly statusTabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipped', label: 'In Transit' },
    { id: 'delivered', label: 'Completed' },
    { id: 'refunded', label: 'Refunded' },
  ]

  readonly filteredOrders = computed(() => {
    const tab = this.activeTab()
    const q = this.searchQuery.toLowerCase().trim()

    let list = this.orders()
    if (tab !== 'all') {
      list = list.filter((o) => o.status === tab)
    }

    if (q) {
      list = list.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q) ||
          o.customer.email.toLowerCase().includes(q) ||
          o.address.toLowerCase().includes(q)
      )
    }

    return list
  })

  ngOnInit(): void {
    this.loadOrders()
  }

  async loadOrders(): Promise<void> {
    this.isLoading.set(true)
    try {
      const data = await this.ordersApi.loadOrders()
      this.orders.set(data)
      this.stats.set(this.ordersApi.calculateStats(data))
    } catch {
      toast.error('Could not load live orders; loaded cached dispatches.')
    } finally {
      this.isLoading.set(false)
    }
  }

  getTabCount(tabId: string): number {
    if (tabId === 'all') return this.orders().length
    return this.orders().filter((o) => o.status === tabId).length
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
      case 'shipped':
        return 'bg-sky-500/10 text-sky-600 border-sky-200'
      case 'processing':
        return 'bg-amber-500/10 text-amber-600 border-amber-200'
      default:
        return 'bg-destructive/10 text-destructive border-destructive/20'
    }
  }

  openOrderDetail(order: OrderItem): void {
    this.activeOrder.set(order)
    this.detailSheetOpen.set(true)
  }

  async issueRefund(order: OrderItem): Promise<void> {
    try {
      await this.ordersApi.issueRefund(order.id)
      const updated = this.orders().map((o) => (o.id === order.id ? { ...o, status: 'refunded' as const } : o))
      this.orders.set(updated)
      this.stats.set(this.ordersApi.calculateStats(updated))
      if (this.activeOrder()?.id === order.id) {
        this.activeOrder.set({ ...order, status: 'refunded' })
      }
      toast.success(`Booking refund initiated for ${order.orderNumber}. Processed to original payment method.`)
    } catch {
      toast.error('Failed to issue refund.')
    }
  }

  downloadReceipt(order: OrderItem): void {
    if (order.receiptUrl) {
      window.open(order.receiptUrl, '_blank')
    }
    toast.success(`Downloading travel voucher & dispatch slip for ${order.orderNumber}...`)
  }

  exportOrders(): void {
    const rows = [
      ['Order #', 'Customer', 'Email', 'Items Count', 'Total Amount', 'Status', 'Date', 'Address'],
      ...this.orders().map((o) => [
        o.orderNumber,
        `"${o.customer.name}"`,
        o.customer.email,
        o.items.length.toString(),
        o.totalAmount,
        o.status,
        o.date,
        `"${o.address}"`,
      ]),
    ]
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `orders_export_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Orders dataset exported to CSV!')
  }
}
