import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideShieldAlert,
  lucideDownload,
  lucideSearch,
  lucideShieldCheck,
  lucideKey,
  lucideUserCheck,
  lucideTrash2,
  lucideSettings,
  lucideGlobe,
  lucideTerminal,
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
import { HlmAvatarImports } from '../../ui/avatar/hlm-avatar.components'
import { getDisplayNameInitials } from '../../core/utils/initials'
import { exportToCsv } from '../../core/utils/export'
import { toast } from 'ngx-sonner'

export interface AuditEvent {
  id: string
  action: string
  details: string
  actor: { name: string; email: string; avatar?: string }
  severity: 'info' | 'security' | 'warning' | 'critical'
  ipAddress: string
  location: string
  timestamp: string
}

@Component({
  selector: 'app-audit-logs',
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
    ...HlmAvatarImports,
  ],
  providers: [
    provideIcons({
      lucideShieldAlert,
      lucideDownload,
      lucideSearch,
      lucideShieldCheck,
      lucideKey,
      lucideUserCheck,
      lucideTrash2,
      lucideSettings,
      lucideGlobe,
      lucideTerminal,
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
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight">Security Audit Logs</h1>
            <span hlmBadge variant="outline" class="text-[10px] uppercase font-semibold">SOC-2 Verified</span>
          </div>
          <p class="text-xs text-muted-foreground mt-1">
            Immutable chronological record of authentication events, user permissions, and admin actions.
          </p>
        </div>

        <button hlmBtn variant="outline" size="sm" (click)="exportLogs()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
          <ng-icon name="lucideDownload" class="size-3.5" />
          <span>Export Audit Trail</span>
        </button>
      </div>

      <!-- Filters & Stats Overview -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <!-- Search bar -->
        <div class="relative w-full sm:w-64">
          <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Filter by actor, IP or event..."
            class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <!-- Severity filter pills -->
        <div class="flex items-center gap-1.5 flex-wrap">
          @for (sev of severityPills; track sev.value) {
            <button
              type="button"
              (click)="selectedSeverity.set(sev.value)"
              class="px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer"
              [class.bg-primary]="selectedSeverity() === sev.value"
              [class.text-primary-foreground]="selectedSeverity() === sev.value"
              [class.border-primary]="selectedSeverity() === sev.value"
              [class.bg-background]="selectedSeverity() !== sev.value"
              [class.text-muted-foreground]="selectedSeverity() !== sev.value"
            >
              {{ sev.label }}
            </button>
          }
        </div>
      </div>

      <!-- Chronological Connected Timeline Feed -->
      <div hlmCard class="p-6">
        <div class="relative border-l-2 border-border/80 ml-4 space-y-8 pl-6">
          @for (event of filteredEvents(); track event.id) {
            <div class="relative group">
              <!-- Dot Indicator on line -->
              <span
                class="absolute -left-[31px] top-1.5 size-3.5 rounded-full border-2 border-background shadow-xs"
                [ngClass]="getSeverityDot(event.severity)"
              ></span>

              <div class="space-y-2">
                <!-- Event Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold text-foreground">{{ event.action }}</span>
                    <span
                      class="inline-flex items-center rounded-full px-2 py-0.2 text-[10px] font-semibold border uppercase tracking-wider"
                      [ngClass]="getSeverityBadge(event.severity)"
                    >
                      {{ event.severity }}
                    </span>
                  </div>

                  <span class="text-[11px] font-mono text-muted-foreground">{{ event.timestamp }}</span>
                </div>

                <!-- Event Details -->
                <p class="text-xs text-muted-foreground leading-relaxed">{{ event.details }}</p>

                <!-- Actor & Metadata Footer -->
                <div class="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground pt-1">
                  <div class="flex items-center gap-1.5 font-medium text-foreground">
                    <hlm-avatar class="size-5 shadow-2xs">
                      <img hlmAvatarImage [src]="event.actor.avatar || ''" [alt]="event.actor.name" />
                      <span hlmAvatarFallback class="text-[8px]">{{ initials(event.actor.name) }}</span>
                    </hlm-avatar>
                    <span>{{ event.actor.name }} ({{ event.actor.email }})</span>
                  </div>

                  <div class="flex items-center gap-1 font-mono">
                    <ng-icon name="lucideTerminal" class="size-3 text-muted-foreground/80" />
                    <span>{{ event.ipAddress }}</span>
                  </div>

                  <div class="flex items-center gap-1">
                    <ng-icon name="lucideGlobe" class="size-3 text-muted-foreground/80" />
                    <span>{{ event.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </app-main>
  `,
})
export class AuditLogsComponent {
  searchQuery = ''
  readonly selectedSeverity = signal<string>('all')

  readonly severityPills = [
    { label: 'All Events', value: 'all' },
    { label: 'Security', value: 'security' },
    { label: 'Warning', value: 'warning' },
    { label: 'Critical', value: 'critical' },
    { label: 'Info', value: 'info' },
  ]

  readonly events: AuditEvent[] = [
    {
      id: 'evt-1',
      action: 'API Key Generated',
      details: 'Generated production secret key "Production Sync Token (fast_live_...)" with write:tasks permission.',
      actor: { name: 'Sat Naing', email: 'satnaingdev@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      severity: 'security',
      ipAddress: '192.168.1.42',
      location: 'San Francisco, US',
      timestamp: 'Today, 10:45 AM',
    },
    {
      id: 'evt-2',
      action: 'User Role Escalation',
      details: 'Elevated member permissions for alex@example.com from Member to Admin.',
      actor: { name: 'Sat Naing', email: 'satnaingdev@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      severity: 'warning',
      ipAddress: '192.168.1.42',
      location: 'San Francisco, US',
      timestamp: 'Today, 09:12 AM',
    },
    {
      id: 'evt-3',
      action: 'App OAuth Connected',
      details: 'Authorized Slack App webhook integration with channel #dev-alerts.',
      actor: { name: 'Sarah Miller', email: 'sarah.miller@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      severity: 'info',
      ipAddress: '10.0.4.19',
      location: 'New York, US',
      timestamp: 'Yesterday, 04:30 PM',
    },
    {
      id: 'evt-4',
      action: 'Suspicious Login Attempt Blocked',
      details: 'Blocked 5 failed password attempts originating from unrecognized ASN proxy.',
      actor: { name: 'Security Gateway', email: 'auth-guard@system.local' },
      severity: 'critical',
      ipAddress: '185.220.101.5',
      location: 'Frankfurt, DE',
      timestamp: 'Aug 04, 2026, 11:20 PM',
    },
    {
      id: 'evt-5',
      action: 'Bulk Tasks Export',
      details: 'Exported 100 task records to CSV format.',
      actor: { name: 'Alex John', email: 'alex@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      severity: 'info',
      ipAddress: '172.16.0.8',
      location: 'London, UK',
      timestamp: 'Aug 03, 2026, 02:15 PM',
    },
  ]

  readonly filteredEvents = computed(() => {
    let list = this.events
    const q = this.searchQuery.toLowerCase().trim()
    const sev = this.selectedSeverity()

    if (q) {
      list = list.filter(
        (e) =>
          e.action.toLowerCase().includes(q) ||
          e.details.toLowerCase().includes(q) ||
          e.actor.name.toLowerCase().includes(q) ||
          e.ipAddress.includes(q)
      )
    }

    if (sev !== 'all') {
      list = list.filter((e) => e.severity === sev)
    }

    return list
  })

  getSeverityDot(sev: string): string {
    switch (sev) {
      case 'critical': return 'bg-destructive ring-4 ring-destructive/20'
      case 'warning': return 'bg-amber-500 ring-4 ring-amber-500/20'
      case 'security': return 'bg-violet-500 ring-4 ring-violet-500/20'
      default: return 'bg-sky-500 ring-4 ring-sky-500/20'
    }
  }

  getSeverityBadge(sev: string): string {
    switch (sev) {
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'warning': return 'bg-amber-500/10 text-amber-600 border-amber-200'
      case 'security': return 'bg-violet-500/10 text-violet-600 border-violet-200'
      default: return 'bg-sky-500/10 text-sky-600 border-sky-200'
    }
  }

  exportLogs(): void {
    exportToCsv('audit-logs-export', this.events)
    toast.success('Audit trail exported to CSV!')
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
