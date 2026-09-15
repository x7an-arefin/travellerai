import { Component, signal, computed, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideBadgeDollarSign,
  lucideDollarSign,
  lucideSearch,
  lucidePlus,
  lucideArrowRight,
  lucideArrowLeft,
  lucideCalendar,
  lucideUser,
  lucideBuilding,
  lucidePhone,
  lucideMail,
  lucideMessageSquare,
  lucideCheck,
  lucideTrendingUp,
  lucideBriefcase,
  lucideDownload,
  lucideRefreshCw,
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
import { HlmAvatarImports } from '../../ui/avatar/hlm-avatar.components'
import { toast } from 'ngx-sonner'
import { DealItem, DealStage, DealsApiService } from './data-access'

@Component({
  selector: 'app-deals',
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
      lucideBadgeDollarSign,
      lucideDollarSign,
      lucideSearch,
      lucidePlus,
      lucideArrowRight,
      lucideArrowLeft,
      lucideCalendar,
      lucideUser,
      lucideBuilding,
      lucidePhone,
      lucideMail,
      lucideMessageSquare,
      lucideCheck,
      lucideTrendingUp,
      lucideBriefcase,
      lucideDownload,
      lucideRefreshCw,
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
          <h1 class="text-2xl font-bold tracking-tight text-foreground">CRM Proposals & Revenue Pipeline</h1>
          <p class="text-xs text-muted-foreground">Track custom tour quotations, corporate travel contracts, and provider negotiated rates.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="loadDeals()" [disabled]="isLoading()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideRefreshCw" class="size-3.5 text-muted-foreground" [class.animate-spin]="isLoading()" />
            <span>Refresh</span>
          </button>
          <button hlmBtn variant="outline" size="sm" (click)="exportPipeline()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
            <span>Export Deals</span>
          </button>
          <button hlmBtn size="sm" (click)="openCreateDrawer()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Create Proposal</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Total Pipeline Value</span>
          <div class="text-2xl font-bold text-foreground">\${{ totalPipelineValue() | number:'1.0-0' }}</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+24% vs last quarter</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Weighted Revenue Forecast</span>
          <div class="text-2xl font-bold text-foreground">\${{ weightedForecastValue() | number:'1.0-0' }}</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Based on win-probability</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Active Opportunities</span>
          <div class="text-2xl font-bold text-foreground">{{ deals().length }} Opportunities</div>
          <p class="text-[11px] text-sky-500 font-semibold">Avg 21 days turnaround</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Historical Win Rate</span>
          <div class="text-2xl font-bold text-emerald-600">
            {{ winRate() | number:'1.1-1' }}%
          </div>
          <p class="text-[11px] text-emerald-600 font-semibold">B2B Custom Itineraries</p>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="relative w-full sm:w-72">
          <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search proposals, corporate clients..."
            class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="w-48">
          <hlm-custom-select
            [options]="ownerOptions"
            [ngModel]="selectedOwner()"
            (valueChange)="selectedOwner.set($event)"
            placeholder="All Deal Owners"
          />
        </div>
      </div>

      <!-- Kanban Columns Board -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
        @for (col of columns; track col.stage) {
          <div class="rounded-xl border border-border bg-muted/20 p-3 space-y-3 flex flex-col min-h-[500px]">
            <!-- Column Header with Sum Calculation -->
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-foreground">{{ col.title }}</span>
                <span class="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                  {{ getDealsForStage(col.stage).length }}
                </span>
              </div>
              <div class="text-[11px] font-semibold text-primary">
                \${{ getStageTotalValue(col.stage) | number:'1.0-0' }}
              </div>
            </div>

            <!-- Deal Cards List -->
            <div class="space-y-2.5 flex-1">
              @for (deal of getDealsForStage(col.stage); track deal.id) {
                <div
                  (click)="openDealDetail(deal)"
                  class="rounded-lg border border-border bg-card p-3 shadow-2xs hover:border-primary/50 hover:shadow-xs transition-all duration-150 cursor-pointer space-y-2.5 group"
                >
                  <!-- Card Header -->
                  <div>
                    <div class="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{{ deal.company }}</div>
                    <h4 class="font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {{ deal.title }}
                    </h4>
                  </div>

                  <!-- Deal Value & Probability -->
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-sm text-foreground">\${{ deal.value | number:'1.0-0' }}</span>
                    <span
                      class="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold border"
                      [ngClass]="getProbabilityBadgeClass(deal.probability)"
                    >
                      {{ deal.probability }}% win
                    </span>
                  </div>

                  <!-- Footer: Close date and Owner -->
                  <div class="flex items-center justify-between pt-1 border-t border-border/60 text-[10px] text-muted-foreground">
                    <span>Target: {{ deal.closeDate }}</span>
                    <div class="flex items-center gap-1">
                      <div class="size-5 rounded-full bg-primary/20 text-primary font-bold text-[9px] flex items-center justify-center">
                        {{ deal.owner.name.substring(0, 2).toUpperCase() }}
                      </div>
                    </div>
                  </div>

                  <!-- Quick Stage Advance Button -->
                  <div class="flex items-center justify-between pt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    @if (col.stage !== 'discovery') {
                      <button
                        type="button"
                        (click)="moveDeal(deal, -1, $event)"
                        class="p-1 text-[10px] rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                        title="Move back"
                      >
                        <ng-icon name="lucideArrowLeft" class="size-3" />
                      </button>
                    } @else {
                      <div></div>
                    }

                    @if (col.stage !== 'won') {
                      <button
                        type="button"
                        (click)="moveDeal(deal, 1, $event)"
                        class="p-1 text-[10px] rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-0.5 font-semibold"
                        title="Advance stage"
                      >
                        <span>Next</span>
                        <ng-icon name="lucideArrowRight" class="size-3" />
                      </button>
                    }
                  </div>
                </div>
              }

              @if (getDealsForStage(col.stage).length === 0) {
                <div class="py-8 text-center text-[11px] text-muted-foreground border border-dashed rounded-lg">
                  No deals in this stage
                </div>
              }
            </div>
          </div>
        }
      </div>
    </app-main>

    <!-- Deal Detail & Activity Timeline Sheet -->
    <hlm-sheet [isOpen]="detailSheetOpen()" position="right" [size]="'md'" (closed)="detailSheetOpen.set(false)">
      @if (activeDeal(); as d) {
        <div hlmSheetHeader>
          <div class="flex items-center justify-between">
            <h3 hlmSheetTitle>{{ d.title }}</h3>
            <span hlmBadge variant="outline" class="font-bold text-xs uppercase">{{ d.stage }}</span>
          </div>
          <p hlmSheetDescription class="text-xs">{{ d.company }} • Valuation: \${{ d.value | number:'1.0-0' }}</p>
        </div>

        <div class="space-y-6 py-4 flex-1 overflow-y-auto text-xs">
          <!-- Deal Metrics Grid -->
          <div class="grid grid-cols-3 gap-3">
            <div class="p-3 rounded-xl border border-border bg-card space-y-1">
              <span class="text-[10px] font-bold text-muted-foreground uppercase">Target Departure / Close</span>
              <p class="font-bold text-foreground text-xs">{{ d.closeDate }}</p>
            </div>
            <div class="p-3 rounded-xl border border-border bg-card space-y-1">
              <span class="text-[10px] font-bold text-muted-foreground uppercase">Win Probability</span>
              <p class="font-bold text-emerald-600 text-xs">{{ d.probability }}% Confidence</p>
            </div>
            <div class="p-3 rounded-xl border border-border bg-card space-y-1">
              <span class="text-[10px] font-bold text-muted-foreground uppercase">Lead Account Rep</span>
              <p class="font-bold text-foreground text-xs">{{ d.owner.name }}</p>
            </div>
          </div>

          <!-- Add Note Box -->
          <div class="space-y-2">
            <label class="font-bold text-foreground">Log Client Interaction / Meeting Memo</label>
            <div class="flex gap-2">
              <input
                type="text"
                [(ngModel)]="newNoteText"
                placeholder="Log client call summary, custom itinerary revisions..."
                class="h-9 flex-1 rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button hlmBtn size="sm" (click)="addNote(d)" class="h-9 cursor-pointer">
                Post Note
              </button>
            </div>
          </div>

          <!-- Activity Stream -->
          <div class="space-y-3">
            <h4 class="font-bold text-foreground">Touchpoint & Negotiation Timeline</h4>
            <div class="space-y-3 border-l-2 border-border pl-4">
              @for (act of d.activities; track act.date) {
                <div class="space-y-0.5 relative">
                  <div class="size-2 rounded-full bg-primary absolute -left-[21px] top-1.5 ring-4 ring-background"></div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="font-semibold text-foreground uppercase tracking-wider">{{ act.type }}</span>
                    <span class="text-muted-foreground">{{ act.date }}</span>
                  </div>
                  <p class="text-muted-foreground text-xs leading-relaxed">{{ act.note }}</p>
                </div>
              }
            </div>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="detailSheetOpen.set(false)" class="cursor-pointer text-xs">
            Close
          </button>
          @if (d.stage !== 'won') {
            <button hlmBtn (click)="markAsWon(d)" class="cursor-pointer text-xs bg-emerald-600 hover:bg-emerald-700 text-white">
              Mark Quotation as Accepted (Won)
            </button>
          } @else {
            <span class="text-xs font-semibold text-emerald-600">Contract Executed & Closed Won</span>
          }
        </div>
      }
    </hlm-sheet>

    <!-- Create Deal Sheet -->
    <hlm-sheet [isOpen]="createSheetOpen()" position="right" [size]="'sm'" (closed)="createSheetOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Create Corporate Travel Quotation</h3>
        <p hlmSheetDescription class="text-xs">Issue a custom tour package or corporate retreat proposal.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Opportunity / Package Title</label>
          <input
            type="text"
            [(ngModel)]="newDeal.title"
            placeholder="e.g. Goldman Sachs Alpine Executive Offsite"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Client Organization / Agency</label>
          <input
            type="text"
            [(ngModel)]="newDeal.company"
            placeholder="e.g. Goldman Sachs London"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Quotation Value (\$)</label>
            <input
              type="number"
              [(ngModel)]="newDeal.value"
              placeholder="75000"
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Initial Stage</label>
            <hlm-custom-select
              [options]="stageOptions"
              [ngModel]="newDeal.stage"
              (valueChange)="newDeal.stage = $event"
              placeholder="Select Stage"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <div class="flex justify-between">
            <label class="font-semibold text-foreground">Win Probability</label>
            <span class="font-bold">{{ newDeal.probability }}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            [(ngModel)]="newDeal.probability"
            class="w-full accent-primary"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Target Close / Departure Date</label>
          <input
            type="text"
            [(ngModel)]="newDeal.closeDate"
            placeholder="Nov 15, 2026"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="createSheetOpen.set(false)" class="cursor-pointer text-xs">
          Cancel
        </button>
        <button hlmBtn (click)="saveNewDeal()" class="cursor-pointer text-xs">
          Create Opportunity
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class DealsComponent implements OnInit {
  private readonly dealsApi = inject(DealsApiService)

  readonly createSheetOpen = signal<boolean>(false)
  readonly detailSheetOpen = signal<boolean>(false)
  readonly activeDeal = signal<DealItem | null>(null)
  readonly isLoading = signal<boolean>(false)

  searchQuery = ''
  readonly selectedOwner = signal<string>('all')
  newNoteText = ''

  newDeal: Partial<DealItem> = {
    title: '',
    company: '',
    value: 50000,
    probability: 60,
    stage: 'discovery',
    closeDate: 'Nov 30, 2026',
  }

  readonly columns: { stage: DealStage; title: string }[] = [
    { stage: 'discovery', title: 'Discovery / Lead In' },
    { stage: 'qualified', title: 'Qualified' },
    { stage: 'proposal', title: 'Proposal Sent' },
    { stage: 'negotiation', title: 'In Negotiation' },
    { stage: 'won', title: 'Closed Won' },
  ]

  readonly stageOptions: readonly SelectOption[] = [
    { label: 'Discovery', value: 'discovery' },
    { label: 'Qualified', value: 'qualified' },
    { label: 'Proposal Sent', value: 'proposal' },
    { label: 'In Negotiation', value: 'negotiation' },
    { label: 'Closed Won', value: 'won' },
  ]

  readonly ownerOptions: readonly SelectOption[] = [
    { label: 'All Deal Owners', value: 'all' },
    { label: 'Sarah Jenkins', value: 'Sarah Jenkins' },
    { label: 'David Kim', value: 'David Kim' },
    { label: 'Elena Rostova', value: 'Elena Rostova' },
    { label: 'Alex Carter', value: 'Alex Carter' },
  ]

  readonly deals = signal<DealItem[]>([])

  readonly filteredDeals = computed(() => {
    const q = this.searchQuery.toLowerCase().trim()
    const owner = this.selectedOwner()

    return this.deals().filter((d) => {
      const matchesQ = !q || d.title.toLowerCase().includes(q) || d.company.toLowerCase().includes(q)
      const matchesOwner = owner === 'all' || d.owner.name === owner
      return matchesQ && matchesOwner
    })
  })

  readonly totalPipelineValue = computed(() => {
    return this.deals().reduce((sum, d) => sum + d.value, 0)
  })

  readonly weightedForecastValue = computed(() => {
    return this.deals().reduce((sum, d) => sum + d.value * (d.probability / 100), 0)
  })

  readonly winRate = computed(() => {
    const total = this.deals().length
    if (total === 0) return 0
    const won = this.deals().filter((d) => d.stage === 'won').length
    return (won / total) * 100
  })

  ngOnInit(): void {
    this.loadDeals()
  }

  async loadDeals(): Promise<void> {
    this.isLoading.set(true)
    try {
      const list = await this.dealsApi.loadDeals()
      this.deals.set(list)
    } catch {
      toast.error('Could not load proposals from API; using cached data.')
    } finally {
      this.isLoading.set(false)
    }
  }

  getDealsForStage(stage: DealStage): DealItem[] {
    return this.filteredDeals().filter((d) => d.stage === stage)
  }

  getStageTotalValue(stage: DealStage): number {
    return this.getDealsForStage(stage).reduce((sum, d) => sum + d.value, 0)
  }

  getProbabilityBadgeClass(prob: number): string {
    if (prob >= 80) return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800'
    if (prob >= 50) return 'bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-800'
    return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800'
  }

  async moveDeal(deal: DealItem, direction: number, event: Event): Promise<void> {
    event.stopPropagation()
    const stageOrder: DealStage[] = ['discovery', 'qualified', 'proposal', 'negotiation', 'won']
    const currentIndex = stageOrder.indexOf(deal.stage)
    const nextIndex = currentIndex + direction

    if (nextIndex >= 0 && nextIndex < stageOrder.length) {
      const nextStage = stageOrder[nextIndex]
      await this.dealsApi.updateDealStage(deal.id, nextStage)
      this.deals.update((list) =>
        list.map((d) => (d.id === deal.id ? { ...d, stage: nextStage } : d))
      )
      toast.success(`Moved "${deal.title}" to ${nextStage}.`)
    }
  }

  openDealDetail(deal: DealItem): void {
    this.activeDeal.set(deal)
    this.detailSheetOpen.set(true)
  }

  openCreateDrawer(): void {
    this.newDeal = {
      title: '',
      company: '',
      value: 60000,
      probability: 50,
      stage: 'discovery',
      closeDate: 'Nov 30, 2026',
    }
    this.createSheetOpen.set(true)
  }

  async saveNewDeal(): Promise<void> {
    if (!this.newDeal.title || !this.newDeal.company) {
      toast.error('Please enter quotation title and client company.')
      return
    }

    try {
      const created = await this.dealsApi.createDeal({
        title: this.newDeal.title,
        company: this.newDeal.company,
        value: Number(this.newDeal.value) || 35000,
        probability: Number(this.newDeal.probability) || 50,
        stage: (this.newDeal.stage as DealStage) || 'discovery',
        closeDate: this.newDeal.closeDate || 'Dec 15, 2026',
      })

      this.deals.update((list) => [created, ...list])
      toast.success(`Created quotation proposal "${created.title}".`)
      this.createSheetOpen.set(false)
    } catch {
      toast.error('Failed to create quotation proposal.')
    }
  }

  async addNote(deal: DealItem): Promise<void> {
    if (!this.newNoteText.trim()) return

    const note = this.newNoteText.trim()
    await this.dealsApi.addActivityNote(deal.id, note)

    const newAct = {
      date: 'Just now',
      type: 'note' as const,
      note,
    }

    this.deals.update((list) =>
      list.map((d) => (d.id === deal.id ? { ...d, activities: [newAct, ...d.activities] } : d))
    )

    this.activeDeal.update((d) => (d ? { ...d, activities: [newAct, ...d.activities] } : null))
    this.newNoteText = ''
    toast.success('Activity logged.')
  }

  async markAsWon(deal: DealItem): Promise<void> {
    await this.dealsApi.markAsWon(deal.id)
    this.deals.update((list) =>
      list.map((d) => (d.id === deal.id ? { ...d, stage: 'won', probability: 100 } : d))
    )
    toast.success(`Proposal "${deal.title}" marked as Won!`)
    this.detailSheetOpen.set(false)
  }

  exportPipeline(): void {
    const rows = [
      ['Deal ID', 'Title', 'Client Company', 'Value ($)', 'Win Probability (%)', 'Stage', 'Close Date', 'Owner'],
      ...this.deals().map((d) => [
        d.id,
        `"${d.title}"`,
        `"${d.company}"`,
        d.value.toString(),
        d.probability.toString(),
        d.stage,
        d.closeDate,
        `"${d.owner.name}"`,
      ]),
    ]
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `deals_pipeline_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('CRM proposals pipeline exported to CSV.')
  }
}
