import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
      <div class="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4">
        <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>

      <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">{{ title() }}</h3>
      <p class="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm">{{ description() }}</p>

      <button
        *ngIf="actionLabel()"
        type="button"
        (click)="action.emit()"
        class="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
      >
        {{ actionLabel() }}
      </button>
    </div>
  `,
})
export class EmptyStateComponent {
  readonly title = input<string>('No records found');
  readonly description = input<string>('There are currently no items matching your criteria. Try adjusting your filters or adding a new record.');
  readonly actionLabel = input<string>('');
  readonly action = output<void>();
}
