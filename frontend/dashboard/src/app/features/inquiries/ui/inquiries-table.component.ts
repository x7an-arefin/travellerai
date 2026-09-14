import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideEye,
  lucideSend,
  lucideTrash2,
  lucideMessagesSquare,
  lucideDollarSign,
  lucideCalendar,
  lucideUsers,
} from '@ng-icons/lucide'
import { TripInquiry } from '../data-access/models/inquiries.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-inquiries-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideEye,
      lucideSend,
      lucideTrash2,
      lucideMessagesSquare,
      lucideDollarSign,
      lucideCalendar,
      lucideUsers,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Inquiry / Traveler</th>
              <th scope="col" class="py-3.5 px-4">Target Destination</th>
              <th scope="col" class="py-3.5 px-4">Dates & Group</th>
              <th scope="col" class="py-3.5 px-4">Est. Budget</th>
              <th scope="col" class="py-3.5 px-4">Quotes</th>
              <th scope="col" class="py-3.5 px-4">Status</th>
              <th scope="col" class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3, 4]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-10 w-44 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-32 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-20 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-8 w-16 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (items.length === 0) {
              <tr>
                <td colspan="7" class="py-12 text-center text-muted-foreground text-sm">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <ng-icon name="lucideMessagesSquare" class="size-8 text-muted-foreground/50" />
                    <p>No trip inquiries found matching your filters</p>
                  </div>
                </td>
              </tr>
            } @else {
              @for (item of items; track item.id) {
                <tr class="hover:bg-muted/20 transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="flex flex-col">
                      <span class="font-semibold text-foreground text-sm">{{ item.contactName }}</span>
                      <span class="text-xs text-muted-foreground">{{ item.contactEmail }}</span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <span class="font-medium text-foreground text-xs">{{ item.destinationName }}</span>
                  </td>

                  <td class="py-3.5 px-4 text-xs text-muted-foreground">
                    <div class="flex items-center gap-1 text-foreground font-medium">
                      <ng-icon name="lucideUsers" class="size-3 text-primary" />
                      <span>{{ item.travelerCount }} Travelers</span>
                    </div>
                    <span class="text-[11px] text-muted-foreground">{{ item.startDate || 'Flexible' }}</span>
                  </td>

                  <td class="py-3.5 px-4">
                    <span class="text-xs font-bold text-foreground">
                      \${{ item.estimatedBudget | number }}
                    </span>
                    <span class="text-[10px] text-muted-foreground ml-1">{{ item.budgetCurrency }}</span>
                  </td>

                  <td class="py-3.5 px-4">
                    <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {{ item.quotationCount || 0 }} Quotes
                    </span>
                  </td>

                  <td class="py-3.5 px-4">
                    <span
                      hlmBadge
                      [variant]="item.status === 'accepted' ? 'default' : item.status === 'quoted' ? 'secondary' : 'outline'"
                      class="text-[10px] capitalize font-medium"
                    >
                      {{ item.status }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        class="size-8 cursor-pointer text-muted-foreground hover:text-foreground"
                        title="View Inquiry Dossier"
                        (click)="view.emit(item.id)"
                      >
                        <ng-icon name="lucideEye" class="size-4" />
                      </button>
                      <button
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        class="size-8 cursor-pointer text-muted-foreground hover:text-primary"
                        title="Submit Custom Quote"
                        (click)="quote.emit(item.id)"
                      >
                        <ng-icon name="lucideSend" class="size-4" />
                      </button>
                      <button
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        class="size-8 cursor-pointer text-muted-foreground hover:text-destructive"
                        title="Delete Inquiry"
                        (click)="delete.emit(item.id)"
                      >
                        <ng-icon name="lucideTrash2" class="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class InquiriesTableComponent {
  @Input() items: TripInquiry[] = []
  @Input() isLoading = false

  @Output() view = new EventEmitter<string>()
  @Output() quote = new EventEmitter<string>()
  @Output() delete = new EventEmitter<string>()
}
