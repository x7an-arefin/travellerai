import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmInputOtpImports } from '../../../ui/input-otp/hlm-input-otp.component'
import { AuthService } from '../../../core/services/auth.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmInputOtpImports,
  ],
  template: `
    <div class="mx-auto w-full max-w-md p-4">
      <div hlmCard class="gap-4 p-6 shadow-lg">
        <div hlmCardHeader class="space-y-1 text-center sm:text-left px-0">
          <h2 hlmCardTitle class="text-xl font-bold">Two-factor Authentication</h2>
          <p hlmCardDescription class="text-xs">
            Please enter the 6-digit authentication code sent to your email address.
          </p>
        </div>

        <div hlmCardContent class="flex flex-col items-center gap-6 py-4 px-0">
          <hlm-input-otp [otpLength]="6" (valueChange)="onOtpChange($event)" />

          <button
            hlmBtn
            [disabled]="otpCode.length < 6"
            (click)="verifyCode()"
            class="w-full cursor-pointer"
          >
            Verify and Log In
          </button>
        </div>

        <div hlmCardFooter class="flex flex-col gap-2 px-0 text-center text-xs text-muted-foreground">
          <p>
            Haven't received it?
            <button (click)="resendCode()" class="font-semibold text-primary underline ml-1 cursor-pointer">
              Resend code
            </button>
          </p>
          <p>
            <a routerLink="/sign-in" class="text-muted-foreground hover:text-primary underline">
              Back to sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class OtpComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  otpCode = ''

  onOtpChange(code: string): void {
    this.otpCode = code
    if (code.length === 6) {
      this.verifyCode()
    }
  }

  verifyCode(): void {
    if (this.otpCode.length < 6) return
    this.authService.verifyOtp(this.otpCode)
    toast.success('Authentication verified successfully!')
    this.router.navigate(['/'])
  }

  resendCode(): void {
    toast.info('A new 6-digit code has been sent.')
  }
}
