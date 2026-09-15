import { Component, signal, computed, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideNetwork,
  lucideUsers,
  lucideBuilding,
  lucideSearch,
  lucidePlus,
  lucideMail,
  lucidePhone,
  lucideMapPin,
  lucideCheck,
  lucideArrowRight,
  lucideDownload,
  lucideBriefcase,
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
import { HlmSelectImports, SelectOption } from '../../ui/select/hlm-select.components'
import { toast } from 'ngx-sonner'
import { OrganizationApiService, EmployeeNode, OrgOverviewStats } from './data-access'

@Component({
  selector: 'app-organization',
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
      lucideNetwork,
      lucideUsers,
      lucideBuilding,
      lucideSearch,
      lucidePlus,
      lucideMail,
      lucidePhone,
      lucideMapPin,
      lucideCheck,
      lucideArrowRight,
      lucideDownload,
      lucideBriefcase,
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
      <!-- Title & Action Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Organization Hierarchy & Staff Directory</h1>
          <p class="text-xs text-muted-foreground">Interactive reporting chain, departmental structures, and operator staff directory.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="exportDirectory()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
            <span>Export Org Data</span>
          </button>
          <button hlmBtn size="sm" (click)="openAddMemberDrawer()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Add Team Member</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Total Headcount</span>
          <div class="text-2xl font-bold text-foreground">{{ stats().totalHeadcount }} Employees</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+8 hires this quarter</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Active Departments</span>
          <div class="text-2xl font-bold text-foreground">{{ stats().activeDepartments }} Business Units</div>
          <p class="text-[11px] text-sky-500 font-semibold">Engineering & Ops are largest</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Remote Distribution</span>
          <div class="text-2xl font-bold text-foreground">{{ stats().remotePercentage }}% Remote</div>
          <p class="text-[11px] text-muted-foreground">Across 8 global timezones</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Retention Rate</span>
          <div class="text-2xl font-bold text-emerald-600">{{ stats().retentionRate }}%</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Industry leading</p>
        </div>
      </div>

      <!-- Filter Controls -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2 flex-wrap">
          <div class="relative w-full sm:w-64">
            <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Search by name, role, email..."
              class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div class="w-44">
            <hlm-custom-select
              [options]="departmentOptions"
              [ngModel]="selectedDept()"
              (valueChange)="selectedDept.set($event)"
              placeholder="All Departments"
            />
          </div>
        </div>

        <div class="flex items-center gap-1.5">
          <span class="text-xs text-muted-foreground">Showing {{ filteredEmployees().length }} members</span>
        </div>
      </div>

      <!-- Visual Hierarchy Node Grid -->
      <div class="space-y-6">
        <!-- Tier 1: Executive Leadership -->
        <div class="space-y-2">
          <div class="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <span class="size-2 rounded-full bg-primary"></span>
            <span>Executive Leadership</span>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (emp of getLeadership(); track emp.id) {
              <div
                (click)="openProfileDrawer(emp)"
                class="rounded-xl border border-primary/40 bg-card p-4 shadow-2xs hover:border-primary transition-all cursor-pointer space-y-3 group"
              >
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <div class="size-10 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center">
                      {{ emp.avatarInitials }}
                    </div>
                    <div>
                      <h4 class="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{{ emp.name }}</h4>
                      <p class="text-xs text-muted-foreground font-medium">{{ emp.role }}</p>
                    </div>
                  </div>

                  <span
                    class="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase border"
                    [ngClass]="getStatusBadgeClass(emp.status)"
                  >
                    {{ formatStatus(emp.status) }}
                  </span>
                </div>

                <div class="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{{ emp.location }}</span>
                  <span class="font-bold text-foreground">{{ emp.directReportsCount }} Direct Reports</span>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Tier 2: Department Leads & Senior Team -->
        <div class="space-y-2">
          <div class="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <span class="size-2 rounded-full bg-sky-500"></span>
            <span>Department Leads & Core Contributors</span>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            @for (emp of getDepartmentMembers(); track emp.id) {
              <div
                (click)="openProfileDrawer(emp)"
                class="rounded-xl border border-border bg-card p-4 shadow-2xs hover:border-primary/50 transition-all cursor-pointer space-y-3 group"
              >
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="size-9 rounded-full bg-muted text-foreground font-bold text-xs flex items-center justify-center">
                      {{ emp.avatarInitials }}
                    </div>
                    <div>
                      <h4 class="font-bold text-xs text-foreground group-hover:text-primary transition-colors">{{ emp.name }}</h4>
                      <p class="text-[11px] text-muted-foreground">{{ emp.role }}</p>
                    </div>
                  </div>

                  <span
                    class="rounded-full px-1.5 py-0.2 text-[9px] font-bold uppercase border"
                    [ngClass]="getStatusBadgeClass(emp.status)"
                  >
                    {{ formatStatus(emp.status) }}
                  </span>
                </div>

                <div class="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span hlmBadge variant="outline" class="text-[10px]">{{ emp.department }}</span>
                  <span>{{ emp.location }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </app-main>

    <!-- Employee Profile Inspector Sheet -->
    <hlm-sheet [isOpen]="profileDrawerOpen()" position="right" [size]="'md'" (closed)="profileDrawerOpen.set(false)">
      @if (selectedEmployee(); as emp) {
        <div hlmSheetHeader>
          <div class="flex items-center justify-between">
            <h3 hlmSheetTitle>{{ emp.name }}</h3>
            <span
              class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border"
              [ngClass]="getStatusBadgeClass(emp.status)"
            >
              {{ formatStatus(emp.status) }}
            </span>
          </div>
          <p hlmSheetDescription class="text-xs">{{ emp.role }} • {{ emp.department }}</p>
        </div>

        <div class="space-y-6 py-4 flex-1 overflow-y-auto text-xs">
          <!-- Contact Details Card -->
          <div class="p-4 rounded-xl border border-border bg-muted/20 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Work Email</span>
              <span class="font-mono font-semibold text-foreground">{{ emp.email }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Office Location</span>
              <span class="font-semibold text-foreground">{{ emp.location }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Tenure Start</span>
              <span class="font-semibold text-foreground">{{ emp.startDate }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Compensation Band</span>
              <span class="font-mono font-bold text-emerald-600">{{ emp.compensationTier }}</span>
            </div>
          </div>

          <!-- Reporting Relationship -->
          <div class="space-y-2">
            <h4 class="font-bold text-foreground">Reporting Structure</h4>
            <div class="p-3 rounded-lg border border-border bg-card flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-muted-foreground uppercase">Direct Supervisor</span>
                <p class="font-semibold text-foreground">Executive Board / VP</p>
              </div>
              <span class="text-xs font-mono text-muted-foreground">{{ emp.directReportsCount }} Team Members</span>
            </div>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-end gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="profileDrawerOpen.set(false)" class="cursor-pointer text-xs">
            Close
          </button>
        </div>
      }
    </hlm-sheet>

    <!-- Add Team Member Sheet -->
    <hlm-sheet [isOpen]="addMemberOpen()" position="right" [size]="'sm'" (closed)="addMemberOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Add Team Member</h3>
        <p hlmSheetDescription class="text-xs">Create employee profile and assign organizational reporting lines.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Full Name</label>
          <input
            type="text"
            [(ngModel)]="newMember.name"
            placeholder="e.g. Liam Vance"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Job Title</label>
          <input
            type="text"
            [(ngModel)]="newMember.role"
            placeholder="e.g. Senior Operations Curator"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Department</label>
          <hlm-custom-select
            [options]="formDepartmentOptions"
            [ngModel]="newMember.department"
            (valueChange)="newMember.department = $event"
            placeholder="Select Department"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Work Location</label>
          <input
            type="text"
            [(ngModel)]="newMember.location"
            placeholder="Remote - London, UK"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="addMemberOpen.set(false)" class="cursor-pointer text-xs">
          Cancel
        </button>
        <button hlmBtn (click)="saveMember()" class="cursor-pointer text-xs">
          Add Member
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class OrganizationComponent implements OnInit {
  private readonly orgApi = inject(OrganizationApiService)

  readonly profileDrawerOpen = signal<boolean>(false)
  readonly addMemberOpen = signal<boolean>(false)
  readonly selectedEmployee = signal<EmployeeNode | null>(null)

  searchQuery = ''
  readonly selectedDept = signal<string>('all')

  newMember = {
    name: '',
    role: '',
    department: 'Engineering',
    location: 'Remote',
  }

  readonly departmentOptions: readonly SelectOption[] = [
    { label: 'All Departments', value: 'all' },
    { label: 'Executive', value: 'Executive' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Operations', value: 'Operations' },
    { label: 'Design', value: 'Design' },
    { label: 'Marketing', value: 'Marketing' },
  ]

  readonly formDepartmentOptions: readonly SelectOption[] = [
    { label: 'Executive', value: 'Executive' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Operations', value: 'Operations' },
    { label: 'Design', value: 'Design' },
    { label: 'Marketing', value: 'Marketing' },
  ]

  readonly employees = signal<EmployeeNode[]>([])

  readonly stats = computed<OrgOverviewStats>(() => {
    return this.orgApi.getStats(this.employees())
  })

  readonly filteredEmployees = computed(() => {
    const q = this.searchQuery.toLowerCase().trim()
    const dept = this.selectedDept()

    return this.employees().filter((e) => {
      const matchesQ =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)

      const matchesDept = dept === 'all' || e.department === dept
      return matchesQ && matchesDept
    })
  })

  ngOnInit(): void {
    this.orgApi.listEmployees().subscribe((list) => {
      this.employees.set(list)
    })
  }

  getLeadership(): EmployeeNode[] {
    return this.filteredEmployees().filter((e) => e.department === 'Executive')
  }

  getDepartmentMembers(): EmployeeNode[] {
    return this.filteredEmployees().filter((e) => e.department !== 'Executive')
  }

  formatStatus(status: string): string {
    return status.replace(/_/g, ' ')
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800'
      case 'in_meeting': return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  openProfileDrawer(emp: EmployeeNode): void {
    this.selectedEmployee.set(emp)
    this.profileDrawerOpen.set(true)
  }

  openAddMemberDrawer(): void {
    this.newMember = {
      name: '',
      role: '',
      department: 'Engineering',
      location: 'Remote',
    }
    this.addMemberOpen.set(true)
  }

  saveMember(): void {
    if (!this.newMember.name || !this.newMember.role) {
      toast.error('Please enter employee name and role.')
      return
    }

    this.orgApi.addEmployee({
      name: this.newMember.name,
      role: this.newMember.role,
      department: this.newMember.department,
      location: this.newMember.location,
      email: `${this.newMember.name.toLowerCase().replace(/\s+/g, '.')}@traveller.ai`,
    }).subscribe((item) => {
      this.employees.update((list) => [...list, item])
      toast.success(`Added ${item.name} to organizational directory.`)
      this.addMemberOpen.set(false)
    })
  }

  exportDirectory(): void {
    const list = this.employees()
    if (list.length === 0) {
      toast.error('No employee records to export.')
      return
    }

    const headers = ['ID', 'Name', 'Role', 'Department', 'Email', 'Location', 'Status', 'Compensation']
    const rows = list.map((e) => [
      `"${e.id}"`,
      `"${e.name}"`,
      `"${e.role}"`,
      `"${e.department}"`,
      `"${e.email}"`,
      `"${e.location}"`,
      `"${e.status}"`,
      `"${e.compensationTier}"`,
    ])

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `organization_directory_${Date.now()}.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Organization directory exported to CSV.')
  }
}
