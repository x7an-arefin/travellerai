import { Component, signal, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
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
import { HlmSelectImports, SelectOption } from '../../ui/select/hlm-select.components'
import { toast } from 'ngx-sonner'
import { WorkspacesApiService, WorkspaceItem } from './data-access'

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
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Multi-Tenant Workspaces & RBAC Matrix</h1>
          <p class="text-xs text-muted-foreground">Manage tour operator boundaries, isolated provider domains, and role-based permissions.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn size="sm" (click)="createSheetOpen.set(true)" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Create Workspace</span>
          </button>
        </div>
      </div>

      <!-- Workspaces Card Grid -->
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
              <span hlmBadge variant="outline" class="text-[10px]">{{ ws.plan }}</span>
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
                <span>Monthly Cloud Spend</span>
                <span class="font-bold text-foreground">{{ ws.monthlySpend }}</span>
              </div>
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
          <label class="font-semibold text-foreground">Workspace Name</label>
          <input
            type="text"
            [(ngModel)]="newWs.name"
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
        <button hlmBtn variant="outline" (click)="createSheetOpen.set(false)" class="cursor-pointer text-xs">
          Cancel
        </button>
        <button hlmBtn (click)="saveWorkspace()" class="cursor-pointer text-xs">
          Provision Workspace
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class WorkspacesComponent implements OnInit {
  private readonly workspacesApi = inject(WorkspacesApiService)

  readonly createSheetOpen = signal<boolean>(false)
  readonly workspaces = signal<WorkspaceItem[]>([])

  newWs = {
    name: '',
    slug: '',
    region: 'EU West (Frankfurt)',
  }

  readonly regionOptions: readonly SelectOption[] = [
    { label: 'EU West (Frankfurt)', value: 'EU West (Frankfurt)' },
    { label: 'US East (N. Virginia)', value: 'US East (N. Virginia)' },
    { label: 'Asia Pacific (Tokyo)', value: 'Asia Pacific (Tokyo)' },
    { label: 'Asia Pacific (Singapore)', value: 'Asia Pacific (Singapore)' },
  ]

  ngOnInit(): void {
    this.workspacesApi.listWorkspaces().subscribe((list) => {
      this.workspaces.set(list)
    })
  }

  switchWorkspace(ws: WorkspaceItem): void {
    this.workspaces.update((list) =>
      list.map((w) => ({ ...w, isCurrent: w.id === ws.id }))
    )
    toast.success(`Switched tenant context to "${ws.name}".`)
  }

  saveWorkspace(): void {
    if (!this.newWs.name) {
      toast.error('Please enter a workspace name.')
      return
    }

    this.workspacesApi.createWorkspace({
      name: this.newWs.name,
      slug: this.newWs.slug || this.newWs.name.toLowerCase().replace(/\s+/g, '-'),
      region: this.newWs.region,
    }).subscribe((item) => {
      this.workspaces.update((list) => [item, ...list])
      toast.success(`Workspace "${item.name}" provisioned successfully.`)
      this.createSheetOpen.set(false)
      this.newWs = { name: '', slug: '', region: 'EU West (Frankfurt)' }
    })
  }
}
