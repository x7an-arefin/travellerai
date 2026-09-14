import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { Departure } from '../data-access/models/departures.model'
import { CreateDepartureInput } from '../data-access/models/departures-api.types'

@Component({
  selector: 'app-departures-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmButtonImports],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4 text-xs">
      <div class="space-y-1.5">
        <label class="font-medium text-foreground">Package Experience *</label>
        <select
          [(ngModel)]="form.packageId"
          name="packageId"
          required
          (change)="onPackageSelect()"
          class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="pkg-1">Swiss Alps Expedition: Matterhorn & Zermatt Trek</option>
          <option value="pkg-2">Kyoto Zen Temples & Arashiyama Bamboo Trail</option>
          <option value="pkg-3">Amalfi Coast Luxury Cliffside & Capri Yacht Cruise</option>
          <option value="pkg-4">Bali Sacred Volcano Trek & Ubud Cultural Retreat</option>
        </select>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Departure Code *</label>
          <input
            type="text"
            [(ngModel)]="form.departureCode"
            name="departureCode"
            required
            placeholder="SWISS-2025-08A"
            class="w-full px-3 py-2 uppercase font-mono rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Status</label>
          <select
            [(ngModel)]="form.status"
            name="status"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="available">Available</option>
            <option value="limited">Limited Seats</option>
            <option value="sold_out">Sold Out</option>
            <option value="closed">Closed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Departure Start Date *</label>
          <input
            type="date"
            [(ngModel)]="startDateStr"
            name="startDateStr"
            required
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Return / End Date *</label>
          <input
            type="date"
            [(ngModel)]="endDateStr"
            name="endDateStr"
            required
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Max Capacity *</label>
          <input
            type="number"
            [(ngModel)]="form.capacity"
            name="capacity"
            min="1"
            max="100"
            required
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Min Quorum</label>
          <input
            type="number"
            [(ngModel)]="form.minParticipants"
            name="minParticipants"
            min="1"
            max="50"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Price Override ($)</label>
          <input
            type="number"
            [(ngModel)]="form.priceOverride"
            name="priceOverride"
            placeholder="Catalog base"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Assigned Guide Leader</label>
          <select
            [(ngModel)]="form.assignedGuideName"
            name="assignedGuideName"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Marco Rossi">Marco Rossi (Certified Alpine Guide)</option>
            <option value="Takashi Mori">Takashi Mori (Cultural Expert)</option>
            <option value="Matteo Ferrari">Matteo Ferrari (Maritime Captain)</option>
            <option value="Wayan Suta">Wayan Suta (Jungle Trekker)</option>
            <option value="">Unassigned</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Booking Cutoff (Hours)</label>
          <input
            type="number"
            [(ngModel)]="form.bookingCutoffHours"
            name="bookingCutoffHours"
            placeholder="24"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="font-medium text-foreground">Meeting Point & Rendezvous Location</label>
        <input
          type="text"
          [(ngModel)]="form.meetingPoint"
          name="meetingPoint"
          placeholder="e.g. Zermatt Main Station North Gate"
          class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div class="space-y-1.5">
        <label class="font-medium text-foreground">Internal Tour Leader Notes</label>
        <textarea
          [(ngModel)]="form.internalNotes"
          name="internalNotes"
          rows="2"
          placeholder="Gear checks, special dietary logistics, or trail warnings..."
          class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        ></textarea>
      </div>

      <div class="flex items-center justify-end gap-2 pt-4 border-t border-border/40">
        <button
          type="button"
          hlmBtn
          variant="outline"
          size="sm"
          (click)="cancel.emit()"
          class="cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          hlmBtn
          variant="default"
          size="sm"
          class="cursor-pointer"
        >
          {{ isEdit ? 'Save Departure Changes' : 'Schedule Departure' }}
        </button>
      </div>
    </form>
  `,
})
export class DeparturesFormComponent implements OnInit {
  @Input() initialValue: Departure | null = null
  @Input() isEdit = false
  @Output() save = new EventEmitter<any>()
  @Output() cancel = new EventEmitter<void>()

  form: any = {
    packageId: 'pkg-1',
    packageTitle: 'Swiss Alps Expedition: Matterhorn & Zermatt Trek',
    destination: 'Zermatt, Switzerland',
    departureCode: '',
    capacity: 12,
    minParticipants: 4,
    priceOverride: undefined,
    assignedGuideName: 'Marco Rossi',
    bookingCutoffHours: 48,
    meetingPoint: '',
    internalNotes: '',
    status: 'available',
  }

  startDateStr = ''
  endDateStr = ''

  ngOnInit(): void {
    if (this.initialValue) {
      this.form = { ...this.initialValue }
      this.startDateStr = this.initialValue.startDate?.split('T')[0] || ''
      this.endDateStr = this.initialValue.endDate?.split('T')[0] || ''
    } else {
      const now = new Date()
      now.setDate(now.getDate() + 30)
      this.startDateStr = now.toISOString().split('T')[0]
      const ret = new Date(now)
      ret.setDate(ret.getDate() + 6)
      this.endDateStr = ret.toISOString().split('T')[0]
      this.form.departureCode = `DEP-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    }
  }

  onPackageSelect(): void {
    const pkgMap: Record<string, { title: string; dest: string }> = {
      'pkg-1': { title: 'Swiss Alps Expedition: Matterhorn & Zermatt Trek', dest: 'Zermatt, Switzerland' },
      'pkg-2': { title: 'Kyoto Zen Temples & Arashiyama Bamboo Trail', dest: 'Kyoto, Japan' },
      'pkg-3': { title: 'Amalfi Coast Luxury Cliffside & Capri Yacht Cruise', dest: 'Amalfi Coast, Italy' },
      'pkg-4': { title: 'Bali Sacred Volcano Trek & Ubud Cultural Retreat', dest: 'Bali, Indonesia' },
    }
    const match = pkgMap[this.form.packageId]
    if (match) {
      this.form.packageTitle = match.title
      this.form.destination = match.dest
    }
  }

  onSubmit(): void {
    this.save.emit({
      ...this.form,
      startDate: new Date(this.startDateStr).toISOString(),
      endDate: new Date(this.endDateStr).toISOString(),
    })
  }
}
