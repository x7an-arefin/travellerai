import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideMap,
  lucideMilestone,
  lucideFlag,
  lucideCompass,
  lucidePlus,
  lucideSearch,
  lucideArrowUp,
  lucideCheck,
  lucideClock,
  lucideSparkles,
  lucideTag,
  lucideGitBranch,
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
import { toast } from 'ngx-sonner'

export interface RoadmapItem {
  id: string
  title: string
  description: string
  category: string
  status: 'review' | 'planned' | 'in_progress' | 'completed'
  upvotes: number
  hasVoted?: boolean
  eta: string
}

export interface ChangelogRelease {
  version: string
  date: string
  tag: 'Major Release' | 'Feature Update' | 'Patch'
  highlights: { type: 'feature' | 'improvement' | 'fix'; text: string }[]
}

@Component({
  selector: 'app-roadmap',
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
      lucideMap,
      lucideMilestone,
      lucideFlag,
      lucideCompass,
      lucidePlus,
      lucideSearch,
      lucideArrowUp,
      lucideCheck,
      lucideClock,
      lucideSparkles,
      lucideTag,
      lucideGitBranch,
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
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Product Roadmap & Release Changelog</h1>
          <p class="text-xs text-muted-foreground">Community-voted feature roadmap, quarterly engineering milestones, and version history.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn size="sm" (click)="openSubmitDrawer()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Submit Feature Request</span>
          </button>
        </div>
      </div>

      <!-- Mode Switcher Tabs -->
      <div class="flex items-center gap-2 border-b pb-3">
        <button
          type="button"
          (click)="viewTab.set('roadmap')"
          class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border"
          [class.bg-primary]="viewTab() === 'roadmap'"
          [class.text-primary-foreground]="viewTab() === 'roadmap'"
          [class.border-primary]="viewTab() === 'roadmap'"
          [class.bg-card]="viewTab() !== 'roadmap'"
          [class.text-muted-foreground]="viewTab() !== 'roadmap'"
        >
          Quarterly Roadmap Board
        </button>
        <button
          type="button"
          (click)="viewTab.set('changelog')"
          class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border"
          [class.bg-primary]="viewTab() === 'changelog'"
          [class.text-primary-foreground]="viewTab() === 'changelog'"
          [class.border-primary]="viewTab() === 'changelog'"
          [class.bg-card]="viewTab() !== 'changelog'"
          [class.text-muted-foreground]="viewTab() !== 'changelog'"
        >
          Release Changelog Feed
        </button>
      </div>

      <!-- TAB 1: ROADMAP BOARD -->
      @if (viewTab() === 'roadmap') {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          @for (col of columns; track col.status) {
            <div class="rounded-xl border border-border bg-muted/20 p-3 space-y-3 flex flex-col min-h-[500px]">
              <!-- Column Header -->
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-foreground">{{ col.title }}</span>
                <span class="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                  {{ getItemsForStatus(col.status).length }}
                </span>
              </div>

              <!-- Feature Cards -->
              <div class="space-y-3 flex-1">
                @for (item of getItemsForStatus(col.status); track item.id) {
                  <div class="rounded-lg border border-border bg-card p-3.5 shadow-2xs hover:border-primary/40 transition-all duration-150 space-y-2.5">
                    <div class="flex items-center justify-between">
                      <span hlmBadge variant="outline" class="text-[10px]">{{ item.category }}</span>
                      <span class="text-[10px] text-muted-foreground font-mono">{{ item.eta }}</span>
                    </div>

                    <h4 class="font-bold text-xs text-foreground">{{ item.title }}</h4>
                    <p class="text-[11px] text-muted-foreground leading-relaxed">{{ item.description }}</p>

                    <!-- Upvote Button -->
                    <div class="pt-2 border-t border-border flex items-center justify-between">
                      <button
                        type="button"
                        (click)="toggleUpvote(item)"
                        class="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold transition-colors cursor-pointer border"
                        [class.bg-primary/10]="item.hasVoted"
                        [class.border-primary]="item.hasVoted"
                        [class.text-primary]="item.hasVoted"
                        [class.bg-muted/40]="!item.hasVoted"
                        [class.border-border]="!item.hasVoted"
                        [class.text-muted-foreground]="!item.hasVoted"
                      >
                        <ng-icon name="lucideArrowUp" class="size-3.5" />
                        <span>{{ item.upvotes }}</span>
                      </button>

                      <span class="text-[10px] text-muted-foreground">Community Backed</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      } @else {
        <!-- TAB 2: CHANGELOG RELEASES FEED -->
        <div class="max-w-3xl space-y-8 py-2">
          @for (rel of changelog; track rel.version) {
            <div class="relative pl-6 border-l-2 border-border space-y-3">
              <div class="size-3 rounded-full bg-primary absolute -left-[7px] top-1.5 ring-4 ring-background"></div>

              <div class="flex items-center gap-3">
                <h3 class="font-bold text-lg text-foreground font-mono">{{ rel.version }}</h3>
                <span hlmBadge variant="outline" class="text-xs">{{ rel.tag }}</span>
                <span class="text-xs text-muted-foreground">{{ rel.date }}</span>
              </div>

              <div hlmCard class="p-4 space-y-2.5 shadow-2xs">
                @for (h of rel.highlights; track h.text) {
                  <div class="flex items-start gap-2.5 text-xs">
                    @if (h.type === 'feature') {
                      <span class="rounded bg-emerald-500/10 text-emerald-600 border border-emerald-200 px-1.5 py-0.2 text-[10px] font-bold uppercase shrink-0">
                        Feature
                      </span>
                    } @else if (h.type === 'improvement') {
                      <span class="rounded bg-sky-500/10 text-sky-600 border border-sky-200 px-1.5 py-0.2 text-[10px] font-bold uppercase shrink-0">
                        Improvement
                      </span>
                    } @else {
                      <span class="rounded bg-amber-500/10 text-amber-600 border border-amber-200 px-1.5 py-0.2 text-[10px] font-bold uppercase shrink-0">
                        Bug Fix
                      </span>
                    }
                    <span class="text-foreground leading-relaxed">{{ h.text }}</span>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
    </app-main>

    <!-- Submit Feature Request Sheet (size="sm" = 1/3 screen width) -->
    <hlm-sheet [isOpen]="submitSheetOpen()" position="right" [size]="'sm'" (closed)="submitSheetOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Submit Feature Request</h3>
        <p hlmSheetDescription class="text-xs">Propose a new capability or UI component for the template roadmap.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Feature Title</label>
          <input
            type="text"
            [(ngModel)]="newFeature.title"
            placeholder="e.g. Multi-tenant Sub-account Switching"
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Category Domain</label>
          <hlm-custom-select
            [options]="categoryOptions"
            [ngModel]="newFeature.category"
            (valueChange)="newFeature.category = $event"
            placeholder="Select Category"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Detailed Description & Use Case</label>
          <textarea
            rows="5"
            [(ngModel)]="newFeature.description"
            placeholder="Explain why this feature is valuable and describe the ideal workflow..."
            class="w-full rounded-md border border-input bg-background p-2.5 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          ></textarea>
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="submitSheetOpen.set(false)" class="cursor-pointer text-xs">
          Cancel
        </button>
        <button hlmBtn (click)="saveFeature()" class="cursor-pointer text-xs">
          Submit to Roadmap
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class RoadmapComponent {
  readonly viewTab = signal<'roadmap' | 'changelog'>('roadmap')
  readonly submitSheetOpen = signal<boolean>(false)

  newFeature = {
    title: '',
    category: 'UI Components',
    description: '',
  }

  readonly columns = [
    { status: 'review', title: 'Under Review' },
    { status: 'planned', title: 'Planned (Q3)' },
    { status: 'in_progress', title: 'In Development' },
    { status: 'completed', title: 'Completed' },
  ]

  readonly categoryOptions: readonly SelectOption[] = [
    { label: 'UI Components', value: 'UI Components' },
    { label: 'AI & Automation', value: 'AI & Automation' },
    { label: 'Authentication & Security', value: 'Security' },
    { label: 'Integrations', value: 'Integrations' },
  ]

  readonly roadmapItems = signal<RoadmapItem[]>([
    {
      id: 'rd-1',
      title: 'PostgreSQL Realtime WebSocket Bridge',
      description: 'Live CDC stream subscriptions using Supabase and standard WebSocket handlers.',
      category: 'Integrations',
      status: 'in_progress',
      upvotes: 142,
      hasVoted: true,
      eta: 'Q3 2026',
    },
    {
      id: 'rd-2',
      title: 'Visual Drag-and-Drop Form Builder',
      description: 'Interactive low-code canvas for generating reactive JSON schemas and dynamic forms.',
      category: 'UI Components',
      status: 'planned',
      upvotes: 98,
      hasVoted: false,
      eta: 'Q4 2026',
    },
    {
      id: 'rd-3',
      title: 'Passkey & WebAuthn Biometric Support',
      category: 'Security',
      description: 'Passwordless device passkey registration with FIDO2 hardware security keys.',
      status: 'review',
      upvotes: 76,
      hasVoted: false,
      eta: 'Evaluating',
    },
    {
      id: 'rd-4',
      title: 'Angular Signals Spartan UI v2 Integration',
      category: 'UI Components',
      description: 'Full signal-based architecture with Zero native select tags and smooth exit physics.',
      status: 'completed',
      upvotes: 280,
      hasVoted: true,
      eta: 'Shipped',
    },
  ])

  readonly changelog: ChangelogRelease[] = [
    {
      version: 'v2.4.0',
      date: 'August 06, 2026',
      tag: 'Major Release',
      highlights: [
        { type: 'feature', text: 'Implemented AI Agent Studio, CRM Deals Pipeline, and Realtime Telemetry screens.' },
        { type: 'improvement', text: 'Optimized sheet exit animations to 280ms with full backdrop crossfade physics.' },
        { type: 'fix', text: 'Resolved table route sync navigation loop across paginated datasets.' },
      ],
    },
    {
      version: 'v2.3.1',
      date: 'July 28, 2026',
      tag: 'Patch',
      highlights: [
        { type: 'improvement', text: 'Upgraded Angular CDK to 21.2.0 and Tailwind CSS to v4.3.' },
        { type: 'fix', text: 'Corrected dropdown menu smart top-side calculation on dense mobile viewports.' },
      ],
    },
  ]

  getItemsForStatus(status: string): RoadmapItem[] {
    return this.roadmapItems().filter((item) => item.status === status)
  }

  toggleUpvote(item: RoadmapItem): void {
    this.roadmapItems.update((list) =>
      list.map((i) => {
        if (i.id === item.id) {
          const hasVoted = !i.hasVoted
          const upvotes = hasVoted ? i.upvotes + 1 : i.upvotes - 1
          return { ...i, hasVoted, upvotes }
        }
        return i
      })
    )
  }

  openSubmitDrawer(): void {
    this.newFeature = {
      title: '',
      category: 'UI Components',
      description: '',
    }
    this.submitSheetOpen.set(true)
  }

  saveFeature(): void {
    if (!this.newFeature.title) {
      toast.error('Please provide a feature title.')
      return
    }

    const item: RoadmapItem = {
      id: 'rd-' + (this.roadmapItems().length + 1),
      title: this.newFeature.title,
      description: this.newFeature.description || 'Community request awaiting evaluation.',
      category: this.newFeature.category,
      status: 'review',
      upvotes: 1,
      hasVoted: true,
      eta: 'Under Review',
    }

    this.roadmapItems.update((list) => [item, ...list])
    toast.success(`Feature request "${item.title}" submitted to roadmap!`)
    this.submitSheetOpen.set(false)
  }
}
