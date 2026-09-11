import { Injectable, computed, effect, inject, signal, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { getCookie, removeCookie, setCookie } from '../utils/cookies'

export type Theme = 'dark' | 'light' | 'system'
export type ResolvedTheme = 'dark' | 'light'

export interface ColorPreset {
  name: string
  label: string
  color: string // Hex or OKLCH for display swatch
  lightPrimary: string
  darkPrimary: string
  lightRing: string
  darkRing: string
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    name: 'zinc',
    label: 'Zinc',
    color: '#18181b',
    lightPrimary: 'oklch(0.208 0.042 265.755)',
    darkPrimary: 'oklch(0.929 0.013 255.508)',
    lightRing: 'oklch(0.704 0.04 256.788)',
    darkRing: 'oklch(0.551 0.027 264.364)',
  },
  {
    name: 'slate',
    label: 'Slate',
    color: '#334155',
    lightPrimary: 'oklch(0.35 0.05 240)',
    darkPrimary: 'oklch(0.85 0.04 240)',
    lightRing: 'oklch(0.65 0.05 240)',
    darkRing: 'oklch(0.50 0.04 240)',
  },
  {
    name: 'emerald',
    label: 'Emerald',
    color: '#059669',
    lightPrimary: 'oklch(0.55 0.18 155)',
    darkPrimary: 'oklch(0.75 0.18 155)',
    lightRing: 'oklch(0.65 0.15 155)',
    darkRing: 'oklch(0.55 0.14 155)',
  },
  {
    name: 'violet',
    label: 'Violet',
    color: '#7c3aed',
    lightPrimary: 'oklch(0.50 0.22 290)',
    darkPrimary: 'oklch(0.75 0.20 290)',
    lightRing: 'oklch(0.60 0.18 290)',
    darkRing: 'oklch(0.50 0.15 290)',
  },
  {
    name: 'rose',
    label: 'Rose',
    color: '#e11d48',
    lightPrimary: 'oklch(0.55 0.22 15)',
    darkPrimary: 'oklch(0.75 0.20 15)',
    lightRing: 'oklch(0.65 0.18 15)',
    darkRing: 'oklch(0.55 0.15 15)',
  },
  {
    name: 'amber',
    label: 'Amber',
    color: '#d97706',
    lightPrimary: 'oklch(0.60 0.18 75)',
    darkPrimary: 'oklch(0.75 0.18 75)',
    lightRing: 'oklch(0.65 0.16 75)',
    darkRing: 'oklch(0.55 0.14 75)',
  },
  {
    name: 'indigo',
    label: 'Indigo',
    color: '#4f46e5',
    lightPrimary: 'oklch(0.48 0.22 275)',
    darkPrimary: 'oklch(0.72 0.20 275)',
    lightRing: 'oklch(0.58 0.18 275)',
    darkRing: 'oklch(0.48 0.15 275)',
  },
  {
    name: 'teal',
    label: 'Teal',
    color: '#0d9488',
    lightPrimary: 'oklch(0.52 0.16 180)',
    darkPrimary: 'oklch(0.72 0.15 180)',
    lightRing: 'oklch(0.62 0.14 180)',
    darkRing: 'oklch(0.52 0.12 180)',
  },
  {
    name: 'cyan',
    label: 'Cyan',
    color: '#0891b2',
    lightPrimary: 'oklch(0.56 0.16 205)',
    darkPrimary: 'oklch(0.74 0.15 205)',
    lightRing: 'oklch(0.64 0.14 205)',
    darkRing: 'oklch(0.54 0.12 205)',
  },
  {
    name: 'orange',
    label: 'Orange',
    color: '#ea580c',
    lightPrimary: 'oklch(0.60 0.20 50)',
    darkPrimary: 'oklch(0.75 0.18 50)',
    lightRing: 'oklch(0.65 0.16 50)',
    darkRing: 'oklch(0.55 0.14 50)',
  },
  {
    name: 'sky',
    label: 'Sky',
    color: '#0284c7',
    lightPrimary: 'oklch(0.55 0.16 230)',
    darkPrimary: 'oklch(0.75 0.15 230)',
    lightRing: 'oklch(0.65 0.14 230)',
    darkRing: 'oklch(0.55 0.12 230)',
  },
]

const DEFAULT_THEME: Theme = 'system'
const THEME_COOKIE_NAME = 'vite-ui-theme'
const COLOR_COOKIE_NAME = 'ui-color-preset'
const RADIUS_COOKIE_NAME = 'ui-radius'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID)
  readonly defaultTheme = DEFAULT_THEME
  readonly presets = COLOR_PRESETS

  private readonly _theme = signal<Theme>(this.getInitialTheme())
  readonly theme = this._theme.asReadonly()

  private readonly _systemTheme = signal<ResolvedTheme>(this.getSystemTheme())

  readonly resolvedTheme = computed<ResolvedTheme>(() => {
    const currentTheme = this._theme()
    if (currentTheme === 'system') {
      return this._systemTheme()
    }
    return currentTheme
  })

  // Accent color preset
  private readonly _preset = signal<string>(this.getInitialPreset())
  readonly preset = this._preset.asReadonly()

  // Radius (e.g. '0.625rem')
  private readonly _radius = signal<string>(this.getInitialRadius())
  readonly radius = this._radius.asReadonly()

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return

    const mediaQuery = this.getColorSchemeQuery()
    if (mediaQuery) {
      const listener = (e: MediaQueryListEvent) => {
        this._systemTheme.set(e.matches ? 'dark' : 'light')
      }
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', listener)
      } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(listener)
      }
    }

    effect(() => {
      const resolved = this.resolvedTheme()
      const currentPreset = this._preset()
      const currentRadius = this._radius()
      const root = document.documentElement

      // 1. Theme classes
      root.classList.remove('light', 'dark')
      root.classList.add(resolved)

      // 2. Dynamic Accent Colors
      const found = COLOR_PRESETS.find((p) => p.name === currentPreset) || COLOR_PRESETS[0]
      const primary = resolved === 'dark' ? found.darkPrimary : found.lightPrimary
      const ring = resolved === 'dark' ? found.darkRing : found.lightRing

      root.style.setProperty('--primary', primary)
      root.style.setProperty('--sidebar-primary', primary)
      root.style.setProperty('--ring', ring)
      root.style.setProperty('--sidebar-ring', ring)

      // 3. Dynamic Radius
      root.style.setProperty('--radius', currentRadius)
    })
  }

  setTheme(theme: Theme): void {
    setCookie(THEME_COOKIE_NAME, theme, 365)
    this._theme.set(theme)
  }

  resetTheme(): void {
    removeCookie(THEME_COOKIE_NAME)
    this._theme.set(DEFAULT_THEME)
  }

  setPreset(name: string): void {
    setCookie(COLOR_COOKIE_NAME, name, 365)
    this._preset.set(name)
  }

  setRadius(radius: string): void {
    setCookie(RADIUS_COOKIE_NAME, radius, 365)
    this._radius.set(radius)
  }

  resetAll(): void {
    this.resetTheme()
    this.setPreset('zinc')
    this.setRadius('0.625rem')
  }

  private getInitialTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) return DEFAULT_THEME
    const cookie = getCookie(THEME_COOKIE_NAME) as Theme | null
    return cookie || DEFAULT_THEME
  }

  private getColorSchemeQuery(): MediaQueryList | null {
    if (!isPlatformBrowser(this.platformId) || typeof window.matchMedia !== 'function') return null
    return window.matchMedia('(prefers-color-scheme: dark)')
  }

  private getSystemTheme(): ResolvedTheme {
    return this.getColorSchemeQuery()?.matches ? 'dark' : 'light'
  }

  private getInitialPreset(): string {
    if (!isPlatformBrowser(this.platformId)) return 'zinc'
    const cookie = getCookie(COLOR_COOKIE_NAME)
    return cookie || 'zinc'
  }

  private getInitialRadius(): string {
    if (!isPlatformBrowser(this.platformId)) return '0.625rem'
    const cookie = getCookie(RADIUS_COOKIE_NAME)
    return cookie || '0.625rem'
  }
}
