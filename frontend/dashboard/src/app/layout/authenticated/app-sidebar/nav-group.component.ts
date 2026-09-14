import { Component, Input, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideLayoutDashboard,
  lucideBoxes,
  lucideListTodo,
  lucidePackage,
  lucideMessagesSquare,
  lucideUsers,
  lucideShieldCheck,
  lucideBug,
  lucideLock,
  lucideUserX,
  lucideFileX,
  lucideServerOff,
  lucideConstruction,
  lucideSettings,
  lucideUserCog,
  lucideWrench,
  lucidePalette,
  lucideBell,
  lucideMonitor,
  lucideHelpCircle,
  lucideChevronRight,
  lucideChevronDown,
  lucideKanban,
  lucideFolder,
  lucideCreditCard,
  lucideKey,
  lucideSparkles,
  lucideRocket,
  lucideUser,
  lucideClock,
  lucideCalendar,
  lucideInbox,
  lucideShoppingBag,
  lucideBot,
  lucideTrendingUp,
  lucideStar,
  lucideActivity,
  lucideWorkflow,
  lucideHeadphones,
  lucideRadio,
  lucideBadgeDollarSign,
  lucideReceipt,
  lucideServer,
  lucideComponent,
  lucideMap,
  lucideNetwork,
  lucideBuilding2,
  lucideMegaphone,
  lucideShare2,
  lucideTv,
  lucideWallet,
  lucideDatabase,
  lucideShieldAlert,
  lucideGraduationCap,
  lucideUserCheck,
  lucideShield,
  lucideCar,
  lucideBedDouble,
} from '@ng-icons/lucide'
import { NavGroup, NavItem } from '../data/layout.types'
import { LayoutService } from '@core/services/layout.service'
import { HlmBadgeImports } from '@ui/badge/hlm-badge.directive'

@Component({
  selector: 'app-nav-group',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon, ...HlmBadgeImports],
  providers: [
    provideIcons({
      lucideLayoutDashboard,
      lucideBoxes,
      lucideListTodo,
      lucidePackage,
      lucideMessagesSquare,
      lucideUsers,
      lucideShieldCheck,
      lucideBug,
      lucideLock,
      lucideUserX,
      lucideFileX,
      lucideServerOff,
      lucideConstruction,
      lucideSettings,
      lucideUserCog,
      lucideWrench,
      lucidePalette,
      lucideBell,
      lucideMonitor,
      lucideHelpCircle,
      lucideChevronRight,
      lucideChevronDown,
      lucideKanban,
      lucideFolder,
      lucideCreditCard,
      lucideKey,
      lucideSparkles,
      lucideRocket,
      lucideUser,
      lucideClock,
      lucideCalendar,
      lucideInbox,
      lucideShoppingBag,
      lucideBot,
      lucideTrendingUp,
      lucideStar,
      lucideActivity,
      lucideWorkflow,
      lucideHeadphones,
      lucideRadio,
      lucideBadgeDollarSign,
      lucideReceipt,
      lucideServer,
      lucideComponent,
      lucideMap,
      lucideNetwork,
      lucideBuilding2,
      lucideMegaphone,
      lucideShare2,
      lucideTv,
      lucideWallet,
      lucideDatabase,
      lucideShieldAlert,
      lucideGraduationCap,
      lucideUserCheck,
      lucideShield,
      lucideCar,
      lucideBedDouble,
    }),
  ],
  template: `
    <div class="px-2 py-1">
      @if (layoutService.sidebarOpen() && group.title) {
        <div class="px-2 py-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          {{ group.title }}
        </div>
      }

      <div class="space-y-1">
        @for (item of group.items; track item.title) {
          @if (item.items) {
            <!-- Collapsible Submenu with Smooth Animated Expansion -->
            <div>
              <button
                type="button"
                (click)="toggleCollapse(item.title)"
                class="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring cursor-pointer group"
                [attr.aria-expanded]="isExpanded(item.title)"
              >
                @if (item.icon) {
                  <ng-icon [name]="item.icon" class="size-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
                }
                @if (layoutService.sidebarOpen()) {
                  <span class="truncate flex-1 text-left font-medium">{{ item.title }}</span>
                  <ng-icon
                    name="lucideChevronRight"
                    class="size-4 text-muted-foreground transition-transform duration-200"
                    [class.rotate-90]="isExpanded(item.title)"
                  />
                }
              </button>

              @if (layoutService.sidebarOpen() && isExpanded(item.title)) {
                <div class="ml-4 mt-1 space-y-0.5 border-l border-sidebar-border pl-3 animate-submenu-open">
                  @for (subItem of item.items; track subItem.title) {
                    <a
                      [routerLink]="subItem.url"
                      routerLinkActive="bg-sidebar-accent text-sidebar-primary font-semibold"
                      [routerLinkActiveOptions]="{ exact: subItem.url === '/' }"
                      class="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-medium"
                    >
                      @if (subItem.icon) {
                        <ng-icon [name]="subItem.icon" class="size-3.5 shrink-0 text-muted-foreground" />
                      }
                      <span class="truncate">{{ subItem.title }}</span>
                    </a>
                  }
                </div>
              }
            </div>
          } @else {
            <!-- Single Link Item -->
            <a
              [routerLink]="item.url"
              routerLinkActive="bg-sidebar-accent text-sidebar-primary font-semibold shadow-2xs"
              [routerLinkActiveOptions]="{ exact: item.url === '/' }"
              class="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring group"
            >
              @if (item.icon) {
                <ng-icon [name]="item.icon" class="size-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
              }
              @if (layoutService.sidebarOpen()) {
                <span class="truncate flex-1">{{ item.title }}</span>
                @if (item.badge) {
                  <span hlmBadge variant="secondary" class="ml-auto text-[10px] px-1.5 py-0.2 font-semibold">
                    {{ item.badge }}
                  </span>
                }
              }
            </a>
          }
        }
      </div>
    </div>
  `,
})
export class NavGroupComponent {
  @Input({ required: true }) group!: NavGroup
  private readonly expandedKeys = signal<Set<string>>(new Set(['Auth', 'Errors', 'Settings', 'Secured by Clerk']))

  constructor(public layoutService: LayoutService) {}

  isExpanded(title: string): boolean {
    return this.expandedKeys().has(title)
  }

  toggleCollapse(title: string): void {
    const next = new Set(this.expandedKeys())
    if (next.has(title)) {
      next.delete(title)
    } else {
      next.add(title)
    }
    this.expandedKeys.set(next)
  }
}
