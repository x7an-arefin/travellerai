import { Component, Directive, Input, computed, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '@core/utils/cn'

@Directive({
  selector: 'table[hlmTable], [hlmTable]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmTableDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('w-full caption-bottom text-sm', this._class())
  })
}

@Directive({
  selector: 'thead[hlmTableHeader], [hlmTableHeader]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmTableHeaderDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('[&_tr]:border-b bg-muted/40', this._class())
  })
}

@Directive({
  selector: 'tbody[hlmTableBody], [hlmTableBody]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmTableBodyDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn('[&_tr:last-child]:border-0', this._class())
  })
}

@Directive({
  selector: 'tr[hlmTableRow], [hlmTableRow]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmTableRowDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      this._class()
    )
  })
}

@Directive({
  selector: 'th[hlmTableHead], [hlmTableHead]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmTableHeadDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn(
      'h-10 px-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      this._class()
    )
  })
}

@Directive({
  selector: 'td[hlmTableCell], [hlmTableCell]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmTableCellDirective {
  private readonly _class = signal<string>('')

  @Input()
  set class(value: string) {
    this._class.set(value)
  }

  protected readonly _computedClass = computed(() => {
    return cn(
      'p-3 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      this._class()
    )
  })
}

export const HlmTableImports = [
  HlmTableDirective,
  HlmTableHeaderDirective,
  HlmTableBodyDirective,
  HlmTableRowDirective,
  HlmTableHeadDirective,
  HlmTableCellDirective,
]
