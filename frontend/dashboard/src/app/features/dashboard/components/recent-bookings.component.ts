import { Component, OnInit, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCheckCircle2,
  lucideClock,
  lucideAlertCircle,
  lucideUsers,
  lucideArrowRight,
} from '@ng-icons/lucide'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmAvatarImports } from '../../../ui/avatar/hlm-avatar.components'
import { getDisplayNameInitials } from '../../../core/utils/initials'
import { BookingsApiService } from '../../bookings/data-access/services/bookings-api.service'

export interface BookingQueueItem {
  id: string
  reference: string
  travelerName: string
  travelerEmail: string
  travelerAvatar: string
  packageTitle: string
  destination: string
  departureDate: string
  participants: number
  totalAmount: number
  status: 'confirmed' | 'pending_payment' | 'completed' | 'cancelled'
  checkinStatus: 'checked_in' | 'pending' | 'no_show'
}

@Component({
  selector: 'app-recent-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon, ...HlmBadgeImports, ...HlmAvatarImports],
  providers: [
    provideIcons({
      lucideCheckCircle2,
      lucideClock,
      lucideAlertCircle,
      lucideUsers,
      lucideArrowRight,
    }),
  ],
  template: `
    <div class="space-y-4">
      @for (booking of bookings(); track booking.reference) {
        <div class="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30 hover:border-border/60 hover:bg-muted/30 transition-all gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <hlm-avatar class="size-9 shrink-0 border border-border/60">
              <img hlmAvatarImage [src]="booking.travelerAvatar" [alt]="booking.travelerName" />
              <span hlmAvatarFallback>{{ initials(booking.travelerName) }}</span>
            </hlm-avatar>

            <div class="min-w-0 space-y-0.5">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-foreground truncate">
                  {{ booking.travelerName }}
                </span>
                <span class="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  {{ booking.reference }}
                </span>
              </div>
              <p class="text-xs text-muted-foreground truncate">
                {{ booking.packageTitle }}
              </p>
              <div class="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span>{{ booking.departureDate }}</span>
                <span>•</span>
                <span class="inline-flex items-center gap-0.5">
                  <ng-icon name="lucideUsers" class="size-3 text-muted-foreground" />
                  {{ booking.participants }} guests
                </span>
                <span>•</span>
                <span class="font-medium text-foreground">\${{ booking.totalAmount | number }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-end gap-1.5 shrink-0">
            @if (booking.checkinStatus === 'checked_in') {
              <span hlmBadge class="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] px-1.5 py-0.5">
                Checked In
              </span>
            } @else if (booking.checkinStatus === 'pending') {
              <span hlmBadge variant="outline" class="text-amber-500 border-amber-500/30 text-[10px] px-1.5 py-0.5">
                Pending Check-in
              </span>
            } @else {
              <span hlmBadge variant="secondary" class="text-[10px] px-1.5 py-0.5">
                Completed
              </span>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class RecentBookingsComponent implements OnInit {
  private readonly bookingsApi = inject(BookingsApiService)

  readonly bookings = signal<BookingQueueItem[]>([
    {
      id: 'b-101',
      reference: 'TRV-88291',
      travelerName: 'Emma Richardson',
      travelerEmail: 'emma.richardson@gmail.com',
      travelerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      packageTitle: 'Swiss Alps Grand Panorama Express',
      destination: 'Switzerland',
      departureDate: 'Sep 18, 2026',
      participants: 2,
      totalAmount: 2900,
      status: 'confirmed',
      checkinStatus: 'checked_in',
    },
    {
      id: 'b-102',
      reference: 'TRV-88292',
      travelerName: 'Liam Chen',
      travelerEmail: 'liam.chen@techcorp.io',
      travelerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      packageTitle: 'Serengeti Migration Luxury Safari',
      destination: 'Tanzania',
      departureDate: 'Sep 24, 2026',
      participants: 4,
      totalAmount: 11560,
      status: 'confirmed',
      checkinStatus: 'pending',
    },
    {
      id: 'b-103',
      reference: 'TRV-88293',
      travelerName: 'Sofia Martinez',
      travelerEmail: 'sofia.martinez@traveler.eu',
      travelerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      packageTitle: 'Ubud Sacred Valley & Waterfall Tour',
      destination: 'Bali, Indonesia',
      departureDate: 'Sep 15, 2026',
      participants: 2,
      totalAmount: 840,
      status: 'confirmed',
      checkinStatus: 'checked_in',
    },
    {
      id: 'b-104',
      reference: 'TRV-88294',
      travelerName: 'Marcus Vance',
      travelerEmail: 'marcus.v@adventure.com',
      travelerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      packageTitle: 'Kyoto Ancient Temples & Tea Rituals',
      destination: 'Japan',
      departureDate: 'Sep 28, 2026',
      participants: 1,
      totalAmount: 890,
      status: 'confirmed',
      checkinStatus: 'pending',
    },
    {
      id: 'b-105',
      reference: 'TRV-88295',
      travelerName: 'Elena Rostova',
      travelerEmail: 'elena.rostova@globetrotter.org',
      travelerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
      packageTitle: 'Santorini Sunset Sailing & Catamaran',
      destination: 'Greece',
      departureDate: 'Sep 12, 2026',
      participants: 2,
      totalAmount: 390,
      status: 'completed',
      checkinStatus: 'checked_in',
    },
  ])

  async ngOnInit(): Promise<void> {
    await this.loadRecentBookings()
  }

  async loadRecentBookings(): Promise<void> {
    try {
      const res = await this.bookingsApi.list(undefined, 10)
      if (res.ok && res.data.items.length > 0) {
        this.bookings.set(
          res.data.items.slice(0, 5).map(b => ({
            id: b.id,
            reference: b.bookingReference,
            travelerName: b.guestName,
            travelerEmail: b.guestEmail,
            travelerAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(b.guestName)}`,
            packageTitle: b.packageTitle || 'Travel Package',
            destination: b.destination || 'Global Tour',
            departureDate: b.departureDate || 'Sep 20, 2026',
            participants: b.participantCount,
            totalAmount: b.totalAmount,
            status: b.bookingStatus as any,
            checkinStatus: b.checkinStatus || 'pending',
          }))
        )
      }
    } catch {
      // Fallback data is already preserved in signal initialization
    }
  }

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}

