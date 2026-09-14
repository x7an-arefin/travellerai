import { Component, signal, computed, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideHeadphones,
  lucideLifeBuoy,
  lucideSearch,
  lucidePlus,
  lucideClock,
  lucideCheck,
  lucideAlertCircle,
  lucideMessageSquare,
  lucideSend,
  lucideUser,
  lucideTag,
  lucideShieldAlert,
  lucideLock,
  lucideExternalLink,
  lucidePaperclip,
  lucideMoreVertical,
  lucideDownload,
  lucidePrinter,
} from '@ng-icons/lucide'
import { ExportService } from '../../core/services/export.service'
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
import { HlmAvatarImports } from '../../ui/avatar/hlm-avatar.components'
import { toast } from 'ngx-sonner'

export type TicketPriority = 'urgent' | 'high' | 'medium' | 'low'
export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'resolved'

export interface SupportTicket {
  id: string
  ticketNumber: string
  subject: string
  customer: { name: string; email: string; tier: string; timezone: string }
  priority: TicketPriority
  status: TicketStatus
  slaRemainingMinutes: number
  assignee: { name: string; avatar: string }
  createdAt: string
  messages: {
    id: string
    sender: 'customer' | 'agent' | 'system'
    senderName: string
    time: string
    body: string
    isInternal?: boolean
  }[]
}

@Component({
  selector: 'app-tickets',
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
    ...HlmAvatarImports,
  ],
  providers: [
    provideIcons({
      lucideHeadphones,
      lucideLifeBuoy,
      lucideSearch,
      lucidePlus,
      lucideClock,
      lucideCheck,
      lucideAlertCircle,
      lucideMessageSquare,
      lucideSend,
      lucideUser,
      lucideTag,
      lucideShieldAlert,
      lucideLock,
      lucideExternalLink,
      lucidePaperclip,
      lucideMoreVertical,
      lucideDownload,
      lucidePrinter,
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
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Support Desk & SLA Manager</h1>
          <p class="text-xs text-muted-foreground">Triage customer tickets, monitor first-response SLA deadlines, and draft solutions.</p>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="exportTicketsCsv()"
            class="gap-1.5 cursor-pointer h-9 shadow-xs"
          >
            <ng-icon name="lucideDownload" class="size-3.5" />
            <span>Export CSV</span>
          </button>

          <button hlmBtn size="sm" (click)="openCreateDrawer()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Create Ticket</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Active Support Queue</span>
          <div class="text-2xl font-bold text-foreground">{{ openTicketsCount() }} Open</div>
          <p class="text-[11px] text-sky-500 font-semibold">4 assigned to you</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Avg First Response</span>
          <div class="text-2xl font-bold text-foreground">14 min</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Well within 1-hour SLA</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">SLA Compliance Rate</span>
          <div class="text-2xl font-bold text-emerald-600">98.6%</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+1.2% this month</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">CSAT Score</span>
          <div class="text-2xl font-bold text-foreground">4.9 / 5.0</div>
          <p class="text-[11px] text-emerald-600 font-semibold">From 412 survey reviews</p>
        </div>
      </div>

      <!-- Support Desk Split View Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Left Pane: Ticket Feed & Filters (5 Cols) -->
        <div hlmCard class="lg:col-span-5 p-0 overflow-hidden shadow-2xs flex flex-col min-h-[600px]">
          <!-- Filter Controls -->
          <div class="p-3 border-b border-border space-y-2.5">
            <div class="relative">
              <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <input
                type="text"
                [(ngModel)]="searchQuery"
                placeholder="Search ticket #, customer, subject..."
                class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div class="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar">
              @for (tab of statusTabs; track tab.id) {
                <button
                  type="button"
                  (click)="activeStatusTab.set(tab.id)"
                  class="px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer shrink-0"
                  [class.bg-primary]="activeStatusTab() === tab.id"
                  [class.text-primary-foreground]="activeStatusTab() === tab.id"
                  [class.bg-muted]="activeStatusTab() !== tab.id"
                  [class.text-muted-foreground]="activeStatusTab() !== tab.id"
                >
                  {{ tab.label }}
                </button>
              }
            </div>
          </div>

          <!-- Ticket List Items -->
          <div class="divide-y divide-border flex-1 overflow-y-auto max-h-[520px]">
            @for (ticket of filteredTickets(); track ticket.id) {
              <div
                (click)="selectTicket(ticket)"
                class="p-3.5 hover:bg-muted/40 transition-colors cursor-pointer space-y-2"
                [class.bg-muted/60]="selectedTicket()?.id === ticket.id"
                [class.border-l-4]="selectedTicket()?.id === ticket.id"
                [class.border-primary]="selectedTicket()?.id === ticket.id"
              >
                <div class="flex items-center justify-between">
                  <span class="font-mono font-bold text-xs text-foreground">{{ ticket.ticketNumber }}</span>
                  <span
                    class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border"
                    [ngClass]="getSlaBadgeClass(ticket.slaRemainingMinutes)"
                  >
                    <ng-icon name="lucideClock" class="size-3" />
                    {{ formatSla(ticket.slaRemainingMinutes) }}
                  </span>
                </div>

                <h4 class="font-bold text-xs text-foreground line-clamp-1">{{ ticket.subject }}</h4>

                <div class="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{{ ticket.customer.name }} ({{ ticket.customer.tier }})</span>
                  <span
                    class="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase"
                    [ngClass]="getPriorityBadgeClass(ticket.priority)"
                  >
                    {{ ticket.priority }}
                  </span>
                </div>
              </div>
            }

            @if (filteredTickets().length === 0) {
              <div class="py-12 text-center text-xs text-muted-foreground">
                No support tickets found matching this filter.
              </div>
            }
          </div>
        </div>

        <!-- Right Pane: Active Ticket Thread (7 Cols) -->
        <div hlmCard class="lg:col-span-7 p-0 overflow-hidden shadow-2xs flex flex-col min-h-[600px]">
          @if (selectedTicket(); as t) {
            <!-- Ticket Thread Header -->
            <div class="p-4 border-b border-border flex items-center justify-between bg-muted/20">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-bold text-sm text-foreground">{{ t.ticketNumber }}: {{ t.subject }}</h3>
                  <span
                    class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase border"
                    [ngClass]="getStatusBadgeClass(t.status)"
                  >
                    {{ formatStatus(t.status) }}
                  </span>
                </div>
                <p class="text-xs text-muted-foreground mt-0.5">
                  Opened by {{ t.customer.name }} ({{ t.customer.email }}) • {{ t.createdAt }}
                </p>
              </div>

              <div class="flex items-center gap-2">
                <button
                  hlmBtn
                  variant="outline"
                  size="sm"
                  (click)="printTicketThread()"
                  class="h-8 text-xs cursor-pointer gap-1"
                >
                  <ng-icon name="lucidePrinter" class="size-3.5" />
                  <span>Print</span>
                </button>

                <button
                  hlmBtn
                  variant="outline"
                  size="sm"
                  (click)="markResolved(t)"
                  class="h-8 text-xs cursor-pointer"
                >
                  <ng-icon name="lucideCheck" class="size-3.5 text-emerald-600 mr-1" />
                  <span>Resolve</span>
                </button>
              </div>
            </div>

            <!-- Messages Conversation Feed -->
            <div class="p-4 flex-1 overflow-y-auto space-y-4 max-h-[380px] bg-background">
              @for (msg of t.messages; track msg.id) {
                <div
                  class="p-3.5 rounded-xl border space-y-1.5"
                  [class.bg-amber-500/10]="msg.isInternal"
                  [class.border-amber-500/30]="msg.isInternal"
                  [class.bg-muted/30]="!msg.isInternal && msg.sender === 'agent'"
                  [class.bg-card]="!msg.isInternal && msg.sender === 'customer'"
                >
                  <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-foreground">{{ msg.senderName }}</span>
                      @if (msg.isInternal) {
                        <span class="rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1.5 py-0.2 text-[9px] font-bold uppercase">
                          Internal Staff Note
                        </span>
                      }
                    </div>
                    <span class="text-muted-foreground text-[11px]">{{ msg.time }}</span>
                  </div>
                  <p class="text-xs text-foreground leading-relaxed">{{ msg.body }}</p>
                </div>
              }
            </div>

            <!-- Composer Box -->
            <div class="p-4 border-t border-border bg-card space-y-3">
              <!-- Mode switcher: Public reply vs Internal Note -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    (click)="isInternalNote.set(false)"
                    class="px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors"
                    [class.bg-primary]="!isInternalNote()"
                    [class.text-primary-foreground]="!isInternalNote()"
                    [class.text-muted-foreground]="isInternalNote()"
                  >
                    Public Reply
                  </button>
                  <button
                    type="button"
                    (click)="isInternalNote.set(true)"
                    class="px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors"
                    [class.bg-amber-500]="isInternalNote()"
                    [class.text-white]="isInternalNote()"
                    [class.text-muted-foreground]="!isInternalNote()"
                  >
                    Internal Note
                  </button>
                </div>

                <span class="text-[11px] text-muted-foreground">
                  {{ isInternalNote() ? 'Visible to agents only' : 'Sent to customer email' }}
                </span>
              </div>

              <!-- Message Input -->
              <div class="relative">
                <textarea
                  rows="3"
                  [(ngModel)]="replyMessage"
                  [placeholder]="isInternalNote() ? 'Add private note for colleagues...' : 'Type response to customer...'"
                  class="w-full rounded-md border border-input bg-background p-2.5 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                ></textarea>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <button
                    type="button"
                    (click)="insertMacro('We have resolved this issue in our latest deploy.')"
                    class="px-2 py-1 rounded text-[10px] border border-border hover:bg-muted text-muted-foreground cursor-pointer"
                  >
                    + Macro: Resolved
                  </button>
                  <button
                    type="button"
                    (click)="insertMacro('Could you please verify if the issue persists on your end?')"
                    class="px-2 py-1 rounded text-[10px] border border-border hover:bg-muted text-muted-foreground cursor-pointer"
                  >
                    + Macro: Verify
                  </button>
                </div>

                <button hlmBtn size="sm" (click)="sendReply(t)" class="gap-1.5 cursor-pointer">
                  <ng-icon name="lucideSend" class="size-3.5" />
                  <span>{{ isInternalNote() ? 'Post Internal Note' : 'Send Reply' }}</span>
                </button>
              </div>
            </div>
          } @else {
            <div class="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground space-y-2">
              <ng-icon name="lucideLifeBuoy" class="size-10 opacity-40" />
              <p class="text-sm font-semibold">Select a ticket from the left queue to view thread</p>
            </div>
          }
        </div>
      </div>
    </app-main>

    <!-- Create Ticket Sheet (size="md" = 1/2 screen width) -->
    <hlm-sheet [isOpen]="createDrawerOpen()" position="right" [size]="'md'" (closed)="createDrawerOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Create Support Desk Ticket</h3>
        <p hlmSheetDescription class="text-xs">Log a new inbound customer request or report a platform issue.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Customer Email</label>
          <input
            type="email"
            [(ngModel)]="newTicket.email"
            placeholder="client@organization.com"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Subject Title</label>
          <input
            type="text"
            [(ngModel)]="newTicket.subject"
            placeholder="e.g. SSO Authentication Error via Okta SAML"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Urgency Priority</label>
            <hlm-custom-select
              [options]="priorityOptions"
              [ngModel]="newTicket.priority"
              (valueChange)="newTicket.priority = $event"
              placeholder="Select Priority"
            />
          </div>
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Assigned Agent</label>
            <hlm-custom-select
              [options]="assigneeOptions"
              [ngModel]="newTicket.assignee"
              (valueChange)="newTicket.assignee = $event"
              placeholder="Select Assignee"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Ticket Description & Context</label>
          <textarea
            rows="5"
            [(ngModel)]="newTicket.description"
            placeholder="Describe the issue details, error logs, and reproduction steps..."
            class="w-full rounded-md border border-input bg-background p-2.5 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          ></textarea>
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="createDrawerOpen.set(false)" class="cursor-pointer text-xs">
          Cancel
        </button>
        <button hlmBtn (click)="saveNewTicket()" class="cursor-pointer text-xs">
          Create Ticket
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class TicketsComponent {
  readonly createDrawerOpen = signal<boolean>(false)
  readonly activeStatusTab = signal<string>('all')
  readonly isInternalNote = signal<boolean>(false)
  searchQuery = ''
  replyMessage = ''

  readonly newTicket = {
    email: '',
    subject: '',
    priority: 'high' as TicketPriority,
    assignee: 'Sarah Jenkins',
    description: '',
  }

  readonly statusTabs = [
    { id: 'all', label: 'All Tickets' },
    { id: 'open', label: 'Open' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'waiting', label: 'Waiting' },
    { id: 'resolved', label: 'Resolved' },
  ]

  readonly priorityOptions: readonly SelectOption[] = [
    { label: 'Urgent (15m SLA)', value: 'urgent' },
    { label: 'High (1h SLA)', value: 'high' },
    { label: 'Medium (4h SLA)', value: 'medium' },
    { label: 'Low (24h SLA)', value: 'low' },
  ]

  readonly assigneeOptions: readonly SelectOption[] = [
    { label: 'Sarah Jenkins (Lead)', value: 'Sarah Jenkins' },
    { label: 'Michael Chang (Tier 2)', value: 'Michael Chang' },
    { label: 'Alex Rivera (DevOps)', value: 'Alex Rivera' },
  ]

  readonly tickets = signal<SupportTicket[]>([
    {
      id: 'tck-1',
      ticketNumber: '#TCK-9810',
      subject: 'Webhook 504 Timeout during batch sync',
      customer: { name: 'David Miller', email: 'david@enterprise.io', tier: 'Enterprise SLA', timezone: 'UTC-5 (EST)' },
      priority: 'urgent',
      status: 'in_progress',
      slaRemainingMinutes: 24,
      assignee: { name: 'Sarah Jenkins', avatar: '' },
      createdAt: '42 mins ago',
      messages: [
        {
          id: 'm-1',
          sender: 'customer',
          senderName: 'David Miller',
          time: '42 mins ago',
          body: 'We are experiencing 504 Gateway Timeouts when our webhook endpoint receives more than 500 events per minute. Can you assist?',
        },
        {
          id: 'm-2',
          sender: 'agent',
          senderName: 'Sarah Jenkins',
          time: '28 mins ago',
          body: 'We are inspecting our load balancer ingress logs right now. Our engineering team is testing an auto-scale buffer rule.',
        },
      ],
    },
    {
      id: 'tck-2',
      ticketNumber: '#TCK-9809',
      subject: 'SAML Single Sign-On certificate rollover',
      customer: { name: 'Elena Rostova', email: 'elena@biotechcorp.com', tier: 'Pro Plan', timezone: 'UTC+1 (CET)' },
      priority: 'high',
      status: 'open',
      slaRemainingMinutes: 52,
      assignee: { name: 'Michael Chang', avatar: '' },
      createdAt: '1 hour ago',
      messages: [
        {
          id: 'm-3',
          sender: 'customer',
          senderName: 'Elena Rostova',
          time: '1 hour ago',
          body: 'Our Okta identity certificate expires next week. Where do we upload the new X.509 certificate pem string in settings?',
        },
      ],
    },
    {
      id: 'tck-3',
      ticketNumber: '#TCK-9808',
      subject: 'Custom domain DNS verification pending',
      customer: { name: 'Marcus Aurelius', email: 'marcus@designlabs.co', tier: 'Starter', timezone: 'UTC-8 (PST)' },
      priority: 'medium',
      status: 'waiting',
      slaRemainingMinutes: 180,
      assignee: { name: 'Alex Rivera', avatar: '' },
      createdAt: '3 hours ago',
      messages: [
        {
          id: 'm-4',
          sender: 'agent',
          senderName: 'Alex Rivera',
          time: '2 hours ago',
          body: 'Your CNAME record has been propagated. Please refresh your custom domain tab in Display Settings.',
        },
      ],
    },
  ])

  readonly selectedTicket = signal<SupportTicket | null>(this.tickets()[0])

  readonly filteredTickets = computed(() => {
    const q = this.searchQuery.toLowerCase().trim()
    const tab = this.activeStatusTab()

    return this.tickets().filter((t) => {
      const matchesQ =
        !q ||
        t.ticketNumber.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.customer.name.toLowerCase().includes(q)

      const matchesTab = tab === 'all' || t.status === tab
      return matchesQ && matchesTab
    })
  })

  readonly openTicketsCount = computed(() => {
    return this.tickets().filter((t) => t.status !== 'resolved').length
  })

  selectTicket(ticket: SupportTicket): void {
    this.selectedTicket.set(ticket)
  }

  formatSla(mins: number): string {
    if (mins <= 0) return 'Breached'
    if (mins < 60) return `${mins}m left`
    const hours = Math.floor(mins / 60)
    return `${hours}h left`
  }

  getSlaBadgeClass(mins: number): string {
    if (mins <= 30) return 'bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-800 animate-pulse'
    if (mins <= 90) return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800'
    return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800'
  }

  getPriorityBadgeClass(p: TicketPriority): string {
    switch (p) {
      case 'urgent': return 'bg-rose-500/10 text-rose-600 border border-rose-200 dark:border-rose-800'
      case 'high': return 'bg-amber-500/10 text-amber-600 border border-amber-200 dark:border-amber-800'
      case 'medium': return 'bg-sky-500/10 text-sky-600 border border-sky-200 dark:border-sky-800'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  getStatusBadgeClass(s: TicketStatus): string {
    switch (s) {
      case 'resolved': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800'
      case 'in_progress': return 'bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-800'
      case 'waiting': return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800'
      default: return 'bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-800'
    }
  }

  formatStatus(status: string): string {
    return status.replace(/_/g, ' ')
  }

  insertMacro(text: string): void {
    this.replyMessage = text
  }

  sendReply(ticket: SupportTicket): void {
    if (!this.replyMessage.trim()) return

    const newMsg = {
      id: 'm-' + (ticket.messages.length + 1),
      sender: 'agent' as const,
      senderName: 'Sarah Jenkins',
      time: 'Just now',
      body: this.replyMessage.trim(),
      isInternal: this.isInternalNote(),
    }

    const updated = this.tickets().map((t) =>
      t.id === ticket.id ? { ...t, messages: [...t.messages, newMsg] } : t
    )

    this.tickets.set(updated)
    this.selectedTicket.update((t) => (t ? { ...t, messages: [...t.messages, newMsg] } : null))
    this.replyMessage = ''
    toast.success(this.isInternalNote() ? 'Internal note posted.' : 'Reply sent to customer.')
  }

  markResolved(ticket: SupportTicket): void {
    this.tickets.update((list) =>
      list.map((t) => (t.id === ticket.id ? { ...t, status: 'resolved' } : t))
    )
    this.selectedTicket.update((t) => (t ? { ...t, status: 'resolved' } : null))
    toast.success(`Ticket ${ticket.ticketNumber} marked as Resolved.`)
  }

  openCreateDrawer(): void {
    this.newTicket.email = ''
    this.newTicket.subject = ''
    this.newTicket.description = ''
    this.createDrawerOpen.set(true)
  }

  saveNewTicket(): void {
    if (!this.newTicket.email || !this.newTicket.subject) {
      toast.error('Please enter customer email and ticket subject.')
      return
    }

    const ticket: SupportTicket = {
      id: 'tck-' + (this.tickets().length + 1),
      ticketNumber: '#TCK-98' + (11 + this.tickets().length),
      subject: this.newTicket.subject,
      customer: {
        name: this.newTicket.email.split('@')[0],
        email: this.newTicket.email,
        tier: 'Enterprise SLA',
        timezone: 'UTC',
      },
      priority: this.newTicket.priority,
      status: 'open',
      slaRemainingMinutes: 60,
      assignee: { name: this.newTicket.assignee, avatar: '' },
      createdAt: 'Just now',
      messages: [
        {
          id: 'm-init',
          sender: 'customer',
          senderName: this.newTicket.email.split('@')[0],
          time: 'Just now',
          body: this.newTicket.description || 'No initial details provided.',
        },
      ],
    }

    this.tickets.update((list) => [ticket, ...list])
    this.selectedTicket.set(ticket)
    toast.success(`Created ticket ${ticket.ticketNumber}.`)
    this.createDrawerOpen.set(false)
  }

  private readonly exportService = inject(ExportService)

  exportTicketsCsv(): void {
    const data = this.filteredTickets().map((t) => ({
      ticketNumber: t.ticketNumber,
      subject: t.subject,
      customerName: t.customer.name,
      customerEmail: t.customer.email,
      tier: t.customer.tier,
      priority: t.priority,
      status: t.status,
      slaMinutesLeft: t.slaRemainingMinutes,
      assignee: t.assignee.name,
      createdAt: t.createdAt,
      messageCount: t.messages.length,
    }))
    this.exportService.exportToCsv('support-desk-sla-tickets.csv', data)
  }

  printTicketThread(): void {
    const t = this.selectedTicket()
    if (!t) return

    const messagesHtml = t.messages
      .map(
        (m) => `
      <div style="margin-bottom:12px; padding:10px; border:1px solid #e2e8f0; border-radius:6px; background:${
        m.isInternal ? '#fef3c7' : '#f8fafc'
      }">
        <div style="font-weight:600; font-size:12px; margin-bottom:4px; display:flex; justify-content:space-between;">
          <span>
            ${m.senderName} (${m.sender})
            ${
              m.isInternal
                ? '<span style="color:#d97706; font-size:10px; font-weight:700; margin-left:8px; background:#fde68a; padding:2px 6px; border-radius:4px;">INTERNAL STAFF NOTE</span>'
                : ''
            }
          </span>
          <span style="color:#64748b; font-size:11px;">${m.time}</span>
        </div>
        <div style="font-size:13px; line-height:1.5; color:#1e293b;">${m.body}</div>
      </div>
    `,
      )
      .join('')

    this.exportService.printDocument({
      title: `Support Ticket: ${t.ticketNumber}`,
      subtitle: `${t.subject} | Status: ${t.status.toUpperCase()} | Priority: ${t.priority.toUpperCase()}`,
      meta: [
        { label: 'Customer', value: `${t.customer.name} (${t.customer.email})` },
        { label: 'SLA Tier', value: t.customer.tier },
        { label: 'Assignee', value: t.assignee.name },
        { label: 'Created', value: t.createdAt },
        { label: 'SLA Remaining', value: `${t.slaRemainingMinutes} min` },
      ],
      bodyHtml: `
        <div style="margin-top: 16px;">
          <h3 style="font-size:14px; font-weight:700; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">Conversation History & SLA Audit</h3>
          ${messagesHtml}
        </div>
      `,
    })
  }
}
