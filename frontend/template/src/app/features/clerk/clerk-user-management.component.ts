import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideExternalLink, lucideUserPlus } from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { UsersTableComponent } from '../users/components/users-table.component'
import { UsersInviteDialogComponent } from '../users/components/users-invite-dialog.component'
import { UsersActionDialogComponent } from '../users/components/users-action-dialog.component'
import { UsersDeleteDialogComponent } from '../users/components/users-delete-dialog.component'
import { UsersService } from '../users/services/users.service'

@Component({
  selector: 'app-clerk-user-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    SearchComponent,
    ThemeSwitchComponent,
    ConfigDrawerComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmButtonImports,
    UsersTableComponent,
    UsersInviteDialogComponent,
    UsersActionDialogComponent,
    UsersDeleteDialogComponent,
  ],
  providers: [provideIcons({ lucideExternalLink, lucideUserPlus })],
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
    <app-main [fixed]="true" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight">Secured by Clerk</h1>
            <span class="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Clerk Managed
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-1">
            Manage your synchronized Clerk users, roles, and enterprise security directory.
          </p>
        </div>

        <button
          hlmBtn
          size="sm"
          (click)="usersService.openInvite()"
          class="gap-1.5 cursor-pointer"
        >
          <ng-icon name="lucideUserPlus" class="size-3.5" />
          <span>Invite User</span>
        </button>
      </div>

      <!-- Users Table -->
      <app-users-table />
    </app-main>

    <!-- Dialogs -->
    <app-users-invite-dialog />
    <app-users-action-dialog />
    <app-users-delete-dialog />
  `,
})
export class ClerkUserManagementComponent {
  readonly usersService = inject(UsersService)
}
