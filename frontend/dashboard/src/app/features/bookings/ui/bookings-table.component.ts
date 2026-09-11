import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideEye,
  lucideEdit,
  lucideTrash2,
  lucideCalendar,
  lucideUsers,
  lucideCheckCircle2,
  lucideClock,
  lucideDownload,
} from '@ng-icons/lucide'
import { Booking } from '../data-access/models/bookings.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-bookings-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideEye,
      lucideEdit,
      lucideTrash2,
      lucideCalendar,
      lucideUsers,
      lucideCheckCircle2,
      lucideClock,
      lucideDownload,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Booking Ref</th>
              <th scope="col" class="py-3.5 px-4">Traveler</th>
              <th scope="col" class="py-3.5 px-4">Experience / Package</th>
              <th scope="col" class="py-3.5 px-4">Departure</th>
              <th scope="col" class="py-3.5 px-4">Amount</th>
              <th scope="col" class="py-3.5 px-4">Payment</th>
              <th scope="col" class="py-3.5 px-4">Check-in</th>
              <th scope="col" class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3, 4]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-6 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-8 w-36 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-48 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-20 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-20 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-8 w-16 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (rows.length === 0) {
              <tr>
                <td colspan="8" class="py-12 text-center text-muted-foreground">
                  <p class="text-sm font-medium">No bookings match your criteria.</p>
                  <p class="text-xs text-muted-foreground mt-1">Check back later or search by a different reference.</p>
                </td>
              </tr>
            } @else {
              @for (b of rows; track b.id) {
                <tr class="hover:bg-muted/20 transition-colors group">
                  <!-- Ref -->
                  <td class="py-3.5 px-4">
                    <span
                      class="font-mono text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded cursor-pointer hover:underline"
                      (click)="viewClicked.emit(b.id)"
                    >
                      {{ b.bookingReference }}
                    </span>
                  </td>

                  <!-- Traveler Info -->
                  <td class="py-3.5 px-4">
                    <div class="font-semibold text-foreground text-sm truncate">
                      {{ b.guestName }}
                    </div>
                    <div class="text-xs text-muted-foreground truncate">
                      {{ b.guestEmail }}
                    </div>
                  </td>

                  <!-- Package Title -->
                  <td class="py-3.5 px-4 max-w-xs">
                    <div class="text-xs font-medium text-foreground truncate">
                      {{ b.packageTitle }}
                    </div>
                    <div class="text-[11px] text-muted-foreground flex items-center gap-1">
                      <ng-icon name="lucideUsers" class="size-3 text-primary" />
                      <span>{{ b.participantCount }} travelers</span>
                    </div>
                  </td>

                  <!-- Departure Date -->
                  <td class="py-3.5 px-4 text-xs font-medium text-foreground">
                    <div class="flex items-center gap-1.5">
                      <ng-icon name="lucideCalendar" class="size-3.5 text-muted-foreground" />
                      <span>{{ b.departureDate }}</span>
                    </div>
                  </td>

                  <!-- Total Amount -->
                  <td class="py-3.5 px-4">
                    <div class="font-bold text-foreground text-sm tabular-nums">
                      \${{ b.totalAmount | number:'1.2-2' }}
                    </div>
                    <div class="text-[10px] text-muted-foreground uppercase">{{ b.currency }}</div>
                  </td>

                  <!-- Payment Status -->
                  <td class="py-3.5 px-4">
                    @if (b.bookingStatus === 'confirmed') {
                      <span hlmBadge variant="default" class="text-[11px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        Paid / Confirmed
                      </span>
                    } @else if (b.bookingStatus === 'pending_payment') {
                      <span hlmBadge variant="outline" class="text-[11px] text-amber-600 dark:text-amber-400 border-amber-500/30">
                        Pending Payment
                      </span>
                    } @else if (b.bookingStatus === 'completed') {
                      <span hlmBadge variant="secondary" class="text-[11px]">
                        Completed
                      </span>
                    } @else {
                      <span hlmBadge variant="destructive" class="text-[11px]">
                        {{ b.bookingStatus }}
                      </span>
                    }
                  </td>

                  <!-- Checkin Status -->
                  <td class="py-3.5 px-4">
                    @if (b.checkinStatus === 'checked_in') {
                      <span class="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                        Checked In
                      </span>
                    } @else {
                      <span class="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <ng-icon name="lucideClock" class="size-3.5" />
                        Awaiting
                      </span>
                    }
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
                        title="View Details"
                        (click)="viewClicked.emit(b.id)"
                      >
                        <ng-icon name="lucideEye" class="size-4" />
                      </button>

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-8 p-0 text-muted-foreground hover:text-rose-500 cursor-pointer"
                        title="Cancel Booking"
                        (click)="deleteClicked.emit(b.id)"
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
export class BookingsTableComponent {
  @Input() rows: Booking[] = []
  @Input() isLoading: boolean = false

  @Output() viewClicked = new EventEmitter<string>()
  @Output() deleteClicked = new EventEmitter<string>()
}
