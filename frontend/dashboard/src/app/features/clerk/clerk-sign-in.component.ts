import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { simpleGithub, simpleGoogle } from '@ng-icons/simple-icons'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmInputImports } from '../../ui/input/hlm-input.directive'
import { HlmSeparatorImports } from '../../ui/separator/hlm-separator.directive'
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component'
import { AuthService } from '../../core/services/auth.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-clerk-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIcon,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmInputImports,
    ...HlmSeparatorImports,
    PasswordInputComponent,
  ],
  providers: [provideIcons({ simpleGithub, simpleGoogle })],
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
          <h2 hlmCardTitle class="text-xl font-bold">Sign in to your app</h2>
          <p hlmCardDescription class="text-xs">
            Welcome back! Please enter your details to continue.
          </p>
        </div>

        <div hlmCardContent class="px-0 space-y-4">
          <div class="grid grid-cols-2 gap-2">
            <button
              hlmBtn
              variant="outline"
              type="button"
              (click)="socialLogin('GitHub')"
              class="gap-2 cursor-pointer text-xs"
            >
              <ng-icon name="simpleGithub" class="size-4" />
              <span>GitHub</span>
            </button>

            <button
              hlmBtn
              variant="outline"
              type="button"
              (click)="socialLogin('Google')"
              class="gap-2 cursor-pointer text-xs"
            >
              <ng-icon name="simpleGoogle" class="size-4" />
              <span>Google</span>
            </button>
          </div>

          <div class="relative my-2">
            <div class="absolute inset-0 flex items-center">
              <div hlmSeparator></div>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <form [formGroup]="signInForm" (ngSubmit)="onSubmit()" class="space-y-3">
            <div class="space-y-1">
              <label class="text-xs font-semibold text-muted-foreground">Email address</label>
              <input hlmInput type="email" formControlName="email" placeholder="name@example.com" />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-semibold text-muted-foreground">Password</label>
              <app-password-input formControlName="password" placeholder="••••••••" />
            </div>

            <button hlmBtn type="submit" [disabled]="signInForm.invalid" class="w-full cursor-pointer mt-2">
              Continue with Clerk
            </button>
          </form>
        </div>

        <div hlmCardFooter class="flex flex-col gap-2 px-0 text-center text-xs text-muted-foreground">
          <p>
            Don't have an account?
            <a routerLink="/clerk/sign-up" class="font-semibold text-primary underline ml-1">Sign up</a>
          </p>
          <p>
            <a routerLink="/" class="text-muted-foreground hover:text-primary underline">
              Return to Dashboard
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class ClerkSignInComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  readonly signInForm: FormGroup = this.fb.group({
    email: ['satnaingdev@gmail.com', [Validators.required, Validators.email]],
    password: ['clerkpassword123', [Validators.required, Validators.minLength(6)]],
  })

  async onSubmit(): Promise<void> {
    if (this.signInForm.invalid) return
    const { email, password } = this.signInForm.value
    const success = await this.authService.signInAsync(email, password)
    if (!success) {
      toast.error('Unable to authenticate with Clerk.')
      return
    }
    toast.success('Clerk authentication successful!')
    this.router.navigate(['/clerk/user-management'])
  }

  async socialLogin(provider: string): Promise<void> {
    const success = await this.authService.signInAsync('satnaingdev@gmail.com')
    if (!success) {
      toast.error(`Unable to authenticate with ${provider}`)
      return
    }
    toast.success(`Authenticated with Clerk via ${provider}`)
    this.router.navigate(['/clerk/user-management'])
  }
}
