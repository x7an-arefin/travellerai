import { Component, ElementRef, EventEmitter, HostListener, Input, Output, computed, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucidePlusCircle, lucideCheck, lucideX } from '@ng-icons/lucide'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmSeparatorImports } from '../../../ui/separator/hlm-separator.directive'
import { cn } from '../../../core/utils/cn'
import { OverlayService } from '../../../core/services/overlay.service'

export interface FacetOption {
  label: string
  value: string
  icon?: string
  count?: number
}

@Component({
  selector: 'app-data-table-faceted-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmSeparatorImports,
  ],
  providers: [provideIcons({ lucidePlusCircle, lucideCheck, lucideX })],
  template: `
    <div class="relative inline-block text-left" #container>
      <!-- Trigger Button -->
      <button
        type="button"
        hlmBtn
        variant="outline"
        size="sm"
        (click)="toggleOpen()"
        class="h-8 border-dashed gap-1.5 cursor-pointer text-xs bg-background bg-white dark:bg-zinc-950"
      >
        <ng-icon name="lucidePlusCircle" class="size-3.5 text-muted-foreground" />
        <span>{{ title }}</span>

        @if (selected.length > 0) {
          <div hlmSeparator orientation="vertical" class="mx-1 h-3.5"></div>
          <span hlmBadge variant="secondary" class="px-1.5 py-0 text-[10px] font-semibold">
            {{ selected.length }}
          </span>
        }
      </button>

      <!-- Dropdown Popover with Auto Top/Bottom Positioning and Solid Opaque Background -->
      @if (isOpen()) {
        <div [class]="_computedPanelClass()">
          <!-- Search input -->
          <div class="p-1 border-b border-border/60">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              [placeholder]="title"
              class="h-7 w-full rounded-sm bg-transparent px-2 text-xs outline-none placeholder:text-muted-foreground text-foreground"
            />
          </div>

          <!-- Options list -->
          <div class="max-h-48 overflow-y-auto py-1 no-scrollbar space-y-0.5">
            @for (option of filteredOptions(); track option.value) {
              <button
                type="button"
                (click)="toggleOption(option.value)"
                class="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs hover:bg-accent hover:text-accent-foreground cursor-pointer text-left transition-colors font-medium text-foreground"
              >
                <div
                  class="flex size-3.5 items-center justify-center rounded-[3px] border border-primary transition-colors"
                  [class.bg-primary]="isSelected(option.value)"
                  [class.text-primary-foreground]="isSelected(option.value)"
                >
                  @if (isSelected(option.value)) {
                    <ng-icon name="lucideCheck" class="size-2.5 stroke-[3]" />
                  }
                </div>

                @if (option.icon) {
                  <ng-icon [name]="option.icon" class="size-3.5 text-muted-foreground" />
                }

                <span class="flex-1 capitalize font-medium">{{ option.label }}</span>

                @if (option.count !== undefined) {
                  <span class="font-mono text-[10px] text-muted-foreground">{{ option.count }}</span>
                }
              </button>
            }
          </div>

          @if (selected.length > 0) {
            <div hlmSeparator class="my-1"></div>
            <button
              type="button"
              (click)="clearFilters()"
              class="w-full py-1 text-center text-xs text-muted-foreground hover:text-foreground cursor-pointer font-medium"
            >
              Clear filters
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class DataTableFacetedFilterComponent {
  private readonly elementRef = inject(ElementRef)
  private readonly overlayService = inject(OverlayService)

  @Input() title = 'Filter'
  @Input() options: FacetOption[] = []
  @Input() selected: string[] = []
  @Input() side: 'top' | 'bottom' | 'auto' = 'auto'

  @Output() readonly selectedChange = new EventEmitter<string[]>()

  readonly isOpen = signal<boolean>(false)
  readonly resolvedSide = signal<'top' | 'bottom'>('bottom')
  searchQuery = ''

  readonly filteredOptions = computed(() => {
    const q = this.searchQuery.toLowerCase().trim()
    if (!q) return this.options
    return this.options.filter((opt) => opt.label.toLowerCase().includes(q))
  })

  protected readonly _computedPanelClass = computed(() => {
    const isTop = this.resolvedSide() === 'top'
    return cn(
      'absolute left-0 z-[120] w-52 rounded-xl border border-border bg-popover bg-white dark:bg-zinc-900 p-1 text-popover-foreground shadow-2xl outline-none animate-in fade-in-0 zoom-in-95 duration-150',
      isTop ? 'bottom-full mb-1.5 origin-bottom' : 'top-full mt-1.5 origin-top'
    )
  })

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.close()
    }
  }

  toggleOpen(): void {
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

  isSelected(val: string): boolean {
    return this.selected.includes(val)
  }

  toggleOption(val: string): void {
    const current = [...this.selected]
    const index = current.indexOf(val)
    if (index > -1) {
      current.splice(index, 1)
    } else {
      current.push(val)
    }
    this.selectedChange.emit(current)
  }

  clearFilters(): void {
    this.selectedChange.emit([])
    this.isOpen.set(false)
  }
}
