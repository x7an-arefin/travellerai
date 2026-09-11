import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isOpen()"
      class="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm transition-opacity"
      (click)="close.emit()"
    >
      <div
        class="fixed inset-y-0 right-0 flex max-w-full pl-10"
        (click)="$event.stopPropagation()"
      >
        <div class="w-screen max-w-md bg-white shadow-xl dark:bg-slate-900 dark:text-slate-100 flex flex-col">
          <!-- Drawer Header -->
          <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <div>
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ title() }}</h2>
              <p *ngIf="subtitle()" class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ subtitle() }}</p>
            </div>
            <button
              type="button"
              (click)="close.emit()"
              class="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Drawer Content Body -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <ng-content />
          </div>

          <!-- Drawer Footer -->
          <div *ngIf="showFooter()" class="border-t border-slate-200 px-6 py-4 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              (click)="close.emit()"
              class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DetailDrawerComponent {
  readonly isOpen = input<boolean>(false);
  readonly title = input<string>('Details');
  readonly subtitle = input<string>('');
  readonly showFooter = input<boolean>(true);
  readonly close = output<void>();
}
