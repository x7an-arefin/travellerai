import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { simpleGithub, simpleGoogle } from '@ng-icons/simple-icons'
import { lucideCommand } from '@ng-icons/lucide'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmInputImports } from '../../../ui/input/hlm-input.directive'
import { HlmSeparatorImports } from '../../../ui/separator/hlm-separator.directive'
import { AuthService } from '../../../core/services/auth.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-sign-in-2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIcon,
    ...HlmButtonImports,
    ...HlmInputImports,
    ...HlmSeparatorImports,
  ],
  providers: [provideIcons({ simpleGithub, simpleGoogle, lucideCommand })],
  template: `
    <div class="relative min-h-svh w-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <!-- Left Promotional Hero (Desktop) -->
      <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div class="absolute inset-0 bg-zinc-900"></div>
        <div class="relative z-20 flex items-center text-lg font-medium">
          <ng-icon name="lucideCommand" class="mr-2 size-6" />
          <span>Shadcn Admin Angular</span>
        </div>

        <div class="relative z-20 mt-auto">
          <blockquote class="space-y-2">
            <p class="text-base text-zinc-300">
              &ldquo;This admin dashboard template saved our engineering team weeks of development time and made building enterprise UIs a breeze with Spartan UI and Angular Signals.&rdquo;
            </p>
            <footer class="text-sm font-semibold text-zinc-400">Sofia Davis — Staff Architect</footer>
          </blockquote>
        </div>
      </div>

      <!-- Right Form Panel -->
      <div class="p-8 flex items-center justify-center">
        <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">Create an account / Sign in</h1>
            <p class="text-xs text-muted-foreground">Enter your email to sign in to your workspace</p>
          </div>

          <form [formGroup]="signInForm" (ngSubmit)="onSubmit()" class="space-y-4">
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
              Sign In with Email
            </button>
          </form>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div hlmSeparator></div>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <button
            hlmBtn
            variant="outline"
            type="button"
            (click)="socialLogin('GitHub')"
            class="w-full gap-2 cursor-pointer text-xs"
          >
            <ng-icon name="simpleGithub" class="size-4" />
            <span>GitHub</span>
          </button>

          <p class="px-8 text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our
            <a href="#" class="underline underline-offset-4 hover:text-primary">Terms of Service</a>
            and
            <a href="#" class="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  `,
})
export class SignIn2Component {
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
