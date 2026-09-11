import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideUserPlus } from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { UsersTableComponent } from './components/users-table.component'
import { UsersInviteDialogComponent } from './components/users-invite-dialog.component'
import { UsersActionDialogComponent } from './components/users-action-dialog.component'
import { UsersDeleteDialogComponent } from './components/users-delete-dialog.component'
import { UsersService } from './services/users.service'
import { HasRoleDirective } from '../../core/directives/has-role.directive'
import { setupUsersUrlSync } from '../../core/utils/use-table-url-state'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
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
    HasRoleDirective,
  ],
  providers: [provideIcons({ lucideUserPlus })],
  template: `
    <!-- Header -->
    <app-header [fixed]="true">
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-config-drawer />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main -->
    <app-main [fixed]="true" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">User Management</h1>
          <p class="text-xs text-muted-foreground">
            Manage your team members, permissions, and roles.
          </p>
        </div>

        <button
          *hasRole="['superadmin', 'admin', 'manager']"
          hlmBtn
          size="sm"
          (click)="usersService.openInvite()"
          class="gap-1.5 cursor-pointer"
        >
          <ng-icon name="lucideUserPlus" class="size-3.5" />
          <span>Invite User</span>
        </button>
      </div>

      <!-- Users Table with URL sync -->
      <app-users-table />
    </app-main>

    <!-- Modals & Sheets -->
    <app-users-invite-dialog />
    <app-users-action-dialog />
    <app-users-delete-dialog />
  `,
})
export class UsersComponent implements OnInit {
  readonly usersService = inject(UsersService)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  ngOnInit(): void {
    setupUsersUrlSync(this.usersService, this.router, this.route)
  }
}
