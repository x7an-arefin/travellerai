import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideSearch, lucideCheck, lucideX } from '@ng-icons/lucide'
import { HlmSheetImports } from '../../../ui/sheet/hlm-sheet.components'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmAvatarImports } from '../../../ui/avatar/hlm-avatar.components'
import { Conversation } from '../data/chat.types'
import { getDisplayNameInitials } from '../../../core/utils/initials'

@Component({
  selector: 'app-new-chat-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmAvatarImports,
  ],
  providers: [provideIcons({ lucideSearch, lucideCheck, lucideX })],
  template: `
    <!-- Opening in HlmSheet side drawer with size="sm" -->
    <hlm-sheet
      [isOpen]="open"
      position="right"
      [size]="'sm'"
      (closed)="close()"
      class="w-full"
    >
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>New Message</h3>
        <p hlmSheetDescription>Search for team members to start a new chat conversation.</p>
      </div>

      <div class="space-y-4 py-3 flex-1 flex flex-col">
        <!-- Selected recipients tokens -->
        <div class="flex flex-wrap items-center gap-1.5 min-h-8">
          <span class="text-xs text-muted-foreground font-medium mr-1">To:</span>
          @for (user of selectedUsers(); track user.id) {
            <span hlmBadge class="gap-1 pr-1">
              {{ user.fullName }}
              <button
                type="button"
                (click)="toggleUser(user)"
                class="size-3.5 rounded-full hover:bg-black/20 flex items-center justify-center cursor-pointer"
              >
                <ng-icon name="lucideX" class="size-2.5" />
              </button>
            </span>
          }
        </div>

        <!-- Search user input -->
        <div class="relative">
          <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search people by name or username..."
            class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <!-- User list -->
        <div class="flex-1 max-h-72 overflow-y-auto divide-y divide-border border rounded-xl no-scrollbar">
          @for (user of filteredUsers(); track user.id) {
            <button
              type="button"
              (click)="toggleUser(user)"
              class="flex w-full items-center justify-between p-3 text-left hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div class="flex items-center gap-2.5">
                <hlm-avatar class="size-8.5">
                  <img hlmAvatarImage [src]="user.profile" [alt]="user.fullName" />
                  <span hlmAvatarFallback>{{ initials(user.fullName) }}</span>
                </hlm-avatar>
                <div>
                  <div class="text-xs font-semibold text-foreground">{{ user.fullName }}</div>
                  <div class="text-[11px] text-muted-foreground">&#64;{{ user.username }} • {{ user.title }}</div>
                </div>
              </div>

              @if (isSelected(user)) {
                <ng-icon name="lucideCheck" class="size-4 text-primary font-bold" />
              }
            </button>
          }
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto">
        <button
          type="button"
          hlmBtn
          [disabled]="selectedUsers().length === 0"
          (click)="startChat()"
          class="w-full cursor-pointer text-xs"
        >
          Start Conversation
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class NewChatDialogComponent {
  @Input() open: boolean = false
  @Input() availableUsers: Conversation[] = []
  @Output() readonly openChange = new EventEmitter<boolean>()
  @Output() readonly conversationCreated = new EventEmitter<Conversation>()

  readonly selectedUsers = signal<Conversation[]>([])
  searchQuery = ''

  readonly filteredUsers = computed(() => {
    const q = this.searchQuery.toLowerCase().trim()
    if (!q) return this.availableUsers
    return this.availableUsers.filter(
      (u) => u.fullName.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)
    )
  })

  isSelected(user: Conversation): boolean {
    return this.selectedUsers().some((u) => u.id === user.id)
  }

  toggleUser(user: Conversation): void {
    if (this.isSelected(user)) {
      this.selectedUsers.update((list) => list.filter((u) => u.id !== user.id))
    } else {
      this.selectedUsers.update((list) => [...list, user])
    }
  }

  startChat(): void {
    const first = this.selectedUsers()[0]
    if (first) {
      this.conversationCreated.emit(first)
    }
    this.close()
  }

  close(): void {
    this.open = false
    this.openChange.emit(false)
    this.selectedUsers.set([])
    this.searchQuery = ''
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
