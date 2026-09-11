import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideReceipt,
  lucideFileText,
  lucidePlus,
  lucideTrash2,
  lucideDownload,
  lucideSend,
  lucidePrinter,
  lucideCheck,
  lucideDollarSign,
  lucideBuilding,
  lucideUser,
  lucideMail,
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
import { HlmSelectImports, SelectOption } from '../../ui/select/hlm-select.components'
import { toast } from 'ngx-sonner'

export interface InvoiceLineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

@Component({
  selector: 'app-invoices',
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
    ...HlmSelectImports,
  ],
  providers: [
    provideIcons({
      lucideReceipt,
      lucideFileText,
      lucidePlus,
      lucideTrash2,
      lucideDownload,
      lucideSend,
      lucidePrinter,
      lucideCheck,
      lucideDollarSign,
      lucideBuilding,
      lucideUser,
      lucideMail,
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
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Interactive Invoice Builder & PDF Generator</h1>
          <p class="text-xs text-muted-foreground">Draft custom client invoices, compute live VAT tax subtotals, and export printable documents.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="printInvoice()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePrinter" class="size-3.5 text-muted-foreground" />
            <span>Print Invoice</span>
          </button>
          <button hlmBtn size="sm" (click)="sendSheetOpen.set(true)" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideSend" class="size-3.5" />
            <span>Send to Client</span>
          </button>
        </div>
      </div>

      <!-- Split Screen Layout: Form Builder vs Live Document Preview -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Left Pane: Invoice Editor Form (6 Cols) -->
        <div hlmCard class="lg:col-span-6 p-5 space-y-5 shadow-2xs">
          <h3 class="font-bold text-sm text-foreground">Invoice Parameters & Line Items</h3>

          <!-- Invoice Metadata Row -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Invoice #</label>
              <input
                type="text"
                [(ngModel)]="invoiceNumber"
                class="h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Currency</label>
              <hlm-custom-select
                [options]="currencyOptions"
                [ngModel]="currency()"
                (valueChange)="currency.set($event)"
                placeholder="Currency"
              />
            </div>

            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Payment Terms</label>
              <hlm-custom-select
                [options]="termsOptions"
                [ngModel]="terms()"
                (valueChange)="terms.set($event)"
                placeholder="Terms"
              />
            </div>
          </div>

          <!-- Client Details -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-border">
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Client Name / Company</label>
              <input
                type="text"
                [(ngModel)]="clientName"
                placeholder="Acme Global Corp"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Client Email</label>
              <input
                type="email"
                [(ngModel)]="clientEmail"
                placeholder="billing@acmeglobal.com"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <!-- Line Items Table -->
          <div class="space-y-3 pt-2 border-t border-border">
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs text-foreground">Billable Items</span>
              <button hlmBtn variant="outline" size="sm" (click)="addLineItem()" class="h-7 text-xs cursor-pointer gap-1">
                <ng-icon name="lucidePlus" class="size-3" />
                <span>Add Item</span>
              </button>
            </div>

            <div class="space-y-2">
              @for (item of lineItems(); track item.id; let idx = $index) {
                <div class="grid grid-cols-12 gap-2 items-center text-xs">
                  <div class="col-span-6">
                    <input
                      type="text"
                      [(ngModel)]="item.description"
                      placeholder="Service description..."
                      class="h-8 w-full rounded-md border border-input bg-background px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div class="col-span-2">
                    <input
                      type="number"
                      min="1"
                      [(ngModel)]="item.quantity"
                      placeholder="Qty"
                      class="h-8 w-full text-center rounded-md border border-input bg-background px-1 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div class="col-span-3">
                    <input
                      type="number"
                      min="0"
                      [(ngModel)]="item.unitPrice"
                      placeholder="Price"
                      class="h-8 w-full text-right rounded-md border border-input bg-background px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div class="col-span-1 text-center">
                    <button
                      type="button"
                      (click)="removeLineItem(idx)"
                      [disabled]="lineItems().length === 1"
                      class="p-1 text-muted-foreground hover:text-destructive cursor-pointer disabled:opacity-30"
                    >
                      <ng-icon name="lucideTrash2" class="size-3.5" />
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Adjustments (Discount & Tax) -->
          <div class="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-border">
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Discount Rate (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                [(ngModel)]="discountPercent"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">VAT / Sales Tax (%)</label>
              <input
                type="number"
                min="0"
                max="50"
                [(ngModel)]="taxPercent"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        </div>

        <!-- Right Pane: Live Printable Document Paper Preview (6 Cols) -->
        <div hlmCard class="lg:col-span-6 p-8 shadow-md border bg-card rounded-2xl flex flex-col space-y-6">
          <!-- Document Header -->
          <div class="flex items-start justify-between">
            <div class="space-y-1">
              <div class="text-xs font-bold uppercase tracking-widest text-primary">INVOICE</div>
              <h2 class="text-xl font-mono font-black text-foreground">{{ invoiceNumber }}</h2>
            </div>

            <div class="text-right text-xs text-muted-foreground space-y-0.5">
              <div class="font-bold text-foreground">Spartan UI Systems LLC</div>
              <div>100 Enterprise Way, Suite 400</div>
              <div>San Francisco, CA 94107</div>
            </div>
          </div>

          <!-- Bill To Card -->
          <div class="grid grid-cols-2 gap-4 py-4 border-y border-border text-xs">
            <div class="space-y-1">
              <div class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Billed To:</div>
              <div class="font-bold text-foreground text-sm">{{ clientName || 'Client Name' }}</div>
              <div class="text-muted-foreground">{{ clientEmail || 'client@email.com' }}</div>
            </div>

            <div class="text-right space-y-1">
              <div class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Payment Terms:</div>
              <div class="font-semibold text-foreground">{{ terms() }}</div>
              <div class="text-muted-foreground">Issue Date: Today</div>
            </div>
          </div>

          <!-- Preview Items Table -->
          <div class="space-y-2 text-xs">
            <div class="grid grid-cols-12 pb-2 border-b font-bold text-muted-foreground uppercase text-[10px]">
              <span class="col-span-6">Description</span>
              <span class="col-span-2 text-center">Qty</span>
              <span class="col-span-2 text-right">Price</span>
              <span class="col-span-2 text-right">Total</span>
            </div>

            @for (item of lineItems(); track item.id) {
              <div class="grid grid-cols-12 py-1 text-xs">
                <span class="col-span-6 font-medium text-foreground">{{ item.description || 'Service Line Item' }}</span>
                <span class="col-span-2 text-center text-muted-foreground font-mono">{{ item.quantity }}</span>
                <span class="col-span-2 text-right text-muted-foreground font-mono">{{ currencySymbol() }}{{ item.unitPrice | number:'1.2-2' }}</span>
                <span class="col-span-2 text-right font-bold text-foreground font-mono">{{ currencySymbol() }}{{ (item.quantity * item.unitPrice) | number:'1.2-2' }}</span>
              </div>
            }
          </div>

          <!-- Totals Calculation -->
          <div class="space-y-2 pt-4 border-t border-border text-xs">
            <div class="flex justify-between text-muted-foreground">
              <span>Subtotal:</span>
              <span class="font-mono">{{ currencySymbol() }}{{ subtotal() | number:'1.2-2' }}</span>
            </div>

            @if (discountPercent > 0) {
              <div class="flex justify-between text-emerald-600">
                <span>Discount ({{ discountPercent }}%):</span>
                <span class="font-mono">-{{ currencySymbol() }}{{ discountAmount() | number:'1.2-2' }}</span>
              </div>
            }

            <div class="flex justify-between text-muted-foreground">
              <span>Tax ({{ taxPercent }}%):</span>
              <span class="font-mono">+{{ currencySymbol() }}{{ taxAmount() | number:'1.2-2' }}</span>
            </div>

            <div class="flex justify-between pt-2 border-t font-black text-base text-foreground">
              <span>Total Due:</span>
              <span class="font-mono text-primary">{{ currencySymbol() }}{{ grandTotal() | number:'1.2-2' }}</span>
            </div>
          </div>
        </div>
      </div>
    </app-main>

    <!-- Send to Client Sheet (size="sm" = 1/3 screen width) -->
    <hlm-sheet [isOpen]="sendSheetOpen()" position="right" [size]="'sm'" (closed)="sendSheetOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Dispatch Invoice to Client</h3>
        <p hlmSheetDescription class="text-xs">Send invoice receipt and Stripe payment link via email.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Recipient Email</label>
          <input
            type="email"
            [value]="clientEmail"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Email Subject</label>
          <input
            type="text"
            [value]="'Invoice ' + invoiceNumber + ' from Spartan UI Systems'"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Custom Message</label>
          <textarea
            rows="4"
            class="w-full rounded-md border border-input bg-background p-2.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            placeholder="Thank you for your business. Please find attached invoice..."
          ></textarea>
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="sendSheetOpen.set(false)" class="cursor-pointer text-xs">
          Cancel
        </button>
        <button hlmBtn (click)="confirmSend()" class="cursor-pointer text-xs">
          Send Invoice
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class InvoicesComponent {
  readonly sendSheetOpen = signal<boolean>(false)

  invoiceNumber = 'INV-2026-088'
  clientName = 'Acme Global Innovations'
  clientEmail = 'billing@acmeglobal.com'
  readonly currency = signal<string>('USD')
  readonly terms = signal<string>('Net 30 Days')
  discountPercent = 10
  taxPercent = 8

  readonly lineItems = signal<InvoiceLineItem[]>([
    { id: '1', description: 'Angular 21 + Spartan UI Enterprise License', quantity: 1, unitPrice: 1200 },
    { id: '2', description: 'Custom Component Architectural Consulting (Hours)', quantity: 8, unitPrice: 150 },
  ])

  readonly currencyOptions: readonly SelectOption[] = [
    { label: 'USD ($)', value: 'USD' },
    { label: 'EUR (€)', value: 'EUR' },
    { label: 'GBP (£)', value: 'GBP' },
    { label: 'JPY (¥)', value: 'JPY' },
  ]

  readonly termsOptions: readonly SelectOption[] = [
    { label: 'Due Upon Receipt', value: 'Due Upon Receipt' },
    { label: 'Net 15 Days', value: 'Net 15 Days' },
    { label: 'Net 30 Days', value: 'Net 30 Days' },
    { label: 'Net 60 Days', value: 'Net 60 Days' },
  ]

  readonly currencySymbol = computed(() => {
    switch (this.currency()) {
      case 'EUR': return '€'
      case 'GBP': return '£'
      case 'JPY': return '¥'
      default: return '$'
    }
  })

  readonly subtotal = computed(() => {
    return this.lineItems().reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  })

  readonly discountAmount = computed(() => {
    return (this.subtotal() * this.discountPercent) / 100
  })

  readonly taxAmount = computed(() => {
    const discounted = this.subtotal() - this.discountAmount()
    return (discounted * this.taxPercent) / 100
  })

  readonly grandTotal = computed(() => {
    return this.subtotal() - this.discountAmount() + this.taxAmount()
  })

  addLineItem(): void {
    const newItem: InvoiceLineItem = {
      id: String(Date.now()),
      description: '',
      quantity: 1,
      unitPrice: 100,
    }
    this.lineItems.update((items) => [...items, newItem])
  }

  removeLineItem(index: number): void {
    if (this.lineItems().length > 1) {
      this.lineItems.update((items) => items.filter((_, i) => i !== index))
    }
  }

  printInvoice(): void {
    toast.success('Triggered printable invoice document render.')
  }

  confirmSend(): void {
    toast.success(`Invoice ${this.invoiceNumber} emailed to ${this.clientEmail}.`)
    this.sendSheetOpen.set(false)
  }
}
