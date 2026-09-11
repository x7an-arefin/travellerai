import { Injectable, inject, signal } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators'

export interface WorkflowTab {
  id: string
  title: string
  url: string
  icon: string
  pinned?: boolean
}

const ROUTE_META_MAP: Record<string, { title: string; icon: string }> = {
  '/': { title: 'Overview', icon: 'lucideLayoutDashboard' },
  '/tasks': { title: 'Tasks', icon: 'lucideListTodo' },
  '/products': { title: 'Products', icon: 'lucidePackage' },
  '/analytics': { title: 'Analytics', icon: 'lucideTrendingUp' },
  '/deals': { title: 'Deals CRM', icon: 'lucideBadgeDollarSign' },
  '/ai-workflows': { title: 'AI Studio', icon: 'lucideWorkflow' },
  '/organization': { title: 'Organization', icon: 'lucideNetwork' },
  '/users': { title: 'Users & Roles', icon: 'lucideUsers' },
  '/settings': { title: 'Settings', icon: 'lucideSettings' },
  '/billing': { title: 'Billing', icon: 'lucideCreditCard' },
}

@Injectable({
  providedIn: 'root',
})
export class WorkflowTabsService {
  private readonly router = inject(Router)

  readonly tabs = signal<WorkflowTab[]>([
    { id: 'tab-home', title: 'Overview', url: '/', icon: 'lucideLayoutDashboard', pinned: true },
  ])

  readonly activeUrl = signal<string>('/')

  constructor() {
    this.handleNavigation(this.router.url)

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.handleNavigation(event.urlAfterRedirects || event.url)
      })
  }

  private handleNavigation(url: string): void {
    const rawPath = url.split('?')[0]
    this.activeUrl.set(rawPath)

    if (rawPath === '/') return

    const existing = this.tabs().find((t) => t.url === rawPath)
    if (!existing) {
      const meta = ROUTE_META_MAP[rawPath] || {
        title: this.formatTitleFromPath(rawPath),
        icon: 'lucideFolder',
      }

      const newTab: WorkflowTab = {
        id: `tab-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title: meta.title,
        url: rawPath,
        icon: meta.icon,
        pinned: false,
      }

      this.tabs.update((list) => [...list, newTab])
    }
  }

  selectTab(tab: WorkflowTab): void {
    this.activeUrl.set(tab.url)
    this.router.navigateByUrl(tab.url)
  }

  togglePin(id: string, event?: Event): void {
    if (event) event.stopPropagation()
    this.tabs.update((list) =>
      list.map((t) => (t.id === id ? { ...t, pinned: !t.pinned } : t))
    )
  }

  closeTab(id: string, event?: Event): void {
    if (event) event.stopPropagation()

    const list = this.tabs()
    const targetIndex = list.findIndex((t) => t.id === id)
    if (targetIndex === -1) return

    const targetTab = list[targetIndex]
    if (targetTab.pinned) return

    const updated = list.filter((t) => t.id !== id)
    this.tabs.set(updated)

    if (this.activeUrl() === targetTab.url && updated.length > 0) {
      const nextTab = updated[Math.min(targetIndex, updated.length - 1)]
      this.selectTab(nextTab)
    }
  }

  closeOthers(id: string): void {
    this.tabs.update((list) => list.filter((t) => t.id === id || t.pinned))
  }

  closeUnpinned(): void {
    const pinnedList = this.tabs().filter((t) => t.pinned)
    const nextTabs = pinnedList.length > 0 ? pinnedList : [{ id: 'tab-home', title: 'Overview', url: '/', icon: 'lucideLayoutDashboard', pinned: true }]
    this.tabs.set(nextTabs)
    const currentTabStillExists = nextTabs.some((t) => t.url === this.activeUrl())
    if (!currentTabStillExists && nextTabs.length > 0) {
      this.selectTab(nextTabs[0])
    }
  }

  reorderTabs(fromIndex: number, toIndex: number): void {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return
    const list = [...this.tabs()]
    if (fromIndex >= list.length || toIndex >= list.length) return
    const [moved] = list.splice(fromIndex, 1)
    list.splice(toIndex, 0, moved)
    this.tabs.set(list)
  }

  private formatTitleFromPath(path: string): string {
    const segment = path.split('/').filter(Boolean).pop() || 'Page'
    return segment
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }
}
