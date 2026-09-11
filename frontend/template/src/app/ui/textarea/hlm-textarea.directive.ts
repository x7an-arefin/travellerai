import { Directive, Input, computed, signal } from '@angular/core'
import { cn } from '@core/utils/cn'

@Directive({
  selector: 'textarea[hlmTextarea], [hlmTextarea]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmTextareaDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn(
      'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      this._class()
    )
  })
}

export const HlmTextareaImports = [HlmTextareaDirective]
