import { Component, Directive, Input, computed, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '@core/utils/cn'

@Component({
  selector: 'hlm-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="_computedClass()">
      <ng-content />
    </div>
  `,
})
export class HlmAvatarComponent {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', this._class())
  })
}

@Directive({
  selector: '[hlmAvatarImage], img[hlmAvatarImage]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmAvatarImageDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('aspect-square size-full object-cover', this._class())
  })
}

@Directive({
  selector: '[hlmAvatarFallback]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmAvatarFallbackDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('bg-muted flex size-full items-center justify-center rounded-full text-xs font-medium text-muted-foreground uppercase', this._class())
  })
}

export const HlmAvatarImports = [
  HlmAvatarComponent,
  HlmAvatarImageDirective,
  HlmAvatarFallbackDirective,
]
