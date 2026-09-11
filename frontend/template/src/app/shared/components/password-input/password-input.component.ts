import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, forwardRef, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideEye, lucideEyeOff } from '@ng-icons/lucide'
import { cn } from '@core/utils/cn'

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({ lucideEye, lucideEyeOff }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative w-full">
      <input
        #inputEl
        [type]="showPassword() ? 'text' : 'password'"
        [value]="value()"
        [placeholder]="placeholder"
        [disabled]="disabled()"
        (input)="handleInput($event)"
        (blur)="onTouched()"
        [class]="_computedInputClass()"
      />
      <button
        type="button"
        tabindex="-1"
        [disabled]="disabled()"
        (click)="toggleShowPassword()"
        class="absolute right-1.5 top-1/2 -translate-y-1/2 size-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:pointer-events-none disabled:opacity-50"
        [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
      >
        @if (showPassword()) {
          <ng-icon name="lucideEyeOff" class="size-4" />
        } @else {
          <ng-icon name="lucideEye" class="size-4" />
        }
      </button>
    </div>
  `,
})
export class PasswordInputComponent implements ControlValueAccessor {
  @ViewChild('inputEl') inputRef!: ElementRef<HTMLInputElement>

  readonly value = signal<string>('')
  readonly showPassword = signal<boolean>(false)
  readonly disabled = signal<boolean>(false)

  @Input() placeholder: string = '••••••••'
  @Input() class: string = ''

  @Output() readonly valueChange = new EventEmitter<string>()

  private onChange: (val: string) => void = () => {}
  public onTouched: () => void = () => {}

  _computedInputClass(): string {
    return cn(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent pl-3 pr-9 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      this.class
    )
  }

  toggleShowPassword(): void {
    this.showPassword.set(!this.showPassword())
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement
    const val = target.value
    this.value.set(val)
    this.onChange(val)
    this.valueChange.emit(val)
  }

  writeValue(val: string): void {
    this.value.set(val || '')
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }
}
