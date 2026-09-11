import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideUploadCloud, lucideFileSpreadsheet, lucideX, lucideCheck } from '@ng-icons/lucide'
import { TasksService } from '../services/tasks.service'
import { HlmSheetImports } from '@ui/sheet/hlm-sheet.components'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-tasks-import-dialog',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmSheetImports, ...HlmButtonImports],
  providers: [provideIcons({ lucideUploadCloud, lucideFileSpreadsheet, lucideX, lucideCheck })],
  template: `
    <!-- Opening in HlmSheet side drawer with size="sm" (1/3 screen width) -->
    <hlm-sheet
      [isOpen]="tasksService.importOpen()"
      position="right"
      [size]="'sm'"
      (closed)="close()"
      class="w-full"
    >
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Import Tasks</h3>
        <p hlmSheetDescription>
          Upload a CSV or JSON file to bulk-import issues into your workspace.
        </p>
      </div>

      <div class="py-4 space-y-4 flex-1">
        @if (!selectedFile()) {
          <!-- Dropzone Container -->
          <div
            (click)="simulateFileUpload()"
            class="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary hover:bg-muted/30 transition-all cursor-pointer group"
          >
            <div class="flex size-12 items-center justify-center rounded-full bg-muted group-hover:scale-110 transition-transform mb-3 shadow-2xs">
              <ng-icon name="lucideUploadCloud" class="size-6 text-primary" />
            </div>
            <p class="text-sm font-semibold text-foreground">Click to upload or drag & drop</p>
            <p class="text-xs text-muted-foreground mt-1">Supports CSV, JSON formatted files (Max: 5MB)</p>
          </div>
        } @else {
          <!-- File Summary Card with Progress -->
          <div class="flex items-center justify-between border border-border rounded-xl p-3.5 bg-muted/40 animate-in fade-in-0">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <ng-icon name="lucideFileSpreadsheet" class="size-5" />
              </div>
              <div class="flex-1 min-w-0 space-y-1">
                <p class="text-xs font-semibold text-foreground truncate">{{ selectedFile()?.name }}</p>
                <div class="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{{ selectedFile()?.size }}</span>
                  <span class="font-medium text-emerald-600">100% Ready</span>
                </div>
                <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-500 rounded-full w-full"></div>
                </div>
              </div>
            </div>

            <button
              hlmBtn
              variant="ghost"
              size="icon"
              (click)="selectedFile.set(null)"
              class="size-7 rounded-full text-muted-foreground hover:text-foreground ml-2 cursor-pointer"
            >
              <ng-icon name="lucideX" class="size-3.5" />
            </button>
          </div>
        }

        <div class="rounded-lg border border-border bg-muted/20 p-3 text-xs text-muted-foreground space-y-1.5 leading-relaxed">
          <p class="font-semibold text-foreground">CSV Columns Expected:</p>
          <p class="font-mono text-[11px]">title, status, label, priority</p>
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto">
        <button
          type="button"
          hlmBtn
          variant="outline"
          (click)="close()"
          class="cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          hlmBtn
          [disabled]="!selectedFile()"
          (click)="handleImport()"
          class="cursor-pointer"
        >
          Import Tasks
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class TasksImportDialogComponent {
  readonly tasksService = inject(TasksService)
  readonly selectedFile = signal<{ name: string; size: string } | null>(null)

  simulateFileUpload(): void {
    this.selectedFile.set({
      name: 'tasks_august_sprint_2026.csv',
      size: '184 KB • 12 Tasks',
    })
    toast.info('File parsed successfully.')
  }

  handleImport(): void {
    this.tasksService.importOpen.set(false)
    this.selectedFile.set(null)
    toast.success('12 tasks imported into your workspace!')
  }

  close(): void {
    this.tasksService.importOpen.set(false)
    this.selectedFile.set(null)
  }
}
