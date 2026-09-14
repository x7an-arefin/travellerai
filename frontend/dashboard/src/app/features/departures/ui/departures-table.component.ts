import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCalendar,
  lucideUsers,
  lucideFileSpreadsheet,
  lucideEdit,
  lucideTrash2,
  lucideMapPin,
  lucideClock,
} from '@ng-icons/lucide'
import { Departure } from '../data-access/models/departures.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-departures-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideCalendar,
      lucideUsers,
      lucideFileSpreadsheet,
      lucideEdit,
      lucideTrash2,
      lucideMapPin,
      lucideClock,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Departure & Tour Experience</th>
              <th scope="col" class="py-3.5 px-4">Dates & Schedule</th>
              <th scope="col" class="py-3.5 px-4">Assigned Guide</th>
              <th scope="col" class="py-3.5 px-4 text-center">Occupancy / Seats</th>
              <th scope="col" class="py-3.5 px-4 text-right">Pricing</th>
              <th scope="col" class="py-3.5 px-4 text-center">Status</th>
              <th scope="col" class="py-3.5 px-4 text-right">Manifest & Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-4 w-44 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-32 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-center"><div class="h-4 w-20 bg-muted rounded mx-auto"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-4 w-16 bg-muted rounded ml-auto"></div></td>
                  <td class="py-4 px-4 text-center"><div class="h-5 w-16 bg-muted rounded-full mx-auto"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-6 w-20 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (items.length === 0) {
              <tr>
                <td colspan="7" class="py-12 text-center text-muted-foreground text-xs">
                  No tour departures scheduled matching current filters.
                </td>
              </tr>
            } @else {
              @for (dep of items; track dep.id) {
                <tr class="hover:bg-muted/20 transition-colors text-xs">
                  <td class="py-3.5 px-4">
                    <div class="font-mono text-[10px] text-primary font-semibold">{{ dep.departureCode }}</div>
                    <div class="font-semibold text-foreground text-xs line-clamp-1">{{ dep.packageTitle }}</div>
                    <div class="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <ng-icon name="lucideMapPin" class="size-3 text-muted-foreground/80" />
                      <span>{{ dep.destination || 'Destination Hub' }}</span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="font-medium text-foreground">
                      {{ dep.startDate | date:'mediumDate' }}
                    </div>
                    <div class="text-[11px] text-muted-foreground">
                      until {{ dep.endDate | date:'mediumDate' }}
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="font-medium text-foreground">{{ dep.assignedGuideName || 'Unassigned' }}</div>
                    <div class="text-[11px] text-muted-foreground">Tour Leader</div>
                  </td>

                  <td class="py-3.5 px-4 text-center">
                    <div class="flex items-center justify-center gap-1.5 font-medium text-foreground">
                      <span>{{ dep.bookedCount }} / {{ dep.capacity }}</span>
                      <span class="text-[10px] text-muted-foreground">({{ Math.round((dep.bookedCount / dep.capacity) * 100) }}%)</span>
                    </div>
                    <!-- Mini progress bar -->
                    <div class="w-24 mx-auto bg-muted rounded-full h-1.5 mt-1 overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all"
                        [class.bg-emerald-500]="dep.bookedCount < dep.capacity"
                        [class.bg-rose-500]="dep.bookedCount >= dep.capacity"
                        [style.width.%]="(dep.bookedCount / dep.capacity) * 100"
                      ></div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    @if (dep.priceOverride) {
                      <div class="font-semibold text-foreground">\${{ dep.priceOverride | number:'1.2-2' }}</div>
                      <span class="text-[10px] text-primary">Override Rate</span>
                    } @else {
                      <span class="text-muted-foreground">Catalog Base</span>
                    }
                  </td>

                  <td class="py-3.5 px-4 text-center">
                    <span
                      hlmBadge
                      [variant]="getStatusVariant(dep.status)"
                      class="text-[10px] capitalize font-medium"
                    >
                      {{ dep.status.replace('_', ' ') }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="outline"
                        size="sm"
                        class="h-7 text-xs px-2 gap-1 cursor-pointer text-foreground"
                        (click)="manifestClick.emit(dep)"
                        title="View Passenger Manifest"
                      >
                        <ng-icon name="lucideFileSpreadsheet" class="size-3.5 text-primary" />
                        <span>Manifest</span>
                      </button>

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-foreground"
                        (click)="editClick.emit(dep)"
                        title="Edit Departure"
                      >
                        <ng-icon name="lucideEdit" class="size-3.5" />
                      </button>

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-rose-500"
                        (click)="deleteClick.emit(dep.id)"
                        title="Delete Departure"
                      >
                        <ng-icon name="lucideTrash2" class="size-3.5" />
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
export class DeparturesTableComponent {
  @Input() items: Departure[] = []
  @Input() isLoading = false
  @Output() manifestClick = new EventEmitter<Departure>()
  @Output() editClick = new EventEmitter<Departure>()
  @Output() deleteClick = new EventEmitter<string>()

  readonly Math = Math

  getStatusVariant(status: string): 'default' | 'secondary' | 'outline' | 'destructive' {
    switch (status) {
      case 'available':
        return 'default'
      case 'limited':
        return 'secondary'
      case 'sold_out':
      case 'cancelled':
        return 'destructive'
      default:
        return 'outline'
    }
  }
}
