import { Component, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { CreateAffiliateInput } from '../data-access/models/affiliates-api.types'

@Component({
  selector: 'app-affiliates-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmButtonImports],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4 text-xs">
      <div class="space-y-1.5">
        <label class="font-medium text-foreground">Partner / Creator Name *</label>
        <input
          type="text"
          [(ngModel)]="form.partnerName"
          name="partnerName"
          required
          placeholder="e.g. Elena Rostova / Alpine Travel Blog"
          class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div class="space-y-1.5">
        <label class="font-medium text-foreground">Partner Contact Email *</label>
        <input
          type="email"
          [(ngModel)]="form.partnerEmail"
          name="partnerEmail"
          required
          placeholder="creators@alpinewonders.com"
          class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Referral Code *</label>
          <div class="flex gap-1.5">
            <input
              type="text"
              [(ngModel)]="form.referralCode"
              name="referralCode"
              required
              placeholder="ALPS2025"
              class="w-full px-3 py-2 uppercase font-mono rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              (click)="generateRandomCode()"
              class="px-2.5 py-1.5 text-[10px] rounded-lg border border-border bg-muted/60 hover:bg-muted shrink-0 cursor-pointer font-medium"
            >
              Auto
            </button>
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Commission Rate (%) *</label>
          <input
            type="number"
            [(ngModel)]="form.commissionRate"
            name="commissionRate"
            min="1"
            max="50"
            step="0.5"
            required
            placeholder="8.5"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Settlement Currency</label>
          <select
            [(ngModel)]="form.currency"
            name="currency"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="CHF">CHF (Fr.)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="font-medium text-foreground">Initial Status</label>
          <select
            [(ngModel)]="form.status"
            name="status"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="active">Active</option>
            <option value="pending">Pending Review</option>
          </select>
        </div>
      </div>

      <div class="p-3 rounded-lg bg-muted/50 border border-border/40 text-[11px] text-muted-foreground space-y-1">
        <span class="font-semibold text-foreground">Tracking Attribution URL Preview:</span>
        <p class="font-mono text-[10px] break-all text-primary">
          https://traveller.ai/?ref={{ form.referralCode || 'YOUR_CODE' }}
        </p>
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
          [disabled]="!form.partnerName || !form.partnerEmail || !form.referralCode"
          class="cursor-pointer"
        >
          Register Partner
        </button>
      </div>
    </form>
  `,
})
export class AffiliatesFormComponent {
  @Output() save = new EventEmitter<CreateAffiliateInput>()
  @Output() cancel = new EventEmitter<void>()

  form: CreateAffiliateInput = {
    userId: `usr-${Date.now().toString().slice(-6)}`,
    partnerName: '',
    partnerEmail: '',
    referralCode: '',
    commissionRate: 8.5,
    currency: 'USD',
    status: 'active',
  }

  generateRandomCode(): void {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    this.form.referralCode = `TRIP${random}`
  }

  onSubmit(): void {
    if (!this.form.partnerName || !this.form.partnerEmail || !this.form.referralCode) return
    this.save.emit({
      ...this.form,
      referralCode: this.form.referralCode.toUpperCase().trim(),
    })
  }
}
