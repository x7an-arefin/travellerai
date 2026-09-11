import { Component, Directive, EventEmitter, Input, Output, computed, signal, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '@core/utils/cn'

@Component({
  selector: 'hlm-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="_computedClass()">
      <ng-content />
    </div>
  `,
})
export class HlmTabsComponent {
  private readonly _class = signal<string>('')
  readonly activeTab = signal<string>('')

  @Input()
  set defaultValue(value: string) {
    if (!this.activeTab()) {
      this.activeTab.set(value)
    }
  }

  @Input()
  set value(value: string) {
    this.activeTab.set(value)
  }

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  @Output() readonly valueChange = new EventEmitter<string>()

  setTab(tab: string): void {
    this.activeTab.set(tab)
    this.valueChange.emit(tab)
  }

  protected readonly _computedClass = computed(() => {
    return cn('flex flex-col gap-2', this._class())
  })
}

@Directive({
  selector: '[hlmTabsList], hlm-tabs-list',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
    'role': 'tablist',
  },
})
export class HlmTabsListDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn(
      'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-1',
      this._class()
    )
  })
}

@Directive({
  selector: '[hlmTabsTrigger], button[hlmTabsTrigger]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
    'role': 'tab',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.data-state]': "isSelected() ? 'active' : 'inactive'",
    '(click)': 'select()',
  },
})
export class HlmTabsTriggerDirective {
  private readonly tabs = inject(HlmTabsComponent, { optional: true })
  private readonly _class = signal<string>('')
  readonly value = signal<string>('')

  @Input('hlmTabsTrigger')
  set triggerValue(val: string) {
    if (val) this.value.set(val)
  }

  @Input()
  set valueInput(val: string) {
    this.value.set(val)
  }

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  isSelected(): boolean {
    return this.tabs ? this.tabs.activeTab() === this.value() : false
  }

  select(): void {
    if (this.tabs && this.value()) {
      this.tabs.setTab(this.value())
    }
  }

  protected readonly _computedClass = computed(() => {
    const selected = this.isSelected()
    return cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
      selected
        ? 'bg-background text-foreground shadow-xs font-semibold'
        : 'text-muted-foreground hover:text-foreground',
      this._class()
    )
  })
}

@Directive({
  selector: '[hlmTabsContent], hlm-tabs-content',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
    'role': 'tabpanel',
    '[hidden]': '!isVisible()',
  },
})
export class HlmTabsContentDirective {
  private readonly tabs = inject(HlmTabsComponent, { optional: true })
  private readonly _class = signal<string>('')
  readonly value = signal<string>('')

  @Input('hlmTabsContent')
  set contentValue(val: string) {
    if (val) this.value.set(val)
  }

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  isVisible(): boolean {
    return this.tabs ? this.tabs.activeTab() === this.value() : true
  }

  protected readonly _computedClass = computed(() => {
    return cn(
      'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this._class()
    )
  })
}

export const HlmTabsImports = [
  HlmTabsComponent,
  HlmTabsListDirective,
  HlmTabsTriggerDirective,
  HlmTabsContentDirective,
]
