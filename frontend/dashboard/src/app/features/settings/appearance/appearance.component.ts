import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmSelectImports, SelectOption } from '../../../ui/select/hlm-select.components'
import { HlmSeparatorImports } from '../../../ui/separator/hlm-separator.directive'
import { ThemeService } from '../../../core/services/theme.service'
import { FontService, AppFont } from '../../../core/services/font.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-appearance-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ...HlmButtonImports,
    ...HlmSelectImports,
    ...HlmSeparatorImports,
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">Appearance</h3>
        <p class="text-sm text-muted-foreground">Customize the appearance of the app. Automatically switch between day and night themes.</p>
      </div>

      <div hlmSeparator></div>

      <div class="space-y-6">
        <!-- Font family select -->
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Font Family</label>
          <div class="w-full sm:w-60">
            <hlm-custom-select
              [options]="fontOptions"
              [ngModel]="fontService.font()"
              (ngModelChange)="onFontChange($event)"
              placeholder="Select font family"
            />
          </div>
          <p class="text-xs text-muted-foreground">Set the primary typeface for your admin dashboard.</p>
        </div>

        <!-- Theme Mode Cards -->
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Theme</label>
          <p class="text-xs text-muted-foreground">Select the theme for the dashboard.</p>

          <div class="grid max-w-md grid-cols-2 gap-4 pt-2">
            <!-- Light theme option card -->
            <button
              type="button"
              (click)="themeService.setTheme('light')"
              class="relative rounded-xl border-2 p-1.5 transition-all text-left cursor-pointer hover:border-primary/50"
              [class.border-primary]="themeService.theme() === 'light'"
              [class.border-muted]="themeService.theme() !== 'light'"
            >
              <div class="space-y-2 rounded-lg bg-[#ecedef] p-2.5">
                <div class="space-y-2 rounded-md bg-white p-2 shadow-xs">
                  <div class="h-2 w-16 rounded-lg bg-[#ecedef]"></div>
                  <div class="h-2 w-20 rounded-lg bg-[#ecedef]"></div>
                </div>
                <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                  <div class="size-4 rounded-full bg-[#ecedef]"></div>
                  <div class="h-2 w-20 rounded-lg bg-[#ecedef]"></div>
                </div>
              </div>
              <span class="block w-full p-2 text-center text-xs font-semibold">Light</span>
            </button>

            <!-- Dark theme option card -->
            <button
              type="button"
              (click)="themeService.setTheme('dark')"
              class="relative rounded-xl border-2 p-1.5 transition-all text-left cursor-pointer hover:border-primary/50"
              [class.border-primary]="themeService.theme() === 'dark'"
              [class.border-muted]="themeService.theme() !== 'dark'"
            >
              <div class="space-y-2 rounded-lg bg-slate-950 p-2.5">
                <div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-xs">
                  <div class="h-2 w-16 rounded-lg bg-slate-500"></div>
                  <div class="h-2 w-20 rounded-lg bg-slate-500"></div>
                </div>
                <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                  <div class="size-4 rounded-full bg-slate-500"></div>
                  <div class="h-2 w-20 rounded-lg bg-slate-500"></div>
                </div>
              </div>
              <span class="block w-full p-2 text-center text-xs font-semibold">Dark</span>
            </button>
          </div>
        </div>

        <button hlmBtn (click)="savePreferences()" class="cursor-pointer">
          Update preferences
        </button>
      </div>
    </div>
  `,
})
export class AppearanceComponent {
  readonly themeService = inject(ThemeService)
  readonly fontService = inject(FontService)

  readonly fontOptions: SelectOption[] = [
    { label: 'Inter (Default)', value: 'inter' },
    { label: 'Manrope', value: 'manrope' },
  ]

  onFontChange(newFont: AppFont): void {
    this.fontService.setFont(newFont)
  }

  savePreferences(): void {
    toast.success('Appearance preferences updated!')
  }
}
