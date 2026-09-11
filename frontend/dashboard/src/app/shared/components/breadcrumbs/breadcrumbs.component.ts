import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideChevronRight, lucideHome } from '@ng-icons/lucide'
import { BreadcrumbService } from '../../../core/services/breadcrumb.service'

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon],
  providers: [provideIcons({ lucideChevronRight, lucideHome })],
  template: `
    <nav aria-label="Breadcrumb" class="hidden sm:flex items-center space-x-1.5 text-xs text-muted-foreground">
      @for (item of breadcrumbService.breadcrumbs(); track item.url) {
        @if (!$first) {
          <ng-icon name="lucideChevronRight" class="size-3 text-muted-foreground/60 shrink-0" />
        }

        @if (item.isLast) {
          <span class="flex items-center gap-1 font-semibold text-foreground truncate max-w-[150px]">
            @if ($first) {
              <ng-icon name="lucideHome" class="size-3.5 text-muted-foreground shrink-0" />
            }
            <span>{{ item.label }}</span>
          </span>
        } @else {
          <a
            [routerLink]="item.url"
            class="flex items-center gap-1 hover:text-foreground transition-colors truncate max-w-[120px]"
          >
            @if ($first) {
              <ng-icon name="lucideHome" class="size-3.5 text-muted-foreground shrink-0" />
            }
            <span>{{ item.label }}</span>
          </a>
        }
      }
    </nav>
  `,
})
export class BreadcrumbComponent {
  readonly breadcrumbService = inject(BreadcrumbService)
}
