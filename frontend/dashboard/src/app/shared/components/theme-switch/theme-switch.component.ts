import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideMoon, lucideSun, lucideLaptop } from '@ng-icons/lucide'
import { ThemeService, Theme } from '@core/services/theme.service'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { HlmMenuImports } from '@ui/dropdown-menu/hlm-menu.components'

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmButtonImports, ...HlmMenuImports],
  providers: [provideIcons({ lucideMoon, lucideSun, lucideLaptop })],
  template: `
    <hlm-dropdown-menu>
      <button
        hlmMenuTrigger
        hlmBtn
        variant="ghost"
        size="icon"
        class="size-9 rounded-full cursor-pointer"
        aria-label="Toggle theme"
      >
        @if (themeService.resolvedTheme() === 'dark') {
          <ng-icon name="lucideMoon" class="size-4.5 transition-all" />
        } @else {
          <ng-icon name="lucideSun" class="size-4.5 transition-all" />
        }
        <span class="sr-only">Toggle theme</span>
      </button>

      <div class="w-36 p-1">
        <button
          hlmMenuItem
          (click)="themeService.setTheme('light')"
          class="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer"
          [class.font-semibold]="themeService.theme() === 'light'"
        >
          <ng-icon name="lucideSun" class="size-4" />
          <span>Light</span>
        </button>

        <button
          hlmMenuItem
          (click)="themeService.setTheme('dark')"
          class="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer"
          [class.font-semibold]="themeService.theme() === 'dark'"
        >
          <ng-icon name="lucideMoon" class="size-4" />
          <span>Dark</span>
        </button>

        <button
          hlmMenuItem
          (click)="themeService.setTheme('system')"
          class="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer"
          [class.font-semibold]="themeService.theme() === 'system'"
        >
          <ng-icon name="lucideLaptop" class="size-4" />
          <span>System</span>
        </button>
      </div>
    </hlm-dropdown-menu>
  `,
})
export class ThemeSwitchComponent {
  constructor(public themeService: ThemeService) {}
}
