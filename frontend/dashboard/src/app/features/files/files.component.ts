import { Component, signal, computed, inject, OnInit, ViewChild, ElementRef } from '@angular/core'
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
import { FilesApiService, FileItem } from './data-access'

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

    <!-- Hidden file input for real uploads -->
    <input type="file" #fileInput (change)="onFileSelected($event)" class="hidden" />

    <!-- Main Content -->
    <app-main [fixed]="true" class="space-y-6">
      <!-- Heading & Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Files & Media Drive</h1>
          <p class="text-xs text-muted-foreground">Manage tour vouchers, itinerary PDFs, destination photography, and contract archives.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn size="sm" (click)="triggerUpload()" class="gap-1.5 cursor-pointer shadow-xs">
            <ng-icon name="lucideUploadCloud" class="size-4" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      <!-- Quick Folder Shortcuts -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        @for (f of folders; track f.name) {
          <div
            (click)="filterFolder(f.name)"
            class="p-4 rounded-xl border border-border bg-card shadow-2xs hover:border-primary/50 transition-all cursor-pointer space-y-1 group"
            [class.border-primary]="selectedFolder() === f.name"
          >
            <div class="flex items-center justify-between">
              <ng-icon name="lucideFolder" class="size-5 text-primary" />
              <span class="text-xs font-mono text-muted-foreground">{{ f.count }} files</span>
            </div>
            <h4 class="font-bold text-xs text-foreground group-hover:text-primary transition-colors">{{ f.name }}</h4>
          </div>
        }
      </div>

      <!-- Filter and View Mode Switcher -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="relative w-full sm:w-64">
          <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search by file name..."
            class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="flex items-center gap-2">
          @if (selectedFolder()) {
            <button hlmBtn variant="ghost" size="sm" (click)="clearFolderFilter()" class="h-8 text-xs cursor-pointer">
              Clear Filter: "{{ selectedFolder() }}"
            </button>
          }
          <div class="flex items-center border border-border rounded-lg p-0.5 bg-muted/40">
            <button
              (click)="viewMode.set('grid')"
              class="p-1 rounded-md cursor-pointer transition-colors"
              [class.bg-card]="viewMode() === 'grid'"
              [class.shadow-2xs]="viewMode() === 'grid'"
            >
              <ng-icon name="lucideLayoutGrid" class="size-4 text-foreground" />
            </button>
            <button
              (click)="viewMode.set('list')"
              class="p-1 rounded-md cursor-pointer transition-colors"
              [class.bg-card]="viewMode() === 'list'"
              [class.shadow-2xs]="viewMode() === 'list'"
            >
              <ng-icon name="lucideList" class="size-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <!-- Files Display Grid / Table -->
      <div>
        @if (viewMode() === 'grid') {
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            @for (file of filteredFiles(); track file.id) {
              <div
                (click)="previewFile(file)"
                class="p-4 rounded-xl border border-border bg-card shadow-2xs hover:border-primary/40 transition-all cursor-pointer space-y-3 group relative"
              >
                <div class="h-28 w-full rounded-lg bg-muted/40 border border-border flex items-center justify-center text-muted-foreground overflow-hidden">
                  @if (file.extension === 'png' && file.url) {
                    <img [src]="file.url" [alt]="file.name" class="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                  } @else {
                    <ng-icon [name]="getFileIcon(file.extension)" class="size-10 opacity-60 text-primary" />
                  }
                </div>

                <div>
                  <h4 class="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                    {{ file.name }}
                  </h4>
                  <div class="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
                    <span>{{ file.size }}</span>
                    <span>{{ file.updatedAt }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <div hlmCard class="p-0 overflow-hidden shadow-2xs">
            <table hlmTable class="w-full text-xs">
              <thead hlmTableHeader>
                <tr hlmTableRow>
                  <th hlmTableHead class="ps-4">File Name</th>
                  <th hlmTableHead>Folder</th>
                  <th hlmTableHead>Size</th>
                  <th hlmTableHead>Updated</th>
                  <th hlmTableHead>Uploader</th>
                </tr>
              </thead>
              <tbody hlmTableBody>
                @for (file of filteredFiles(); track file.id) {
                  <tr (click)="previewFile(file)" class="hover:bg-muted/40 transition-colors cursor-pointer">
                    <td hlmTableCell class="ps-4 font-semibold text-foreground flex items-center gap-2">
                      <ng-icon [name]="getFileIcon(file.extension)" class="size-4 text-primary" />
                      <span class="truncate max-w-[280px]">{{ file.name }}</span>
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
          <!-- Thumbnail Preview -->
          <div class="h-44 w-full rounded-xl bg-muted/50 border border-border flex flex-col items-center justify-center text-muted-foreground overflow-hidden">
            @if (file.extension === 'png' && file.url) {
              <img [src]="file.url" [alt]="file.name" class="h-full w-full object-cover" />
            } @else {
              <ng-icon [name]="getFileIcon(file.extension)" class="size-10 mb-2 opacity-40 text-primary" />
              <span class="text-[11px] font-medium">{{ file.name }} preview</span>
            }
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
export class FilesComponent implements OnInit {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>
  private readonly filesApi = inject(FilesApiService)

  readonly viewMode = signal<'grid' | 'list'>('grid')
  readonly previewSheetOpen = signal<boolean>(false)
  readonly activeFile = signal<FileItem | null>(null)
  readonly selectedFolder = signal<string | null>(null)
  searchQuery = ''

  readonly folders = [
    { name: 'Documents', count: 18 },
    { name: 'Images', count: 42 },
    { name: 'Contracts', count: 12 },
    { name: 'Vouchers', count: 26 },
  ]

  readonly files = signal<FileItem[]>([])

  readonly filteredFiles = computed(() => {
    let list = this.files()
    const folder = this.selectedFolder()
    const q = this.searchQuery.toLowerCase().trim()

    if (folder) {
      list = list.filter((f) => f.folder.toLowerCase() === folder.toLowerCase())
    }

    if (q) {
      list = list.filter((f) => f.name.toLowerCase().includes(q))
    }

    return list
  })

  ngOnInit(): void {
    this.filesApi.listFiles().subscribe((list) => {
      this.files.set(list)
    })
  }

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
    if (file.url) {
      const a = document.createElement('a')
      a.href = file.url
      a.download = file.name
      a.target = '_blank'
      a.click()
    }
    toast.success(`Downloading ${file.name}...`)
  }

  triggerUpload(): void {
    this.fileInputRef?.nativeElement?.click()
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      const file = input.files[0]
      this.filesApi.uploadFile(file).subscribe((newFile) => {
        this.files.update((list) => [newFile, ...list])
        toast.success(`Uploaded ${file.name} to Media Drive.`)
      })
    }
  }

  filterFolder(folderName: string): void {
    this.selectedFolder.set(folderName)
  }

  clearFolderFilter(): void {
    this.selectedFolder.set(null)
  }
}
