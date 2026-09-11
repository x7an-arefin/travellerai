import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  computed,
  inject,
  signal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '@core/utils/cn'
import { OverlayService } from '@core/services/overlay.service'

export type MenuSide = 'top' | 'bottom' | 'auto'
export type MenuAlign = 'start' | 'center' | 'end'

@Component({
  selector: 'hlm-dropdown-menu, [hlmDropdownMenu]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block w-full text-left" #container>
      <ng-content select="[hlmMenuTrigger], [hlmDropdownMenuTrigger]" />

      @if (open()) {
        <div
          [class]="_computedClass()"
          role="menu"
          tabindex="-1"
          (click)="handleMenuClick($event)"
        >
          <ng-content />
        </div>
      }
    </div>
  `,
})
export class HlmDropdownMenuComponent {
  private readonly elementRef = inject(ElementRef)
  private readonly overlayService = inject(OverlayService)
  readonly open = signal<boolean>(false)
  readonly align = signal<MenuAlign>('end')
  readonly resolvedSide = signal<'top' | 'bottom'>('bottom')
  private readonly _class = signal<string>('')

  @Input() side: MenuSide = 'auto'

  @Input()
  set position(val: MenuSide) {
    this.side = val
  }

  @Input()
  set alignment(val: MenuAlign) {
    this.align.set(val)
  }

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.elementRef.nativeElement.contains(event.target)) {
      this.close()
    }
  }

  toggle(): void {
    const nextState = !this.open()
    if (nextState) {
      this.calculatePosition()
      this.overlayService.registerOpen(this)
    } else {
      this.overlayService.registerClose(this)
    }
    this.open.set(nextState)
  }

  close(): void {
    this.open.set(false)
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

  handleMenuClick(event: MouseEvent): void {
    const target = event.target as HTMLElement
    if (target.closest('[hlmMenuItem], [hlmDropdownMenuItem]')) {
      this.close()
    }
  }

  protected readonly _computedClass = computed(() => {
    const isTop = this.resolvedSide() === 'top'

    const alignmentClasses = {
      start: isTop ? 'left-0 origin-bottom-left bottom-full mb-1.5' : 'left-0 origin-top-left top-full mt-1.5',
      center: isTop ? 'left-1/2 -translate-x-1/2 origin-bottom bottom-full mb-1.5' : 'left-1/2 -translate-x-1/2 origin-top top-full mt-1.5',
      end: isTop ? 'right-0 origin-bottom-right bottom-full mb-1.5' : 'right-0 origin-top-right top-full mt-1.5',
    }

    const panelClass = this._class()
      .replace(/\bw-full\b/g, '')
      .trim()

    return cn(
      'absolute z-[150] min-w-[8rem] w-max max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-popover bg-white dark:bg-zinc-900 p-1 text-popover-foreground shadow-xl outline-none',
      isTop ? 'animate-dropdown-in-top' : 'animate-dropdown-in',
      alignmentClasses[this.align()],
      panelClass
    )
  })
}

@Directive({
  selector: '[hlmMenuTrigger], [hlmDropdownMenuTrigger]',
  standalone: true,
  host: {
    '(click)': 'handleClick($event)',
    '[attr.aria-expanded]': 'isMenuOpen()',
  },
})
export class HlmMenuTriggerDirective {
  readonly menu = inject(HlmDropdownMenuComponent, { optional: true })

  isMenuOpen(): boolean {
    return this.menu ? this.menu.open() : false
  }

  handleClick(event: MouseEvent): void {
    if (this.menu) {
      this.menu.toggle()
    }
  }
}

@Directive({
  selector: '[hlmMenuItem], [hlmDropdownMenuItem], button[hlmMenuItem], button[hlmDropdownMenuItem]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
    'role': 'menuitem',
    'tabindex': '-1',
    '[attr.disabled]': "disabled ? 'true' : null",
  },
})
export class HlmMenuItemDirective {
  private readonly _class = signal<string>('')
  @Input() disabled: boolean = false

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn(
      'relative flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs sm:text-sm font-medium outline-none transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-left',
      this._class()
    )
  })
}

@Directive({
  selector: '[hlmMenuLabel], [hlmDropdownMenuLabel], hlm-menu-label, hlm-dropdown-menu-label',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmMenuLabelDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('px-2.5 py-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase', this._class())
  })
}

@Directive({
  selector: '[hlmMenuSeparator], [hlmDropdownMenuSeparator], hlm-menu-separator, hlm-dropdown-menu-separator',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmMenuSeparatorDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('-mx-1 my-1.5 h-px bg-border/60', this._class())
  })
}

@Directive({
  selector: '[hlmMenuShortcut], [hlmDropdownMenuShortcut]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmMenuShortcutDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('ml-auto font-mono text-[10px] font-medium tracking-wider text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded border border-border/40', this._class())
  })
}

export const HlmMenuImports = [
  HlmDropdownMenuComponent,
  HlmMenuTriggerDirective,
  HlmMenuItemDirective,
  HlmMenuLabelDirective,
  HlmMenuSeparatorDirective,
  HlmMenuShortcutDirective,
]

export const HlmDropdownMenuImports = HlmMenuImports
