import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ...HlmButtonImports],
  template: `
    <div class="flex min-h-svh w-full flex-col items-center justify-center p-6 text-center">
      <div class="mx-auto max-w-md space-y-4">
        <div class="text-7xl font-extrabold tracking-tight text-primary">
          {{ code }}
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {{ title }}
        </h1>
        <p class="text-sm text-muted-foreground">
          {{ message }}
        </p>

        <div class="flex items-center justify-center gap-3 pt-4">
          <a routerLink="/" hlmBtn class="cursor-pointer">
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  `,
})
export class ErrorPageComponent {
  @Input({ required: true }) code!: string
  @Input({ required: true }) title!: string
  @Input({ required: true }) message!: string
}
