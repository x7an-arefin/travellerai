import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideWallet,
  lucideReceipt,
  lucideCreditCard,
  lucidePlus,
  lucideSearch,
  lucideCheck,
  lucideX,
  lucideDownload,
  lucideDollarSign,
  lucideClock,
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

export interface ExpenseItem {
  id: string
  employeeName: string
  category: string
  merchant: string
  amount: number
  date: string
  status: 'approved' | 'pending' | 'rejected'
}

@Component({
  selector: 'app-expenses',
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
      lucideWallet,
      lucideReceipt,
      lucideCreditCard,
      lucidePlus,
      lucideSearch,
      lucideCheck,
      lucideX,
      lucideDownload,
      lucideDollarSign,
      lucideClock,
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
      <!-- Header Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Corporate Expenses & Spending</h1>
          <p class="text-xs text-muted-foreground">Submit expense reimbursements, inspect receipt proofs, and review monthly team budgets.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn size="sm" (click)="createSheetOpen.set(true)" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Submit Expense</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Total Month Spend</span>
          <div class="text-2xl font-bold text-foreground font-mono">\${{ totalSpent() | number:'1.0-0' }}</div>
          <p class="text-[11px] text-muted-foreground">64% of allocated \$50K budget</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Pending Approval</span>
          <div class="text-2xl font-bold text-amber-600 font-mono">{{ pendingCount() }} Claims</div>
          <p class="text-[11px] text-amber-600 font-semibold">Requires manager sign-off</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Avg Reimbursement Time</span>
          <div class="text-2xl font-bold text-emerald-600 font-mono">1.8 Days</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Direct ACH deposit</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Corporate Cards Active</span>
          <div class="text-2xl font-bold text-foreground font-mono">38 Virtual Cards</div>
          <p class="text-[11px] text-sky-500 font-semibold">With auto-spend limits</p>
        </div>
      </div>

      <!-- Expenses Table -->
      <div hlmCard class="p-0 overflow-hidden shadow-2xs">
        <table hlmTable class="w-full text-xs">
          <thead hlmTableHeader>
            <tr hlmTableRow>
              <th hlmTableHead class="ps-4">Employee</th>
              <th hlmTableHead>Merchant</th>
              <th hlmTableHead>Category</th>
              <th hlmTableHead>Date</th>
              <th hlmTableHead>Amount</th>
              <th hlmTableHead>Status</th>
              <th hlmTableHead class="text-right pe-4">Actions</th>
            </tr>
          </thead>
          <tbody hlmTableBody>
            @for (exp of expenses(); track exp.id) {
              <tr hlmTableRow class="hover:bg-muted/40 transition-colors">
                <td hlmTableCell class="ps-4 font-bold text-foreground">{{ exp.employeeName }}</td>
                <td hlmTableCell class="text-muted-foreground">{{ exp.merchant }}</td>
                <td hlmTableCell>
                  <span hlmBadge variant="outline" class="text-[10px]">{{ exp.category }}</span>
                </td>
                <td hlmTableCell class="text-muted-foreground">{{ exp.date }}</td>
                <td hlmTableCell class="font-mono font-bold text-foreground">\${{ exp.amount | number:'1.2-2' }}</td>
                <td hlmTableCell>
                  <span
                    class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border"
                    [class.bg-emerald-500/10]="exp.status === 'approved'"
                    [class.text-emerald-600]="exp.status === 'approved'"
                    [class.border-emerald-200]="exp.status === 'approved'"
                    [class.bg-amber-500/10]="exp.status === 'pending'"
                    [class.text-amber-600]="exp.status === 'pending'"
                    [class.border-amber-200]="exp.status === 'pending'"
                  >
                    {{ exp.status }}
                  </span>
                </td>
                <td hlmTableCell class="text-right pe-4">
                  @if (exp.status === 'pending') {
                    <button hlmBtn variant="outline" size="sm" (click)="approveExpense(exp)" class="h-7 text-xs cursor-pointer">
                      Approve
                    </button>
                  } @else {
                    <span class="text-[11px] text-muted-foreground">Reimbursed</span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </app-main>

    <!-- Submit Expense Sheet (size="md" = 1/2 screen width) -->
    <hlm-sheet [isOpen]="createSheetOpen()" position="right" [size]="'md'" (closed)="createSheetOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Submit Expense Claim</h3>
        <p hlmSheetDescription class="text-xs">Provide merchant details and attach receipt image.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Merchant / Vendor</label>
          <input
            type="text"
            [(ngModel)]="newExpense.merchant"
            placeholder="e.g. AWS Cloud Services"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Amount (\$)</label>
            <input
              type="number"
              [(ngModel)]="newExpense.amount"
              placeholder="120.00"
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Category</label>
            <hlm-custom-select
              [options]="categoryOptions"
              [ngModel]="newExpense.category"
              (valueChange)="newExpense.category = $event"
              placeholder="Select Category"
            />
          </div>
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="createSheetOpen.set(false)" class="cursor-pointer text-xs">
          Cancel
        </button>
        <button hlmBtn (click)="saveExpense()" class="cursor-pointer text-xs">
          Submit Claim
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class ExpensesComponent {
  readonly createSheetOpen = signal<boolean>(false)

  newExpense = {
    merchant: '',
    amount: 85,
    category: 'Software & SaaS',
  }

  readonly categoryOptions: readonly SelectOption[] = [
    { label: 'Software & SaaS', value: 'Software & SaaS' },
    { label: 'Travel & Flights', value: 'Travel & Flights' },
    { label: 'Hardware & Devices', value: 'Hardware & Devices' },
    { label: 'Client Entertainment', value: 'Client Entertainment' },
  ]

  readonly expenses = signal<ExpenseItem[]>([
    { id: 'exp-1', employeeName: 'Alex Rivera', category: 'Software & SaaS', merchant: 'GitHub Copilot Enterprise', amount: 240.0, date: 'Today', status: 'approved' },
    { id: 'exp-2', employeeName: 'Sarah Jenkins', category: 'Travel & Flights', merchant: 'United Airlines (SFO -> JFK)', amount: 620.0, date: 'Yesterday', status: 'pending' },
    { id: 'exp-3', employeeName: 'Michael Chang', category: 'Hardware & Devices', merchant: 'Apple Store (USB-C Hub)', amount: 89.0, date: 'Aug 03', status: 'approved' },
  ])

  readonly totalSpent = computed(() => {
    return this.expenses().reduce((sum, e) => sum + e.amount, 0)
  })

  readonly pendingCount = computed(() => {
    return this.expenses().filter((e) => e.status === 'pending').length
  })

  approveExpense(exp: ExpenseItem): void {
    this.expenses.update((list) =>
      list.map((e) => (e.id === exp.id ? { ...e, status: 'approved' } : e))
    )
    toast.success(`Expense from ${exp.employeeName} approved.`)
  }

  saveExpense(): void {
    if (!this.newExpense.merchant) {
      toast.error('Please enter a merchant name.')
      return
    }

    const item: ExpenseItem = {
      id: 'exp-' + (this.expenses().length + 1),
      employeeName: 'Current User',
      merchant: this.newExpense.merchant,
      amount: Number(this.newExpense.amount) || 50,
      category: this.newExpense.category,
      date: 'Today',
      status: 'pending',
    }

    this.expenses.update((list) => [item, ...list])
    toast.success('Expense claim submitted for approval.')
    this.createSheetOpen.set(false)
  }
}
