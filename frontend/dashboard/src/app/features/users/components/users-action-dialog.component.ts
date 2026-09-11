import { Component, effect, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { UsersService } from '../services/users.service'
import { userRoles } from '../data/data'
import { HlmSheetImports } from '@ui/sheet/hlm-sheet.components'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { HlmInputImports } from '@ui/input/hlm-input.directive'
import { HlmSelectImports, SelectOption } from '@ui/select/hlm-select.components'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-users-action-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...HlmInputImports,
    ...HlmSelectImports,
  ],
  template: `
    <hlm-sheet
      [isOpen]="usersService.actionOpen()"
      position="right"
      (closed)="usersService.actionOpen.set(false)"
      class="w-full sm:max-w-md"
    >
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Edit User</h3>
        <p hlmSheetDescription>Update profile details and system permissions.</p>
      </div>

      <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="flex flex-col flex-1 gap-4 py-4">
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-semibold text-muted-foreground">First Name</label>
            <input hlmInput formControlName="firstName" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-semibold text-muted-foreground">Last Name</label>
            <input hlmInput formControlName="lastName" />
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-xs font-semibold text-muted-foreground">Username</label>
          <input hlmInput formControlName="username" />
        </div>

        <div class="space-y-1">
          <label class="text-xs font-semibold text-muted-foreground">Email</label>
          <input hlmInput type="email" formControlName="email" />
        </div>

        <div class="space-y-1">
          <label class="text-xs font-semibold text-muted-foreground">Phone Number</label>
          <input hlmInput formControlName="phoneNumber" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-semibold text-muted-foreground">Role</label>
            <hlm-custom-select
              [options]="roles"
              formControlName="role"
              placeholder="Select role"
            />
          </div>

          <div class="space-y-1">
            <label class="text-xs font-semibold text-muted-foreground">Status</label>
            <hlm-custom-select
              [options]="statusOptions"
              formControlName="status"
              placeholder="Select status"
            />
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto">
          <button
            type="button"
            hlmBtn
            variant="outline"
            (click)="usersService.actionOpen.set(false)"
            class="cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            hlmBtn
            [disabled]="userForm.invalid"
            class="cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </hlm-sheet>
  `,
})
export class UsersActionDialogComponent {
  private readonly fb = inject(FormBuilder)
  readonly usersService = inject(UsersService)
  readonly roles: SelectOption[] = userRoles

  readonly statusOptions: SelectOption[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Invited', value: 'invited' },
    { label: 'Suspended', value: 'suspended' },
  ]

  readonly userForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [''],
    role: ['admin', [Validators.required]],
    status: ['active', [Validators.required]],
  })

  constructor() {
    effect(() => {
      const u = this.usersService.activeUser()
      if (u) {
        this.userForm.patchValue({
          firstName: u.firstName,
          lastName: u.lastName,
          username: u.username,
          email: u.email,
          phoneNumber: u.phoneNumber,
          role: u.role,
          status: u.status,
        })
      }
    })
  }

  onSubmit(): void {
    if (this.userForm.invalid) return

    const active = this.usersService.activeUser()
    if (active) {
      this.usersService.updateUser(active.id, this.userForm.value)
      toast.success(`User ${active.username} updated!`)
      this.usersService.actionOpen.set(false)
    }
  }
}
