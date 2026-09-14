import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TripInquiry } from '../data-access/models/inquiries.model'
import { NewQuotation } from '../data-access/models/inquiries-api.types'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-quotation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmButtonImports],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4 pt-2">
      <!-- Target Inquiry Info Card -->
      @if (inquiry) {
        <div class="p-3 rounded-lg bg-muted/30 border border-border/50 text-xs">
          <p class="font-bold text-foreground">Inquiry for {{ inquiry.destinationName }}</p>
          <p class="text-muted-foreground mt-0.5">Traveler: {{ inquiry.contactName }} ({{ inquiry.travelerCount }} guests)</p>
          <p class="text-primary font-semibold mt-0.5">Client Budget: \${{ inquiry.estimatedBudget | number }} {{ inquiry.budgetCurrency }}</p>
        </div>
      }

      <!-- Proposal Title -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Quotation Proposal Title *</label>
        <input
          type="text"
          name="title"
          [(ngModel)]="formData.title"
          required
          placeholder="e.g. Bespoke Swiss Alps Panorama & Glacier Expedition"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Multi-Modal Line Item Estimator -->
      <div class="p-3.5 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-xs font-bold text-foreground">Multi-Modal Service Estimator</h4>
            <p class="text-[11px] text-muted-foreground">Calculate combined quotation with Hotel PMS stays and Chauffeur FMS transit</p>
          </div>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">Auto-Tally</span>
        </div>

        <div class="grid grid-cols-3 gap-2 text-xs">
          <div class="space-y-1">
            <label class="text-[11px] font-medium text-muted-foreground">Guide / Tour ($)</label>
            <input
              type="number"
              [(ngModel)]="lineItems.guideFee"
              name="guideFee"
              (ngModelChange)="recalculateTotal()"
              class="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-2xs"
            />
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-medium text-muted-foreground">Hotel Nights ($)</label>
            <input
              type="number"
              [(ngModel)]="lineItems.hotelFee"
              name="hotelFee"
              (ngModelChange)="recalculateTotal()"
              class="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-2xs"
            />
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-medium text-muted-foreground">Vehicle Transit ($)</label>
            <input
              type="number"
              [(ngModel)]="lineItems.vehicleFee"
              name="vehicleFee"
              (ngModelChange)="recalculateTotal()"
              class="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-2xs"
            />
          </div>
        </div>
      </div>

      <!-- Price & Currency -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Total Quoted Price *</label>
          <input
            type="number"
            name="totalPrice"
            [(ngModel)]="formData.totalPrice"
            (ngModelChange)="onPriceChange()"
            required
            placeholder="e.g. 12500"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Currency</label>
          <input
            type="text"
            name="currency"
            [(ngModel)]="formData.currency"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs uppercase"
          />
        </div>
      </div>

      <!-- Deposit & Validity -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Initial Deposit Required (30%)</label>
          <input
            type="number"
            name="depositAmount"
            [(ngModel)]="formData.depositAmount"
            placeholder="e.g. 2500"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Quote Valid Until *</label>
          <input
            type="date"
            name="validUntil"
            [(ngModel)]="formData.validUntil"
            required
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>
      </div>

      <!-- Inclusions & Exclusions -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <label class="text-xs font-semibold text-foreground">Inclusions (Comma separated)</label>
          <div class="flex gap-1">
            <button
              type="button"
              (click)="addInclusion('5-Star Hotel Stay')"
              class="text-[10px] px-1.5 py-0.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground cursor-pointer"
            >
              + Hotel
            </button>
            <button
              type="button"
              (click)="addInclusion('VIP Chauffeur Transfer')"
              class="text-[10px] px-1.5 py-0.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground cursor-pointer"
            >
              + Chauffeur
            </button>
            <button
              type="button"
              (click)="addInclusion('All Meals & Permits')"
              class="text-[10px] px-1.5 py-0.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground cursor-pointer"
            >
              + Meals
            </button>
          </div>
        </div>
        <input
          type="text"
          name="inclusions"
          [(ngModel)]="formData.inclusionsStr"
          placeholder="Private transport, 5-star chalet, Guide, Breakfast"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Terms & Cancellation -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Terms & Conditions</label>
        <textarea
          name="terms"
          [(ngModel)]="formData.terms"
          rows="2"
          placeholder="Payment milestones, cancellation refund conditions, and booking guarantee terms..."
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
          Submit Quotation
        </button>
      </div>
    </form>
  `,
})
export class QuotationFormComponent {
  @Input() inquiry: TripInquiry | null = null

  @Output() submitQuote = new EventEmitter<NewQuotation>()
  @Output() cancel = new EventEmitter<void>()

  lineItems = {
    guideFee: 1200,
    hotelFee: 2400,
    vehicleFee: 850,
  }

  formData = {
    title: '',
    totalPrice: 4450,
    currency: 'USD',
    depositAmount: 1335,
    validUntil: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    inclusionsStr: 'Private Chauffeur, 5-Star Accommodations, Certified Guide, All Breakfasts & Special Dinners',
    terms: '30% deposit required upon acceptance. Full balance due 14 days prior to departure.',
  }

  recalculateTotal(): void {
    const total = Number(this.lineItems.guideFee || 0) + Number(this.lineItems.hotelFee || 0) + Number(this.lineItems.vehicleFee || 0)
    this.formData.totalPrice = total
    this.formData.depositAmount = Math.round(total * 0.3)
  }

  onPriceChange(): void {
    this.formData.depositAmount = Math.round(Number(this.formData.totalPrice || 0) * 0.3)
  }

  addInclusion(item: string): void {
    if (!this.formData.inclusionsStr) {
      this.formData.inclusionsStr = item
    } else if (!this.formData.inclusionsStr.includes(item)) {
      this.formData.inclusionsStr += `, ${item}`
    }
  }

  onSubmit(): void {
    if (!this.inquiry || !this.formData.title || !this.formData.totalPrice) return

    const quote: NewQuotation = {
      inquiryId: this.inquiry.id,
      providerId: 'prov-1',
      providerName: 'Alpine Wonders Agency',
      title: this.formData.title,
      totalPrice: Number(this.formData.totalPrice),
      currency: this.formData.currency,
      depositAmount: Number(this.formData.depositAmount),
      validUntil: new Date(this.formData.validUntil).toISOString(),
      terms: this.formData.terms,
      inclusions: this.formData.inclusionsStr.split(',').map(s => s.trim()).filter(Boolean),
      status: 'submitted',
    }
    this.submitQuote.emit(quote)
  }
}
