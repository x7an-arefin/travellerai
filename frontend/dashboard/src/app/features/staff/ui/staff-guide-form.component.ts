import { Component, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NewGuideProfile } from '../data-access/models/staff-api.types'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-staff-guide-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmButtonImports],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4 pt-2">
      <!-- Full Name -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Guide Full Name *</label>
        <input
          type="text"
          name="name"
          [(ngModel)]="formData.name"
          required
          placeholder="e.g. Marco Rossi"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Email & Phone -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Email</label>
          <input
            type="email"
            name="email"
            [(ngModel)]="formData.email"
            placeholder="guide@adventures.com"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Emergency Contact Phone</label>
          <input
            type="tel"
            name="phone"
            [(ngModel)]="formData.phone"
            placeholder="+41 79 123 4567"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>
      </div>

      <!-- Photo URL -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Photo URL</label>
        <input
          type="url"
          name="photoUrl"
          [(ngModel)]="formData.photoUrl"
          placeholder="https://images.unsplash.com/..."
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Languages (Comma-separated) -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Spoken Languages (Comma separated)</label>
        <input
          type="text"
          name="languages"
          [(ngModel)]="formData.languagesStr"
          placeholder="English, German, French, Italian"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Certifications (Comma-separated) -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Certifications & Licenses</label>
        <input
          type="text"
          name="certifications"
          [(ngModel)]="formData.certificationsStr"
          placeholder="IFMGA Mountain Guide, Wilderness First Responder"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Specialties -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Specialties (Comma separated)</label>
        <input
          type="text"
          name="specialties"
          [(ngModel)]="formData.specialtiesStr"
          placeholder="Glacier Trekking, High Altitude Climbing, Botanical Naturalist"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Bio -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Biography & Guiding Experience</label>
        <textarea
          name="bio"
          [(ngModel)]="formData.bio"
          rows="3"
          placeholder="Background, safety record, passion for local fauna/culture..."
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs resize-none"
        ></textarea>
      </div>

      <!-- Buttons -->
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
          Register Guide
        </button>
      </div>
    </form>
  `,
})
export class StaffGuideFormComponent {
  @Output() save = new EventEmitter<NewGuideProfile>()
  @Output() cancel = new EventEmitter<void>()

  formData = {
    name: '',
    email: '',
    phone: '',
    photoUrl: '',
    languagesStr: 'English, German',
    certificationsStr: 'Certified Tour Guide, First Aid Certified',
    specialtiesStr: 'Cultural Tours, Walking Expeditions',
    bio: '',
  }

  onSubmit(): void {
    if (!this.formData.name) return

    const dto: NewGuideProfile = {
      providerId: 'prov-1',
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
      photoUrl: this.formData.photoUrl,
      bio: this.formData.bio,
      languages: this.formData.languagesStr.split(',').map(s => s.trim()).filter(Boolean),
      certifications: this.formData.certificationsStr.split(',').map(s => s.trim()).filter(Boolean),
      specialties: this.formData.specialtiesStr.split(',').map(s => s.trim()).filter(Boolean),
      isAvailable: true,
      status: 'active',
    }
    this.save.emit(dto)
  }
}
