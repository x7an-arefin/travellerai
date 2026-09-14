import { Component, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NewPayoutAccount } from '../data-access/models/wallets-api.types'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-payout-account-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmButtonImports],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4 pt-2">
      <!-- Method Type -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Disbursement Method *</label>
        <select
          name="accountType"
          [(ngModel)]="formData.accountType"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        >
          <option value="bank_account">Direct Bank Wire / SEPA / ACH</option>
          <option value="stripe_connect">Stripe Connect Express</option>
          <option value="wise">Wise Business Payout</option>
        </select>
      </div>

      <!-- Account Holder Name -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Account Holder Legal Name *</label>
        <input
          type="text"
          name="holderName"
          [(ngModel)]="formData.accountHolderName"
          required
          placeholder="e.g. Alpine Wonders Agency AG"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Institution Name -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Bank / Financial Institution *</label>
        <input
          type="text"
          name="instName"
          [(ngModel)]="formData.institutionName"
          required
          placeholder="e.g. UBS Switzerland AG"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Account Number / IBAN -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Account Number / IBAN *</label>
        <input
          type="text"
          name="accNum"
          [(ngModel)]="formData.accountNumber"
          required
          placeholder="e.g. CH93 0023 0000 8812"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs font-mono uppercase"
        />
      </div>

      <!-- Currency & Routing -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Settlement Currency</label>
          <input
            type="text"
            name="curr"
            [(ngModel)]="formData.currency"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs uppercase"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">SWIFT / BIC / Routing</label>
          <input
            type="text"
            name="rout"
            [(ngModel)]="formData.routingNumber"
            placeholder="e.g. UBSWCHZH"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs font-mono uppercase"
          />
        </div>
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
          Save Payout Method
        </button>
      </div>
    </form>
  `,
})
export class PayoutAccountModalComponent {
  @Output() save = new EventEmitter<NewPayoutAccount>()
  @Output() cancel = new EventEmitter<void>()

  formData = {
    accountType: 'bank_account' as 'bank_account' | 'stripe_connect' | 'wise',
    accountHolderName: '',
    institutionName: '',
    accountNumber: '',
    routingNumber: '',
    currency: 'USD',
  }

  onSubmit(): void {
    if (!this.formData.accountHolderName || !this.formData.accountNumber) return

    this.save.emit({
      accountType: this.formData.accountType,
      accountHolderName: this.formData.accountHolderName,
      institutionName: this.formData.institutionName,
      accountNumber: this.formData.accountNumber,
      routingNumber: this.formData.routingNumber,
      currency: this.formData.currency,
    })
  }
}
