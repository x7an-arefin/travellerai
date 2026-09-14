import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { Coupon } from '../data-access/models/campaigns.model'
import { CreateCouponInput } from '../data-access/models/campaigns-api.types'

@Component({
  selector: 'app-campaigns-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmButtonImports],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4 text-xs">
      <div class="space-y-1.5">
        <label class="font-medium text-foreground">Promo Coupon Code *</label>
        <div class="flex gap-1.5">
          <input
            type="text"
            [(ngModel)]="form.code"
            name="code"
            required
            placeholder="EXPLORE2025"
            class="w-full px-3 py-2 uppercase font-mono font-bold rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            (click)="generateCode()"
            class="px-2.5 py-1.5 text-[10px] rounded-lg border border-border bg-muted/60 hover:bg-muted shrink-0 cursor-pointer font-medium"
          >
            Auto
          </button>
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="font-medium text-foreground">Campaign Description</label>
        <input
          type="text"
          [(ngModel)]="form.description"
          name="description"
          placeholder="e.g. Seasonal 15% discount for Matterhorn alpine trek departures"
          class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Discount Type</label>
          <select
            [(ngModel)]="form.discountType"
            name="discountType"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="percentage">Percentage (% OFF)</option>
            <option value="fixed">Fixed Amount ($ OFF)</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Discount Value *</label>
          <input
            type="number"
            [(ngModel)]="form.discountValue"
            name="discountValue"
            min="1"
            required
            placeholder="15"
            class="w-full px-3 py-2 font-bold rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Min. Booking Value ($)</label>
          <input
            type="number"
            [(ngModel)]="form.minBookingValue"
            name="minBookingValue"
            placeholder="1000"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Max Discount Cap ($)</label>
          <input
            type="number"
            [(ngModel)]="form.maxDiscount"
            name="maxDiscount"
            placeholder="300"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Max Total Redemptions</label>
          <input
            type="number"
            [(ngModel)]="form.maxUses"
            name="maxUses"
            placeholder="e.g. 500 (blank for unlimited)"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Cost Funder</label>
          <select
            [(ngModel)]="form.funder"
            name="funder"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="marketplace">Marketplace Sponsored</option>
            <option value="provider">Tour Operator Sponsored</option>
            <option value="shared">Shared 50/50</option>
          </select>
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="font-medium text-foreground">Expiration Date</label>
        <input
          type="date"
          [(ngModel)]="expiryDateStr"
          name="expiryDateStr"
          class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
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
          [disabled]="!form.code || !form.discountValue"
          class="cursor-pointer"
        >
          {{ isEdit ? 'Save Changes' : 'Create Promo Code' }}
        </button>
      </div>
    </form>
  `,
})
export class CampaignsFormComponent implements OnInit {
  @Input() initialValue: Coupon | null = null
  @Input() isEdit = false
  @Output() save = new EventEmitter<any>()
  @Output() cancel = new EventEmitter<void>()

  form: any = {
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 15,
    currency: 'USD',
    minBookingValue: 1000,
    maxDiscount: 250,
    maxUses: 500,
    funder: 'marketplace',
    status: 'active',
  }

  expiryDateStr = ''

  ngOnInit(): void {
    if (this.initialValue) {
      this.form = { ...this.initialValue }
      if (this.initialValue.expiresAt) {
        this.expiryDateStr = this.initialValue.expiresAt.split('T')[0]
      }
    } else {
      this.generateCode()
    }
  }

  generateCode(): void {
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    this.form.code = `TRIP${random}`
  }

  onSubmit(): void {
    this.save.emit({
      ...this.form,
      code: this.form.code.toUpperCase().trim(),
      expiresAt: this.expiryDateStr ? new Date(this.expiryDateStr).toISOString() : undefined,
    })
  }
}
