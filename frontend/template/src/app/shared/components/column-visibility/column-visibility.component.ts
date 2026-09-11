import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ColumnOption {
  key: string;
  label: string;
  visible: boolean;
}

@Component({
  selector: 'app-column-visibility',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block text-left">
      <button
        type="button"
        (click)="isOpen.set(!isOpen())"
        class="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <svg class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        <span>Columns</span>
      </button>

      <div
        *ngIf="isOpen()"
        class="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900 z-30"
      >
        <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1">Toggle Columns</div>
        @for (col of columns(); track col.key) {
          <label class="flex items-center gap-2 rounded-md px-2 py-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              [checked]="col.visible"
              (change)="toggleColumn(col.key)"
              class="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
            />
            <span>{{ col.label }}</span>
          </label>
        }
      </div>
    </div>
  `,
})
export class ColumnVisibilityComponent {
  readonly columns = input<ColumnOption[]>([]);
  readonly isOpen = signal<boolean>(false);
  readonly visibilityChange = output<ColumnOption[]>();

  toggleColumn(key: string): void {
    const updated = this.columns().map((col) =>
      col.key === key ? { ...col, visible: !col.visible } : col
    );
    this.visibilityChange.emit(updated);
  }
}
