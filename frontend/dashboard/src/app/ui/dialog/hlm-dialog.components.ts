import { Component, Directive, EventEmitter, Input, Output, computed, signal, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core'
import { CommonModule, DOCUMENT } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideX } from '@ng-icons/lucide'
import { cn } from '@core/utils/cn'

@Component({
  selector: 'hlm-dialog',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ lucideX })],
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <!-- Backdrop with Smooth Fade-in and Fade-out Transitions -->
        <div
          [class]="_computedBackdropClass()"
          (click)="handleBackdropClick()"
        ></div>

        <!-- Dialog Container with Smooth Zoom-in and Zoom-out Transitions -->
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
export class HlmDialogComponent implements AfterViewInit, OnDestroy {
  private readonly _elementRef = inject(ElementRef)
  private readonly _document = inject(DOCUMENT)

  readonly open = signal<boolean>(false)
  readonly isClosing = signal<boolean>(false)
  readonly showCloseSignal = signal<boolean>(true)
  readonly closeOnBackdrop = signal<boolean>(true)
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
      'fixed inset-0 bg-black/80 backdrop-blur-xs z-[100]',
      this.isClosing() ? 'animate-backdrop-out' : 'animate-backdrop-in'
    )
  })

  protected readonly _computedClass = computed(() => {
    return cn(
      'relative z-[101] grid w-full max-w-lg gap-4 border border-border bg-background bg-white dark:bg-zinc-950 text-foreground p-6 shadow-2xl rounded-lg sm:rounded-xl',
      this.isClosing() ? 'animate-dialog-out' : 'animate-dialog-in',
      this._class()
    )
  })

  close(): void {
    if (this.isClosing() || !this.open()) return

    this.isClosing.set(true)

    // Wait for exit animation (240ms)
    setTimeout(() => {
      this.open.set(false)
      this.isClosing.set(false)
      this.openChange.emit(false)
      this.closed.emit()
    }, 240)
  }

  handleBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.close()
    }
  }
}

@Directive({
  selector: '[hlmDialogHeader], hlm-dialog-header',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmDialogHeaderDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('flex flex-col gap-1.5 text-center sm:text-left pr-12 shrink-0', this._class())
  })
}

@Directive({
  selector: '[hlmDialogTitle], hlm-dialog-title',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmDialogTitleDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('text-lg font-semibold leading-none tracking-tight text-foreground', this._class())
  })
}

@Directive({
  selector: '[hlmDialogDescription], hlm-dialog-description',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmDialogDescriptionDirective {
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
  selector: '[hlmDialogFooter], hlm-dialog-footer',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmDialogFooterDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 sm:gap-0 mt-4', this._class())
  })
}

export const HlmDialogImports = [
  HlmDialogComponent,
  HlmDialogHeaderDirective,
  HlmDialogTitleDirective,
  HlmDialogDescriptionDirective,
  HlmDialogFooterDirective,
]
