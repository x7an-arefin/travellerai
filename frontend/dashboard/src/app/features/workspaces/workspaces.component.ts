import { Component, signal, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideBuilding2,
  lucideUsers,
  lucidePlus,
  lucideShieldCheck,
  lucideCheck,
  lucideX,
  lucideLayers,
  lucideGlobe,
  lucideLock,
  lucideRefreshCw,
  lucideAlertCircle,
  lucideMail,
  lucidePhone,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { FallbackBannerComponent } from '../../shared/ui/fallback-banner.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmSheetImports } from '../../ui/sheet/hlm-sheet.components'
import { HlmTableImports } from '../../ui/table/hlm-table.components'
import { HlmSelectImports, SelectOption } from '../../ui/select/hlm-select.components'
import { toast } from 'ngx-sonner'
import { WorkspacesApiService, WorkspaceItem, NewWorkspaceDto } from './data-access'
import { ReferenceDataService } from '../../core/services/reference-data.service'

@Component({
  selector: 'app-workspaces',
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
    FallbackBannerComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmSheetImports,
    ...HlmTableImports,
    ...HlmSelectImports,
  ],
  providers: [
    provideIcons({
      lucideBuilding2,
      lucideUsers,
      lucidePlus,
      lucideShieldCheck,
      lucideCheck,
      lucideX,
      lucideLayers,
      lucideGlobe,
      lucideLock,
      lucideRefreshCw,
      lucideAlertCircle,
      lucideMail,
      lucidePhone,
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
      <!-- Dev Fallback Banner -->
      <app-fallback-banner [show]="isFallbackMode()" />

      <!-- Title & Action Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Multi-Tenant Workspaces & RBAC Matrix</h1>
          <p class="text-xs text-muted-foreground">Manage tour operator boundaries, isolated provider domains, and role-based permissions.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn size="sm" (click)="openCreate()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Create Workspace</span>
          </button>
        </div>
      </div>

      <!-- State: Loading Skeleton -->
      @if (isLoading()) {
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (i of [1, 2, 3]; track i) {
            <div class="h-44 rounded-xl border border-border bg-muted/40 animate-pulse p-5 space-y-4">
              <div class="h-4 w-24 bg-muted-foreground/20 rounded"></div>
              <div class="h-6 w-3/4 bg-muted-foreground/20 rounded"></div>
              <div class="h-16 w-full bg-muted-foreground/10 rounded"></div>
            </div>
          }
        </div>
      }

      <!-- State: Error with Retry -->
      @else if (errorMessage()) {
        <div class="flex flex-col items-center py-16 gap-3 text-center">
          <ng-icon name="lucideAlertCircle" class="size-8 text-destructive opacity-70" />
          <p class="font-semibold text-sm text-foreground">{{ errorMessage() }}</p>
          <button hlmBtn variant="outline" size="sm" (click)="loadWorkspaces()" class="gap-1.5 cursor-pointer">
            <ng-icon name="lucideRefreshCw" class="size-3.5" /> Retry
          </button>
        </div>
      }

      <!-- State: Empty with CTA -->
      @else if (isEmpty()) {
        <div class="flex flex-col items-center py-16 gap-3 text-center border border-dashed rounded-xl p-8">
          <div class="size-14 rounded-2xl bg-muted flex items-center justify-center">
            <ng-icon name="lucideBuilding2" class="size-7 text-muted-foreground/60" />
          </div>
          <h3 class="font-semibold text-foreground">No operator workspaces found</h3>
          <p class="text-xs text-muted-foreground max-w-sm leading-relaxed">
            Add your first agency workspace to begin managing multi-tenant operations, packages, and drivers.
          </p>
          <button hlmBtn (click)="openCreate()" class="mt-1 cursor-pointer gap-1.5">
            <ng-icon name="lucidePlus" class="size-3.5" /> Add First Workspace
          </button>
        </div>
      }

      <!-- State: Workspaces Card Grid -->
      @else {
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (ws of workspaces(); track ws.id) {
            <div
              hlmCard
              class="p-5 space-y-4 hover:border-primary/50 transition-all shadow-2xs relative"
              [class.border-primary]="ws.isCurrent"
            >
              @if (ws.isCurrent) {
                <div class="absolute top-3 right-3">
                  <span class="rounded-full bg-primary/10 text-primary border border-primary/30 px-2 py-0.5 text-[9px] font-bold uppercase">
                    ACTIVE TENANT
                  </span>
                </div>
              }

              <div class="space-y-1">
                <div class="font-mono text-[10px] text-muted-foreground">{{ ws.slug }}</div>
                <h3 class="font-bold text-base text-foreground">{{ ws.name }}</h3>
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span hlmBadge variant="outline" class="text-[10px]">{{ ws.plan }}</span>
                  @if (ws.providerType) {
                    <span class="text-[9px] px-1.5 py-0.5 rounded bg-muted font-medium text-muted-foreground capitalize">
                      {{ ws.providerType.replace('_', ' ') }}
                    </span>
                  }
                </div>
              </div>

              <div class="space-y-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
                <div class="flex justify-between">
                  <span>Team Seats</span>
                  <span class="font-semibold text-foreground">{{ ws.memberCount }} Users</span>
                </div>
                <div class="flex justify-between">
                  <span>Default Region</span>
                  <span class="font-semibold text-foreground">{{ ws.region }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Monthly Spend</span>
                  <span class="font-bold text-foreground">{{ ws.monthlySpend }}</span>
                </div>
                @if (ws.contactEmail) {
                  <div class="flex justify-between text-[11px] truncate">
                    <span>Contact</span>
                    <span class="text-foreground truncate max-w-[150px]">{{ ws.contactEmail }}</span>
                  </div>
                }
              </div>

              <button
                hlmBtn
                [variant]="ws.isCurrent ? 'secondary' : 'outline'"
                size="sm"
                (click)="switchWorkspace(ws)"
                class="w-full text-xs cursor-pointer"
              >
                {{ ws.isCurrent ? 'Currently In Workspace' : 'Switch into Tenant' }}
              </button>
            </div>
          }
        </div>
      }

      <!-- Role-Based Access Control (RBAC) Matrix Table -->
      <div class="space-y-3 pt-4">
        <div>
          <h2 class="text-base font-bold text-foreground">Granular Role-Based Access Matrix</h2>
          <p class="text-xs text-muted-foreground">Permission rules across Marketplace Owners, Agency Admins, Tour Operations, and Auditors.</p>
        </div>

        <div hlmCard class="p-0 overflow-hidden shadow-2xs">
          <table hlmTable class="w-full text-xs">
            <thead hlmTableHeader>
              <tr hlmTableRow>
                <th hlmTableHead class="ps-4">Resource Scope</th>
                <th hlmTableHead class="text-center">Org Owner</th>
                <th hlmTableHead class="text-center">Operator Admin</th>
                <th hlmTableHead class="text-center">Tour Guide</th>
                <th hlmTableHead class="text-center">Finance & Auditor</th>
              </tr>
            </thead>
            <tbody hlmTableBody>
              <tr hlmTableRow>
                <td hlmTableCell class="ps-4 font-bold text-foreground">Package & Itinerary Publishing</td>
                <td hlmTableCell class="text-center text-emerald-600 font-bold">ALLOWED</td>
                <td hlmTableCell class="text-center text-emerald-600 font-bold">ALLOWED</td>
                <td hlmTableCell class="text-center text-emerald-600 font-bold">ALLOWED</td>
                <td hlmTableCell class="text-center text-rose-500 font-bold">READ ONLY</td>
              </tr>
              <tr hlmTableRow>
                <td hlmTableCell class="ps-4 font-bold text-foreground">Escrow Payouts & Bank Accounts</td>
                <td hlmTableCell class="text-center text-emerald-600 font-bold">ALLOWED</td>
                <td hlmTableCell class="text-center text-emerald-600 font-bold">ALLOWED</td>
                <td hlmTableCell class="text-center text-rose-500 font-bold">DENIED</td>
                <td hlmTableCell class="text-center text-emerald-600 font-bold">ALLOWED</td>
              </tr>
              <tr hlmTableRow>
                <td hlmTableCell class="ps-4 font-bold text-foreground">API Keys & Webhooks Configuration</td>
                <td hlmTableCell class="text-center text-emerald-600 font-bold">ALLOWED</td>
                <td hlmTableCell class="text-center text-emerald-600 font-bold">ALLOWED</td>
                <td hlmTableCell class="text-center text-rose-500 font-bold">DENIED</td>
                <td hlmTableCell class="text-center text-rose-500 font-bold">READ ONLY</td>
              </tr>
              <tr hlmTableRow>
                <td hlmTableCell class="ps-4 font-bold text-foreground">Audit Log & Compliance Inspection</td>
                <td hlmTableCell class="text-center text-emerald-600 font-bold">ALLOWED</td>
                <td hlmTableCell class="text-center text-emerald-600 font-bold">ALLOWED</td>
                <td hlmTableCell class="text-center text-rose-500 font-bold">DENIED</td>
                <td hlmTableCell class="text-center text-emerald-600 font-bold">ALLOWED</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </app-main>

    <!-- Create Workspace Sheet -->
    <hlm-sheet [isOpen]="createSheetOpen()" position="right" [size]="'sm'" (closed)="createSheetOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Create Organization Workspace</h3>
        <p hlmSheetDescription class="text-xs">Provision a secure isolated tour operator tenant boundary.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Workspace Name *</label>
          <input
            type="text"
            [(ngModel)]="newWs.name"
            (ngModelChange)="onNameChange($event)"
            placeholder="e.g. Alpine Expeditions AG"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Tenant Slug</label>
          <input
            type="text"
            [(ngModel)]="newWs.slug"
            placeholder="alpine-expeditions"
            class="h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Operator Type</label>
          <hlm-custom-select
            [options]="providerTypeOptions"
            [ngModel]="newWs.providerType"
            (valueChange)="newWs.providerType = $event"
            placeholder="Select Operator Type"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Contact Email *</label>
          <input
            type="email"
            [(ngModel)]="newWs.contactEmail"
            placeholder="admin@operator.com"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Contact Phone</label>
          <input
            type="tel"
            [(ngModel)]="newWs.contactPhone"
            placeholder="+1 555 123 4567"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Cloud Region</label>
          <hlm-custom-select
            [options]="regionOptions"
            [ngModel]="newWs.region"
            (valueChange)="newWs.region = $event"
            placeholder="Select Region"
          />
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="createSheetOpen.set(false)" class="cursor-pointer text-xs" [disabled]="isSubmitting()">
          Cancel
        </button>
        <button hlmBtn (click)="saveWorkspace()" class="cursor-pointer text-xs gap-1.5" [disabled]="isSubmitting()">
          @if (isSubmitting()) {
            <ng-icon name="lucideRefreshCw" class="size-3.5 animate-spin" />
            <span>Provisioning...</span>
          } @else {
            <span>Provision Workspace</span>
          }
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class WorkspacesComponent implements OnInit {
  private readonly workspacesApi = inject(WorkspacesApiService)
  private readonly refData = inject(ReferenceDataService)
  private readonly route = inject(ActivatedRoute)

  readonly workspaces = signal<WorkspaceItem[]>([])
  readonly isLoading = signal<boolean>(false)
  readonly isEmpty = signal<boolean>(false)
  readonly isFallbackMode = signal<boolean>(false)
  readonly errorMessage = signal<string>('')
  readonly createSheetOpen = signal<boolean>(false)
  readonly isSubmitting = signal<boolean>(false)

  newWs: NewWorkspaceDto = {
    name: '',
    slug: '',
    region: 'EU West (Frankfurt)',
    providerType: 'tour_operator',
    contactEmail: '',
    contactPhone: '',
  }

  readonly regionOptions: readonly SelectOption[] = [
    { label: 'EU West (Frankfurt)', value: 'EU West (Frankfurt)' },
    { label: 'US East (N. Virginia)', value: 'US East (N. Virginia)' },
    { label: 'Asia Pacific (Tokyo)', value: 'Asia Pacific (Tokyo)' },
    { label: 'Asia Pacific (Singapore)', value: 'Asia Pacific (Singapore)' },
  ]

  readonly providerTypeOptions: readonly SelectOption[] = [
    { label: 'Tour Operator', value: 'tour_operator' },
    { label: 'Travel Agency', value: 'agency' },
    { label: 'Experience Host', value: 'experience_host' },
    { label: 'Fleet / Transfer Provider', value: 'fleet_provider' },
  ]

  async ngOnInit(): Promise<void> {
    await this.loadWorkspaces()

    // Auto-open create sheet if navigated with ?action=create (from team-switcher or links)
    const action = this.route.snapshot.queryParamMap.get('action')
    if (action === 'create') {
      this.openCreate()
    }
  }

  async loadWorkspaces(): Promise<void> {
    this.isLoading.set(true)
    this.errorMessage.set('')
    try {
      const res = await this.workspacesApi.listWorkspaces()
      this.isFallbackMode.set(res.isFallback ?? false)
      if (res.ok) {
        this.workspaces.set(res.data)
        this.isEmpty.set(res.data.length === 0)
      } else {
        this.errorMessage.set(res.error ?? 'Failed to load workspaces.')
      }
    } finally {
      this.isLoading.set(false)
    }
  }

  openCreate(): void {
    this.newWs = {
      name: '',
      slug: '',
      region: 'EU West (Frankfurt)',
      providerType: 'tour_operator',
      contactEmail: '',
      contactPhone: '',
    }
    this.createSheetOpen.set(true)
  }

  onNameChange(name: string): void {
    this.newWs.name = name
    this.newWs.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    if (!this.newWs.contactEmail || this.newWs.contactEmail.endsWith('.com')) {
      this.newWs.contactEmail = `admin@${this.newWs.slug || 'company'}.com`
    }
  }

  switchWorkspace(ws: WorkspaceItem): void {
    this.workspaces.update((list) =>
      list.map((w) => ({ ...w, isCurrent: w.id === ws.id }))
    )
    toast.success(`Switched tenant context to "${ws.name}".`)
  }

  async saveWorkspace(): Promise<void> {
    if (this.isSubmitting()) return
    if (!this.newWs.name.trim()) {
      toast.error('Workspace name is required.')
      return
    }
    if (!this.newWs.contactEmail?.trim()) {
      toast.error('Contact email is required.')
      return
    }

    this.isSubmitting.set(true)
    try {
      const res = await this.workspacesApi.createWorkspace(this.newWs)
      if (res.ok) {
        toast.success(`Workspace "${res.data.name}" provisioned successfully!`)
        this.createSheetOpen.set(false)
        await this.refData.invalidate('providers')
        await this.loadWorkspaces()
      } else {
        toast.error(res.error ?? 'Failed to create workspace.')
      }
    } finally {
      this.isSubmitting.set(false)
    }
  }
}
