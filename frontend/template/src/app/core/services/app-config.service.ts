import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import defaultConfig from '../config/app-config.json'

export interface AppConfig {
  name: string
  version: string
  theme: {
    preset: string
    radius: string
    mode: 'system' | 'light' | 'dark'
  }
  layout: {
    variant: 'inset' | 'sidebar' | 'floating'
    collapsible: 'offcanvas' | 'icon' | 'none'
    sidebarOpen: boolean
    showWorkflowTabs: boolean
  }
  allowUserCustomization: boolean
}

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private readonly platformId = inject(PLATFORM_ID)

  private readonly _config = signal<AppConfig>(this.loadInitialConfig())
  readonly config = this._config.asReadonly()

  private readonly _allowUserCustomization = signal<boolean>(
    this._config().allowUserCustomization ?? true
  )
  readonly allowUserCustomization = this._allowUserCustomization.asReadonly()

  private loadInitialConfig(): AppConfig {
    if (!isPlatformBrowser(this.platformId)) return defaultConfig as AppConfig
    try {
      const saved = localStorage.getItem('app_system_config')
      if (saved) {
        return { ...defaultConfig, ...JSON.parse(saved) } as AppConfig
      }
    } catch {
      // Fallback to static JSON
    }
    return defaultConfig as AppConfig
  }

  saveConfig(updated: Partial<AppConfig>): void {
    if (!this.allowUserCustomization()) return

    const current = this._config()
    const merged: AppConfig = {
      ...current,
      ...updated,
      theme: { ...current.theme, ...(updated.theme || {}) },
      layout: { ...current.layout, ...(updated.layout || {}) },
    }

    this._config.set(merged)
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('app_system_config', JSON.stringify(merged))
    }
  }

  setAllowUserCustomization(allow: boolean): void {
    this._allowUserCustomization.set(allow)
    this.saveConfig({ allowUserCustomization: allow })
  }

  toggleAllowUserCustomization(): void {
    this.setAllowUserCustomization(!this._allowUserCustomization())
  }
}
