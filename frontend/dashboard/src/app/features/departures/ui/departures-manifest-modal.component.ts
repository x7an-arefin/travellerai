import { Component, Input, Output, EventEmitter, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideDownload,
  lucidePrinter,
  lucideCheckCircle2,
  lucideClock,
  lucideMapPin,
  lucideUsers,
} from '@ng-icons/lucide'
import { Departure } from '../data-access/models/departures.model'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { ExportService } from '../../../core/services/export.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-departures-manifest-modal',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmButtonImports, ...HlmBadgeImports],
  providers: [
    provideIcons({
      lucideDownload,
      lucidePrinter,
      lucideCheckCircle2,
      lucideClock,
      lucideMapPin,
      lucideUsers,
    }),
  ],
  template: `
    @if (departure) {
      <div class="space-y-4 text-xs">
        <!-- Manifest Header Details -->
        <div class="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-mono text-xs font-bold text-primary">{{ departure.departureCode }}</span>
            <span hlmBadge variant="outline" class="text-[10px] capitalize">
              {{ departure.status.replace('_', ' ') }}
            </span>
          </div>
          <h3 class="text-base font-bold text-foreground">{{ departure.packageTitle }}</h3>
          <div class="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground pt-1">
            <div>
              <strong>Departure:</strong> {{ departure.startDate | date:'mediumDate' }}
            </div>
            <div>
              <strong>Guide Leader:</strong> {{ departure.assignedGuideName || 'Unassigned' }}
            </div>
            <div class="col-span-2">
              <strong>Meeting Point:</strong> {{ departure.meetingPoint || 'Standard Destination Hub' }}
            </div>
          </div>
        </div>

        <!-- Passengers Boarding List -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-foreground">
              Passenger Manifest ({{ departure.passengers?.length || 0 }} Booked Groups • {{ departure.bookedCount }} / {{ departure.capacity }} Seats)
            </h4>
            <div class="flex items-center gap-1.5">
              <button
                hlmBtn
                variant="outline"
                size="sm"
                (click)="printManifest()"
                class="h-7 text-xs gap-1 cursor-pointer"
              >
                <ng-icon name="lucidePrinter" class="size-3.5" />
                <span>Print Manifest</span>
              </button>
              <button
                hlmBtn
                variant="outline"
                size="sm"
                (click)="exportManifestCsv()"
                class="h-7 text-xs gap-1 cursor-pointer"
              >
                <ng-icon name="lucideDownload" class="size-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div class="rounded-lg border border-border/50 overflow-hidden">
            <table class="w-full text-left text-xs">
              <thead class="bg-muted/60 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border/40">
                <tr>
                  <th class="py-2.5 px-3">Ref #</th>
                  <th class="py-2.5 px-3">Lead Passenger</th>
                  <th class="py-2.5 px-3 text-center">Pax</th>
                  <th class="py-2.5 px-3">Pickup & Requests</th>
                  <th class="py-2.5 px-3 text-center">Check-in</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border/30">
                @if (!departure.passengers || departure.passengers.length === 0) {
                  <tr>
                    <td colspan="5" class="py-6 text-center text-muted-foreground">
                      No passengers booked on this departure yet.
                    </td>
                  </tr>
                } @else {
                  @for (pax of departure.passengers; track pax.id) {
                    <tr class="hover:bg-muted/20 transition-colors">
                      <td class="py-2.5 px-3 font-mono text-[10px] text-primary">
                        {{ pax.bookingReference }}
                      </td>
                      <td class="py-2.5 px-3">
                        <div class="font-semibold text-foreground">{{ pax.guestName }}</div>
                        <div class="text-[10px] text-muted-foreground">{{ pax.guestEmail }} • {{ pax.guestPhone || 'No phone' }}</div>
                      </td>
                      <td class="py-2.5 px-3 text-center font-bold">
                        {{ pax.participantCount }}
                      </td>
                      <td class="py-2.5 px-3">
                        <div class="text-foreground">{{ pax.pickupLocation || 'Central Meeting Point' }}</div>
                        @if (pax.specialRequests) {
                          <div class="text-[10px] text-amber-600 dark:text-amber-400 font-medium">{{ pax.specialRequests }}</div>
                        }
                      </td>
                      <td class="py-2.5 px-3 text-center">
                        <span
                          hlmBadge
                          [variant]="pax.checkinStatus === 'checked_in' ? 'default' : 'secondary'"
                          class="text-[9px] capitalize"
                        >
                          {{ pax.checkinStatus === 'checked_in' ? 'Checked In' : 'Pending' }}
                        </span>
                      </td>
                    </tr>
                  }
                }
              </tbody>
            </table>
          </div>
        </div>

        <div class="flex items-center justify-end pt-3 border-t border-border/40">
          <button
            type="button"
            hlmBtn
            variant="outline"
            size="sm"
            (click)="close.emit()"
            class="cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    }
  `,
})
export class DeparturesManifestModalComponent {
  @Input() departure: Departure | null = null
  @Output() close = new EventEmitter<void>()

  private readonly exportService = inject(ExportService)

  exportManifestCsv(): void {
    if (!this.departure || !this.departure.passengers) return

    this.exportService.exportToCsv(`manifest-${this.departure.departureCode}`, this.departure.passengers, [
      { header: 'Booking Ref', accessor: p => p.bookingReference },
      { header: 'Guest Name', accessor: p => p.guestName },
      { header: 'Guest Email', accessor: p => p.guestEmail },
      { header: 'Guest Phone', accessor: p => p.guestPhone || '' },
      { header: 'Participants', accessor: p => p.participantCount },
      { header: 'Pickup Location', accessor: p => p.pickupLocation || 'Meeting Point' },
      { header: 'Special Requests', accessor: p => p.specialRequests || 'None' },
      { header: 'Checkin Status', accessor: p => p.checkinStatus },
    ])
    toast.success('Passenger manifest CSV exported')
  }

  printManifest(): void {
    if (!this.departure || !this.departure.passengers) return

    const rows = this.departure.passengers.map(p => `
      <tr>
        <td><code>${p.bookingReference}</code></td>
        <td><strong>${p.guestName}</strong><br><small>${p.guestEmail} • ${p.guestPhone || ''}</small></td>
        <td style="text-align: center; font-weight: bold;">${p.participantCount}</td>
        <td>${p.pickupLocation || 'Meeting Point'}<br><small style="color: #b45309;">${p.specialRequests || ''}</small></td>
        <td style="text-align: center; text-transform: uppercase;">${p.checkinStatus}</td>
      </tr>
    `).join('')

    this.exportService.printDocument(`Passenger Manifest: ${this.departure.departureCode}`, `
      <div style="margin-bottom: 20px; font-size: 12px; background: #f8fafc; padding: 12px; border-radius: 6px;">
        <div><strong>Tour Experience:</strong> ${this.departure.packageTitle}</div>
        <div><strong>Departure Schedule:</strong> ${new Date(this.departure.startDate).toLocaleDateString()} — ${new Date(this.departure.endDate).toLocaleDateString()}</div>
        <div><strong>Assigned Tour Leader:</strong> ${this.departure.assignedGuideName || 'Unassigned'}</div>
        <div><strong>Meeting Rendezvous:</strong> ${this.departure.meetingPoint || 'Central Hub'}</div>
        <div><strong>Total Booked Passengers:</strong> ${this.departure.bookedCount} / ${this.departure.capacity}</div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Booking Ref</th>
            <th>Lead Passenger Details</th>
            <th style="text-align: center;">Seats</th>
            <th>Pickup & Special Requests</th>
            <th style="text-align: center;">Boarding Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `)
  }
}
