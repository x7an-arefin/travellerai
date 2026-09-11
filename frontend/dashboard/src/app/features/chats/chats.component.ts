import { Component, computed, signal, inject, PLATFORM_ID } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideSearch,
  lucideSend,
  lucidePaperclip,
  lucidePhone,
  lucideVideo,
  lucideMoreVertical,
  lucideArrowLeft,
  lucideMessagesSquare,
  lucideMic,
  lucideEdit,
  lucideImage,
  lucideX,
  lucidePlay,
  lucidePause,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmAvatarImports } from '../../ui/avatar/hlm-avatar.components'
import { HlmDialogImports } from '../../ui/dialog/hlm-dialog.components'
import { NewChatDialogComponent } from './components/new-chat.component'
import { Conversation, ChatMessage } from './data/chat.types'
import { mockConversations } from './data/convo.data'
import { getDisplayNameInitials } from '../../core/utils/initials'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    SearchComponent,
    ThemeSwitchComponent,
    ConfigDrawerComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmButtonImports,
    ...HlmAvatarImports,
    ...HlmDialogImports,
    NewChatDialogComponent,
  ],
  providers: [
    provideIcons({
      lucideSearch,
      lucideSend,
      lucidePaperclip,
      lucidePhone,
      lucideVideo,
      lucideMoreVertical,
      lucideArrowLeft,
      lucideMessagesSquare,
      lucideMic,
      lucideEdit,
      lucideImage,
      lucideX,
      lucidePlay,
      lucidePause,
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

    <!-- Main Chat Workspace -->
    <div class="flex flex-1 overflow-hidden h-[calc(100svh-4.5rem)]">
      <!-- Left Panel: Conversation List -->
      <div
        class="w-full md:w-80 border-r bg-card flex flex-col shrink-0"
        [class.hidden]="mobileActiveConvo() !== null"
        [class.md:flex]="true"
      >
        <!-- Chat Search Header -->
        <div class="p-3 border-b flex items-center gap-2">
          <div class="relative flex-1">
            <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Search conversations..."
              class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <button
            hlmBtn
            variant="ghost"
            size="icon"
            (click)="newChatOpen.set(true)"
            class="size-9 rounded-md cursor-pointer shrink-0"
            aria-label="New chat"
          >
            <ng-icon name="lucideEdit" class="size-4" />
          </button>
        </div>

        <!-- Conversations Stream -->
        <div class="flex-1 overflow-y-auto divide-y divide-border no-scrollbar">
          @for (convo of filteredConversations(); track convo.id) {
            <button
              type="button"
              (click)="selectConversation(convo)"
              class="flex w-full items-start gap-3 p-3.5 text-left transition-colors hover:bg-muted/50 cursor-pointer"
              [class.bg-muted]="selectedConversation()?.id === convo.id"
            >
              <hlm-avatar class="size-10 shrink-0">
                <img hlmAvatarImage [src]="convo.profile" [alt]="convo.fullName" />
                <span hlmAvatarFallback>{{ initials(convo.fullName) }}</span>
              </hlm-avatar>

              <div class="grid flex-1 text-left text-xs leading-tight min-w-0">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-semibold text-foreground truncate">{{ convo.fullName }}</span>
                  <span class="text-[10px] text-muted-foreground shrink-0 ml-1">
                    {{ convo.messages[convo.messages.length - 1]?.timestamp }}
                  </span>
                </div>
                <p class="text-xs text-muted-foreground line-clamp-1 truncate">
                  {{ convo.messages[convo.messages.length - 1]?.message }}
                </p>
              </div>
            </button>
          }
        </div>
      </div>

      <!-- Right Panel: Active Chat Thread -->
      <div
        class="flex-1 flex flex-col bg-background min-w-0"
        [class.hidden]="mobileActiveConvo() === null"
        [class.md:flex]="true"
      >
        @if (selectedConversation(); as active) {
          <!-- Chat Header -->
          <div class="flex h-14 items-center justify-between border-b px-3 sm:px-4 bg-card/60 backdrop-blur-xs">
            <div class="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                hlmBtn
                variant="ghost"
                size="icon"
                class="md:hidden size-8 cursor-pointer shrink-0"
                (click)="mobileActiveConvo.set(null)"
                aria-label="Back to conversations"
              >
                <ng-icon name="lucideArrowLeft" class="size-4" />
              </button>

              <hlm-avatar class="size-8 sm:size-9 shrink-0">
                <img hlmAvatarImage [src]="active.profile" [alt]="active.fullName" />
                <span hlmAvatarFallback>{{ initials(active.fullName) }}</span>
              </hlm-avatar>

              <div class="min-w-0">
                <p class="text-xs sm:text-sm font-semibold leading-none truncate">{{ active.fullName }}</p>
                <p class="text-[10px] sm:text-[11px] text-emerald-500 font-medium mt-0.5">
                  {{ isTyping() ? active.fullName + ' is typing...' : 'Online' }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-1 shrink-0">
              <button hlmBtn variant="ghost" size="icon" class="size-8 cursor-pointer" (click)="mockCall('Audio')">
                <ng-icon name="lucidePhone" class="size-4 text-muted-foreground" />
              </button>
              <button hlmBtn variant="ghost" size="icon" class="size-8 cursor-pointer" (click)="mockCall('Video')">
                <ng-icon name="lucideVideo" class="size-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <!-- Message History -->
          <div class="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 no-scrollbar">
            @for (msg of active.messages; track $index) {
              <div
                class="flex flex-col"
                [class.items-end]="msg.sender === 'You'"
                [class.items-start]="msg.sender !== 'You'"
              >
                <div
                  class="max-w-[85%] sm:max-w-[75%] rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-2xs leading-relaxed"
                  [class.bg-primary]="msg.sender === 'You'"
                  [class.text-primary-foreground]="msg.sender === 'You'"
                  [class.rounded-br-xs]="msg.sender === 'You'"
                  [class.bg-muted]="msg.sender !== 'You'"
                  [class.text-foreground]="msg.sender !== 'You'"
                  [class.rounded-bl-xs]="msg.sender !== 'You'"
                >
                  {{ msg.message }}
                </div>
                <span class="text-[9px] sm:text-[10px] text-muted-foreground mt-1 px-1">
                  {{ msg.timestamp }}
                </span>
              </div>
            }

            <!-- Typing Indicator Animation -->
            @if (isTyping()) {
              <div class="flex items-center gap-2">
                <div class="bg-muted px-3 py-2 rounded-2xl rounded-bl-xs flex items-center gap-1 shadow-xs">
                  <span class="size-1.5 bg-muted-foreground/60 rounded-full animate-bounce"></span>
                  <span class="size-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span class="size-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            }
          </div>

          <!-- Message Composer -->
          <div class="p-2 sm:p-3 border-t bg-card/60 backdrop-blur-xs flex items-center gap-1.5 sm:gap-2">
            <button hlmBtn variant="ghost" size="icon" class="size-8 cursor-pointer shrink-0" (click)="mockAttachment()">
              <ng-icon name="lucidePaperclip" class="size-4 text-muted-foreground" />
            </button>

            <input
              type="text"
              [(ngModel)]="newMessage"
              (keydown.enter)="sendMessage()"
              placeholder="Type your message..."
              class="flex-1 h-9 rounded-md border border-input bg-background px-3 text-xs sm:text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            <button hlmBtn variant="ghost" size="icon" class="size-8 cursor-pointer shrink-0" (click)="mockMic()">
              <ng-icon name="lucideMic" class="size-4 text-muted-foreground" />
            </button>

            <button hlmBtn size="icon" class="size-8 sm:size-9 cursor-pointer shrink-0" (click)="sendMessage()">
              <ng-icon name="lucideSend" class="size-4" />
            </button>
          </div>
        } @else {
          <!-- Empty State -->
          <div class="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
            <ng-icon name="lucideMessagesSquare" class="size-12 mb-3 opacity-30" />
            <h3 class="text-base font-semibold text-foreground">Select a conversation</h3>
            <p class="text-xs max-w-sm mt-1">Choose a conversation from the sidebar to start chatting with your team.</p>
          </div>
        }
      </div>
    </div>

    <!-- New Chat Dialog -->
    <app-new-chat-dialog
      [open]="newChatOpen()"
      [availableUsers]="conversations()"
      (openChange)="newChatOpen.set($event)"
      (conversationCreated)="selectConversation($event)"
    />
  `,
})
export class ChatsComponent {
  private readonly platformId = inject(PLATFORM_ID)
  readonly conversations = signal<Conversation[]>(mockConversations)
  readonly selectedConversation = signal<Conversation | null>(mockConversations[0] || null)
  readonly mobileActiveConvo = signal<Conversation | null>(null)
  readonly newChatOpen = signal<boolean>(false)
  readonly isTyping = signal<boolean>(false)
  searchQuery = ''
  newMessage = ''

  readonly filteredConversations = computed(() => {
    const q = this.searchQuery.toLowerCase().trim()
    if (!q) return this.conversations()
    return this.conversations().filter(
      (c) => c.fullName.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
    )
  })

  selectConversation(convo: Conversation): void {
    this.selectedConversation.set(convo)
    this.mobileActiveConvo.set(convo)

    // Simulate typing response
    this.isTyping.set(true)
    setTimeout(() => {
      this.isTyping.set(false)
    }, 1800)
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return
    const active = this.selectedConversation()
    if (!active) return

    const now = new Date()
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`

    const newMsg: ChatMessage = {
      sender: 'You',
      message: this.newMessage,
      timestamp: timeStr,
    }

    active.messages.push(newMsg)
    this.newMessage = ''

    // Simulate instant reply
    setTimeout(() => {
      this.isTyping.set(true)
      setTimeout(() => {
        this.isTyping.set(false)
        active.messages.push({
          sender: active.fullName,
          message: 'Got it! Thanks for the update.',
          timestamp: 'Just now',
        })
      }, 1500)
    }, 1000)
  }

  mockCall(type: 'Audio' | 'Video'): void {
    toast.info(`Starting ${type} call with ${this.selectedConversation()?.fullName}...`)
  }

  mockAttachment(): void {
    toast.info('File attachment uploaded to chat')
  }

  mockMic(): void {
    toast.info('Voice message recorded and sent')
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
