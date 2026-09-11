import { Component, input, output } from '@angular/core';

export type CollectionViewMode = 'table' | 'grid' | 'cards';

@Component({
  selector: 'app-view-switcher',
  standalone: true,
  template: `
    <div class="inline-flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        (click)="modeChange.emit('table')"
        [class]="currentMode() === 'table' ? activeClass : inactiveClass"
        title="Table View"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="sr-only">Table View</span>
      </button>

      <button
        type="button"
        (click)="modeChange.emit('grid')"
        [class]="currentMode() === 'grid' ? activeClass : inactiveClass"
        title="Grid View"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span class="sr-only">Grid View</span>
      </button>
    </div>
  `,
})
export class ViewSwitcherComponent {
  readonly currentMode = input<CollectionViewMode>('table');
  readonly modeChange = output<CollectionViewMode>();

  readonly activeClass = 'flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100';
  readonly inactiveClass = 'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200';
}
