import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideWorkflow,
  lucideCpu,
  lucideGitBranch,
  lucidePlay,
  lucidePause,
  lucideSettings,
  lucidePlus,
  lucideCheck,
  lucideSparkles,
  lucideTerminal,
  lucideCode,
  lucideLayers,
  lucideShieldCheck,
  lucideZap,
  lucideArrowRight,
  lucideRefreshCw,
  lucideSliders,
  lucideExternalLink,
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
import { HlmSelectImports, SelectOption } from '../../ui/select/hlm-select.components'
import { HlmSwitchComponent } from '../../ui/switch/hlm-switch.component'
import { toast } from 'ngx-sonner'

export interface WorkflowNode {
  id: string
  name: string
  type: 'trigger' | 'rag' | 'llm' | 'guardrail' | 'action'
  model?: string
  temperature?: number
  topP?: number
  systemPrompt?: string
  status: 'active' | 'idle' | 'warning'
  latencyMs: number
  description: string
}

export interface WorkflowPreset {
  id: string
  title: string
  description: string
  nodesCount: number
  avgLatency: string
  successRate: string
}

@Component({
  selector: 'app-ai-workflows',
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
    ...HlmSelectImports,
  ],
  providers: [
    provideIcons({
      lucideWorkflow,
      lucideCpu,
      lucideGitBranch,
      lucidePlay,
      lucidePause,
      lucideSettings,
      lucidePlus,
      lucideCheck,
      lucideSparkles,
      lucideTerminal,
      lucideCode,
      lucideLayers,
      lucideShieldCheck,
      lucideZap,
      lucideArrowRight,
      lucideRefreshCw,
      lucideSliders,
      lucideExternalLink,
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
          <h1 class="text-2xl font-bold tracking-tight text-foreground">AI Agent Studio & Workflow Canvas</h1>
          <p class="text-xs text-muted-foreground">Orchestrate multi-step LLM reasoning pipelines, manage RAG retrieval, and inspect node executions.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="openTestRunner()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideTerminal" class="size-3.5 text-muted-foreground" />
            <span>Simulate Pipeline (Full View)</span>
          </button>
          <button hlmBtn size="sm" (click)="savePipeline()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideZap" class="size-3.5" />
            <span>Deploy Workflow</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Active Workflows</span>
          <div class="text-2xl font-bold text-foreground">12 Pipelines</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+3 agents online</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Avg Pipeline Latency</span>
          <div class="text-2xl font-bold text-foreground">420 ms</div>
          <p class="text-[11px] text-sky-500 font-semibold">Streaming tokens enabled</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Success Rate</span>
          <div class="text-2xl font-bold text-emerald-600">99.84%</div>
          <p class="text-[11px] text-muted-foreground">0.16% fallback retries</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Est. Token Cost</span>
          <div class="text-2xl font-bold text-foreground">\$42.80 / day</div>
          <p class="text-[11px] text-emerald-600 font-semibold">-12% with prompt caching</p>
        </div>
      </div>

      <!-- Workflow Template Switcher -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="flex items-center gap-1.5 flex-wrap">
          @for (preset of presets; track preset.id) {
            <button
              type="button"
              (click)="selectPreset(preset)"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border"
              [class.bg-primary]="activePreset().id === preset.id"
              [class.text-primary-foreground]="activePreset().id === preset.id"
              [class.border-primary]="activePreset().id === preset.id"
              [class.bg-card]="activePreset().id !== preset.id"
              [class.text-muted-foreground]="activePreset().id !== preset.id"
            >
              {{ preset.title }}
            </button>
          }
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground">Status:</span>
          <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-200">
            <span class="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE STREAMING
          </span>
        </div>
      </div>

      <!-- Visual Node Graph Canvas -->
      <div hlmCard class="p-6 overflow-hidden relative shadow-2xs border-dashed border-2">
        <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6 flex items-center justify-between">
          <span>Execution Graph: {{ activePreset().title }}</span>
          <span class="text-[11px] text-muted-foreground font-normal">Click any node to inspect parameters & system prompt</span>
        </div>

        <!-- Connected Nodes Flow -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 relative items-center">
          @for (node of nodes(); track node.id; let idx = $index; let last = $last) {
            <div
              (click)="openNodeConfig(node)"
              class="p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 bg-card hover:border-primary hover:shadow-md relative group"
              [class.border-primary]="selectedNode()?.id === node.id"
              [class.ring-2]="selectedNode()?.id === node.id"
              [class.ring-primary/20]="selectedNode()?.id === node.id"
            >
              <!-- Step indicator header -->
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono font-bold text-muted-foreground">STEP 0{{ idx + 1 }}</span>
                <span
                  class="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  [ngClass]="getNodeTypeBadgeClass(node.type)"
                >
                  {{ node.type }}
                </span>
              </div>

              <!-- Node Title & Details -->
              <div>
                <h4 class="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{{ node.name }}</h4>
                <p class="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{{ node.description }}</p>
              </div>

              <!-- Metadata metrics -->
              <div class="pt-2 border-t border-border flex items-center justify-between text-[11px]">
                <span class="font-mono text-muted-foreground">{{ node.latencyMs }}ms</span>
                @if (node.model) {
                  <span class="font-mono font-bold text-foreground text-[10px]">{{ node.model }}</span>
                } @else {
                  <span class="text-emerald-600 font-semibold text-[10px]">PASS</span>
                }
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Execution Trace Summary -->
      <div class="grid gap-4 md:grid-cols-2">
        <!-- System Parameters Card -->
        <div hlmCard class="p-5 space-y-3 shadow-2xs">
          <h3 class="font-bold text-sm text-foreground">Active Pipeline Hyperparameters</h3>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between py-1 border-b border-border">
              <span class="text-muted-foreground">Primary Reasoning Engine</span>
              <span class="font-mono font-semibold text-foreground">GPT-4o (2026 Edition)</span>
            </div>
            <div class="flex justify-between py-1 border-b border-border">
              <span class="text-muted-foreground">Vector Embedding Model</span>
              <span class="font-mono font-semibold text-foreground">text-embedding-3-large</span>
            </div>
            <div class="flex justify-between py-1 border-b border-border">
              <span class="text-muted-foreground">Content Moderation & Guardrails</span>
              <span class="text-emerald-600 font-semibold">Strict (Llama-Guard 3)</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-muted-foreground">Max Reasoning Tokens</span>
              <span class="font-mono font-semibold text-foreground">4,096 tokens</span>
            </div>
          </div>
        </div>

        <!-- Real-Time Token Monitor Card -->
        <div hlmCard class="p-5 space-y-3 shadow-2xs">
          <h3 class="font-bold text-sm text-foreground">Real-Time Token Usage (Last 24 Hours)</h3>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Prompt Cache Hit Ratio</span>
              <span class="font-bold text-foreground">78.4%</span>
            </div>
            <div class="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: 78.4%"></div>
            </div>
            <div class="flex justify-between pt-2 text-[11px] text-muted-foreground">
              <span>Input Tokens: 1.42M</span>
              <span>Cached Tokens: 1.11M</span>
              <span>Output Tokens: 240K</span>
            </div>
          </div>
        </div>
      </div>
    </app-main>

    <!-- Node Configuration Inspector Sheet (size="md" = 1/2 screen width) -->
    <hlm-sheet [isOpen]="nodeConfigOpen()" position="right" [size]="'md'" (closed)="nodeConfigOpen.set(false)">
      @if (selectedNode(); as n) {
        <div hlmSheetHeader>
          <div class="flex items-center justify-between">
            <h3 hlmSheetTitle>Node Settings: {{ n.name }}</h3>
            <span hlmBadge variant="outline" class="uppercase font-mono text-[10px]">{{ n.type }}</span>
          </div>
          <p hlmSheetDescription class="text-xs">{{ n.description }}</p>
        </div>

        <div class="space-y-5 py-4 flex-1 overflow-y-auto text-xs">
          <!-- Model Selection -->
          @if (n.type === 'llm' || n.type === 'rag') {
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Foundation Model</label>
              <hlm-custom-select
                [options]="modelOptions"
                [ngModel]="n.model || 'gpt-4o'"
                (valueChange)="n.model = $event"
                placeholder="Select Model"
              />
            </div>

            <!-- Temperature Slider -->
            <div class="space-y-1.5">
              <div class="flex justify-between">
                <label class="font-semibold text-foreground">Temperature</label>
                <span class="font-mono font-bold">{{ n.temperature || 0.7 }}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                [(ngModel)]="n.temperature"
                class="w-full accent-primary"
              />
              <p class="text-[10px] text-muted-foreground">Lower values produce deterministic responses; higher values encourage creativity.</p>
            </div>

            <!-- Top P Slider -->
            <div class="space-y-1.5">
              <div class="flex justify-between">
                <label class="font-semibold text-foreground">Top-P Nucleus Sampling</label>
                <span class="font-mono font-bold">{{ n.topP || 0.9 }}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                [(ngModel)]="n.topP"
                class="w-full accent-primary"
              />
            </div>

            <!-- System Prompt Textarea -->
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">System Prompt Instructions</label>
              <textarea
                rows="5"
                [(ngModel)]="n.systemPrompt"
                class="w-full rounded-md border border-input bg-background p-2.5 font-mono text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              ></textarea>
            </div>
          }

          <!-- Guardrail / Action details -->
          @if (n.type === 'guardrail') {
            <div class="p-3 rounded-lg border border-border bg-muted/20 space-y-2">
              <div class="font-semibold text-foreground">Safety Policy Enforcement</div>
              <div class="space-y-1.5 text-muted-foreground">
                <div class="flex items-center gap-2">
                  <ng-icon name="lucideCheck" class="size-3.5 text-emerald-600" />
                  <span>PII Data Masking & Anonymization</span>
                </div>
                <div class="flex items-center gap-2">
                  <ng-icon name="lucideCheck" class="size-3.5 text-emerald-600" />
                  <span>Jailbreak & Prompt Injection Filter</span>
                </div>
                <div class="flex items-center gap-2">
                  <ng-icon name="lucideCheck" class="size-3.5 text-emerald-600" />
                  <span>Toxicity and Compliance Scoring</span>
                </div>
              </div>
            </div>
          }
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="nodeConfigOpen.set(false)" class="cursor-pointer text-xs">
            Close
          </button>
          <button hlmBtn (click)="saveNodeConfig()" class="cursor-pointer text-xs">
            Save Node Configuration
          </button>
        </div>
      }
    </hlm-sheet>

    <!-- Live Pipeline Test Runner Sheet (size="xl" = Full Screen width) -->
    <hlm-sheet [isOpen]="testRunnerOpen()" position="right" [size]="'xl'" (closed)="testRunnerOpen.set(false)">
      <div hlmSheetHeader>
        <div class="flex items-center justify-between">
          <h3 hlmSheetTitle>Live Pipeline Simulation: {{ activePreset().title }}</h3>
          <span hlmBadge variant="outline" class="font-mono text-[10px]">DEBUGGER CONSOLE</span>
        </div>
        <p hlmSheetDescription class="text-xs">Provide mock input payload to step through node activations, inspect latencies, and check final model completion.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4 flex-1 overflow-y-auto text-xs">
        <!-- Input JSON Mock Payload -->
        <div class="space-y-3 flex flex-col">
          <div class="flex items-center justify-between">
            <span class="font-bold text-foreground">Input Mock JSON Payload</span>
            <button hlmBtn variant="ghost" size="sm" (click)="resetMockInput()" class="h-6 text-[10px] cursor-pointer">
              Reset Example
            </button>
          </div>
          <textarea
            rows="14"
            [(ngModel)]="mockInputJson"
            class="w-full flex-1 rounded-md border border-input bg-zinc-950 text-emerald-400 p-3 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none shadow-inner"
          ></textarea>

          <button hlmBtn (click)="runSimulation()" [disabled]="simulating()" class="w-full gap-2 cursor-pointer h-10 shadow-xs">
            <ng-icon [name]="simulating() ? 'lucideRefreshCw' : 'lucidePlay'" [class.animate-spin]="simulating()" class="size-4" />
            <span>{{ simulating() ? 'Executing Pipeline Nodes...' : 'Run Simulation' }}</span>
          </button>
        </div>

        <!-- Output Terminal Simulation -->
        <div class="space-y-3 flex flex-col">
          <span class="font-bold text-foreground">Execution Trace & Output Output</span>
          <div class="flex-1 rounded-md border border-input bg-zinc-950 text-zinc-100 p-4 font-mono text-xs overflow-y-auto space-y-3 shadow-inner">
            <div class="text-zinc-500 font-bold">--- AI WORKFLOW TEST RUNNER CONSOLE ---</div>
            @for (log of simulationLogs(); track log.step) {
              <div class="space-y-0.5">
                <div class="flex items-center gap-2 text-sky-400 font-bold">
                  <span>[STEP 0{{ log.step }}]</span>
                  <span>{{ log.name }}</span>
                  <span class="text-zinc-500 text-[10px]">({{ log.time }}ms)</span>
                </div>
                <div class="text-zinc-300 pl-4 text-[11px] leading-relaxed">{{ log.message }}</div>
              </div>
            }

            @if (simulationLogs().length === 0 && !simulating()) {
              <div class="text-zinc-500 py-12 text-center">Click "Run Simulation" to execute the pipeline trace.</div>
            }

            @if (simulating()) {
              <div class="text-amber-400 animate-pulse pl-4">Executing multi-step reasoning nodes...</div>
            }
          </div>
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-end gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="testRunnerOpen.set(false)" class="cursor-pointer text-xs">
          Exit Simulator
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class AiWorkflowsComponent {
  readonly nodeConfigOpen = signal<boolean>(false)
  readonly testRunnerOpen = signal<boolean>(false)
  readonly selectedNode = signal<WorkflowNode | null>(null)
  readonly simulating = signal<boolean>(false)
  readonly simulationLogs = signal<{ step: number; name: string; time: number; message: string }[]>([])

  readonly presets: WorkflowPreset[] = [
    {
      id: 'ticket-classifier',
      title: 'Customer Support Classifier',
      description: 'Categorizes incoming support requests and drafts initial solutions.',
      nodesCount: 5,
      avgLatency: '380ms',
      successRate: '99.9%',
    },
    {
      id: 'invoice-ocr',
      title: 'Invoice Financial Extractor',
      description: 'Extracts line items, vendor tax IDs, and totals from unstructured PDF text.',
      nodesCount: 5,
      avgLatency: '450ms',
      successRate: '99.7%',
    },
    {
      id: 'lead-enrichment',
      title: 'B2B Lead Enrichment Agent',
      description: 'Scrapes public business domains and determines sales fit score.',
      nodesCount: 5,
      avgLatency: '510ms',
      successRate: '99.8%',
    },
  ]

  readonly activePreset = signal<WorkflowPreset>(this.presets[0])

  readonly nodes = signal<WorkflowNode[]>([
    {
      id: 'node-1',
      name: 'Webhook Trigger',
      type: 'trigger',
      status: 'active',
      latencyMs: 12,
      description: 'Receives incoming ticket JSON payload from Helpdesk webhook endpoint.',
    },
    {
      id: 'node-2',
      name: 'Knowledge Base RAG',
      type: 'rag',
      model: 'text-embedding-3-large',
      status: 'active',
      latencyMs: 85,
      description: 'Performs semantic vector search across 5,000+ support documentation articles.',
    },
    {
      id: 'node-3',
      name: 'LLM Intent Resolver',
      type: 'llm',
      model: 'gpt-4o',
      temperature: 0.2,
      topP: 0.9,
      systemPrompt: 'You are an enterprise support triage assistant. Analyze the issue and classify urgency.',
      status: 'active',
      latencyMs: 240,
      description: 'Generates intent classification, urgency score, and suggested resolution draft.',
    },
    {
      id: 'node-4',
      name: 'Safety Guardrail',
      type: 'guardrail',
      status: 'active',
      latencyMs: 28,
      description: 'Validates safety compliance and masks sensitive customer PII before storage.',
    },
    {
      id: 'node-5',
      name: 'Dispatch & Alert',
      type: 'action',
      status: 'active',
      latencyMs: 45,
      description: 'Routes ticket to designated team queue and notifies agent on Slack channel.',
    },
  ])

  readonly modelOptions: readonly SelectOption[] = [
    { label: 'GPT-4o (OpenAI)', value: 'gpt-4o' },
    { label: 'Claude 3.7 Sonnet (Anthropic)', value: 'claude-3-7-sonnet' },
    { label: 'Gemini 1.5 Pro (Google)', value: 'gemini-1.5-pro' },
    { label: 'Llama 3.3 70B (Meta)', value: 'llama-3.3-70b' },
  ]

  mockInputJson = JSON.stringify(
    {
      ticketId: 'TCK-88210',
      customer: 'alex.rivera@enterprise.io',
      channel: 'email',
      message:
        'We encountered an HTTP 504 Gateway Timeout while syncing our CRM webhooks during high throughput yesterday at 14:00 UTC.',
    },
    null,
    2
  )

  getNodeTypeBadgeClass(type: string): string {
    switch (type) {
      case 'trigger': return 'bg-sky-500/10 text-sky-600 border border-sky-200 dark:border-sky-800'
      case 'rag': return 'bg-violet-500/10 text-violet-600 border border-violet-200 dark:border-violet-800'
      case 'llm': return 'bg-amber-500/10 text-amber-600 border border-amber-200 dark:border-amber-800'
      case 'guardrail': return 'bg-emerald-500/10 text-emerald-600 border border-emerald-200 dark:border-emerald-800'
      case 'action': return 'bg-rose-500/10 text-rose-600 border border-rose-200 dark:border-rose-800'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  selectPreset(preset: WorkflowPreset): void {
    this.activePreset.set(preset)
    toast.success(`Loaded workflow: ${preset.title}`)
  }

  openNodeConfig(node: WorkflowNode): void {
    this.selectedNode.set(node)
    this.nodeConfigOpen.set(true)
  }

  saveNodeConfig(): void {
    toast.success(`Node "${this.selectedNode()?.name}" configuration updated.`)
    this.nodeConfigOpen.set(false)
  }

  savePipeline(): void {
    toast.success('AI Workflow pipeline deployed to production cluster successfully.')
  }

  openTestRunner(): void {
    this.testRunnerOpen.set(true)
  }

  resetMockInput(): void {
    this.mockInputJson = JSON.stringify(
      {
        ticketId: 'TCK-88210',
        customer: 'alex.rivera@enterprise.io',
        channel: 'email',
        message:
          'We encountered an HTTP 504 Gateway Timeout while syncing our CRM webhooks during high throughput yesterday at 14:00 UTC.',
      },
      null,
      2
    )
  }

  runSimulation(): void {
    this.simulating.set(true)
    this.simulationLogs.set([])

    setTimeout(() => {
      this.simulationLogs.set([
        {
          step: 1,
          name: 'Webhook Trigger',
          time: 14,
          message: 'Received payload (184 bytes). Validated schema headers.',
        },
      ])
    }, 400)

    setTimeout(() => {
      this.simulationLogs.update((logs) => [
        ...logs,
        {
          step: 2,
          name: 'Knowledge Base RAG',
          time: 92,
          message: 'Matched 3 relevant articles (Doc #412: Webhook Latency Limits, Doc #108: 504 Handling). Similarity score: 0.94.',
        },
      ])
    }, 900)

    setTimeout(() => {
      this.simulationLogs.update((logs) => [
        ...logs,
        {
          step: 3,
          name: 'LLM Intent Resolver',
          time: 215,
          message: 'Intent: "Infrastructure Timeout / High Load". Urgency: "High". Resolution draft generated (148 tokens).',
        },
      ])
    }, 1500)

    setTimeout(() => {
      this.simulationLogs.update((logs) => [
        ...logs,
        {
          step: 4,
          name: 'Safety Guardrail',
          time: 31,
          message: 'Zero PII violations detected. Output complies with Enterprise SLA policy.',
        },
        {
          step: 5,
          name: 'Dispatch & Alert',
          time: 48,
          message: 'Routed to #eng-infrastructure queue. Ticket status updated to In Progress.',
        },
      ])
      this.simulating.set(false)
      toast.success('Simulation completed with 0 errors (Total latency: 400ms).')
    }, 2100)
  }
}
