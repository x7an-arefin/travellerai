import { Component, ElementRef, HostListener, Input, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideMessagesSquare, lucideCalendar, lucideShield } from '@ng-icons/lucide'
import { HlmBadgeImports } from '@ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { HlmAvatarImports } from '@ui/avatar/hlm-avatar.components'
import { getDisplayNameInitials } from '@core/utils/initials'

export interface HoverUserData {
  name: string
  username?: string
  email: string
  avatar?: string
  role?: string
  joinedDate?: string
}

@Component({
  selector: 'app-user-hover-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIcon,
    ...HlmBadgeImports,
    ...HlmButtonImports,
    ...HlmAvatarImports,
  ],
  providers: [provideIcons({ lucideMessagesSquare, lucideCalendar, lucideShield })],
  template: `
    <div
      class="relative inline-block"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <!-- Trigger Content (e.g. Avatar or Name) -->
      <ng-content />

      <!-- Floating Hover Card Panel -->
      @if (isOpen()) {
        <div
          class="absolute left-0 bottom-full mb-2 z-[130] w-64 rounded-xl border border-border bg-popover bg-white dark:bg-zinc-900 p-4 text-popover-foreground shadow-2xl outline-none animate-in fade-in-0 zoom-in-95 duration-150"
        >
          <div class="flex items-start justify-between gap-3">
            <hlm-avatar class="size-11 shadow-xs ring-2 ring-primary/20">
              <img hlmAvatarImage [src]="user.avatar || ''" [alt]="user.name" />
              <span hlmAvatarFallback>{{ initials(user.name) }}</span>
            </hlm-avatar>

            @if (user.role) {
              <span hlmBadge variant="secondary" class="text-[10px] uppercase font-semibold capitalize">
                {{ user.role }}
              </span>
            }
          </div>

          <div class="space-y-1 mt-2.5">
            <h4 class="text-xs font-bold leading-none text-foreground">{{ user.name }}</h4>
            <p class="text-[11px] font-mono text-muted-foreground">&#64;{{ user.username || getUsername(user.email) }}</p>
            <p class="text-[11px] text-muted-foreground truncate">{{ user.email }}</p>
          </div>

          <div class="flex items-center gap-1.5 text-[10px] text-muted-foreground pt-2.5 border-t border-border mt-2.5">
            <ng-icon name="lucideCalendar" class="size-3" />
            <span>Joined {{ user.joinedDate || 'August 2024' }}</span>
          </div>

          <div class="mt-3">
            <a
              routerLink="/chats"
              hlmBtn
              variant="outline"
              size="sm"
              class="w-full text-xs h-7 gap-1.5 cursor-pointer bg-background"
            >
              <ng-icon name="lucideMessagesSquare" class="size-3 text-muted-foreground" />
              <span>Message</span>
            </a>
          </div>
        </div>
      }
    </div>
  `,
})
export class UserHoverCardComponent {
  @Input({ required: true }) user!: HoverUserData

  readonly isOpen = signal<boolean>(false)
  private hideTimer?: any

  onMouseEnter(): void {
    if (this.hideTimer) clearTimeout(this.hideTimer)
    this.isOpen.set(true)
  }

  onMouseLeave(): void {
    this.hideTimer = setTimeout(() => {
      this.isOpen.set(false)
    }, 200)
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }

  getUsername(email: string): string {
    return email ? email.split('@')[0] : 'user'
  }
}
