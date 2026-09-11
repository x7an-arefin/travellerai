import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { simpleGithub, simpleGoogle } from '@ng-icons/simple-icons'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmInputImports } from '../../../ui/input/hlm-input.directive'
import { HlmSeparatorImports } from '../../../ui/separator/hlm-separator.directive'
import { AuthService } from '../../../core/services/auth.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-sign-in',
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
  ],
  providers: [provideIcons({ simpleGithub, simpleGoogle })],
  template: `
    <div class="mx-auto w-full max-w-sm p-4">
      <div hlmCard class="gap-4 p-6 shadow-lg">
        <div hlmCardHeader class="space-y-1 text-center sm:text-left px-0">
          <h2 hlmCardTitle class="text-xl font-bold">Sign in</h2>
          <p hlmCardDescription class="text-xs">
            Enter your email and password below to log into your account.
          </p>
        </div>

        <div hlmCardContent class="px-0">
          <form [formGroup]="signInForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-muted-foreground">Email</label>
              <input
                hlmInput
                type="email"
                formControlName="email"
                placeholder="name@example.com"
              />
              @if (signInForm.get('email')?.touched && signInForm.get('email')?.invalid) {
                <p class="text-xs text-destructive">Valid email is required</p>
              }
            </div>

            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label class="text-xs font-semibold text-muted-foreground">Password</label>
                <a routerLink="/forgot-password" class="text-xs text-muted-foreground hover:text-primary underline">
                  Forgot password?
                </a>
              </div>
              <input
                hlmInput
                type="password"
                formControlName="password"
                placeholder="••••••••"
              />
            </div>

            <button
              hlmBtn
              type="submit"
              [disabled]="signInForm.invalid"
              class="w-full cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <div hlmSeparator></div>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

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
        </div>

        <div hlmCardFooter class="flex flex-col gap-2 px-0 text-center text-xs text-muted-foreground">
          <p>
            Don't have an account?
            <a routerLink="/sign-up" class="font-semibold text-primary underline ml-1">Sign up</a>
          </p>
          <p>
            Prefer split layout?
            <a routerLink="/sign-in-2" class="font-semibold text-primary underline ml-1">Sign in (2 Col)</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class SignInComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  readonly signInForm: FormGroup = this.fb.group({
    email: ['satnaingdev@gmail.com', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required, Validators.minLength(6)]],
  })

  async onSubmit(): Promise<void> {
    if (this.signInForm.invalid) return

    const { email, password } = this.signInForm.value
    const success = await this.authService.signInAsync(email, password)
    if (!success) {
      toast.error('Unable to sign in. Please check your credentials.')
      return
    }
    toast.success('Signed in successfully!')
    this.router.navigate(['/'])
  }

  async socialLogin(provider: string): Promise<void> {
    const success = await this.authService.signInAsync('satnaingdev@gmail.com')
    if (!success) {
      toast.error(`Unable to authenticate with ${provider}`)
      return
    }
    toast.success(`Logged in with ${provider}`)
    this.router.navigate(['/'])
  }
}
