import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { SearchExperienceItem, SearchFilterParams, SearchCatalogResponse } from '../models/search.model'

@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly packagesUrl = this.apiConfig.buildUrl('packages')
  private readonly hotelsUrl = this.apiConfig.buildUrl('hotels')
  private readonly vehiclesUrl = this.apiConfig.buildUrl('vehicles')

  private readonly seedCatalog: SearchExperienceItem[] = [
    {
      id: 'exp-pkg-1',
      type: 'tour_package',
      title: 'Swiss Alps Grand Panorama Express & Glacier Hike',
      subtitle: '5 Days • Interlaken & Jungfraujoch • Small Group (Max 12)',
      destination: 'Switzerland',
      imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&auto=format&fit=crop&q=80',
      rating: 4.96,
      reviewCount: 312,
      providerName: 'Alpine Wonders Agency',
      basePrice: 1450,
      priceSuffix: '/ person',
      highlights: ['Scenic Cogwheel Rail Pass', 'Glacier Crampon Trek', 'Swiss Fondue Dinner', 'All Transit Passes'],
      isFeatured: true,
      freeCancellation: true,
    },
    {
      id: 'exp-htl-1',
      type: 'hotel_stay',
      title: 'The Omnia Mountain Luxury Alpine Lodge & Spa',
      subtitle: 'Deluxe Matterhorn View Suite • Organic Alpine Breakfast',
      destination: 'Switzerland',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
      rating: 4.98,
      reviewCount: 184,
      providerName: 'Omnia Hospitality Group',
      basePrice: 380,
      priceSuffix: '/ night',
      highlights: ['Heated Indoor/Outdoor Pool', 'Matterhorn View Balcony', 'Michelin-starred Dining', 'Ski-in / Ski-out'],
      isFeatured: true,
      freeCancellation: true,
    },
    {
      id: 'exp-vcl-1',
      type: 'airport_transfer',
      title: 'VIP Chauffeur Transfer: Zurich Airport to Interlaken',
      subtitle: 'Private Mercedes V-Class VIP • Flight Tracking & Meet & Greet',
      destination: 'Switzerland',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80',
      rating: 4.94,
      reviewCount: 92,
      providerName: 'Swiss Executive Fleet',
      basePrice: 240,
      priceSuffix: '/ vehicle',
      highlights: ['Complimentary Swiss Mineral Water', '60m Free Waiting Time', 'Child Seats Provided', 'Wi-Fi Onboard'],
      freeCancellation: true,
    },
    {
      id: 'exp-pkg-2',
      type: 'tour_package',
      title: 'Ubud Sacred Valley, Waterfall & Cultural Immersion',
      subtitle: '3 Days • Rice Terraces, Secret Waterfalls & Cooking Class',
      destination: 'Bali, Indonesia',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80',
      rating: 4.92,
      reviewCount: 528,
      providerName: 'Bali Island Escapes',
      basePrice: 420,
      priceSuffix: '/ person',
      highlights: ['Sacred Water Temple Blessing', 'Private Cooking Masterclass', 'Hidden Jungle Falls', 'Artisan Coffee Tasting'],
      isFeatured: true,
      freeCancellation: true,
    },
    {
      id: 'exp-pkg-3',
      type: 'tour_package',
      title: 'Serengeti Migration Luxury Safari & Balloon Flight',
      subtitle: '6 Days • Luxury Tented Camp, Ngorongoro Crater & Big Five',
      destination: 'Tanzania',
      imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=80',
      rating: 4.98,
      reviewCount: 184,
      providerName: 'Kilimanjaro Trailblazers',
      basePrice: 2890,
      priceSuffix: '/ person',
      highlights: ['Dawn Hot Air Balloon Safari', '4x4 Open-Roof Custom Cruiser', 'Bush Champagne Breakfast', 'Certified Wildlife Biologist'],
      isFeatured: true,
      freeCancellation: false,
    },
    {
      id: 'exp-htl-2',
      type: 'hotel_stay',
      title: 'Four Seasons Resort Bali at Sayan',
      subtitle: 'Riverfront Pool Villa • Ayung River Gorge Sanctuary',
      destination: 'Bali, Indonesia',
      imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80',
      rating: 4.97,
      reviewCount: 340,
      providerName: 'Four Seasons Luxury Group',
      basePrice: 590,
      priceSuffix: '/ night',
      highlights: ['Private Plunge Pool', 'Ayung River Views', 'Holistic Wellness Spa', 'Daily Sunrise Yoga'],
      freeCancellation: true,
    },
    {
      id: 'exp-vcl-2',
      type: 'vehicle_rental',
      title: 'Safari Land Cruiser 4x4 with Pop-Up Roof (Self-Drive or Guided)',
      subtitle: 'Rugged Off-Road Expedition Vehicle • Dual Spare Wheels & Fridge',
      destination: 'Tanzania',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80',
      rating: 4.88,
      reviewCount: 64,
      providerName: 'Serengeti Safari Fleet',
      basePrice: 195,
      priceSuffix: '/ day',
      highlights: ['Heavy-Duty Winch', 'High-Lift Jack & Dual Tanks', 'Built-in 40L Inverter Fridge', 'Garmin GPS Satellite Unit'],
      freeCancellation: true,
      securityDeposit: 300,
    },
    {
      id: 'exp-pkg-4',
      type: 'tour_package',
      title: 'Kyoto Zen Temples, Ryokan Stay & Bamboo Trail',
      subtitle: '4 Days • Arashiyama, Fushimi Inari & Authentic Kaiseki Banquet',
      destination: 'Japan',
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80',
      rating: 4.89,
      reviewCount: 420,
      providerName: 'Zen Heritage Expeditions',
      basePrice: 890,
      priceSuffix: '/ person',
      highlights: ['Centuries-Old Ryokan Stay', 'Exclusive Tea Ceremony Masterclass', 'Early Access Bamboo Forest', 'All Rail Passes Included'],
      freeCancellation: true,
    },
  ]

  async search(filters?: SearchFilterParams): Promise<{ ok: true; data: SearchCatalogResponse }> {
    try {
      // Attempt to query packages endpoint for live packages
      const params = new HttpParams().set('limit', 20)
      const res = await firstValueFrom(this.http.get<any>(this.packagesUrl, { params }))

      let items = [...this.seedCatalog]

      // If backend returned package items, merge live packages into search items
      if (res && (res.items || Array.isArray(res))) {
        const livePackages = (res.items || res).map((p: any) => ({
          id: `exp-${p.id}`,
          type: 'tour_package' as const,
          title: p.title,
          subtitle: `${p.durationDays || 3} Days • ${p.destinationId || 'Global Destination'}`,
          destination: p.destinationId || 'Global',
          imageUrl: p.featuredImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
          rating: p.rating || 5.0,
          reviewCount: p.reviewCount || 0,
          providerName: 'Verified Travel Partner',
          basePrice: p.basePrice || 500,
          priceSuffix: '/ person',
          highlights: p.inclusions?.slice(0, 4) || ['Guided Tour', 'Daily Breakfast', 'Hotel Pickup'],
          isFeatured: p.isFeatured,
          freeCancellation: p.cancellationPolicy === 'flexible',
        }))

        // Prepend non-duplicate live items
        for (const live of livePackages) {
          if (!items.find((i) => i.id === live.id)) {
            items.unshift(live)
          }
        }
      }

      // Apply filters if provided
      if (filters) {
        if (filters.query) {
          const q = filters.query.toLowerCase().trim()
          items = items.filter(
            (i) =>
              i.title.toLowerCase().includes(q) ||
              i.destination.toLowerCase().includes(q) ||
              i.providerName.toLowerCase().includes(q)
          )
        }
        if (filters.serviceType && filters.serviceType !== 'all') {
          items = items.filter((i) => i.type === filters.serviceType)
        }
        if (filters.destination && filters.destination !== 'all') {
          items = items.filter((i) => i.destination.toLowerCase().includes(filters.destination!.toLowerCase()))
        }
        if (filters.minRating) {
          items = items.filter((i) => i.rating >= filters.minRating!)
        }
        if (filters.maxPrice) {
          items = items.filter((i) => i.basePrice <= filters.maxPrice!)
        }
        if (filters.onlyFreeCancellation) {
          items = items.filter((i) => i.freeCancellation)
        }
      }

      return { ok: true, data: { items, total: items.length } }
    } catch {
      // Offline fallback
      let filtered = [...this.seedCatalog]
      if (filters) {
        if (filters.query) {
          const q = filters.query.toLowerCase().trim()
          filtered = filtered.filter(
            (i) =>
              i.title.toLowerCase().includes(q) ||
              i.destination.toLowerCase().includes(q) ||
              i.providerName.toLowerCase().includes(q)
          )
        }
        if (filters.serviceType && filters.serviceType !== 'all') {
          filtered = filtered.filter((i) => i.type === filters.serviceType)
        }
        if (filters.destination && filters.destination !== 'all') {
          filtered = filtered.filter((i) => i.destination.toLowerCase().includes(filters.destination!.toLowerCase()))
        }
      }
      return { ok: true, data: { items: filtered, total: filtered.length } }
    }
  }
}
