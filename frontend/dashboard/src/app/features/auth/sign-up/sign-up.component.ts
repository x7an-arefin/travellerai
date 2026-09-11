import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmInputImports } from '../../../ui/input/hlm-input.directive'
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component'
import { PasswordStrengthComponent } from '../../../shared/components/password-strength/password-strength.component'
import { AuthService } from '../../../core/services/auth.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmInputImports,
    PasswordInputComponent,
    PasswordStrengthComponent,
  ],
  template: `
    <div class="mx-auto w-full max-w-sm p-4">
      <div hlmCard class="gap-4 p-6 shadow-lg">
        <div hlmCardHeader class="space-y-1 text-center sm:text-left px-0">
          <h2 hlmCardTitle class="text-xl font-bold">Create an account</h2>
          <p hlmCardDescription class="text-xs">
            Enter your email and choose a secure password to get started.
          </p>
        </div>

        <div hlmCardContent class="px-0">
          <form [formGroup]="signUpForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-muted-foreground">Full Name</label>
              <input
                hlmInput
                formControlName="name"
                placeholder="John Doe"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-muted-foreground">Email</label>
              <input
                hlmInput
                type="email"
                formControlName="email"
                placeholder="name@example.com"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-muted-foreground">Password</label>
              <app-password-input formControlName="password" placeholder="••••••••" />
              <!-- Password Strength Meter -->
              <app-password-strength [password]="signUpForm.get('password')?.value || ''" />
            </div>

            <button
              hlmBtn
              type="submit"
              [disabled]="signUpForm.invalid"
              class="w-full cursor-pointer"
            >
              Sign Up
            </button>
          </form>
        </div>

        <div hlmCardFooter class="flex flex-col gap-2 px-0 text-center text-xs text-muted-foreground">
          <p>
            Already have an account?
            <a routerLink="/sign-in" class="font-semibold text-primary underline ml-1">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class SignUpComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  readonly signUpForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  async onSubmit(): Promise<void> {
    if (this.signUpForm.invalid) return
    const { name, email, password } = this.signUpForm.value
    const success = await this.authService.signUpAsync(name, email, password)
    if (!success) {
      toast.error('Unable to create the account.')
      return
    }
    toast.success('Account created successfully!')
    this.router.navigate(['/'])
  }
}
