import { Component, signal, computed } from '@angular/core'
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

export interface OrderItem {
  id: string
  orderNumber: string
  customer: { name: string; email: string }
  items: { name: string; qty: number; price: string }[]
  totalAmount: string
  status: 'processing' | 'shipped' | 'delivered' | 'refunded'
  date: string
  trackingNumber: string
  address: string
}

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
          <h1 class="text-2xl font-bold tracking-tight">Order Fulfillment Pipeline</h1>
          <p class="text-xs text-muted-foreground">Manage customer shipments, track delivery milestones, and issue refunds.</p>
        </div>

        <button hlmBtn variant="outline" size="sm" (click)="exportOrders()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
          <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
          <span>Export Orders</span>
        </button>
      </div>

      <!-- 4 Order KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Total Revenue</span>
          <div class="text-2xl font-bold text-foreground">\$128,420</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+18.4% this month</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Average Order Value</span>
          <div class="text-2xl font-bold text-foreground">\$84.20</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+\$6.50 vs last month</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">In Transit Shipments</span>
          <div class="text-2xl font-bold text-foreground">18 Orders</div>
          <p class="text-[11px] text-sky-500 font-semibold">Avg 2.4 days delivery</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Return Rate</span>
          <div class="text-2xl font-bold text-foreground">1.2%</div>
          <p class="text-[11px] text-emerald-600 font-semibold">-0.4% improvement</p>
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
            placeholder="Search order # or customer..."
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
                <th hlmTableHead>Customer</th>
                <th hlmTableHead>Date</th>
                <th hlmTableHead>Items</th>
                <th hlmTableHead>Total</th>
                <th hlmTableHead>Status</th>
                <th hlmTableHead class="text-right pe-4">Action</th>
              </tr>
            </thead>
            <tbody hlmTableBody>
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
                    {{ order.items.length }} product(s)
                  </td>
                  <td hlmTableCell class="text-xs font-bold text-foreground">{{ order.totalAmount }}</td>
                  <td hlmTableCell>
                    <span
                      class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold border uppercase tracking-wider"
                      [ngClass]="getStatusBadge(order.status)"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                  <td hlmTableCell class="text-right pe-4">
                    <button hlmBtn variant="outline" size="sm" class="h-7 text-xs cursor-pointer">
                      View Details
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </app-main>

    <!-- Order Detail Side Sheet (size="md" = 1/2 screen width) -->
    <hlm-sheet [isOpen]="detailSheetOpen()" position="right" [size]="'md'" (closed)="detailSheetOpen.set(false)">
      @if (activeOrder(); as ord) {
        <div hlmSheetHeader>
          <div class="flex items-center justify-between">
            <h3 hlmSheetTitle>Order {{ ord.orderNumber }}</h3>
            <span hlmBadge variant="outline" class="font-bold uppercase text-[10px]">{{ ord.status }}</span>
          </div>
          <p hlmSheetDescription class="text-xs">Placed on {{ ord.date }} • Tracking: {{ ord.trackingNumber }}</p>
        </div>

        <div class="space-y-6 py-4 flex-1 overflow-y-auto text-xs">
          <!-- Shipment Tracking Stepper -->
          <div class="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
            <h4 class="font-bold text-foreground">Shipment Progress</h4>
            <div class="grid grid-cols-4 gap-2 text-center">
              <div class="space-y-1">
                <div class="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-[10px] font-bold">1</div>
                <p class="text-[10px] font-semibold">Placed</p>
              </div>
              <div class="space-y-1">
                <div class="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-[10px] font-bold">2</div>
                <p class="text-[10px] font-semibold">Packed</p>
              </div>
              <div class="space-y-1">
                <div class="size-6 rounded-full bg-sky-500 text-white flex items-center justify-center mx-auto text-[10px] font-bold">3</div>
                <p class="text-[10px] font-semibold">In Transit</p>
              </div>
              <div class="space-y-1 opacity-40">
                <div class="size-6 rounded-full bg-muted flex items-center justify-center mx-auto text-[10px] font-bold">4</div>
                <p class="text-[10px] font-medium">Delivered</p>
              </div>
            </div>
          </div>

          <!-- Items Purchased -->
          <div class="space-y-2">
            <h4 class="font-bold text-foreground">Items in Order</h4>
            <div class="divide-y divide-border border rounded-xl overflow-hidden">
              @for (item of ord.items; track item.name) {
                <div class="flex items-center justify-between p-3 bg-card">
                  <div>
                    <p class="font-semibold text-foreground">{{ item.name }}</p>
                    <p class="text-[11px] text-muted-foreground">Quantity: {{ item.qty }}</p>
                  </div>
                  <span class="font-bold text-foreground">{{ item.price }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Customer & Delivery Card -->
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-xl border border-border bg-card space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Customer</span>
              <p class="font-semibold text-foreground">{{ ord.customer.name }}</p>
              <p class="text-[11px] text-muted-foreground">{{ ord.customer.email }}</p>
            </div>

            <div class="p-3 rounded-xl border border-border bg-card space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Shipping Address</span>
              <p class="text-[11px] text-foreground leading-snug">{{ ord.address }}</p>
            </div>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="issueRefund(ord)" class="cursor-pointer text-xs text-destructive">
            Issue Refund
          </button>
          <button hlmBtn (click)="downloadReceipt(ord)" class="cursor-pointer text-xs">
            Download Packing Slip
          </button>
        </div>
      }
    </hlm-sheet>
  `,
})
export class OrdersComponent {
  readonly activeTab = signal<string>('all')
  readonly detailSheetOpen = signal<boolean>(false)
  readonly activeOrder = signal<OrderItem | null>(null)
  searchQuery = ''

  readonly statusTabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipped', label: 'In Transit' },
    { id: 'delivered', label: 'Delivered' },
  ]

  readonly orders = signal<OrderItem[]>([
    {
      id: 'ord-1',
      orderNumber: '#ORD-9842',
      customer: { name: 'Olivia Martin', email: 'olivia.martin@email.com' },
      items: [
        { name: 'Spartan UI Pro License (Annual)', qty: 1, price: '$240.00' },
        { name: 'Developer Add-on Seats', qty: 2, price: '$60.00' },
      ],
      totalAmount: '$300.00',
      status: 'shipped',
      date: 'Today, 11:20 AM',
      trackingNumber: 'TRK-US-889214710',
      address: '742 Evergreen Terrace, Springfield, OR',
    },
    {
      id: 'ord-2',
      orderNumber: '#ORD-9841',
      customer: { name: 'Jackson Lee', email: 'jackson.lee@email.com' },
      items: [{ name: 'Starter Dashboard Theme', qty: 1, price: '$49.00' }],
      totalAmount: '$49.00',
      status: 'processing',
      date: 'Today, 09:15 AM',
      trackingNumber: 'TRK-US-889214709',
      address: '10880 Wilshire Blvd, Los Angeles, CA',
    },
    {
      id: 'ord-3',
      orderNumber: '#ORD-9840',
      customer: { name: 'Sarah Miller', email: 'sarah.miller@email.com' },
      items: [{ name: 'Enterprise Custom SLA Bundle', qty: 1, price: '$1,200.00' }],
      totalAmount: '$1,200.00',
      status: 'delivered',
      date: 'Yesterday',
      trackingNumber: 'TRK-US-889214708',
      address: '350 5th Ave, New York, NY',
    },
  ])

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
          o.customer.email.toLowerCase().includes(q)
      )
    }

    return list
  })

  getTabCount(tabId: string): number {
    if (tabId === 'all') return this.orders().length
    return this.orders().filter((o) => o.status === tabId).length
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'delivered': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
      case 'shipped': return 'bg-sky-500/10 text-sky-600 border-sky-200'
      case 'processing': return 'bg-amber-500/10 text-amber-600 border-amber-200'
      default: return 'bg-destructive/10 text-destructive border-destructive/20'
    }
  }

  openOrderDetail(order: OrderItem): void {
    this.activeOrder.set(order)
    this.detailSheetOpen.set(true)
  }

  issueRefund(order: OrderItem): void {
    order.status = 'refunded'
    toast.success(`Refund issued for order ${order.orderNumber}.`)
    this.detailSheetOpen.set(false)
  }

  downloadReceipt(order: OrderItem): void {
    toast.success(`Downloading invoice packing slip for ${order.orderNumber}...`)
  }

  exportOrders(): void {
    toast.success('Orders dataset exported to CSV!')
  }
}
