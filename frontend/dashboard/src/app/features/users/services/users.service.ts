import { Injectable, computed, signal, inject } from '@angular/core'
import { User, UserRole, UserStatus } from '../data/schema'
import { mockUsers } from '../data/users'
import { UsersApiService } from '../data-access/services/users-api.service'
import { toast } from 'ngx-sonner'

export type SortDirection = 'asc' | 'desc' | null

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly api = inject(UsersApiService)

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

  constructor() {
    this.loadUsers()
  }

  async loadUsers(): Promise<void> {
    this.isLoading.set(true)
    try {
      const res = await this.api.list(undefined, 100)
      if (res.ok && res.data && res.data.items.length > 0) {
        const mapped: User[] = res.data.items.map((u) => ({
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          username: u.username || `${u.firstName.toLowerCase()}.${u.lastName.toLowerCase()}`,
          email: u.email,
          phoneNumber: u.phoneNumber || u.phone || '',
          status: (u.status as UserStatus) || 'active',
          role: (u.role as UserRole) || 'manager',
          avatar: u.avatar || u.avatarUrl,
        }))
        this._users.set(mapped)
      }
    } catch {
      // Fallback kept in place
    } finally {
      this.isLoading.set(false)
    }
  }

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

  async addUser(userData: Omit<User, 'id'>): Promise<void> {
    this.isLoading.set(true)
    try {
      const res = await this.api.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        username: userData.username,
        phoneNumber: userData.phoneNumber,
        role: userData.role as any,
        status: userData.status as any,
        avatar: userData.avatar,
      })

      const newUser: User = {
        id: res.data?.id || `USR-${Math.floor(100 + Math.random() * 900)}`,
        ...userData,
      }
      this._users.update((users) => [newUser, ...users])
      toast.success(`User ${newUser.firstName} invited successfully.`)
    } finally {
      this.isLoading.set(false)
    }
  }

  async updateUser(id: string, updated: Partial<User>): Promise<void> {
    this.isLoading.set(true)
    try {
      await this.api.update(id, {
        ...(updated.firstName && { firstName: updated.firstName }),
        ...(updated.lastName && { lastName: updated.lastName }),
        ...(updated.email && { email: updated.email }),
        ...(updated.phoneNumber && { phoneNumber: updated.phoneNumber }),
        ...(updated.role && { role: updated.role as any }),
        ...(updated.status && { status: updated.status as any }),
      })

      this._users.update((users) =>
        users.map((u) => (u.id === id ? { ...u, ...updated } : u))
      )
      toast.success('User updated successfully.')
    } finally {
      this.isLoading.set(false)
    }
  }

  async deleteUser(id: string): Promise<void> {
    this.isLoading.set(true)
    try {
      await this.api.delete(id)
      this._users.update((users) => users.filter((u) => u.id !== id))
      toast.success('User deleted successfully.')
    } finally {
      this.isLoading.set(false)
    }
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

