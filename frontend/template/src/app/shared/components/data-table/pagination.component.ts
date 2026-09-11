import { Component, EventEmitter, Input, Output, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideChevronLeft,
  lucideChevronRight,
  lucideChevronsLeft,
  lucideChevronsRight,
} from '@ng-icons/lucide'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmSelectImports, SelectOption } from '../../../ui/select/hlm-select.components'
import { getPageNumbers } from '../../../core/utils/pagination'
import { cn } from '../../../core/utils/cn'

@Component({
  selector: 'app-data-table-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon, ...HlmButtonImports, ...HlmSelectImports],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideChevronRight,
      lucideChevronsLeft,
      lucideChevronsRight,
    }),
  ],
  template: `
    <div [class]="cn('flex flex-col-reverse sm:flex-row items-center justify-between gap-4 px-2 py-4', className)">
      <!-- Selected Row Count and Rows per page -->
      <div class="flex items-center justify-between w-full sm:w-auto gap-4">
        @if (selectedCount > 0) {
          <div class="text-xs text-muted-foreground font-medium">
            {{ selectedCount }} of {{ totalRows }} row(s) selected.
          </div>
        } @else {
          <div class="text-xs text-muted-foreground font-medium">
            Total {{ totalRows }} record(s)
          </div>
        }

        <div class="flex items-center gap-2">
          <p class="hidden text-xs font-medium sm:block text-muted-foreground">Rows per page</p>
          <div class="w-20">
            <!-- Opens to the TOP so it doesn't clip at the page bottom -->
            <hlm-custom-select
              [options]="pageSizeOptions"
              [ngModel]="pageSize"
              (ngModelChange)="onPageSizeChange($event)"
              side="top"
              class="h-8 text-xs py-1"
            />
          </div>
        </div>
      </div>

      <!-- Page info & Pagination Action Buttons -->
      <div class="flex items-center space-x-2 sm:space-x-6 lg:space-x-8">
        <div class="flex items-center justify-center text-xs font-medium text-muted-foreground">
          Page {{ pageIndex + 1 }} of {{ totalPages }}
        </div>

        <div class="flex items-center space-x-1 sm:space-x-2">
          <button
            hlmBtn
            variant="outline"
            size="icon"
            class="size-8 p-0 hidden sm:inline-flex cursor-pointer"
            [disabled]="pageIndex === 0"
            (click)="setPage(0)"
            aria-label="Go to first page"
          >
            <ng-icon name="lucideChevronsLeft" class="size-4" />
          </button>

          <button
            hlmBtn
            variant="outline"
            size="icon"
            class="size-8 p-0 cursor-pointer"
            [disabled]="pageIndex === 0"
            (click)="setPage(pageIndex - 1)"
            aria-label="Go to previous page"
          >
            <ng-icon name="lucideChevronLeft" class="size-4" />
          </button>

          <!-- Numeric page buttons -->
          @for (num of pageNumbers(); track $index) {
            @if (num === '...') {
              <span class="px-1 text-xs text-muted-foreground">...</span>
            } @else {
              <button
                hlmBtn
                [variant]="pageIndex + 1 === num ? 'default' : 'outline'"
                size="sm"
                class="h-8 min-w-8 px-2 text-xs font-medium cursor-pointer"
                (click)="setPage(+num - 1)"
              >
                {{ num }}
              </button>
            }
          }

          <button
            hlmBtn
            variant="outline"
            size="icon"
            class="size-8 p-0 cursor-pointer"
            [disabled]="pageIndex >= totalPages - 1"
            (click)="setPage(pageIndex + 1)"
            aria-label="Go to next page"
          >
            <ng-icon name="lucideChevronRight" class="size-4" />
          </button>

          <button
            hlmBtn
            variant="outline"
            size="icon"
            class="size-8 p-0 hidden sm:inline-flex cursor-pointer"
            [disabled]="pageIndex >= totalPages - 1"
            (click)="setPage(totalPages - 1)"
            aria-label="Go to last page"
          >
            <ng-icon name="lucideChevronsRight" class="size-4" />
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DataTablePaginationComponent {
  @Input() pageIndex: number = 0
  @Input() pageSize: number = 10
  @Input() totalPages: number = 1
  @Input() totalRows: number = 0
  @Input() selectedCount: number = 0
  @Input() className: string = ''

  @Output() readonly pageIndexChange = new EventEmitter<number>()
  @Output() readonly pageSizeChange = new EventEmitter<number>()

  readonly cn = cn

  readonly pageSizeOptions: SelectOption[] = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
    { label: '50', value: 50 },
  ]

  readonly pageNumbers = computed(() => {
    return getPageNumbers(this.pageIndex + 1, this.totalPages)
  })

  setPage(idx: number): void {
    if (idx >= 0 && idx < this.totalPages) {
      this.pageIndexChange.emit(idx)
    }
  }

  onPageSizeChange(size: number): void {
    this.pageSizeChange.emit(Number(size))
  }
}
