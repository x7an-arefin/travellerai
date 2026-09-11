import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isUploading()" class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
        <span>Uploading {{ fileName() }}</span>
        <span>{{ progress() }}%</span>
      </div>
      <div class="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          class="h-full bg-indigo-600 transition-all duration-300 dark:bg-indigo-500"
          [style.width.%]="progress()"
        ></div>
      </div>
    </div>
  `,
})
export class UploadProgressComponent {
  readonly isUploading = input<boolean>(false);
  readonly fileName = input<string>('file');
  readonly progress = input<number>(0);
}
