import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmInputImports } from '../../../ui/input/hlm-input.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmInputImports,
  ],
  template: `
    <div class="mx-auto w-full max-w-sm p-4">
      <div hlmCard class="gap-4 p-6 shadow-lg">
        <div hlmCardHeader class="space-y-1 text-center sm:text-left px-0">
          <h2 hlmCardTitle class="text-xl font-bold">Forgot password</h2>
          <p hlmCardDescription class="text-xs">
            Enter your registered email and we'll send you a password reset link.
          </p>
        </div>

        <div hlmCardContent class="px-0">
          <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-muted-foreground">Email</label>
              <input
                hlmInput
                type="email"
                formControlName="email"
                placeholder="name@example.com"
              />
            </div>

            <button
              hlmBtn
              type="submit"
              [disabled]="forgotForm.invalid"
              class="w-full cursor-pointer"
            >
              Send Reset Link
            </button>
          </form>
        </div>

        <div hlmCardFooter class="flex flex-col gap-2 px-0 text-center text-xs text-muted-foreground">
          <p>
            Remember your password?
            <a routerLink="/sign-in" class="font-semibold text-primary underline ml-1">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder)

  readonly forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  })

  onSubmit(): void {
    if (this.forgotForm.invalid) return
    toast.success('Password reset instructions sent to your email.')
  }
}
