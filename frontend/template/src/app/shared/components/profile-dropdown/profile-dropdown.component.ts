import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideUser,
  lucideCreditCard,
  lucideSettings,
  lucideLogOut,
  lucidePlusCircle,
} from '@ng-icons/lucide'
import { HlmAvatarImports } from '@ui/avatar/hlm-avatar.components'
import { HlmMenuImports } from '@ui/dropdown-menu/hlm-menu.components'
import { AuthService } from '@core/services/auth.service'
import { getDisplayNameInitials } from '@core/utils/initials'

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon, ...HlmAvatarImports, ...HlmMenuImports],
  providers: [
    provideIcons({
      lucideUser,
      lucideCreditCard,
      lucideSettings,
      lucideLogOut,
      lucidePlusCircle,
    }),
  ],
  template: `
    <hlm-dropdown-menu>
      <button
        hlmMenuTrigger
        type="button"
        class="relative flex size-9 items-center justify-center rounded-full ring-2 ring-transparent transition-all hover:ring-primary/40 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer shrink-0"
        aria-label="User profile menu"
      >
        <hlm-avatar class="size-8.5">
          <img
            hlmAvatarImage
            [src]="authService.user()?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'"
            [alt]="authService.user()?.name || 'User'"
          />
          <span hlmAvatarFallback>{{ initials(authService.user()?.name || 'Admin') }}</span>
        </hlm-avatar>
      </button>

      <div class="w-56 p-1">
        <div class="flex flex-col space-y-1 p-2">
          <p class="text-sm font-medium leading-none">{{ authService.user()?.name || 'Sat Naing' }}</p>
          <p class="text-xs leading-none text-muted-foreground truncate">
            {{ authService.user()?.email || 'satnaingdev@gmail.com' }}
          </p>
        </div>

        <div hlmMenuSeparator></div>

        <a routerLink="/settings" hlmMenuItem class="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer">
          <ng-icon name="lucideUser" class="size-4" />
          <span>Profile</span>
          <span hlmMenuShortcut>⇧⌘P</span>
        </a>

        <a routerLink="/settings/account" hlmMenuItem class="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer">
          <ng-icon name="lucideCreditCard" class="size-4" />
          <span>Billing</span>
          <span hlmMenuShortcut>⌘B</span>
        </a>

        <a routerLink="/settings/appearance" hlmMenuItem class="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer">
          <ng-icon name="lucideSettings" class="size-4" />
          <span>Settings</span>
          <span hlmMenuShortcut>⌘S</span>
        </a>

        <div hlmMenuSeparator></div>

        <button
          hlmMenuItem
          (click)="authService.signOut()"
          class="flex items-center gap-2 px-2 py-1.5 text-sm text-destructive focus:text-destructive cursor-pointer"
        >
          <ng-icon name="lucideLogOut" class="size-4" />
          <span>Log out</span>
          <span hlmMenuShortcut>⇧⌘Q</span>
        </button>
      </div>
    </hlm-dropdown-menu>
  `,
})
export class ProfileDropdownComponent {
  constructor(public authService: AuthService) {}

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
