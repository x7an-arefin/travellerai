import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="pointer-events-auto flex items-start justify-between p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0"
          [ngClass]="{
            'bg-emerald-50/90 border-emerald-200 text-emerald-900 dark:bg-emerald-950/90 dark:border-emerald-800 dark:text-emerald-100': toast.type === 'success',
            'bg-rose-50/90 border-rose-200 text-rose-900 dark:bg-rose-950/90 dark:border-rose-800 dark:text-rose-100': toast.type === 'error',
            'bg-amber-50/90 border-amber-200 text-amber-900 dark:bg-amber-950/90 dark:border-amber-800 dark:text-amber-100': toast.type === 'warning',
            'bg-sky-50/90 border-sky-200 text-sky-900 dark:bg-sky-950/90 dark:border-sky-800 dark:text-sky-100': toast.type === 'info'
          }"
        >
          <div class="flex items-start gap-3">
            <span class="mt-0.5 font-bold">
              @if (toast.type === 'success') { ✓ }
              @else if (toast.type === 'error') { ✕ }
              @else if (toast.type === 'warning') { ⚠ }
              @else { ℹ }
            </span>
            <div>
              <h4 class="text-sm font-semibold">{{ toast.title }}</h4>
              @if (toast.message) {
                <p class="text-xs opacity-90 mt-0.5">{{ toast.message }}</p>
              }
            </div>
          </div>
          <button
            type="button"
            (click)="toastService.dismiss(toast.id)"
            class="text-xs opacity-60 hover:opacity-100 p-1"
          >
            ✕
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
}
