import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideMapPin,
  lucideClock,
  lucideUsers,
  lucideStar,
  lucideCheck,
  lucideX,
  lucideShieldCheck,
  lucideDollarSign,
  lucideGlobe,
} from '@ng-icons/lucide'
import { Package } from '../data-access/models/packages.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'

@Component({
  selector: 'app-packages-detail',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports],
  providers: [
    provideIcons({
      lucideMapPin,
      lucideClock,
      lucideUsers,
      lucideStar,
      lucideCheck,
      lucideX,
      lucideShieldCheck,
      lucideDollarSign,
      lucideGlobe,
    }),
  ],
  template: `
    @if (package) {
      <div class="space-y-6 pt-2">
        <!-- Hero Image & Title -->
        <div class="relative rounded-xl overflow-hidden border border-border/50 shadow-xs h-48 sm:h-56">
          <img
            [src]="package.featuredImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600'"
            [alt]="package.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary text-primary-foreground uppercase tracking-wider">
                {{ package.productType.replace('_', ' ') }}
              </span>
              <span class="text-[10px] font-medium px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs">
                {{ package.durationDays }} Days
              </span>
            </div>
            <h3 class="text-lg font-bold leading-tight line-clamp-2">{{ package.title }}</h3>
          </div>
        </div>

        <!-- Quick Specs Grid -->
        <div class="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-muted/40 border border-border/40 text-center">
          <div>
            <span class="text-[11px] text-muted-foreground uppercase font-semibold">Price</span>
            <div class="text-base font-bold text-foreground mt-0.5">
              \${{ package.basePrice }}
            </div>
            <span class="text-[10px] text-muted-foreground">{{ package.currency }} / person</span>
          </div>

          <div>
            <span class="text-[11px] text-muted-foreground uppercase font-semibold">Rating</span>
            <div class="text-base font-bold text-amber-500 flex items-center justify-center gap-1 mt-0.5">
              <ng-icon name="lucideStar" class="size-3.5 fill-amber-500" />
              <span>{{ package.rating || 5.0 }}</span>
            </div>
            <span class="text-[10px] text-muted-foreground">{{ package.reviewCount || 0 }} reviews</span>
          </div>

          <div>
            <span class="text-[11px] text-muted-foreground uppercase font-semibold">Bookings</span>
            <div class="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {{ package.totalBookings || 0 }}
            </div>
            <span class="text-[10px] text-muted-foreground">Trips confirmed</span>
          </div>
        </div>

        <!-- Details List -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Package Information</h4>

          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground flex items-center gap-1.5">
                <ng-icon name="lucideMapPin" class="size-3.5 text-primary" />
                Destination Hub
              </span>
              <span class="font-semibold text-foreground">{{ package.destinationId }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground flex items-center gap-1.5">
                <ng-icon name="lucideUsers" class="size-3.5 text-primary" />
                Max Group Capacity
              </span>
              <span class="font-semibold text-foreground">{{ package.maxParticipants }} participants</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground flex items-center gap-1.5">
                <ng-icon name="lucideClock" class="size-3.5 text-primary" />
                Difficulty Level
              </span>
              <span class="font-semibold capitalize text-foreground">{{ package.difficultyLevel || 'Moderate' }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/30">
              <span class="text-muted-foreground flex items-center gap-1.5">
                <ng-icon name="lucideShieldCheck" class="size-3.5 text-primary" />
                Cancellation Policy
              </span>
              <span class="font-semibold capitalize text-foreground">{{ package.cancellationPolicy || 'Flexible' }}</span>
            </div>
          </div>
        </div>

        <!-- Description -->
        @if (package.shortDescription) {
          <div class="space-y-1.5">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Overview</h4>
            <p class="text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/30">
              {{ package.shortDescription }}
            </p>
          </div>
        }

        <!-- Inclusions -->
        @if (package.inclusions && package.inclusions.length) {
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">What is Included</h4>
            <ul class="space-y-1.5 text-xs">
              @for (inc of package.inclusions; track inc) {
                <li class="flex items-center gap-2 text-foreground">
                  <ng-icon name="lucideCheck" class="size-3.5 text-emerald-500 shrink-0" />
                  <span>{{ inc }}</span>
                </li>
              }
            </ul>
          </div>
        }

        <!-- Amenities Badges -->
        @if (package.amenities && package.amenities.length) {
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Amenities & Features</h4>
            <div class="flex flex-wrap gap-1.5">
              @for (am of package.amenities; track am) {
                <span class="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                  {{ am }}
                </span>
              }
            </div>
          </div>
        }

        <!-- Itinerary Timeline -->
        @if (package.itinerary && package.itinerary.length) {
          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Day-by-Day Itinerary</h4>
            <div class="space-y-2 border-l-2 border-primary/30 pl-3 ml-1">
              @for (step of package.itinerary; track step.day) {
                <div class="relative pb-2">
                  <div class="absolute -left-[19px] top-1 size-2 rounded-full bg-primary ring-2 ring-background"></div>
                  <p class="text-xs font-bold text-foreground">Day {{ step.day }}: {{ step.title }}</p>
                  @if (step.description) {
                    <p class="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{{ step.description }}</p>
                  }
                  @if (step.accommodation) {
                    <p class="text-[10px] text-primary/80 mt-0.5">Stay: {{ step.accommodation }}</p>
                  }
                </div>
              }
            </div>
          </div>
        }
      </div>
    }
  `,
})
export class PackagesDetailComponent {
  @Input() package: Package | null = null
}
