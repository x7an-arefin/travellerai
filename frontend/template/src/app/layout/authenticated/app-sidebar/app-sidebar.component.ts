import { Component, computed, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { sidebarData } from '../data/sidebar-data'
import { AuthService } from '@core/services/auth.service'
import { TeamSwitcherComponent } from './team-switcher.component'
import { NavGroupComponent } from './nav-group.component'
import { NavUserComponent } from './nav-user.component'
import { LayoutService } from '../../../core/services/layout.service'
import { cn } from '../../../core/utils/cn'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    TeamSwitcherComponent,
    NavGroupComponent,
    NavUserComponent,
  ],
  template: `
    <!-- Mobile Backdrop -->
    @if (layoutService.mobileOpen()) {
      <div
        class="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200"
        (click)="layoutService.setMobileOpen(false)"
      ></div>
    }

    <!-- Sidebar Container -->
    <aside [class]="_computedSidebarClasses()">
      <!-- Header -->
      <div class="h-16 flex items-center px-2.5 border-b border-sidebar-border shrink-0">
        <app-team-switcher [teams]="data.teams" class="w-full" />
      </div>

      <!-- Navigation Content -->
      <div class="flex-1 overflow-y-auto overflow-x-hidden py-2 no-scrollbar">
        @for (group of visibleNavGroups(); track group.title) {
          <app-nav-group [group]="group" />
        }
      </div>

      <!-- Footer -->
      <div class="h-16 flex items-center px-2.5 border-t border-sidebar-border shrink-0 mt-auto">
        <app-nav-user [user]="currentUser()" class="w-full" />
      </div>
    </aside>
  `,
})
export class AppSidebarComponent {
  readonly data = sidebarData
  private readonly auth = inject(AuthService)

  readonly currentUser = computed(() => {
    const u = this.auth.user()
    if (!u) {
      return this.data.user
    }
    return {
      name: u.name,
      email: u.email,
      avatar: u.avatar || this.data.user.avatar,
    }
  })

  readonly visibleNavGroups = computed(() => this.data.navGroups
    .filter((group) => this.auth.hasAccess(group.permissions, group.roles))
    .map((group) => ({
      ...group,
      items: group.items
        .map((item) => item.items
          ? { ...item, items: item.items.filter((child) => this.auth.hasAccess(child.permissions, child.roles)) }
          : item)
        .filter((item) => this.auth.hasAccess(item.permissions, item.roles) && (!item.items || item.items.length > 0)),
    }))
    .filter((group) => group.items.length > 0))

  constructor(public layoutService: LayoutService) {}

  protected readonly _computedSidebarClasses = computed(() => {
    const open = this.layoutService.sidebarOpen()
    const variant = this.layoutService.variant()
    const mobileOpen = this.layoutService.mobileOpen()
    const collapsible = this.layoutService.collapsible()

    const baseClasses = 'bg-sidebar text-sidebar-foreground flex flex-col z-40 transition-all duration-300 ease-in-out select-none border-r border-sidebar-border'

    let widthClasses = 'w-64'
    if (!open) {
      if (collapsible === 'offcanvas') {
        widthClasses = 'max-md:-translate-x-full md:-translate-x-full md:w-0 md:m-0 md:p-0 md:border-none md:overflow-hidden md:opacity-0 md:pointer-events-none'
      } else {
        widthClasses = 'w-16'
      }
    }

    const variantClasses = {
      sidebar: 'h-svh sticky top-0',
      inset: 'h-[calc(100svh-1rem)] my-2 ml-2 rounded-xl border border-sidebar-border shadow-xs sticky top-2',
      floating: 'h-[calc(100svh-1.5rem)] my-3 ml-3 rounded-2xl border border-sidebar-border shadow-md sticky top-3',
    }

    // Responsive classes for mobile
    const mobileClasses = mobileOpen
      ? 'fixed inset-y-0 left-0 z-50 w-64 shadow-2xl translate-x-0 !opacity-100 !pointer-events-auto'
      : 'max-md:-translate-x-full max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50'

    return cn(
      baseClasses,
      widthClasses,
      variantClasses[variant],
      mobileClasses
    )
  })
}
