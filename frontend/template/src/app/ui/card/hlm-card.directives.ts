import { Directive, Input, computed, signal } from '@angular/core'
import { cn } from '@core/utils/cn'

@Directive({
  selector: '[hlmCard], hlm-card',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn(
      'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-xs',
      this._class()
    )
  })
}

@Directive({
  selector: '[hlmCardHeader]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardHeaderDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('flex flex-col gap-1.5 px-6', this._class())
  })
}

@Directive({
  selector: '[hlmCardTitle]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardTitleDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('font-semibold leading-none tracking-tight text-lg', this._class())
  })
}

@Directive({
  selector: '[hlmCardDescription]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardDescriptionDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('text-muted-foreground text-sm', this._class())
  })
}

@Directive({
  selector: '[hlmCardContent]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardContentDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('px-6', this._class())
  })
}

@Directive({
  selector: '[hlmCardFooter]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardFooterDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('flex items-center px-6', this._class())
  })
}

export const HlmCardImports = [
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardDescriptionDirective,
  HlmCardContentDirective,
  HlmCardFooterDirective,
]
