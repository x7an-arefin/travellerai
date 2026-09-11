import { Injectable, signal } from '@angular/core'

export interface CloseableOverlay {
  close(): void
}

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private readonly activeOverlay = signal<CloseableOverlay | null>(null)

  /**
   * Registers an open overlay (dropdown menu, custom select, date range picker, faceted filter, etc.).
   * If another overlay is already open, it is automatically closed before opening the new one.
   */
  registerOpen(overlay: CloseableOverlay): void {
    const current = this.activeOverlay()
    if (current && current !== overlay) {
      current.close()
    }
    this.activeOverlay.set(overlay)
  }

  /**
   * Unregisters an overlay when it closes.
   */
  registerClose(overlay: CloseableOverlay): void {
    if (this.activeOverlay() === overlay) {
      this.activeOverlay.set(null)
    }
  }

  /**
   * Closes all currently open overlays across the application.
   */
  closeAll(): void {
    const current = this.activeOverlay()
    if (current) {
      current.close()
      this.activeOverlay.set(null)
    }
  }
}
