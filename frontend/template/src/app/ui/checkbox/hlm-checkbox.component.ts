import { Component, EventEmitter, Input, Output, forwardRef, signal, computed } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideCheck } from '@ng-icons/lucide'
import { cn } from '@core/utils/cn'

@Component({
  selector: 'hlm-checkbox',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({ lucideCheck }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HlmCheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      role="checkbox"
      [attr.aria-checked]="checked()"
      [disabled]="disabled()"
      (click)="toggle()"
      [class]="_computedClass()"
    >
      @if (checked()) {
        <ng-icon name="lucideCheck" class="size-3.5 stroke-[3] text-primary-foreground" />
      }
    </button>
  `,
})
export class HlmCheckboxComponent implements ControlValueAccessor {
  readonly checked = signal<boolean>(false)
  readonly disabled = signal<boolean>(false)
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  @Input()
  set isChecked(value: boolean) {
    this.checked.set(value)
  }

  @Output() readonly checkedChange = new EventEmitter<boolean>()

  private onChange: (value: boolean) => void = () => {}
  private onTouched: () => void = () => {}

  protected readonly _computedClass = computed(() => {
    return cn(
      'peer border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center justify-center cursor-pointer',
      this.checked() ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent',
      this._class()
    )
  })

  toggle(): void {
    if (this.disabled()) return
    const nextState = !this.checked()
    this.checked.set(nextState)
    this.onChange(nextState)
    this.onTouched()
    this.checkedChange.emit(nextState)
  }

  writeValue(value: boolean): void {
    this.checked.set(!!value)
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }
}

export const HlmCheckboxImports = [HlmCheckboxComponent]
