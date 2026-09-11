import { Component, computed, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideMoreHorizontal,
  lucideTrash2,
  lucideEdit,
  lucideCopy,
  lucideHelpCircle,
  lucideCircle,
  lucideTimer,
  lucideCheckCircle,
  lucideCircleOff,
  lucideArrowDown,
  lucideArrowRight,
  lucideArrowUp,
  lucideAlertCircle,
  lucideCheck,
  lucideEye,
} from '@ng-icons/lucide'
import { TasksService, SortDirection } from '../services/tasks.service'
import { Task } from '../data/schema'
import { labels, priorities, statuses } from '../data/data'
import { HlmTableImports } from '@ui/table/hlm-table.components'
import { HlmCheckboxImports } from '@ui/checkbox/hlm-checkbox.component'
import { HlmBadgeImports } from '@ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { HlmMenuImports } from '@ui/dropdown-menu/hlm-menu.components'
import { HlmSkeletonImports } from '@ui/skeleton/hlm-skeleton.directive'
import { DataTableToolbarComponent, DataTableFilterConfig } from '@shared/components/data-table/toolbar.component'
import { DataTablePaginationComponent } from '@shared/components/data-table/pagination.component'
import { DataTableColumnHeaderComponent } from '@shared/components/data-table/column-header.component'
import { DataTableBulkActionsComponent } from '@shared/components/data-table/bulk-actions.component'
import { ColumnViewOption } from '@shared/components/data-table/view-options.component'
import { exportToCsv, exportToJson, exportToPdf } from '@core/utils/export'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    ...HlmTableImports,
    ...HlmCheckboxImports,
    ...HlmBadgeImports,
    ...HlmButtonImports,
    ...HlmMenuImports,
    ...HlmSkeletonImports,
    DataTableToolbarComponent,
    DataTablePaginationComponent,
    DataTableColumnHeaderComponent,
    DataTableBulkActionsComponent,
  ],
  providers: [
    provideIcons({
      lucideMoreHorizontal,
      lucideTrash2,
      lucideEdit,
      lucideCopy,
      lucideHelpCircle,
      lucideCircle,
      lucideTimer,
      lucideCheckCircle,
      lucideCircleOff,
      lucideArrowDown,
      lucideArrowRight,
      lucideArrowUp,
      lucideAlertCircle,
      lucideCheck,
      lucideEye,
    }),
  ],
  template: `
    <div class="flex flex-1 flex-col gap-4">
      <!-- Toolbar with Search, Faceted Filters, Export & Column Visibility -->
      <app-data-table-toolbar
        [searchQuery]="tasksService.searchQuery()"
        searchPlaceholder="Filter by title or ID..."
        [filters]="filterConfigs()"
        [isFiltered]="isFiltered()"
        [columns]="columnOptions"
        [showExport]="true"
        (searchQueryChange)="onSearchChange($event)"
        (filterChange)="onFilterChange($event)"
        (resetFilters)="onResetFilters()"
        (columnsChange)="columnOptions = $event"
        (exportCsv)="handleExportCsv()"
        (exportPdf)="handleExportPdf()"
        (exportJson)="handleExportJson()"
      />

      <!-- Top Bulk Actions Banner -->
      <app-data-table-bulk-actions
        [selectedCount]="tasksService.selectedIds().size"
        (deleteSelected)="tasksService.multiDeleteOpen.set(true)"
        (exportSelected)="handleExportSelected()"
        (clearSelection)="tasksService.selectedIds.set(emptySet())"
      />

      <!-- Main Data Table -->
      <div class="rounded-md border border-border bg-card shadow-2xs">
        <table hlmTable class="min-w-xl w-full">
          <thead hlmTableHeader>
            <tr hlmTableRow>
              <!-- Checkbox Column -->
              <th hlmTableHead class="w-12 px-3">
                <hlm-checkbox
                  [isChecked]="isAllSelectedOnPage()"
                  (checkedChange)="tasksService.toggleSelectAll()"
                  aria-label="Select all"
                  class="translate-y-0.5"
                />
              </th>

              <!-- Task ID Column -->
              @if (isColVisible('id')) {
                <th hlmTableHead class="w-24">
                  <app-data-table-column-header
                    title="Task"
                    [canSort]="false"
                    [canHide]="false"
                  />
                </th>
              }

              <!-- Title Column with Sorting -->
              @if (isColVisible('title')) {
                <th hlmTableHead class="ps-1 max-w-0 w-2/3">
                  <app-data-table-column-header
                    title="Title"
                    [direction]="getColSortDirection('title')"
                    (sortChange)="onSortChange('title', $event)"
                    (hide)="hideColumn('title')"
                  />
                </th>
              }

              <!-- Status Column with Sorting -->
              @if (isColVisible('status')) {
                <th hlmTableHead class="w-36 ps-1">
                  <app-data-table-column-header
                    title="Status"
                    [direction]="getColSortDirection('status')"
                    (sortChange)="onSortChange('status', $event)"
                    (hide)="hideColumn('status')"
                  />
                </th>
              }

              <!-- Priority Column with Sorting -->
              @if (isColVisible('priority')) {
                <th hlmTableHead class="w-32 ps-1">
                  <app-data-table-column-header
                    title="Priority"
                    [direction]="getColSortDirection('priority')"
                    (sortChange)="onSortChange('priority', $event)"
                    (hide)="hideColumn('priority')"
                  />
                </th>
              }

              <!-- Row Action Menu Column -->
              <th hlmTableHead class="w-12"></th>
            </tr>
          </thead>

          <tbody hlmTableBody>
            @if (tasksService.isLoading()) {
              <!-- 5 Shimmer Placeholder Rows while loading -->
              @for (i of [1,2,3,4,5]; track i) {
                <tr hlmTableRow>
                  <td hlmTableCell class="px-3">
                    <div hlmSkeleton class="size-4 rounded"></div>
                  </td>
                  <td hlmTableCell>
                    <div hlmSkeleton class="h-4 w-16"></div>
                  </td>
                  <td hlmTableCell class="ps-4">
                    <div class="flex items-center space-x-2">
                      <div hlmSkeleton class="h-5 w-14 rounded"></div>
                      <div hlmSkeleton class="h-4 w-48 sm:w-64"></div>
                    </div>
                  </td>
                  <td hlmTableCell class="ps-4">
                    <div hlmSkeleton class="h-5 w-24 rounded-full"></div>
                  </td>
                  <td hlmTableCell class="ps-3">
                    <div hlmSkeleton class="h-4 w-20 rounded"></div>
                  </td>
                  <td hlmTableCell>
                    <div hlmSkeleton class="size-7 rounded"></div>
                  </td>
                </tr>
              }
            } @else if (tasksService.paginatedTasks().length === 0) {
              <tr hlmTableRow>
                <td hlmTableCell colspan="6" class="h-24 text-center text-muted-foreground text-sm">
                  No results.
                </td>
              </tr>
            } @else {
              @for (task of tasksService.paginatedTasks(); track task.id) {
                <tr hlmTableRow [class.bg-muted/30]="tasksService.selectedIds().has(task.id)">
                  <!-- Checkbox -->
                  <td hlmTableCell class="px-3">
                    <hlm-checkbox
                      [isChecked]="tasksService.selectedIds().has(task.id)"
                      (checkedChange)="tasksService.toggleSelection(task.id)"
                      aria-label="Select row"
                      class="translate-y-0.5"
                    />
                  </td>

                  <!-- Task ID -->
                  @if (isColVisible('id')) {
                    <td hlmTableCell class="w-20 font-mono text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors" (click)="tasksService.openView(task)">
                      {{ task.id }}
                    </td>
                  }

                  <!-- Title + Label Badge -->
                  @if (isColVisible('title')) {
                    <td hlmTableCell class="ps-4">
                      <div class="flex items-center space-x-2">
                        <span hlmBadge variant="outline" class="text-[10px] font-semibold uppercase shrink-0">
                          {{ task.label }}
                        </span>
                        <span
                          (click)="tasksService.openView(task)"
                          class="truncate font-medium text-foreground hover:text-primary hover:underline cursor-pointer max-w-xs md:max-w-md transition-colors"
                        >
                          {{ task.title }}
                        </span>
                      </div>
                    </td>
                  }

                  <!-- Status with Quick-Change Inline Dropdown -->
                  @if (isColVisible('status')) {
                    <td hlmTableCell class="ps-4">
                      <hlm-dropdown-menu side="auto">
                        <button
                          hlmMenuTrigger
                          type="button"
                          class="flex w-fit items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md transition-colors hover:bg-accent/60 cursor-pointer border border-transparent hover:border-border"
                          [attr.aria-label]="'Change status from ' + task.status"
                        >
                          <ng-icon [name]="getStatusIcon(task.status)" class="size-3.5 text-muted-foreground shrink-0" />
                          <span class="capitalize whitespace-nowrap">{{ task.status }}</span>
                        </button>

                        <div class="w-40 p-1">
                          <div hlmMenuLabel class="text-[11px] font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">Set Status</div>
                          <div hlmMenuSeparator></div>
                          @for (s of statuses; track s.value) {
                            <button
                              hlmMenuItem
                              (click)="updateTaskStatus(task, s.value)"
                              class="flex items-center justify-between gap-2 px-2.5 py-1.5 text-xs font-medium cursor-pointer"
                              [class.bg-accent]="task.status === s.value"
                            >
                              <div class="flex items-center gap-2">
                                <ng-icon [name]="s.icon" class="size-3.5 text-muted-foreground" />
                                <span>{{ s.label }}</span>
                              </div>
                              @if (task.status === s.value) {
                                <ng-icon name="lucideCheck" class="size-3.5 text-primary" />
                              }
                            </button>
                          }
                        </div>
                      </hlm-dropdown-menu>
                    </td>
                  }

                  <!-- Priority with Quick-Change Inline Dropdown -->
                  @if (isColVisible('priority')) {
                    <td hlmTableCell class="ps-3">
                      <hlm-dropdown-menu side="auto">
                        <button
                          hlmMenuTrigger
                          type="button"
                          class="flex w-fit items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md transition-colors hover:bg-accent/60 cursor-pointer border border-transparent hover:border-border"
                          [attr.aria-label]="'Change priority from ' + task.priority"
                        >
                          <ng-icon [name]="getPriorityIcon(task.priority)" class="size-3.5 text-muted-foreground shrink-0" />
                          <span class="capitalize whitespace-nowrap">{{ task.priority }}</span>
                        </button>

                        <div class="w-40 p-1">
                          <div hlmMenuLabel class="text-[11px] font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">Set Priority</div>
                          <div hlmMenuSeparator></div>
                          @for (p of priorities; track p.value) {
                            <button
                              hlmMenuItem
                              (click)="updateTaskPriority(task, p.value)"
                              class="flex items-center justify-between gap-2 px-2.5 py-1.5 text-xs font-medium cursor-pointer"
                              [class.bg-accent]="task.priority === p.value"
                            >
                              <div class="flex items-center gap-2">
                                <ng-icon [name]="p.icon" class="size-3.5 text-muted-foreground" />
                                <span>{{ p.label }}</span>
                              </div>
                              @if (task.priority === p.value) {
                                <ng-icon name="lucideCheck" class="size-3.5 text-primary" />
                              }
                            </button>
                          }
                        </div>
                      </hlm-dropdown-menu>
                    </td>
                  }

                  <!-- Actions Dropdown -->
                  <td hlmTableCell>
                    <hlm-dropdown-menu side="auto">
                      <button
                        hlmMenuTrigger
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        class="size-7 cursor-pointer"
                        aria-label="Open task actions"
                      >
                        <ng-icon name="lucideMoreHorizontal" class="size-4" />
                      </button>

                      <div class="w-40 p-1">
                        <button
                          hlmMenuItem
                          (click)="tasksService.openView(task)"
                          class="flex items-center gap-2 px-2 py-1.5 text-xs cursor-pointer"
                        >
                          <ng-icon name="lucideEye" class="size-3.5 text-muted-foreground" />
                          <span>View details</span>
                        </button>

                        <button
                          hlmMenuItem
                          (click)="tasksService.openEdit(task)"
                          class="flex items-center gap-2 px-2 py-1.5 text-xs cursor-pointer"
                        >
                          <ng-icon name="lucideEdit" class="size-3.5 text-muted-foreground" />
                          <span>Edit</span>
                        </button>

                        <button
                          hlmMenuItem
                          (click)="duplicateTask(task)"
                          class="flex items-center gap-2 px-2 py-1.5 text-xs cursor-pointer"
                        >
                          <ng-icon name="lucideCopy" class="size-3.5 text-muted-foreground" />
                          <span>Make a copy</span>
                        </button>

                        <div hlmMenuSeparator></div>

                        <button
                          hlmMenuItem
                          (click)="deleteTask(task)"
                          class="flex items-center gap-2 px-2 py-1.5 text-xs text-destructive focus:text-destructive cursor-pointer"
                        >
                          <ng-icon name="lucideTrash2" class="size-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </hlm-dropdown-menu>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <app-data-table-pagination
        [pageIndex]="tasksService.pageIndex()"
        [pageSize]="tasksService.pageSize()"
        [totalPages]="tasksService.totalPages()"
        [totalRows]="tasksService.filteredTasks().length"
        [selectedCount]="tasksService.selectedIds().size"
        (pageIndexChange)="tasksService.pageIndex.set($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      />
    </div>
  `,
})
export class TasksTableComponent {
  readonly tasksService = inject(TasksService)
  readonly statuses = statuses
  readonly priorities = priorities
  readonly labels = labels

  columnOptions: ColumnViewOption[] = [
    { id: 'id', label: 'Task', visible: true },
    { id: 'title', label: 'Title', visible: true },
    { id: 'status', label: 'Status', visible: true },
    { id: 'priority', label: 'Priority', visible: true },
  ]

  readonly filterConfigs = computed<DataTableFilterConfig[]>(() => {
    const all = this.tasksService.tasks()
    return [
      {
        id: 'status',
        title: 'Status',
        options: statuses.map((s) => ({
          label: s.label,
          value: s.value,
          icon: s.icon,
          count: all.filter((t) => t.status === s.value).length,
        })),
        selected: this.tasksService.statusFilter(),
      },
      {
        id: 'priority',
        title: 'Priority',
        options: priorities.map((p) => ({
          label: p.label,
          value: p.value,
          icon: p.icon,
          count: all.filter((t) => t.priority === p.value).length,
        })),
        selected: this.tasksService.priorityFilter(),
      },
    ]
  })

  readonly isFiltered = computed(() => {
    return (
      this.tasksService.searchQuery().length > 0 ||
      this.tasksService.statusFilter().length > 0 ||
      this.tasksService.priorityFilter().length > 0
    )
  })

  emptySet(): Set<string> {
    return new Set<string>()
  }

  isColVisible(id: string): boolean {
    const found = this.columnOptions.find((c) => c.id === id)
    return found ? found.visible : true
  }

  hideColumn(id: string): void {
    const found = this.columnOptions.find((c) => c.id === id)
    if (found) {
      found.visible = false
    }
  }

  getColSortDirection(field: string): SortDirection {
    return this.tasksService.sortField() === field ? this.tasksService.sortDirection() : null
  }

  onSortChange(field: string, direction: SortDirection): void {
    this.tasksService.setSort(field, direction)
  }

  onSearchChange(q: string): void {
    this.tasksService.searchQuery.set(q)
    this.tasksService.pageIndex.set(0)
  }

  onFilterChange(event: { id: string; selected: string[] }): void {
    if (event.id === 'status') {
      this.tasksService.statusFilter.set(event.selected)
    } else if (event.id === 'priority') {
      this.tasksService.priorityFilter.set(event.selected)
    }
    this.tasksService.pageIndex.set(0)
  }

  onResetFilters(): void {
    this.tasksService.searchQuery.set('')
    this.tasksService.statusFilter.set([])
    this.tasksService.priorityFilter.set([])
    this.tasksService.setSort('', null)
    this.tasksService.pageIndex.set(0)
  }

  onPageSizeChange(size: number): void {
    this.tasksService.pageSize.set(size)
    this.tasksService.pageIndex.set(0)
  }

  isAllSelectedOnPage(): boolean {
    const pageTasks = this.tasksService.paginatedTasks()
    if (pageTasks.length === 0) return false
    const set = this.tasksService.selectedIds()
    return pageTasks.every((t) => set.has(t.id))
  }

  getStatusIcon(status: string): string {
    const found = statuses.find((s) => s.value === status)
    return found ? found.icon : 'lucideCircle'
  }

  getPriorityIcon(priority: string): string {
    const found = priorities.find((p) => p.value === priority)
    return found ? found.icon : 'lucideArrowRight'
  }

  updateTaskStatus(task: Task, newStatus: any): void {
    this.tasksService.updateTask(task.id, { status: newStatus })
    toast.success(`Task ${task.id} moved to "${newStatus}"`)
  }

  updateTaskPriority(task: Task, newPriority: any): void {
    this.tasksService.updateTask(task.id, { priority: newPriority })
    toast.success(`Task ${task.id} priority set to "${newPriority}"`)
  }

  handleExportCsv(): void {
    const data = this.tasksService.filteredTasks()
    exportToCsv('tasks-export', data)
    toast.success(`Exported ${data.length} tasks to CSV!`)
  }

  handleExportPdf(): void {
    const data = this.tasksService.filteredTasks()
    exportToPdf('tasks-export', 'Tasks Summary Report', data)
    toast.success(`Generated PDF report for ${data.length} tasks!`)
  }

  handleExportJson(): void {
    const data = this.tasksService.filteredTasks()
    exportToJson('tasks-export', data)
    toast.success(`Exported ${data.length} tasks to JSON!`)
  }

  handleExportSelected(): void {
    const selectedIds = this.tasksService.selectedIds()
    const selectedTasks = this.tasksService.tasks().filter((t) => selectedIds.has(t.id))
    exportToCsv('selected-tasks', selectedTasks)
    toast.success(`Exported ${selectedTasks.length} selected tasks to CSV!`)
  }

  duplicateTask(task: Task): void {
    this.tasksService.addTask({
      title: `${task.title} (Copy)`,
      status: task.status,
      label: task.label,
      priority: task.priority,
      description: task.description,
    })
    toast.success('Task duplicated successfully!')
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task.id)
    toast.success(`Task ${task.id} deleted.`)
  }
}
