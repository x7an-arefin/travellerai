import { ActivatedRoute, Router } from '@angular/router'

interface WritableSignalLike<T> {
  set(value: T): void
}

interface SortableTableState {
  searchQuery?: WritableSignalLike<string>
  statusFilter?: WritableSignalLike<string | string[]>
  priorityFilter?: WritableSignalLike<string | string[]>
  roleFilter?: WritableSignalLike<string | string[]>
  pageIndex?: WritableSignalLike<number>
  setSort?: (field: string, direction: 'asc' | 'desc') => void
}

function applyCommonQueryState(state: SortableTableState, route: ActivatedRoute): void {
  const params = route.snapshot.queryParamMap
  const q = params.get('q')
  const sort = params.get('sort')
  const page = params.get('page')

  if (q && state.searchQuery) state.searchQuery.set(q)
  if (page && state.pageIndex && !isNaN(+page)) state.pageIndex.set(Math.max(0, +page - 1))
  if (sort && state.setSort) {
    const [field, dir] = sort.split(':') as [string, 'asc' | 'desc']
    if (field && (dir === 'asc' || dir === 'desc')) state.setSort(field, dir)
  }
}

export function setupTasksUrlSync(tasksService: SortableTableState, _router: Router, route: ActivatedRoute): void {
  applyCommonQueryState(tasksService, route)
  const params = route.snapshot.queryParamMap
  const status = params.get('status')
  const priority = params.get('priority')
  if (status && tasksService.statusFilter) tasksService.statusFilter.set(status.split(','))
  if (priority && tasksService.priorityFilter) tasksService.priorityFilter.set(priority.split(','))
}

export function setupUsersUrlSync(usersService: SortableTableState, _router: Router, route: ActivatedRoute): void {
  applyCommonQueryState(usersService, route)
  const params = route.snapshot.queryParamMap
  const status = params.get('status')
  const role = params.get('role')
  if (status && usersService.statusFilter) usersService.statusFilter.set(status)
  if (role && usersService.roleFilter) usersService.roleFilter.set(role)
}
