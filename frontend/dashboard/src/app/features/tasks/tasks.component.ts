import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucidePlus, lucideUpload } from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { TasksTableComponent } from './components/tasks-table.component'
import { TasksMutateDrawerComponent } from './components/tasks-mutate-drawer.component'
import { TasksViewSheetComponent } from './components/tasks-view-sheet.component'
import { TasksMultiDeleteDialogComponent } from './components/tasks-multi-delete-dialog.component'
import { TasksImportDialogComponent } from './components/tasks-import-dialog.component'
import { TasksService } from './services/tasks.service'
import { setupTasksUrlSync } from '../../core/utils/use-table-url-state'

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    SearchComponent,
    ThemeSwitchComponent,
    ConfigDrawerComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmButtonImports,
    TasksTableComponent,
    TasksMutateDrawerComponent,
    TasksViewSheetComponent,
    TasksMultiDeleteDialogComponent,
    TasksImportDialogComponent,
  ],
  providers: [
    provideIcons({
      lucidePlus,
      lucideUpload,
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

    <!-- Main Content Area -->
    <app-main [fixed]="true" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Tasks</h1>
          <p class="text-xs text-muted-foreground">
            Manage your issues, task priorities, and project workflows.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="tasksService.importOpen.set(true)"
            class="gap-1.5 cursor-pointer"
          >
            <ng-icon name="lucideUpload" class="size-3.5" />
            <span>Import</span>
          </button>

          <button
            hlmBtn
            size="sm"
            (click)="tasksService.openCreate()"
            class="gap-1.5 cursor-pointer"
          >
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      <!-- Tasks Table with URL sync -->
      <app-tasks-table />
    </app-main>

    <!-- Drawers & Dialogs -->
    <app-tasks-view-sheet />
    <app-tasks-mutate-drawer />
    <app-tasks-multi-delete-dialog />
    <app-tasks-import-dialog />
  `,
})
export class TasksComponent implements OnInit {
  readonly tasksService = inject(TasksService)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  ngOnInit(): void {
    setupTasksUrlSync(this.tasksService, this.router, this.route)
  }
}
