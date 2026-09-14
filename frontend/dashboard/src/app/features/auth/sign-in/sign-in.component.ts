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
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmInputImports,
    ...HlmSeparatorImports,
  ],
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
              <span class="bg-card px-2 text-muted-foreground font-semibold">Demo Role Accounts (Mock)</span>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            @for (demo of demoRoles; track demo.email) {
              <button
                type="button"
                (click)="loginAsDemo(demo.email)"
                class="flex items-center justify-between p-2 rounded-md border border-border/60 hover:bg-accent/40 text-left transition-colors cursor-pointer text-xs group"
              >
                <div>
                  <p class="font-medium text-foreground">{{ demo.label }}</p>
                  <p class="text-[10px] text-muted-foreground">{{ demo.email }}</p>
                </div>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {{ demo.badge }}
                </span>
              </button>
            }
          </div>
        </div>

        <div hlmCardFooter class="flex flex-col gap-2 px-0 text-center text-xs text-muted-foreground">
          <p>
            Don't have an account?
            <a routerLink="/sign-up" class="font-semibold text-primary underline ml-1">Sign up</a>
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

  readonly demoRoles = [
    { label: 'Sultanul Arefin', email: 'arefin@traveller.ai', badge: 'Super Admin' },
    { label: 'Elena Rostova', email: 'elena@alpineadventures.com', badge: 'Tour Operator' },
    { label: 'Marco Rossi', email: 'marco@swissguides.ch', badge: 'Guide / Staff' },
    { label: 'Sarah Jenkins', email: 'finance@traveller.ai', badge: 'Finance Admin' },
    { label: 'Emma Richardson', email: 'emma.richardson@gmail.com', badge: 'Traveler' },
  ]

  readonly signInForm: FormGroup = this.fb.group({
    email: ['arefin@traveller.ai', [Validators.required, Validators.email]],
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
    const targetRoute = this.authService.getDefaultRouteForRole()
    this.router.navigateByUrl(targetRoute)
  }

  async loginAsDemo(email: string): Promise<void> {
    this.signInForm.patchValue({ email, password: 'password123' })
    const success = await this.authService.signInAsync(email, 'password123')
    if (success) {
      toast.success(`Logged in as ${email}`)
      const targetRoute = this.authService.getDefaultRouteForRole()
      this.router.navigateByUrl(targetRoute)
    }
  }
}
