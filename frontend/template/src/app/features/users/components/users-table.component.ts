import { Component, computed, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideMoreHorizontal,
  lucideEdit,
  lucideTrash2,
  lucideShield,
  lucideUserCheck,
  lucideUsers,
  lucideCreditCard,
} from '@ng-icons/lucide'
import { UsersService, SortDirection } from '../services/users.service'
import { User } from '../data/schema'
import { statusColors, userRoles } from '../data/data'
import { HlmTableImports } from '@ui/table/hlm-table.components'
import { HlmBadgeImports } from '@ui/badge/hlm-badge.directive'
import { HlmAvatarImports } from '@ui/avatar/hlm-avatar.components'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { HlmMenuImports } from '@ui/dropdown-menu/hlm-menu.components'
import { HlmSkeletonImports } from '@ui/skeleton/hlm-skeleton.directive'
import { DataTableToolbarComponent, DataTableFilterConfig } from '@shared/components/data-table/toolbar.component'
import { DataTableColumnHeaderComponent } from '@shared/components/data-table/column-header.component'
import { ColumnViewOption } from '@shared/components/data-table/view-options.component'
import { exportToCsv, exportToJson } from '@core/utils/export'
import { getDisplayNameInitials } from '@core/utils/initials'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    ...HlmTableImports,
    ...HlmBadgeImports,
    ...HlmAvatarImports,
    ...HlmButtonImports,
    ...HlmMenuImports,
    ...HlmSkeletonImports,
    DataTableToolbarComponent,
    DataTableColumnHeaderComponent,
  ],
  providers: [
    provideIcons({
      lucideMoreHorizontal,
      lucideEdit,
      lucideTrash2,
      lucideShield,
      lucideUserCheck,
      lucideUsers,
      lucideCreditCard,
    }),
  ],
  template: `
    <div class="flex flex-1 flex-col gap-4">
      <!-- Toolbar matching shadcn-admin DataTableToolbar -->
      <app-data-table-toolbar
        [searchQuery]="usersService.searchQuery()"
        searchPlaceholder="Filter users..."
        [filters]="filterConfigs()"
        [isFiltered]="isFiltered()"
        [columns]="columnOptions"
        [showExport]="true"
        (searchQueryChange)="usersService.searchQuery.set($event)"
        (filterChange)="onFilterChange($event)"
        (resetFilters)="onResetFilters()"
        (columnsChange)="columnOptions = $event"
        (exportCsv)="handleExportCsv()"
        (exportJson)="handleExportJson()"
      />

      <!-- Users Table with Horizontal Scroll -->
      <div class="rounded-md border border-border bg-card shadow-2xs">
        <table hlmTable class="min-w-xl w-full">
          <thead hlmTableHeader>
            <tr hlmTableRow>
              @if (isColVisible('name')) {
                <th hlmTableHead class="ps-3">
                  <app-data-table-column-header
                    title="Name"
                    [direction]="getColSortDirection('name')"
                    (sortChange)="onSortChange('name', $event)"
                    (hide)="hideColumn('name')"
                  />
                </th>
              }
              @if (isColVisible('username')) {
                <th hlmTableHead class="ps-1">
                  <app-data-table-column-header
                    title="Username"
                    [direction]="getColSortDirection('username')"
                    (sortChange)="onSortChange('username', $event)"
                    (hide)="hideColumn('username')"
                  />
                </th>
              }
              @if (isColVisible('role')) {
                <th hlmTableHead class="ps-1">
                  <app-data-table-column-header
                    title="Role"
                    [direction]="getColSortDirection('role')"
                    (sortChange)="onSortChange('role', $event)"
                    (hide)="hideColumn('role')"
                  />
                </th>
              }
              @if (isColVisible('status')) {
                <th hlmTableHead class="ps-1">
                  <app-data-table-column-header
                    title="Status"
                    [direction]="getColSortDirection('status')"
                    (sortChange)="onSortChange('status', $event)"
                    (hide)="hideColumn('status')"
                  />
                </th>
              }
              @if (isColVisible('phone')) {
                <th hlmTableHead class="ps-1">
                  <app-data-table-column-header
                    title="Phone Number"
                    [direction]="getColSortDirection('phoneNumber')"
                    (sortChange)="onSortChange('phoneNumber', $event)"
                    (hide)="hideColumn('phone')"
                  />
                </th>
              }
              <th hlmTableHead class="w-12"></th>
            </tr>
          </thead>

          <tbody hlmTableBody>
            @if (usersService.isLoading()) {
              @for (i of [1,2,3,4,5]; track i) {
                <tr hlmTableRow>
                  <td hlmTableCell class="ps-3">
                    <div class="flex items-center gap-3">
                      <div hlmSkeleton class="size-8 rounded-full"></div>
                      <div class="space-y-1">
                        <div hlmSkeleton class="h-4 w-28"></div>
                        <div hlmSkeleton class="h-3 w-36"></div>
                      </div>
                    </div>
                  </td>
                  <td hlmTableCell class="ps-1">
                    <div hlmSkeleton class="h-4 w-20"></div>
                  </td>
                  <td hlmTableCell class="ps-1">
                    <div hlmSkeleton class="h-5 w-20 rounded"></div>
                  </td>
                  <td hlmTableCell class="ps-1">
                    <div hlmSkeleton class="h-5 w-16 rounded-full"></div>
                  </td>
                  <td hlmTableCell class="ps-1">
                    <div hlmSkeleton class="h-4 w-24"></div>
                  </td>
                  <td hlmTableCell>
                    <div hlmSkeleton class="size-7 rounded"></div>
                  </td>
                </tr>
              }
            } @else if (usersService.filteredUsers().length === 0) {
              <tr hlmTableRow>
                <td hlmTableCell colspan="6" class="h-24 text-center text-muted-foreground text-sm">
                  No results.
                </td>
              </tr>
            } @else {
              @for (user of usersService.filteredUsers(); track user.id) {
                <tr hlmTableRow>
                  @if (isColVisible('name')) {
                    <td hlmTableCell class="ps-3">
                      <div class="flex items-center gap-3">
                        <hlm-avatar class="size-8 shrink-0">
                          <img hlmAvatarImage [src]="user.avatar || ''" [alt]="user.firstName" />
                          <span hlmAvatarFallback>{{ initials(user.firstName + ' ' + user.lastName) }}</span>
                        </hlm-avatar>
                        <div class="min-w-0">
                          <div class="font-medium text-foreground truncate">{{ user.firstName }} {{ user.lastName }}</div>
                          <div class="text-xs text-muted-foreground truncate">{{ user.email }}</div>
                        </div>
                      </div>
                    </td>
                  }

                  @if (isColVisible('username')) {
                    <td hlmTableCell class="font-mono text-xs text-muted-foreground ps-1">
                      @{{ user.username }}
                    </td>
                  }

                  @if (isColVisible('role')) {
                    <td hlmTableCell class="ps-1">
                      <div class="flex items-center gap-1.5 text-xs font-medium">
                        <ng-icon [name]="getRoleIcon(user.role)" class="size-3.5 text-muted-foreground" />
                        <span class="capitalize">{{ user.role }}</span>
                      </div>
                    </td>
                  }

                  @if (isColVisible('status')) {
                    <td hlmTableCell class="ps-1">
                      <span
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border capitalize whitespace-nowrap"
                        [ngClass]="statusColors[user.status]"
                      >
                        {{ user.status }}
                      </span>
                    </td>
                  }

                  @if (isColVisible('phone')) {
                    <td hlmTableCell class="text-xs text-muted-foreground whitespace-nowrap ps-1">
                      {{ user.phoneNumber }}
                    </td>
                  }

                  <td hlmTableCell>
                    <hlm-dropdown-menu>
                      <button
                        hlmMenuTrigger
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        class="size-7 cursor-pointer"
                        aria-label="Open user actions"
                      >
                        <ng-icon name="lucideMoreHorizontal" class="size-4" />
                      </button>

                    <div class="w-36 p-1">
                      <button
                        hlmMenuItem
                        (click)="usersService.openEdit(user)"
                        class="flex items-center gap-2 px-2 py-1.5 text-xs cursor-pointer"
                      >
                        <ng-icon name="lucideEdit" class="size-3.5 text-muted-foreground" />
                        <span>Edit</span>
                      </button>

                      <div hlmMenuSeparator></div>

                      <button
                        hlmMenuItem
                        (click)="usersService.openDelete(user)"
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
    </div>
  `,
})
export class UsersTableComponent {
  readonly usersService = inject(UsersService)
  readonly roles = userRoles
  readonly statusColors = statusColors

  columnOptions: ColumnViewOption[] = [
    { id: 'name', label: 'Name', visible: true },
    { id: 'username', label: 'Username', visible: true },
    { id: 'role', label: 'Role', visible: true },
    { id: 'status', label: 'Status', visible: true },
    { id: 'phone', label: 'Phone', visible: true },
  ]

  readonly filterConfigs = computed<DataTableFilterConfig[]>(() => {
    const all = this.usersService.users()
    const statuses = ['active', 'inactive', 'invited', 'suspended']
    return [
      {
        id: 'status',
        title: 'Status',
        options: statuses.map((s) => ({
          label: s,
          value: s,
          count: all.filter((u) => u.status === s).length,
        })),
        selected: this.usersService.statusFilter() ? [this.usersService.statusFilter()] : [],
      },
      {
        id: 'role',
        title: 'Role',
        options: userRoles.map((r) => ({
          label: r.label,
          value: r.value,
          icon: r.icon,
          count: all.filter((u) => u.role === r.value).length,
        })),
        selected: this.usersService.roleFilter() ? [this.usersService.roleFilter()] : [],
      },
    ]
  })

  readonly isFiltered = computed(() => {
    return (
      this.usersService.searchQuery().length > 0 ||
      this.usersService.statusFilter().length > 0 ||
      this.usersService.roleFilter().length > 0
    )
  })

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
    return this.usersService.sortField() === field ? this.usersService.sortDirection() : null
  }

  onSortChange(field: string, direction: SortDirection): void {
    this.usersService.setSort(field, direction)
  }

  onFilterChange(event: { id: string; selected: string[] }): void {
    if (event.id === 'status') {
      this.usersService.statusFilter.set(event.selected[0] || '')
    } else if (event.id === 'role') {
      this.usersService.roleFilter.set(event.selected[0] || '')
    }
  }

  onResetFilters(): void {
    this.usersService.searchQuery.set('')
    this.usersService.statusFilter.set('')
    this.usersService.roleFilter.set('')
    this.usersService.setSort('', null)
  }

  handleExportCsv(): void {
    const data = this.usersService.filteredUsers()
    exportToCsv('users-export', data)
    toast.success(`Exported ${data.length} users to CSV!`)
  }

  handleExportJson(): void {
    const data = this.usersService.filteredUsers()
    exportToJson('users-export', data)
    toast.success(`Exported ${data.length} users to JSON!`)
  }

  getRoleIcon(role: string): string {
    const found = userRoles.find((r) => r.value === role)
    return found?.icon || 'lucideUsers'
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
