import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideInbox,
  lucideStar,
  lucideSend,
  lucideFileText,
  lucideArchive,
  lucideTrash2,
  lucideSearch,
  lucideReply,
  lucideForward,
  lucideMoreVertical,
  lucidePenSquare,
  lucidePaperclip,
  lucideArrowLeft,
  lucideCheck,
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
import { HlmTextareaImports } from '../../ui/textarea/hlm-textarea.directive'
import { getDisplayNameInitials } from '../../core/utils/initials'
import { toast } from 'ngx-sonner'

export interface EmailMessage {
  id: string
  sender: { name: string; email: string; avatar?: string }
  subject: string
  preview: string
  body: string
  date: string
  read: boolean
  starred: boolean
  folder: 'inbox' | 'starred' | 'sent' | 'drafts' | 'archive' | 'trash'
  tags: string[]
}

@Component({
  selector: 'app-inbox',
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
    ...HlmTextareaImports,
  ],
  providers: [
    provideIcons({
      lucideInbox,
      lucideStar,
      lucideSend,
      lucideFileText,
      lucideArchive,
      lucideTrash2,
      lucideSearch,
      lucideReply,
      lucideForward,
      lucideMoreVertical,
      lucidePenSquare,
      lucidePaperclip,
      lucideArrowLeft,
      lucideCheck,
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

    <!-- Main 3-Pane Mail Workspace -->
    <app-main [fixed]="true" class="p-0 sm:p-0 md:p-0 space-y-0 h-[calc(100svh-4rem)] overflow-hidden">
      <div class="flex h-full w-full overflow-hidden">
        <!-- Left Pane: Mail Folders Navigation -->
        <aside class="hidden lg:flex w-52 flex-col border-r border-border bg-card p-3 space-y-3 shrink-0">
          <button
            hlmBtn
            size="sm"
            (click)="composeSheetOpen.set(true)"
            class="w-full gap-2 cursor-pointer shadow-xs"
          >
            <ng-icon name="lucidePenSquare" class="size-4" />
            <span>Compose</span>
          </button>

          <nav class="space-y-1 text-xs">
            @for (folder of folders; track folder.id) {
              <button
                type="button"
                (click)="activeFolder.set(folder.id)"
                class="flex w-full items-center justify-between px-2.5 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                [class.bg-accent]="activeFolder() === folder.id"
                [class.text-foreground]="activeFolder() === folder.id"
                [class.text-muted-foreground]="activeFolder() !== folder.id"
              >
                <div class="flex items-center gap-2.5">
                  <ng-icon [name]="folder.icon" class="size-4" />
                  <span>{{ folder.name }}</span>
                </div>
                @if (getFolderCount(folder.id) > 0) {
                  <span class="text-[10px] font-semibold text-muted-foreground font-mono">
                    {{ getFolderCount(folder.id) }}
                  </span>
                }
              </button>
            }
          </nav>
        </aside>

        <!-- Middle Pane: Message List -->
        <div
          class="w-full md:w-80 lg:w-96 border-r border-border bg-background flex flex-col shrink-0"
          [class.hidden]="mobileSelectedEmail() !== null"
          [class.md:flex]="true"
        >
          <!-- Search Header -->
          <div class="p-3 border-b border-border space-y-2">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-bold capitalize">{{ activeFolder() }}</h2>
              <button
                hlmBtn
                size="sm"
                class="lg:hidden h-7 text-xs gap-1 cursor-pointer"
                (click)="composeSheetOpen.set(true)"
              >
                <ng-icon name="lucidePenSquare" class="size-3.5" />
                <span>Compose</span>
              </button>
            </div>

            <div class="relative">
              <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <input
                type="text"
                [(ngModel)]="searchQuery"
                placeholder="Search mail..."
                class="h-8 w-full rounded-md border border-input bg-card pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          <!-- Email Items List -->
          <div class="flex-1 overflow-y-auto divide-y divide-border/60 no-scrollbar">
            @for (email of filteredEmails(); track email.id) {
              <div
                (click)="selectEmail(email)"
                class="p-3.5 space-y-1.5 transition-colors hover:bg-muted/40 cursor-pointer text-left relative"
                [class.bg-muted/30]="selectedEmail()?.id === email.id"
                [class.font-semibold]="!email.read"
              >
                <div class="flex items-center justify-between text-xs">
                  <span class="truncate font-semibold text-foreground max-w-[180px]">{{ email.sender.name }}</span>
                  <span class="text-[10px] text-muted-foreground">{{ email.date }}</span>
                </div>

                <p class="text-xs text-foreground truncate font-medium">{{ email.subject }}</p>
                <p class="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{{ email.preview }}</p>

                <div class="flex items-center gap-1.5 pt-1">
                  @for (tag of email.tags; track tag) {
                    <span hlmBadge variant="outline" class="text-[9px] px-1.5 py-0">
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Right Pane: Email Thread Reader -->
        <div
          class="flex-1 flex flex-col bg-card overflow-y-auto min-w-0"
          [class.hidden]="mobileSelectedEmail() === null"
          [class.md:flex]="true"
        >
          @if (selectedEmail(); as mail) {
            <!-- Reader Header -->
            <div class="flex items-center justify-between p-4 border-b border-border bg-background">
              <div class="flex items-center gap-2">
                <button
                  hlmBtn
                  variant="ghost"
                  size="icon"
                  class="md:hidden size-8 cursor-pointer"
                  (click)="mobileSelectedEmail.set(null)"
                  aria-label="Back"
                >
                  <ng-icon name="lucideArrowLeft" class="size-4" />
                </button>

                <hlm-avatar class="size-9 shadow-xs">
                  <img hlmAvatarImage [src]="mail.sender.avatar || ''" [alt]="mail.sender.name" />
                  <span hlmAvatarFallback>{{ initials(mail.sender.name) }}</span>
                </hlm-avatar>

                <div>
                  <h3 class="text-xs sm:text-sm font-bold text-foreground">{{ mail.sender.name }}</h3>
                  <p class="text-[11px] text-muted-foreground">{{ mail.sender.email }}</p>
                </div>
              </div>

              <!-- Action Bar -->
              <div class="flex items-center gap-1">
                <button hlmBtn variant="ghost" size="icon" (click)="toggleStar(mail)" class="size-8 cursor-pointer">
                  <ng-icon name="lucideStar" class="size-4" [class.text-amber-500]="mail.starred" />
                </button>
                <button hlmBtn variant="ghost" size="icon" (click)="archiveEmail(mail)" class="size-8 cursor-pointer">
                  <ng-icon name="lucideArchive" class="size-4 text-muted-foreground" />
                </button>
                <button hlmBtn variant="ghost" size="icon" (click)="deleteEmail(mail)" class="size-8 cursor-pointer text-destructive">
                  <ng-icon name="lucideTrash2" class="size-4" />
                </button>
              </div>
            </div>

            <!-- Subject & Body -->
            <div class="p-6 space-y-6 flex-1 text-xs sm:text-sm leading-relaxed">
              <div class="space-y-1 pb-4 border-b border-border/60">
                <h2 class="text-lg font-extrabold text-foreground">{{ mail.subject }}</h2>
                <div class="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{{ mail.date }} (10:45 AM)</span>
                  <span>•</span>
                  <span>To me &lt;satnaingdev&#64;gmail.com&gt;</span>
                </div>
              </div>

              <div class="text-foreground whitespace-pre-line space-y-4">
                {{ mail.body }}
              </div>
            </div>

            <!-- Quick Reply Composer -->
            <div class="p-4 border-t border-border bg-background space-y-3 mt-auto">
              <textarea
                hlmTextarea
                [(ngModel)]="replyText"
                rows="2"
                placeholder="Reply to this thread..."
                class="w-full text-xs"
              ></textarea>

              <div class="flex items-center justify-between">
                <button hlmBtn variant="ghost" size="icon" (click)="mockAttach()" class="size-8 cursor-pointer text-muted-foreground">
                  <ng-icon name="lucidePaperclip" class="size-4" />
                </button>

                <button hlmBtn size="sm" (click)="sendReply()" [disabled]="!replyText.trim()" class="gap-1.5 cursor-pointer text-xs">
                  <ng-icon name="lucideSend" class="size-3.5" />
                  <span>Send Reply</span>
                </button>
              </div>
            </div>
          } @else {
            <div class="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <ng-icon name="lucideInbox" class="size-12 mb-3 opacity-30" />
              <h3 class="text-base font-semibold text-foreground">Select an email to read</h3>
              <p class="text-xs max-w-sm mt-1">Pick a message from the conversation list to view full thread details.</p>
            </div>
          }
        </div>
      </div>
    </app-main>

    <!-- Compose Message Sheet (size="sm") -->
    <hlm-sheet [isOpen]="composeSheetOpen()" position="right" [size]="'sm'" (closed)="composeSheetOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Compose Message</h3>
        <p hlmSheetDescription>Draft an email message to your team or external contact.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 text-xs flex flex-col">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">To:</label>
          <input hlmInput [(ngModel)]="composeTo" placeholder="recipient@example.com" />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Subject:</label>
          <input hlmInput [(ngModel)]="composeSubject" placeholder="Sprint planning update" />
        </div>

        <div class="space-y-1.5 flex-1 flex flex-col">
          <label class="font-semibold text-foreground">Body:</label>
          <textarea
            hlmTextarea
            [(ngModel)]="composeBody"
            rows="8"
            placeholder="Write your email content here..."
            class="flex-1 w-full"
          ></textarea>
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto">
        <button hlmBtn variant="outline" (click)="composeSheetOpen.set(false)" class="cursor-pointer">Cancel</button>
        <button hlmBtn [disabled]="!composeTo.trim() || !composeSubject.trim()" (click)="sendComposedEmail()" class="cursor-pointer">Send Email</button>
      </div>
    </hlm-sheet>
  `,
})
export class InboxComponent {
  readonly activeFolder = signal<string>('inbox')
  readonly composeSheetOpen = signal<boolean>(false)
  readonly mobileSelectedEmail = signal<EmailMessage | null>(null)
  searchQuery = ''
  replyText = ''

  composeTo = ''
  composeSubject = ''
  composeBody = ''

  readonly folders: { id: any; name: string; icon: string }[] = [
    { id: 'inbox', name: 'Inbox', icon: 'lucideInbox' },
    { id: 'starred', name: 'Starred', icon: 'lucideStar' },
    { id: 'sent', name: 'Sent', icon: 'lucideSend' },
    { id: 'drafts', name: 'Drafts', icon: 'lucideFileText' },
    { id: 'archive', name: 'Archive', icon: 'lucideArchive' },
    { id: 'trash', name: 'Trash', icon: 'lucideTrash2' },
  ]

  readonly emails = signal<EmailMessage[]>([
    {
      id: 'm1',
      sender: { name: 'Sarah Miller', email: 'sarah.miller@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      subject: 'New Design Tokens for Spartan UI Angular Template',
      preview: 'Hi Sat, I have uploaded the updated OKLCH color palettes and button hover states...',
      body: `Hi Sat,

I have finalized the updated OKLCH color tokens and hover radius curves for the Spartan UI Angular dashboard template.

Key improvements included:
1. Glassmorphism backdrop blur on all popovers.
2. High-contrast dark mode primary accents.
3. Fluid typography scales with Inter and Manrope.

Let me know if you would like me to push these to the repository!

Best,
Sarah Miller`,
      date: '10:45 AM',
      read: false,
      starred: true,
      folder: 'inbox',
      tags: ['Design', 'Spartan'],
    },
    {
      id: 'm2',
      sender: { name: 'Alex John', email: 'alex@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      subject: 'Weekly Backend Infrastructure & SOC-2 Status Report',
      preview: 'All database read replicas and API gateway clusters passed the latency benchmarks...',
      body: `Sat,

Here is the weekly health report for our backend services:
- API Gateway latency p99: 14ms
- SOC-2 Audit trail sync: 100% verified
- Database failover testing: Passed with 0 downtime.

Everything is green for our upcoming v2.4 launch.

Regards,
Alex John`,
      date: 'Yesterday',
      read: true,
      starred: false,
      folder: 'inbox',
      tags: ['Security', 'DevOps'],
    },
    {
      id: 'm3',
      sender: { name: 'Olivia Martin', email: 'olivia.martin@email.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80' },
      subject: 'Invoice #INV-2026-088 Payment Confirmation',
      preview: 'Thank you for your business! Your payment of $99.00 has been processed successfully...',
      body: `Hello Sat,

We have received your monthly Enterprise subscription payment for August 2026. Your tax invoice is ready for download in your dashboard billing tab.

Thank you for choosing Acme Inc!`,
      date: 'Aug 01',
      read: true,
      starred: false,
      folder: 'inbox',
      tags: ['Billing'],
    },
  ])

  readonly selectedEmail = signal<EmailMessage | null>(this.emails()[0])

  readonly filteredEmails = computed(() => {
    const f = this.activeFolder()
    const q = this.searchQuery.toLowerCase().trim()

    let list = this.emails()
    if (f === 'starred') {
      list = list.filter((e) => e.starred)
    } else {
      list = list.filter((e) => e.folder === f)
    }

    if (q) {
      list = list.filter((e) => e.subject.toLowerCase().includes(q) || e.sender.name.toLowerCase().includes(q))
    }

    return list
  })

  getFolderCount(folderId: string): number {
    if (folderId === 'starred') return this.emails().filter((e) => e.starred).length
    return this.emails().filter((e) => e.folder === folderId).length
  }

  selectEmail(email: EmailMessage): void {
    email.read = true
    this.selectedEmail.set(email)
    this.mobileSelectedEmail.set(email)
  }

  toggleStar(mail: EmailMessage): void {
    mail.starred = !mail.starred
    toast.info(mail.starred ? 'Starred email.' : 'Removed star.')
  }

  archiveEmail(mail: EmailMessage): void {
    mail.folder = 'archive'
    toast.success('Email archived.')
  }

  deleteEmail(mail: EmailMessage): void {
    mail.folder = 'trash'
    toast.success('Email moved to trash.')
  }

  mockAttach(): void {
    toast.info('File attachment uploaded to reply.')
  }

  sendReply(): void {
    if (!this.replyText.trim()) return
    toast.success('Reply sent successfully!')
    this.replyText = ''
  }

  sendComposedEmail(): void {
    const newMsg: EmailMessage = {
      id: 'msg-' + Date.now(),
      sender: { name: 'Sat Naing', email: 'satnaingdev@gmail.com' },
      subject: this.composeSubject,
      preview: this.composeBody.substring(0, 80) + '...',
      body: this.composeBody,
      date: 'Just now',
      read: true,
      starred: false,
      folder: 'sent',
      tags: ['Work'],
    }

    this.emails.update((list) => [newMsg, ...list])
    this.composeSheetOpen.set(false)
    this.composeTo = ''
    this.composeSubject = ''
    this.composeBody = ''
    toast.success('Email sent successfully!')
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
