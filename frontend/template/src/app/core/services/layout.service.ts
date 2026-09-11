import { Injectable, computed, inject, signal, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { getCookie, setCookie } from '../utils/cookies'

export type Collapsible = 'offcanvas' | 'icon' | 'none'
export type SidebarVariant = 'inset' | 'sidebar' | 'floating'

const LAYOUT_COLLAPSIBLE_COOKIE_NAME = 'layout_collapsible'
const LAYOUT_VARIANT_COOKIE_NAME = 'layout_variant'
const SIDEBAR_STATE_COOKIE_NAME = 'sidebar_state'
const SHOW_WORKFLOW_TABS_COOKIE_NAME = 'show_workflow_tabs'

const DEFAULT_VARIANT: SidebarVariant = 'inset'
const DEFAULT_COLLAPSIBLE: Collapsible = 'icon'

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly platformId = inject(PLATFORM_ID)

  readonly defaultVariant: SidebarVariant = DEFAULT_VARIANT
  readonly defaultCollapsible: Collapsible = DEFAULT_COLLAPSIBLE

  private readonly _variant = signal<SidebarVariant>(this.getInitialVariant())
  readonly variant = this._variant.asReadonly()

  private readonly _collapsible = signal<Collapsible>(this.getInitialCollapsible())
  readonly collapsible = this._collapsible.asReadonly()

  private readonly _sidebarOpen = signal<boolean>(this.getInitialSidebarOpen())
  readonly sidebarOpen = this._sidebarOpen.asReadonly()

  private readonly _mobileOpen = signal<boolean>(false)
  readonly mobileOpen = this._mobileOpen.asReadonly()

  private readonly _showWorkflowTabs = signal<boolean>(this.getInitialShowWorkflowTabs())
  readonly showWorkflowTabs = this._showWorkflowTabs.asReadonly()

  readonly layoutState = computed(() => {
    return this._sidebarOpen() ? 'default' : this._collapsible()
  })

  setVariant(variant: SidebarVariant): void {
    setCookie(LAYOUT_VARIANT_COOKIE_NAME, variant, 7)
    this._variant.set(variant)
  }

  setCollapsible(collapsible: Collapsible): void {
    setCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME, collapsible, 7)
    this._collapsible.set(collapsible)
  }

  setSidebarOpen(open: boolean): void {
    setCookie(SIDEBAR_STATE_COOKIE_NAME, String(open), 7)
    this._sidebarOpen.set(open)
  }

  toggleSidebar(): void {
    this.setSidebarOpen(!this._sidebarOpen())
  }

  setMobileOpen(open: boolean): void {
    this._mobileOpen.set(open)
  }

  toggleMobile(): void {
    this._mobileOpen.set(!this._mobileOpen())
  }

  setShowWorkflowTabs(show: boolean): void {
    setCookie(SHOW_WORKFLOW_TABS_COOKIE_NAME, String(show), 7)
    this._showWorkflowTabs.set(show)
  }

  toggleShowWorkflowTabs(): void {
    this.setShowWorkflowTabs(!this._showWorkflowTabs())
  }

  resetLayout(): void {
    this.setCollapsible(DEFAULT_COLLAPSIBLE)
    this.setVariant(DEFAULT_VARIANT)
    this.setSidebarOpen(true)
    this.setShowWorkflowTabs(true)
  }

  private getInitialVariant(): SidebarVariant {
    if (!isPlatformBrowser(this.platformId)) return DEFAULT_VARIANT
    const cookie = getCookie(LAYOUT_VARIANT_COOKIE_NAME) as SidebarVariant | null
    return cookie || DEFAULT_VARIANT
  }

  private getInitialCollapsible(): Collapsible {
    if (!isPlatformBrowser(this.platformId)) return DEFAULT_COLLAPSIBLE
    const cookie = getCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME) as Collapsible | null
    return cookie || DEFAULT_COLLAPSIBLE
  }

  private getInitialSidebarOpen(): boolean {
    if (!isPlatformBrowser(this.platformId)) return true
    const cookie = getCookie(SIDEBAR_STATE_COOKIE_NAME)
    return cookie !== 'false'
  }

  private getInitialShowWorkflowTabs(): boolean {
    if (!isPlatformBrowser(this.platformId)) return true
    const cookie = getCookie(SHOW_WORKFLOW_TABS_COOKIE_NAME)
    return cookie !== 'false'
  }
}
