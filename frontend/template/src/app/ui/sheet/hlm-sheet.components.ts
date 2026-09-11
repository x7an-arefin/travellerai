import { Component, Directive, EventEmitter, Input, Output, computed, signal, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core'
import { CommonModule, DOCUMENT } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideX } from '@ng-icons/lucide'
import { cn } from '@core/utils/cn'

export type SheetSide = 'top' | 'bottom' | 'left' | 'right'
export type SheetSize = 'sm' | 'md' | 'xl'

@Component({
  selector: 'hlm-sheet',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ lucideX })],
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-[100] overflow-hidden">
        <!-- Backdrop with Smooth Fade-in and Fade-out Transitions -->
        <div
          [class]="_computedBackdropClass()"
          (click)="close()"
        ></div>

        <!-- Sheet Panel with Smooth Slide-in and Slide-out Transitions -->
        <div
          role="dialog"
          aria-modal="true"
          [class]="_computedClass()"
          (click)="$event.stopPropagation()"
        >
          <ng-content />

          @if (showCloseSignal()) {
            <button
              type="button"
              (click)="close()"
              class="absolute right-4 top-4 sm:right-6 sm:top-6 size-8 rounded-md flex items-center justify-center text-muted-foreground/70 hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none cursor-pointer z-20"
            >
              <ng-icon name="lucideX" class="size-4" />
              <span class="sr-only">Close</span>
            </button>
          }
        </div>
      </div>
    }
  `,
})
export class HlmSheetComponent implements AfterViewInit, OnDestroy {
  private readonly _elementRef = inject(ElementRef)
  private readonly _document = inject(DOCUMENT)

  readonly open = signal<boolean>(false)
  readonly isClosing = signal<boolean>(false)
  readonly showCloseSignal = signal<boolean>(true)
  readonly side = signal<SheetSide>('right')
  readonly sheetSize = signal<SheetSize>('sm')
  private readonly _class = signal<string>('')

  ngAfterViewInit(): void {
    if (this._document && this._document.body) {
      this._document.body.appendChild(this._elementRef.nativeElement)
    }
  }

  ngOnDestroy(): void {
    if (this._elementRef.nativeElement && this._elementRef.nativeElement.parentNode) {
      this._elementRef.nativeElement.parentNode.removeChild(this._elementRef.nativeElement)
    }
  }

  @Input()
  set isOpen(value: boolean) {
    if (value) {
      this.isClosing.set(false)
      this.open.set(true)
    } else if (this.open() && !this.isClosing()) {
      this.close()
    }
  }

  @Input()
  set position(value: SheetSide) {
    this.side.set(value)
  }

  @Input()
  set size(value: SheetSize) {
    this.sheetSize.set(value || 'sm')
  }

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  @Input()
  set showClose(value: boolean) {
    this.showCloseSignal.set(value)
  }

  @Input()
  set closeable(value: boolean) {
    this.showCloseSignal.set(value)
  }

  @Output() readonly openChange = new EventEmitter<boolean>()
  @Output() readonly closed = new EventEmitter<void>()

  protected readonly _computedBackdropClass = computed(() => {
    return cn(
      'fixed inset-0 bg-black/80 backdrop-blur-xs z-[200]',
      this.isClosing() ? 'animate-backdrop-out' : 'animate-backdrop-in'
    )
  })

  protected readonly _computedClass = computed(() => {
    const s = this.side()
    const sz = this.sheetSize()
    const closing = this.isClosing()

    // 1. Position & Width based on 'sm' (Compact), 'md' (Medium desktop), 'xl' (Full screen)
    const sizeStyles = {
      sm: s === 'right' || s === 'left' ? 'w-full sm:max-w-md lg:max-w-[440px]' : 'h-1/3',
      md: s === 'right' || s === 'left' ? 'w-full sm:max-w-xl lg:max-w-2xl' : 'h-1/2',
      xl: s === 'right' || s === 'left' ? 'w-full sm:w-screen max-w-full' : 'h-screen',
    }

    const sideStyles = {
      top: 'inset-x-0 top-0 border-b',
      bottom: 'inset-x-0 bottom-0 border-t',
      left: 'inset-y-0 left-0 h-full border-r',
      right: 'inset-y-0 right-0 h-full border-l',
    }

    const animStyles = {
      top: closing ? 'animate-sheet-out-top' : 'animate-sheet-in-top',
      bottom: closing ? 'animate-sheet-out-bottom' : 'animate-sheet-in-bottom',
      left: closing ? 'animate-sheet-out-left' : 'animate-sheet-in-left',
      right: closing ? 'animate-sheet-out-right' : 'animate-sheet-in-right',
    }

    return cn(
      'fixed z-[201] gap-4 bg-background bg-white dark:bg-zinc-950 text-foreground p-6 shadow-2xl flex flex-col border-border overflow-y-auto',
      sideStyles[s],
      sizeStyles[sz],
      animStyles[s],
      this._class()
    )
  })

  close(): void {
    if (this.isClosing() || !this.open()) return

    this.isClosing.set(true)

    // Wait for exit animation to complete (280ms)
    setTimeout(() => {
      this.open.set(false)
      this.isClosing.set(false)
      this.openChange.emit(false)
      this.closed.emit()
    }, 280)
  }
}

@Directive({
  selector: '[hlmSheetHeader], hlm-sheet-header',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmSheetHeaderDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('flex flex-col gap-1.5 text-left pb-4 border-b border-border pr-12 shrink-0', this._class())
  })
}

@Directive({
  selector: '[hlmSheetTitle], hlm-sheet-title',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmSheetTitleDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('text-lg font-semibold text-foreground', this._class())
  })
}

@Directive({
  selector: '[hlmSheetDescription], hlm-sheet-description',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmSheetDescriptionDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('text-sm text-muted-foreground', this._class())
  })
}

@Directive({
  selector: '[hlmSheetFooter], hlm-sheet-footer',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmSheetFooterDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-auto pt-4 border-t border-border', this._class())
  })
}

export const HlmSheetImports = [
  HlmSheetComponent,
  HlmSheetHeaderDirective,
  HlmSheetTitleDirective,
  HlmSheetDescriptionDirective,
  HlmSheetFooterDirective,
]
