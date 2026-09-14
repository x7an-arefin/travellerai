import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Package } from '../data-access/models/packages.model'
import { NewPackage } from '../data-access/models/packages-api.types'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-packages-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmButtonImports],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4 pt-2">
      <!-- Title -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Package Title *</label>
        <input
          type="text"
          name="title"
          [(ngModel)]="formData.title"
          required
          placeholder="e.g. Swiss Alps Grand Panorama Express"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Destination & Product Type -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Destination *</label>
          <input
            type="text"
            name="destinationId"
            [(ngModel)]="formData.destinationId"
            required
            placeholder="e.g. Switzerland"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Product Type *</label>
          <select
            name="productType"
            [(ngModel)]="formData.productType"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          >
            <option value="multi_day_package">Multi-Day Package</option>
            <option value="fixed_tour">Fixed Tour</option>
            <option value="flexible_tour">Flexible Tour</option>
            <option value="day_trip">Day Trip</option>
            <option value="activity">Activity</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>
      </div>

      <!-- Price & Currency -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Base Price *</label>
          <input
            type="number"
            name="basePrice"
            [(ngModel)]="formData.basePrice"
            required
            min="0"
            placeholder="1450"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Currency</label>
          <input
            type="text"
            name="currency"
            [(ngModel)]="formData.currency"
            placeholder="USD"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>
      </div>

      <!-- Duration & Participants -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Duration (Days) *</label>
          <input
            type="number"
            name="durationDays"
            [(ngModel)]="formData.durationDays"
            required
            min="1"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Max Capacity *</label>
          <input
            type="number"
            name="maxParticipants"
            [(ngModel)]="formData.maxParticipants"
            required
            min="1"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>
      </div>

      <!-- Difficulty & Confirmation Type -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Difficulty Level</label>
          <select
            name="difficultyLevel"
            [(ngModel)]="formData.difficultyLevel"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="challenging">Challenging</option>
            <option value="strenuous">Strenuous</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Status</label>
          <select
            name="status"
            [(ngModel)]="formData.status"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          >
            <option value="published">Published</option>
            <option value="under_review">Under Review</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <!-- Multi-Modal Aggregator Bundling (Accommodations & Fleet Transfers) -->
      <div class="rounded-lg border border-primary/20 bg-primary/5 p-3.5 space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-xs font-bold text-foreground">Multi-Modal Logistics Bundling</h4>
            <p class="text-[11px] text-muted-foreground">Attach contracted hotels and vehicle transfers directly into this tour package</p>
          </div>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30 uppercase tracking-wider">Aggregator Linked</span>
        </div>

        <div class="grid grid-cols-2 gap-3 pt-1">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Hotel Partner Property</label>
            <select
              name="hotelPropertyName"
              [(ngModel)]="formData.hotelPropertyName"
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
            >
              <option value="">None / Self-Arranged</option>
              <option value="Grand Sylhet 5-Star Resort & Spa">Grand Sylhet 5-Star Resort & Spa</option>
              <option value="Shajek Valley Cloud Eco-Lodge">Shajek Valley Cloud Eco-Lodge</option>
              <option value="Sea Pearl Beach Resort & Spa">Sea Pearl Beach Resort & Spa</option>
              <option value="Alpine Grand Chalet & Wellness">Alpine Grand Chalet & Wellness</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Board / Meal Plan</label>
            <select
              name="boardBasis"
              [(ngModel)]="formData.boardBasis"
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
            >
              <option value="bed_breakfast">Bed & Breakfast (Included)</option>
              <option value="half_board">Half Board (Breakfast & Dinner)</option>
              <option value="all_inclusive">All-Inclusive Resort Dining</option>
              <option value="room_only">Room Only</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Ground Transport Class</label>
            <select
              name="vehicleCategory"
              [(ngModel)]="formData.vehicleCategory"
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
            >
              <option value="">None / Self-Travel</option>
              <option value="VIP Chauffeur Luxury Sedan">VIP Chauffeur Luxury Sedan</option>
              <option value="4x4 Expedition SUV">4x4 Expedition SUV</option>
              <option value="14-Seater Tourist HiAce Microbus">14-Seater Tourist HiAce Microbus</option>
              <option value="Eco Electric & CNG Green Transit">Eco Electric & CNG Green Transit</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Transfer Scope</label>
            <select
              name="vehicleTransferType"
              [(ngModel)]="formData.vehicleTransferType"
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
            >
              <option value="Airport Meet & Greet + Sightseeing">Airport Meet & Greet + Sightseeing</option>
              <option value="Airport Return Transfer Only">Airport Return Transfer Only</option>
              <option value="Dedicated Full-Time Chauffeur">Dedicated Full-Time Chauffeur</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Image URL -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Featured Image URL</label>
        <input
          type="url"
          name="featuredImage"
          [(ngModel)]="formData.featuredImage"
          placeholder="https://images.unsplash.com/..."
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Short Description -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Short Summary</label>
        <textarea
          name="shortDescription"
          [(ngModel)]="formData.shortDescription"
          rows="3"
          placeholder="Provide an enticing summary for travelers..."
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        ></textarea>
      </div>

      <!-- Actions -->
      <div class="pt-4 flex items-center justify-end gap-2 border-t border-border/40">
        <button
          type="button"
          hlmBtn
          variant="outline"
          (click)="cancel.emit()"
          [disabled]="isLoading"
        >
          Cancel
        </button>

        <button
          type="submit"
          hlmBtn
          variant="default"
          [disabled]="isLoading || !formData.title || !formData.destinationId"
        >
          {{ isLoading ? 'Saving...' : 'Save Package' }}
        </button>
      </div>
    </form>
  `,
})
export class PackagesFormComponent implements OnInit {
  @Input() initialValue: Package | null = null
  @Input() isLoading: boolean = false

  @Output() formSubmit = new EventEmitter<NewPackage>()
  @Output() cancel = new EventEmitter<void>()

  formData: NewPackage = {
    title: '',
    destinationId: '',
    productType: 'multi_day_package',
    basePrice: 500,
    currency: 'USD',
    durationDays: 3,
    maxParticipants: 12,
    difficultyLevel: 'moderate',
    status: 'published',
    shortDescription: '',
    featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
    hotelPropertyName: 'Grand Sylhet 5-Star Resort & Spa',
    boardBasis: 'bed_breakfast',
    vehicleCategory: '14-Seater Tourist HiAce Microbus',
    vehicleTransferType: 'Airport Meet & Greet + Sightseeing',
  }

  ngOnInit(): void {
    if (this.initialValue) {
      this.formData = {
        title: this.initialValue.title,
        destinationId: this.initialValue.destinationId,
        productType: this.initialValue.productType,
        basePrice: this.initialValue.basePrice,
        currency: this.initialValue.currency,
        durationDays: this.initialValue.durationDays,
        maxParticipants: this.initialValue.maxParticipants,
        difficultyLevel: this.initialValue.difficultyLevel || 'moderate',
        status: this.initialValue.status,
        shortDescription: this.initialValue.shortDescription || '',
        featuredImage: this.initialValue.featuredImage || '',
        hotelPropertyId: this.initialValue.hotelPropertyId,
        hotelPropertyName: this.initialValue.hotelPropertyName || 'Grand Sylhet 5-Star Resort & Spa',
        roomTypeName: this.initialValue.roomTypeName,
        boardBasis: this.initialValue.boardBasis || 'bed_breakfast',
        vehicleCategory: this.initialValue.vehicleCategory || '14-Seater Tourist HiAce Microbus',
        vehicleTransferType: this.initialValue.vehicleTransferType || 'Airport Meet & Greet + Sightseeing',
      }
    }
  }

  onSubmit(): void {
    if (!this.formData.title || !this.formData.destinationId) return
    this.formSubmit.emit(this.formData)
  }
}
