import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideSlidersHorizontal, lucideCheck } from '@ng-icons/lucide'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmMenuImports } from '../../../ui/dropdown-menu/hlm-menu.components'

export interface ColumnViewOption {
  id: string
  label: string
  visible: boolean
}

@Component({
  selector: 'app-data-table-view-options',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmButtonImports, ...HlmMenuImports],
  providers: [provideIcons({ lucideSlidersHorizontal, lucideCheck })],
  template: `
    <hlm-dropdown-menu side="auto">
      <button
        hlmMenuTrigger
        hlmBtn
        variant="outline"
        size="sm"
        class="h-8 gap-1.5 cursor-pointer text-xs ml-auto hidden md:inline-flex bg-background bg-white dark:bg-zinc-950"
      >
        <ng-icon name="lucideSlidersHorizontal" class="size-3.5 text-muted-foreground" />
        <span>View</span>
      </button>

      <div class="w-40 p-1">
        <div hlmMenuLabel class="text-xs font-semibold text-muted-foreground px-2 py-1">Toggle columns</div>
        <div hlmMenuSeparator></div>

        @for (col of columns; track col.id) {
          <button
            hlmMenuItem
            (click)="toggleColumn(col)"
            class="flex items-center justify-between gap-2 px-2 py-1.5 text-xs cursor-pointer capitalize"
          >
            <span>{{ col.label }}</span>
            @if (col.visible) {
              <ng-icon name="lucideCheck" class="size-3.5 text-primary" />
            }
          </button>
        }
      </div>
    </hlm-dropdown-menu>
  `,
})
export class DataTableViewOptionsComponent {
  @Input() columns: ColumnViewOption[] = []
  @Output() readonly columnsChange = new EventEmitter<ColumnViewOption[]>()

  toggleColumn(col: ColumnViewOption): void {
    col.visible = !col.visible
    this.columnsChange.emit(this.columns)
  }
}
