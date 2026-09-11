import { Injectable, computed, signal } from '@angular/core'
import { User, UserRole, UserStatus } from '../data/schema'
import { mockUsers } from '../data/users'

export type SortDirection = 'asc' | 'desc' | null

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _users = signal<User[]>(mockUsers)
  readonly users = this._users.asReadonly()

  // Loading state
  readonly isLoading = signal<boolean>(false)

  readonly searchQuery = signal<string>('')
  readonly statusFilter = signal<string>('')
  readonly roleFilter = signal<string>('')

  // Sorting
  readonly sortField = signal<string | null>(null)
  readonly sortDirection = signal<SortDirection>(null)

  readonly inviteOpen = signal<boolean>(false)
  readonly actionOpen = signal<boolean>(false)
  readonly activeUser = signal<User | null>(null)
  readonly deleteOpen = signal<boolean>(false)

  readonly filteredUsers = computed(() => {
    let list = this._users()
    const query = this.searchQuery().toLowerCase().trim()
    const status = this.statusFilter()
    const role = this.roleFilter()
    const field = this.sortField()
    const dir = this.sortDirection()

    // 1. Filter query
    if (query) {
      list = list.filter(
        (u) =>
          u.firstName.toLowerCase().includes(query) ||
          u.lastName.toLowerCase().includes(query) ||
          u.username.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      )
    }

    // 2. Filter status
    if (status) {
      list = list.filter((u) => u.status === status)
    }

    // 3. Filter role
    if (role) {
      list = list.filter((u) => u.role === role)
    }

    // 4. Sort
    if (field && dir) {
      list = [...list].sort((a: any, b: any) => {
        let valA = a[field] ?? ''
        let valB = b[field] ?? ''

        if (field === 'name') {
          valA = `${a.firstName} ${a.lastName}`
          valB = `${b.firstName} ${b.lastName}`
        }

        const comparison = valA.toString().toLowerCase().localeCompare(valB.toString().toLowerCase(), undefined, { numeric: true })
        return dir === 'asc' ? comparison : -comparison
      })
    }

    return list
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

  addUser(userData: Omit<User, 'id'>): void {
    const newUser: User = {
      ...userData,
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
    }
    this._users.update((users) => [newUser, ...users])
  }

  updateUser(id: string, updated: Partial<User>): void {
    this._users.update((users) =>
      users.map((u) => (u.id === id ? { ...u, ...updated } : u))
    )
  }

  deleteUser(id: string): void {
    this._users.update((users) => users.filter((u) => u.id !== id))
  }

  openInvite(): void {
    this.inviteOpen.set(true)
  }

  openEdit(user: User): void {
    this.activeUser.set(user)
    this.actionOpen.set(true)
  }

  openDelete(user: User): void {
    this.activeUser.set(user)
    this.deleteOpen.set(true)
  }
}
