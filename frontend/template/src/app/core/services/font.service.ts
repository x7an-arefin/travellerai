import { Injectable, effect, inject, signal, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { getCookie, removeCookie, setCookie } from '../utils/cookies'

export type AppFont = 'inter' | 'manrope'

const FONT_COOKIE_NAME = 'font'
const DEFAULT_FONT: AppFont = 'inter'

@Injectable({
  providedIn: 'root',
})
export class FontService {
  private readonly platformId = inject(PLATFORM_ID)

  private readonly _font = signal<AppFont>(this.getInitialFont())
  readonly font = this._font.asReadonly()

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const currentFont = this._font()
        const root = document.documentElement

        // Remove any font-* classes
        const classes = Array.from(root.classList)
        for (const c of classes) {
          if (c.startsWith('font-')) {
            root.classList.remove(c)
          }
        }

        root.classList.add(`font-${currentFont}`)
      })
    }
  }

  setFont(font: AppFont): void {
    setCookie(FONT_COOKIE_NAME, font, 365)
    this._font.set(font)
  }

  resetFont(): void {
    removeCookie(FONT_COOKIE_NAME)
    this._font.set(DEFAULT_FONT)
  }

  private getInitialFont(): AppFont {
    if (!isPlatformBrowser(this.platformId)) return DEFAULT_FONT
    const cookie = getCookie(FONT_COOKIE_NAME) as AppFont | null
    return cookie === 'manrope' || cookie === 'inter' ? cookie : DEFAULT_FONT
  }
}
