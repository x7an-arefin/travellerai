import { Component, OnInit, inject, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowLeft,
  lucideWrench,
  lucideAlertTriangle,
  lucideCheckCircle2,
  lucideClock,
  lucidePlus,
  lucideCamera,
  lucideUserCheck,
  lucideBuilding,
  lucideFilter,
  lucideX,
  lucideShieldAlert,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmInputImports } from '../../../ui/input/hlm-input.directive'
import { toast } from 'ngx-sonner'

export interface MaintenanceTicket {
  id: string
  ticketNumber: string
  roomNumber: string
  propertyId: string
  category: 'plumbing' | 'electrical' | 'hvac' | 'furniture' | 'fixtures' | 'amenity'
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'open' | 'assigned' | 'in_progress' | 'resolved'
  description: string
  photoUrl?: string
  reportedBy: string
  assignedTechnician?: string
  reportedAt: string
  resolvedAt?: string
  isChronicRoom?: boolean
}

@Component({
  selector: 'app-hotel-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    TopNavComponent,
    SearchComponent,
    ThemeSwitchComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmInputImports,
  ],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideWrench,
      lucideAlertTriangle,
      lucideCheckCircle2,
      lucideClock,
      lucidePlus,
      lucideCamera,
      lucideUserCheck,
      lucideBuilding,
      lucideFilter,
      lucideX,
      lucideShieldAlert,
    }),
  ],
  template: `
    <app-header [fixed]="true">
      <app-top-nav class="mr-auto" />
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <app-main>
      <!-- Page Header -->
      <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <button
            hlmBtn
            variant="ghost"
            size="icon"
            routerLink="/hotels"
            class="size-9 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ng-icon name="lucideArrowLeft" class="size-4" />
          </button>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold tracking-tight text-foreground">Room Maintenance & Housekeeping Tickets</h1>
              <span hlmBadge variant="outline" class="text-xs">
                {{ tickets().length }} Total Tickets
              </span>
              @if (criticalCount() > 0) {
                <span hlmBadge variant="destructive" class="text-xs">
                  {{ criticalCount() }} Critical Escalations
                </span>
              }
            </div>
            <p class="text-xs text-muted-foreground mt-0.5">
              Rapid incident resolution, chronic issue tracking, and photo verification for front desk room clearance.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="default"
            size="sm"
            class="gap-1.5 cursor-pointer shadow-xs"
            (click)="isCreateModalOpen.set(true)"
          >
            <ng-icon name="lucidePlus" class="size-4" />
            <span>Log Maintenance Ticket</span>
          </button>
        </div>
      </div>

      <!-- Chronic Issue Alert Banner -->
      <div class="mb-5 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="size-9 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <ng-icon name="lucideShieldAlert" class="size-5" />
          </div>
          <div>
            <h4 class="text-xs font-bold text-foreground">Chronic Room Alert: Room 402 Flagged</h4>
            <p class="text-[11px] text-muted-foreground">
              Room 402 has generated 3 tickets in the last 30 days (HVAC & plumbing). Supervisor audit recommended prior to next check-in.
            </p>
          </div>
        </div>
        <button hlmBtn variant="outline" size="sm" class="text-xs cursor-pointer" (click)="filterChronic()">
          View Room 402 Log
        </button>
      </div>

      <!-- Severity Filter Tabs -->
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/40">
          <button
            type="button"
            (click)="selectedSeverity.set('all')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedSeverity() === 'all'"
            [class.shadow-2xs]="selectedSeverity() === 'all'"
            [class.text-foreground]="selectedSeverity() === 'all'"
            [class.text-muted-foreground]="selectedSeverity() !== 'all'"
          >
            All Severities
          </button>
          <button
            type="button"
            (click)="selectedSeverity.set('critical')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer text-rose-500"
            [class.bg-background]="selectedSeverity() === 'critical'"
            [class.shadow-2xs]="selectedSeverity() === 'critical'"
          >
            Critical
          </button>
          <button
            type="button"
            (click)="selectedSeverity.set('high')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer text-amber-500"
            [class.bg-background]="selectedSeverity() === 'high'"
            [class.shadow-2xs]="selectedSeverity() === 'high'"
          >
            High
          </button>
          <button
            type="button"
            (click)="selectedSeverity.set('medium')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedSeverity() === 'medium'"
            [class.shadow-2xs]="selectedSeverity() === 'medium'"
          >
            Medium
          </button>
        </div>
      </div>

      <!-- Tickets Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (t of filteredTickets(); track t.id) {
          <div hlmCard class="p-5 bg-card border border-border/60 rounded-xl space-y-3 shadow-xs">
            <div class="flex items-start justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-sm text-foreground">Room {{ t.roomNumber }}</span>
                  @if (t.isChronicRoom) {
                    <span hlmBadge variant="destructive" class="text-[9px] px-1 py-0">Chronic</span>
                  }
                </div>
                <span class="font-mono text-[10px] text-muted-foreground">{{ t.ticketNumber }}</span>
              </div>

              @if (t.severity === 'critical') {
                <span hlmBadge variant="destructive" class="text-[10px] uppercase font-bold">Critical</span>
              } @else if (t.severity === 'high') {
                <span hlmBadge variant="outline" class="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 border-amber-500/40">High</span>
              } @else {
                <span hlmBadge variant="secondary" class="text-[10px] uppercase font-bold">{{ t.severity }}</span>
              }
            </div>

            <p class="text-xs text-muted-foreground">{{ t.description }}</p>

            <div class="p-2.5 rounded-lg bg-muted/40 border border-border/30 text-[11px] space-y-1">
              <div class="flex items-center justify-between text-muted-foreground">
                <span>Category: <strong class="text-foreground capitalize">{{ t.category }}</strong></span>
                <span>Assigned: <strong class="text-foreground">{{ t.assignedTechnician || 'Unassigned' }}</strong></span>
              </div>
              <div class="text-[10px] text-muted-foreground flex items-center justify-between pt-1 border-t border-border/20">
                <span>Reported by: {{ t.reportedBy }}</span>
                <span>{{ t.reportedAt }}</span>
              </div>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-border/30">
              @if (t.status === 'resolved') {
                <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  Resolved & Inspected
                </span>
              } @else {
                <button
                  hlmBtn
                  variant="default"
                  size="sm"
                  class="h-7 text-xs gap-1 cursor-pointer w-full"
                  (click)="resolveTicket(t)"
                >
                  <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  <span>Mark Fixed & Inspect Room</span>
                </button>
              }
            </div>
          </div>
        }
      </div>

      <!-- Log Ticket Modal -->
      @if (isCreateModalOpen()) {
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="bg-card border border-border rounded-xl p-6 max-w-md w-full shadow-lg space-y-4 animate-in fade-in-0 zoom-in-95">
            <div class="flex items-center justify-between pb-2 border-b border-border/40">
              <h3 class="text-base font-bold text-foreground">Log New Maintenance Ticket</h3>
              <button hlmBtn variant="ghost" size="icon" (click)="isCreateModalOpen.set(false)">
                <ng-icon name="lucideX" class="size-4" />
              </button>
            </div>

            <div class="space-y-3 text-xs">
              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-1">
                  <label class="font-medium text-foreground">Room Number *</label>
                  <input hlmInput [(ngModel)]="newTicket.roomNumber" placeholder="e.g. 402" class="w-full text-xs" />
                </div>
                <div class="space-y-1">
                  <label class="font-medium text-foreground">Category *</label>
                  <select [(ngModel)]="newTicket.category" class="w-full px-3 py-2 rounded-md border border-border bg-background text-xs">
                    <option value="plumbing">Plumbing (Drain, Pipe, Flush)</option>
                    <option value="hvac">HVAC (AC, Heater, Ventilation)</option>
                    <option value="electrical">Electrical (Lighting, Outlets)</option>
                    <option value="fixtures">Bathroom Fixtures</option>
                    <option value="furniture">Furniture / Bedding</option>
                  </select>
                </div>
              </div>

              <div class="space-y-1">
                <label class="font-medium text-foreground">Severity Level *</label>
                <select [(ngModel)]="newTicket.severity" class="w-full px-3 py-2 rounded-md border border-border bg-background text-xs">
                  <option value="critical">Critical (Room Out of Order - Immediate)</option>
                  <option value="high">High (Affects Guest Stay)</option>
                  <option value="medium">Medium (Turnover Inspection)</option>
                  <option value="low">Low (Cosmetic / Preventive)</option>
                </select>
              </div>

              <div class="space-y-1">
                <label class="font-medium text-foreground">Issue Description *</label>
                <textarea
                  [(ngModel)]="newTicket.description"
                  rows="3"
                  class="w-full p-2.5 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Provide precise details for maintenance technician..."
                ></textarea>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
              <button hlmBtn variant="outline" size="sm" (click)="isCreateModalOpen.set(false)">
                Cancel
              </button>
              <button hlmBtn variant="default" size="sm" (click)="confirmCreateTicket()">
                Submit Maintenance Ticket
              </button>
            </div>
          </div>
        </div>
      }
    </app-main>
  `,
})
export class HotelMaintenanceComponent implements OnInit {
  readonly isCreateModalOpen = signal(false)
  readonly selectedSeverity = signal<'all' | 'critical' | 'high' | 'medium'>('all')

  readonly tickets = signal<MaintenanceTicket[]>([
    {
      id: 't-1',
      ticketNumber: 'TKT-2026-081',
      roomNumber: '402',
      propertyId: 'prop-1',
      category: 'hvac',
      severity: 'critical',
      status: 'in_progress',
      description: 'Air conditioning unit leaking water onto carpet; thermostat sensor unresponsive.',
      reportedBy: 'Maria Gomez (Housekeeping)',
      assignedTechnician: 'Hans Mueller (Senior HVAC)',
      reportedAt: 'Today, 10:15 AM',
      isChronicRoom: true,
    },
    {
      id: 't-2',
      ticketNumber: 'TKT-2026-082',
      roomNumber: '305',
      propertyId: 'prop-1',
      category: 'plumbing',
      severity: 'high',
      status: 'assigned',
      description: 'Shower drain slow draining; rainwater showerhead requires descaling.',
      reportedBy: 'Klaus Schmidt (Front Desk)',
      assignedTechnician: 'Lukas Meier (Plumbing)',
      reportedAt: 'Today, 11:30 AM',
      isChronicRoom: false,
    },
    {
      id: 't-3',
      ticketNumber: 'TKT-2026-083',
      roomNumber: '210',
      propertyId: 'prop-1',
      category: 'electrical',
      severity: 'medium',
      status: 'open',
      description: 'Bedside reading lamp bulb blown; USB charging port on nightstand loose.',
      reportedBy: 'Maria Gomez (Housekeeping)',
      reportedAt: 'Yesterday, 4:00 PM',
      isChronicRoom: false,
    },
  ])

  readonly newTicket: Partial<MaintenanceTicket> = {
    roomNumber: '',
    category: 'plumbing',
    severity: 'medium',
    description: '',
  }

  readonly filteredTickets = computed(() => {
    const list = this.tickets()
    const sev = this.selectedSeverity()
    if (sev === 'all') return list
    return list.filter((t) => t.severity === sev)
  })

  readonly criticalCount = computed(() => this.tickets().filter((t) => t.severity === 'critical').length)

  ngOnInit(): void {}

  filterChronic(): void {
    this.selectedSeverity.set('all')
    toast.info('Filtered Chronic Issues', {
      description: 'Showing chronic maintenance history for Room 402.',
    })
  }

  resolveTicket(t: MaintenanceTicket): void {
    t.status = 'resolved'
    toast.success('Ticket Resolved', {
      description: `Room ${t.roomNumber} marked repaired. Housekeeper dispatched for final inspection.`,
    })
  }

  confirmCreateTicket(): void {
    if (!this.newTicket.roomNumber || !this.newTicket.description) {
      toast.error('Validation Error', { description: 'Room number and description are required.' })
      return
    }

    const item: MaintenanceTicket = {
      id: `t-${Date.now()}`,
      ticketNumber: `TKT-2026-0${Math.floor(100 + Math.random() * 900)}`,
      roomNumber: this.newTicket.roomNumber!,
      propertyId: 'prop-1',
      category: this.newTicket.category as any,
      severity: this.newTicket.severity as any,
      status: 'assigned',
      description: this.newTicket.description!,
      reportedBy: 'Duty Manager (Front Desk)',
      assignedTechnician: 'Duty Engineer',
      reportedAt: 'Just now',
    }

    this.tickets.update((prev) => [item, ...prev])
    this.isCreateModalOpen.set(false)
    toast.success('Ticket Dispatched', {
      description: `Technician alerted for Room ${item.roomNumber}. Room marked out-of-order until clearance.`,
    })
  }
}
