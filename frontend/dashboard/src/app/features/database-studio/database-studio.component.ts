import { Component, signal, inject, OnInit } from '@angular/core'
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
import { DatabaseStudioApiService, DbTableSchema, ExecutionPlan } from './data-access'

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
          <p class="text-xs text-muted-foreground">Run live SQL queries, inspect table relations, and analyze execution plans across marketplace schemas.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="exportCsv()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
            <span>Export CSV</span>
          </button>
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
            <span class="text-[10px] text-muted-foreground font-mono">{{ tables.length }} schemas</span>
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
                <div class="flex items-center gap-2 truncate">
                  <ng-icon name="lucideTable" class="size-3.5 shrink-0" />
                  <span class="font-mono truncate">{{ tbl.name }}</span>
                </div>
                <span class="text-[10px] text-muted-foreground font-mono shrink-0">{{ tbl.rowCount | number }}</span>
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
              <span>Executed in <span class="font-bold text-emerald-600">{{ executionTimeMs() }}ms</span></span>
              <span>{{ queryResults().length }} rows returned</span>
            </div>
          </div>

          <!-- Dynamic Results Table -->
          <div hlmCard class="p-0 overflow-hidden shadow-2xs">
            <div class="overflow-x-auto">
              <table hlmTable class="w-full text-xs font-mono">
                <thead hlmTableHeader>
                  <tr hlmTableRow>
                    @for (col of queryColumns(); track col) {
                      <th hlmTableHead class="first:ps-4 uppercase tracking-wider text-[11px]">{{ col }}</th>
                    }
                  </tr>
                </thead>
                <tbody hlmTableBody>
                  @for (row of queryResults(); track $index) {
                    <tr hlmTableRow class="hover:bg-muted/40 transition-colors">
                      @for (col of queryColumns(); track col) {
                        <td hlmTableCell class="first:ps-4 font-medium text-foreground max-w-[200px] truncate">
                          {{ formatCellValue(row[col]) }}
                        </td>
                      }
                    </tr>
                  }
                  @if (queryResults().length === 0) {
                    <tr hlmTableRow>
                      <td [attr.colspan]="queryColumns().length || 1" class="text-center py-6 text-muted-foreground">
                        No rows returned for this query.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
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
        <p hlmSheetDescription class="text-xs">
          PostgreSQL Cost Analysis: Index {{ currentPlan()?.indexName }} hit {{ currentPlan()?.cacheHitRatio }}.
        </p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="rounded-xl border border-border bg-zinc-950 text-zinc-100 p-4 font-mono text-xs space-y-2 shadow-inner whitespace-pre-wrap">
          <div class="text-sky-400 font-bold">{{ currentPlan()?.planText }}</div>
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
export class DatabaseStudioComponent implements OnInit {
  private readonly dbService = inject(DatabaseStudioApiService)

  readonly planSheetOpen = signal<boolean>(false)
  readonly selectedTable = signal<string>('users')
  readonly running = signal<boolean>(false)
  readonly executionTimeMs = signal<number>(14)
  readonly queryColumns = signal<string[]>(['id', 'email', 'name', 'role', 'status'])
  readonly queryResults = signal<Record<string, any>[]>([])
  readonly currentPlan = signal<ExecutionPlan | null>(null)

  querySql = `SELECT id, email, name, role, status FROM public.users LIMIT 10;`
  readonly tables: DbTableSchema[] = this.dbService.tables

  ngOnInit(): void {
    this.executeQuery()
  }

  selectTable(name: string): void {
    this.selectedTable.set(name)
    this.querySql = `SELECT * FROM public.${name} LIMIT 10;`
    this.executeQuery()
  }

  formatSql(): void {
    this.querySql = this.querySql.replace(/\s+/g, ' ').trim()
    this.querySql = this.querySql
      .replace(/SELECT /i, 'SELECT\n  ')
      .replace(/ FROM /i, '\nFROM ')
      .replace(/ WHERE /i, '\nWHERE ')
      .replace(/ ORDER BY /i, '\nORDER BY ')
      .replace(/ LIMIT /i, '\nLIMIT ')
    toast.success('SQL query formatted.')
  }

  executeQuery(): void {
    this.running.set(true)
    this.dbService.executeQuery(this.selectedTable(), this.querySql).subscribe({
      next: (res) => {
        this.queryColumns.set(res.columns)
        this.queryResults.set(res.rows)
        this.executionTimeMs.set(res.executionTimeMs)
        this.running.set(false)
        toast.success(`Query returned ${res.rowCount} rows from public.${this.selectedTable()}`)
      },
      error: () => {
        this.running.set(false)
      },
    })
  }

  openPlanDrawer(): void {
    this.dbService.explainQuery(this.selectedTable(), this.querySql).subscribe((plan) => {
      this.currentPlan.set(plan)
      this.planSheetOpen.set(true)
    })
  }

  formatCellValue(value: any): string {
    if (value === null || value === undefined) return 'null'
    if (typeof value === 'object') return JSON.stringify(value)
    return String(value)
  }

  exportCsv(): void {
    const cols = this.queryColumns()
    const rows = this.queryResults()
    if (rows.length === 0) {
      toast.error('No data available to export.')
      return
    }
    const csvContent = [
      cols.join(','),
      ...rows.map((row) =>
        cols.map((col) => `"${String(row[col] ?? '').replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${this.selectedTable()}_export.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.success(`Exported ${rows.length} rows to ${this.selectedTable()}_export.csv`)
  }
}
