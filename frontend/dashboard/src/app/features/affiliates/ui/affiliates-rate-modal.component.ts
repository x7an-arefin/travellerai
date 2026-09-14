import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { AffiliateAccount } from '../data-access/models/affiliates.model'

@Component({
  selector: 'app-affiliates-rate-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmButtonImports],
  template: `
    @if (affiliate) {
      <div class="space-y-4 text-xs">
        <div>
          <h4 class="font-bold text-foreground">Adjust Commission Rate</h4>
          <p class="text-muted-foreground mt-0.5">
            Modify the percentage cut awarded to {{ affiliate.partnerName }} for each confirmed travel package departure.
          </p>
        </div>

        <div class="space-y-1.5 pt-2">
          <label class="font-medium text-foreground">New Commission Rate (%)</label>
          <div class="flex items-center gap-2">
            <input
              type="number"
              [(ngModel)]="rate"
              min="1"
              max="50"
              step="0.5"
              class="w-full px-3 py-2 rounded-lg border border-border bg-background font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span class="text-sm font-bold text-muted-foreground">%</span>
          </div>
          <p class="text-[11px] text-muted-foreground">Standard tier: 8.5% • Premium VIP tier: 12% - 15%</p>
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
            type="button"
            hlmBtn
            variant="default"
            size="sm"
            (click)="save.emit(rate)"
            class="cursor-pointer"
          >
            Update Rate
          </button>
        </div>
      </div>
    }
  `,
})
export class AffiliatesRateModalComponent implements OnInit {
  @Input() affiliate: AffiliateAccount | null = null
  @Output() save = new EventEmitter<number>()
  @Output() cancel = new EventEmitter<void>()

  rate = 8.5

  ngOnInit(): void {
    if (this.affiliate) {
      this.rate = this.affiliate.commissionRate
    }
  }
}
