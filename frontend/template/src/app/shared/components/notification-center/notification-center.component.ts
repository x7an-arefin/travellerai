import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideBell,
  lucideCheckCheck,
  lucideListTodo,
  lucideCreditCard,
  lucideSparkles,
  lucideUserPlus,
  lucideTrash2,
} from '@ng-icons/lucide'
import { HlmSheetImports } from '@ui/sheet/hlm-sheet.components'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { HlmBadgeImports } from '@ui/badge/hlm-badge.directive'
import { HlmAvatarImports } from '@ui/avatar/hlm-avatar.components'
import { toast } from 'ngx-sonner'

export interface NotificationItem {
  id: string
  title: string
  description: string
  timestamp: string
  read: boolean
  type: 'task' | 'billing' | 'system' | 'user'
  avatar?: string
}

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmAvatarImports,
  ],
  providers: [
    provideIcons({
      lucideBell,
      lucideCheckCheck,
      lucideListTodo,
      lucideCreditCard,
      lucideSparkles,
      lucideUserPlus,
      lucideTrash2,
    }),
  ],
  template: `
    <!-- Notification Bell Trigger Button in Header -->
    <button
      hlmBtn
      variant="ghost"
      size="icon"
      class="relative size-8 sm:size-9 rounded-full cursor-pointer"
      (click)="isOpen.set(true)"
      aria-label="Open notifications"
    >
      <ng-icon name="lucideBell" class="size-4 sm:size-4.5 text-foreground" />
      @if (unreadCount() > 0) {
        <span class="absolute top-1 right-1 flex size-2.5">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span class="relative inline-flex size-2.5 rounded-full bg-primary"></span>
        </span>
      }
    </button>

    <!-- Slide-out Notification Center Drawer -->
    <hlm-sheet [isOpen]="isOpen()" position="right" (closed)="isOpen.set(false)" class="w-full sm:max-w-md flex flex-col">
      <div hlmSheetHeader class="pb-3 border-b border-border">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h3 hlmSheetTitle class="text-base font-semibold">Notifications</h3>
            @if (unreadCount() > 0) {
              <span hlmBadge variant="secondary" class="text-[10px] px-1.5 py-0.2">
                {{ unreadCount() }} new
              </span>
            }
          </div>

          @if (unreadCount() > 0) {
            <button
              hlmBtn
              variant="ghost"
              size="sm"
              (click)="markAllAsRead()"
              class="h-7 text-xs gap-1 cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <ng-icon name="lucideCheckCheck" class="size-3.5" />
              <span>Mark read</span>
            </button>
          }
        </div>

        <!-- Filter Segmented Tabs -->
        <div class="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar">
          <button
            type="button"
            (click)="activeTab.set('all')"
            class="px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
            [class.bg-accent]="activeTab() === 'all'"
            [class.text-foreground]="activeTab() === 'all'"
            [class.text-muted-foreground]="activeTab() !== 'all'"
          >
            All ({{ notifications().length }})
          </button>

          <button
            type="button"
            (click)="activeTab.set('unread')"
            class="px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
            [class.bg-accent]="activeTab() === 'unread'"
            [class.text-foreground]="activeTab() === 'unread'"
            [class.text-muted-foreground]="activeTab() !== 'unread'"
          >
            Unread ({{ unreadCount() }})
          </button>

          <button
            type="button"
            (click)="activeTab.set('task')"
            class="px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
            [class.bg-accent]="activeTab() === 'task'"
            [class.text-foreground]="activeTab() === 'task'"
            [class.text-muted-foreground]="activeTab() !== 'task'"
          >
            Tasks
          </button>

          <button
            type="button"
            (click)="activeTab.set('system')"
            class="px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
            [class.bg-accent]="activeTab() === 'system'"
            [class.text-foreground]="activeTab() === 'system'"
            [class.text-muted-foreground]="activeTab() !== 'system'"
          >
            System
          </button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="flex-1 overflow-y-auto divide-y divide-border/60 no-scrollbar py-2">
        @if (filteredNotifications().length === 0) {
          <div class="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <ng-icon name="lucideCheckCheck" class="size-10 mb-2 opacity-30" />
            <p class="text-xs font-medium">All caught up! No notifications.</p>
          </div>
        }

        @for (item of filteredNotifications(); track item.id) {
          <div
            class="group flex items-start gap-3 p-3.5 transition-colors hover:bg-muted/40 text-left relative"
            [class.bg-muted/20]="!item.read"
          >
            <!-- Type Icon Badge -->
            <div
              (click)="markAsRead(item.id)"
              class="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-background shadow-2xs mt-0.5 cursor-pointer"
            >
              @switch (item.type) {
                @case ('task') {
                  <ng-icon name="lucideListTodo" class="size-4 text-sky-500" />
                }
                @case ('billing') {
                  <ng-icon name="lucideCreditCard" class="size-4 text-emerald-500" />
                }
                @case ('user') {
                  <ng-icon name="lucideUserPlus" class="size-4 text-violet-500" />
                }
                @default {
                  <ng-icon name="lucideSparkles" class="size-4 text-amber-500" />
                }
              }
            </div>

            <!-- Content -->
            <div (click)="markAsRead(item.id)" class="flex-1 space-y-1 overflow-hidden cursor-pointer">
              <div class="flex items-center justify-between gap-1">
                <p class="text-xs font-semibold text-foreground truncate" [class.font-bold]="!item.read">
                  {{ item.title }}
                </p>
                @if (!item.read) {
                  <span class="size-2 rounded-full bg-primary shrink-0"></span>
                }
              </div>
              <p class="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {{ item.description }}
              </p>
              <p class="text-[10px] text-muted-foreground/80 pt-0.5">
                {{ item.timestamp }}
              </p>
            </div>

            <!-- Dismiss Button -->
            <button
              type="button"
              (click)="dismissNotification(item.id, $event)"
              class="opacity-0 group-hover:opacity-100 transition-opacity size-6 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Dismiss notification"
            >
              <ng-icon name="lucideTrash2" class="size-3.5" />
            </button>
          </div>
        }
      </div>

      <div hlmSheetFooter class="border-t border-border pt-3 mt-auto">
        <button
          hlmBtn
          variant="outline"
          size="sm"
          (click)="clearAll()"
          class="w-full text-xs gap-1.5 cursor-pointer"
        >
          <ng-icon name="lucideTrash2" class="size-3.5" />
          <span>Clear all notifications</span>
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class NotificationCenterComponent {
  readonly isOpen = signal<boolean>(false)
  readonly activeTab = signal<'all' | 'unread' | 'task' | 'system'>('all')

  readonly notifications = signal<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Task Assignment',
      description: 'You have been assigned to TASK-8782: Quantifying SSD pixel drivers.',
      timestamp: '5m ago',
      read: false,
      type: 'task',
    },
    {
      id: 'notif-2',
      title: 'Payment Received',
      description: 'Invoice #INV-2026-088 of $1,999.00 paid successfully by Olivia Martin.',
      timestamp: '1h ago',
      read: false,
      type: 'billing',
    },
    {
      id: 'notif-3',
      title: 'Team Member Joined',
      description: 'Alex John accepted your invitation to join Acme Inc workspace.',
      timestamp: '3h ago',
      read: false,
      type: 'user',
    },
    {
      id: 'notif-4',
      title: 'Spartan UI Update',
      description: 'New copy-paste primitives and Tailwind v4 themes now available.',
      timestamp: '1d ago',
      read: true,
      type: 'system',
    },
    {
      id: 'notif-5',
      title: 'Monthly Analytics Report',
      description: 'Your July analytics report is ready for download in Dashboard.',
      timestamp: '2d ago',
      read: true,
      type: 'system',
    },
  ])

  readonly unreadCount = computed(() => {
    return this.notifications().filter((n) => !n.read).length
  })

  readonly filteredNotifications = computed(() => {
    const list = this.notifications()
    const tab = this.activeTab()
    if (tab === 'unread') return list.filter((n) => !n.read)
    if (tab === 'task') return list.filter((n) => n.type === 'task')
    if (tab === 'system') return list.filter((n) => n.type === 'system')
    return list
  })

  markAllAsRead(): void {
    this.notifications.update((list) => list.map((n) => ({ ...n, read: true })))
    toast.success('All notifications marked as read.')
  }

  markAsRead(id: string): void {
    this.notifications.update((list) =>
      list.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  dismissNotification(id: string, event: Event): void {
    event.stopPropagation()
    this.notifications.update((list) => list.filter((n) => n.id !== id))
    toast.info('Notification dismissed.')
  }

  clearAll(): void {
    this.notifications.set([])
    toast.info('Notifications cleared.')
  }
}
