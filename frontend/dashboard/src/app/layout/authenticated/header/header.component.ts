import { Component, Input, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideMenu, lucidePanelLeft } from '@ng-icons/lucide'
import { LayoutService } from '@core/services/layout.service'
import { BreadcrumbComponent } from '@shared/components/breadcrumbs/breadcrumbs.component'
import { WorkflowTabsComponent } from '@shared/components/workflow-tabs/workflow-tabs.component'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { cn } from '@core/utils/cn'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIcon, BreadcrumbComponent, WorkflowTabsComponent, ...HlmButtonImports],
  providers: [provideIcons({ lucideMenu, lucidePanelLeft })],
  template: `
    <header [class]="_computedClasses()">
      <div class="flex h-16 w-full items-center justify-between gap-2 px-3 sm:px-4 md:px-6">
        <!-- Toggle Mobile Sidebar (mobile) or Collapse Sidebar (desktop) -->
        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="ghost"
            size="icon"
            class="md:hidden size-9 rounded-md cursor-pointer text-muted-foreground hover:text-foreground"
            (click)="layoutService.toggleMobile()"
            aria-label="Open navigation menu"
          >
            <ng-icon name="lucideMenu" class="size-4.5" />
          </button>

          <button
            hlmBtn
            variant="ghost"
            size="icon"
            class="hidden md:inline-flex size-9 rounded-md cursor-pointer text-muted-foreground hover:text-foreground"
            (click)="layoutService.toggleSidebar()"
            aria-label="Toggle sidebar"
          >
            <ng-icon name="lucidePanelLeft" class="size-4.5" />
          </button>

          <!-- Dynamic Route Breadcrumbs -->
          <app-breadcrumbs class="ml-2" />
        </div>

        <!-- Main Header Slots / Content -->
        <div class="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <ng-content />
        </div>
      </div>

      <!-- Multi-Tab Workflow Bar (Pinned Views) -->
      <app-workflow-tabs />
    </header>
  `,
})
export class HeaderComponent {
  @Input() fixed: boolean = false
  @Input() class: string = ''

  constructor(public layoutService: LayoutService) {}

  protected readonly _computedClasses = computed(() => {
    return cn(
      'flex flex-col shrink-0 border-b border-border bg-background/95 backdrop-blur-xs transition-[width,height] ease-linear z-30',
      this.fixed ? 'sticky top-0 shadow-2xs' : '',
      this.class
    )
  })
}
