import { Component, computed, signal, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucidePlus,
  lucideMoreHorizontal,
  lucideArrowUp,
  lucideArrowRight,
  lucideArrowDown,
  lucideAlertCircle,
  lucideCheckCircle2,
  lucideSearch,
  lucideCalendar,
  lucidePaperclip,
  lucideMessageSquare,
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
import { HlmAvatarImports } from '../../ui/avatar/hlm-avatar.components'
import { HlmSheetImports } from '../../ui/sheet/hlm-sheet.components'
import { HlmInputImports } from '../../ui/input/hlm-input.directive'
import { HlmSelectImports } from '../../ui/select/hlm-select.components'
import { getDisplayNameInitials } from '../../core/utils/initials'
import { toast } from 'ngx-sonner'

export interface KanbanCard {
  id: string
  title: string
  label: 'bug' | 'feature' | 'documentation'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'backlog' | 'todo' | 'in progress' | 'done'
  assignee: { name: string; avatar?: string }
  subtasks: { completed: number; total: number }
  dueDate?: string
  commentsCount?: number
}

@Component({
  selector: 'app-kanban',
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
    ...HlmAvatarImports,
    ...HlmSheetImports,
    ...HlmInputImports,
    ...HlmSelectImports,
  ],
  providers: [
    provideIcons({
      lucidePlus,
      lucideMoreHorizontal,
      lucideArrowUp,
      lucideArrowRight,
      lucideArrowDown,
      lucideAlertCircle,
      lucideCheckCircle2,
      lucideSearch,
      lucideCalendar,
      lucidePaperclip,
      lucideMessageSquare,
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

    <!-- Main Kanban Board -->
    <app-main [fixed]="true" class="space-y-4 flex flex-col h-[calc(100svh-4.5rem)] overflow-hidden">
      <!-- Title & Filters -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Kanban Sprint Board</h1>
          <p class="text-xs text-muted-foreground">
            Track agile sprints, move tasks across workflows, and prioritize backlog.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <!-- Search input -->
          <div class="relative w-48 sm:w-60">
            <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Search cards..."
              class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <button hlmBtn size="sm" (click)="openAddCard('todo')" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <!-- Kanban 4 Columns Grid -->
      <div class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto overflow-y-hidden pb-2 no-scrollbar">
        @for (col of columns; track col.id) {
          <div class="flex flex-col bg-muted/40 rounded-xl border border-border/80 p-3 h-full overflow-hidden">
            <!-- Column Header -->
            <div class="flex items-center justify-between pb-3 border-b border-border/60 shrink-0">
              <div class="flex items-center gap-2">
                <span class="size-2 rounded-full" [ngClass]="col.dotColor"></span>
                <h3 class="text-xs font-bold uppercase tracking-wider text-foreground">{{ col.title }}</h3>
                <span hlmBadge variant="secondary" class="text-[10px] px-1.5 py-0">
                  {{ getCardsForColumn(col.id).length }}
                </span>
              </div>

              <button
                hlmBtn
                variant="ghost"
                size="icon"
                (click)="openAddCard(col.id)"
                class="size-7 rounded-md cursor-pointer text-muted-foreground hover:text-foreground"
                aria-label="Add task to column"
              >
                <ng-icon name="lucidePlus" class="size-3.5" />
              </button>
            </div>

            <!-- Cards Scroll Area -->
            <div class="flex-1 overflow-y-auto space-y-3 py-3 no-scrollbar">
              @for (card of getCardsForColumn(col.id); track card.id) {
                <div
                  hlmCard
                  class="p-3.5 gap-2.5 rounded-lg border bg-card hover:border-primary/50 transition-all shadow-xs cursor-pointer select-none group"
                >
                  <!-- Card Header: Label & ID -->
                  <div class="flex items-center justify-between">
                    <span hlmBadge variant="outline" class="text-[9px] uppercase font-semibold">
                      {{ card.label }}
                    </span>
                    <span class="font-mono text-[10px] text-muted-foreground font-semibold">
                      {{ card.id }}
                    </span>
                  </div>

                  <!-- Card Title -->
                  <p class="text-xs font-semibold text-foreground leading-snug line-clamp-2">
                    {{ card.title }}
                  </p>

                  <!-- Card Subtask Progress -->
                  <div class="space-y-1">
                    <div class="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>Subtasks</span>
                      <span class="font-medium">{{ card.subtasks.completed }}/{{ card.subtasks.total }}</span>
                    </div>
                    <div class="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        class="h-full bg-primary rounded-full"
                        [style.width.%]="(card.subtasks.completed / card.subtasks.total) * 100"
                      ></div>
                    </div>
                  </div>

                  <!-- Card Footer: Priority, Move column & Assignee -->
                  <div class="flex items-center justify-between pt-1 border-t border-border/40 text-xs">
                    <div class="flex items-center gap-1.5">
                      <ng-icon [name]="getPriorityIcon(card.priority)" class="size-3.5 text-muted-foreground" />
                      <span class="text-[11px] capitalize text-muted-foreground font-medium">{{ card.priority }}</span>
                    </div>

                    <div class="flex items-center gap-2">
                      <!-- Quick Move Column Selector -->
                      <select
                        [value]="card.status"
                        (change)="moveCard(card, $event)"
                        class="h-6 text-[10px] font-medium bg-muted/60 rounded px-1.5 border border-border/60 outline-none cursor-pointer"
                      >
                        <option value="backlog">Backlog</option>
                        <option value="todo">Todo</option>
                        <option value="in progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>

                      <hlm-avatar class="size-6 shadow-2xs">
                        <img hlmAvatarImage [src]="card.assignee.avatar || ''" [alt]="card.assignee.name" />
                        <span hlmAvatarFallback class="text-[9px]">{{ initials(card.assignee.name) }}</span>
                      </hlm-avatar>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Add Task Column Button -->
            <button
              (click)="openAddCard(col.id)"
              class="w-full py-2 border border-dashed border-border/80 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto shrink-0"
            >
              <ng-icon name="lucidePlus" class="size-3" />
              <span>Add Card</span>
            </button>
          </div>
        }
      </div>
    </app-main>

    <!-- Create Card Side Sheet -->
    <hlm-sheet [isOpen]="addSheetOpen()" position="right" [size]="'sm'" (closed)="addSheetOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Add Kanban Task</h3>
        <p hlmSheetDescription>Create a new task card in your sprint board.</p>
      </div>

      <div class="space-y-4 py-4 flex-1">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-muted-foreground">Title</label>
          <input hlmInput [(ngModel)]="newCardTitle" placeholder="e.g. Implement WebSocket gateway" />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-muted-foreground">Column Status</label>
          <hlm-custom-select
            [options]="columnSelectOptions"
            [(ngModel)]="newCardStatus"
            placeholder="Select column"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-muted-foreground">Label</label>
          <hlm-custom-select
            [options]="labelSelectOptions"
            [(ngModel)]="newCardLabel"
            placeholder="Select label"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-muted-foreground">Priority</label>
          <hlm-custom-select
            [options]="prioritySelectOptions"
            [(ngModel)]="newCardPriority"
            placeholder="Select priority"
          />
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto">
        <button hlmBtn variant="outline" (click)="addSheetOpen.set(false)" class="cursor-pointer">Cancel</button>
        <button hlmBtn [disabled]="!newCardTitle.trim()" (click)="saveNewCard()" class="cursor-pointer">Create Card</button>
      </div>
    </hlm-sheet>
  `,
})
export class KanbanComponent {
  searchQuery = ''
  readonly addSheetOpen = signal<boolean>(false)
  newCardTitle = ''
  newCardStatus: any = 'todo'
  newCardLabel: any = 'feature'
  newCardPriority: any = 'medium'

  readonly columns = [
    { id: 'backlog', title: 'Backlog', dotColor: 'bg-muted-foreground' },
    { id: 'todo', title: 'To Do', dotColor: 'bg-sky-500' },
    { id: 'in progress', title: 'In Progress', dotColor: 'bg-amber-500' },
    { id: 'done', title: 'Done', dotColor: 'bg-emerald-500' },
  ]

  readonly cards = signal<KanbanCard[]>([
    {
      id: 'TASK-1024',
      title: 'Implement OAuth 2.0 authentication flow with PKCE support',
      label: 'feature',
      priority: 'high',
      status: 'in progress',
      assignee: { name: 'Sat Naing', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      subtasks: { completed: 3, total: 4 },
    },
    {
      id: 'TASK-2048',
      title: 'Fix responsive table overflow on mobile viewports',
      label: 'bug',
      priority: 'critical',
      status: 'todo',
      assignee: { name: 'Alex John', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      subtasks: { completed: 1, total: 2 },
    },
    {
      id: 'TASK-3096',
      title: 'Write developer integration guide for Webhook endpoints',
      label: 'documentation',
      priority: 'medium',
      status: 'backlog',
      assignee: { name: 'Sarah Miller', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      subtasks: { completed: 0, total: 3 },
    },
    {
      id: 'TASK-4012',
      title: 'Refactor ThemeService with modern Angular Signals',
      label: 'feature',
      priority: 'high',
      status: 'done',
      assignee: { name: 'Sat Naing', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      subtasks: { completed: 5, total: 5 },
    },
    {
      id: 'TASK-5120',
      title: 'Optimize CSS bundle sizes and purge unused Tailwind utility classes',
      label: 'feature',
      priority: 'medium',
      status: 'in progress',
      assignee: { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
      subtasks: { completed: 2, total: 3 },
    },
    {
      id: 'TASK-6240',
      title: 'Design high-fidelity invoice PDF export template',
      label: 'feature',
      priority: 'low',
      status: 'todo',
      assignee: { name: 'Olivia Martin', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80' },
      subtasks: { completed: 0, total: 2 },
    },
  ])

  readonly columnSelectOptions = [
    { label: 'Backlog', value: 'backlog' },
    { label: 'To Do', value: 'todo' },
    { label: 'In Progress', value: 'in progress' },
    { label: 'Done', value: 'done' },
  ]

  readonly labelSelectOptions = [
    { label: 'Feature', value: 'feature' },
    { label: 'Bug', value: 'bug' },
    { label: 'Documentation', value: 'documentation' },
  ]

  readonly prioritySelectOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ]

  getCardsForColumn(colId: string): KanbanCard[] {
    const q = this.searchQuery.toLowerCase().trim()
    return this.cards().filter((c) => {
      const matchesCol = c.status === colId
      if (!q) return matchesCol
      return matchesCol && (c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q))
    })
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'critical': return 'lucideAlertCircle'
      case 'high': return 'lucideArrowUp'
      case 'medium': return 'lucideArrowRight'
      default: return 'lucideArrowDown'
    }
  }

  moveCard(card: KanbanCard, event: Event): void {
    const select = event.target as HTMLSelectElement
    const newStatus = select.value as any
    this.cards.update((list) =>
      list.map((c) => (c.id === card.id ? { ...c, status: newStatus } : c))
    )
    toast.success(`Card ${card.id} moved to ${newStatus}`)
  }

  openAddCard(columnId: string): void {
    this.newCardStatus = columnId
    this.newCardTitle = ''
    this.addSheetOpen.set(true)
  }

  saveNewCard(): void {
    if (!this.newCardTitle.trim()) return
    const newCard: KanbanCard = {
      id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: this.newCardTitle,
      status: this.newCardStatus,
      label: this.newCardLabel,
      priority: this.newCardPriority,
      assignee: { name: 'Sat Naing', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      subtasks: { completed: 0, total: 3 },
    }

    this.cards.update((list) => [newCard, ...list])
    this.addSheetOpen.set(false)
    toast.success('New card added to Kanban board!')
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
