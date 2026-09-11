import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmInputImports } from '../../ui/input/hlm-input.directive'
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component'
import { AuthService } from '../../core/services/auth.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-clerk-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmInputImports,
    PasswordInputComponent,
  ],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center p-4 bg-muted/20">
      <div hlmCard class="w-full max-w-sm gap-4 p-6 shadow-xl border-primary/20 bg-background bg-white dark:bg-zinc-950">
        <div hlmCardHeader class="space-y-1 text-center px-0">
          <div class="inline-flex items-center justify-center gap-1.5 font-bold text-lg text-primary mb-2">
            <svg class="size-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span>Clerk Authentication</span>
          </div>
          <h2 hlmCardTitle class="text-xl font-bold">Create your account</h2>
          <p hlmCardDescription class="text-xs">
            Sign up to get started with your admin account.
          </p>
        </div>

        <div hlmCardContent class="px-0">
          <form [formGroup]="signUpForm" (ngSubmit)="onSubmit()" class="space-y-3">
            <div class="space-y-1">
              <label class="text-xs font-semibold text-muted-foreground">Full Name</label>
              <input hlmInput formControlName="name" placeholder="John Doe" />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-semibold text-muted-foreground">Email address</label>
              <input hlmInput type="email" formControlName="email" placeholder="name@example.com" />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-semibold text-muted-foreground">Password</label>
              <app-password-input formControlName="password" placeholder="••••••••" />
            </div>

            <button hlmBtn type="submit" [disabled]="signUpForm.invalid" class="w-full cursor-pointer mt-2">
              Sign Up with Clerk
            </button>
          </form>
        </div>

        <div hlmCardFooter class="flex flex-col gap-2 px-0 text-center text-xs text-muted-foreground">
          <p>
            Already have an account?
            <a routerLink="/clerk/sign-in" class="font-semibold text-primary underline ml-1">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class ClerkSignUpComponent {
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
    const { name, email } = this.signUpForm.value
    const success = await this.authService.signUpAsync(name, email)
    if (!success) {
      toast.error('Unable to create the account.')
      return
    }
    toast.success('Clerk account created successfully!')
    this.router.navigate(['/clerk/user-management'])
  }
}
