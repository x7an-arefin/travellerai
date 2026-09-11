import { Component, input, output, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ScreenBlockAction, ScreenBlockEntry, ScreenBlockMutationState, ScreenBlockNode, ScreenBlockQuery, ScreenBlockState } from './screen-block.types'

type FormFieldConfig = {
  name: string
  label?: string
  widget?: string
  required?: boolean
  placeholder?: string
  options?: { label: string; value: string }[]
}

@Component({
  selector: 'app-screen-block',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article class="rounded-xl border border-border bg-card p-4 shadow-2xs" [attr.data-component]="entry().id">
      <div class="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 class="font-semibold">{{ title() }}</h2>
          <p class="text-xs text-muted-foreground">{{ entry().category }} · {{ entry().id }}</p>
        </div>
        <span class="rounded-full bg-muted px-2 py-1 text-[10px] font-medium">{{ entry().variant }}</span>
      </div>

      @if (state().status === 'loading') {
        <div class="mb-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
          <span class="size-3 animate-pulse rounded-full bg-primary"></span>
          Loading data from the API...
        </div>
      }
      @if (state().status === 'error') {
        <div class="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          <span>API request failed: {{ state().error }}</span>
          <button type="button" class="rounded-md border border-destructive/30 px-2 py-1 font-medium" (click)="retry.emit()">Retry</button>
        </div>
      }
      @if (mutation().status === 'pending') {
        <div class="mb-4 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">Saving changes...</div>
      }
      @if (mutation().status === 'error') {
        <div class="mb-4 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">Save failed: {{ mutation().error }}</div>
      }
      @if (mutation().status === 'success') {
        <div class="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs text-emerald-700">Changes saved successfully.</div>
      }
      @if (state().status === 'empty') {
        <div class="mb-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center text-xs text-muted-foreground">
          <p class="font-medium text-foreground">No records found</p>
          <p class="mt-1">Try adjusting your filters, search term, or create a new entry.</p>
        </div>
      }
      @if (state().status === 'partial') {
        <div class="mb-4 flex items-center justify-between gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
          <span>Partial data loaded from cached snapshot. Some fields may be degraded.</span>
          <button type="button" class="rounded-md border border-amber-500/30 px-2 py-1 font-medium" (click)="retry.emit()">Refresh</button>
        </div>
      }
      @if (state().status === 'unauthorized') {
        <div class="mb-4 flex items-center justify-between gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          <span>You do not have permission to view this resource. Contact your administrator for access.</span>
        </div>
      }
      @if (state().status === 'offline') {
        <div class="mb-4 flex items-center justify-between gap-2 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs text-sky-800 dark:text-sky-300">
          <span>You are currently offline. Viewing local cached state.</span>
        </div>
      }
      @if (mutation().status === 'conflict') {
        <div class="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
          <div class="font-semibold">Version Conflict Detected (409 Conflict)</div>
          <p class="mt-1">This record was modified by another session since you loaded it.</p>
          <div class="mt-2 flex gap-2">
            <button type="button" class="rounded-md bg-destructive px-2 py-1 font-medium text-destructive-foreground" (click)="retry.emit()">Reload Latest Data</button>
            <button type="button" class="rounded-md border border-border bg-background px-2 py-1 font-medium text-foreground" (click)="confirmAction()">Overwrite Server Version</button>
          </div>
        </div>
      }
      @if (pendingAction()) {
        <div class="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs">
          <span>Are you sure you want to continue with this action?</span>
          <div class="flex gap-2"><button type="button" class="rounded-md border border-border px-2 py-1" (click)="cancelAction()">Cancel</button><button type="button" class="rounded-md bg-destructive px-2 py-1 text-destructive-foreground" (click)="confirmAction()">Confirm</button></div>
        </div>
      }

      @switch (entry().variant) {
        @case ('form') {
          <form [formGroup]="form" (ngSubmit)="submitForm()" class="space-y-4">
            @for (field of formFields(); track field.name) {
              <label class="block space-y-1.5">
                <span class="text-xs font-semibold text-muted-foreground">{{ field.label || field.name }}</span>
                @if (field.widget === 'select') {
                  <select class="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" [formControl]="control(field.name)">
                    @for (option of field.options || []; track option.value) { <option [value]="option.value">{{ option.label }}</option> }
                  </select>
                } @else if (field.widget === 'textarea' || field.widget === 'json') {
                  <textarea class="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs" [placeholder]="field.placeholder || ''" [formControl]="control(field.name)"></textarea>
                } @else {
                  <input class="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" [type]="inputType(field.widget)" [placeholder]="field.placeholder || ''" [formControl]="control(field.name)" />
                }
                @if (control(field.name).invalid && control(field.name).touched) { <span class="text-xs text-destructive">{{ field.label || field.name }} is required.</span> }
              </label>
            }
            <div class="flex justify-end">
              <button type="submit" class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50" [disabled]="form.invalid || mutation().status === 'pending' || !canAction()">{{ mutation().status === 'pending' ? 'Saving...' : 'Save changes' }}</button>
            </div>
          </form>
        }

        @case ('data-table') {
          <div class="space-y-3">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex flex-1 flex-wrap gap-2">
                <input class="h-9 min-w-44 rounded-md border border-input bg-background px-3 text-sm" [value]="query().search" placeholder="Search records..." (input)="searchChanged($event)" />
                @for (field of filterFields(); track field) { <input class="h-9 w-32 rounded-md border border-input bg-background px-3 text-xs" [value]="filterValue(field)" [placeholder]="'Filter ' + field" (input)="filterChanged(field, $event)" /> }
              </div>
              <div class="flex items-center gap-2 text-xs">
                <button type="button" class="rounded-md border border-border px-2 py-1" (click)="toggleSort()">Sort {{ query().sortDirection || 'off' }}</button>
                <button type="button" class="rounded-md border border-border px-2 py-1 disabled:opacity-50" [disabled]="query().page <= 1 || state().status === 'loading'" (click)="changePage(-1)">Previous</button>
                <span>Page {{ query().page }}</span>
                <button type="button" class="rounded-md border border-border px-2 py-1 disabled:opacity-50" [disabled]="!canNextPage() || state().status === 'loading'" (click)="changePage(1)">Next</button>
              </div>
            </div>
            <div class="overflow-hidden rounded-lg border border-border">
              <div class="grid gap-2 border-b border-border bg-muted/40 px-3 py-2 text-[11px] font-semibold text-muted-foreground md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
                @for (column of tableColumns(); track column.key) { <span>{{ column.label }}</span> }
                @if (rowAction()) { <span>Actions</span> }
              </div>
              @for (row of records([{ name: 'Demo record', status: 'active' }]); track $index) {
                <div class="grid gap-2 border-b border-border px-3 py-3 text-sm last:border-b-0 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
                  @for (column of tableColumns(); track column.key) { <span class="truncate" [class.font-mono]="column.key === 'id' || column.key.toLowerCase().includes('sku')">{{ itemValue(row, column.key, '—') }}</span> }
                  @if (rowAction() && canRowAction() && itemId(row)) { <button type="button" class="rounded-md border border-destructive/30 px-2 py-1 text-xs text-destructive" (click)="emitRowAction(row)">Action</button> }
                </div>
              }
            </div>
          </div>
        }
        @case ('user-detail') {
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Name</div><div class="mt-1 font-semibold">{{ objectValue('name', 'Team member') }}</div></div>
            <div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Email</div><div class="mt-1 truncate font-medium">{{ objectValue('email', 'member@example.com') }}</div></div>
            <div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Role</div><div class="mt-1 font-medium">{{ roleValue() }}</div></div>
            <div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Status</div><div class="mt-1 font-medium">{{ objectValue('status', 'active') }}</div></div>
          </div>
        }
        @case ('role-selector') {
          <div class="space-y-3">
            <label class="block space-y-1.5"><span class="text-xs font-semibold text-muted-foreground">Role</span><select class="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" [value]="roleValue()" (change)="roleChanged($event)"><option value="admin">Admin</option><option value="manager">Manager</option><option value="analyst">Analyst</option><option value="viewer">Viewer</option></select></label>
            <button type="button" class="rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground disabled:opacity-50" [disabled]="!canAction() || mutation().status === 'pending'" (click)="emitConfiguredPayload({ role: roleValue() })">Save role</button>
          </div>
        }
        @case ('permission-matrix') {
          <div class="space-y-3">
            <div class="grid gap-2 sm:grid-cols-2">@for (permission of permissionOptions; track permission) { <label class="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs"><input type="checkbox" [checked]="permissionSelected(permission)" (change)="togglePermission(permission)" /><span>{{ permission }}</span></label> }</div>
            <button type="button" class="rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground disabled:opacity-50" [disabled]="!canAction() || mutation().status === 'pending'" (click)="emitConfiguredPayload({ permissions: selectedPermissions() })">Save permissions</button>
          </div>
        }
        @case ('session-devices') {
          <div class="space-y-2">@for (device of deviceRows(); track $index) { <div class="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs"><div><div class="font-medium">{{ itemValue(device, 'device', 'Browser session') }}</div><div class="text-muted-foreground">{{ itemValue(device, 'location', 'Unknown location') }}</div></div><span class="text-muted-foreground">{{ itemValue(device, 'lastSeen', 'Recently') }}</span></div> }</div>
        }
        @case ('order-queue') {
          <div class="overflow-hidden rounded-lg border border-border">
            <div class="grid gap-2 border-b border-border bg-muted/40 px-3 py-2 text-[11px] font-semibold text-muted-foreground md:grid-cols-5"><span>Order</span><span>Customer</span><span>Total</span><span>Status</span><span>Payment</span></div>
            @for (order of records([{ orderNumber: '#10042', customerName: 'Demo customer', total: '129.00', status: 'paid', paymentStatus: 'paid' }]); track $index) { <div class="grid gap-2 border-b border-border px-3 py-3 text-sm last:border-b-0 md:grid-cols-6"><span class="font-mono">{{ itemValue(order, 'orderNumber', '#10042') }}</span><span class="truncate">{{ itemValue(order, 'customerName', 'Customer') }}</span><span>{{ money(itemValue(order, 'total', 0)) }}</span><span><span class="rounded-full bg-primary/10 px-2 py-1 text-[10px]">{{ itemValue(order, 'status', 'pending') }}</span></span><span class="text-xs text-muted-foreground">{{ itemValue(order, 'paymentStatus', 'pending') }}</span>@if (rowAction() && canRowAction() && itemId(order)) { <button type="button" class="rounded-md border border-destructive/30 px-2 py-1 text-xs text-destructive" (click)="emitRowAction(order)">Delete</button> }</div> }
          </div>
        }
        @case ('order-summary') {
          <div class="space-y-4"><div class="flex flex-wrap items-center justify-between gap-3"><div><div class="text-xs text-muted-foreground">Order</div><div class="text-xl font-bold">{{ itemValue(data(), 'orderNumber', '#10042') }}</div><div class="text-xs text-muted-foreground">{{ itemValue(data(), 'createdAt', 'Recently created') }}</div></div><div class="text-right"><div class="text-xs text-muted-foreground">Total</div><div class="text-2xl font-bold">{{ money(itemValue(data(), 'total', 0)) }}</div></div></div><div class="grid gap-2 sm:grid-cols-3"><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Status</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'status', 'pending') }}</div></div><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Payment</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'paymentStatus', 'pending') }}</div></div><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Fulfillment</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'fulfillmentStatus', 'unfulfilled') }}</div></div></div><div class="flex flex-wrap gap-2">@if (node().events?.['cancel'] && canEvent()(node().events?.['cancel'] || '')) { <button type="button" class="rounded-md border border-destructive/30 px-3 py-2 text-xs text-destructive" (click)="emitEvent('cancel')">Cancel order</button> } @if (node().events?.['fulfill'] && canEvent()(node().events?.['fulfill'] || '')) { <button type="button" class="rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground" (click)="emitEvent('fulfill')">Mark fulfilled</button> } @if (node().events?.['refund'] && canEvent()(node().events?.['refund'] || '')) { <button type="button" class="rounded-md border border-amber-500/40 px-3 py-2 text-xs text-amber-700" (click)="emitEvent('refund')">Refund</button> }</div></div>
        }
        @case ('customer-summary') {
          <div class="space-y-3"><div class="text-xs text-muted-foreground">Customer</div><div class="text-lg font-semibold">{{ itemValue(data(), 'customerName', 'Customer') }}</div><div class="text-sm text-muted-foreground">{{ itemValue(data(), 'customerEmail', 'customer@example.com') }}</div><div class="rounded-lg bg-muted/40 p-3 text-xs">Shipping and customer profile details remain bound to the order record.</div></div>
        }
        @case ('order-timeline') {
          <div class="space-y-3">@for (event of orderTimeline(); track $index) { <div class="flex gap-3"><div class="mt-1 size-2 rounded-full bg-primary"></div><div><div class="text-sm font-medium">{{ itemValue(event, 'label', 'Order event') }}</div><div class="text-xs text-muted-foreground">{{ itemValue(event, 'createdAt', 'Recently') }}</div></div></div> }</div>
        }
        @case ('product-card-grid') {
          @if (bulkAction() && canBulkAction()) { 
            <div class="mb-3 flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs">
              <span>{{ selectedCount() }} selected</span>
              <button type="button" class="rounded-md bg-destructive px-2 py-1 text-destructive-foreground disabled:opacity-50" [disabled]="selectedCount() === 0" (click)="emitBulkAction()">Delete selected</button>
            </div>
          }
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            @for (item of productItems(); track $index) {
              <div class="rounded-lg border border-border bg-background p-3">
                <div class="mb-3 aspect-[4/3] rounded-md bg-gradient-to-br from-primary/20 via-muted to-muted"></div>
                <div class="flex items-center justify-between gap-2">
                  <div class="font-medium">{{ itemLabel(item, 'Product') }}</div>
                  @if (bulkAction() && itemId(item)) { <input type="checkbox" [checked]="isSelected(itemId(item))" (change)="toggleSelected(itemId(item))" /> }
                </div>
                <div class="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{{ itemValue(item, 'status', 'Active') }}</span>
                  <span class="font-semibold text-foreground">{{ itemValue(item, 'price', '$129.00') }}</span>
                </div>
                @if (rowAction() && canRowAction() && itemId(item)) { <button type="button" class="mt-3 w-full rounded-md border border-destructive/30 px-2 py-1 text-xs text-destructive" (click)="emitRowAction(item)">Delete</button> }
              </div>
            }
          </div>
        }
        @case ('product-hero') {
          <div class="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div class="text-xs uppercase tracking-wider text-muted-foreground">Product workspace</div>
                <div class="mt-1 text-xl font-bold">{{ objectValue('name', 'Aurora Headphones') }}</div>
                <div class="mt-1 text-sm text-muted-foreground">Premium wireless audio product with inventory and variant controls.</div>
              </div>
              <div class="rounded-lg bg-background px-4 py-3 text-right shadow-2xs">
                <div class="text-xs text-muted-foreground">Current price</div>
                <div class="text-2xl font-bold">{{ objectValue('price', '$129.00') }}</div>
              </div>
            </div>
            @if (node().events?.['publish'] && canEvent()(node().events?.['publish'] || '')) { <button type="button" class="mt-4 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground" (click)="emitEvent('publish')">Publish product</button> }
            @if (node().events?.['archive'] && canEvent()(node().events?.['archive'] || '')) { <button type="button" class="ms-2 mt-4 rounded-md border border-destructive/30 px-3 py-2 text-xs font-medium text-destructive" (click)="emitEvent('archive')">Archive product</button> }
          </div>
        }
        @case ('pricing-margin-panel') {
          <div class="grid gap-3 sm:grid-cols-3">
            <div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Selling price</div><div class="mt-1 text-xl font-bold">{{ money(objectValue('price', 0)) }}</div></div>
            <div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Cost price</div><div class="mt-1 text-xl font-bold">{{ money(objectValue('costPrice', 0)) }}</div></div>
            <div class="rounded-lg bg-emerald-500/10 p-3"><div class="text-xs text-muted-foreground">Gross margin</div><div class="mt-1 text-xl font-bold text-emerald-700">{{ marginPercent() }}%</div><div class="text-xs text-muted-foreground">{{ money(marginValue()) }} per unit</div></div>
          </div>
        }
        @case ('product-seo-panel') {
          <div class="space-y-3">
            <div class="grid gap-3 sm:grid-cols-2"><div><div class="text-xs text-muted-foreground">Meta title</div><div class="mt-1 font-medium">{{ seoValue('title', 'Product title') }}</div></div><div><div class="text-xs text-muted-foreground">Canonical URL</div><div class="mt-1 truncate font-mono text-xs">{{ seoValue('canonicalUrl', 'Not configured') }}</div></div></div>
            <div><div class="text-xs text-muted-foreground">Description</div><div class="mt-1 text-sm">{{ seoValue('description', 'Add search-friendly product copy.') }}</div></div>
          </div>
        }
        @case ('activity-timeline') {
          <div class="space-y-3">
            @for (event of activityRows(); track $index) { <div class="flex gap-3"><div class="mt-1 size-2 shrink-0 rounded-full bg-primary"></div><div class="min-w-0"><div class="text-sm font-medium">{{ itemValue(event, 'action', 'Activity event') }}</div><div class="text-xs text-muted-foreground">{{ itemValue(event, 'actorId', itemValue(event, 'actor', 'system')) }} · {{ itemValue(event, 'createdAt', 'just now') }}</div></div></div> }
          </div>
        }
        @case ('category-ordering') {
          <div class="space-y-2"><p class="text-xs text-muted-foreground">Drag a category onto another row to move it in the hierarchy, or use the ordering controls.</p>@for (category of categoryItems(); track $index) { <div draggable="true" (dragstart)="dragCategory(category)" (dragover)="$event.preventDefault()" (drop)="dropCategory(category, $index)" class="flex items-center gap-2 rounded-lg border border-border px-3 py-2"><span class="cursor-grab text-muted-foreground">⋮⋮</span><span class="flex-1 text-sm">{{ itemLabel(category, 'Category') }}</span><button type="button" class="rounded border border-border px-2 py-1 text-xs" (click)="emitAction('category.reorder', { id: itemId(category), sortOrder: $index - 1 })">↑</button><button type="button" class="rounded border border-border px-2 py-1 text-xs" (click)="emitAction('category.reorder', { id: itemId(category), sortOrder: $index + 1 })">↓</button></div> }</div>
        }
        @case ('category-merge') {
          <div class="space-y-3"><p class="text-xs text-muted-foreground">Merge a source category into another category. Products and child categories will follow the selected target in the API workflow.</p><div class="grid gap-2 sm:grid-cols-2">@for (category of categoryItems(); track $index) { @if ($index > 0) { <button type="button" class="rounded-lg border border-border px-3 py-2 text-left text-xs hover:bg-muted" [disabled]="!canAction()" (click)="mergeCategory(category)">Merge {{ itemLabel(category, 'category') }} into {{ itemLabel(categoryItems()[0], 'root category') }}</button> } }</div></div>
        }
        @case ('shipment-tracking') {
          <div class="space-y-3"><div class="flex items-center justify-between"><div><div class="text-xs text-muted-foreground">Carrier</div><div class="font-semibold">{{ shipmentValue('carrier', 'Not assigned') }}</div></div><div class="text-right"><div class="text-xs text-muted-foreground">Tracking</div><div class="font-mono text-xs">{{ shipmentValue('trackingNumber', 'Pending') }}</div></div></div><div class="rounded-lg bg-muted/40 p-3 text-sm">{{ shipmentValue('status', 'unfulfilled') }}</div><div class="flex gap-2">@if (node().events?.['ship'] && canEvent()(node().events?.['ship'] || '')) { <button type="button" class="rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground" (click)="emitEvent('ship')">Mark shipped</button> } @if (node().events?.['deliver'] && canEvent()(node().events?.['deliver'] || '')) { <button type="button" class="rounded-md border border-border px-3 py-2 text-xs" (click)="emitEvent('deliver')">Mark delivered</button> }</div></div>
        }
        @case ('invoice-preview') {
          <div class="space-y-3"><div class="rounded-lg border border-dashed border-border p-4"><div class="text-xs text-muted-foreground">Invoice</div><div class="mt-1 font-semibold">{{ invoiceValue('number', 'Invoice pending') }}</div><div class="mt-1 text-xs text-muted-foreground">{{ invoiceValue('issuedAt', 'Not issued') }}</div></div>@if (invoiceValue('pdfUrl', '')) { <a class="inline-flex rounded-md border border-border px-3 py-2 text-xs" [href]="invoiceValue('pdfUrl', '')" target="_blank" rel="noopener">Open invoice</a> }</div>
        }
        @case ('workspace-switcher') {
          <div class="space-y-3">@for (organization of records([{ id: 'org-demo', name: 'Commerce workspace', slug: 'commerce', plan: 'pro', status: 'active' }]); track $index) { <div class="flex items-center gap-3 rounded-lg border border-border px-3 py-3"><div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">⌂</div><div class="flex-1"><div class="font-medium">{{ itemValue(organization, 'name', 'Workspace') }}</div><div class="text-xs text-muted-foreground">{{ itemValue(organization, 'slug', 'workspace') }} · {{ itemValue(organization, 'plan', 'free') }}</div></div><span class="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-700">{{ itemValue(organization, 'status', 'active') }}</span>@if (rowAction() && canRowAction() && itemId(organization)) { <button type="button" class="rounded border border-destructive/30 px-2 py-1 text-xs text-destructive" (click)="emitRowAction(organization)">Delete</button> }</div> }</div>
        }
        @case ('organization-settings') {
          <div class="space-y-4"><div><div class="text-xs text-muted-foreground">Workspace</div><div class="mt-1 text-xl font-bold">{{ itemValue(data(), 'name', 'Workspace') }}</div><div class="mt-1 text-xs text-muted-foreground">{{ itemValue(data(), 'slug', 'workspace') }}</div></div><div class="grid gap-2 sm:grid-cols-3"><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Plan</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'plan', 'free') }}</div></div><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Status</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'status', 'active') }}</div></div><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Timezone</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'timezone', 'UTC') }}</div></div></div></div>
        }
        @case ('member-summary') {
          <div class="space-y-2"><div class="text-sm font-semibold">Members</div>@for (member of organizationMembers(); track $index) { <div class="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs"><span>{{ itemValue(member, 'name', itemValue(member, 'email', 'Member')) }}</span><span class="text-muted-foreground">{{ itemValue(member, 'role', 'member') }}</span></div> }</div>
        }
        @case ('notification-center') {
          <div class="space-y-2">@for (notification of records([{ id: 'notice-demo', type: 'info', title: 'Welcome', message: 'Your workspace is ready.', read: false }]); track $index) { <div class="flex gap-3 rounded-lg border border-border px-3 py-3" [class.bg-primary\\/5]="!notificationRead(notification)"><div class="mt-1 size-2 shrink-0 rounded-full" [class.bg-destructive]="notificationType(notification) === 'critical'" [class.bg-amber-500]="notificationType(notification) === 'warning'" [class.bg-primary]="notificationType(notification) !== 'critical' && notificationType(notification) !== 'warning'"></div><div class="min-w-0 flex-1"><div class="font-medium">{{ itemValue(notification, 'title', 'Notification') }}</div><div class="text-xs text-muted-foreground">{{ itemValue(notification, 'message', '') }}</div></div>@if (!notificationRead(notification) && canEvent()(readAction() || '')) { <button type="button" class="rounded border border-border px-2 py-1 text-[10px]" (click)="markNotificationRead(notification)">Mark read</button> }@if (rowAction() && canRowAction() && itemId(notification)) { <button type="button" class="rounded border border-destructive/30 px-2 py-1 text-[10px] text-destructive" (click)="emitRowAction(notification)">Delete</button> }</div> }</div>
        }
        @case ('setup-wizard') {
          <div class="mx-auto w-full max-w-3xl space-y-5"><div class="flex items-center gap-2">@for (step of wizardSteps(); track $index) { <div class="flex flex-1 items-center gap-2"><div class="flex size-8 items-center justify-center rounded-full text-xs font-semibold" [class.bg-primary]="$index <= wizardStep()" [class.text-primary-foreground]="$index <= wizardStep()" [class.bg-muted]="$index > wizardStep()">{{ $index + 1 }}</div>@if ($index < wizardSteps().length - 1) { <div class="h-1 flex-1 rounded bg-muted"><div class="h-full rounded bg-primary transition-all" [style.width.%]="$index < wizardStep() ? 100 : 0"></div></div> }</div> }</div><div class="rounded-xl border border-border p-5"><div class="text-xs uppercase tracking-wider text-muted-foreground">Step {{ wizardStep() + 1 }} of {{ wizardSteps().length }}</div><h2 class="mt-1 text-xl font-bold">{{ wizardSteps()[wizardStep()]?.title || 'Setup' }}</h2><p class="mt-2 text-sm text-muted-foreground">{{ wizardSteps()[wizardStep()]?.description || 'Configure your application.' }}</p><div class="mt-5 space-y-3">@for (field of wizardSteps()[wizardStep()]?.fields || []; track field.name) { <label class="block space-y-1.5"><span class="text-xs font-semibold text-muted-foreground">{{ field.label }}</span><input class="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" [placeholder]="field.placeholder || ''" [value]="wizardValues()[field.name] || ''" (input)="wizardValueChanged(field.name, $event)" /></label> }</div></div><div class="flex justify-between"><button type="button" class="rounded-md border border-border px-3 py-2 text-xs" [disabled]="wizardStep() === 0" (click)="wizardBack()">Back</button>@if (wizardStep() < wizardSteps().length - 1) { <button type="button" class="rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground" (click)="wizardNext()">Continue</button> } @else { <button type="button" class="rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground" (click)="wizardFinish()">Finish setup</button> }</div></div>
        }
        @case ('help-center') {
          <div class="space-y-5"><div class="rounded-xl bg-primary/5 p-5"><div class="text-xs uppercase tracking-wider text-muted-foreground">Support center</div><h2 class="mt-1 text-2xl font-bold">How can we help?</h2><input class="mt-4 h-10 w-full rounded-md border border-input bg-background px-3 text-sm" placeholder="Search guides, billing, and API help..." (input)="helpSearchChanged($event)" /></div><div class="grid gap-3 md:grid-cols-3">@for (category of helpCategories(); track category.title) { <div class="rounded-lg border border-border p-4"><div class="font-semibold">{{ category.title }}</div><div class="mt-1 text-xs text-muted-foreground">{{ category.description }}</div><div class="mt-3 text-xs text-primary">{{ category.articles }} articles</div></div> }</div><div class="space-y-2"><h3 class="font-semibold">Popular questions</h3>@for (article of helpArticles(); track article.title) { <details class="rounded-lg border border-border p-3"><summary class="cursor-pointer text-sm font-medium">{{ article.title }}</summary><p class="mt-2 text-xs leading-5 text-muted-foreground">{{ article.answer }}</p></details> }</div></div>
        }
        @case ('feature-flag-list') {
          <div class="space-y-2">@for (flag of records([{ id: 'flag-demo', key: 'new_checkout', name: 'New checkout', enabled: true, rollout: 25, environment: 'staging' }]); track $index) { <div class="flex items-center gap-3 rounded-lg border border-border px-3 py-3"><div class="flex-1 min-w-0"><div class="font-mono text-xs">{{ itemValue(flag, 'key', 'feature_flag') }}</div><div class="text-sm font-medium">{{ itemValue(flag, 'name', 'Feature flag') }}</div><div class="text-xs text-muted-foreground">{{ itemValue(flag, 'environment', 'development') }} · {{ itemValue(flag, 'rollout', 0) }}% rollout</div></div><button type="button" class="rounded-full px-3 py-1 text-xs" [class.bg-emerald-500\/15]="flagEnabled(flag)" [class.bg-muted]="!flagEnabled(flag)" [disabled]="!canEvent()(toggleAction() || '')" (click)="toggleFlag(flag)">{{ flagEnabled(flag) ? 'Enabled' : 'Disabled' }}</button>@if (rowAction() && canRowAction() && itemId(flag)) { <button type="button" class="rounded border border-destructive/30 px-2 py-1 text-xs text-destructive" (click)="emitRowAction(flag)">Delete</button> }</div> }</div>
        }
        @case ('plan-summary') {
          <div class="space-y-4"><div class="flex items-start justify-between"><div><div class="text-xs text-muted-foreground">Current plan</div><div class="mt-1 text-2xl font-bold">{{ subscriptionValue('plan', 'free') }}</div><div class="text-xs text-muted-foreground">{{ subscriptionValue('status', 'trialing') }}</div></div><div class="text-right"><div class="text-xs text-muted-foreground">Renewal</div><div class="font-semibold">{{ subscriptionValue('renewalAt', 'Not scheduled') }}</div></div></div><div class="grid gap-2 sm:grid-cols-3"><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Amount</div><div class="mt-1 font-semibold">{{ money(subscriptionValue('amount', 0)) }}</div></div><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Seats</div><div class="mt-1 font-semibold">{{ subscriptionValue('seats', 1) }}</div></div><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Currency</div><div class="mt-1 font-semibold">{{ subscriptionValue('currency', 'USD') }}</div></div></div>@if (node().events?.['cancel'] && canEvent()(node().events?.['cancel'] || '')) { <button type="button" class="rounded-md border border-destructive/30 px-3 py-2 text-xs text-destructive" (click)="emitEvent('cancel')">Cancel subscription</button> }</div>
        }
        @case ('payment-method') {
          <div class="space-y-3"><div class="text-sm font-semibold">Payment method</div><div class="rounded-lg border border-border bg-muted/30 p-4"><div class="font-mono text-sm">{{ paymentValue('brand', 'Card') }} •••• {{ paymentValue('last4', '4242') }}</div><div class="mt-1 text-xs text-muted-foreground">Expires {{ paymentValue('expires', '12/30') }}</div></div></div>
        }
        @case ('invoice-list') {
          <div class="space-y-2">@for (invoice of invoiceRows(); track $index) { <div class="flex items-center gap-3 rounded-lg border border-border px-3 py-3"><div class="flex-1"><div class="font-mono text-xs">{{ itemValue(invoice, 'invoiceNumber', 'INV-0001') }}</div><div class="text-xs text-muted-foreground">Due {{ itemValue(invoice, 'dueDate', '—') }}</div></div><span class="font-semibold">{{ money(itemValue(invoice, 'amount', 0)) }}</span><span class="rounded-full bg-primary/10 px-2 py-1 text-[10px]">{{ itemValue(invoice, 'status', 'open') }}</span>@if (rowAction() && canRowAction() && itemId(invoice)) { <button type="button" class="rounded border border-destructive/30 px-2 py-1 text-xs text-destructive" (click)="emitRowAction(invoice)">Delete</button> }</div> }</div>
        }
        @case ('checkout-summary') {
          <div class="mx-auto max-w-2xl space-y-4 rounded-xl border border-border p-5"><div><div class="text-xs text-muted-foreground">Checkout</div><div class="mt-1 text-2xl font-bold">Choose your plan</div></div><div class="grid gap-3 sm:grid-cols-3">@for (plan of ['pro','enterprise','free']; track plan) { <button type="button" class="rounded-lg border border-border p-4 text-left hover:border-primary" [disabled]="!canAction()" (click)="emitConfiguredPayload({ plan, amount: plan === 'pro' ? 49 : plan === 'enterprise' ? 199 : 0, currency: 'USD', seats: 1, organizationId: itemValue(data(), 'organizationId', '') })"><div class="font-semibold">{{ plan }}</div><div class="mt-1 text-xs text-muted-foreground">{{ plan === 'free' ? '$0' : plan === 'pro' ? '$49/mo' : '$199/mo' }}</div></button> }</div></div>
        }
        @case ('settings-panel') {
          <div class="space-y-3"><div class="text-xs text-muted-foreground">Configuration</div><div class="text-lg font-semibold">{{ itemValue(data(), 'name', 'Feature flag') }}</div><div class="rounded-lg bg-muted/40 p-3 text-xs"><div>Key: <span class="font-mono">{{ itemValue(data(), 'key', 'flag') }}</span></div><div class="mt-1">Environment: {{ itemValue(data(), 'environment', 'development') }}</div><div class="mt-1">Rollout: {{ itemValue(data(), 'rollout', 0) }}%</div></div><div class="text-xs text-muted-foreground">{{ itemValue(data(), 'description', 'No description provided.') }}</div></div>
        }
        @case ('api-key-manager') {
          <div class="space-y-2">@for (key of records([{ id: 'key-demo', name: 'Production integration', prefix: 'fa_live_', status: 'active', lastUsedAt: 'Never' }]); track $index) { <div class="flex items-center gap-3 rounded-lg border border-border px-3 py-3"><div class="flex-1"><div class="font-medium">{{ itemValue(key, 'name', 'API key') }}</div><div class="font-mono text-xs text-muted-foreground">{{ itemValue(key, 'prefix', 'key_') }}••••••••</div></div><span class="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-700">{{ itemValue(key, 'status', 'active') }}</span>@if (revokeAction() && canEvent()(revokeAction() || '') && itemId(key) && itemValue(key, 'status', 'active') === 'active') { <button type="button" class="rounded border border-amber-500/40 px-2 py-1 text-xs text-amber-700" (click)="emitAction(revokeAction() || '', { id: itemId(key), status: 'revoked' })">Revoke</button> }@if (rowAction() && canRowAction() && itemId(key)) { <button type="button" class="rounded border border-destructive/30 px-2 py-1 text-xs text-destructive" (click)="emitRowAction(key)">Delete</button> }</div> }</div>
        }
        @case ('webhook-list') {
          <div class="space-y-2">@for (hook of records([{ id: 'hook-demo', name: 'Order events', url: 'https://example.com/hooks/orders', status: 'active', failureCount: 0 }]); track $index) { <div class="flex items-center gap-3 rounded-lg border border-border px-3 py-3"><div class="flex-1 min-w-0"><div class="font-medium">{{ itemValue(hook, 'name', 'Webhook') }}</div><div class="truncate text-xs text-muted-foreground">{{ itemValue(hook, 'url', 'https://example.com') }}</div></div><span class="rounded-full bg-primary/10 px-2 py-1 text-[10px]">{{ itemValue(hook, 'status', 'active') }}</span><span class="text-xs text-muted-foreground">{{ itemValue(hook, 'failureCount', 0) }} failures</span>@if (rowAction() && canRowAction() && itemId(hook)) { <button type="button" class="rounded border border-destructive/30 px-2 py-1 text-xs text-destructive" (click)="emitRowAction(hook)">Delete</button> }</div> }</div>
        }
        @case ('integration-detail') {
          <div class="rounded-lg border border-border p-4"><div class="text-sm font-semibold">Integration detail</div><div class="mt-2 text-xs text-muted-foreground">Configure credentials, event scopes, delivery retries, and ownership from the associated integration form.</div></div>
        }
        @case ('support-inbox') {
          <div class="space-y-3">@for (ticket of records([{ id: 'ticket-demo', subject: 'Payment confirmation needed', customerName: 'Demo customer', priority: 'high', status: 'open' }]); track $index) { <div class="flex items-center gap-3 rounded-lg border border-border px-3 py-3"><div class="flex-1 min-w-0"><div class="truncate font-medium">{{ itemValue(ticket, 'subject', 'Support ticket') }}</div><div class="text-xs text-muted-foreground">{{ itemValue(ticket, 'customerName', 'Customer') }}</div></div><span class="rounded-full bg-amber-500/10 px-2 py-1 text-[10px]">{{ itemValue(ticket, 'priority', 'normal') }}</span><span class="rounded-full bg-primary/10 px-2 py-1 text-[10px]">{{ itemValue(ticket, 'status', 'open') }}</span>@if (rowAction() && canRowAction() && itemId(ticket)) { <button type="button" class="rounded border border-destructive/30 px-2 py-1 text-xs text-destructive" (click)="emitRowAction(ticket)">Delete</button> }</div> }</div>
        }
        @case ('ticket-detail') {
          <div class="space-y-4"><div><div class="text-xs text-muted-foreground">Ticket</div><div class="mt-1 text-xl font-bold">{{ itemValue(data(), 'subject', 'Support ticket') }}</div><div class="mt-1 text-xs text-muted-foreground">{{ itemValue(data(), 'customerEmail', 'customer@example.com') }}</div></div><div class="grid gap-2 sm:grid-cols-3"><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Status</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'status', 'open') }}</div></div><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Priority</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'priority', 'normal') }}</div></div><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Assignee</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'assignee', 'Unassigned') }}</div></div></div><div class="flex gap-2">@if (node().events?.['resolve'] && canEvent()(node().events?.['resolve'] || '')) { <button type="button" class="rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground" (click)="emitEvent('resolve')">Resolve</button> } @if (node().events?.['close'] && canEvent()(node().events?.['close'] || '')) { <button type="button" class="rounded-md border border-destructive/30 px-3 py-2 text-xs text-destructive" (click)="emitEvent('close')">Close ticket</button> }</div></div>
        }
        @case ('ticket-timeline') {
          <div class="space-y-3">@for (message of ticketMessages(); track $index) { <div class="rounded-lg border border-border p-3"><div class="flex items-center justify-between text-xs"><span class="font-semibold">{{ itemValue(message, 'author', 'Customer') }}</span><span class="text-muted-foreground">{{ itemValue(message, 'createdAt', 'Recently') }}</span></div><div class="mt-2 text-sm">{{ itemValue(message, 'body', 'No message body') }}</div></div> }</div>
        }
        @case ('assignment-panel') {
          <div class="space-y-3"><div class="text-sm font-semibold">Assignment</div><select class="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" [value]="itemValue(data(), 'assignee', '')" (change)="assignmentChanged($event)"><option value="">Unassigned</option><option value="support@commerce.local">Support team</option><option value="sadia@commerce.local">Sadia</option><option value="rahim@commerce.local">Rahim</option></select><button type="button" class="rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground" [disabled]="!canAction()" (click)="emitConfiguredPayload({ assignee: assignmentValue })">Assign ticket</button></div>
        }
        @case ('internal-notes') {
          <div class="space-y-2"><div class="text-sm font-semibold">Internal notes</div><textarea class="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" [value]="notesValue()" (input)="notesChanged($event)"></textarea><button type="button" class="rounded-md border border-border px-3 py-2 text-xs" [disabled]="!canAction()" (click)="emitConfiguredPayload({ internalNotes: notesPayload() })">Save internal note</button></div>
        }
        @case ('task-board') {
          <div class="grid gap-3 lg:grid-cols-5">@for (column of taskColumns; track column.status) { <div class="min-h-48 rounded-xl bg-muted/30 p-2" (dragover)="$event.preventDefault()" (drop)="dropTask(column.status)"><div class="mb-2 flex items-center justify-between px-1"><span class="text-xs font-semibold">{{ column.label }}</span><span class="text-[10px] text-muted-foreground">{{ taskBucket(column.status).length }}</span></div>@for (task of taskBucket(column.status); track $index) { <div draggable="true" (dragstart)="dragTask(task)" class="mb-2 cursor-grab rounded-lg border border-border bg-background p-3 shadow-2xs"><div class="text-sm font-medium">{{ itemValue(task, 'title', 'Task') }}</div><div class="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>{{ itemValue(task, 'assignee', 'Unassigned') }}</span><span>{{ itemValue(task, 'priority', 'normal') }}</span></div></div> }</div> }</div>
        }
        @case ('task-calendar') {
          <div class="space-y-3"><div class="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted-foreground">@for (day of calendarDays; track day) { <span>{{ day }}</span> }</div><div class="grid grid-cols-7 gap-1">@for (slot of calendarSlots(); track $index) { <div class="min-h-20 rounded border border-border bg-muted/20 p-1"><div class="text-[10px] text-muted-foreground">{{ slot.day }}</div>@for (task of slot.tasks; track $index) { <div class="mt-1 truncate rounded bg-primary/10 px-1 py-0.5 text-[10px]">{{ itemValue(task, 'title', 'Task') }}</div> }</div> }</div></div>
        }
        @case ('task-detail') {
          <div class="space-y-4"><div><div class="text-xs text-muted-foreground">Task</div><div class="mt-1 text-xl font-bold">{{ itemValue(data(), 'title', 'Task') }}</div><div class="mt-1 text-sm text-muted-foreground">{{ itemValue(data(), 'description', 'No description') }}</div></div><div class="grid gap-2 sm:grid-cols-3"><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Status</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'status', 'backlog') }}</div></div><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Priority</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'priority', 'normal') }}</div></div><div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Due date</div><div class="mt-1 font-semibold">{{ itemValue(data(), 'dueDate', 'Not scheduled') }}</div></div></div>@if (node().events?.['complete'] && canEvent()(node().events?.['complete'] || '')) { <button type="button" class="rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground" (click)="emitEvent('complete')">Complete task</button> }</div>
        }
        @case ('task-timeline') {
          <div class="space-y-3"><div class="text-sm font-semibold">Task activity</div><div class="rounded-lg border border-border p-3 text-xs"><div class="font-medium">{{ itemValue(data(), 'status', 'backlog') }}</div><div class="mt-1 text-muted-foreground">Assigned to {{ itemValue(data(), 'assignee', 'unassigned') }}</div></div><div class="rounded-lg border border-border p-3 text-xs"><div class="font-medium">Project</div><div class="mt-1 text-muted-foreground">{{ itemValue(data(), 'project', 'General') }}</div></div></div>
        }
        @case ('workflow-list') {
          <div class="space-y-3">@for (workflow of records([{ id: 'wf-demo', name: 'Order fulfillment', status: 'draft', version: 1 }]); track $index) { <div class="flex items-center gap-3 rounded-lg border border-border px-3 py-3"><div class="flex-1"><div class="font-medium">{{ itemValue(workflow, 'name', 'Workflow') }}</div><div class="text-xs text-muted-foreground">Version {{ itemValue(workflow, 'version', 1) }}</div></div><span class="rounded-full bg-primary/10 px-2 py-1 text-[10px]">{{ itemValue(workflow, 'status', 'draft') }}</span>@if (rowAction() && canRowAction() && itemId(workflow)) { <button type="button" class="rounded border border-destructive/30 px-2 py-1 text-xs text-destructive" (click)="emitRowAction(workflow)">Delete</button> }</div> }</div>
        }
        @case ('workflow-canvas') {
          <div class="space-y-4"><div class="flex items-center justify-between"><div><div class="text-xs text-muted-foreground">Workflow canvas</div><div class="text-lg font-semibold">{{ itemValue(data(), 'name', 'Untitled workflow') }}</div></div>@if (node().events?.['publish'] && canEvent()(node().events?.['publish'] || '')) { <button type="button" class="rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground" (click)="emitEvent('publish')">Publish workflow</button> }</div><div class="grid gap-3 md:grid-cols-3">@for (workflowNode of workflowNodes(); track $index) { <div class="rounded-xl border border-primary/20 bg-primary/5 p-3"><div class="text-[10px] uppercase tracking-wider text-muted-foreground">{{ itemValue(workflowNode, 'type', 'action') }}</div><div class="mt-1 font-medium">{{ itemValue(workflowNode, 'label', itemValue(workflowNode, 'name', 'Workflow node')) }}</div><div class="mt-2 text-xs text-muted-foreground">{{ itemValue(workflowNode, 'description', 'Configure this node in the editor.') }}</div></div> }</div></div>
        }
        @case ('node-config') {
          <div class="space-y-3"><div class="text-xs text-muted-foreground">Selected node configuration</div>@for (workflowNode of workflowNodes().slice(0, 1); track $index) { <dl class="space-y-2 text-xs"><div><dt class="text-muted-foreground">Type</dt><dd class="font-medium">{{ itemValue(workflowNode, 'type', 'trigger') }}</dd></div><div><dt class="text-muted-foreground">Label</dt><dd class="font-medium">{{ itemValue(workflowNode, 'label', 'Start workflow') }}</dd></div><div><dt class="text-muted-foreground">Configuration</dt><dd class="rounded bg-muted p-2 font-mono">{{ jsonFor(workflowNode) }}</dd></div></dl> }</div>
        }
        @case ('execution-log') {
          <div class="space-y-2">@for (run of executionRows(); track $index) { <div class="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs"><div><div class="font-medium">{{ itemValue(run, 'status', 'completed') }}</div><div class="text-muted-foreground">{{ itemValue(run, 'startedAt', 'Recently') }}</div></div><span class="font-mono text-muted-foreground">{{ itemValue(run, 'duration', '—') }}</span></div> }</div>
        }
        @case ('media-library') {
          <div class="space-y-4"><label class="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 p-6 text-center hover:bg-muted/40"><input class="hidden" type="file" multiple (change)="filesSelected($event)" /><span class="text-sm font-semibold">Drop files here or choose files</span><span class="mt-1 text-xs text-muted-foreground">Images, documents, and media metadata are registered through the API contract.</span></label><div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">@for (file of fileItems(); track $index) { <div class="overflow-hidden rounded-lg border border-border"><div class="flex aspect-square items-center justify-center bg-muted/30">@if (fileIsImage(file)) { <img class="size-full object-cover" [src]="fileValue(file, 'url', '')" [alt]="fileValue(file, 'filename', 'Media file')" /> } @else { <span class="text-2xl text-muted-foreground">▧</span> }</div><div class="space-y-1 p-2"><div class="truncate text-xs font-medium">{{ fileValue(file, 'filename', 'Media file') }}</div><div class="text-[10px] text-muted-foreground">{{ fileValue(file, 'mimeType', 'file') }} · {{ fileValue(file, 'status', 'uploaded') }}</div>@if (rowAction() && canRowAction() && itemId(file)) { <button type="button" class="w-full rounded border border-destructive/30 px-2 py-1 text-[10px] text-destructive" (click)="emitRowAction(file)">Delete</button> }</div></div> }</div></div>
        }
        @case ('file-detail') {
          <div class="space-y-4"><div class="flex items-center gap-4">@if (fileIsImage(data())) { <img class="size-24 rounded-lg object-cover" [src]="fileValue(data(), 'url', '')" [alt]="fileValue(data(), 'filename', 'Media file')" /> } @else { <div class="flex size-24 items-center justify-center rounded-lg bg-muted text-3xl">▧</div> }<div><div class="font-semibold">{{ fileValue(data(), 'filename', 'Media file') }}</div><div class="text-xs text-muted-foreground">{{ fileValue(data(), 'mimeType', 'unknown') }} · {{ fileValue(data(), 'size', '0') }} bytes</div></div></div><dl class="grid gap-2 text-xs sm:grid-cols-2"><div><dt class="text-muted-foreground">Object key</dt><dd class="truncate font-mono">{{ fileValue(data(), 'objectKey', 'n/a') }}</dd></div><div><dt class="text-muted-foreground">Status</dt><dd>{{ fileValue(data(), 'status', 'uploaded') }}</dd></div></dl></div>
        }
        @case ('upload-panel') {
          <div class="space-y-3"><div class="text-sm font-semibold">Replace media</div><input class="block w-full text-xs" type="file" (change)="replaceFileSelected($event)" /><p class="text-xs text-muted-foreground">The selected file is prepared as a metadata mutation and can be connected to presigned storage by the selected API adapter.</p></div>
        }
        @case ('request-metadata') {
          <dl class="grid gap-2 text-xs sm:grid-cols-2"><div><dt class="text-muted-foreground">Method</dt><dd class="font-mono">{{ itemValue(data(), 'method', 'POST') }}</dd></div><div><dt class="text-muted-foreground">Path</dt><dd class="truncate font-mono">{{ itemValue(data(), 'path', '/api/v1') }}</dd></div><div><dt class="text-muted-foreground">Correlation ID</dt><dd class="truncate font-mono">{{ itemValue(data(), 'correlationId', 'n/a') }}</dd></div><div><dt class="text-muted-foreground">User agent</dt><dd class="truncate">{{ itemValue(data(), 'userAgent', 'n/a') }}</dd></div></dl>
        }
        @case ('severity-summary') {
          <div class="grid grid-cols-3 gap-2"><div class="rounded-lg bg-emerald-500/10 p-3 text-center"><div class="text-lg font-bold text-emerald-700">{{ severityCount('info') }}</div><div class="text-xs">Info</div></div><div class="rounded-lg bg-amber-500/10 p-3 text-center"><div class="text-lg font-bold text-amber-700">{{ severityCount('warning') }}</div><div class="text-xs">Warning</div></div><div class="rounded-lg bg-red-500/10 p-3 text-center"><div class="text-lg font-bold text-red-700">{{ severityCount('critical') }}</div><div class="text-xs">Critical</div></div></div>
        }
        @case ('actor-resource-links') {
          <div class="flex flex-wrap gap-2"><span class="rounded-full border border-border px-3 py-1 text-xs">Actor: {{ itemValue(data(), 'actorId', 'system') }}</span><span class="rounded-full border border-border px-3 py-1 text-xs">Resource: {{ itemValue(data(), 'resourceType', 'unknown') }}</span><span class="rounded-full border border-border px-3 py-1 text-xs">{{ itemValue(data(), 'resourceId', 'n/a') }}</span></div>
        }
        @case ('media-gallery') {
          <div class="grid grid-cols-3 gap-3">
            @for (image of mediaItems(); track $index) {
              <div class="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-muted via-primary/10 to-muted">
                @if (mediaUrl(image)) { <img class="size-full object-cover" [src]="mediaUrl(image)" [alt]="mediaAlt(image)" /> }
              </div>
            }
          </div>
        }
        @case ('inventory-panel') {
          <div class="space-y-3">
            @for (row of inventoryRows(); track $index) {
              <div>
                <div class="mb-1 flex justify-between text-xs"><span>{{ itemLabel(row, 'Warehouse') }}</span><span class="font-semibold">{{ itemValue(row, 'available', itemValue(row, 'quantity', 0)) }}</span></div>
                <div class="h-2 overflow-hidden rounded-full bg-muted"><div class="h-full rounded-full bg-primary" [style.width.%]="inventoryPercent(row)"></div></div>
              </div>
            }
          </div>
        }
        @case ('variant-matrix') {
          <div class="overflow-hidden rounded-lg border border-border">
            <div class="grid grid-cols-4 bg-muted/50 px-3 py-2 text-xs font-semibold"><span>Variant</span><span>SKU</span><span>Stock</span><span>Status</span></div>
            @for (variant of variantRows(); track $index) {
              <div class="grid grid-cols-4 border-t border-border px-3 py-2 text-xs"><span>{{ itemLabel(variant, 'Variant') }}</span><span class="font-mono">{{ itemValue(variant, 'sku', 'SKU') }}</span><span>{{ itemValue(variant, 'stock', 0) }}</span><span class="text-emerald-600">{{ itemValue(variant, 'status', 'active') }}</span></div>
            }
          </div>
        }
        @case ('category-tree') {
          <div class="space-y-1 text-sm">
            @for (category of categoryItems(); track $index) {
              <div class="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted"><span class="text-muted-foreground">└</span><span>{{ itemLabel(category, 'Category') }}</span><span class="ms-auto text-xs text-muted-foreground">{{ itemValue(category, 'count', $index + 2) }}</span></div>
            }
          </div>
        }
        @case ('category-inspector') {
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Selected category</div><div class="mt-1 font-semibold">Electronics</div></div>
            <div class="rounded-lg bg-muted/40 p-3"><div class="text-xs text-muted-foreground">Products</div><div class="mt-1 text-xl font-bold">128</div></div>
          </div>
        }
        @case ('stat-grid') {
          <div class="grid grid-cols-2 gap-3 xl:grid-cols-4">
            @for (stat of statRows(); track stat.label) {
              <div class="rounded-lg border border-border bg-background p-3"><div class="text-xs text-muted-foreground">{{ stat.label }}</div><div class="mt-1 text-2xl font-bold">{{ stat.value }}</div><div class="mt-1 text-xs text-emerald-600">{{ stat.change }}</div></div>
            }
          </div>
        }
        @case ('chart') {
          @if (chartType() === 'pie') {
            <div class="flex flex-col items-center gap-4 rounded-lg bg-muted/30 p-5 sm:flex-row"><div class="size-36 rounded-full" [style.background]="pieGradient()"></div><div class="space-y-2 text-xs">@for (item of chartLegend(); track item.label) { <div class="flex items-center gap-2"><span class="size-2 rounded-full" [style.background]="item.color"></span><span>{{ item.label }}</span><span class="font-semibold">{{ item.value }}</span></div> }</div></div>
          } @else if (chartType() === 'line' || chartType() === 'area') {
            <div class="rounded-lg bg-muted/30 p-4"><svg viewBox="0 0 600 180" class="h-48 w-full" preserveAspectRatio="none"><polyline [attr.points]="chartPoints()" fill="none" stroke="currentColor" stroke-width="4" class="text-primary" /><polyline *ngIf="chartType() === 'area'" [attr.points]="areaPoints()" fill="currentColor" fill-opacity="0.12" stroke="none" class="text-primary" /></svg></div>
          } @else {
            <div class="flex h-48 items-end gap-2 rounded-lg bg-muted/30 p-4">@for (height of chartValues(); track $index) { <div class="flex-1 rounded-t bg-primary/70" [style.height.%]="height"></div> }</div>
          }
        }
        @case ('audit-filter-bar') {
          <div class="flex flex-wrap gap-2"><span class="rounded-md border border-border px-3 py-2 text-xs">Last 30 days</span><span class="rounded-md border border-border px-3 py-2 text-xs">All severities</span><span class="rounded-md border border-border px-3 py-2 text-xs">All actors</span></div>
        }
        @case ('audit-table') {
          <div class="mb-3 flex flex-wrap items-center gap-2">
            <input class="h-9 min-w-44 rounded-md border border-input bg-background px-3 text-xs" [value]="query().search" placeholder="Search audit events..." (input)="searchChanged($event)" />
            @for (field of filterFields(); track field) { <input class="h-9 w-32 rounded-md border border-input bg-background px-3 text-xs" [value]="filterValue(field)" [placeholder]="'Filter ' + field" (input)="filterChanged(field, $event)" /> }
            <button type="button" class="rounded-md border border-border px-3 py-1.5 text-xs" (click)="toggleSort()">Sort {{ query().sortDirection || 'off' }}</button>
            <button type="button" class="ms-auto rounded-md border border-border px-3 py-1.5 text-xs" [disabled]="!canAction() || mutation().status === 'pending'" (click)="emitConfiguredAction('json')">Export audit data</button>
          </div>
          <div class="overflow-hidden rounded-lg border border-border">
            @for (event of auditRows(); track $index) { <div class="grid grid-cols-[1fr_auto] gap-3 border-b border-border px-3 py-3 last:border-b-0"><div><div class="text-sm font-medium">{{ itemValue(event, 'action', 'Audit event') }}</div><div class="text-xs text-muted-foreground">{{ itemValue(event, 'actor', 'system') }} · {{ itemValue(event, 'time', 'just now') }}</div></div><span class="h-fit rounded-full bg-amber-500/10 px-2 py-1 text-[10px] text-amber-700">{{ itemValue(event, 'severity', 'info') }}</span></div> }
          </div>
        }
        @case ('audit-detail') {
          <dl class="grid gap-3 sm:grid-cols-2">@for (item of auditMetaRows(); track item.label) { <div class="rounded-lg bg-muted/40 p-3"><dt class="text-xs text-muted-foreground">{{ item.label }}</dt><dd class="mt-1 text-sm font-medium">{{ item.value }}</dd></div> }</dl>
        }
        @case ('json-viewer') {
          <pre class="overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-200">{{ jsonValue() }}</pre>
        }
        @case ('diff-viewer') {
          <div class="grid gap-3 md:grid-cols-2"><pre class="rounded-lg bg-red-500/10 p-4 text-xs text-red-700">- status: draft\n- price: 119.00</pre><pre class="rounded-lg bg-emerald-500/10 p-4 text-xs text-emerald-700">+ status: active\n+ price: 129.00</pre></div>
        }
        @default {
          <div class="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground">Registry component ready: <span class="font-mono text-xs">{{ entry().id }}</span></div>
        }
      }
    </article>
  `,
})
export class ScreenBlockComponent {
  readonly node = input.required<ScreenBlockNode>()
  readonly entry = input.required<ScreenBlockEntry>()
  readonly data = input<unknown>(null)
  readonly state = input<ScreenBlockState>({ status: 'idle', data: null, error: null, updatedAt: null })
  readonly mutation = input<ScreenBlockMutationState>({ status: 'idle', data: null, error: null, updatedAt: null })
  readonly query = input<ScreenBlockQuery>({ search: '', filters: {}, sortField: null, sortDirection: null, page: 1, pageSize: 20, cursor: null })
  readonly filterFields = input<string[]>([])
  readonly canAction = input(true)
  readonly canEvent = input<(actionId: string) => boolean>(() => true)
  readonly canRowAction = input(true)
  readonly canBulkAction = input(true)
  readonly retry = output<void>()
  readonly submit = output<Record<string, unknown>>()
  readonly action = output<ScreenBlockAction>()
  readonly queryChange = output<Partial<ScreenBlockQuery>>()
  readonly form = new FormGroup({})
  private formDataReference: unknown = undefined
  private readonly selectedIds = signal<Set<string>>(new Set())
  readonly pendingAction = signal<ScreenBlockAction | null>(null)

  protected readonly stockRows = [
    { label: 'Main warehouse', value: '842', percent: 82 },
    { label: 'Dhaka fulfillment', value: '214', percent: 48 },
    { label: 'Chattogram fulfillment', value: '96', percent: 29 },
  ]
  protected readonly variants = [
    { name: 'Midnight / M', sku: 'AUR-M-MID', stock: '86', status: 'Active' },
    { name: 'Midnight / L', sku: 'AUR-L-MID', stock: '42', status: 'Active' },
    { name: 'Cloud / M', sku: 'AUR-M-CLO', stock: '18', status: 'Low stock' },
  ]
  protected readonly categories = ['Electronics', 'Audio', 'Wireless headphones', 'Accessories']
  protected readonly stats = [
    { label: 'Revenue', value: '$84.2k', change: '+12.4%' },
    { label: 'Orders', value: '1,284', change: '+8.1%' },
    { label: 'Products', value: '428', change: '+4.2%' },
    { label: 'Customers', value: '9,842', change: '+16.8%' },
  ]
  protected readonly chartBars = [36, 58, 44, 72, 64, 88, 76, 94, 68, 82, 56, 74]
  protected readonly auditEvents = [
    { id: 1, action: 'Product published', actor: 'sadia@commerce.local', time: '2 min ago', severity: 'info' },
    { id: 2, action: 'Role changed', actor: 'admin@commerce.local', time: '18 min ago', severity: 'warning' },
    { id: 3, action: 'API key rotated', actor: 'system', time: '42 min ago', severity: 'critical' },
  ]
  protected readonly auditMeta = [
    { label: 'Action', value: 'Product published' },
    { label: 'Actor', value: 'sadia@commerce.local' },
    { label: 'Resource', value: 'Product / prod_1042' },
    { label: 'Request ID', value: 'req_7f8a2c' },
  ]
  protected readonly jsonPreview = '{\n  "action": "product.publish",\n  "resourceId": "prod_1042",\n  "actor": "usr_204",\n  "timestamp": "2026-08-10T14:30:00Z"\n}'
  protected readonly permissionOptions = ['product:read', 'product:update', 'product:delete', 'audit:read', 'inventory:update', 'user:manage']
  protected readonly taskColumns = [
    { status: 'backlog', label: 'Backlog' },
    { status: 'todo', label: 'To do' },
    { status: 'in_progress', label: 'In progress' },
    { status: 'review', label: 'Review' },
    { status: 'done', label: 'Done' },
  ]
  protected readonly calendarDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  private draggedTaskId = ''
  private readonly wizardStepValue = signal(0)
  private readonly wizardValuesState = signal<Record<string, string>>({})
  protected readonly deviceFallback = [
    { device: 'Chrome on macOS', location: 'Dhaka, Bangladesh', lastSeen: 'Current session' },
    { device: 'Safari on iPhone', location: 'Dhaka, Bangladesh', lastSeen: '2 hours ago' },
  ]
  private readonly permissionSelection = signal<string[] | null>(null)
  private roleSelection = ''

  protected tableColumns(): Array<{ key: string; label: string }> {
    const configured = this.node().config?.['columns']
    if (Array.isArray(configured)) {
      const columns = configured.filter((column): column is Record<string, unknown> => Boolean(column && typeof column === 'object'))
        .map((column) => ({ key: String(column['key'] ?? column['name'] ?? ''), label: String(column['label'] ?? column['key'] ?? column['name'] ?? '') }))
        .filter((column) => column.key.length > 0)
      if (columns.length > 0) return columns
    }
    return [
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status' },
    ]
  }

  protected rowAction(): string | undefined {
    const value = this.node().config?.['rowAction']
    return typeof value === 'string' ? value : undefined
  }

  protected bulkAction(): string | undefined {
    const value = this.node().config?.['bulkAction']
    return typeof value === 'string' ? value : undefined
  }

  protected itemId(item: unknown): string | undefined {
    if (!item || typeof item !== 'object') return undefined
    const value = (item as Record<string, unknown>)['id']
    return typeof value === 'string' ? value : undefined
  }

  protected selectedCount(): number {
    return this.selectedIds().size
  }

  protected isSelected(id: string | undefined): boolean {
    return Boolean(id && this.selectedIds().has(id))
  }

  protected toggleSelected(id: string | undefined): void {
    if (!id) return
    this.selectedIds.update((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  protected emitConfiguredAction(format: string): void {
    const value = this.node().config?.['action']
    if (typeof value === 'string') this.pendingAction.set({ id: value, payload: { format } })
  }

  protected emitConfiguredPayload(payload: Record<string, unknown>): void {
    const actionId = this.node().config?.['action']
    if (typeof actionId !== 'string' || !this.canEvent()(actionId)) return
    const id = this.objectValue('id', '')
    this.pendingAction.set({ id: actionId, payload: { ...(id ? { id } : {}), ...payload } })
  }

  protected roleValue(): string {
    if (this.roleSelection) return this.roleSelection
    const raw = this.objectRawValue('role')
    if (Array.isArray(raw)) return String(raw[0] ?? 'viewer').toLowerCase()
    return typeof raw === 'string' ? raw.toLowerCase() : 'viewer'
  }

  protected roleChanged(event: Event): void {
    this.roleSelection = (event.target as HTMLSelectElement).value
  }

  protected selectedPermissions(): string[] {
    const selected = this.permissionSelection()
    if (selected) return selected
    const raw = this.objectRawValue('permissions')
    return Array.isArray(raw) ? raw.filter((item): item is string => typeof item === 'string') : []
  }

  protected permissionSelected(permission: string): boolean {
    return this.selectedPermissions().includes(permission)
  }

  protected togglePermission(permission: string): void {
    const next = new Set(this.selectedPermissions())
    if (next.has(permission)) next.delete(permission)
    else next.add(permission)
    this.permissionSelection.set([...next])
  }

  protected deviceRows(): unknown[] {
    const data = this.data()
    if (data && typeof data === 'object' && Array.isArray((data as Record<string, unknown>)['sessions'])) return (data as Record<string, unknown>)['sessions'] as unknown[]
    return this.records(this.deviceFallback)
  }

  protected assignmentValue = ''
  private notesText = ''

  protected assignmentChanged(event: Event): void {
    this.assignmentValue = (event.target as HTMLSelectElement).value
  }

  protected notesChanged(event: Event): void {
    this.notesText = (event.target as HTMLTextAreaElement).value
  }

  protected notesValue(): string {
    if (this.notesText) return this.notesText
    const raw = this.data()
    if (raw && typeof raw === 'object' && Array.isArray((raw as Record<string, unknown>)['internalNotes'])) {
      const notes = (raw as Record<string, unknown>)['internalNotes'] as unknown[]
      return notes.map((note) => this.itemValue(note, 'body', '')).join('\n')
    }
    return ''
  }

  protected notesPayload(): unknown[] {
    return [{ author: 'current-user', body: this.notesText, createdAt: new Date().toISOString() }]
  }

  protected ticketMessages(): unknown[] {
    const data = this.data()
    if (data && typeof data === 'object' && Array.isArray((data as Record<string, unknown>)['messages'])) return (data as Record<string, unknown>)['messages'] as unknown[]
    return [{ author: 'Customer', body: 'I need help with this order.', createdAt: 'Recently' }, { author: 'Support', body: 'We are looking into it now.', createdAt: 'A few minutes ago' }]
  }

  protected organizationMembers(): unknown[] {
    const data = this.data()
    if (data && typeof data === 'object' && Array.isArray((data as Record<string, unknown>)['members'])) return (data as Record<string, unknown>)['members'] as unknown[]
    return [{ name: 'Admin User', role: 'admin' }, { name: 'Support team', role: 'member' }]
  }

  protected readAction(): string | undefined {
    const value = this.node().config?.['readAction']
    return typeof value === 'string' ? value : undefined
  }

  protected revokeAction(): string | undefined {
    const value = this.node().config?.['revokeAction']
    return typeof value === 'string' ? value : undefined
  }

  protected toggleAction(): string | undefined {
    const value = this.node().config?.['toggleAction']
    return typeof value === 'string' ? value : undefined
  }

  protected flagEnabled(flag: unknown): boolean {
    const value = flag && typeof flag === 'object' ? (flag as Record<string, unknown>)['enabled'] : undefined
    return value === true || value === 'true'
  }

  protected subscriptionRecord(): unknown {
    const data = this.data()
    if (Array.isArray(data)) return data[0]
    if (data && typeof data === 'object' && Array.isArray((data as Record<string, unknown>)['items'])) return ((data as Record<string, unknown>)['items'] as unknown[])[0]
    return data
  }

  protected subscriptionValue(key: string, fallback: string | number): string | number {
    return this.itemValue(this.subscriptionRecord(), key, fallback)
  }

  protected paymentValue(key: string, fallback: string): string {
    const record = this.subscriptionRecord()
    const payment = record && typeof record === 'object' && (record as Record<string, unknown>)['paymentMethod'] && typeof (record as Record<string, unknown>)['paymentMethod'] === 'object'
      ? (record as Record<string, unknown>)['paymentMethod'] as Record<string, unknown>
      : {}
    const value = payment[key]
    return typeof value === 'string' || typeof value === 'number' ? String(value) : fallback
  }

  protected invoiceRows(): unknown[] {
    return this.records([{ id: 'invoice-demo', invoiceNumber: 'INV-0001', amount: 49, status: 'open', dueDate: 'Upcoming' }])
  }

  protected toggleFlag(flag: unknown): void {
    const action = this.toggleAction()
    const id = this.itemId(flag)
    if (action && id) this.emitAction(action, { id, enabled: !this.flagEnabled(flag) })
  }

  protected notificationRead(notification: unknown): boolean {
    const value = notification && typeof notification === 'object' ? (notification as Record<string, unknown>)['read'] : undefined
    return value === true || value === 'true'
  }

  protected notificationType(notification: unknown): string {
    return String(this.itemValue(notification, 'type', 'info'))
  }

  protected markNotificationRead(notification: unknown): void {
    const action = this.readAction()
    const id = this.itemId(notification)
    if (action && id) this.emitAction(action, { id, read: true })
  }

  protected wizardSteps(): Array<{ title: string; description: string; fields: Array<{ name: string; label: string; placeholder?: string }> }> {
    const configured = this.node().config?.['steps']
    if (Array.isArray(configured)) return configured.filter((step): step is { title: string; description: string; fields: Array<{ name: string; label: string; placeholder?: string }> } => Boolean(step && typeof step === 'object'))
    return [
      { title: 'Workspace', description: 'Choose the workspace defaults for your team.', fields: [{ name: 'workspace', label: 'Workspace name', placeholder: 'Commerce workspace' }] },
      { title: 'Team', description: 'Add a primary support or operations contact.', fields: [{ name: 'owner', label: 'Owner email', placeholder: 'admin@example.com' }] },
      { title: 'Preferences', description: 'Set the default locale and timezone.', fields: [{ name: 'timezone', label: 'Timezone', placeholder: 'Asia/Dhaka' }] },
    ]
  }

  protected wizardStep(): number { return this.wizardStepValue() }

  protected wizardValues(): Record<string, string> { return this.wizardValuesState() }

  protected wizardValueChanged(name: string, event: Event): void {
    this.wizardValuesState.update((values) => ({ ...values, [name]: (event.target as HTMLInputElement).value }))
  }

  protected wizardNext(): void {
    this.wizardStepValue.update((step) => Math.min(this.wizardSteps().length - 1, step + 1))
  }

  protected wizardBack(): void {
    this.wizardStepValue.update((step) => Math.max(0, step - 1))
  }

  protected wizardFinish(): void {
    this.submit.emit(this.wizardValuesState())
  }

  private helpSearch = ''

  protected helpSearchChanged(event: Event): void {
    this.helpSearch = (event.target as HTMLInputElement).value.toLowerCase()
  }

  protected helpCategories(): Array<{ title: string; description: string; articles: number }> {
    return [
      { title: 'Getting started', description: 'Set up workspaces, users, and permissions.', articles: 12 },
      { title: 'Operations', description: 'Catalog, workflows, support, and audit guidance.', articles: 24 },
      { title: 'Developer platform', description: 'API keys, webhooks, contracts, and integrations.', articles: 18 },
    ]
  }

  protected helpArticles(): Array<{ title: string; answer: string }> {
    const articles = [
      { title: 'How do I configure API keys?', answer: 'Open Integrations, create a key, choose the scopes, and revoke it when it is no longer needed.' },
      { title: 'How do I publish a workflow?', answer: 'Open a workflow, review the node configuration, then use Publish workflow from the canvas.' },
      { title: 'How are permissions enforced?', answer: 'The UI projects the permission claims for navigation and actions, while the API remains the authority.' },
    ]
    return this.helpSearch ? articles.filter((article) => `${article.title} ${article.answer}`.toLowerCase().includes(this.helpSearch)) : articles
  }

  protected taskItems(): unknown[] {
    return this.records([{ id: 'task-demo', title: 'Review customer order', status: 'todo', priority: 'high', assignee: 'Support team' }])
  }

  protected taskBucket(status: string): unknown[] {
    return this.taskItems().filter((task) => this.itemValue(task, 'status', 'backlog') === status)
  }

  protected dragTask(task: unknown): void {
    this.draggedTaskId = this.itemId(task) ?? ''
  }

  protected dropTask(status: string): void {
    if (!this.draggedTaskId || !this.canEvent()('task.move')) return
    this.emitAction('task.move', { id: this.draggedTaskId, status })
    this.draggedTaskId = ''
  }

  protected calendarSlots(): Array<{ day: number; tasks: unknown[] }> {
    const tasks = this.taskItems()
    return Array.from({ length: 14 }, (_, index) => ({ day: (index % 7) + 1, tasks: tasks.filter((task) => Number(String(this.itemValue(task, 'dueDate', '')).slice(-2)) === index + 1) }))
  }

  protected workflowNodes(): unknown[] {
    const data = this.data()
    if (data && typeof data === 'object' && !Array.isArray(data) && Array.isArray((data as Record<string, unknown>)['nodes'])) return (data as Record<string, unknown>)['nodes'] as unknown[]
    return [
      { id: 'trigger', type: 'trigger', label: 'Order created', description: 'Starts when a new order is received.' },
      { id: 'condition', type: 'condition', label: 'Payment approved', description: 'Checks the payment status.' },
      { id: 'action', type: 'action', label: 'Reserve inventory', description: 'Creates a warehouse reservation.' },
    ]
  }

  protected executionRows(): unknown[] {
    const data = this.data()
    if (data && typeof data === 'object' && !Array.isArray(data) && Array.isArray((data as Record<string, unknown>)['runs'])) return (data as Record<string, unknown>)['runs'] as unknown[]
    return [{ status: 'completed', startedAt: 'Today, 10:42', duration: '1.2s' }, { status: 'failed', startedAt: 'Yesterday, 16:18', duration: '0.8s' }]
  }

  protected jsonFor(value: unknown): string {
    return JSON.stringify(value, null, 2)
  }

  protected fileItems(): unknown[] {
    return this.records([{ id: 'demo-file', filename: 'product-image.jpg', mimeType: 'image/jpeg', size: 248000, url: '', status: 'uploaded' }])
  }

  protected fileValue(item: unknown, key: string, fallback: string): string {
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      const value = (item as Record<string, unknown>)[key]
      if (typeof value === 'string' || typeof value === 'number') return String(value)
    }
    return fallback
  }

  protected fileIsImage(item: unknown): boolean {
    return this.fileValue(item, 'mimeType', '').startsWith('image/') && this.fileValue(item, 'url', '') !== ''
  }

  protected filesSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files
    const action = this.node().config?.['action']
    if (!files || typeof action !== 'string') return
    for (const file of Array.from(files)) {
      this.emitAction(action, {
        filename: file.name,
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
        objectKey: file.name,
        url: URL.createObjectURL(file),
        status: 'uploaded',
      })
    }
  }

  protected replaceFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0]
    const action = this.node().config?.['action']
    if (!file || typeof action !== 'string') return
    this.emitAction(action, {
      filename: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      objectKey: file.name,
      url: URL.createObjectURL(file),
    })
  }

  protected emitEvent(eventName: string): void {
    const actionId = this.node().events?.[eventName]
    if (!actionId) return
    const eventPayloads = this.node().config?.['eventPayloads']
    const configured = eventPayloads && typeof eventPayloads === 'object' && !Array.isArray(eventPayloads)
      ? (eventPayloads as Record<string, unknown>)[eventName]
      : undefined
    const payload = configured && typeof configured === 'object' && !Array.isArray(configured) ? configured as Record<string, unknown> : {}
    this.pendingAction.set({ id: actionId, payload: { id: this.objectValue('id', ''), ...payload } })
  }

  protected emitRowAction(item: unknown): void {
    const actionId = this.rowAction()
    const id = this.itemId(item)
    if (actionId && id) this.pendingAction.set({ id: actionId, payload: { id } })
  }

  protected emitBulkAction(): void {
    const actionId = this.bulkAction()
    if (actionId && this.selectedIds().size > 0) this.pendingAction.set({ id: actionId, payload: { ids: [...this.selectedIds()] } })
  }

  protected cancelAction(): void {
    this.pendingAction.set(null)
  }

  protected confirmAction(): void {
    const action = this.pendingAction()
    if (!action) return
    this.action.emit(action)
    this.pendingAction.set(null)
    this.selectedIds.set(new Set())
  }

  protected formFields(): FormFieldConfig[] {
    const fields = this.node().config?.['fields']
    if (!Array.isArray(fields)) return []
    return fields.filter((field): field is FormFieldConfig => Boolean(field && typeof field === 'object' && typeof (field as Record<string, unknown>)['name'] === 'string'))
  }

  protected control(name: string): FormControl {
    const currentData = this.data()
    if (currentData !== this.formDataReference) {
      this.formDataReference = currentData
      for (const field of this.formFields()) {
        const existingField = this.form.get(field.name)
        if (existingField instanceof FormControl) existingField.setValue(this.initialValue(field.name), { emitEvent: false })
      }
    }

    const existing = this.form.get(name)
    if (existing instanceof FormControl) return existing
    const field = this.formFields().find((item) => item.name === name)
    const control = new FormControl(this.initialValue(name), field?.required ? [Validators.required] : [])
    this.form.addControl(name, control)
    return control
  }

  protected initialValue(name: string): string | number {
    const value = this.objectRawValue(name)
    if (value && typeof value === 'object') return JSON.stringify(value, null, 2)
    if (typeof value === 'string' || typeof value === 'number') return value
    const fallback: Record<string, string> = { status: 'draft' }
    return fallback[name] ?? ''
  }

  protected inputType(widget: string | undefined): string {
    if (widget === 'number' || widget === 'currency') return 'number'
    if (widget === 'email') return 'email'
    if (widget === 'password') return 'password'
    if (widget === 'date') return 'date'
    return 'text'
  }

  protected searchChanged(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.queryChange.emit({ search: value, page: 1 })
  }

  protected filterValue(field: string): string {
    const value = this.query().filters[field]
    return Array.isArray(value) ? value.join(',') : value ?? ''
  }

  protected filterChanged(field: string, event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.queryChange.emit({ filters: { [field]: value }, page: 1 })
  }

  protected toggleSort(): void {
    const direction = this.query().sortDirection === 'asc' ? 'desc' : this.query().sortDirection === 'desc' ? null : 'asc'
    this.queryChange.emit({ sortField: direction ? 'createdAt' : null, sortDirection: direction, page: 1 })
  }

  protected changePage(delta: number): void {
    this.queryChange.emit({ page: Math.max(1, this.query().page + delta) })
  }

  protected canNextPage(): boolean {
    const data = this.data()
    if (data && typeof data === 'object' && !Array.isArray(data) && typeof (data as Record<string, unknown>)['hasMore'] === 'boolean') return Boolean((data as Record<string, unknown>)['hasMore'])
    return true
  }

  protected submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    const payload = { ...this.form.getRawValue() } as Record<string, unknown>
    for (const field of this.formFields()) {
      if (field.widget !== 'json') continue
      const raw = payload[field.name]
      if (typeof raw !== 'string' || raw.trim() === '') continue
      try {
        payload[field.name] = JSON.parse(raw)
      } catch {
        this.control(field.name).setErrors({ json: true })
        this.control(field.name).markAsTouched()
        return
      }
    }
    this.submit.emit(payload)
  }

  protected money(value: string | number): string {
    const number = Number(value)
    return Number.isFinite(number) ? '$' + number.toFixed(2) : '$0.00'
  }

  protected marginValue(): number {
    const price = Number(this.objectValue('price', 129))
    const cost = Number(this.objectValue('costPrice', 72))
    return Math.max(0, price - cost)
  }

  protected marginPercent(): string {
    const price = Number(this.objectValue('price', 129))
    return price > 0 ? ((this.marginValue() / price) * 100).toFixed(1) : '0.0'
  }

  protected seoValue(key: string, fallback: string): string {
    const raw = this.objectRawValue('seo')
    if (raw && typeof raw === 'object' && typeof (raw as Record<string, unknown>)[key] === 'string') return String((raw as Record<string, unknown>)[key])
    return fallback
  }

  protected activityRows(): unknown[] {
    return this.records([{ action: 'Product created', actorId: 'system', createdAt: 'just now' }])
  }

  protected orderTimeline(): unknown[] {
    const data = this.data()
    if (data && typeof data === 'object' && Array.isArray((data as Record<string, unknown>)['timeline'])) return (data as Record<string, unknown>)['timeline'] as unknown[]
    return [
      { label: 'Order placed', createdAt: 'Recently' },
      { label: 'Payment status updated', createdAt: 'Waiting for payment' },
      { label: 'Fulfillment pending', createdAt: 'Awaiting warehouse action' },
    ]
  }

  protected severityCount(severity: string): number {
    return this.records([]).filter((item) => this.itemValue(item, 'severity', '') === severity).length
  }

  private draggedCategoryId = ''

  protected emitAction(id: string, payload: Record<string, unknown>): void {
    if (!this.canEvent()(id)) return
    this.pendingAction.set({ id, payload })
  }

  protected dragCategory(category: unknown): void {
    this.draggedCategoryId = this.itemId(category) ?? ''
  }

  protected dropCategory(target: unknown, index: number): void {
    if (!this.draggedCategoryId || !this.canEvent()('category.reorder')) return
    const targetId = this.itemId(target)
    if (!targetId || targetId === this.draggedCategoryId) return
    this.emitAction('category.reorder', { id: this.draggedCategoryId, parentId: targetId, sortOrder: index })
    this.draggedCategoryId = ''
  }

  protected mergeCategory(target: unknown): void {
    const source = this.categoryItems()[0]
    const id = this.itemId(source)
    const parentId = this.itemId(target)
    if (id && parentId && id !== parentId) this.emitAction('category.merge', { id, parentId })
  }

  protected shipmentValue(key: string, fallback: string): string {
    const order = this.data()
    const shipment = order && typeof order === 'object' && !Array.isArray(order) && (order as Record<string, unknown>)['shipment'] && typeof (order as Record<string, unknown>)['shipment'] === 'object'
      ? (order as Record<string, unknown>)['shipment'] as Record<string, unknown>
      : order && typeof order === 'object' && !Array.isArray(order) ? order as Record<string, unknown> : {}
    const value = shipment[key]
    return typeof value === 'string' || typeof value === 'number' ? String(value) : fallback
  }

  protected invoiceValue(key: string, fallback: string): string {
    const order = this.data()
    const invoice = order && typeof order === 'object' && !Array.isArray(order) && (order as Record<string, unknown>)['invoice'] && typeof (order as Record<string, unknown>)['invoice'] === 'object'
      ? (order as Record<string, unknown>)['invoice'] as Record<string, unknown>
      : order && typeof order === 'object' && !Array.isArray(order) ? order as Record<string, unknown> : {}
    const value = invoice[key]
    return typeof value === 'string' || typeof value === 'number' ? String(value) : fallback
  }

  protected statRows(): Array<{ label: string; value: string; change: string }> { 
    const data = this.data()
    const products = data && typeof data === 'object' && !Array.isArray(data)
      ? this.extractItems((data as Record<string, unknown>)['products'])
      : this.records([])
    const audit = data && typeof data === 'object' && !Array.isArray(data)
      ? this.extractItems((data as Record<string, unknown>)['audit'])
      : []
    const active = products.filter((item) => String(this.itemValue(item, 'status', '')).toLowerCase() === 'active').length
    const revenue = products.reduce((total: number, item) => total + Number(this.itemValue(item, 'price', 0)), 0)
    if (products.length === 0 && audit.length === 0) return this.stats
    return [
      { label: 'Products', value: String(products.length), change: active + ' active' },
      { label: 'Catalog value', value: this.money(revenue), change: products.length ? 'from current list' : 'No records' },
      { label: 'Audit events', value: String(audit.length), change: 'recent events' },
      { label: 'Active rate', value: products.length ? Math.round((active / products.length) * 100) + '%' : '0%', change: 'catalog health' },
    ]
  }

  protected chartType(): 'bar' | 'line' | 'area' | 'pie' {
    const value = this.node().config?.['chartType']
    return value === 'line' || value === 'area' || value === 'pie' ? value : 'bar'
  }

  protected chartPoints(): string {
    const values = this.chartValues()
    if (values.length === 0) return '0,160 600,160'
    const max = Math.max(...values, 1)
    return values.map((value, index) => `${Math.round((index / Math.max(1, values.length - 1)) * 600)},${160 - Math.round((value / max) * 140)}`).join(' ')
  }

  protected areaPoints(): string {
    return `0,160 ${this.chartPoints()} 600,160`
  }

  protected chartLegend(): Array<{ label: string; value: string; color: string }> {
    const values = this.chartValues()
    const labels = ['Primary', 'Secondary', 'Other']
    const colors = ['#6366f1', '#10b981', '#f59e0b']
    const total = Math.max(values.reduce((sum, value) => sum + value, 0), 1)
    return labels.map((label, index) => ({ label, value: Math.round(((values[index] ?? 0) / total) * 100) + '%', color: colors[index] }))
  }

  protected pieGradient(): string {
    const values = this.chartLegend().map((item) => Number(item.value.replace('%', '')))
    const first = values[0] ?? 50
    const second = first + (values[1] ?? 25)
    return `conic-gradient(#6366f1 0 ${first}%, #10b981 ${first}% ${second}%, #f59e0b ${second}% 100%)`
  }

  protected chartValues(): number[] {
    const data = this.data()
    const products = data && typeof data === 'object' && !Array.isArray(data)
      ? this.extractItems((data as Record<string, unknown>)['products'])
      : []
    if (products.length === 0) return this.chartBars
    const values = products.slice(0, 12).map((item) => Number(this.itemValue(item, 'price', 0)))
    const max = Math.max(...values, 1)
    return values.map((value) => Math.max(8, Math.round((value / max) * 100)))
  }

  protected extractItems(value: unknown): unknown[] {
    if (Array.isArray(value)) return value
    if (value && typeof value === 'object' && Array.isArray((value as Record<string, unknown>)['items'])) return (value as Record<string, unknown>)['items'] as unknown[]
    return []
  }

  protected productItems(): unknown[] {
    return this.records(['Aurora Headphones', 'Terra Backpack', 'Orbit Keyboard'])
  }

  protected mediaItems(): unknown[] {
    const data = this.data()
    if (Array.isArray(data)) return data.length > 0 ? data : [1, 2, 3, 4, 5, 6]
    if (data && typeof data === 'object' && Array.isArray((data as Record<string, unknown>)['items'])) {
      const items = (data as Record<string, unknown>)['items'] as unknown[]
      return items.length > 0 ? items : [1, 2, 3, 4, 5, 6]
    }
    return [1, 2, 3, 4, 5, 6]
  }

  protected mediaUrl(image: unknown): string | null {
    if (typeof image === 'string') return image
    if (image && typeof image === 'object') {
      const value = (image as Record<string, unknown>)['url'] ?? (image as Record<string, unknown>)['src']
      return typeof value === 'string' ? value : null
    }
    return null
  }

  protected mediaAlt(image: unknown): string {
    if (image && typeof image === 'object' && typeof (image as Record<string, unknown>)['alt'] === 'string') return String((image as Record<string, unknown>)['alt'])
    return 'Product media'
  }

  protected categoryItems(): unknown[] {
    return this.records(this.categories)
  }

  protected inventoryRows(): unknown[] {
    return this.records(this.stockRows)
  }

  protected inventoryPercent(row: unknown): number {
    const available = Number(this.itemValue(row, 'available', this.itemValue(row, 'quantity', 0)))
    const quantity = Math.max(available, Number(this.itemValue(row, 'quantity', available)), 1)
    return Math.min(100, Math.max(4, Math.round((available / quantity) * 100)))
  }

  protected variantRows(): unknown[] {
    return this.records(this.variants)
  }

  protected auditRows(): unknown[] {
    return this.records(this.auditEvents)
  }

  protected records(fallback: unknown[]): unknown[] {
    const value = this.data()
    if (Array.isArray(value) && value.length > 0) return value
    if (value && typeof value === 'object' && Array.isArray((value as Record<string, unknown>)['items'])) {
      const items = (value as Record<string, unknown>)['items'] as unknown[]
      if (items.length > 0) return items
    }
    return fallback
  }

  protected objectRawValue(key: string): unknown {
    const data = this.data()
    if (data && typeof data === 'object' && !Array.isArray(data)) return (data as Record<string, unknown>)[key]
    return undefined
  }

  protected objectValue(key: string, fallback: string | number): string | number {
    const value = this.objectRawValue(key)
    if (typeof value === 'string' || typeof value === 'number') return value
    return fallback
  }

  protected itemLabel(item: unknown, fallback: string): string {
    if (typeof item === 'string') return item
    if (item && typeof item === 'object') {
      const value = (item as Record<string, unknown>)['name'] ?? (item as Record<string, unknown>)['title'] ?? (item as Record<string, unknown>)['label']
      if (typeof value === 'string') return value
    }
    return fallback
  }

  protected itemValue(item: unknown, key: string, fallback: string | number): string | number {
    if (item && typeof item === 'object') {
      const value = (item as Record<string, unknown>)[key]
      if (typeof value === 'string' || typeof value === 'number') return value
    }
    return fallback
  }

  protected auditMetaRows(): Array<{ label: string; value: string }> {
    const data = this.data()
    if (!data || typeof data !== 'object' || Array.isArray(data)) return this.auditMeta
    const record = data as Record<string, unknown>
    return [
      { label: 'Action', value: String(record['action'] ?? 'Audit event') },
      { label: 'Actor', value: String(record['actorId'] ?? record['actor'] ?? 'system') },
      { label: 'Resource', value: `${String(record['resourceType'] ?? 'Resource')} / ${String(record['resourceId'] ?? 'unknown')}` },
      { label: 'Created', value: String(record['createdAt'] ?? record['timestamp'] ?? 'just now') },
    ]
  }

  protected jsonValue(): string {
    return this.data() === null ? this.jsonPreview : JSON.stringify(this.data(), null, 2)
  }

  protected title(): string {
    const configured = this.node().config?.['title']
    return typeof configured === 'string' ? configured : this.entry().label
  }
}
