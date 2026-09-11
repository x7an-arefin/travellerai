import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-import-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen()" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:text-slate-100">
        <div class="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Import {{ resourceName() }} Data</h3>
          <button (click)="close.emit()" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">✕</button>
        </div>

        <div class="py-6 space-y-4">
          <div class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors">
            <input type="file" accept=".csv,.json" (change)="onFileSelected($event)" class="hidden" #fileInput />
            <svg class="mx-auto h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">Drop your CSV or JSON file here, or <button (click)="fileInput.click()" class="font-semibold text-indigo-600 dark:text-indigo-400">browse</button></p>
            <p class="text-xs text-slate-400 mt-1">Supports CSV, JSON (max 10MB)</p>
          </div>

          <div *ngIf="parsedRows().length > 0" class="rounded-lg bg-slate-50 p-4 dark:bg-slate-800 text-xs">
            <div class="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Ready to import {{ parsedRows().length }} records</div>
            <pre class="overflow-x-auto text-slate-600 dark:text-slate-300 max-h-32">{{ previewJson() }}</pre>
          </div>
        </div>

        <div class="flex justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <button (click)="close.emit()" class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
          <button [disabled]="parsedRows().length === 0" (click)="importData.emit(parsedRows()); close.emit()" class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">Confirm Import</button>
        </div>
      </div>
    </div>
  `,
})
export class ImportModalComponent {
  readonly isOpen = input<boolean>(false);
  readonly resourceName = input<string>('Resource');
  readonly close = output<void>();
  readonly importData = output<unknown[]>();

  readonly parsedRows = signal<unknown[]>([]);
  readonly previewJson = signal<string>('');

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (file.name.endsWith('.json')) {
        try {
          const parsed = JSON.parse(text);
          const array = Array.isArray(parsed) ? parsed : [parsed];
          this.parsedRows.set(array);
          this.previewJson.set(JSON.stringify(array.slice(0, 2), null, 2));
        } catch {
          this.parsedRows.set([]);
        }
      } else {
        const lines = text.split('\n').filter(Boolean);
        const headers = lines[0]?.split(',').map((h) => h.trim().replace(/^"|"$/g, '')) ?? [];
        const rows = lines.slice(1).map((line) => {
          const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
          return Object.fromEntries(headers.map((h, idx) => [h, values[idx] ?? '']));
        });
        this.parsedRows.set(rows);
        this.previewJson.set(JSON.stringify(rows.slice(0, 2), null, 2));
      }
    };
    reader.readAsText(file);
  }
}
