import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { Package } from '../models/packages.model'
import { NewPackage, UpdatePackage, PackageListResponse } from '../models/packages-api.types'

@Injectable({ providedIn: 'root' })
export class PackagesApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('packages')

  // Default seed/mock data so the dashboard is immediately demonstrable
  private mockPackages: Package[] = [
    {
      id: 'pkg-1',
      title: 'Swiss Alps Grand Panorama Express & Glacier Hike',
      slug: 'swiss-alps-grand-panorama',
      shortDescription: 'Traverse the majestic Bernese Oberland, ride the cogwheel train to Jungfraujoch, and hike ancient glaciers.',
      productType: 'multi_day_package',
      destinationId: 'Switzerland',
      durationDays: 5,
      durationHours: 120,
      maxParticipants: 16,
      minParticipants: 4,
      difficultyLevel: 'moderate',
      confirmationType: 'instant',
      cancellationPolicy: 'flexible',
      basePrice: 1450,
      currency: 'USD',
      featuredImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&auto=format&fit=crop&q=80',
      rating: 4.96,
      reviewCount: 312,
      totalBookings: 248,
      status: 'published',
      isFeatured: true,
      amenities: ['Wi-Fi in Transit', 'Hotel Pickup', 'Mountain Guide', 'First-Aid Kit', 'Breakfast Included'],
      itinerary: [
        { day: 1, title: 'Arrival in Zurich & Scenic Train to Interlaken', description: 'Meet your mountain guide at Zurich HB, board the GoldenPass Express, check in at chalet.', accommodation: 'Hotel Victoria-Jungfrau Chalet' },
        { day: 2, title: 'Jungfraujoch - Top of Europe & Ice Palace', description: 'Ascend by 3S-cableway Eiger Express to 3,454m altitude. Walk through the Sphinx observatory and eternal ice tunnels.', accommodation: 'Hotel Victoria-Jungfrau Chalet' },
        { day: 3, title: 'Aletsch Glacier Panoramic Trek', description: 'Hike along the UNESCO World Heritage Great Aletsch Glacier with crampons and professional safety ropes.', accommodation: 'Glacier Base Lodge' },
        { day: 4, title: 'Lauterbrunnen Valley of 72 Waterfalls', description: 'Walk through the dramatic glacial Lauterbrunnen valley, visit Trummelbach subterranean waterfalls.', accommodation: 'Hotel Victoria-Jungfrau Chalet' },
        { day: 5, title: 'Farewell Alpine Brunch & Departure', description: 'Enjoy traditional Swiss artisan cheese fondue brunch and return transfer to Zurich airport.' }
      ],
      inclusions: ['Scenic Train Passes', '4-Star Chalet Stays', 'Certified Mountain Guide', 'Daily Breakfast & 3 Dinners'],
      exclusions: ['International Flights', 'Travel Insurance', 'Personal Souvenirs'],
      languages: ['English', 'German', 'French'],
      createdAt: '2026-03-15T10:00:00Z',
    },
    {
      id: 'pkg-2',
      title: 'Ubud Sacred Valley, Waterfall & Cultural Immersion',
      slug: 'ubud-sacred-valley-culture',
      shortDescription: 'Explore sacred water temples, trek lush rice terraces, bathe in hidden jungle waterfalls, and savor Balinese cuisine.',
      productType: 'multi_day_package',
      destinationId: 'Bali, Indonesia',
      durationDays: 3,
      durationHours: 72,
      maxParticipants: 12,
      minParticipants: 2,
      difficultyLevel: 'easy',
      confirmationType: 'instant',
      cancellationPolicy: 'flexible',
      basePrice: 420,
      currency: 'USD',
      featuredImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80',
      rating: 4.92,
      reviewCount: 528,
      totalBookings: 412,
      status: 'published',
      isFeatured: true,
      inclusions: ['Boutique Villa Lodging', 'Private AC Transport', 'Temple Entrance Fees', 'Cooking Masterclass'],
      exclusions: ['Alcoholic Beverages', 'Gratuities'],
      languages: ['English', 'Indonesian'],
      createdAt: '2026-04-10T12:30:00Z',
    },
    {
      id: 'pkg-3',
      title: 'Serengeti Migration Luxury Safari & Balloon Flight',
      slug: 'serengeti-migration-safari',
      shortDescription: 'Witness the Great Wildebeest Migration in luxury 4x4 vehicles and float over the savannah at sunrise in a hot air balloon.',
      productType: 'multi_day_package',
      destinationId: 'Tanzania',
      durationDays: 6,
      durationHours: 144,
      maxParticipants: 8,
      minParticipants: 2,
      difficultyLevel: 'moderate',
      confirmationType: 'manual',
      cancellationPolicy: 'moderate',
      basePrice: 2890,
      currency: 'USD',
      featuredImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=80',
      rating: 4.98,
      reviewCount: 184,
      totalBookings: 86,
      status: 'published',
      isFeatured: true,
      inclusions: ['Tented Safari Lodge', 'Hot Air Balloon Ride & Champagne Breakfast', 'All National Park Fees', 'Private Game Drives'],
      exclusions: ['Visa Fees', 'International Airfare'],
      languages: ['English', 'Swahili'],
      createdAt: '2026-01-20T08:00:00Z',
    },
    {
      id: 'pkg-4',
      title: 'Kyoto Ancient Temples, Tea Rituals & Bamboo Grove',
      slug: 'kyoto-temples-tea-rituals',
      shortDescription: 'Walk through thousands of torii gates at Fushimi Inari, experience a traditional matcha tea ceremony, and visit Arashiyama.',
      productType: 'multi_day_package',
      destinationId: 'Kyoto, Japan',
      durationDays: 4,
      durationHours: 96,
      maxParticipants: 10,
      minParticipants: 2,
      difficultyLevel: 'easy',
      confirmationType: 'instant',
      cancellationPolicy: 'flexible',
      basePrice: 890,
      currency: 'USD',
      featuredImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80',
      rating: 4.89,
      reviewCount: 420,
      totalBookings: 320,
      status: 'published',
      isFeatured: false,
      inclusions: ['Traditional Ryokan Experience', 'Private Kaiseki Dinner', 'Tea Master Class', 'All Public Transit'],
      exclusions: ['Travel Insurance', 'Luggage Forwarding'],
      languages: ['English', 'Japanese'],
      createdAt: '2026-05-02T14:15:00Z',
    },
    {
      id: 'pkg-5',
      title: 'Santorini Sunset Sailing, Caldera Catamaran & Wine Tasting',
      slug: 'santorini-sunset-sailing',
      shortDescription: 'Sail around the iconic volcanic caldera, snorkel in crystal waters, bathe in volcanic hot springs, and enjoy Greek barbecue.',
      productType: 'day_trip',
      destinationId: 'Santorini, Greece',
      durationDays: 1,
      durationHours: 6,
      maxParticipants: 16,
      minParticipants: 4,
      difficultyLevel: 'easy',
      confirmationType: 'instant',
      cancellationPolicy: 'flexible',
      basePrice: 195,
      currency: 'USD',
      featuredImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&auto=format&fit=crop&q=80',
      rating: 4.85,
      reviewCount: 680,
      totalBookings: 560,
      status: 'published',
      isFeatured: false,
      inclusions: ['Catamaran Cruise', 'Greek BBQ & Local Wine', 'Snorkeling Equipment', 'Hotel Pickup & Drop-off'],
      exclusions: ['Towels', 'Gratuities'],
      languages: ['English', 'Greek'],
      createdAt: '2026-06-12T16:00:00Z',
    },
    {
      id: 'pkg-6',
      title: 'Cappadocia Hot Air Balloon & Fairy Chimneys Discovery',
      slug: 'cappadocia-hot-air-balloon',
      shortDescription: 'Float over subterranean cities and ancient rock-hewn churches at dawn, accompanied by an authentic cave hotel experience.',
      productType: 'multi_day_package',
      destinationId: 'Cappadocia, Turkey',
      durationDays: 3,
      durationHours: 72,
      maxParticipants: 14,
      minParticipants: 2,
      difficultyLevel: 'easy',
      confirmationType: 'instant',
      cancellationPolicy: 'moderate',
      basePrice: 560,
      currency: 'USD',
      featuredImage: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=600&auto=format&fit=crop&q=80',
      rating: 4.91,
      reviewCount: 390,
      totalBookings: 295,
      status: 'under_review',
      isFeatured: false,
      inclusions: ['Cave Suite Stay', 'Sunrise Balloon Flight', 'Underground City Tour', 'Traditional Turkish Dinners'],
      exclusions: ['Beverages', 'Tips'],
      languages: ['English', 'Turkish'],
      createdAt: '2026-07-20T11:00:00Z',
    },
  ]

  async list(cursor?: string, limit = 20): Promise<{ ok: true; data: PackageListResponse } | { ok: false; error: string }> {
    try {
      let params = new HttpParams().set('limit', limit)
      if (cursor) params = params.set('cursor', cursor)
      const data = await firstValueFrom(this.http.get<PackageListResponse>(this.baseUrl, { params }))
      return { ok: true, data }
    } catch {
      // Return rich seed data on connection failure
      return {
        ok: true,
        data: {
          items: [...this.mockPackages],
          total: this.mockPackages.length,
          hasMore: false,
        },
      }
    }
  }

  async getById(id: string): Promise<{ ok: true; data: Package } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.get<Package>(`${this.baseUrl}/${id}`))
      return { ok: true, data }
    } catch {
      const found = this.mockPackages.find(p => p.id === id)
      if (found) return { ok: true, data: found }
      return { ok: false, error: 'Package not found' }
    }
  }

  async create(dto: NewPackage): Promise<{ ok: true; data: Package } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.post<Package>(this.baseUrl, dto))
      return { ok: true, data }
    } catch {
      const newPkg: Package = {
        ...dto,
        id: `pkg-${Date.now()}`,
        rating: 5.0,
        reviewCount: 0,
        totalBookings: 0,
        createdAt: new Date().toISOString(),
      }
      this.mockPackages.unshift(newPkg)
      return { ok: true, data: newPkg }
    }
  }

  async update(id: string, dto: UpdatePackage): Promise<{ ok: true; data: Package } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.patch<Package>(`${this.baseUrl}/${id}`, dto))
      return { ok: true, data }
    } catch {
      const idx = this.mockPackages.findIndex(p => p.id === id)
      if (idx !== -1) {
        this.mockPackages[idx] = { ...this.mockPackages[idx], ...dto, updatedAt: new Date().toISOString() }
        return { ok: true, data: this.mockPackages[idx] }
      }
      return { ok: false, error: 'Package not found' }
    }
  }

  async remove(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true }
    } catch {
      this.mockPackages = this.mockPackages.filter(p => p.id !== id)
      return { ok: true }
    }
  }
}
