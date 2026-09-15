import { Component, input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { lucideAlertTriangle } from '@ng-icons/lucide'

@Component({
  selector: 'app-fallback-banner',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ lucideAlertTriangle })],
  template: `
    @if (show()) {
      <div class="mb-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300">
        <ng-icon name="lucideAlertTriangle" class="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <span><strong>Dev Mode:</strong> Live API unreachable at current endpoint — demonstrating system behavior using realistic fallback dataset.</span>
      </div>
    }
  `,
})
export class FallbackBannerComponent {
  readonly show = input<boolean>(false)
}
