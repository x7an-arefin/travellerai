import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { cn } from '../../../core/utils/cn'

export interface TopNavLink {
  title: string
  href: string
  isActive?: boolean
  disabled?: boolean
}

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav [class]="_computedClasses()">
      @for (link of links; track link.title) {
        <a
          [routerLink]="link.disabled ? null : link.href"
          [class]="_computedLinkClasses(link)"
        >
          {{ link.title }}
        </a>
      }
    </nav>
  `,
})
export class TopNavComponent {
  @Input() links: TopNavLink[] = []
  @Input() class: string = ''

  _computedClasses(): string {
    return cn('hidden md:flex items-center space-x-4 lg:space-x-6', this.class)
  }

  _computedLinkClasses(link: TopNavLink): string {
    return cn(
      'text-sm font-medium transition-colors hover:text-primary',
      link.isActive ? 'text-primary font-semibold' : 'text-muted-foreground',
      link.disabled && 'pointer-events-none opacity-50'
    )
  }
}
