import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowUp,
  lucideArrowDown,
  lucideChevronsUpDown,
  lucideEyeOff,
} from '@ng-icons/lucide'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmMenuImports } from '../../../ui/dropdown-menu/hlm-menu.components'
import { cn } from '../../../core/utils/cn'

export type SortDirection = 'asc' | 'desc' | null

@Component({
  selector: 'app-data-table-column-header',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmButtonImports, ...HlmMenuImports],
  providers: [
    provideIcons({
      lucideArrowUp,
      lucideArrowDown,
      lucideChevronsUpDown,
      lucideEyeOff,
    }),
  ],
  template: `
    @if (!canSort) {
      <div [class]="cn('text-sm font-medium', className)">{{ title }}</div>
    } @else {
      <div [class]="cn('flex items-center space-x-2', className)">
        <hlm-dropdown-menu>
          <button
            hlmMenuTrigger
            hlmBtn
            variant="ghost"
            size="sm"
            class="-ml-3 h-8 px-2 text-xs font-medium data-[state=open]:bg-accent cursor-pointer hover:bg-accent hover:text-accent-foreground"
          >
            <span>{{ title }}</span>
            @if (direction === 'desc') {
              <ng-icon name="lucideArrowDown" class="ml-2 h-4 w-4" />
            } @else if (direction === 'asc') {
              <ng-icon name="lucideArrowUp" class="ml-2 h-4 w-4" />
            } @else {
              <ng-icon name="lucideChevronsUpDown" class="ml-2 h-4 w-4 text-muted-foreground/60" />
            }
          </button>

          <div class="w-36 p-1">
            <button
              hlmMenuItem
              (click)="setSort('asc')"
              class="flex items-center gap-2 px-2 py-1.5 text-xs font-medium cursor-pointer"
              [class.bg-accent]="direction === 'asc'"
            >
              <ng-icon name="lucideArrowUp" class="size-3.5 text-muted-foreground/70" />
              <span>Asc</span>
            </button>

            <button
              hlmMenuItem
              (click)="setSort('desc')"
              class="flex items-center gap-2 px-2 py-1.5 text-xs font-medium cursor-pointer"
              [class.bg-accent]="direction === 'desc'"
            >
              <ng-icon name="lucideArrowDown" class="size-3.5 text-muted-foreground/70" />
              <span>Desc</span>
            </button>

            @if (canHide) {
              <div hlmMenuSeparator></div>
              <button
                hlmMenuItem
                (click)="hide.emit()"
                class="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <ng-icon name="lucideEyeOff" class="size-3.5 text-muted-foreground/70" />
                <span>Hide</span>
              </button>
            }
          </div>
        </hlm-dropdown-menu>
      </div>
    }
  `,
})
export class DataTableColumnHeaderComponent {
  @Input({ required: true }) title!: string
  @Input() canSort: boolean = true
  @Input() canHide: boolean = true
  @Input() direction: SortDirection = null
  @Input() className: string = ''

  @Output() readonly sortChange = new EventEmitter<SortDirection>()
  @Output() readonly hide = new EventEmitter<void>()

  readonly cn = cn

  setSort(dir: SortDirection): void {
    if (this.direction === dir) {
      this.sortChange.emit(null)
    } else {
      this.sortChange.emit(dir)
    }
  }
}
