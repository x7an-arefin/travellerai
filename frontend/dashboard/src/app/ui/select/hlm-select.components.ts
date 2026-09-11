import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  forwardRef,
  inject,
  signal,
  computed,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideChevronDown, lucideCheck } from '@ng-icons/lucide'
import { cn } from '@core/utils/cn'
import { OverlayService } from '@core/services/overlay.service'

export interface SelectOption {
  label: string
  value: any
  icon?: string
  disabled?: boolean
}

export type SelectSide = 'top' | 'bottom' | 'auto'

/* ==========================================================================
   Spartan Dropdown-Menu Styled Select Component (<hlm-custom-select>, <hlm-select>)
   Implements Spartan Dropdown Menu pattern (https://spartan.ng/components/dropdown-menu)
   with Reactive Forms, active checkmarks, smart top/bottom positioning, and smooth animations.
   ========================================================================== */
@Component({
  selector: 'hlm-custom-select, hlm-select',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({ lucideChevronDown, lucideCheck }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HlmCustomSelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative w-full text-left" #container>
      <!-- Dropdown Menu Trigger Button -->
      <button
        type="button"
        [disabled]="disabled()"
        (click)="toggleOpen()"
        [class]="_computedTriggerClass()"
        [attr.aria-expanded]="isOpen()"
        role="combobox"
        aria-haspopup="listbox"
      >
        <div class="flex items-center gap-2 truncate">
          @if (selectedOption()?.icon) {
            <ng-icon [name]="selectedOption()!.icon!" class="size-4 text-muted-foreground shrink-0" />
          }
          <span class="truncate font-normal" [class.text-muted-foreground]="!selectedOption()">
            {{ selectedOption() ? selectedOption()!.label : placeholder }}
          </span>
        </div>

        <ng-icon
          name="lucideChevronDown"
          class="size-4 text-muted-foreground shrink-0 transition-transform duration-200"
          [class.rotate-180]="isOpen()"
        />
      </button>

      <!-- Spartan Dropdown Menu Content Panel -->
      @if (isOpen()) {
        <div
          role="listbox"
          [class]="_computedPanelClass()"
        >
          @for (option of options; track option.value) {
            <button
              type="button"
              role="option"
              [attr.aria-selected]="isSelected(option.value)"
              [disabled]="option.disabled"
              (click)="selectOption(option)"
              class="relative flex w-full cursor-pointer select-none items-center justify-between gap-2.5 rounded-lg px-2.5 py-2 text-xs sm:text-sm font-medium outline-none transition-all duration-150 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 text-left"
              [class.bg-accent]="isSelected(option.value)"
              [class.text-accent-foreground]="isSelected(option.value)"
            >
              <div class="flex items-center gap-2 truncate">
                @if (option.icon) {
                  <ng-icon [name]="option.icon" class="size-4 text-muted-foreground shrink-0" />
                }
                <span class="truncate">{{ option.label }}</span>
              </div>

              @if (isSelected(option.value)) {
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
              }
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class HlmCustomSelectComponent implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef)
  private readonly overlayService = inject(OverlayService)

  readonly isOpen = signal<boolean>(false)
  readonly value = signal<any>(null)
  readonly disabled = signal<boolean>(false)
  readonly resolvedSide = signal<'top' | 'bottom'>('bottom')
  private readonly _class = signal<string>('')

  @Input() side: SelectSide = 'auto'

  @Input()
  set position(val: SelectSide) {
    this.side = val
  }

  @Input() options: readonly SelectOption[] | SelectOption[] = []
  @Input() placeholder: string = 'Select an option...'

  @Input()
  set class(val: string) {
    this._class.set(val)
  }

  @Output() readonly valueChange = new EventEmitter<any>()

  private onChange: (val: any) => void = () => {}
  private onTouched: () => void = () => {}

  readonly selectedOption = computed(() => {
    return this.options.find((opt) => opt.value === this.value()) || null
  })

  protected readonly _computedTriggerClass = computed(() => {
    return cn(
      'flex h-9 w-full items-center justify-between rounded-lg border border-input bg-background bg-white dark:bg-zinc-950 px-3 py-2 text-xs sm:text-sm shadow-xs transition-colors hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer select-none text-left',
      this._class()
    )
  })

  protected readonly _computedPanelClass = computed(() => {
    const isTop = this.resolvedSide() === 'top'
    return cn(
      'absolute z-[120] max-h-60 w-full min-w-[8rem] overflow-auto rounded-xl border border-border bg-popover bg-white dark:bg-zinc-900 p-1 text-popover-foreground shadow-2xl outline-none no-scrollbar',
      isTop ? 'bottom-full mb-1.5 origin-bottom animate-dropdown-in-top' : 'top-full mt-1.5 origin-top animate-dropdown-in'
    )
  })

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.close()
    }
  }

  toggleOpen(): void {
    if (this.disabled()) return
    const nextState = !this.isOpen()
    if (nextState) {
      this.calculatePosition()
      this.overlayService.registerOpen(this)
      this.isOpen.set(true)
    } else {
      this.close()
    }
  }

  close(): void {
    this.isOpen.set(false)
    this.overlayService.registerClose(this)
  }

  private calculatePosition(): void {
    if (this.side === 'top') {
      this.resolvedSide.set('top')
      return
    }
    if (this.side === 'bottom') {
      this.resolvedSide.set('bottom')
      return
    }

    if (typeof window !== 'undefined') {
      const rect = this.elementRef.nativeElement.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      if (spaceBelow < 240 || rect.top > window.innerHeight * 0.6) {
        this.resolvedSide.set('top')
      } else {
        this.resolvedSide.set('bottom')
      }
    }
  }

  isSelected(val: any): boolean {
    return this.value() === val
  }

  selectOption(option: SelectOption): void {
    if (option.disabled) return
    this.value.set(option.value)
    this.onChange(option.value)
    this.onTouched()
    this.valueChange.emit(option.value)
    this.close()
  }

  writeValue(val: any): void {
    this.value.set(val)
  }

  registerOnChange(fn: (val: any) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }
}

export const HlmSelectComponent = HlmCustomSelectComponent
export const HlmSelectImports = [HlmCustomSelectComponent]
