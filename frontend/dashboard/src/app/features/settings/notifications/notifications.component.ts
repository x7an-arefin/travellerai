import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmSwitchImports } from '../../../ui/switch/hlm-switch.component'
import { HlmSeparatorImports } from '../../../ui/separator/hlm-separator.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-notifications-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...HlmButtonImports,
    ...HlmSwitchImports,
    ...HlmSeparatorImports,
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">Notifications</h3>
        <p class="text-sm text-muted-foreground">Configure how you receive alert updates and system emails.</p>
      </div>

      <div hlmSeparator></div>

      <div class="space-y-6">
        <!-- Communication Emails -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium">Email Notifications</h4>

          <div class="flex items-center justify-between rounded-lg border p-4">
            <div class="space-y-0.5">
              <label class="text-sm font-medium">Communication emails</label>
              <p class="text-xs text-muted-foreground">Receive emails about your account activity.</p>
            </div>
            <hlm-switch [isChecked]="commEmails" (checkedChange)="commEmails = $event" />
          </div>

          <div class="flex items-center justify-between rounded-lg border p-4">
            <div class="space-y-0.5">
              <label class="text-sm font-medium">Marketing emails</label>
              <p class="text-xs text-muted-foreground">Receive emails about new products, features, and more.</p>
            </div>
            <hlm-switch [isChecked]="marketingEmails" (checkedChange)="marketingEmails = $event" />
          </div>

          <div class="flex items-center justify-between rounded-lg border p-4">
            <div class="space-y-0.5">
              <label class="text-sm font-medium">Social notifications</label>
              <p class="text-xs text-muted-foreground">Receive emails for friend requests and follows.</p>
            </div>
            <hlm-switch [isChecked]="socialEmails" (checkedChange)="socialEmails = $event" />
          </div>

          <div class="flex items-center justify-between rounded-lg border p-4">
            <div class="space-y-0.5">
              <label class="text-sm font-medium">Security alerts</label>
              <p class="text-xs text-muted-foreground">Receive emails about your account security.</p>
            </div>
            <hlm-switch [isChecked]="securityEmails" (checkedChange)="securityEmails = $event" />
          </div>
        </div>

        <button hlmBtn (click)="saveNotifications()" class="cursor-pointer">
          Update notifications
        </button>
      </div>
    </div>
  `,
})
export class NotificationsComponent {
  commEmails = true
  marketingEmails = false
  socialEmails = true
  securityEmails = true

  saveNotifications(): void {
    toast.success('Notification preferences updated!')
  }
}
