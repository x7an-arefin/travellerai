import { Injectable, computed, signal } from '@angular/core'
import { Task } from '../data/schema'
import { mockTasks } from '../data/tasks'

export type SortDirection = 'asc' | 'desc' | null

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly _tasks = signal<Task[]>(mockTasks)
  readonly tasks = this._tasks.asReadonly()

  // Loading state
  readonly isLoading = signal<boolean>(false)

  // Filter signals
  readonly searchQuery = signal<string>('')
  readonly statusFilter = signal<string[]>([])
  readonly priorityFilter = signal<string[]>([])

  // Sorting signals
  readonly sortField = signal<string | null>(null)
  readonly sortDirection = signal<SortDirection>(null)

  // Selection signal
  readonly selectedIds = signal<Set<string>>(new Set())

  // Pagination
  readonly pageIndex = signal<number>(0)
  readonly pageSize = signal<number>(10)

  // Modals / Drawers state
  readonly mutateDrawerOpen = signal<boolean>(false)
  readonly activeTask = signal<Task | null>(null)
  readonly viewSheetOpen = signal<boolean>(false)
  readonly viewTask = signal<Task | null>(null)
  readonly multiDeleteOpen = signal<boolean>(false)
  readonly importOpen = signal<boolean>(false)

  // Filtered & Sorted tasks computation
  readonly filteredTasks = computed(() => {
    let list = this._tasks()
    const query = this.searchQuery().toLowerCase().trim()
    const statuses = this.statusFilter()
    const priorities = this.priorityFilter()
    const field = this.sortField()
    const dir = this.sortDirection()

    // 1. Filter by search query
    if (query) {
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.id.toLowerCase().includes(query) ||
          t.label.toLowerCase().includes(query)
      )
    }

    // 2. Filter by status
    if (statuses.length > 0) {
      list = list.filter((t) => statuses.includes(t.status))
    }

    // 3. Filter by priority
    if (priorities.length > 0) {
      list = list.filter((t) => priorities.includes(t.priority))
    }

    // 4. Sort data
    if (field && dir) {
      list = [...list].sort((a: any, b: any) => {
        const valA = (a[field] ?? '').toString().toLowerCase()
        const valB = (b[field] ?? '').toString().toLowerCase()

        const comparison = valA.localeCompare(valB, undefined, { numeric: true })
        return dir === 'asc' ? comparison : -comparison
      })
    }

    return list
  })

  // Paginated tasks computation
  readonly paginatedTasks = computed(() => {
    const list = this.filteredTasks()
    const start = this.pageIndex() * this.pageSize()
    return list.slice(start, start + this.pageSize())
  })

  readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.filteredTasks().length / this.pageSize()))
  })

  setSort(field: string, direction: SortDirection): void {
    if (direction === null) {
      this.sortField.set(null)
      this.sortDirection.set(null)
    } else {
      this.sortField.set(field)
      this.sortDirection.set(direction)
    }
  }

  // CRUD Operations
  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
    }
    this._tasks.update((tasks) => [newTask, ...tasks])
  }

  updateTask(id: string, updated: Partial<Task>): void {
    this._tasks.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, ...updated } : t))
    )
  }

  deleteTask(id: string): void {
    this._tasks.update((tasks) => tasks.filter((t) => t.id !== id))
    this.selectedIds.update((set) => {
      const next = new Set(set)
      next.delete(id)
      return next
    })
  }

  deleteSelectedTasks(): void {
    const idsToDelete = this.selectedIds()
    this._tasks.update((tasks) => tasks.filter((t) => !idsToDelete.has(t.id)))
    this.selectedIds.set(new Set())
  }

  toggleSelection(id: string): void {
    this.selectedIds.update((set) => {
      const next = new Set(set)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  toggleSelectAll(): void {
    const currentOnPage = this.paginatedTasks()
    const currentIds = new Set(this.selectedIds())
    const allSelected = currentOnPage.every((t) => currentIds.has(t.id))

    if (allSelected) {
      for (const t of currentOnPage) {
        currentIds.delete(t.id)
      }
    } else {
      for (const t of currentOnPage) {
        currentIds.add(t.id)
      }
    }

    this.selectedIds.set(currentIds)
  }

  openCreate(): void {
    this.activeTask.set(null)
    this.mutateDrawerOpen.set(true)
  }

  openEdit(task: Task): void {
    this.activeTask.set(task)
    this.mutateDrawerOpen.set(true)
  }

  closeMutateDrawer(): void {
    this.mutateDrawerOpen.set(false)
    this.activeTask.set(null)
  }

  openView(task: Task): void {
    this.viewTask.set(task)
    this.viewSheetOpen.set(true)
  }

  closeViewSheet(): void {
    this.viewSheetOpen.set(false)
    this.viewTask.set(null)
  }
}
