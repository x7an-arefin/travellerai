import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UsersService } from '../services/users.service'
import { HlmDialogImports } from '@ui/dialog/hlm-dialog.components'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-users-delete-dialog',
  standalone: true,
  imports: [CommonModule, ...HlmDialogImports, ...HlmButtonImports],
  template: `
    <hlm-dialog
      [isOpen]="usersService.deleteOpen()"
      (closed)="usersService.deleteOpen.set(false)"
      class="max-w-md"
    >
      <div hlmDialogHeader>
        <h3 hlmDialogTitle>Delete User</h3>
        <p hlmDialogDescription>
          Are you sure you want to delete user
          <strong class="text-foreground">{{ usersService.activeUser()?.username }}</strong>?
          This action will permanently revoke their access.
        </p>
      </div>

      <div hlmDialogFooter>
        <button
          type="button"
          hlmBtn
          variant="outline"
          (click)="usersService.deleteOpen.set(false)"
          class="cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          hlmBtn
          variant="destructive"
          (click)="confirmDelete()"
          class="cursor-pointer"
        >
          Delete User
        </button>
      </div>
    </hlm-dialog>
  `,
})
export class UsersDeleteDialogComponent {
  readonly usersService = inject(UsersService)

  confirmDelete(): void {
    const user = this.usersService.activeUser()
    if (user) {
      this.usersService.deleteUser(user.id)
      toast.success(`User ${user.username} deleted.`)
      this.usersService.deleteOpen.set(false)
    }
  }
}
