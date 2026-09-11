import { Injectable, effect, inject, signal, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { getCookie, removeCookie, setCookie } from '../utils/cookies'

export type Direction = 'ltr' | 'rtl'

const DEFAULT_DIRECTION: Direction = 'ltr'
const DIRECTION_COOKIE_NAME = 'dir'

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  private readonly platformId = inject(PLATFORM_ID)
  readonly defaultDir: Direction = DEFAULT_DIRECTION

  private readonly _dir = signal<Direction>(this.getInitialDirection())
  readonly dir = this._dir.asReadonly()

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const currentDir = this._dir()
        document.documentElement.setAttribute('dir', currentDir)
      })
    }
  }

  setDir(dir: Direction): void {
    setCookie(DIRECTION_COOKIE_NAME, dir, 365)
    this._dir.set(dir)
  }

  resetDir(): void {
    removeCookie(DIRECTION_COOKIE_NAME)
    this._dir.set(DEFAULT_DIRECTION)
  }

  private getInitialDirection(): Direction {
    if (!isPlatformBrowser(this.platformId)) return DEFAULT_DIRECTION
    const cookie = getCookie(DIRECTION_COOKIE_NAME) as Direction | null
    return cookie || DEFAULT_DIRECTION
  }
}
