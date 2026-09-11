import { Directive, Input, computed, signal } from '@angular/core'
import { cn } from '@core/utils/cn'

@Directive({
  selector: '[hlmSkeleton], hlm-skeleton',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
    'aria-hidden': 'true',
  },
})
export class HlmSkeletonDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('animate-pulse rounded-md bg-muted/80 block', this._class())
  })
}

export const HlmSkeletonImports = [HlmSkeletonDirective]
