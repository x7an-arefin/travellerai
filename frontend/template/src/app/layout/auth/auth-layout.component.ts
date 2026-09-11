import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HlmToasterComponent } from '../../ui/sonner/hlm-sonner.component'

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HlmToasterComponent],
  template: `
    <div class="relative min-h-svh w-full bg-background flex flex-col justify-center items-center">
      <router-outlet />
      <hlm-toaster />
    </div>
  `,
})
export class AuthLayoutComponent {}
