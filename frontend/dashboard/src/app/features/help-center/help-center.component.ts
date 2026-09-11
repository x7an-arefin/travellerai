import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-help-center',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MainComponent,
    SearchComponent,
    ThemeSwitchComponent,
    ConfigDrawerComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
  ],
  template: `
    <app-header [fixed]="true">
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-config-drawer />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <app-main [fixed]="true" class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Help Center & Documentation</h1>
        <p class="text-xs text-muted-foreground">
          Find answers, guides, and developer documentation for this admin dashboard.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div hlmCard class="p-5 hover:border-primary/40 transition-colors shadow-2xs">
          <h3 class="text-base font-semibold">Getting Started</h3>
          <p class="text-xs text-muted-foreground mt-1 leading-relaxed">Learn how to configure your dashboard, manage teams, and customize themes.</p>
        </div>

        <div hlmCard class="p-5 hover:border-primary/40 transition-colors shadow-2xs">
          <h3 class="text-base font-semibold">Spartan UI & Components</h3>
          <p class="text-xs text-muted-foreground mt-1 leading-relaxed">Explore accessible primitives, directives, and Tailwind tokens.</p>
        </div>

        <div hlmCard class="p-5 hover:border-primary/40 transition-colors shadow-2xs">
          <h3 class="text-base font-semibold">API Reference</h3>
          <p class="text-xs text-muted-foreground mt-1 leading-relaxed">REST API endpoints, webhook events, and authentication headers.</p>
        </div>
      </div>
    </app-main>
  `,
})
export class HelpCenterComponent {}
