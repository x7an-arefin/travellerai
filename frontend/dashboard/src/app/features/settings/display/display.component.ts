import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmCheckboxImports } from '../../../ui/checkbox/hlm-checkbox.component'
import { HlmSeparatorImports } from '../../../ui/separator/hlm-separator.directive'
import { SettingsApiService } from '../data-access/services/settings-api.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-display-settings',
  standalone: true,
  imports: [
    CommonModule,
    ...HlmButtonImports,
    ...HlmCheckboxImports,
    ...HlmSeparatorImports,
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">Display</h3>
        <p class="text-sm text-muted-foreground">Turn items on or off to control what's displayed in the sidebar navigation.</p>
      </div>

      <div hlmSeparator></div>

      <div class="space-y-4">
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <hlm-checkbox [isChecked]="showTasks" (checkedChange)="showTasks = $event" />
            <span class="text-sm font-medium">Tasks</span>
          </div>

          <div class="flex items-center gap-3">
            <hlm-checkbox [isChecked]="showApps" (checkedChange)="showApps = $event" />
            <span class="text-sm font-medium">Apps</span>
          </div>

          <div class="flex items-center gap-3">
            <hlm-checkbox [isChecked]="showChats" (checkedChange)="showChats = $event" />
            <span class="text-sm font-medium">Chats</span>
          </div>

          <div class="flex items-center gap-3">
            <hlm-checkbox [isChecked]="showUsers" (checkedChange)="showUsers = $event" />
            <span class="text-sm font-medium">Users</span>
          </div>
        </div>

        <button hlmBtn (click)="saveDisplay()" class="cursor-pointer">
          Update display
        </button>
      </div>
    </div>
  `,
})
export class DisplayComponent implements OnInit {
  private readonly settingsApi = inject(SettingsApiService)

  showTasks = true
  showApps = true
  showChats = true
  showUsers = true

  ngOnInit(): void {
    const display = this.settingsApi.getDisplay()
    this.showTasks = display.showTasks
    this.showApps = display.showApps
    this.showChats = display.showChats
    this.showUsers = display.showUsers
  }

  async saveDisplay(): Promise<void> {
    await this.settingsApi.updateDisplay({
      showTasks: this.showTasks,
      showApps: this.showApps,
      showChats: this.showChats,
      showUsers: this.showUsers,
    })
    toast.success('Display preferences updated!')
  }
}

