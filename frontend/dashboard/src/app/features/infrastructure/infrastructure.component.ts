import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideServer,
  lucideHardDrive,
  lucideCpu,
  lucideTerminal,
  lucideActivity,
  lucideRefreshCw,
  lucidePlay,
  lucideCheck,
  lucideAlertTriangle,
  lucideLayers,
  lucideGitBranch,
  lucideSliders,
  lucideDownload,
  lucideTrash2,
  lucideZap,
  lucideShieldCheck,
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
import { HlmDialogImports } from '../../ui/dialog/hlm-dialog.components'
import { HlmTableImports } from '../../ui/table/hlm-table.components'
import { toast } from 'ngx-sonner'

export interface ClusterNode {
  id: string
  name: string
  role: 'Control Plane' | 'Worker Node' | 'Database Cluster'
  region: string
  cpuUsage: number
  memUsage: number
  activePods: number
  status: 'healthy' | 'warning' | 'degraded'
  uptime: string
}

export interface DeploymentStep {
  step: number
  title: string
  desc: string
  status: 'completed' | 'in_progress' | 'pending'
  duration: string
}

@Component({
  selector: 'app-infrastructure',
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
    ...HlmDialogImports,
    ...HlmTableImports,
  ],
  providers: [
    provideIcons({
      lucideServer,
      lucideHardDrive,
      lucideCpu,
      lucideTerminal,
      lucideActivity,
      lucideRefreshCw,
      lucidePlay,
      lucideCheck,
      lucideAlertTriangle,
      lucideLayers,
      lucideGitBranch,
      lucideSliders,
      lucideDownload,
      lucideTrash2,
      lucideZap,
      lucideShieldCheck,
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
            <h1 class="text-2xl font-bold tracking-tight text-foreground">Cluster & Cloud Infrastructure</h1>
            <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-200">
              <span class="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              K8S PRODUCTION CLUSTER
            </span>
          </div>
          <p class="text-xs text-muted-foreground">Monitor Kubernetes node health, container pod autoscaling, and live CI/CD pipeline deployments.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="openLogsConsole()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideTerminal" class="size-3.5 text-muted-foreground" />
            <span>Full Logs Console (XL Sheet)</span>
          </button>
          <button hlmBtn size="sm" (click)="openScaleDialog()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideSliders" class="size-3.5" />
            <span>Scale Replicas</span>
          </button>
        </div>
      </div>

      <!-- Cluster Gauges Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">CPU Cluster Utilization</span>
          <div class="text-2xl font-bold text-foreground font-mono">42.8%</div>
          <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-1">
            <div class="h-full bg-emerald-500 rounded-full" style="width: 42.8%"></div>
          </div>
          <p class="text-[11px] text-muted-foreground pt-1">32 / 64 vCPUs allocated</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">RAM Memory Consumption</span>
          <div class="text-2xl font-bold text-foreground font-mono">58.4 GB</div>
          <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-1">
            <div class="h-full bg-sky-500 rounded-full" style="width: 61%"></div>
          </div>
          <p class="text-[11px] text-muted-foreground pt-1">61% of 96 GB Total Pool</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Running Pods / Containers</span>
          <div class="text-2xl font-bold text-foreground font-mono">148 Pods</div>
          <p class="text-[11px] text-emerald-600 font-semibold">100% healthy replicas</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Network Throughput (I/O)</span>
          <div class="text-2xl font-bold text-foreground font-mono">1.84 GB/s</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Zero packet drops detected</p>
        </div>
      </div>

      <!-- CI/CD Deployment Pipeline Stepper -->
      <div hlmCard class="p-5 space-y-4 shadow-2xs">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-sm text-foreground">Active Deployment: Release v2.4.0 (Canary Rollout)</h3>
            <p class="text-xs text-muted-foreground">Automated GitHub Actions CI/CD workflow triggered by commit #4f9a21</p>
          </div>
          <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-sky-500/10 text-sky-600 border border-sky-200">
            <span class="size-1.5 rounded-full bg-sky-500 animate-ping"></span>
            DEPLOYING TO CANARY
          </span>
        </div>

        <!-- Horizontal Stepper -->
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          @for (step of deploymentSteps; track step.step) {
            <div class="p-3 rounded-xl border border-border bg-card space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono font-bold text-muted-foreground">STAGE 0{{ step.step }}</span>
                @if (step.status === 'completed') {
                  <span class="text-emerald-600 font-bold text-[10px]">DONE</span>
                } @else if (step.status === 'in_progress') {
                  <span class="text-sky-500 font-bold text-[10px] animate-pulse">RUNNING</span>
                } @else {
                  <span class="text-muted-foreground text-[10px]">PENDING</span>
                }
              </div>
              <h4 class="font-bold text-xs text-foreground">{{ step.title }}</h4>
              <p class="text-[11px] text-muted-foreground">{{ step.duration }}</p>
            </div>
          }
        </div>
      </div>

      <!-- Kubernetes Node Health Grid -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-sm text-foreground">Cluster Node Pool Matrix</h3>
          <span class="text-xs text-muted-foreground">4 Active Dedicated Bare-Metal Nodes</span>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          @for (node of nodes(); track node.id) {
            <div hlmCard class="p-4 space-y-3 hover:border-primary/40 transition-colors shadow-2xs">
              <div class="flex items-center justify-between">
                <span class="font-mono font-bold text-xs text-foreground">{{ node.name }}</span>
                <span
                  class="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase border"
                  [ngClass]="getNodeStatusClass(node.status)"
                >
                  {{ node.status }}
                </span>
              </div>

              <div class="text-[11px] text-muted-foreground">
                Role: <span class="font-semibold text-foreground">{{ node.role }}</span> ({{ node.region }})
              </div>

              <!-- CPU Bar -->
              <div class="space-y-1">
                <div class="flex justify-between text-[11px]">
                  <span class="text-muted-foreground">CPU Core Load</span>
                  <span class="font-mono font-bold text-foreground">{{ node.cpuUsage }}%</span>
                </div>
                <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div class="h-full bg-primary rounded-full" [style.width.%]="node.cpuUsage"></div>
                </div>
              </div>

              <!-- RAM Bar -->
              <div class="space-y-1">
                <div class="flex justify-between text-[11px]">
                  <span class="text-muted-foreground">Memory Heap</span>
                  <span class="font-mono font-bold text-foreground">{{ node.memUsage }}%</span>
                </div>
                <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div class="h-full bg-sky-500 rounded-full" [style.width.%]="node.memUsage"></div>
                </div>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-border text-[11px] text-muted-foreground">
                <span>{{ node.activePods }} Pods Running</span>
                <span>Uptime: {{ node.uptime }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </app-main>

    <!-- Full Screen Live Console Logs Sheet (size="xl" = Full Screen width) -->
    <hlm-sheet [isOpen]="logsConsoleOpen()" position="right" [size]="'xl'" (closed)="logsConsoleOpen.set(false)">
      <div hlmSheetHeader>
        <div class="flex items-center justify-between">
          <h3 hlmSheetTitle>Kube-Cluster Stdout & Stderr Live Console</h3>
          <span hlmBadge variant="outline" class="font-mono text-[10px]">TAIL -F STREAM</span>
        </div>
        <p hlmSheetDescription class="text-xs">Live aggregated stdout logs from pod ingress, microservices, and background queue workers.</p>
      </div>

      <div class="space-y-3 py-4 flex-1 flex flex-col overflow-hidden text-xs">
        <!-- Log Filter Controls -->
        <div class="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-muted/40 border border-border">
          <div class="flex items-center gap-2">
            <span class="font-bold text-foreground text-xs">Log Level:</span>
            <button
              type="button"
              (click)="logLevel.set('ALL')"
              class="px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer"
              [class.bg-primary]="logLevel() === 'ALL'"
              [class.text-primary-foreground]="logLevel() === 'ALL'"
            >
              ALL
            </button>
            <button
              type="button"
              (click)="logLevel.set('INFO')"
              class="px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer"
              [class.bg-sky-500]="logLevel() === 'INFO'"
              [class.text-white]="logLevel() === 'INFO'"
            >
              INFO
            </button>
            <button
              type="button"
              (click)="logLevel.set('WARN')"
              class="px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer"
              [class.bg-amber-500]="logLevel() === 'WARN'"
              [class.text-white]="logLevel() === 'WARN'"
            >
              WARN
            </button>
            <button
              type="button"
              (click)="logLevel.set('ERROR')"
              class="px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer"
              [class.bg-rose-500]="logLevel() === 'ERROR'"
              [class.text-white]="logLevel() === 'ERROR'"
            >
              ERROR
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" (click)="downloadLogs()" class="h-7 text-xs cursor-pointer">
              <ng-icon name="lucideDownload" class="size-3.5 mr-1" />
              <span>Save Logs</span>
            </button>
            <button hlmBtn variant="outline" size="sm" (click)="clearConsole()" class="h-7 text-xs cursor-pointer">
              <ng-icon name="lucideTrash2" class="size-3.5 mr-1" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <!-- Terminal Output View -->
        <div class="flex-1 rounded-xl border border-border bg-zinc-950 text-zinc-100 p-4 font-mono text-xs overflow-y-auto space-y-1.5 shadow-inner">
          @for (log of filteredLogs(); track log.id) {
            <div class="flex items-start gap-2 leading-relaxed">
              <span class="text-zinc-500 shrink-0">{{ log.time }}</span>
              <span
                class="font-bold shrink-0 px-1 rounded text-[10px]"
                [class.text-sky-400]="log.level === 'INFO'"
                [class.text-amber-400]="log.level === 'WARN'"
                [class.text-rose-400]="log.level === 'ERROR'"
              >
                [{{ log.level }}]
              </span>
              <span class="text-zinc-400 shrink-0">[{{ log.service }}]</span>
              <span class="text-zinc-200">{{ log.message }}</span>
            </div>
          }
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-end gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="logsConsoleOpen.set(false)" class="cursor-pointer text-xs">
          Close Console
        </button>
      </div>
    </hlm-sheet>

    <!-- Scale Replicas Modal (hlm-dialog) -->
    <hlm-dialog [isOpen]="scaleDialogOpen()" (closed)="scaleDialogOpen.set(false)" class="max-w-md">
      <div class="space-y-4">
        <div>
          <h3 class="text-base font-bold text-foreground">Autoscale Worker Replicas</h3>
          <p class="text-xs text-muted-foreground">Adjust minimum and maximum replica pods for dynamic load spike handling.</p>
        </div>

        <div class="space-y-2">
          <div class="flex justify-between text-xs">
            <span class="font-semibold text-foreground">Target Replica Count</span>
            <span class="font-bold text-primary">{{ targetReplicas }} Pods</span>
          </div>
          <input
            type="range"
            min="2"
            max="32"
            step="2"
            [(ngModel)]="targetReplicas"
            class="w-full accent-primary"
          />
          <p class="text-[11px] text-muted-foreground">Projected memory overhead: {{ (targetReplicas * 1.8) | number:'1.1-1' }} GB</p>
        </div>

        <div class="flex justify-end gap-2 pt-2 border-t border-border">
          <button hlmBtn variant="outline" size="sm" (click)="scaleDialogOpen.set(false)" class="cursor-pointer text-xs">
            Cancel
          </button>
          <button hlmBtn size="sm" (click)="applyScaleConfig()" class="cursor-pointer text-xs">
            Apply Scale Configuration
          </button>
        </div>
      </div>
    </hlm-dialog>
  `,
})
export class InfrastructureComponent {
  readonly logsConsoleOpen = signal<boolean>(false)
  readonly scaleDialogOpen = signal<boolean>(false)
  readonly logLevel = signal<'ALL' | 'INFO' | 'WARN' | 'ERROR'>('ALL')
  targetReplicas = 12

  readonly deploymentSteps: DeploymentStep[] = [
    { step: 1, title: 'GitHub Push #4f9a21', desc: 'Triggered by merge to main', status: 'completed', duration: '2s' },
    { step: 2, title: 'Angular 21 Test Suite', desc: 'Running Jest & Vitest unit specs', status: 'completed', duration: '44s' },
    { step: 3, title: 'Docker Build & Push', desc: 'Tagged prod-v2.4.0 image', status: 'completed', duration: '1m 12s' },
    { step: 4, title: 'Canary Ingress (10%)', desc: 'Routing 10% live traffic to new pod', status: 'in_progress', duration: 'Running...' },
    { step: 5, title: 'Global Production Rollout', desc: 'Replace remaining replicas', status: 'pending', duration: 'Pending' },
  ]

  readonly nodes = signal<ClusterNode[]>([
    { id: 'n-1', name: 'us-east-k8s-ctrl-01', role: 'Control Plane', region: 'US East (N. Virginia)', cpuUsage: 28, memUsage: 45, activePods: 24, status: 'healthy', uptime: '99.99%' },
    { id: 'n-2', name: 'us-east-k8s-work-01', role: 'Worker Node', region: 'US East (N. Virginia)', cpuUsage: 64, memUsage: 78, activePods: 48, status: 'healthy', uptime: '99.98%' },
    { id: 'n-3', name: 'us-east-k8s-work-02', role: 'Worker Node', region: 'US East (N. Virginia)', cpuUsage: 52, memUsage: 62, activePods: 44, status: 'healthy', uptime: '99.99%' },
    { id: 'n-4', name: 'eu-west-db-cluster-01', role: 'Database Cluster', region: 'EU West (Frankfurt)', cpuUsage: 36, memUsage: 54, activePods: 32, status: 'healthy', uptime: '100.00%' },
  ])

  readonly consoleLogs = signal<{ id: string; time: string; level: 'INFO' | 'WARN' | 'ERROR'; service: string; message: string }[]>([
    { id: 'l-1', time: '14:32:01.104', level: 'INFO', service: 'ingress-nginx', message: 'HTTP 200 GET /api/v1/telemetry from 192.168.1.10 (latency 12ms)' },
    { id: 'l-2', time: '14:32:01.890', level: 'INFO', service: 'auth-service', message: 'Session token verified successfully for UID user_88921' },
    { id: 'l-3', time: '14:32:02.412', level: 'WARN', service: 'redis-cache', message: 'Key evictions rate reached 120 keys/sec; capacity at 74%' },
    { id: 'l-4', time: '14:32:03.119', level: 'INFO', service: 'k8s-autoscaler', message: 'Scaled deployment "ai-workflows" from 4 to 8 replicas (target CPU > 60%)' },
    { id: 'l-5', time: '14:32:04.002', level: 'ERROR', service: 'payment-webhook', message: 'Stripe webhook retry #1 received signature mismatch header from unknown IP' },
  ])

  readonly filteredLogs = computed(() => {
    const lvl = this.logLevel()
    if (lvl === 'ALL') return this.consoleLogs()
    return this.consoleLogs().filter((l) => l.level === lvl)
  })

  getNodeStatusClass(status: string): string {
    switch (status) {
      case 'healthy': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800'
      case 'warning': return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800'
      default: return 'bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-800'
    }
  }

  openLogsConsole(): void {
    this.logsConsoleOpen.set(true)
  }

  openScaleDialog(): void {
    this.scaleDialogOpen.set(true)
  }

  applyScaleConfig(): void {
    toast.success(`Replica pool autoscaled to ${this.targetReplicas} pods.`)
    this.scaleDialogOpen.set(false)
  }

  clearConsole(): void {
    this.consoleLogs.set([])
    toast.success('Console buffer cleared.')
  }

  downloadLogs(): void {
    toast.success('Cluster stdout log dumped to k8s-logs.txt.')
  }
}
