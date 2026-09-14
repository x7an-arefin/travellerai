import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideShield,
  lucideShieldAlert,
  lucideShieldCheck,
  lucideDownload,
  lucideSearch,
  lucideTerminal,
} from '@ng-icons/lucide'
import { AuditLogsFacade } from './data-access/audit-logs.facade'
import { AuditLogsTableComponent } from './ui/audit-logs-table.component'
import { AuditLogDetailDrawerComponent } from './ui/audit-log-detail-drawer.component'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmSheetImports } from '../../ui/sheet/hlm-sheet.components'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { ExportService } from '../../core/services/export.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-audit-logs',
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
    AuditLogsTableComponent,
    AuditLogDetailDrawerComponent,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucideShield,
      lucideShieldAlert,
      lucideShieldCheck,
      lucideDownload,
      lucideSearch,
      lucideTerminal,
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
              <ng-icon name="lucideShield" class="size-4.5" />
            </div>
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-foreground">Immutable Audit Trail & Security Logs</h1>
              <p class="text-xs text-muted-foreground mt-0.5">
                Comprehensive SOC-2 compliance event trace, privilege mutations, state modifications, and IP addresses.
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="exportLogsCsv()"
            class="gap-1.5 cursor-pointer shadow-xs text-xs"
          >
            <ng-icon name="lucideDownload" class="size-3.5" />
            <span>Export Audit Trail (CSV)</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Total Events Recorded</span>
            <ng-icon name="lucideShield" class="size-4 text-primary" />
          </div>
          <div class="text-2xl font-bold text-foreground">
            {{ facade.allItems().length }}
          </div>
          <p class="text-[10px] text-muted-foreground">Immutable blockchain-style log</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Standard Operations</span>
            <ng-icon name="lucideShieldCheck" class="size-4 text-emerald-500" />
          </div>
          <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ facade.infoCount() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Operational events</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Configuration Warnings</span>
            <ng-icon name="lucideShieldAlert" class="size-4 text-amber-500" />
          </div>
          <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {{ facade.warningCount() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Price/Rate overrides</p>
        </div>

        <div class="p-4 rounded-xl border border-border/50 bg-card shadow-xs space-y-1">
          <div class="flex items-center justify-between text-muted-foreground text-xs">
            <span class="font-medium">Critical Security Alerts</span>
            <ng-icon name="lucideShieldAlert" class="size-4 text-rose-500" />
          </div>
          <div class="text-2xl font-bold text-rose-600 dark:text-rose-400">
            {{ facade.criticalCount() }}
          </div>
          <p class="text-[10px] text-muted-foreground">Access violations & rate limits</p>
        </div>
      </div>

      <!-- Search & Severity Filter Bar -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="relative flex-1 max-w-sm">
          <ng-icon name="lucideSearch" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            [ngModel]="facade.searchQuery()"
            (ngModelChange)="facade.setSearchQuery($event)"
            placeholder="Search action, actor, entity type, IP, trace ID..."
            class="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          @for (tab of severityTabs; track tab.value) {
            <button
              hlmBtn
              [variant]="facade.activeSeverityFilter() === tab.value ? 'default' : 'ghost'"
              size="sm"
              class="h-7 text-xs px-2.5 rounded-lg cursor-pointer"
              (click)="facade.setSeverityFilter(tab.value)"
            >
              {{ tab.label }}
            </button>
          }
        </div>
      </div>

      <!-- Audit Logs Table -->
      <app-audit-logs-table
        [items]="facade.items()"
        [isLoading]="facade.isLoading()"
        (inspectClick)="facade.openDetailDrawer($event)"
      />
    </app-main>

    <!-- State Diff Inspection Slide-over Drawer -->
    <hlm-sheet [isOpen]="facade.drawerMode() === 'detail'" (closed)="facade.closeDrawer()" sheetSize="md" side="right">
      <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div class="pb-3 border-b border-border/40 mb-4">
            <h3 class="text-base font-bold text-foreground">Audit Log State Diff</h3>
            <p class="text-xs text-muted-foreground mt-0.5">
              Inspect before-and-after cryptographic mutation payloads and client metadata.
            </p>
          </div>

          <app-audit-log-detail-drawer
            [log]="facade.selected()"
            (close)="facade.closeDrawer()"
          />
        </div>
      </div>
    </hlm-sheet>
  `,
})
export class AuditLogsComponent implements OnInit {
  readonly facade = inject(AuditLogsFacade)
  private readonly exportService = inject(ExportService)

  readonly severityTabs = [
    { label: 'All Severities', value: 'all' },
    { label: 'Critical', value: 'critical' },
    { label: 'Warning', value: 'warning' },
    { label: 'Info', value: 'info' },
  ]

  ngOnInit(): void {
    this.facade.loadAll()
  }

  exportLogsCsv(): void {
    this.exportService.exportToCsv('compliance-audit-trail', this.facade.items(), [
      { header: 'Event ID', accessor: l => l.id },
      { header: 'Action', accessor: l => l.action },
      { header: 'Actor Name', accessor: l => l.actorName },
      { header: 'Actor Role', accessor: l => l.actorRole },
      { header: 'Entity Type', accessor: l => l.entityType },
      { header: 'Entity ID', accessor: l => l.entityId || 'N/A' },
      { header: 'Severity', accessor: l => l.severity },
      { header: 'IP Address', accessor: l => l.ipAddress || '' },
      { header: 'Correlation ID', accessor: l => l.correlationId || '' },
      { header: 'Timestamp', accessor: l => l.createdAt },
    ])
    toast.success('Audit trail CSV exported')
  }
}
