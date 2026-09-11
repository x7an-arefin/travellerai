import { Component, inject } from '@angular/core'
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
  selector: 'app-users-invite-dialog',
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
    <!-- Opening in HlmSheet side drawer with size="sm" -->
    <hlm-sheet
      [isOpen]="usersService.inviteOpen()"
      position="right"
      [size]="'sm'"
      (closed)="usersService.inviteOpen.set(false)"
      class="w-full"
    >
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Invite New User</h3>
        <p hlmSheetDescription>Send an invitation to join your workspace.</p>
      </div>

      <form [formGroup]="inviteForm" (ngSubmit)="onSubmit()" class="flex flex-col flex-1 gap-4 py-4">
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-semibold text-muted-foreground">First Name</label>
            <input hlmInput formControlName="firstName" placeholder="John" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-semibold text-muted-foreground">Last Name</label>
            <input hlmInput formControlName="lastName" placeholder="Doe" />
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-xs font-semibold text-muted-foreground">Email Address</label>
          <input hlmInput type="email" formControlName="email" placeholder="john.doe@example.com" />
        </div>

        <div class="space-y-1">
          <label class="text-xs font-semibold text-muted-foreground">Role</label>
          <hlm-custom-select
            [options]="roles"
            formControlName="role"
            placeholder="Select a role"
          />
        </div>

        <div class="rounded-lg border border-border bg-muted/20 p-3 text-xs text-muted-foreground space-y-1 leading-relaxed">
          <p class="font-semibold text-foreground">Workspace Permissions:</p>
          <p>The invited user will receive an email invitation link with access to their assigned role dashboard.</p>
        </div>

        <div hlmSheetFooter class="mt-auto">
          <button
            type="button"
            hlmBtn
            variant="outline"
            (click)="usersService.inviteOpen.set(false)"
            class="cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            hlmBtn
            [disabled]="inviteForm.invalid"
            class="cursor-pointer"
          >
            Send Invitation
          </button>
        </div>
      </form>
    </hlm-sheet>
  `,
})
export class UsersInviteDialogComponent {
  private readonly fb = inject(FormBuilder)
  readonly usersService = inject(UsersService)
  readonly roles: SelectOption[] = userRoles

  readonly inviteForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: ['manager', [Validators.required]],
  })

  onSubmit(): void {
    if (this.inviteForm.invalid) return

    const { firstName, lastName, email, role } = this.inviteForm.value
    this.usersService.addUser({
      firstName,
      lastName,
      username: email.split('@')[0],
      email,
      phoneNumber: '+1 555-0100',
      status: 'invited',
      role,
    })

    this.usersService.inviteOpen.set(false)
    this.inviteForm.reset({ role: 'manager' })
    toast.success(`Invitation sent to ${email}`)
  }
}
