import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-form-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen()" class="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm">
      <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div class="w-screen max-w-lg bg-white shadow-xl dark:bg-slate-900 dark:text-slate-100 flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {{ mode() === 'create' ? 'Create' : 'Edit' }} {{ resourceTitle() }}
            </h2>
            <button (click)="close.emit()" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">✕</button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <ng-content />
          </div>

          <!-- Footer Actions -->
          <div class="border-t border-slate-200 px-6 py-4 dark:border-slate-800 flex items-center justify-between">
            <div>
              <button
                *ngIf="mode() === 'edit'"
                type="button"
                (click)="duplicate.emit()"
                class="text-xs font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Duplicate Record
              </button>
            </div>
            <div class="flex gap-3">
              <button (click)="close.emit()" class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
              <button (click)="save.emit()" class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ResourceFormDialogComponent {
  readonly isOpen = input<boolean>(false);
  readonly mode = input<'create' | 'edit'>('create');
  readonly resourceTitle = input<string>('Record');
  readonly close = output<void>();
  readonly save = output<void>();
  readonly duplicate = output<void>();
}
