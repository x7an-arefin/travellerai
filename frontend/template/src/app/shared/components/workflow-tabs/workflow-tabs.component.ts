import { Component, computed, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideX,
  lucidePin,
  lucideTrash2,
  lucideLayoutDashboard,
  lucideListTodo,
  lucidePackage,
  lucideTrendingUp,
  lucideBadgeDollarSign,
  lucideWorkflow,
  lucideNetwork,
  lucideUsers,
  lucideSettings,
  lucideCreditCard,
  lucideFolder,
  lucideGripVertical,
} from '@ng-icons/lucide'
import { WorkflowTabsService, WorkflowTab } from '@core/services/workflow-tabs.service'
import { LayoutService } from '@core/services/layout.service'

@Component({
  selector: 'app-workflow-tabs',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({
      lucideX,
      lucidePin,
      lucideTrash2,
      lucideLayoutDashboard,
      lucideListTodo,
      lucidePackage,
      lucideTrendingUp,
      lucideBadgeDollarSign,
      lucideWorkflow,
      lucideNetwork,
      lucideUsers,
      lucideSettings,
      lucideCreditCard,
      lucideFolder,
      lucideGripVertical,
    }),
  ],
  template: `
    @if (layoutService.showWorkflowTabs() && tabsService.tabs().length > 0) {
      <div class="flex items-center justify-between w-full border-b border-border/60 bg-muted/30 px-3 py-1.5 gap-2">
        <!-- Scrollable Tabs List with Drag & Drop Reordering -->
        <div class="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto">
          @for (tab of tabsService.tabs(); track tab.id; let i = $index) {
            <div
              draggable="true"
              (dragstart)="onDragStart(i, $event)"
              (dragover)="onDragOver(i, $event)"
              (dragleave)="onDragLeave(i, $event)"
              (drop)="onDrop(i, $event)"
              (dragend)="onDragEnd()"
              (click)="tabsService.selectTab(tab)"
              class="group relative flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium cursor-grab active:cursor-grabbing transition-all duration-150 border shrink-0 select-none"
              [class.opacity-40]="draggedIndex() === i"
              [class.scale-95]="draggedIndex() === i"
              [class.border-primary]="dragOverIndex() === i && draggedIndex() !== i"
              [class.bg-accent/40]="dragOverIndex() === i && draggedIndex() !== i"
              [class.bg-background]="tabsService.activeUrl() === tab.url"
              [class.text-foreground]="tabsService.activeUrl() === tab.url"
              [class.border-border/80]="tabsService.activeUrl() === tab.url"
              [class.shadow-2xs]="tabsService.activeUrl() === tab.url"
              [class.bg-transparent]="tabsService.activeUrl() !== tab.url"
              [class.border-transparent]="tabsService.activeUrl() !== tab.url && dragOverIndex() !== i"
              [class.text-muted-foreground]="tabsService.activeUrl() !== tab.url"
              [class.hover:bg-muted/50]="tabsService.activeUrl() !== tab.url"
            >
              <!-- Icon: Only render for pinned or active tabs to optimize space -->
              @if (tab.pinned || tabsService.activeUrl() === tab.url) {
                <ng-icon [name]="tab.icon" class="size-3.5 text-muted-foreground shrink-0 transition-all" />
              }

              <span class="truncate max-w-[120px]">{{ tab.title }}</span>

              <!-- Pin & Close Action Controls (Zero space when hidden) -->
              @if (tab.pinned) {
                <button
                  type="button"
                  (click)="tabsService.togglePin(tab.id, $event)"
                  class="size-4.5 rounded hover:bg-muted-foreground/20 flex items-center justify-center cursor-pointer shrink-0 ml-0.5 transition-all"
                  title="Unpin tab"
                >
                  <ng-icon
                    name="lucidePin"
                    class="size-3 transition-transform duration-200 rotate-45 text-primary"
                  />
                </button>
              } @else {
                <div class="hidden group-hover:flex items-center gap-0.5 ml-0.5 transition-all">
                  <button
                    type="button"
                    (click)="tabsService.togglePin(tab.id, $event)"
                    class="size-4.5 rounded hover:bg-muted-foreground/20 flex items-center justify-center cursor-pointer shrink-0 transition-all"
                    title="Pin tab"
                  >
                    <ng-icon
                      name="lucidePin"
                      class="size-3 text-muted-foreground/70 hover:text-foreground"
                    />
                  </button>

                  <button
                    type="button"
                    (click)="tabsService.closeTab(tab.id, $event)"
                    class="size-4.5 rounded hover:bg-muted-foreground/20 flex items-center justify-center cursor-pointer shrink-0 transition-all"
                    title="Close tab"
                  >
                    <ng-icon name="lucideX" class="size-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
              }
            </div>
          }
        </div>

        <!-- Permanently Pinned Close Unpinned Tabs Button -->
        @if (hasUnpinnedTabs()) {
          <div class="flex items-center shrink-0 border-l border-border/50 pl-2">
            <button
              type="button"
              (click)="tabsService.closeUnpinned()"
              class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer shrink-0 border border-border/50 shadow-2xs"
              title="Close all unpinned tabs"
            >
              <ng-icon name="lucideTrash2" class="size-3.5 text-muted-foreground" />
              <span class="hidden sm:inline">Close Unpinned</span>
            </button>
          </div>
        }
      </div>
    }
  `,
})
export class WorkflowTabsComponent {
  readonly tabsService = inject(WorkflowTabsService)
  readonly layoutService = inject(LayoutService)

  readonly draggedIndex = signal<number | null>(null)
  readonly dragOverIndex = signal<number | null>(null)

  readonly hasUnpinnedTabs = computed(() => {
    return this.tabsService.tabs().some((t) => !t.pinned)
  })

  onDragStart(index: number, event: DragEvent): void {
    this.draggedIndex.set(index)
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', index.toString())
    }
  }

  onDragOver(index: number, event: DragEvent): void {
    event.preventDefault()
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
    if (this.draggedIndex() !== index) {
      this.dragOverIndex.set(index)
    }
  }

  onDragLeave(index: number, event: DragEvent): void {
    if (this.dragOverIndex() === index) {
      this.dragOverIndex.set(null)
    }
  }

  onDrop(targetIndex: number, event: DragEvent): void {
    event.preventDefault()
    const fromIndex = this.draggedIndex()
    if (fromIndex !== null && fromIndex !== targetIndex) {
      this.tabsService.reorderTabs(fromIndex, targetIndex)
    }
    this.onDragEnd()
  }

  onDragEnd(): void {
    this.draggedIndex.set(null)
    this.dragOverIndex.set(null)
  }
}
