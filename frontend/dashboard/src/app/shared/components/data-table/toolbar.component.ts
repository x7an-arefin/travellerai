import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideSearch, lucideX, lucideDownload, lucideFileSpreadsheet, lucideFileCode, lucideFileText } from '@ng-icons/lucide'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmMenuImports } from '../../../ui/dropdown-menu/hlm-menu.components'
import { DataTableFacetedFilterComponent, FacetOption } from './faceted-filter.component'
import { DataTableViewOptionsComponent, ColumnViewOption } from './view-options.component'

export interface DataTableFilterConfig {
  id: string
  title: string
  options: FacetOption[]
  selected: string[]
}

@Component({
  selector: 'app-data-table-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    ...HlmButtonImports,
    ...HlmMenuImports,
    DataTableFacetedFilterComponent,
    DataTableViewOptionsComponent,
  ],
  providers: [
    provideIcons({
      lucideSearch,
      lucideX,
      lucideDownload,
      lucideFileSpreadsheet,
      lucideFileCode,
      lucideFileText,
    }),
  ],
  template: `
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div class="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <!-- Search Input -->
        <div class="relative w-full sm:w-44 lg:w-64">
          <input
            type="text"
            [value]="searchQuery"
            (input)="onSearchInput($event)"
            [placeholder]="searchPlaceholder"
            class="h-8 w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <!-- Faceted Filters -->
        <div class="flex items-center gap-2 flex-wrap">
          @for (filter of filters; track filter.id) {
            <app-data-table-faceted-filter
              [title]="filter.title"
              [options]="filter.options"
              [selected]="filter.selected"
              (selectedChange)="onFilterChange(filter.id, $event)"
            />
          }

          <!-- Reset Filter Button -->
          @if (isFiltered) {
            <button
              hlmBtn
              variant="ghost"
              size="sm"
              (click)="resetFilters.emit()"
              class="h-8 px-2 lg:px-3 text-xs gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <span>Reset</span>
              <ng-icon name="lucideX" class="size-3.5" />
            </button>
          }
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- Export Dropdown Button -->
        @if (showExport) {
          <hlm-dropdown-menu>
            <button
              hlmMenuTrigger
              hlmBtn
              variant="outline"
              size="sm"
              class="h-8 gap-1.5 cursor-pointer text-xs bg-background"
            >
              <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
              <span>Export</span>
            </button>

            <div class="w-44 p-1">
              <div hlmMenuLabel class="text-[11px] font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">Export Format</div>
              <div hlmMenuSeparator></div>
              <button
                hlmMenuItem
                (click)="exportCsv.emit()"
                class="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium cursor-pointer"
              >
                <ng-icon name="lucideFileSpreadsheet" class="size-3.5 text-muted-foreground" />
                <span>Export to CSV</span>
              </button>
              <button
                hlmMenuItem
                (click)="exportPdf.emit()"
                class="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium cursor-pointer"
              >
                <ng-icon name="lucideFileText" class="size-3.5 text-muted-foreground" />
                <span>Export to PDF</span>
              </button>
              <button
                hlmMenuItem
                (click)="exportJson.emit()"
                class="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium cursor-pointer"
              >
                <ng-icon name="lucideFileCode" class="size-3.5 text-muted-foreground" />
                <span>Export to JSON</span>
              </button>
            </div>
          </hlm-dropdown-menu>
        }

        <!-- View Column Toggle Options -->
        <app-data-table-view-options [columns]="columns" (columnsChange)="columnsChange.emit($event)" />
      </div>
    </div>
  `,
})
export class DataTableToolbarComponent {
  @Input() searchQuery: string = ''
  @Input() searchPlaceholder: string = 'Filter tasks...'
  @Input() filters: DataTableFilterConfig[] = []
  @Input() isFiltered: boolean = false
  @Input() columns: ColumnViewOption[] = []
  @Input() showExport: boolean = true

  @Output() readonly searchQueryChange = new EventEmitter<string>()
  @Output() readonly filterChange = new EventEmitter<{ id: string; selected: string[] }>()
  @Output() readonly resetFilters = new EventEmitter<void>()
  @Output() readonly columnsChange = new EventEmitter<ColumnViewOption[]>()
  @Output() readonly exportCsv = new EventEmitter<void>()
  @Output() readonly exportPdf = new EventEmitter<void>()
  @Output() readonly exportJson = new EventEmitter<void>()

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement
    this.searchQueryChange.emit(target.value)
  }

  onFilterChange(id: string, selected: string[]): void {
    this.filterChange.emit({ id, selected })
  }
}
