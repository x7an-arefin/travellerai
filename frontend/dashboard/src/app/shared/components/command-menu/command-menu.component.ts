import { Component, ElementRef, HostListener, ViewChild, computed, effect, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideSearch,
  lucideLayoutDashboard,
  lucideListTodo,
  lucidePackage,
  lucideMessagesSquare,
  lucideUsers,
  lucideSettings,
  lucideSun,
  lucideMoon,
  lucideLaptop,
  lucideLogOut,
  lucideArrowRight,
  lucideClock,
  lucideHelpCircle,
  lucideKanban,
  lucideFolder,
  lucideCreditCard,
  lucideShieldCheck,
  lucideKey,
  lucideSparkles,
  lucideRocket,
  lucideUser,
  lucideCalendar,
  lucideInbox,
  lucideShoppingBag,
  lucideBot,
  lucideTrendingUp,
  lucideStar,
  lucideActivity,
  lucideLock,
  lucideBoxes,
  lucideWorkflow,
  lucideBadgeDollarSign,
  lucideRadio,
  lucideHeadphones,
  lucideServer,
  lucideComponent,
  lucideMap,
  lucideReceipt,
  lucideNetwork,
  lucideBuilding2,
  lucideMegaphone,
  lucideShare2,
  lucideTv,
  lucideWallet,
  lucideDatabase,
  lucideShieldAlert,
  lucideGraduationCap,
} from '@ng-icons/lucide'
import { HlmDialogImports } from '@ui/dialog/hlm-dialog.components'
import { SearchService } from '@core/services/search.service'
import { ThemeService } from '@core/services/theme.service'
import { LayoutService } from '@core/services/layout.service'
import { AuthService } from '@core/services/auth.service'

interface CommandItem {
  title: string
  url?: string
  icon: string
  group: string
  action?: () => void
}

@Component({
  selector: 'app-command-menu',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmDialogImports],
  providers: [
    provideIcons({
      lucideSearch,
      lucideLayoutDashboard,
      lucideListTodo,
      lucidePackage,
      lucideMessagesSquare,
      lucideUsers,
      lucideSettings,
      lucideSun,
      lucideMoon,
      lucideLaptop,
      lucideLogOut,
      lucideArrowRight,
      lucideClock,
      lucideHelpCircle,
      lucideKanban,
      lucideFolder,
      lucideCreditCard,
      lucideShieldCheck,
      lucideKey,
      lucideSparkles,
      lucideRocket,
      lucideUser,
      lucideCalendar,
      lucideInbox,
      lucideShoppingBag,
      lucideBot,
      lucideTrendingUp,
      lucideStar,
      lucideActivity,
      lucideLock,
      lucideBoxes,
      lucideWorkflow,
      lucideBadgeDollarSign,
      lucideRadio,
      lucideHeadphones,
      lucideServer,
      lucideComponent,
      lucideMap,
      lucideReceipt,
      lucideNetwork,
      lucideBuilding2,
      lucideMegaphone,
      lucideShare2,
      lucideTv,
      lucideWallet,
      lucideDatabase,
      lucideShieldAlert,
      lucideGraduationCap,
    }),
  ],
  template: `
    <hlm-dialog [isOpen]="searchService.isOpen()" [showClose]="false" (closed)="searchService.close()" class="p-0 overflow-hidden max-w-xl">
      <div class="flex items-center border-b px-3.5 bg-background">
        <ng-icon name="lucideSearch" class="mr-2 size-4 shrink-0 opacity-50" />
        <input
          #searchInput
          type="text"
          [value]="query()"
          (input)="handleInput($event)"
          (keydown)="handleKeyDown($event)"
          placeholder="Type a command or search workspace..."
          class="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd
          class="pointer-events-none select-none inline-flex h-5 items-center gap-1 rounded border border-border/80 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shrink-0 shadow-2xs"
        >
          Esc
        </kbd>
      </div>

      <div class="max-h-[320px] overflow-y-auto p-2 no-scrollbar">
        @if (filteredItems().length === 0) {
          <div class="py-8 text-center text-xs text-muted-foreground">
            No matching commands or pages found.
          </div>
        }

        @for (group of groupedItems(); track group.name) {
          <div class="mb-2">
            <div class="px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              {{ group.name }}
            </div>

            @for (item of group.items; track item.title) {
              <button
                type="button"
                (click)="execute(item)"
                class="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs sm:text-sm font-medium outline-none transition-colors cursor-pointer text-left"
                [class.bg-accent]="isHighlighted(item)"
                [class.text-accent-foreground]="isHighlighted(item)"
                [class.hover:bg-accent]="true"
              >
                <ng-icon [name]="item.icon" class="size-4 text-muted-foreground shrink-0" />
                <span class="flex-1 truncate">{{ item.title }}</span>
                <ng-icon name="lucideArrowRight" class="size-3 text-muted-foreground/60 shrink-0" />
              </button>
            }
          </div>
        }
      </div>

      <!-- Footer with Navigation Shortcuts -->
      <div class="flex items-center justify-between border-t border-border/60 px-3.5 py-2 text-[11px] text-muted-foreground bg-muted/20">
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1">
            <kbd class="rounded border border-border bg-background px-1 py-0.5 font-mono text-[9px] font-semibold">↑↓</kbd>
            <span>Navigate</span>
          </span>
          <span class="flex items-center gap-1">
            <kbd class="rounded border border-border bg-background px-1 py-0.5 font-mono text-[9px] font-semibold">↵</kbd>
            <span>Select</span>
          </span>
        </div>
        <span class="flex items-center gap-1">
          <kbd class="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[9px] font-semibold">Esc</kbd>
          <span>Close</span>
        </span>
      </div>
    </hlm-dialog>
  `,
})
export class CommandMenuComponent {
  readonly query = signal<string>('')
  readonly activeIndex = signal<number>(0)

  readonly allItems: CommandItem[] = [
    { title: 'Dashboard Overview', url: '/', icon: 'lucideLayoutDashboard', group: 'Navigation' },
    { title: 'Organization Hierarchy', url: '/organization', icon: 'lucideNetwork', group: 'Navigation' },
    { title: 'Multi-Tenant Workspaces', url: '/workspaces', icon: 'lucideBuilding2', group: 'Navigation' },
    { title: 'Products & Inventory Hub', url: '/products', icon: 'lucideBoxes', group: 'Navigation' },
    { title: 'AI Agent Studio & Workflows', url: '/ai-workflows', icon: 'lucideWorkflow', group: 'Navigation' },
    { title: 'CRM Deals Pipeline', url: '/deals', icon: 'lucideBadgeDollarSign', group: 'Finance & CRM' },
    { title: 'Corporate Expenses', url: '/expenses', icon: 'lucideWallet', group: 'Finance & CRM' },
    { title: 'KYC Document Verification', url: '/verification', icon: 'lucideShieldCheck', group: 'Security & Compliance' },
    { title: 'Interactive SQL Database Studio', url: '/database-studio', icon: 'lucideDatabase', group: 'Developer & Cloud' },
    { title: 'Security Vulnerability Hub', url: '/security-hub', icon: 'lucideShieldAlert', group: 'Security & Compliance' },
    { title: 'Marketing Campaigns', url: '/campaigns', icon: 'lucideMegaphone', group: 'Analytics & Growth' },
    { title: 'Affiliate Referral Portal', url: '/affiliates', icon: 'lucideShare2', group: 'Analytics & Growth' },
    { title: 'Live Broadcast Webinar Studio', url: '/broadcast', icon: 'lucideTv', group: 'Analytics & Growth' },
    { title: 'Learning Academy LMS', url: '/academy', icon: 'lucideGraduationCap', group: 'Developer & Cloud' },
    { title: 'Support SLA Helpdesk', url: '/tickets', icon: 'lucideHeadphones', group: 'Navigation' },
    { title: 'Live Telemetry & Geo Traffic', url: '/realtime', icon: 'lucideRadio', group: 'Analytics & Growth' },
    { title: 'Cluster & Cloud Infrastructure', url: '/infrastructure', icon: 'lucideServer', group: 'Developer & Cloud' },
    { title: 'Design System & Component Gallery', url: '/design-system', icon: 'lucideComponent', group: 'Developer & Cloud' },
    { title: 'Product Roadmap & Changelog', url: '/roadmap', icon: 'lucideMap', group: 'Developer & Cloud' },
    { title: 'Invoice Builder & PDF Generator', url: '/invoices', icon: 'lucideReceipt', group: 'Finance & CRM' },
    { title: 'Tasks Management', url: '/tasks', icon: 'lucideListTodo', group: 'Navigation' },
    { title: 'Kanban Sprint Board', url: '/kanban', icon: 'lucideKanban', group: 'Navigation' },
    { title: 'Calendar & Scheduling', url: '/calendar', icon: 'lucideCalendar', group: 'Navigation' },
    { title: 'Mail & Inbox Client', url: '/inbox', icon: 'lucideInbox', group: 'Navigation' },
    { title: 'Files & Media Drive', url: '/files', icon: 'lucideFolder', group: 'Navigation' },
    { title: 'E-Commerce Orders', url: '/orders', icon: 'lucideShoppingBag', group: 'Navigation' },
    { title: 'AI Model Playground', url: '/ai-playground', icon: 'lucideBot', group: 'Navigation' },
    { title: 'Conversion Funnel', url: '/funnel', icon: 'lucideTrendingUp', group: 'Analytics & Growth' },
    { title: 'Customer Feedback & NPS', url: '/feedback', icon: 'lucideStar', group: 'Analytics & Growth' },
    { title: 'System Uptime Status', url: '/status', icon: 'lucideActivity', group: 'Analytics & Growth' },
    { title: 'Billing & Subscriptions', url: '/billing', icon: 'lucideCreditCard', group: 'Finance & CRM' },
    { title: 'Checkout & Payment', url: '/checkout', icon: 'lucideLock', group: 'Finance & CRM' },
    { title: 'SaaS Pricing & Plans', url: '/pricing', icon: 'lucideSparkles', group: 'Finance & CRM' },
    { title: 'Security Audit Logs', url: '/audit-logs', icon: 'lucideShieldCheck', group: 'Security & Compliance' },
    { title: 'API Keys & Webhooks', url: '/api-keys', icon: 'lucideKey', group: 'Security & Compliance' },
    { title: 'Project Setup Wizard', url: '/wizard', icon: 'lucideRocket', group: 'Workspace' },
    { title: 'User Profile Showcase', url: '/profile', icon: 'lucideUser', group: 'Workspace' },
    { title: 'App Integrations', url: '/apps', icon: 'lucidePackage', group: 'Navigation' },
    { title: 'Team Chats', url: '/chats', icon: 'lucideMessagesSquare', group: 'Navigation' },
    { title: 'User Directory', url: '/users', icon: 'lucideUsers', group: 'Navigation' },
    { title: 'Help Center & Docs', url: '/help-center', icon: 'lucideHelpCircle', group: 'Navigation' },
    { title: 'Coming Soon Preview', url: '/coming-soon', icon: 'lucideClock', group: 'Navigation' },
    { title: 'Settings: Profile', url: '/settings', icon: 'lucideSettings', group: 'Settings' },
    { title: 'Settings: Account', url: '/settings/account', icon: 'lucideSettings', group: 'Settings' },
    { title: 'Settings: Appearance', url: '/settings/appearance', icon: 'lucideSettings', group: 'Settings' },
    { title: 'Settings: Notifications', url: '/settings/notifications', icon: 'lucideSettings', group: 'Settings' },
    { title: 'Settings: Display', url: '/settings/display', icon: 'lucideSettings', group: 'Settings' },
    {
      title: 'Switch to Light Theme',
      icon: 'lucideSun',
      group: 'Theme Actions',
      action: () => this.themeService.setTheme('light'),
    },
    {
      title: 'Switch to Dark Theme',
      icon: 'lucideMoon',
      group: 'Theme Actions',
      action: () => this.themeService.setTheme('dark'),
    },
    {
      title: 'Switch to System Theme',
      icon: 'lucideLaptop',
      group: 'Theme Actions',
      action: () => this.themeService.setTheme('system'),
    },
    {
      title: 'Log out of Account',
      icon: 'lucideLogOut',
      group: 'Session',
      action: () => this.authService.signOut(),
    },
    { title: 'Switch Theme to Dark', icon: 'lucideMoon', group: 'Quick Actions', action: () => this.themeService.setTheme('dark') },
    { title: 'Switch Theme to Light', icon: 'lucideSun', group: 'Quick Actions', action: () => this.themeService.setTheme('light') },
    { title: 'Switch Theme to System', icon: 'lucideLaptop', group: 'Quick Actions', action: () => this.themeService.setTheme('system') },
    { title: 'Toggle Sidebar Collapse', icon: 'lucideKanban', group: 'Quick Actions', action: () => this.layoutService.toggleSidebar() },
    { title: 'Open Theme Settings Drawer', icon: 'lucideSettings', group: 'Quick Actions', action: () => this.router.navigateByUrl('/settings') },
    { title: 'Sign Out Account', icon: 'lucideLogOut', group: 'Quick Actions', action: () => this.authService.signOut() },
  ]

  readonly filteredItems = computed(() => {
    const q = this.query().toLowerCase().trim()
    if (!q) return this.allItems

    return this.allItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
      )
    })
  })

  readonly groupedItems = computed(() => {
    const items = this.filteredItems()
    const groups: { name: string; items: CommandItem[] }[] = []
    const map = new Map<string, CommandItem[]>()

    for (const item of items) {
      if (!map.has(item.group)) {
        map.set(item.group, [])
      }
      map.get(item.group)!.push(item)
    }

    for (const [name, list] of map.entries()) {
      groups.push({ name, items: list })
    }

    return groups
  })

  @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>

  constructor(
    public searchService: SearchService,
    private router: Router,
    private themeService: ThemeService,
    public layoutService: LayoutService,
    private authService: AuthService
  ) {
    effect(() => {
      if (this.searchService.isOpen()) {
        this.query.set('')
        this.activeIndex.set(0)
        setTimeout(() => {
          this.searchInputRef?.nativeElement?.focus()
        }, 30)
      }
    })
  }

  @HostListener('window:keydown', ['$event'])
  onWindowKeyDown(event: KeyboardEvent): void {
    if (!this.searchService.isOpen()) return

    if (event.key === 'Escape') {
      event.preventDefault()
      this.searchService.close()
    }
  }

  isHighlighted(item: CommandItem): boolean {
    const items = this.filteredItems()
    return items[this.activeIndex()] === item
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement
    this.query.set(input.value)
    this.activeIndex.set(0)
  }

  handleKeyDown(event: KeyboardEvent): void {
    const items = this.filteredItems()
    if (event.key === 'Escape') {
      this.searchService.close()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      this.activeIndex.update((i) => (i + 1) % items.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      this.activeIndex.update((i) => (i - 1 + items.length) % items.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const selected = items[this.activeIndex()]
      if (selected) {
        this.execute(selected)
      }
    }
  }

  execute(item: CommandItem): void {
    this.searchService.close()
    this.query.set('')
    if (item.action) {
      item.action()
    } else if (item.url) {
      this.router.navigateByUrl(item.url)
    }
  }
}
