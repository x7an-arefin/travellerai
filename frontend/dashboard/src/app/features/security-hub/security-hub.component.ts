import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideShieldAlert,
  lucideShieldCheck,
  lucideAlertTriangle,
  lucideCheck,
  lucideLock,
  lucideRefreshCw,
  lucideDownload,
  lucideSearch,
  lucideLayers,
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

export interface CveItem {
  id: string
  cveCode: string
  packageName: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  cvssScore: number
  remediation: string
  status: 'open' | 'patched'
}

@Component({
  selector: 'app-security-hub',
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
      lucideShieldAlert,
      lucideShieldCheck,
      lucideAlertTriangle,
      lucideCheck,
      lucideLock,
      lucideRefreshCw,
      lucideDownload,
      lucideSearch,
      lucideLayers,
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
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight text-foreground">Security Posture & Vulnerability Scanner</h1>
            <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-200">
              <span class="size-1.5 rounded-full bg-emerald-500"></span>
              SOC2 COMPLIANT
            </span>
          </div>
          <p class="text-xs text-muted-foreground">Monitor automated dependency scans, inspect CVE alerts, and patch security advisories.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn size="sm" (click)="runVulnerabilityScan()" [disabled]="scanning()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon [name]="scanning() ? 'lucideRefreshCw' : 'lucideShieldCheck'" [class.animate-spin]="scanning()" class="size-3.5" />
            <span>{{ scanning() ? 'Scanning Containers...' : 'Run Security Scan' }}</span>
          </button>
        </div>
      </div>

      <!-- Security Scorecard KPI Deck -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Security Posture Score</span>
          <div class="text-2xl font-bold text-emerald-600 font-mono">96 / 100</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Grade A+ (Excellent)</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Critical Vulnerabilities</span>
          <div class="text-2xl font-bold text-foreground font-mono">0 Critical</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Zero zero-day exploits</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Medium Advisories</span>
          <div class="text-2xl font-bold text-amber-600 font-mono">2 Advisories</div>
          <p class="text-[11px] text-amber-600 font-semibold">Patch available</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Last Security Audit</span>
          <div class="text-2xl font-bold text-foreground">12m Ago</div>
          <p class="text-[11px] text-muted-foreground">Automated hourly trigger</p>
        </div>
      </div>

      <!-- CVE Advisories Table -->
      <div hlmCard class="p-0 overflow-hidden shadow-2xs">
        <div class="p-4 border-b border-border">
          <h3 class="font-bold text-sm text-foreground">Detected Dependency CVE Advisories</h3>
          <p class="text-xs text-muted-foreground">Real-time alerts cross-referenced against the National Vulnerability Database.</p>
        </div>

        <table hlmTable class="w-full text-xs">
          <thead hlmTableHeader>
            <tr hlmTableRow>
              <th hlmTableHead class="ps-4">CVE Identifier</th>
              <th hlmTableHead>Package</th>
              <th hlmTableHead>Severity</th>
              <th hlmTableHead>CVSS</th>
              <th hlmTableHead>Recommended Action</th>
              <th hlmTableHead class="text-right pe-4">Remediation</th>
            </tr>
          </thead>
          <tbody hlmTableBody>
            @for (cve of cves(); track cve.id) {
              <tr hlmTableRow class="hover:bg-muted/40 transition-colors">
                <td hlmTableCell class="ps-4 font-mono font-bold text-foreground">{{ cve.cveCode }}</td>
                <td hlmTableCell class="font-mono text-muted-foreground">{{ cve.packageName }}</td>
                <td hlmTableCell>
                  <span
                    class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border"
                    [ngClass]="getSeverityClass(cve.severity)"
                  >
                    {{ cve.severity }}
                  </span>
                </td>
                <td hlmTableCell class="font-mono font-bold">{{ cve.cvssScore }}</td>
                <td hlmTableCell class="text-muted-foreground">{{ cve.remediation }}</td>
                <td hlmTableCell class="text-right pe-4">
                  @if (cve.status === 'open') {
                    <button hlmBtn variant="outline" size="sm" (click)="applyPatch(cve)" class="h-7 text-xs cursor-pointer">
                      Apply Patch
                    </button>
                  } @else {
                    <span class="text-emerald-600 font-bold text-[11px]">PATCHED</span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </app-main>
  `,
})
export class SecurityHubComponent {
  readonly scanning = signal<boolean>(false)

  readonly cves = signal<CveItem[]>([
    { id: 'cve-1', cveCode: 'CVE-2026-2189', packageName: 'node-tar (npm)', severity: 'Medium', cvssScore: 6.2, remediation: 'Upgrade to node-tar@6.2.2', status: 'open' },
    { id: 'cve-2', cveCode: 'CVE-2026-1944', packageName: 'axios (npm)', severity: 'Low', cvssScore: 3.8, remediation: 'Upgrade to axios@1.8.0', status: 'open' },
    { id: 'cve-3', cveCode: 'CVE-2026-0812', packageName: 'nginx (docker)', severity: 'High', cvssScore: 7.8, remediation: 'Base image bumped to alpine-3.20', status: 'patched' },
  ])

  getSeverityClass(sev: string): string {
    switch (sev) {
      case 'Critical': return 'bg-rose-500/10 text-rose-600 border-rose-200'
      case 'High': return 'bg-rose-500/10 text-rose-600 border-rose-200'
      case 'Medium': return 'bg-amber-500/10 text-amber-600 border-amber-200'
      default: return 'bg-sky-500/10 text-sky-600 border-sky-200'
    }
  }

  runVulnerabilityScan(): void {
    this.scanning.set(true)
    setTimeout(() => {
      this.scanning.set(false)
      toast.success('Security scan complete: 0 critical vulnerabilities found.')
    }, 1200)
  }

  applyPatch(cve: CveItem): void {
    this.cves.update((list) =>
      list.map((c) => (c.id === cve.id ? { ...c, status: 'patched' } : c))
    )
    toast.success(`Security patch applied for ${cve.cveCode}.`)
  }
}
