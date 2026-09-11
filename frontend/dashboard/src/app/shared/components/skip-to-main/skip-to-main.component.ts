import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-skip-to-main',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      href="#content"
      class="fixed left-4 top-4 z-[9999] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Skip to Main Content
    </a>
  `,
})
export class SkipToMainComponent {}
