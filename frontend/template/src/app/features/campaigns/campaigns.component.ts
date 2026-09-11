import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideMegaphone,
  lucideTarget,
  lucideSend,
  lucideSearch,
  lucidePlus,
  lucideCheck,
  lucideClock,
  lucideTrendingUp,
  lucideMail,
  lucideSmartphone,
  lucideEye,
  lucideDownload,
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
import { HlmSelectImports, SelectOption } from '../../ui/select/hlm-select.components'
import { toast } from 'ngx-sonner'

export interface CampaignItem {
  id: string
  name: string
  channel: 'Email' | 'SMS' | 'Push Notification'
  status: 'active' | 'scheduled' | 'draft' | 'completed'
  sentCount: number
  openRate: number
  clickRate: number
  conversionRate: number
  scheduleDate: string
}

@Component({
  selector: 'app-campaigns',
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
      lucideMegaphone,
      lucideTarget,
      lucideSend,
      lucideSearch,
      lucidePlus,
      lucideCheck,
      lucideClock,
      lucideTrendingUp,
      lucideMail,
      lucideSmartphone,
      lucideEye,
      lucideDownload,
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
      <!-- Title & Actions Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Marketing Campaigns & Automation</h1>
          <p class="text-xs text-muted-foreground">Deliver multi-channel campaigns, measure click-through rates, and run A/B test experiments.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn size="sm" (click)="openCreateDrawer()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Total Delivered Messages</span>
          <div class="text-2xl font-bold text-foreground">248,920</div>
          <p class="text-[11px] text-emerald-600 font-semibold">99.82% delivery success</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Average Open Rate</span>
          <div class="text-2xl font-bold text-foreground">38.4%</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+4.2% above benchmark</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Click-Through Rate (CTR)</span>
          <div class="text-2xl font-bold text-foreground">14.6%</div>
          <p class="text-[11px] text-sky-500 font-semibold">36,340 link interactions</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Attributed Revenue</span>
          <div class="text-2xl font-bold text-emerald-600">\$84,200</div>
          <p class="text-[11px] text-emerald-600 font-semibold">4.8x ROAS yield</p>
        </div>
      </div>

      <!-- Filter Controls & Search -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="relative w-full sm:w-72">
          <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search campaign name..."
            class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="w-44">
          <hlm-custom-select
            [options]="channelOptions"
            [ngModel]="selectedChannel()"
            (valueChange)="selectedChannel.set($event)"
            placeholder="All Channels"
          />
        </div>
      </div>

      <!-- Campaigns Table -->
      <div hlmCard class="p-0 overflow-hidden shadow-2xs">
        <table hlmTable class="w-full min-w-[700px] text-xs">
          <thead hlmTableHeader>
            <tr hlmTableRow>
              <th hlmTableHead class="ps-4">Campaign Name</th>
              <th hlmTableHead>Channel</th>
              <th hlmTableHead>Delivered</th>
              <th hlmTableHead>Open Rate</th>
              <th hlmTableHead>CTR</th>
              <th hlmTableHead>Status</th>
              <th hlmTableHead class="text-right pe-4">Actions</th>
            </tr>
          </thead>
          <tbody hlmTableBody>
            @for (c of filteredCampaigns(); track c.id) {
              <tr hlmTableRow class="hover:bg-muted/40 transition-colors">
                <td hlmTableCell class="ps-4 py-3">
                  <div class="font-bold text-foreground">{{ c.name }}</div>
                  <div class="text-[11px] text-muted-foreground">Schedule: {{ c.scheduleDate }}</div>
                </td>
                <td hlmTableCell>
                  <span hlmBadge variant="outline" class="font-medium text-[11px]">{{ c.channel }}</span>
                </td>
                <td hlmTableCell class="font-mono font-semibold text-foreground">
                  {{ c.sentCount | number }}
                </td>
                <td hlmTableCell>
                  <div class="font-bold text-foreground">{{ c.openRate }}%</div>
                  <div class="h-1 w-20 bg-muted rounded-full overflow-hidden mt-0.5">
                    <div class="h-full bg-emerald-500 rounded-full" [style.width.%]="c.openRate"></div>
                  </div>
                </td>
                <td hlmTableCell>
                  <div class="font-bold text-foreground">{{ c.clickRate }}%</div>
                  <div class="h-1 w-20 bg-muted rounded-full overflow-hidden mt-0.5">
                    <div class="h-full bg-sky-500 rounded-full" [style.width.%]="c.clickRate * 3"></div>
                  </div>
                </td>
                <td hlmTableCell>
                  <span
                    class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border"
                    [ngClass]="getStatusBadgeClass(c.status)"
                  >
                    {{ c.status }}
                  </span>
                </td>
                <td hlmTableCell class="text-right pe-4">
                  <button hlmBtn variant="outline" size="sm" (click)="openDetail(c)" class="h-7 text-xs cursor-pointer">
                    Inspect
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </app-main>

    <!-- Create Campaign Sheet (size="md" = 1/2 screen width) -->
    <hlm-sheet [isOpen]="createDrawerOpen()" position="right" [size]="'md'" (closed)="createDrawerOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Launch Multi-Channel Campaign</h3>
        <p hlmSheetDescription class="text-xs">Configure message parameters, audience segment, and dispatch schedule.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Campaign Title</label>
          <input
            type="text"
            [(ngModel)]="newCampaign.name"
            placeholder="e.g. Q3 Enterprise Security Upgrade Announcement"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Delivery Channel</label>
            <hlm-custom-select
              [options]="formChannelOptions"
              [ngModel]="newCampaign.channel"
              (valueChange)="newCampaign.channel = $event"
              placeholder="Select Channel"
            />
          </div>
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Target Audience</label>
            <hlm-custom-select
              [options]="audienceOptions"
              [ngModel]="newCampaign.audience"
              (valueChange)="newCampaign.audience = $event"
              placeholder="Select Segment"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Subject / Push Headline</label>
          <input
            type="text"
            [(ngModel)]="newCampaign.subject"
            placeholder="Unlock new automation features today"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Message Body Content</label>
          <textarea
            rows="5"
            placeholder="Draft your promotional or transactional message..."
            class="w-full rounded-md border border-input bg-background p-2.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          ></textarea>
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="createDrawerOpen.set(false)" class="cursor-pointer text-xs">
          Cancel
        </button>
        <button hlmBtn (click)="saveCampaign()" class="cursor-pointer text-xs">
          Schedule & Launch
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class CampaignsComponent {
  readonly createDrawerOpen = signal<boolean>(false)
  searchQuery = ''
  readonly selectedChannel = signal<string>('all')

  newCampaign = {
    name: '',
    channel: 'Email' as CampaignItem['channel'],
    audience: 'all_subscribers',
    subject: '',
  }

  readonly channelOptions: readonly SelectOption[] = [
    { label: 'All Channels', value: 'all' },
    { label: 'Email', value: 'Email' },
    { label: 'SMS', value: 'SMS' },
    { label: 'Push Notification', value: 'Push Notification' },
  ]

  readonly formChannelOptions: readonly SelectOption[] = [
    { label: 'Email Broadcast', value: 'Email' },
    { label: 'SMS Gateway', value: 'SMS' },
    { label: 'Web Push Notification', value: 'Push Notification' },
  ]

  readonly audienceOptions: readonly SelectOption[] = [
    { label: 'All Active Subscribers (48K)', value: 'all_subscribers' },
    { label: 'Enterprise Paid Tier (3.2K)', value: 'enterprise' },
    { label: 'Inactive 30+ Days (12K)', value: 'inactive' },
  ]

  readonly campaigns = signal<CampaignItem[]>([
    {
      id: 'cmp-1',
      name: 'Spartan UI Angular 21 Architecture Launch',
      channel: 'Email',
      status: 'active',
      sentCount: 68400,
      openRate: 44.8,
      clickRate: 18.2,
      conversionRate: 6.4,
      scheduleDate: 'Today, 08:00 AM',
    },
    {
      id: 'cmp-2',
      name: 'Security Patch Alert: WebAuthn MFA Enforcement',
      channel: 'Push Notification',
      status: 'completed',
      sentCount: 142000,
      openRate: 62.4,
      clickRate: 24.1,
      conversionRate: 12.0,
      scheduleDate: 'Aug 04, 2026',
    },
    {
      id: 'cmp-3',
      name: 'Quarterly Renewal 20% Discount Code',
      channel: 'Email',
      status: 'scheduled',
      sentCount: 24000,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0,
      scheduleDate: 'Aug 10, 2026',
    },
    {
      id: 'cmp-4',
      name: 'SMS Two-Factor Setup Reminder',
      channel: 'SMS',
      status: 'active',
      sentCount: 14520,
      openRate: 88.0,
      clickRate: 12.4,
      conversionRate: 8.9,
      scheduleDate: 'Yesterday',
    },
  ])

  readonly filteredCampaigns = computed(() => {
    const q = this.searchQuery.toLowerCase().trim()
    const ch = this.selectedChannel()

    return this.campaigns().filter((c) => {
      const matchesQ = !q || c.name.toLowerCase().includes(q)
      const matchesCh = ch === 'all' || c.channel === ch
      return matchesQ && matchesCh
    })
  })

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800'
      case 'scheduled': return 'bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-800'
      case 'completed': return 'bg-muted text-muted-foreground'
      default: return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800'
    }
  }

  openCreateDrawer(): void {
    this.newCampaign = {
      name: '',
      channel: 'Email',
      audience: 'all_subscribers',
      subject: '',
    }
    this.createDrawerOpen.set(true)
  }

  saveCampaign(): void {
    if (!this.newCampaign.name) {
      toast.error('Please enter a campaign name.')
      return
    }

    const item: CampaignItem = {
      id: 'cmp-' + (this.campaigns().length + 1),
      name: this.newCampaign.name,
      channel: this.newCampaign.channel,
      status: 'scheduled',
      sentCount: 35000,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0,
      scheduleDate: 'Tomorrow, 09:00 AM',
    }

    this.campaigns.update((list) => [item, ...list])
    toast.success(`Campaign "${item.name}" scheduled.`)
    this.createDrawerOpen.set(false)
  }

  openDetail(c: CampaignItem): void {
    toast.info(`Inspecting performance telemetry for ${c.name}.`)
  }
}
