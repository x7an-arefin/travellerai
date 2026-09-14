import { Component, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NewStaffMember } from '../data-access/models/staff-api.types'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-staff-invite-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmButtonImports],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4 pt-2">
      <!-- Full Name -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Staff Full Name *</label>
        <input
          type="text"
          name="name"
          [(ngModel)]="formData.name"
          required
          placeholder="e.g. Klaus Vogel"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Email Address -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Work Email Address *</label>
        <input
          type="email"
          name="email"
          [(ngModel)]="formData.email"
          required
          placeholder="colleague@agency.com"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Role Selection -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Assigned Agency Role *</label>
        <select
          name="role"
          [(ngModel)]="formData.role"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        >
          <option value="manager">Operations Manager (Packages, Departures, Bookings)</option>
          <option value="finance">Finance User (Earnings, Payouts, Ledger)</option>
          <option value="content">Content Editor (Listings, Media, Itineraries)</option>
          <option value="guide">Guide Staff (Assigned Tours & Check-ins)</option>
        </select>
      </div>

      <!-- Submit & Cancel -->
      <div class="flex items-center justify-end gap-2 pt-4 border-t border-border/50">
        <button
          hlmBtn
          variant="outline"
          type="button"
          (click)="cancel.emit()"
          class="cursor-pointer"
        >
          Cancel
        </button>
        <button
          hlmBtn
          variant="default"
          type="submit"
          class="cursor-pointer shadow-xs"
        >
          Send Staff Invitation
        </button>
      </div>
    </form>
  `,
})
export class StaffInviteFormComponent {
  @Output() save = new EventEmitter<NewStaffMember>()
  @Output() cancel = new EventEmitter<void>()

  formData = {
    name: '',
    email: '',
    role: 'manager' as 'manager' | 'finance' | 'content' | 'guide' | 'custom',
    status: 'invited' as 'active' | 'invited' | 'inactive',
  }

  onSubmit(): void {
    if (!this.formData.name || !this.formData.email) return

    this.save.emit({
      providerId: 'prov-1',
      name: this.formData.name,
      email: this.formData.email,
      role: this.formData.role,
      status: 'invited',
    })
  }
}
