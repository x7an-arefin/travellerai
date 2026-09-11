import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FolderNode {
  id: string;
  name: string;
  count?: number;
  children?: FolderNode[];
}

@Component({
  selector: 'app-media-folder-tree',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-1 text-sm text-slate-700 dark:text-slate-300">
      @for (folder of folders(); track folder.id) {
        <div>
          <button
            type="button"
            (click)="selectFolder.emit(folder.id)"
            class="flex items-center justify-between w-full rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            [ngClass]="{ 'bg-indigo-50 font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400': selectedFolderId() === folder.id }"
          >
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span>{{ folder.name }}</span>
            </div>
            @if (folder.count !== undefined) {
              <span class="text-xs opacity-60 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">{{ folder.count }}</span>
            }
          </button>
        </div>
      }
    </div>
  `,
})
export class MediaFolderTreeComponent {
  readonly folders = input<FolderNode[]>([]);
  readonly selectedFolderId = input<string | null>(null);
  readonly selectFolder = output<string>();
}
