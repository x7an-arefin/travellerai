import { Component, computed, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideSearch,
  lucideSlidersHorizontal,
  lucideCheck,
  lucideKey,
  lucideLoader2,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmSheetImports } from '../../ui/sheet/hlm-sheet.components'
import { HlmInputImports } from '../../ui/input/hlm-input.directive'
import { HlmSelectImports, SelectOption } from '../../ui/select/hlm-select.components'
import { BrandIconComponent } from '../../shared/components/brand-icons/brand-icon.component'
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component'
import { AppIntegration, mockApps } from './data/apps.data'
import { toast } from 'ngx-sonner'

type AppFilterType = 'all' | 'connected' | 'notConnected'

@Component({
  selector: 'app-apps',
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
    ...HlmSheetImports,
    ...HlmInputImports,
    ...HlmSelectImports,
    BrandIconComponent,
    EmptyStateComponent,
  ],
  providers: [provideIcons({ lucideSearch, lucideSlidersHorizontal, lucideCheck, lucideKey, lucideLoader2 })],
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
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">App Integrations</h1>
          <p class="text-xs text-muted-foreground">
            Connect and manage external tools and third-party SaaS services.
          </p>
        </div>
      </div>

      <!-- Filter Controls -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="flex flex-1 flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <!-- Search input -->
          <div class="relative w-full sm:w-64">
            <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Search apps..."
              class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <!-- Type filter dropdown -->
          <div class="w-full sm:w-44">
            <hlm-custom-select
              [options]="filterTypeOptions"
              [(ngModel)]="filterType"
              placeholder="Filter apps"
            />
          </div>
        </div>

        <!-- Sort dropdown -->
        <div class="w-full sm:w-48">
          <hlm-custom-select
            [options]="sortOptions"
            [(ngModel)]="sortOrder"
            placeholder="Sort order"
          />
        </div>
      </div>

      <!-- Empty State if no results -->
      @if (filteredApps().length === 0) {
        <app-empty-state
          title="No apps match your criteria"
          description="We couldn't find any third-party app matching your search term or active category filter."
          actionLabel="Clear filters"
          (action)="resetFilters()"
        />
      } @else {
        <!-- Apps Grid -->
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (app of filteredApps(); track app.name) {
            <div hlmCard class="flex flex-col justify-between p-5 hover:border-primary/40 transition-colors shadow-2xs">
              <div>
                <div class="flex items-start justify-between gap-2 mb-3">
                  <div class="flex size-10 items-center justify-center rounded-lg border bg-muted/40 p-2 shadow-2xs">
                    <app-brand-icon [name]="app.name" class="size-6 text-foreground" />
                  </div>

                  <button
                    hlmBtn
                    [variant]="app.connected ? 'secondary' : 'default'"
                    size="sm"
                    (click)="openConnectModal(app)"
                    class="cursor-pointer text-xs h-8 px-3"
                  >
                    @if (app.connected) {
                      <span>Connected</span>
                    } @else {
                      <span>Connect</span>
                    }
                  </button>
                </div>

                <h3 class="text-base font-semibold text-foreground">{{ app.name }}</h3>
                <p class="text-xs text-muted-foreground mt-1 line-clamp-2">{{ app.desc }}</p>
              </div>
            </div>
          }
        </div>
      }
    </app-main>

    <!-- Connect App in HlmSheet side drawer with size="sm" -->
    <hlm-sheet
      [isOpen]="connectModalOpen()"
      position="right"
      [size]="'sm'"
      (closed)="connectModalOpen.set(false)"
      class="w-full"
    >
      @if (activeApp(); as app) {
        <div hlmSheetHeader>
          <div class="flex items-center gap-3 mb-2">
            <div class="flex size-10 items-center justify-center rounded-lg border bg-muted/40 p-2">
              <app-brand-icon [name]="app.name" class="size-6 text-foreground" />
            </div>
            <div>
              <h3 hlmSheetTitle>{{ app.connected ? 'Manage ' + app.name : 'Connect ' + app.name }}</h3>
              <p hlmSheetDescription class="text-xs">Third-party workspace integration</p>
            </div>
          </div>
        </div>

        <div class="space-y-4 py-4 text-xs flex-1">
          <p class="text-muted-foreground leading-relaxed">
            Connecting {{ app.name }} allows synchronization of project tasks, notifications, and webhooks.
          </p>

          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">API Token / Client Secret</label>
            <input hlmInput type="password" [(ngModel)]="mockApiKey" placeholder="sec_live_9a8b7c6d..." />
            <p class="text-[11px] text-muted-foreground">Find this in your {{ app.name }} developer portal.</p>
          </div>

          <div class="rounded-lg border border-border bg-muted/20 p-3 space-y-1 text-muted-foreground leading-relaxed">
            <p class="font-semibold text-foreground">OAuth Scopes:</p>
            <p>• read:workspace, write:tasks, webhooks:deliver</p>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto">
          <button
            type="button"
            hlmBtn
            variant="outline"
            (click)="connectModalOpen.set(false)"
            class="cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            hlmBtn
            [variant]="app.connected ? 'destructive' : 'default'"
            [disabled]="isConnecting()"
            (click)="confirmConnection(app)"
            class="gap-1.5 cursor-pointer"
          >
            @if (isConnecting()) {
              <ng-icon name="lucideLoader2" class="size-3.5 animate-spin" />
              <span>Processing...</span>
            } @else if (app.connected) {
              <span>Disconnect</span>
            } @else {
              <span>Authorize & Connect</span>
            }
          </button>
        </div>
      }
    </hlm-sheet>
  `,
})
export class AppsComponent {
  readonly apps = signal<AppIntegration[]>(mockApps)
  readonly connectModalOpen = signal<boolean>(false)
  readonly activeApp = signal<AppIntegration | null>(null)
  readonly isConnecting = signal<boolean>(false)
  mockApiKey = 'fast_live_app_auth_token_88921'
  searchQuery = ''
  filterType: AppFilterType = 'all'
  sortOrder: 'asc' | 'desc' = 'asc'

  readonly filterTypeOptions: SelectOption[] = [
    { label: 'All Apps', value: 'all' },
    { label: 'Connected', value: 'connected' },
    { label: 'Not Connected', value: 'notConnected' },
  ]

  readonly sortOptions: SelectOption[] = [
    { label: 'Ascending (A-Z)', value: 'asc' },
    { label: 'Descending (Z-A)', value: 'desc' },
  ]

  readonly filteredApps = computed(() => {
    let list = [...this.apps()]
    const q = this.searchQuery.toLowerCase().trim()
    const type = this.filterType
    const sort = this.sortOrder

    if (q) {
      list = list.filter((a) => a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q))
    }

    if (type === 'connected') {
      list = list.filter((a) => a.connected)
    } else if (type === 'notConnected') {
      list = list.filter((a) => !a.connected)
    }

    list.sort((a, b) => {
      const cmp = a.name.localeCompare(b.name)
      return sort === 'asc' ? cmp : -cmp
    })

    return list
  })

  resetFilters(): void {
    this.searchQuery = ''
    this.filterType = 'all'
  }

  openConnectModal(app: AppIntegration): void {
    this.activeApp.set(app)
    this.connectModalOpen.set(true)
  }

  confirmConnection(app: AppIntegration): void {
    this.isConnecting.set(true)
    setTimeout(() => {
      this.isConnecting.set(false)
      app.connected = !app.connected
      this.connectModalOpen.set(false)
      toast.success(
        app.connected
          ? `Connected to ${app.name} successfully!`
          : `Disconnected from ${app.name}.`
      )
    }, 800)
  }
}
