import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SavedViewPreset {
  id: string;
  name: string;
  query: Record<string, unknown>;
}

@Component({
  selector: 'app-saved-views',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block text-left">
      <div class="flex items-center gap-2">
        <select
          (change)="onSelect($event)"
          class="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="">Saved Views ({{ views().length }})</option>
          <option *ngFor="let view of views()" [value]="view.id">{{ view.name }}</option>
        </select>

        <button
          type="button"
          (click)="promptSaveView()"
          class="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Save current filter view"
        >
          ★ Save View
        </button>
      </div>
    </div>
  `,
})
export class SavedViewsComponent {
  readonly views = signal<SavedViewPreset[]>([]);
  readonly currentQuery = input<Record<string, unknown>>({});
  readonly applyView = output<SavedViewPreset>();

  onSelect(event: Event): void {
    const id = (event.target as HTMLSelectElement).value;
    const found = this.views().find((v) => v.id === id);
    if (found) this.applyView.emit(found);
  }

  promptSaveView(): void {
    const name = window.prompt('Enter name for this saved view:');
    if (!name) return;
    const item: SavedViewPreset = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      query: this.currentQuery(),
    };
    this.views.update((list) => [...list, item]);
  }
}
