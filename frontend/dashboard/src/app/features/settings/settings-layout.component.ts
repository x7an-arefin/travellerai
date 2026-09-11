import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideUserCog,
  lucideWrench,
  lucidePalette,
  lucideBell,
  lucideMonitor,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmSeparatorImports } from '../../ui/separator/hlm-separator.directive'

@Component({
  selector: 'app-settings-layout',
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
    ...HlmSeparatorImports,
  ],
  providers: [
    provideIcons({
      lucideUserCog,
      lucideWrench,
      lucidePalette,
      lucideBell,
      lucideMonitor,
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

    <!-- Main Content -->
    <app-main [fixed]="true" class="space-y-6">
      <div class="space-y-0.5">
        <h1 class="text-2xl font-bold tracking-tight">Settings</h1>
        <p class="text-xs text-muted-foreground">
          Manage your account settings, appearance, and notification preferences.
        </p>
      </div>

      <div hlmSeparator></div>

      <div class="flex flex-col space-y-6 lg:flex-row lg:space-x-12 lg:space-y-0">
        <!-- Settings Sub-Navigation: Horizontal on mobile/tablet, vertical on desktop -->
        <aside class="w-full lg:w-1/5 overflow-x-auto no-scrollbar">
          <nav class="flex space-x-1.5 lg:flex-col lg:space-x-0 lg:space-y-1 pb-1 lg:pb-0">
            @for (item of navItems; track item.href) {
              <a
                [routerLink]="item.href"
                routerLinkActive="bg-muted font-semibold text-foreground"
                [routerLinkActiveOptions]="{ exact: item.exact }"
                class="flex items-center gap-2 rounded-md px-3 py-2 text-xs sm:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors whitespace-nowrap"
              >
                <ng-icon [name]="item.icon" class="size-4" />
                <span>{{ item.title }}</span>
              </a>
            }
          </nav>
        </aside>

        <!-- Sub-page Content -->
        <div class="flex-1 lg:max-w-2xl">
          <router-outlet />
        </div>
      </div>
    </app-main>
  `,
})
export class SettingsLayoutComponent {
  readonly navItems = [
    { title: 'Profile', href: '/settings', icon: 'lucideUserCog', exact: true },
    { title: 'Account', href: '/settings/account', icon: 'lucideWrench', exact: false },
    { title: 'Appearance', href: '/settings/appearance', icon: 'lucidePalette', exact: false },
    { title: 'Notifications', href: '/settings/notifications', icon: 'lucideBell', exact: false },
    { title: 'Display', href: '/settings/display', icon: 'lucideMonitor', exact: false },
  ]
}
