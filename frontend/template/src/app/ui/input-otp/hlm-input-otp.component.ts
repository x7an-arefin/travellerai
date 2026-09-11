import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren, forwardRef, signal, computed } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { cn } from '@core/utils/cn'

@Component({
  selector: 'hlm-input-otp',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HlmInputOtpComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex items-center gap-2" (paste)="handlePaste($event)">
      @for (digit of digits(); track $index) {
        <input
          #inputEl
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="1"
          [value]="digit"
          (input)="handleInput($index, $event)"
          (keydown)="handleKeyDown($index, $event)"
          [class]="_computedSlotClass($index)"
        />
        @if ($index === 2 && length() === 6) {
          <div class="text-muted-foreground font-bold px-1">-</div>
        }
      }
    </div>
  `,
})
export class HlmInputOtpComponent implements ControlValueAccessor {
  @ViewChildren('inputEl') inputElements!: QueryList<ElementRef<HTMLInputElement>>

  readonly length = signal<number>(6)
  readonly digits = signal<string[]>(['', '', '', '', '', ''])
  readonly disabled = signal<boolean>(false)
  private readonly _class = signal<string>('')

  @Input()
  set otpLength(val: number) {
    this.length.set(val)
    this.digits.set(new Array(val).fill(''))
  }

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  @Output() readonly valueChange = new EventEmitter<string>()

  private onChange: (value: string) => void = () => {}
  private onTouched: () => void = () => {}

  protected _computedSlotClass(index: number): string {
    const isFilled = !!this.digits()[index]
    return cn(
      'size-10 text-center text-lg font-semibold rounded-md border border-input bg-background shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
      isFilled && 'border-primary ring-1 ring-primary/40',
      this._class()
    )
  }

  handleInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement
    const val = input.value.replace(/[^0-9]/g, '').slice(-1)

    const updated = [...this.digits()]
    updated[index] = val
    this.digits.set(updated)

    const fullValue = updated.join('')
    this.onChange(fullValue)
    this.onTouched()
    this.valueChange.emit(fullValue)

    if (val && index < this.length() - 1) {
      const inputs = this.inputElements.toArray()
      inputs[index + 1]?.nativeElement.focus()
    }
  }

  handleKeyDown(index: number, event: KeyboardEvent): void {
    const inputs = this.inputElements.toArray()

    if (event.key === 'Backspace') {
      if (!this.digits()[index] && index > 0) {
        inputs[index - 1]?.nativeElement.focus()
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      inputs[index - 1]?.nativeElement.focus()
    } else if (event.key === 'ArrowRight' && index < this.length() - 1) {
      inputs[index + 1]?.nativeElement.focus()
    }
  }

  handlePaste(event: ClipboardEvent): void {
    event.preventDefault()
    const pastedData = event.clipboardData?.getData('text').replace(/[^0-9]/g, '') || ''
    if (!pastedData) return

    const updated = [...this.digits()]
    for (let i = 0; i < this.length(); i++) {
      updated[i] = pastedData[i] || ''
    }
    this.digits.set(updated)

    const fullValue = updated.join('')
    this.onChange(fullValue)
    this.onTouched()
    this.valueChange.emit(fullValue)

    const nextIndex = Math.min(pastedData.length, this.length() - 1)
    const inputs = this.inputElements.toArray()
    inputs[nextIndex]?.nativeElement.focus()
  }

  writeValue(value: string): void {
    if (typeof value === 'string') {
      const chars = value.split('')
      const updated = new Array(this.length()).fill('').map((_, i) => chars[i] || '')
      this.digits.set(updated)
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }
}

export const HlmInputOtpImports = [HlmInputOtpComponent]
