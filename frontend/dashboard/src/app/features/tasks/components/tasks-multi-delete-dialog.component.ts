import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TasksService } from '../services/tasks.service'
import { HlmDialogImports } from '@ui/dialog/hlm-dialog.components'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-tasks-multi-delete-dialog',
  standalone: true,
  imports: [CommonModule, ...HlmDialogImports, ...HlmButtonImports],
  template: `
    <hlm-dialog
      [isOpen]="tasksService.multiDeleteOpen()"
      (closed)="tasksService.multiDeleteOpen.set(false)"
      class="max-w-md"
    >
      <div hlmDialogHeader>
        <h3 hlmDialogTitle>Delete Selected Tasks</h3>
        <p hlmDialogDescription>
          Are you sure you want to delete {{ tasksService.selectedIds().size }} selected tasks? This action cannot be undone.
        </p>
      </div>

      <div hlmDialogFooter>
        <button
          type="button"
          hlmBtn
          variant="outline"
          (click)="tasksService.multiDeleteOpen.set(false)"
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
          Delete Tasks
        </button>
      </div>
    </hlm-dialog>
  `,
})
export class TasksMultiDeleteDialogComponent {
  readonly tasksService = inject(TasksService)

  confirmDelete(): void {
    const count = this.tasksService.selectedIds().size
    this.tasksService.deleteSelectedTasks()
    this.tasksService.multiDeleteOpen.set(false)
    toast.success(`${count} tasks deleted successfully.`)
  }
}
