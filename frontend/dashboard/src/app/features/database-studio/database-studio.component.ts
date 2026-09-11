import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideDatabase,
  lucideTable,
  lucidePlay,
  lucideCopy,
  lucideDownload,
  lucideCheck,
  lucideRefreshCw,
  lucideLayers,
  lucideTerminal,
  lucideSearch,
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

export interface DbTableSchema {
  name: string
  rowCount: number
  sizeMb: number
}

@Component({
  selector: 'app-database-studio',
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
      lucideDatabase,
      lucideTable,
      lucidePlay,
      lucideCopy,
      lucideDownload,
      lucideCheck,
      lucideRefreshCw,
      lucideLayers,
      lucideTerminal,
      lucideSearch,
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
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight text-foreground">Interactive Database & SQL Studio</h1>
            <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-200">
              <span class="size-1.5 rounded-full bg-emerald-500"></span>
              POSTGRES 16 PROD
            </span>
          </div>
          <p class="text-xs text-muted-foreground">Run SQL queries, inspect table relations, and analyze execution plans.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="openPlanDrawer()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideLayers" class="size-3.5 text-muted-foreground" />
            <span>Execution Plan (XL View)</span>
          </button>
        </div>
      </div>

      <!-- Studio Split Layout: Left Explorer vs Right SQL Console -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Tables Tree Explorer (3 Cols) -->
        <div hlmCard class="lg:col-span-3 p-4 space-y-3 shadow-2xs">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-xs uppercase tracking-wider text-foreground">Tables & Views</h3>
            <span class="text-[10px] text-muted-foreground">{{ tables.length }} schemas</span>
          </div>

          <div class="space-y-1">
            @for (tbl of tables; track tbl.name) {
              <button
                type="button"
                (click)="selectTable(tbl.name)"
                class="flex w-full items-center justify-between p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                [class.bg-primary/10]="selectedTable() === tbl.name"
                [class.text-primary]="selectedTable() === tbl.name"
                [class.hover:bg-muted]="selectedTable() !== tbl.name"
              >
                <div class="flex items-center gap-2">
                  <ng-icon name="lucideTable" class="size-3.5" />
                  <span class="font-mono">{{ tbl.name }}</span>
                </div>
                <span class="text-[10px] text-muted-foreground font-mono">{{ tbl.rowCount }}</span>
              </button>
            }
          </div>
        </div>

        <!-- SQL Editor & Output Table (9 Cols) -->
        <div class="lg:col-span-9 space-y-4">
          <!-- SQL Editor Box -->
          <div hlmCard class="p-4 space-y-3 shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs text-foreground">Query Console</span>
              <div class="flex items-center gap-2">
                <button hlmBtn variant="outline" size="sm" (click)="formatSql()" class="h-7 text-xs cursor-pointer">
                  Format SQL
                </button>
                <button hlmBtn size="sm" (click)="executeQuery()" [disabled]="running()" class="gap-1.5 h-7 text-xs cursor-pointer">
                  <ng-icon [name]="running() ? 'lucideRefreshCw' : 'lucidePlay'" [class.animate-spin]="running()" class="size-3" />
                  <span>{{ running() ? 'Executing...' : 'Run Query' }}</span>
                </button>
              </div>
            </div>

            <textarea
              rows="5"
              [(ngModel)]="querySql"
              class="w-full rounded-md border border-input bg-zinc-950 text-emerald-400 p-3 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none shadow-inner"
            ></textarea>

            <div class="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Executed in <span class="font-bold text-emerald-600">{{ executionTimeMs }}ms</span></span>
              <span>{{ queryResults.length }} rows returned</span>
            </div>
          </div>

          <!-- Dynamic Results Table -->
          <div hlmCard class="p-0 overflow-hidden shadow-2xs">
            <table hlmTable class="w-full text-xs font-mono">
              <thead hlmTableHeader>
                <tr hlmTableRow>
                  <th hlmTableHead class="ps-4">ID</th>
                  <th hlmTableHead>User Email</th>
                  <th hlmTableHead>Plan</th>
                  <th hlmTableHead>Status</th>
                  <th hlmTableHead class="text-right pe-4">Spend</th>
                </tr>
              </thead>
              <tbody hlmTableBody>
                @for (row of queryResults; track row.id) {
                  <tr hlmTableRow class="hover:bg-muted/40 transition-colors">
                    <td hlmTableCell class="ps-4 font-bold text-foreground">{{ row.id }}</td>
                    <td hlmTableCell class="text-muted-foreground">{{ row.email }}</td>
                    <td hlmTableCell>
                      <span hlmBadge variant="outline" class="text-[10px]">{{ row.plan }}</span>
                    </td>
                    <td hlmTableCell class="text-emerald-600 font-semibold">{{ row.status }}</td>
                    <td hlmTableCell class="text-right pe-4 font-bold text-foreground">{{ row.spend }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </app-main>

    <!-- Execution Plan Sheet (size="xl" = Full width) -->
    <hlm-sheet [isOpen]="planSheetOpen()" position="right" [size]="'xl'" (closed)="planSheetOpen.set(false)">
      <div hlmSheetHeader>
        <div class="flex items-center justify-between">
          <h3 hlmSheetTitle>Query Execution Optimizer Plan</h3>
          <span hlmBadge variant="outline" class="font-mono text-[10px]">EXPLAIN ANALYZE</span>
        </div>
        <p hlmSheetDescription class="text-xs">PostgreSQL Cost Analysis: Total Cost = 14.82 units, Index Scan hit 100%.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="rounded-xl border border-border bg-zinc-950 text-zinc-100 p-4 font-mono text-xs space-y-2 shadow-inner">
          <div class="text-sky-400 font-bold">Index Scan using idx_users_email on public.users (cost=0.28..8.30 rows=1 width=128)</div>
          <div class="text-zinc-400 pl-4">Filter: (status = 'active'::text)</div>
          <div class="text-zinc-400 pl-4">Rows Removed by Filter: 0</div>
          <div class="text-emerald-400 font-bold pt-2">Planning Time: 0.114 ms</div>
          <div class="text-emerald-400 font-bold">Execution Time: 0.082 ms</div>
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-end gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="planSheetOpen.set(false)" class="cursor-pointer text-xs">
          Close Plan Viewer
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class DatabaseStudioComponent {
  readonly planSheetOpen = signal<boolean>(false)
  readonly selectedTable = signal<string>('users')
  readonly running = signal<boolean>(false)
  executionTimeMs = 12

  querySql = `SELECT id, email, plan, status, spend 
FROM public.users 
WHERE status = 'active' 
ORDER BY spend DESC 
LIMIT 5;`

  readonly tables: DbTableSchema[] = [
    { name: 'users', rowCount: 14200, sizeMb: 24.5 },
    { name: 'organizations', rowCount: 412, sizeMb: 3.2 },
    { name: 'subscriptions', rowCount: 3890, sizeMb: 8.4 },
    { name: 'audit_events', rowCount: 94000, sizeMb: 112.0 },
    { name: 'api_tokens', rowCount: 1200, sizeMb: 1.8 },
  ]

  queryResults = [
    { id: 'usr_981', email: 'alex.rivera@enterprise.io', plan: 'Enterprise', status: 'active', spend: '$2,400.00' },
    { id: 'usr_980', email: 'sarah.jenkins@biotech.co', plan: 'Enterprise', status: 'active', spend: '$1,800.00' },
    { id: 'usr_979', email: 'marcus.brody@fintech.com', plan: 'Pro Team', status: 'active', spend: '$588.00' },
    { id: 'usr_978', email: 'elena.rostova@designhub.ch', plan: 'Pro Team', status: 'active', spend: '$588.00' },
  ]

  selectTable(name: string): void {
    this.selectedTable.set(name)
    this.querySql = `SELECT * FROM public.${name} LIMIT 10;`
    this.executeQuery()
  }

  formatSql(): void {
    toast.success('SQL query formatted.')
  }

  executeQuery(): void {
    this.running.set(true)
    setTimeout(() => {
      this.running.set(false)
      this.executionTimeMs = Math.floor(8 + Math.random() * 12)
      toast.success('Query executed successfully.')
    }, 300)
  }

  openPlanDrawer(): void {
    this.planSheetOpen.set(true)
  }
}
