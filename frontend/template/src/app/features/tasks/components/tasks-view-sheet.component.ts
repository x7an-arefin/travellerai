import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCopy,
  lucideCheck,
  lucideEdit,
  lucideTrash2,
  lucideCircle,
  lucideTimer,
  lucideCheckCircle,
  lucideCircleOff,
  lucideHelpCircle,
  lucideArrowUp,
  lucideArrowRight,
  lucideArrowDown,
  lucideAlertCircle,
  lucideUser,
  lucideCalendar,
  lucideTag,
  lucideCheckSquare,
  lucideMessageSquare,
  lucidePlus,
  lucideSend,
  lucideClock,
  lucideExternalLink,
  lucideMoreHorizontal,
  lucideShare2,
} from '@ng-icons/lucide'
import { TasksService } from '../services/tasks.service'
import { Task } from '../data/schema'
import { labels, priorities, statuses } from '../data/data'
import { HlmSheetImports } from '@ui/sheet/hlm-sheet.components'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { HlmBadgeImports } from '@ui/badge/hlm-badge.directive'
import { HlmMenuImports } from '@ui/dropdown-menu/hlm-menu.components'
import { HlmCheckboxImports } from '@ui/checkbox/hlm-checkbox.component'
import { toast } from 'ngx-sonner'

interface Subtask {
  id: string
  title: string
  completed: boolean
}

interface ActivityLog {
  id: string
  user: string
  avatar: string
  action: string
  time: string
}

@Component({
  selector: 'app-tasks-view-sheet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmMenuImports,
    ...HlmCheckboxImports,
  ],
  providers: [
    provideIcons({
      lucideCopy,
      lucideCheck,
      lucideEdit,
      lucideTrash2,
      lucideCircle,
      lucideTimer,
      lucideCheckCircle,
      lucideCircleOff,
      lucideHelpCircle,
      lucideArrowUp,
      lucideArrowRight,
      lucideArrowDown,
      lucideAlertCircle,
      lucideUser,
      lucideCalendar,
      lucideTag,
      lucideCheckSquare,
      lucideMessageSquare,
      lucidePlus,
      lucideSend,
      lucideClock,
      lucideExternalLink,
      lucideMoreHorizontal,
      lucideShare2,
    }),
  ],
  template: `
    <hlm-sheet
      [isOpen]="tasksService.viewSheetOpen()"
      position="right"
      size="md"
      (closed)="tasksService.closeViewSheet()"
    >
      @if (task(); as t) {
        <!-- Header -->
        <div hlmSheetHeader class="space-y-2">
          <div class="flex items-center justify-between gap-3 pr-8">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono text-xs font-semibold">
                {{ t.id }}
              </span>
              <button
                type="button"
                hlmBtn
                variant="ghost"
                size="icon"
                class="size-7 cursor-pointer"
                (click)="copyTaskId(t.id)"
                title="Copy Task ID"
              >
                <ng-icon name="lucideCopy" class="size-3.5 text-muted-foreground" />
              </button>
            </div>

            <!-- Header Quick Actions -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                hlmBtn
                variant="outline"
                size="sm"
                class="gap-1.5 cursor-pointer text-xs"
                (click)="onEditTask(t)"
              >
                <ng-icon name="lucideEdit" class="size-3.5" />
                <span>Edit Task</span>
              </button>

              <button
                type="button"
                hlmBtn
                variant="ghost"
                size="icon"
                class="size-8 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                (click)="onDeleteTask(t)"
                title="Delete Task"
              >
                <ng-icon name="lucideTrash2" class="size-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Scrollable Body Content -->
        <div class="flex flex-col gap-6 py-4">
          <!-- Title & Labels Header -->
          <div class="space-y-3">
            <div class="flex items-center gap-2 flex-wrap">
              <!-- Label Badge -->
              <span
                hlmBadge
                [variant]="getLabelVariant(t.label)"
                class="text-xs font-semibold uppercase px-2.5 py-0.5"
              >
                {{ t.label }}
              </span>

              <!-- Status Badge & Selector -->
              <hlm-dropdown-menu side="auto">
                <button
                  hlmMenuTrigger
                  type="button"
                  class="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border border-border bg-card hover:bg-accent cursor-pointer transition-colors"
                >
                  <ng-icon [name]="getStatusIcon(t.status)" class="size-3.5 text-muted-foreground shrink-0" />
                  <span class="capitalize">{{ t.status }}</span>
                </button>
                <div class="w-44 p-1">
                  <div hlmMenuLabel class="text-[11px] font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">
                    Change Status
                  </div>
                  <div hlmMenuSeparator></div>
                  @for (s of statuses; track s.value) {
                    <button
                      hlmMenuItem
                      (click)="updateStatus(t, s.value)"
                      class="flex items-center justify-between gap-2 px-2.5 py-1.5 text-xs font-medium cursor-pointer"
                      [class.bg-accent]="t.status === s.value"
                    >
                      <div class="flex items-center gap-2">
                        <ng-icon [name]="s.icon" class="size-3.5 text-muted-foreground" />
                        <span>{{ s.label }}</span>
                      </div>
                      @if (t.status === s.value) {
                        <ng-icon name="lucideCheck" class="size-3.5 text-primary" />
                      }
                    </button>
                  }
                </div>
              </hlm-dropdown-menu>

              <!-- Priority Badge & Selector -->
              <hlm-dropdown-menu side="auto">
                <button
                  hlmMenuTrigger
                  type="button"
                  class="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border border-border bg-card hover:bg-accent cursor-pointer transition-colors"
                >
                  <ng-icon [name]="getPriorityIcon(t.priority)" class="size-3.5 text-muted-foreground shrink-0" />
                  <span class="capitalize">{{ t.priority }} priority</span>
                </button>
                <div class="w-44 p-1">
                  <div hlmMenuLabel class="text-[11px] font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">
                    Set Priority
                  </div>
                  <div hlmMenuSeparator></div>
                  @for (p of priorities; track p.value) {
                    <button
                      hlmMenuItem
                      (click)="updatePriority(t, p.value)"
                      class="flex items-center justify-between gap-2 px-2.5 py-1.5 text-xs font-medium cursor-pointer"
                      [class.bg-accent]="t.priority === p.value"
                    >
                      <div class="flex items-center gap-2">
                        <ng-icon [name]="p.icon" class="size-3.5 text-muted-foreground" />
                        <span>{{ p.label }}</span>
                      </div>
                      @if (t.priority === p.value) {
                        <ng-icon name="lucideCheck" class="size-3.5 text-primary" />
                      }
                    </button>
                  }
                </div>
              </hlm-dropdown-menu>
            </div>

            <!-- Task Title -->
            <h2 class="text-xl font-bold text-foreground leading-snug">
              {{ t.title }}
            </h2>
          </div>

          <!-- Description Box -->
          <div class="space-y-2">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <span>Description</span>
            </h4>
            <div class="p-4 rounded-lg border border-border/80 bg-muted/30 text-sm text-foreground/90 leading-relaxed min-h-[80px]">
              @if (t.description) {
                <p class="whitespace-pre-wrap">{{ t.description }}</p>
              } @else {
                <p class="text-muted-foreground italic text-xs">
                  No detailed description provided for this task yet.
                </p>
              }
            </div>
          </div>

          <!-- Key Details Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-lg border border-border bg-card">
            <!-- Reporter -->
            <div class="space-y-1">
              <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">Reporter</span>
              <div class="flex items-center gap-1.5">
                <div class="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                  JS
                </div>
                <span class="text-xs font-medium text-foreground">John Doe</span>
              </div>
            </div>

            <!-- Assignee -->
            <div class="space-y-1">
              <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">Assignee</span>
              <div class="flex items-center gap-1.5">
                <div class="size-5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold">
                  SK
                </div>
                <span class="text-xs font-medium text-foreground">Sarah Connor</span>
              </div>
            </div>

            <!-- Created Date -->
            <div class="space-y-1">
              <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">Created</span>
              <div class="flex items-center gap-1.5 text-xs text-foreground">
                <ng-icon name="lucideCalendar" class="size-3.5 text-muted-foreground" />
                <span>Today at 10:42 AM</span>
              </div>
            </div>
          </div>

          <!-- Subtasks / Checklist Section -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <ng-icon name="lucideCheckSquare" class="size-3.5" />
                <span>Subtasks ({{ completedSubtasksCount() }}/{{ subtasks().length }})</span>
              </h4>

              <!-- Progress Indicator -->
              <span class="text-xs text-muted-foreground font-mono">
                {{ getSubtaskProgress() }}%
              </span>
            </div>

            <!-- Progress Bar -->
            <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                class="h-full bg-primary transition-all duration-300 rounded-full"
                [style.width.%]="getSubtaskProgress()"
              ></div>
            </div>

            <!-- Checklist Items -->
            <div class="space-y-1.5 border border-border rounded-lg p-2.5 bg-card">
              @for (st of subtasks(); track st.id) {
                <label class="flex items-center gap-2.5 p-2 rounded-md hover:bg-accent/50 cursor-pointer transition-colors">
                  <hlm-checkbox
                    [isChecked]="st.completed"
                    (checkedChange)="toggleSubtask(st.id)"
                  />
                  <span
                    class="text-xs font-medium transition-all"
                    [class.line-through]="st.completed"
                    [class.text-muted-foreground]="st.completed"
                  >
                    {{ st.title }}
                  </span>
                </label>
              }

              <!-- Add New Subtask Input -->
              <div class="flex items-center gap-2 pt-2 border-t border-border mt-2">
                <input
                  type="text"
                  [(ngModel)]="newSubtaskTitle"
                  (keyup.enter)="addSubtask()"
                  placeholder="Add a new checklist item..."
                  class="flex-1 bg-transparent px-2 py-1 text-xs border border-border/60 rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <button
                  type="button"
                  hlmBtn
                  size="sm"
                  variant="outline"
                  class="h-7 px-2.5 text-xs gap-1 cursor-pointer"
                  (click)="addSubtask()"
                >
                  <ng-icon name="lucidePlus" class="size-3" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Activity & Comments Section -->
          <div class="space-y-3">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <ng-icon name="lucideMessageSquare" class="size-3.5" />
              <span>Activity & Comments</span>
            </h4>

            <div class="space-y-3 border border-border rounded-lg p-3 bg-card">
              @for (log of activityLogs(); track log.id) {
                <div class="flex items-start gap-2.5 text-xs">
                  <div class="size-6 rounded-full bg-muted flex items-center justify-center font-bold text-[10px] shrink-0 text-muted-foreground mt-0.5">
                    {{ log.avatar }}
                  </div>
                  <div class="flex-1">
                    <p class="text-foreground">
                      <span class="font-semibold">{{ log.user }}</span>
                      <span class="text-muted-foreground ml-1">{{ log.action }}</span>
                    </p>
                    <span class="text-[10px] text-muted-foreground">{{ log.time }}</span>
                  </div>
                </div>
              }

              <!-- Add Comment Input -->
              <div class="flex items-center gap-2 pt-2 border-t border-border mt-2">
                <input
                  type="text"
                  [(ngModel)]="newCommentText"
                  (keyup.enter)="addComment()"
                  placeholder="Write a comment..."
                  class="flex-1 bg-transparent px-2.5 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <button
                  type="button"
                  hlmBtn
                  size="sm"
                  class="h-8 px-3 text-xs gap-1 cursor-pointer"
                  (click)="addComment()"
                >
                  <ng-icon name="lucideSend" class="size-3" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div hlmSheetFooter class="border-t border-border pt-3">
          <div class="flex items-center justify-between w-full">
            <button
              type="button"
              hlmBtn
              [variant]="t.status === 'done' ? 'outline' : 'default'"
              size="sm"
              class="gap-1.5 cursor-pointer text-xs"
              (click)="toggleTaskComplete(t)"
            >
              <ng-icon [name]="t.status === 'done' ? 'lucideCircle' : 'lucideCheckCircle'" class="size-3.5" />
              <span>{{ t.status === 'done' ? 'Reopen Task' : 'Mark as Done' }}</span>
            </button>

            <div class="flex items-center gap-2">
              <button
                type="button"
                hlmBtn
                variant="outline"
                size="sm"
                class="cursor-pointer text-xs"
                (click)="tasksService.closeViewSheet()"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }
    </hlm-sheet>
  `,
})
export class TasksViewSheetComponent {
  readonly tasksService = inject(TasksService)
  readonly statuses = statuses
  readonly priorities = priorities
  readonly labels = labels

  task = this.tasksService.viewTask

  newSubtaskTitle = ''
  newCommentText = ''

  subtasks = signal<Subtask[]>([
    { id: '1', title: 'Review functional requirement specs', completed: true },
    { id: '2', title: 'Implement logic & unit test coverage', completed: false },
    { id: '3', title: 'Perform cross-browser QA verification', completed: false },
  ])

  activityLogs = signal<ActivityLog[]>([
    { id: '1', user: 'System', avatar: 'SYS', action: 'created this task', time: '2 hours ago' },
    { id: '2', user: 'Sarah Connor', avatar: 'SC', action: 'updated priority to high', time: '1 hour ago' },
  ])

  completedSubtasksCount(): number {
    return this.subtasks().filter((s) => s.completed).length
  }

  getSubtaskProgress(): number {
    const list = this.subtasks()
    if (list.length === 0) return 0
    return Math.round((this.completedSubtasksCount() / list.length) * 100)
  }

  toggleSubtask(id: string): void {
    this.subtasks.update((items) =>
      items.map((st) => (st.id === id ? { ...st, completed: !st.completed } : st))
    )
  }

  addSubtask(): void {
    const title = this.newSubtaskTitle.trim()
    if (!title) return
    this.subtasks.update((items) => [
      ...items,
      { id: Date.now().toString(), title, completed: false },
    ])
    this.newSubtaskTitle = ''
    toast.success('Subtask added!')
  }

  addComment(): void {
    const text = this.newCommentText.trim()
    if (!text) return
    this.activityLogs.update((logs) => [
      ...logs,
      {
        id: Date.now().toString(),
        user: 'You',
        avatar: 'ME',
        action: `commented: "${text}"`,
        time: 'Just now',
      },
    ])
    this.newCommentText = ''
    toast.success('Comment added!')
  }

  copyTaskId(id: string): void {
    navigator.clipboard.writeText(id)
    toast.success(`Copied ${id} to clipboard!`)
  }

  getStatusIcon(status: string): string {
    const found = statuses.find((s) => s.value === status)
    return found ? found.icon : 'lucideCircle'
  }

  getPriorityIcon(priority: string): string {
    const found = priorities.find((p) => p.value === priority)
    return found ? found.icon : 'lucideArrowRight'
  }

  getLabelVariant(label: string): 'default' | 'secondary' | 'outline' | 'destructive' {
    if (label === 'bug') return 'destructive'
    if (label === 'feature') return 'default'
    return 'outline'
  }

  updateStatus(task: Task, status: any): void {
    this.tasksService.updateTask(task.id, { status })
    this.activityLogs.update((logs) => [
      ...logs,
      {
        id: Date.now().toString(),
        user: 'You',
        avatar: 'ME',
        action: `changed status to "${status}"`,
        time: 'Just now',
      },
    ])
    toast.success(`Status changed to ${status}`)
  }

  updatePriority(task: Task, priority: any): void {
    this.tasksService.updateTask(task.id, { priority })
    this.activityLogs.update((logs) => [
      ...logs,
      {
        id: Date.now().toString(),
        user: 'You',
        avatar: 'ME',
        action: `changed priority to "${priority}"`,
        time: 'Just now',
      },
    ])
    toast.success(`Priority updated to ${priority}`)
  }

  toggleTaskComplete(task: Task): void {
    const newStatus = task.status === 'done' ? 'todo' : 'done'
    this.updateStatus(task, newStatus)
  }

  onEditTask(task: Task): void {
    this.tasksService.closeViewSheet()
    this.tasksService.openEdit(task)
  }

  onDeleteTask(task: Task): void {
    this.tasksService.closeViewSheet()
    this.tasksService.deleteTask(task.id)
    toast.success(`Task ${task.id} deleted.`)
  }
}
