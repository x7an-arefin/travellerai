import { Component, effect, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TasksService } from '../services/tasks.service'
import { labels, priorities, statuses } from '../data/data'
import { HlmSheetImports } from '@ui/sheet/hlm-sheet.components'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { HlmInputImports } from '@ui/input/hlm-input.directive'
import { HlmTextareaImports } from '@ui/textarea/hlm-textarea.directive'
import { HlmSelectImports } from '@ui/select/hlm-select.components'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-tasks-mutate-drawer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...HlmInputImports,
    ...HlmTextareaImports,
    ...HlmSelectImports,
  ],
  template: `
    <hlm-sheet
      [isOpen]="tasksService.mutateDrawerOpen()"
      position="right"
      (closed)="tasksService.closeMutateDrawer()"
      class="w-full sm:max-w-md"
    >
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>
          {{ tasksService.activeTask() ? 'Update Task' : 'Create Task' }}
        </h3>
        <p hlmSheetDescription>
          {{
            tasksService.activeTask()
              ? 'Update the task details below.'
              : 'Fill in the information to create a new task.'
          }}
        </p>
      </div>

      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="flex flex-col flex-1 gap-4 py-4">
        <!-- Title Field -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</label>
          <input
            hlmInput
            formControlName="title"
            placeholder="e.g. Implement authentication flow"
          />
          @if (taskForm.get('title')?.touched && taskForm.get('title')?.invalid) {
            <p class="text-xs text-destructive">Title is required</p>
          }
        </div>

        <!-- Status Field using Spartan Custom Select -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</label>
          <hlm-custom-select
            [options]="statuses"
            formControlName="status"
            placeholder="Select status"
          />
        </div>

        <!-- Label Field using Spartan Custom Select -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Label</label>
          <hlm-custom-select
            [options]="labels"
            formControlName="label"
            placeholder="Select label"
          />
        </div>

        <!-- Priority Field using Spartan Custom Select -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Priority</label>
          <hlm-custom-select
            [options]="priorities"
            formControlName="priority"
            placeholder="Select priority"
          />
        </div>

        <!-- Description Field -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description (Optional)</label>
          <textarea
            hlmTextarea
            formControlName="description"
            rows="3"
            placeholder="Add any extra task context or notes..."
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div hlmSheetFooter class="mt-auto">
          <button
            type="button"
            hlmBtn
            variant="outline"
            (click)="tasksService.closeMutateDrawer()"
            class="cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            hlmBtn
            [disabled]="taskForm.invalid"
            class="cursor-pointer"
          >
            {{ tasksService.activeTask() ? 'Save Changes' : 'Create Task' }}
          </button>
        </div>
      </form>
    </hlm-sheet>
  `,
})
export class TasksMutateDrawerComponent {
  private readonly fb = inject(FormBuilder)
  readonly tasksService = inject(TasksService)

  readonly labels = labels
  readonly statuses = statuses
  readonly priorities = priorities

  readonly taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    status: ['todo', [Validators.required]],
    label: ['feature', [Validators.required]],
    priority: ['medium', [Validators.required]],
    description: [''],
  })

  constructor() {
    effect(() => {
      const current = this.tasksService.activeTask()
      if (current) {
        this.taskForm.patchValue({
          title: current.title,
          status: current.status,
          label: current.label,
          priority: current.priority,
          description: current.description || '',
        })
      } else {
        this.taskForm.reset({
          title: '',
          status: 'todo',
          label: 'feature',
          priority: 'medium',
          description: '',
        })
      }
    })
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return

    const values = this.taskForm.value
    const active = this.tasksService.activeTask()

    if (active) {
      this.tasksService.updateTask(active.id, values)
      toast.success(`Task ${active.id} updated successfully!`)
    } else {
      this.tasksService.addTask(values)
      toast.success('New task created successfully!')
    }

    this.tasksService.closeMutateDrawer()
  }
}
