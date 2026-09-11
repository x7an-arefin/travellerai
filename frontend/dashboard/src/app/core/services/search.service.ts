import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

export interface SearchCommandItem {
  id: string
  title: string
  url?: string
  icon?: string
  group: 'General' | 'Pages' | 'Settings' | 'Actions'
  action?: () => void
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly platformId = inject(PLATFORM_ID)

  private readonly _isOpen = signal<boolean>(false)
  readonly isOpen = this._isOpen.asReadonly()

  private readonly _searchQuery = signal<string>('')
  readonly searchQuery = this._searchQuery.asReadonly()

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('keydown', (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault()
          this.toggle()
        }
      })
    }
  }

  open(): void {
    this._isOpen.set(true)
  }

  close(): void {
    this._isOpen.set(false)
    this._searchQuery.set('')
  }

  toggle(): void {
    this._isOpen.set(!this._isOpen())
  }

  setQuery(query: string): void {
    this._searchQuery.set(query)
  }
}
