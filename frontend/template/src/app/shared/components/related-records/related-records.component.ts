import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RelatedRecord {
  id: string;
  title: string;
  subtitle?: string;
  status?: string;
}

@Component({
  selector: 'app-related-records',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-3">
      <div class="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>{{ title() }} ({{ records().length }})</span>
      </div>

      <div class="space-y-2">
        @for (record of records(); track record.id) {
          <div class="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
              <h4 class="text-xs font-semibold text-slate-900 dark:text-slate-100">{{ record.title }}</h4>
              <p *ngIf="record.subtitle" class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{{ record.subtitle }}</p>
            </div>
            <span *ngIf="record.status" class="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {{ record.status }}
            </span>
          </div>
        }
      </div>
    </div>
  `,
})
export class RelatedRecordsComponent {
  readonly title = input<string>('Related Records');
  readonly records = input<RelatedRecord[]>([]);
}
