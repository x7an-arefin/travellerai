import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideTrash2, lucideX, lucideCopy, lucideDownload } from '@ng-icons/lucide'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'

@Component({
  selector: 'app-data-table-bulk-actions',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmButtonImports, ...HlmBadgeImports],
  providers: [provideIcons({ lucideTrash2, lucideX, lucideCopy, lucideDownload })],
  template: `
    @if (selectedCount > 0) {
      @if (position === 'floating-top') {
        <div class="sticky top-2 z-40 flex items-center justify-between gap-3 rounded-xl border border-border bg-popover/95 bg-white dark:bg-zinc-900 px-4 py-2.5 shadow-xl backdrop-blur-xs animate-in fade-in-0 slide-in-from-top-4 duration-200">
          <div class="flex items-center gap-2.5">
            <span hlmBadge variant="default" class="font-semibold text-xs px-2.5 py-0.5">
              {{ selectedCount }} selected
            </span>
            <span class="text-xs text-muted-foreground hidden sm:inline">
              Selected {{ selectedCount }} {{ selectedCount === 1 ? 'item' : 'items' }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button
              hlmBtn
              variant="outline"
              size="sm"
              (click)="exportSelected.emit()"
              class="h-7 text-xs gap-1.5 cursor-pointer rounded-lg bg-background"
            >
              <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
              <span>Export</span>
            </button>

            <button
              hlmBtn
              variant="destructive"
              size="sm"
              (click)="deleteSelected.emit()"
              class="h-7 text-xs gap-1.5 cursor-pointer rounded-lg"
            >
              <ng-icon name="lucideTrash2" class="size-3.5" />
              <span>Delete</span>
            </button>

            <button
              hlmBtn
              variant="ghost"
              size="sm"
              (click)="clearSelection.emit()"
              class="h-7 text-xs gap-1 cursor-pointer text-muted-foreground hover:text-foreground rounded-lg"
            >
              <ng-icon name="lucideX" class="size-3.5" />
              <span class="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>
      } @else if (position === 'bottom') {
        <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-border bg-popover bg-white dark:bg-zinc-900 px-4 py-2 shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
          <span hlmBadge variant="secondary" class="font-semibold text-xs px-2 py-0.5">
            {{ selectedCount }} selected
          </span>

          <div class="h-4 w-px bg-border mx-1"></div>

          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="exportSelected.emit()"
            class="h-7 text-xs gap-1.5 cursor-pointer rounded-full"
          >
            <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
            <span class="hidden sm:inline">Export</span>
          </button>

          <button
            hlmBtn
            variant="destructive"
            size="sm"
            (click)="deleteSelected.emit()"
            class="h-7 text-xs gap-1.5 cursor-pointer rounded-full"
          >
            <ng-icon name="lucideTrash2" class="size-3.5" />
            <span>Delete</span>
          </button>

          <button
            hlmBtn
            variant="ghost"
            size="icon"
            (click)="clearSelection.emit()"
            class="size-7 rounded-full cursor-pointer text-muted-foreground hover:text-foreground ml-1"
            aria-label="Clear selection"
          >
            <ng-icon name="lucideX" class="size-3.5" />
          </button>
        </div>
      } @else {
        <!-- Default Top Banner position -->
        <div class="flex items-center justify-between gap-3 rounded-lg border border-primary/25 bg-primary/5 dark:bg-primary/10 px-3.5 py-2 text-xs transition-all animate-in fade-in-0 slide-in-from-top-2 duration-150">
          <div class="flex items-center gap-2.5">
            <span hlmBadge variant="default" class="font-semibold text-[11px] px-2.5 py-0.5">
              {{ selectedCount }} selected
            </span>
            <span class="text-xs text-muted-foreground hidden sm:inline">
              Selected {{ selectedCount }} {{ selectedCount === 1 ? 'item' : 'items' }} from the list
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button
              hlmBtn
              variant="outline"
              size="sm"
              (click)="exportSelected.emit()"
              class="h-7 text-xs gap-1.5 cursor-pointer bg-background"
            >
              <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
              <span>Export</span>
            </button>

            <button
              hlmBtn
              variant="destructive"
              size="sm"
              (click)="deleteSelected.emit()"
              class="h-7 text-xs gap-1.5 cursor-pointer"
            >
              <ng-icon name="lucideTrash2" class="size-3.5" />
              <span>Delete</span>
            </button>

            <button
              hlmBtn
              variant="ghost"
              size="sm"
              (click)="clearSelection.emit()"
              class="h-7 text-xs gap-1 cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <ng-icon name="lucideX" class="size-3.5" />
              <span class="hidden sm:inline">Clear selection</span>
            </button>
          </div>
        </div>
      }
    }
  `,
})
export class DataTableBulkActionsComponent {
  @Input() selectedCount: number = 0
  @Input() position: 'top' | 'floating-top' | 'bottom' = 'top'
  @Output() readonly deleteSelected = new EventEmitter<void>()
  @Output() readonly exportSelected = new EventEmitter<void>()
  @Output() readonly clearSelection = new EventEmitter<void>()
}
