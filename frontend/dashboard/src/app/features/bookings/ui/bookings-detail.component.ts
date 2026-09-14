import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCalendar,
  lucideUsers,
  lucideMapPin,
  lucidePhone,
  lucideMail,
  lucideCreditCard,
  lucideFileText,
  lucideCheckCircle2,
  lucideDownload,
} from '@ng-icons/lucide'
import { Booking } from '../data-access/models/bookings.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-bookings-detail',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideCalendar,
      lucideUsers,
      lucideMapPin,
      lucidePhone,
      lucideMail,
      lucideCreditCard,
      lucideFileText,
      lucideCheckCircle2,
      lucideDownload,
    }),
  ],
  template: `
    @if (booking) {
      <div class="space-y-6 pt-2">
        <!-- Reference Header -->
        <div class="p-4 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-between">
          <div>
            <div class="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Booking Reference</div>
            <div class="text-xl font-mono font-bold text-foreground mt-0.5">
              {{ booking.bookingReference }}
            </div>
          </div>

          <div class="text-right">
            @if (booking.bookingStatus === 'confirmed') {
              <span hlmBadge variant="default" class="text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Confirmed
              </span>
            } @else {
              <span hlmBadge variant="outline" class="text-xs">
                {{ booking.bookingStatus }}
              </span>
            }
          </div>
        </div>

        <!-- Experience Info -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tour Experience</h4>
          <div class="p-3.5 rounded-xl border border-border/40 bg-card space-y-2">
            <h5 class="text-sm font-bold text-foreground">{{ booking.packageTitle }}</h5>
            <div class="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-1">
              <span class="flex items-center gap-1.5">
                <ng-icon name="lucideCalendar" class="size-3.5 text-primary" />
                {{ booking.departureDate }}
              </span>
              <span class="flex items-center gap-1.5">
                <ng-icon name="lucideUsers" class="size-3.5 text-emerald-500" />
                {{ booking.participantCount }} Participants
              </span>
            </div>
          </div>
        </div>

        <!-- Traveler Dossier -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Primary Contact / Traveler</h4>
          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground">Guest Name</span>
              <span class="font-semibold text-foreground">{{ booking.guestName }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground flex items-center gap-1">
                <ng-icon name="lucideMail" class="size-3 text-muted-foreground" />
                Email
              </span>
              <span class="font-semibold text-foreground">{{ booking.guestEmail }}</span>
            </div>

            @if (booking.guestPhone) {
              <div class="flex items-center justify-between py-1.5 border-b border-border/30">
                <span class="text-muted-foreground flex items-center gap-1">
                  <ng-icon name="lucidePhone" class="size-3 text-muted-foreground" />
                  Phone
                </span>
                <span class="font-semibold text-foreground">{{ booking.guestPhone }}</span>
              </div>
            }

            @if (booking.pickupLocation) {
              <div class="py-2 border-b border-border/30">
                <span class="text-muted-foreground flex items-center gap-1 mb-1">
                  <ng-icon name="lucideMapPin" class="size-3 text-primary" />
                  Pickup Point
                </span>
                <span class="font-medium text-foreground text-xs">{{ booking.pickupLocation }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Special Requests -->
        @if (booking.specialRequests) {
          <div class="space-y-1.5">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Special Requests & Dietary</h4>
            <div class="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
              {{ booking.specialRequests }}
            </div>
          </div>
        }

        <!-- Financial Summary -->
        <div class="space-y-2 pt-2 border-t border-border/40">
          <div class="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total Package Price</span>
            <span>\${{ booking.totalAmount | number:'1.2-2' }}</span>
          </div>
          <div class="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Amount Paid</span>
            <span>\${{ booking.paidAmount | number:'1.2-2' }}</span>
          </div>
          @if (booking.balanceDue && booking.balanceDue > 0) {
            <div class="flex items-center justify-between text-xs text-rose-500 font-medium">
              <span>Balance Due</span>
              <span>\${{ booking.balanceDue | number:'1.2-2' }}</span>
            </div>
          }
        </div>

        <!-- Actions & Voucher Controls -->
        <div class="space-y-2 pt-4 border-t border-border/40">
          <div class="flex items-center justify-between">
            <span class="text-xs text-muted-foreground">Check-in Status:</span>
            <span
              hlmBadge
              [variant]="booking.checkinStatus === 'checked_in' ? 'default' : 'secondary'"
              class="text-[10px] capitalize font-medium"
            >
              {{ booking.checkinStatus === 'checked_in' ? 'Checked In' : 'Pending Check-in' }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-2">
            @if (booking.checkinStatus !== 'checked_in') {
              <button
                hlmBtn
                variant="default"
                size="sm"
                class="gap-1.5 cursor-pointer text-xs w-full shadow-xs"
                (click)="checkin.emit(booking.id)"
              >
                <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                <span>Mark Checked In</span>
              </button>
            } @else {
              <div class="flex items-center justify-center p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold gap-1">
                <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                <span>Verified Check-in</span>
              </div>
            }

            <a
              [href]="booking.voucherUrl || 'https://traveller.ai/vouchers/' + booking.bookingReference + '.pdf'"
              target="_blank"
              hlmBtn
              variant="outline"
              size="sm"
              class="gap-1.5 cursor-pointer text-xs w-full"
            >
              <ng-icon name="lucideDownload" class="size-3.5" />
              <span>Travel Voucher</span>
            </a>
          </div>

          @if (booking.bookingStatus === 'confirmed') {
            <div class="pt-2">
              <button
                hlmBtn
                variant="ghost"
                size="sm"
                class="w-full text-xs text-muted-foreground hover:text-rose-500 cursor-pointer"
                (click)="requestRefund.emit(booking.id)"
              >
                Request Booking Cancellation & Refund
              </button>
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class BookingsDetailComponent {
  @Input() booking: Booking | null = null
  @Output() checkin = new EventEmitter<string>()
  @Output() requestRefund = new EventEmitter<string>()
}

