import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DetailSection {
  id: string;
  title: string;
  fields: Array<{ label: string; value: unknown }>;
}

export interface ActivityEvent {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
}

@Component({
  selector: 'app-sectioned-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 text-sm text-slate-800 dark:text-slate-200">
      <!-- Detail Sections -->
      @for (section of sections(); track section.id) {
        <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            {{ section.title }}
          </h3>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            @for (field of section.fields; track field.label) {
              <div>
                <dt class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ field.label }}</dt>
                <dd class="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{{ field.value ?? '—' }}</dd>
              </div>
            }
          </dl>
        </div>
      }

      <!-- Activity Timeline -->
      <div *ngIf="activities().length > 0" class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          Activity Timeline & Audit History
        </h3>
        <div class="space-y-4">
          @for (act of activities(); track act.id) {
            <div class="flex items-start gap-3 text-xs">
              <div class="mt-1 h-2 w-2 rounded-full bg-indigo-500"></div>
              <div>
                <span class="font-semibold text-slate-900 dark:text-slate-100">{{ act.actor }}</span>
                <span class="text-slate-600 dark:text-slate-400"> {{ act.action }}</span>
                <div class="text-slate-400 mt-0.5">{{ act.timestamp }}</div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class SectionedDetailComponent {
  readonly sections = input<DetailSection[]>([]);
  readonly activities = input<ActivityEvent[]>([]);
}
