import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Destination } from '../data-access/models/destinations.model'
import { NewDestination } from '../data-access/models/destinations-api.types'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-destinations-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmButtonImports],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4 pt-2">
      <!-- Name -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Destination Name *</label>
        <input
          type="text"
          name="name"
          [(ngModel)]="formData.name"
          (ngModelChange)="onNameChange($event)"
          required
          placeholder="e.g. Swiss Alps & Valais"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Slug & Country -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Slug URL *</label>
          <input
            type="text"
            name="slug"
            [(ngModel)]="formData.slug"
            required
            placeholder="e.g. swiss-alps-valais"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Country *</label>
          <input
            type="text"
            name="country"
            [(ngModel)]="formData.country"
            required
            placeholder="e.g. Switzerland"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>
      </div>

      <!-- Country Code & Region -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Country Code</label>
          <input
            type="text"
            name="countryCode"
            [(ngModel)]="formData.countryCode"
            maxlength="3"
            placeholder="e.g. CH"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs uppercase"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">State / Region</label>
          <input
            type="text"
            name="stateRegion"
            [(ngModel)]="formData.stateRegion"
            placeholder="e.g. Valais & Bernese Oberland"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>
      </div>

      <!-- Cover Image URL -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Cover Image URL</label>
        <input
          type="url"
          name="coverImage"
          [(ngModel)]="formData.coverImage"
          placeholder="https://images.unsplash.com/..."
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Coordinates & Season -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Best Season to Visit</label>
          <input
            type="text"
            name="bestTime"
            [(ngModel)]="formData.bestTimeToVisit"
            placeholder="e.g. June - October"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Status</label>
          <select
            name="status"
            [(ngModel)]="formData.status"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <!-- Featured Toggle -->
      <div class="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          [(ngModel)]="formData.isFeatured"
          class="size-4 rounded border-input text-primary focus:ring-primary"
        />
        <label for="isFeatured" class="text-xs font-medium text-foreground cursor-pointer">
          Highlight as Featured Destination on Homepage & Explorer
        </label>
      </div>

      <!-- Description -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Destination Overview</label>
        <textarea
          name="description"
          [(ngModel)]="formData.description"
          rows="3"
          placeholder="Detailed destination description, geographic highlights, and visitor appeal..."
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs resize-none"
        ></textarea>
      </div>

      <!-- Travel Guide & Tips -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Travel Guide & Practical Notes</label>
        <textarea
          name="travelGuide"
          [(ngModel)]="formData.travelGuide"
          rows="2"
          placeholder="Local customs, transport tips, airport arrival guidance..."
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs resize-none"
        ></textarea>
      </div>

      <!-- Submit & Cancel Buttons -->
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
          {{ isEdit ? 'Save Changes' : 'Register Destination' }}
        </button>
      </div>
    </form>
  `,
})
export class DestinationsFormComponent implements OnInit {
  @Input() destination: Destination | null = null
  @Input() isEdit = false

  @Output() save = new EventEmitter<NewDestination>()
  @Output() cancel = new EventEmitter<void>()

  formData = {
    name: '',
    slug: '',
    country: '',
    countryCode: '',
    stateRegion: '',
    description: '',
    travelGuide: '',
    coverImage: '',
    bestTimeToVisit: '',
    isFeatured: false,
    status: 'active' as 'active' | 'inactive' | 'draft',
  }

  ngOnInit(): void {
    if (this.destination && this.isEdit) {
      this.formData = {
        name: this.destination.name,
        slug: this.destination.slug,
        country: this.destination.country,
        countryCode: this.destination.countryCode || '',
        stateRegion: this.destination.stateRegion || '',
        description: this.destination.description || '',
        travelGuide: this.destination.travelGuide || '',
        coverImage: this.destination.coverImage || '',
        bestTimeToVisit: this.destination.weatherInfo?.bestTimeToVisit || '',
        isFeatured: this.destination.isFeatured,
        status: this.destination.status,
      }
    }
  }

  onNameChange(name: string): void {
    if (!this.isEdit) {
      this.formData.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }
  }

  onSubmit(): void {
    if (!this.formData.name || !this.formData.country) return

    const dto: NewDestination = {
      name: this.formData.name,
      slug: this.formData.slug || this.formData.name.toLowerCase().replace(/\s+/g, '-'),
      country: this.formData.country,
      countryCode: this.formData.countryCode,
      stateRegion: this.formData.stateRegion,
      description: this.formData.description,
      travelGuide: this.formData.travelGuide,
      coverImage: this.formData.coverImage,
      weatherInfo: {
        bestTimeToVisit: this.formData.bestTimeToVisit,
      },
      isFeatured: this.formData.isFeatured,
      status: this.formData.status,
    }
    this.save.emit(dto)
  }
}
