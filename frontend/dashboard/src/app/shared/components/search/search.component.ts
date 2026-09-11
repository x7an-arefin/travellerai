import { Component, Input, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideSearch } from '@ng-icons/lucide'
import { SearchService } from '@core/services/search.service'
import { cn } from '@core/utils/cn'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ lucideSearch })],
  template: `
    <button
      type="button"
      (click)="searchService.open()"
      [class]="_computedClasses()"
    >
      <ng-icon name="lucideSearch" class="size-4 text-muted-foreground shrink-0" />
      <span class="inline-flex">Search...</span>
      <kbd class="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span class="text-xs">⌘</span>K
      </kbd>
    </button>
  `,
})
export class SearchComponent {
  @Input() class: string = ''

  constructor(public searchService: SearchService) {}

  _computedClasses(): string {
    return cn(
      'relative flex h-9 w-full items-center gap-2 rounded-md border border-input bg-background/50 px-3 py-1 text-sm text-muted-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground sm:w-64 sm:pr-12 cursor-pointer',
      this.class
    )
  }
}
