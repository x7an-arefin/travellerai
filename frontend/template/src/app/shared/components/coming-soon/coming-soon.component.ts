import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideClock } from '@ng-icons/lucide'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon, ...HlmButtonImports],
  providers: [provideIcons({ lucideClock })],
  template: `
    <div class="flex min-h-[60vh] w-full flex-col items-center justify-center p-6 text-center">
      <div class="m-auto flex max-w-md flex-col items-center justify-center gap-3">
        <ng-icon name="lucideClock" class="size-16 text-primary animate-pulse" />
        <h1 class="text-3xl font-bold tracking-tight text-foreground">Coming Soon!</h1>
        <p class="text-sm text-muted-foreground">
          This page is currently under construction. Stay tuned for upcoming updates!
        </p>
        <div class="mt-4">
          <a routerLink="/" hlmBtn class="cursor-pointer">
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  `,
})
export class ComingSoonComponent {}
