import { Directive, Input, computed, signal } from '@angular/core'
import { cn } from '@core/utils/cn'

@Directive({
  selector: '[hlmSeparator], hlm-separator',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
    '[attr.role]': "'separator'",
    '[attr.aria-orientation]': 'orientation',
  },
})
export class HlmSeparatorDirective {
  private readonly _class = signal<string>('')
  private readonly _orientation = signal<'horizontal' | 'vertical'>('horizontal')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  @Input()
  set orientation(value: 'horizontal' | 'vertical') {
    this._orientation.set(value)
  }

  get orientation(): 'horizontal' | 'vertical' {
    return this._orientation()
  }

  protected readonly _computedClass = computed(() => {
    return cn(
      'bg-border shrink-0',
      this._orientation() === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      this._class()
    )
  })
}

export const HlmSeparatorImports = [HlmSeparatorDirective]
