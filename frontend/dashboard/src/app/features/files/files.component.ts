import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideFolder,
  lucideFileText,
  lucideImage,
  lucideFileCode,
  lucideFileArchive,
  lucideLayoutGrid,
  lucideList,
  lucideUploadCloud,
  lucideSearch,
  lucideMoreVertical,
  lucideDownload,
  lucideTrash2,
  lucideCopy,
  lucideExternalLink,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmSheetImports } from '../../ui/sheet/hlm-sheet.components'
import { HlmTableImports } from '../../ui/table/hlm-table.components'
import { toast } from 'ngx-sonner'

export interface FileItem {
  id: string
  name: string
  extension: 'pdf' | 'png' | 'zip' | 'mp4' | 'ts'
  size: string
  folder: string
  updatedAt: string
  uploader: string
}

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    SearchComponent,
    ThemeSwitchComponent,
    ConfigDrawerComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmSheetImports,
    ...HlmTableImports,
  ],
  providers: [
    provideIcons({
      lucideFolder,
      lucideFileText,
      lucideImage,
      lucideFileCode,
      lucideFileArchive,
      lucideLayoutGrid,
      lucideList,
      lucideUploadCloud,
      lucideSearch,
      lucideMoreVertical,
      lucideDownload,
      lucideTrash2,
      lucideCopy,
      lucideExternalLink,
    }),
  ],
  template: `
    <!-- Top Header -->
    <app-header [fixed]="true">
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-config-drawer />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main Content -->
    <app-main [fixed]="true" class="space-y-6">
      <!-- Heading & Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Files & Media Drive</h1>
          <p class="text-xs text-muted-foreground">
            Explore workspace files, manage cloud assets, and preview documents.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <!-- View Switcher -->
          <div class="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border/40">
            <button
              type="button"
              (click)="viewMode.set('grid')"
              class="p-1.5 rounded-md cursor-pointer transition-colors"
              [class.bg-background]="viewMode() === 'grid'"
              [class.text-foreground]="viewMode() === 'grid'"
              [class.shadow-2xs]="viewMode() === 'grid'"
              [class.text-muted-foreground]="viewMode() !== 'grid'"
              aria-label="Grid view"
            >
              <ng-icon name="lucideLayoutGrid" class="size-4" />
            </button>
            <button
              type="button"
              (click)="viewMode.set('list')"
              class="p-1.5 rounded-md cursor-pointer transition-colors"
              [class.bg-background]="viewMode() === 'list'"
              [class.text-foreground]="viewMode() === 'list'"
              [class.shadow-2xs]="viewMode() === 'list'"
              [class.text-muted-foreground]="viewMode() !== 'list'"
              aria-label="List view"
            >
              <ng-icon name="lucideList" class="size-4" />
            </button>
          </div>

          <button hlmBtn size="sm" (click)="uploadFile()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideUploadCloud" class="size-4" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      <!-- Storage Breakdown Bar -->
      <div hlmCard class="p-4 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-foreground">Storage Allocation</span>
          <span class="text-xs font-mono font-bold text-muted-foreground">18.4 GB of 50 GB Used</span>
        </div>

        <div class="h-2.5 w-full bg-muted rounded-full overflow-hidden flex">
          <div class="bg-primary h-full" style="width: 42%;" title="Documents (42%)"></div>
          <div class="bg-sky-500 h-full" style="width: 28%;" title="Images (28%)"></div>
          <div class="bg-amber-500 h-full" style="width: 18%;" title="Media (18%)"></div>
          <div class="bg-emerald-500 h-full" style="width: 12%;" title="Archives (12%)"></div>
        </div>

        <div class="flex flex-wrap items-center gap-4 text-xs pt-1">
          <div class="flex items-center gap-1.5 font-medium"><span class="size-2 rounded-full bg-primary"></span>Documents (42%)</div>
          <div class="flex items-center gap-1.5 font-medium text-muted-foreground"><span class="size-2 rounded-full bg-sky-500"></span>Images (28%)</div>
          <div class="flex items-center gap-1.5 font-medium text-muted-foreground"><span class="size-2 rounded-full bg-amber-500"></span>Media (18%)</div>
          <div class="flex items-center gap-1.5 font-medium text-muted-foreground"><span class="size-2 rounded-full bg-emerald-500"></span>Archives (12%)</div>
        </div>
      </div>

      <!-- Folders Grid -->
      <div class="space-y-3">
        <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Folders</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          @for (folder of folders; track folder.name) {
            <div
              (click)="filterFolder(folder.name)"
              class="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer group shadow-2xs"
            >
              <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                <ng-icon name="lucideFolder" class="size-5" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-xs font-semibold text-foreground truncate">{{ folder.name }}</p>
                <p class="text-[10px] text-muted-foreground">{{ folder.count }} files</p>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Recent Files Section -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent Files</h3>
          <span class="text-xs text-muted-foreground">{{ files().length }} items</span>
        </div>

        @if (viewMode() === 'grid') {
          <!-- Grid View -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            @for (file of files(); track file.id) {
              <div
                hlmCard
                (click)="previewFile(file)"
                class="p-4 justify-between hover:border-primary/50 transition-all cursor-pointer group shadow-2xs"
              >
                <div class="flex items-start justify-between">
                  <div class="flex size-10 items-center justify-center rounded-lg bg-muted/60 text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <ng-icon [name]="getFileIcon(file.extension)" class="size-5" />
                  </div>
                  <span hlmBadge variant="outline" class="text-[9px] uppercase font-bold">
                    {{ file.extension }}
                  </span>
                </div>

                <div class="space-y-1 mt-3">
                  <p class="text-xs font-semibold text-foreground truncate">{{ file.name }}</p>
                  <p class="text-[10px] text-muted-foreground">{{ file.size }} • {{ file.updatedAt }}</p>
                </div>
              </div>
            }
          </div>
        } @else {
          <!-- List View Table -->
          <div class="rounded-lg border border-border bg-card overflow-x-auto shadow-2xs">
            <table hlmTable class="min-w-[600px]">
              <thead hlmTableHeader>
                <tr hlmTableRow>
                  <th hlmTableHead class="ps-4">Name</th>
                  <th hlmTableHead>Folder</th>
                  <th hlmTableHead>Size</th>
                  <th hlmTableHead>Modified</th>
                  <th hlmTableHead>Owner</th>
                </tr>
              </thead>
              <tbody hlmTableBody>
                @for (file of files(); track file.id) {
                  <tr hlmTableRow (click)="previewFile(file)" class="cursor-pointer hover:bg-muted/40">
                    <td hlmTableCell class="ps-4 font-medium text-xs text-foreground">
                      <div class="flex items-center gap-2">
                        <ng-icon [name]="getFileIcon(file.extension)" class="size-4 text-muted-foreground" />
                        <span>{{ file.name }}</span>
                      </div>
                    </td>
                    <td hlmTableCell class="text-xs text-muted-foreground">{{ file.folder }}</td>
                    <td hlmTableCell class="text-xs font-mono text-muted-foreground">{{ file.size }}</td>
                    <td hlmTableCell class="text-xs text-muted-foreground">{{ file.updatedAt }}</td>
                    <td hlmTableCell class="text-xs text-muted-foreground">{{ file.uploader }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </app-main>

    <!-- File Preview Side Sheet -->
    <hlm-sheet [isOpen]="previewSheetOpen()" position="right" [size]="'sm'" (closed)="previewSheetOpen.set(false)">
      @if (activeFile(); as file) {
        <div hlmSheetHeader>
          <div class="flex items-center gap-3">
            <div class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ng-icon [name]="getFileIcon(file.extension)" class="size-5" />
            </div>
            <div>
              <h3 hlmSheetTitle class="text-sm font-semibold truncate max-w-[280px]">{{ file.name }}</h3>
              <p hlmSheetDescription class="text-xs">{{ file.size }} • {{ file.folder }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-4 py-4 flex-1 text-xs">
          <!-- Placeholder Thumbnail Preview -->
          <div class="h-44 w-full rounded-xl bg-muted/50 border border-border flex flex-col items-center justify-center text-muted-foreground">
            <ng-icon [name]="getFileIcon(file.extension)" class="size-10 mb-2 opacity-40" />
            <span class="text-[11px] font-medium">{{ file.name }} preview</span>
          </div>

          <div class="space-y-2 border-t border-border pt-3">
            <div class="flex justify-between py-1 border-b border-border/40">
              <span class="text-muted-foreground">File Type:</span>
              <span class="font-semibold uppercase">{{ file.extension }} Document</span>
            </div>
            <div class="flex justify-between py-1 border-b border-border/40">
              <span class="text-muted-foreground">File Size:</span>
              <span class="font-mono font-medium">{{ file.size }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-border/40">
              <span class="text-muted-foreground">Uploaded By:</span>
              <span class="font-medium">{{ file.uploader }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-border/40">
              <span class="text-muted-foreground">Last Modified:</span>
              <span class="font-medium">{{ file.updatedAt }}</span>
            </div>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex flex-col gap-2">
          <button hlmBtn (click)="downloadFile(file)" class="w-full gap-1.5 cursor-pointer text-xs">
            <ng-icon name="lucideDownload" class="size-3.5" />
            <span>Download Asset</span>
          </button>
        </div>
      }
    </hlm-sheet>
  `,
})
export class FilesComponent {
  readonly viewMode = signal<'grid' | 'list'>('grid')
  readonly previewSheetOpen = signal<boolean>(false)
  readonly activeFile = signal<FileItem | null>(null)

  readonly folders = [
    { name: 'Design Assets', count: 24 },
    { name: 'Invoices & Taxes', count: 18 },
    { name: 'Marketing Brand', count: 32 },
    { name: 'Source Code', count: 12 },
  ]

  readonly files = signal<FileItem[]>([
    { id: 'f1', name: 'Brand_Guidelines_2026.pdf', extension: 'pdf', size: '3.4 MB', folder: 'Design Assets', updatedAt: '2 hours ago', uploader: 'Sat Naing' },
    { id: 'f2', name: 'Dashboard_Mockup_v2.png', extension: 'png', size: '1.8 MB', folder: 'Design Assets', updatedAt: 'Yesterday', uploader: 'Sarah Miller' },
    { id: 'f3', name: 'Spartan_UI_Components.zip', extension: 'zip', size: '14.2 MB', folder: 'Source Code', updatedAt: '3 days ago', uploader: 'Sat Naing' },
    { id: 'f4', name: 'Keynote_Presentation.mp4', extension: 'mp4', size: '48.0 MB', folder: 'Marketing Brand', updatedAt: 'Aug 02, 2026', uploader: 'Olivia Martin' },
    { id: 'f5', name: 'Invoice_August_Receipt.pdf', extension: 'pdf', size: '240 KB', folder: 'Invoices & Taxes', updatedAt: 'Aug 01, 2026', uploader: 'System' },
    { id: 'f6', name: 'ThemeService_Types.ts', extension: 'ts', size: '18 KB', folder: 'Source Code', updatedAt: 'Jul 28, 2026', uploader: 'Sat Naing' },
  ])

  getFileIcon(ext: string): string {
    switch (ext) {
      case 'pdf': return 'lucideFileText'
      case 'png': return 'lucideImage'
      case 'zip': return 'lucideFileArchive'
      case 'ts': return 'lucideFileCode'
      default: return 'lucideFileText'
    }
  }

  previewFile(file: FileItem): void {
    this.activeFile.set(file)
    this.previewSheetOpen.set(true)
  }

  downloadFile(file: FileItem): void {
    toast.success(`Downloading ${file.name}...`)
  }

  uploadFile(): void {
    toast.info('File upload dropzone opened.')
  }

  filterFolder(folderName: string): void {
    toast.info(`Filtering files in "${folderName}"`)
  }
}
