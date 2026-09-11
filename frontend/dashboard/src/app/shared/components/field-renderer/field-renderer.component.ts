import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';

export interface FieldConfig {
  id: string;
  kind: 'string' | 'number' | 'boolean' | 'date' | 'select' | 'multi-select' | 'relation' | 'repeater' | 'json' | 'textarea' | 'rich-text' | 'file';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ label: string; value: unknown }>;
  visibleIf?: { field: string; equals: unknown };
  fields?: FieldConfig[];
}

@Component({
  selector: 'app-field-renderer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div *ngIf="isVisible()" [formGroup]="formGroup()" class="space-y-1">
      <label [for]="config().id" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
        {{ config().label }}
        <span *ngIf="config().required" class="text-rose-500">*</span>
      </label>

      <!-- String Field -->
      <ng-container *ngIf="config().kind === 'string'">
        <input
          [id]="config().id"
          type="text"
          [formControlName]="config().id"
          [placeholder]="config().placeholder ?? ''"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </ng-container>

      <!-- Number Field -->
      <ng-container *ngIf="config().kind === 'number'">
        <input
          [id]="config().id"
          type="number"
          [formControlName]="config().id"
          [placeholder]="config().placeholder ?? ''"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </ng-container>

      <!-- Boolean / Checkbox Field -->
      <ng-container *ngIf="config().kind === 'boolean'">
        <div class="flex items-center gap-2 pt-1">
          <input
            [id]="config().id"
            type="checkbox"
            [formControlName]="config().id"
            class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
          />
          <span class="text-xs text-slate-600 dark:text-slate-400">Enable {{ config().label }}</span>
        </div>
      </ng-container>

      <!-- Date Field -->
      <ng-container *ngIf="config().kind === 'date'">
        <input
          [id]="config().id"
          type="date"
          [formControlName]="config().id"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </ng-container>

      <!-- Select Field -->
      <ng-container *ngIf="config().kind === 'select' || config().kind === 'relation'">
        <select
          [id]="config().id"
          [formControlName]="config().id"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value="">Select {{ config().label }}...</option>
          <option *ngFor="let opt of config().options ?? []" [value]="opt.value">{{ opt.label }}</option>
        </select>
      </ng-container>

      <!-- Multi-Select Field -->
      <ng-container *ngIf="config().kind === 'multi-select'">
        <select
          [id]="config().id"
          multiple
          [formControlName]="config().id"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          <option *ngFor="let opt of config().options ?? []" [value]="opt.value">{{ opt.label }}</option>
        </select>
      </ng-container>

      <!-- Textarea / JSON / Rich-Text Field -->
      <ng-container *ngIf="config().kind === 'textarea' || config().kind === 'json' || config().kind === 'rich-text'">
        <textarea
          [id]="config().id"
          rows="4"
          [formControlName]="config().id"
          [placeholder]="config().placeholder ?? ''"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        ></textarea>
      </ng-container>

      <!-- File Upload Field -->
      <ng-container *ngIf="config().kind === 'file'">
        <input
          [id]="config().id"
          type="file"
          [formControlName]="config().id"
          class="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-950 dark:file:text-indigo-300"
        />
      </ng-container>

      <!-- Server Error / Validation Error Display -->
      <div *ngIf="controlErrors()" class="text-xs font-medium text-rose-500 pt-0.5">
        {{ controlErrors() }}
      </div>
    </div>
  `,
})
export class FieldRendererComponent {
  readonly config = input.required<FieldConfig>();
  readonly formGroup = input.required<UntypedFormGroup>();

  isVisible(): boolean {
    const condition = this.config().visibleIf;
    if (!condition) return true;
    const parentValue = this.formGroup().get(condition.field)?.value;
    return parentValue === condition.equals;
  }

  controlErrors(): string | null {
    const control = this.formGroup().get(this.config().id);
    if (!control || !control.touched || !control.errors) return null;
    if (control.errors['required']) return `${this.config().label} is required`;
    if (control.errors['serverError']) return String(control.errors['serverError']);
    return 'Invalid value';
  }
}
