import { Component, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component'
import { CommandMenuComponent } from '@shared/components/command-menu/command-menu.component'
import { SkipToMainComponent } from '@shared/components/skip-to-main/skip-to-main.component'
import { KeyboardShortcutsDialogComponent } from '@shared/components/keyboard-shortcuts-dialog/keyboard-shortcuts-dialog.component'
import { HlmToasterComponent } from '@ui/sonner/hlm-sonner.component'
import { LayoutService } from '@core/services/layout.service'
import { cn } from '@core/utils/cn'

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AppSidebarComponent,
    CommandMenuComponent,
    SkipToMainComponent,
    KeyboardShortcutsDialogComponent,
    HlmToasterComponent,
  ],
  template: `
    <div class="relative flex h-svh w-full bg-background overflow-hidden">
      <!-- Skip To Main for Accessibility -->
      <app-skip-to-main />

      <!-- App Sidebar -->
      <app-sidebar />

      <!-- Content Area / Sidebar Inset -->
      <div [class]="_computedInsetClasses()">
        <router-outlet />
      </div>

      <!-- Global Command Palette -->
      <app-command-menu />

      <!-- Keyboard Shortcuts Modal (?) -->
      <app-keyboard-shortcuts-dialog />

      <!-- Sonner Toaster -->
      <hlm-toaster />
    </div>
  `,
})
export class AuthenticatedLayoutComponent {
  constructor(public layoutService: LayoutService) {}

  protected readonly _computedInsetClasses = computed(() => {
    const variant = this.layoutService.variant()
    const open = this.layoutService.sidebarOpen()
    const collapsible = this.layoutService.collapsible()
    const isOffcanvas = !open && collapsible === 'offcanvas'

    const variantStyles = {
      sidebar: 'flex flex-1 flex-col overflow-y-auto min-w-0 bg-background w-full',
      inset: cn(
        'flex flex-1 flex-col overflow-y-auto min-w-0 bg-background w-full md:my-2 md:mr-2 md:rounded-xl md:border md:border-border/80 md:shadow-xs transition-all duration-300',
        isOffcanvas && 'md:ml-2'
      ),
      floating: cn(
        'flex flex-1 flex-col overflow-y-auto min-w-0 bg-background w-full md:my-3 md:mr-3 md:rounded-2xl md:border md:border-border/80 md:shadow-md transition-all duration-300',
        isOffcanvas && 'md:ml-3'
      ),
    }

    return cn(variantStyles[variant])
  })
}
