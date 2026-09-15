import { Component, signal, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideKey,
  lucidePlus,
  lucideCopy,
  lucideCheck,
  lucideTrash2,
  lucideWebhook,
  lucideActivity,
  lucideRefreshCw,
  lucideEye,
  lucideEyeOff,
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
import { HlmInputImports } from '../../ui/input/hlm-input.directive'
import { HlmSelectImports } from '../../ui/select/hlm-select.components'
import { HlmTableImports } from '../../ui/table/hlm-table.components'
import { toast } from 'ngx-sonner'

export interface ApiKeyItem {
  id: string
  name: string
  keyPrefix: string
  fullToken: string
  scope: string
  createdDate: string
  lastUsed: string
}

const STORAGE_KEY = 'traveller_api_keys_v1'

@Component({
  selector: 'app-api-keys',
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
    ...HlmInputImports,
    ...HlmSelectImports,
    ...HlmTableImports,
  ],
  providers: [
    provideIcons({
      lucideKey,
      lucidePlus,
      lucideCopy,
      lucideCheck,
      lucideTrash2,
      lucideWebhook,
      lucideActivity,
      lucideRefreshCw,
      lucideEye,
      lucideEyeOff,
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
          <h1 class="text-2xl font-bold tracking-tight">API Keys & Webhooks</h1>
          <p class="text-xs text-muted-foreground">
            Manage your REST developer credentials, agency tokens, and real-time webhook endpoints.
          </p>
        </div>

        <button hlmBtn size="sm" (click)="openCreateKey()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
          <ng-icon name="lucidePlus" class="size-3.5" />
          <span>Create API Key</span>
        </button>
      </div>

      <!-- API Secret Keys Table -->
      <div hlmCard class="p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-semibold text-foreground">Active Secret Tokens</h3>
            <p class="text-xs text-muted-foreground">Use secret keys to integrate booking widgets, flight radar, and agency sync pipelines.</p>
          </div>
        </div>

        <div class="rounded-lg border border-border overflow-x-auto">
          <table hlmTable class="min-w-[650px]">
            <thead hlmTableHeader>
              <tr hlmTableRow>
                <th hlmTableHead class="ps-4">Key Name</th>
                <th hlmTableHead>Token Key</th>
                <th hlmTableHead>Scope</th>
                <th hlmTableHead>Created</th>
                <th hlmTableHead>Last Used</th>
                <th hlmTableHead class="w-20 text-right pe-4">Actions</th>
              </tr>
            </thead>
            <tbody hlmTableBody>
              @for (k of apiKeys(); track k.id) {
                <tr hlmTableRow>
                  <td hlmTableCell class="ps-4 font-semibold text-xs text-foreground">
                    <div class="flex items-center gap-2">
                      <ng-icon name="lucideKey" class="size-3.5 text-primary" />
                      <span>{{ k.name }}</span>
                    </div>
                  </td>
                  <td hlmTableCell class="font-mono text-xs text-muted-foreground">
                    <span>{{ k.keyPrefix }}••••••••••••</span>
                  </td>
                  <td hlmTableCell>
                    <span hlmBadge variant="secondary" class="text-[10px] font-mono">
                      {{ k.scope }}
                    </span>
                  </td>
                  <td hlmTableCell class="text-xs text-muted-foreground">{{ k.createdDate }}</td>
                  <td hlmTableCell class="text-xs text-muted-foreground">{{ k.lastUsed }}</td>
                  <td hlmTableCell class="text-right pe-4">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        (click)="copyToken(k)"
                        class="size-7 cursor-pointer text-muted-foreground hover:text-foreground"
                        aria-label="Copy key"
                      >
                        <ng-icon name="lucideCopy" class="size-3.5" />
                      </button>

                      <button
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        (click)="revokeKey(k)"
                        class="size-7 cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Revoke key"
                      >
                        <ng-icon name="lucideTrash2" class="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Webhook Endpoints Section -->
      <div hlmCard class="p-6 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 class="text-base font-semibold text-foreground">Webhook Subscriptions</h3>
            <p class="text-xs text-muted-foreground">Receive real-time HTTP POST notifications when guest bookings or departures are triggered.</p>
          </div>

          <button hlmBtn variant="outline" size="sm" (click)="testWebhook()" class="gap-1.5 cursor-pointer text-xs">
            <ng-icon name="lucideActivity" class="size-3.5 text-emerald-500" />
            <span>Send Test Payload</span>
          </button>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs font-semibold text-foreground truncate max-w-[280px]">
                https://api.partner-agency.com/webhooks/bookings
              </span>
              <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.2 text-[10px] font-bold text-emerald-600">
                Active
              </span>
            </div>
            <p class="text-xs text-muted-foreground">Subscribed to: <code class="font-mono text-primary">booking.confirmed</code>, <code class="font-mono text-primary">booking.refunded</code></p>
          </div>

          <div class="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs font-semibold text-foreground truncate max-w-[280px]">
                https://hooks.slack.com/services/T00/B00/X00
              </span>
              <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.2 text-[10px] font-bold text-emerald-600">
                Active
              </span>
            </div>
            <p class="text-xs text-muted-foreground">Subscribed to: <code class="font-mono text-primary">dispatch.assigned</code>, <code class="font-mono text-primary">flight.delayed</code></p>
          </div>
        </div>
      </div>
    </app-main>

    <!-- Create API Key Side Sheet -->
    <hlm-sheet [isOpen]="createSheetOpen()" position="right" [size]="'sm'" (closed)="createSheetOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Generate API Key</h3>
        <p hlmSheetDescription>Create a secret token for REST API integration.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Key Identifier Name</label>
          <input hlmInput [(ngModel)]="newKeyName" placeholder="e.g. Zurich Agency Booking Integration" />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Permissions Scope</label>
          <hlm-custom-select
            [options]="scopeOptions"
            [(ngModel)]="newKeyScope"
            placeholder="Select scope"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Token Expiration</label>
          <hlm-custom-select
            [options]="expirationOptions"
            [(ngModel)]="newKeyExpiration"
            placeholder="Select duration"
          />
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto">
        <button hlmBtn variant="outline" (click)="createSheetOpen.set(false)" class="cursor-pointer">Cancel</button>
        <button hlmBtn [disabled]="!newKeyName.trim()" (click)="saveNewKey()" class="cursor-pointer">Generate Token</button>
      </div>
    </hlm-sheet>
  `,
})
export class ApiKeysComponent implements OnInit {
  readonly createSheetOpen = signal<boolean>(false)
  newKeyName = ''
  newKeyScope: any = 'read:bookings,write:departures'
  newKeyExpiration: any = '90d'

  private readonly defaultKeys: ApiKeyItem[] = [
    {
      id: 'k1',
      name: 'Mobile App Concierge Gateway',
      keyPrefix: 'trv_live_9a8b7c6d',
      fullToken: 'trv_live_9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
      scope: 'read:bookings, write:departures',
      createdDate: 'Aug 01, 2026',
      lastUsed: '2 minutes ago',
    },
    {
      id: 'k2',
      name: 'B2B Wholesale Travel Agency Sync',
      keyPrefix: 'trv_live_4f3a2b1c',
      fullToken: 'trv_live_4f3a2b1c0d9e8f7a6b5c4d9a8b7c6d5e',
      scope: 'admin:all',
      createdDate: 'Jul 15, 2026',
      lastUsed: 'Yesterday',
    },
    {
      id: 'k3',
      name: 'Staging & Sandbox Booking Pipeline',
      keyPrefix: 'trv_test_1c0d9e8f',
      fullToken: 'trv_test_1c0d9e8f7a6b5c4d9a8b7c6d5e4f3a2b',
      scope: 'read:all',
      createdDate: 'Jun 20, 2026',
      lastUsed: '3 days ago',
    },
  ]

  readonly apiKeys = signal<ApiKeyItem[]>([])

  readonly scopeOptions = [
    { label: 'Read & Write Bookings', value: 'read:bookings,write:departures' },
    { label: 'Full Admin Access (admin:all)', value: 'admin:all' },
    { label: 'Catalog Read-Only (read:packages)', value: 'read:packages' },
  ]

  readonly expirationOptions = [
    { label: '30 Days', value: '30d' },
    { label: '90 Days', value: '90d' },
    { label: '1 Year', value: '365d' },
    { label: 'No Expiration', value: 'never' },
  ]

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          this.apiKeys.set(JSON.parse(saved))
          return
        }
      } catch {
        // Fallback
      }
    }
    this.apiKeys.set(this.defaultKeys)
  }

  openCreateKey(): void {
    this.newKeyName = ''
    this.createSheetOpen.set(true)
  }

  saveNewKey(): void {
    if (!this.newKeyName.trim()) return
    const newKey: ApiKeyItem = {
      id: 'k-' + Date.now(),
      name: this.newKeyName,
      keyPrefix: 'trv_live_' + Math.random().toString(36).substring(2, 10),
      fullToken: 'trv_live_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
      scope: this.newKeyScope,
      createdDate: 'Today',
      lastUsed: 'Never',
    }

    const updated = [newKey, ...this.apiKeys()]
    this.apiKeys.set(updated)
    this.persistKeys(updated)
    this.createSheetOpen.set(false)
    toast.success(`API key "${newKey.name}" generated!`)
  }

  copyToken(k: ApiKeyItem): void {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(k.fullToken)
    }
    toast.success(`Copied secret token for "${k.name}" to clipboard!`)
  }

  revokeKey(k: ApiKeyItem): void {
    const updated = this.apiKeys().filter((item) => item.id !== k.id)
    this.apiKeys.set(updated)
    this.persistKeys(updated)
    toast.success(`API key "${k.name}" revoked permanently.`)
  }

  testWebhook(): void {
    toast.success('Test webhook event dispatched! HTTP 200 OK received.')
  }

  private persistKeys(keys: ApiKeyItem[]): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(keys))
      } catch {
        // ignore
      }
    }
  }
}
