import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DateRange {
  start: string | null;
  end: string | null;
}

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2 text-xs">
      <div class="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 dark:border-slate-700 dark:bg-slate-800">
        <span class="text-slate-400 font-medium">From:</span>
        <input
          type="date"
          [value]="startDate()"
          (change)="onStartChange($event)"
          class="bg-transparent text-slate-900 focus:outline-none dark:text-slate-100"
        />
        <span class="text-slate-400 font-medium">To:</span>
        <input
          type="date"
          [value]="endDate()"
          (change)="onEndChange($event)"
          class="bg-transparent text-slate-900 focus:outline-none dark:text-slate-100"
        />
      </div>

      <button
        *ngIf="startDate() || endDate()"
        type="button"
        (click)="clearRange()"
        class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        title="Clear date filter"
      >
        ✕
      </button>
    </div>
  `,
})
export class DateRangePickerComponent {
  readonly startDate = signal<string>('');
  readonly endDate = signal<string>('');
  readonly rangeChange = output<DateRange>();

  onStartChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.startDate.set(val);
    this.emitChange();
  }

  onEndChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.endDate.set(val);
    this.emitChange();
  }

  clearRange(): void {
    this.startDate.set('');
    this.endDate.set('');
    this.emitChange();
  }

  private emitChange(): void {
    this.rangeChange.emit({
      start: this.startDate() || null,
      end: this.endDate() || null,
    });
  }
}
