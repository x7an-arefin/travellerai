import { Component, EventEmitter, Input, Output, forwardRef, signal, computed } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { cn } from '@core/utils/cn'

@Component({
  selector: 'hlm-switch',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HlmSwitchComponent),
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked()"
      [disabled]="disabled()"
      (click)="toggle()"
      [class]="_computedTrackClass()"
    >
      <span [class]="_computedThumbClass()"></span>
    </button>
  `,
})
export class HlmSwitchComponent implements ControlValueAccessor {
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

  protected readonly _computedTrackClass = computed(() => {
    return cn(
      'peer focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-[3px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      this.checked() ? 'bg-primary' : 'bg-input',
      this._class()
    )
  })

  protected readonly _computedThumbClass = computed(() => {
    return cn(
      'pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
      this.checked() ? 'translate-x-5' : 'translate-x-0'
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

export const HlmSwitchImports = [HlmSwitchComponent]
