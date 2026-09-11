import { Component, HostListener, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HlmDialogImports } from '@ui/dialog/hlm-dialog.components'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'

@Component({
  selector: 'app-keyboard-shortcuts-dialog',
  standalone: true,
  imports: [CommonModule, ...HlmDialogImports, ...HlmButtonImports],
  template: `
    <hlm-dialog [isOpen]="isOpen()" (closed)="isOpen.set(false)" class="max-w-md">
      <div hlmDialogHeader>
        <h3 hlmDialogTitle>Keyboard Shortcuts</h3>
        <p hlmDialogDescription>Speed up your dashboard workflow with these shortcuts.</p>
      </div>

      <div class="space-y-4 py-3 text-xs">
        <!-- Section 1: Navigation -->
        <div>
          <h4 class="font-semibold text-muted-foreground uppercase tracking-wider mb-2">Navigation</h4>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span>Open command menu</span>
              <kbd class="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">⌘K</kbd>
            </div>
            <div class="flex items-center justify-between">
              <span>Focus search input</span>
              <kbd class="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">/</kbd>
            </div>
            <div class="flex items-center justify-between">
              <span>Go to Settings</span>
              <kbd class="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">⌘S</kbd>
            </div>
            <div class="flex items-center justify-between">
              <span>Go to Billing</span>
              <kbd class="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">⌘B</kbd>
            </div>
          </div>
        </div>

        <div class="h-px bg-border"></div>

        <!-- Section 2: Actions & Modals -->
        <div>
          <h4 class="font-semibold text-muted-foreground uppercase tracking-wider mb-2">Actions</h4>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span>Toggle sidebar collapse</span>
              <kbd class="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">⌘B</kbd>
            </div>
            <div class="flex items-center justify-between">
              <span>Dismiss dialog / drawer</span>
              <kbd class="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">Esc</kbd>
            </div>
            <div class="flex items-center justify-between">
              <span>Log out</span>
              <kbd class="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">⇧⌘Q</kbd>
            </div>
            <div class="flex items-center justify-between">
              <span>Toggle help cheat sheet</span>
              <kbd class="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">?</kbd>
            </div>
          </div>
        </div>
      </div>

      <div hlmDialogFooter>
        <button hlmBtn (click)="isOpen.set(false)" class="w-full cursor-pointer text-xs">
          Got it
        </button>
      </div>
    </hlm-dialog>
  `,
})
export class KeyboardShortcutsDialogComponent {
  readonly isOpen = signal<boolean>(false)

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === '?' && !this.isInputElement(event.target)) {
      event.preventDefault()
      this.isOpen.set(!this.isOpen())
    }
  }

  private isInputElement(target: any): boolean {
    return (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target?.isContentEditable
    )
  }
}
