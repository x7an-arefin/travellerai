import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideChevronsUpDown,
  lucideSparkles,
  lucideBadgeCheck,
  lucideCreditCard,
  lucideBell,
  lucideLogOut,
} from '@ng-icons/lucide'
import { User } from '../data/layout.types'
import { HlmMenuImports } from '@ui/dropdown-menu/hlm-menu.components'
import { HlmAvatarImports } from '@ui/avatar/hlm-avatar.components'
import { AuthService } from '@core/services/auth.service'
import { LayoutService } from '@core/services/layout.service'
import { getDisplayNameInitials } from '@core/utils/initials'

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon, ...HlmMenuImports, ...HlmAvatarImports],
  providers: [
    provideIcons({
      lucideChevronsUpDown,
      lucideSparkles,
      lucideBadgeCheck,
      lucideCreditCard,
      lucideBell,
      lucideLogOut,
    }),
  ],
  template: `
    <!-- Opens to the TOP so the menu floats above the footer -->
    <hlm-dropdown-menu side="top" alignment="start" class="w-full">
      <button
        hlmMenuTrigger
        type="button"
        class="flex h-10 w-full items-center gap-3 rounded-lg px-2 text-left text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring cursor-pointer min-w-0"
        [class.justify-center]="!layoutService.sidebarOpen()"
        [class.px-0]="!layoutService.sidebarOpen()"
      >
        <hlm-avatar class="size-8 shrink-0">
          <img hlmAvatarImage [src]="user.avatar" [alt]="user.name" />
          <span hlmAvatarFallback>{{ initials(user.name) }}</span>
        </hlm-avatar>

        @if (layoutService.sidebarOpen()) {
          <div class="grid flex-1 text-left text-xs leading-tight min-w-0 overflow-hidden">
            <span class="truncate font-semibold text-sidebar-foreground">{{ user.name }}</span>
            <span class="truncate text-muted-foreground text-[11px]">{{ user.email }}</span>
          </div>
          <ng-icon name="lucideChevronsUpDown" class="size-4 text-muted-foreground ml-auto shrink-0" />
        }
      </button>

      <div class="w-56 max-w-[calc(100vw-2rem)] space-y-1">
        <div class="relative z-10 flex items-center gap-2 p-2 bg-muted/50 rounded-lg border border-border/40 min-w-0 overflow-hidden mb-1">
          <hlm-avatar class="size-8 shrink-0">
            <img hlmAvatarImage [src]="user.avatar" [alt]="user.name" />
            <span hlmAvatarFallback>{{ initials(user.name) }}</span>
          </hlm-avatar>
          <div class="grid flex-1 text-left text-xs leading-tight min-w-0 overflow-hidden">
            <span class="truncate font-semibold text-foreground">{{ user.name }}</span>
            <span class="truncate text-muted-foreground text-[11px]">{{ user.email }}</span>
          </div>
        </div>

        <div hlmMenuSeparator class="my-1"></div>

        <button hlmMenuItem class="flex items-center gap-2 px-2 py-1.5 text-xs font-medium cursor-pointer w-full min-w-0">
          <ng-icon name="lucideSparkles" class="size-4 text-primary shrink-0" />
          <span class="truncate">Upgrade to Pro</span>
        </button>

        <div hlmMenuSeparator class="my-1"></div>

        <a routerLink="/settings" hlmMenuItem class="flex items-center gap-2 px-2 py-1.5 text-xs font-medium cursor-pointer w-full min-w-0">
          <ng-icon name="lucideBadgeCheck" class="size-4 text-muted-foreground shrink-0" />
          <span class="truncate">Account</span>
        </a>

        <a routerLink="/settings/account" hlmMenuItem class="flex items-center gap-2 px-2 py-1.5 text-xs font-medium cursor-pointer w-full min-w-0">
          <ng-icon name="lucideCreditCard" class="size-4 text-muted-foreground shrink-0" />
          <span class="truncate">Billing</span>
        </a>

        <a routerLink="/settings/notifications" hlmMenuItem class="flex items-center gap-2 px-2 py-1.5 text-xs font-medium cursor-pointer w-full min-w-0">
          <ng-icon name="lucideBell" class="size-4 text-muted-foreground shrink-0" />
          <span class="truncate">Notifications</span>
        </a>

        <div hlmMenuSeparator class="my-1"></div>

        <button
          hlmMenuItem
          (click)="authService.signOut()"
          class="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer w-full min-w-0"
        >
          <ng-icon name="lucideLogOut" class="size-4 shrink-0" />
          <span class="truncate">Log out</span>
        </button>
      </div>
    </hlm-dropdown-menu>
  `,
})
export class NavUserComponent {
  @Input({ required: true }) user!: User

  constructor(
    public authService: AuthService,
    public layoutService: LayoutService
  ) {}

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
