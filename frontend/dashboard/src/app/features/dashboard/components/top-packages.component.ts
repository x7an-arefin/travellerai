import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideStar,
  lucideMapPin,
  lucideClock,
  lucideUsers,
  lucideArrowUpRight,
} from '@ng-icons/lucide'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { RouterModule } from '@angular/router'

export interface TopPackageItem {
  id: string
  title: string
  destination: string
  category: string
  duration: string
  price: number
  currency: string
  rating: number
  reviewCount: number
  totalBookings: number
  revenue: number
  status: 'published' | 'featured' | 'limited'
  image: string
}

@Component({
  selector: 'app-top-packages',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideStar,
      lucideMapPin,
      lucideClock,
      lucideUsers,
      lucideArrowUpRight,
    }),
  ],
  template: `
    <div class="divide-y divide-border/40">
      @for (pkg of packages; track pkg.id) {
        <div class="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
          <div class="flex items-center gap-3 min-w-0">
            <div class="relative size-12 rounded-lg overflow-hidden shrink-0 border border-border/60">
              <img
                [src]="pkg.image"
                [alt]="pkg.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <span
                class="absolute top-1 left-1 text-[9px] font-semibold px-1 py-0.2 rounded bg-black/70 text-white backdrop-blur-xs"
              >
                {{ pkg.duration }}
              </span>
            </div>

            <div class="min-w-0 space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {{ pkg.title }}
                </h4>
                @if (pkg.status === 'featured') {
                  <span hlmBadge variant="default" class="text-[10px] px-1.5 py-0 h-4 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    Featured
                  </span>
                }
              </div>

              <div class="flex items-center gap-3 text-xs text-muted-foreground">
                <span class="inline-flex items-center gap-1">
                  <ng-icon name="lucideMapPin" class="size-3 text-primary" />
                  {{ pkg.destination }}
                </span>
                <span class="inline-flex items-center gap-1">
                  <ng-icon name="lucideUsers" class="size-3 text-emerald-500" />
                  {{ pkg.totalBookings }} bookings
                </span>
                <span class="inline-flex items-center gap-0.5 text-amber-500 font-medium">
                  <ng-icon name="lucideStar" class="size-3 fill-amber-500 text-amber-500" />
                  {{ pkg.rating }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-15 sm:pl-0">
            <div class="text-right">
              <div class="text-sm font-bold text-foreground tabular-nums">
                \${{ pkg.revenue | number:'1.0-0' }}
              </div>
              <div class="text-[11px] text-muted-foreground">
                From \${{ pkg.price }}/person
              </div>
            </div>

            <a
              routerLink="/packages"
              hlmBtn
              variant="ghost"
              size="sm"
              class="size-8 p-0 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <ng-icon name="lucideArrowUpRight" class="size-4" />
            </a>
          </div>
        </div>
      }
    </div>
  `,
})
export class TopPackagesComponent {
  readonly packages: TopPackageItem[] = [
    {
      id: 'pkg-1',
      title: 'Swiss Alps Grand Panorama Express & Glacier Hike',
      destination: 'Interlaken, Switzerland',
      category: 'Alpine Adventure',
      duration: '5 Days',
      price: 1450,
      currency: 'USD',
      rating: 4.96,
      reviewCount: 312,
      totalBookings: 248,
      revenue: 359600,
      status: 'featured',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pkg-2',
      title: 'Ubud Sacred Valley, Waterfall & Cultural Immersion',
      destination: 'Bali, Indonesia',
      category: 'Cultural Tours',
      duration: '3 Days',
      price: 420,
      currency: 'USD',
      rating: 4.92,
      reviewCount: 528,
      totalBookings: 412,
      revenue: 173040,
      status: 'featured',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pkg-3',
      title: 'Serengeti Migration Luxury Safari & Balloon Flight',
      destination: 'Arusha, Tanzania',
      category: 'Wildlife Safari',
      duration: '6 Days',
      price: 2890,
      currency: 'USD',
      rating: 4.98,
      reviewCount: 184,
      totalBookings: 86,
      revenue: 248540,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pkg-4',
      title: 'Kyoto Ancient Temples, Tea Rituals & Bamboo Grove',
      destination: 'Kyoto, Japan',
      category: 'Cultural & Heritage',
      duration: '4 Days',
      price: 890,
      currency: 'USD',
      rating: 4.89,
      reviewCount: 420,
      totalBookings: 320,
      revenue: 284800,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pkg-5',
      title: 'Santorini Sunset Sailing, Caldera Catamaran & Wine Tasting',
      destination: 'Santorini, Greece',
      category: 'Cruise & Sailing',
      duration: '1 Day',
      price: 195,
      currency: 'USD',
      rating: 4.85,
      reviewCount: 680,
      totalBookings: 560,
      revenue: 109200,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=200&auto=format&fit=crop&q=80',
    },
  ]
}
