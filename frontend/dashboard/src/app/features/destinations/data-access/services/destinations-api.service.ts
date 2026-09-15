import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { Destination } from '../models/destinations.model'
import { NewDestination, UpdateDestination, DestinationListResponse } from '../models/destinations-api.types'

@Injectable({ providedIn: 'root' })
export class DestinationsApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('destinations')

  private mockDestinations: Destination[] = [
    {
      id: 'dest-1',
      name: 'Swiss Alps & Valais',
      slug: 'swiss-alps-valais',
      country: 'Switzerland',
      countryCode: 'CH',
      stateRegion: 'Valais & Bernese Oberland',
      description: 'Iconic mountain landscapes, glacier panoramas, Matterhorn alpine hiking, and historic scenic railways.',
      travelGuide: 'Best visited from June to September for hiking, and December to April for winter sports. Passes available for Swiss panoramic trains.',
      coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop&q=80',
      latitude: 46.5600,
      longitude: 8.0200,
      weatherInfo: {
        bestTimeToVisit: 'June - October',
        averageTemp: '18°C Summer / -2°C Winter',
        rainyMonths: 'May, November',
      },
      visaInfo: 'Schengen Area visa rules apply. 90-day visa-free for eligible national passports.',
      safetyInfo: 'High alpine terrain; guided excursions recommended on glaciers.',
      activePackagesCount: 14,
      isFeatured: true,
      sortOrder: 1,
      status: 'active',
      metaTitle: 'Swiss Alps Luxury Travel & Adventure Packages',
      metaDescription: 'Discover verified Swiss Alps tours, Matterhorn panoramic hikes, and glacier express travel packages on Traveller AI.',
      createdAt: '2026-08-01T10:00:00Z',
    },
    {
      id: 'dest-2',
      name: 'Ubud & Central Bali',
      slug: 'ubud-central-bali',
      country: 'Indonesia',
      countryCode: 'ID',
      stateRegion: 'Bali Province',
      description: 'Spiritual cultural heart of Bali featuring lush tiered rice terraces, sacred river valleys, and artisan workshops.',
      travelGuide: 'Dry season between April and October brings sunny days and cool breezes. Ideal for temple tours and wellness retreats.',
      coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
      latitude: -8.5069,
      longitude: 115.2625,
      weatherInfo: {
        bestTimeToVisit: 'April - October',
        averageTemp: '27°C Year-round',
        rainyMonths: 'December - February',
      },
      visaInfo: 'Visa on Arrival (VoA) available for 90+ nationalities. e-VoA online application supported.',
      safetyInfo: 'Respect temple dress codes (sarongs provided). Stay hydrated.',
      activePackagesCount: 19,
      isFeatured: true,
      sortOrder: 2,
      status: 'active',
      metaTitle: 'Ubud Bali Cultural & Wellness Tours',
      metaDescription: 'Explore Ubud sacred valleys, sunrise trekking, and cultural retreats with certified local Indonesian tour hosts.',
      createdAt: '2026-08-03T11:30:00Z',
    },
    {
      id: 'dest-3',
      name: 'Serengeti & Ngorongoro',
      slug: 'serengeti-ngorongoro',
      country: 'Tanzania',
      countryCode: 'TZ',
      stateRegion: 'Northern Safari Circuit',
      description: 'The premier wildlife conservation sanctuary in Africa, world-famous for the Great Wildebeest Migration and Big Five game drives.',
      travelGuide: 'Witness the Mara river crossings from July to October, or the southern calving season from January to March.',
      coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80',
      latitude: -2.3333,
      longitude: 34.8333,
      weatherInfo: {
        bestTimeToVisit: 'July - October & January - March',
        averageTemp: '25°C Day / 13°C Night',
        rainyMonths: 'April - May',
      },
      visaInfo: 'Tanzania tourist eVisa required prior to arrival.',
      safetyInfo: 'Licensed professional safari guides and 4x4 open-top cruisers mandatory in park zones.',
      activePackagesCount: 8,
      isFeatured: true,
      sortOrder: 3,
      status: 'active',
      metaTitle: 'Serengeti Safari & Great Migration Tour Packages',
      metaDescription: 'Book all-inclusive luxury safari lodges, hot air balloon flights, and Ngorongoro crater excursions on Traveller AI.',
      createdAt: '2026-08-05T09:15:00Z',
    },
    {
      id: 'dest-4',
      name: 'Kyoto Ancient Capital',
      slug: 'kyoto-ancient-capital',
      country: 'Japan',
      countryCode: 'JP',
      stateRegion: 'Kansai Region',
      description: 'Historical heart of Japan home to 17 UNESCO World Heritage shrines, Zen rock gardens, traditional geisha districts, and culinary traditions.',
      travelGuide: 'Spring cherry blossom (late March to early April) and autumn foliage (November) are magnificent peak seasons.',
      coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
      latitude: 35.0116,
      longitude: 135.7681,
      weatherInfo: {
        bestTimeToVisit: 'March - May & October - November',
        averageTemp: '22°C Spring / 16°C Autumn',
        rainyMonths: 'June, July',
      },
      visaInfo: 'Visa waiver for 68 jurisdictions up to 90 days.',
      safetyInfo: 'Exceptionally safe destination; observe photography etiquettes in Gion preservation alleys.',
      activePackagesCount: 11,
      isFeatured: true,
      sortOrder: 4,
      status: 'active',
      metaTitle: 'Kyoto Heritage Shrines & Zen Tea Tours',
      metaDescription: 'Immerse in private tea ceremonies, Arashiyama bamboo forest excursions, and temple architectural walks in Kyoto.',
      createdAt: '2026-08-10T14:00:00Z',
    },
    {
      id: 'dest-5',
      name: 'Santorini Caldera & Oia',
      slug: 'santorini-caldera-oia',
      country: 'Greece',
      countryCode: 'GR',
      stateRegion: 'Cyclades Islands',
      description: 'Dramatic volcanic cliffs overlooking the sapphire Aegean Sea with iconic whitewashed cliffside villages and world-class sunsets.',
      travelGuide: 'Catamaran sunset cruises, volcanic hot spring swimming, and Assyrtiko wine tastings are essential experiences.',
      coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=80',
      latitude: 36.3932,
      longitude: 25.4615,
      weatherInfo: {
        bestTimeToVisit: 'May - October',
        averageTemp: '26°C Summer / 15°C Winter',
        rainyMonths: 'December - February',
      },
      visaInfo: 'Schengen Area regulations apply.',
      safetyInfo: 'Cobblestone stairs can be steep; comfortable walking shoes advised.',
      activePackagesCount: 9,
      isFeatured: true,
      sortOrder: 5,
      status: 'active',
      metaTitle: 'Santorini Sunset Sailing & Island Packages',
      metaDescription: 'Experience premium caldera catamaran cruises, cliffside boutique stays, and Cycladic wine tours on Traveller AI.',
      createdAt: '2026-08-12T16:20:00Z',
    },
    {
      id: 'dest-6',
      name: 'Cappadocia Valley',
      slug: 'cappadocia-valley',
      country: 'Turkey',
      countryCode: 'TR',
      stateRegion: 'Central Anatolia',
      description: 'Surreal geological wonder of honeycombed fairy chimney formations, ancient subterranean cities, and sunrise hot air balloon flights.',
      travelGuide: 'Sunrise balloon flights run year-round weather permitting. Cave hotel experiences in Goreme and Uchisar are unmissable.',
      coverImage: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&auto=format&fit=crop&q=80',
      latitude: 38.6431,
      longitude: 34.8289,
      weatherInfo: {
        bestTimeToVisit: 'April - June & September - November',
        averageTemp: '23°C Day / 10°C Night',
        rainyMonths: 'April, May',
      },
      visaInfo: 'Turkish tourist eVisa issued online in minutes for most passports.',
      safetyInfo: 'Hot air balloon operations strictly certified and regulated by Turkish Civil Aviation authority.',
      activePackagesCount: 12,
      isFeatured: false,
      sortOrder: 6,
      status: 'active',
      metaTitle: 'Cappadocia Balloon Flights & Cave Hotel Packages',
      metaDescription: 'Book sunrise hot air balloon rides, fairy chimney quad bike tours, and underground city explorations on Traveller AI.',
      createdAt: '2026-08-15T08:00:00Z',
    },
  ]

  async list(cursor?: string, limit = 20): Promise<{ ok: true; data: DestinationListResponse } | { ok: false; error: string }> {
    try {
      let params = new HttpParams().set('limit', limit)
      if (cursor) params = params.set('cursor', cursor)
      const data = await firstValueFrom(this.http.get<DestinationListResponse>(this.baseUrl, { params }))
      return { ok: true, data }
    } catch {
      if (!this.apiConfig.isProduction) {
        return {
          ok: true,
          data: {
            items: [...this.mockDestinations],
            total: this.mockDestinations.length,
            hasMore: false,
          },
        }
      }
      return { ok: false, error: 'Could not connect to Destinations service.' }
    }
  }


  async getById(id: string): Promise<{ ok: true; data: Destination } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.get<Destination>(`${this.baseUrl}/${id}`))
      return { ok: true, data }
    } catch {
      if (!this.apiConfig.isProduction) {
        const found = this.mockDestinations.find(d => d.id === id)
        if (found) return { ok: true, data: found }
      }
      return { ok: false, error: 'Destination not found' }
    }
  }

  async create(dto: NewDestination): Promise<{ ok: true; data: Destination } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.post<Destination>(this.baseUrl, dto))
      return { ok: true, data }
    } catch {
      if (!this.apiConfig.isProduction) {
        const newDest: Destination = {
          ...dto,
          id: `dest-${Date.now()}`,
          activePackagesCount: 0,
          createdAt: new Date().toISOString(),
        }
        this.mockDestinations.unshift(newDest)
        return { ok: true, data: newDest }
      }
      return { ok: false, error: 'Failed to create destination on server.' }
    }
  }

  async update(id: string, dto: UpdateDestination): Promise<{ ok: true; data: Destination } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.patch<Destination>(`${this.baseUrl}/${id}`, dto))
      return { ok: true, data }
    } catch {
      if (!this.apiConfig.isProduction) {
        const idx = this.mockDestinations.findIndex(d => d.id === id)
        if (idx !== -1) {
          this.mockDestinations[idx] = { ...this.mockDestinations[idx], ...dto }
          return { ok: true, data: this.mockDestinations[idx] }
        }
      }
      return { ok: false, error: 'Destination not found' }
    }
  }

  async remove(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true }
    } catch {
      if (!this.apiConfig.isProduction) {
        this.mockDestinations = this.mockDestinations.filter(d => d.id !== id)
        return { ok: true }
      }
      return { ok: false, error: 'Failed to delete destination.' }
    }
  }
}
