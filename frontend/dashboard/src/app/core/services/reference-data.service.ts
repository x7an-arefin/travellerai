import { Injectable, inject, signal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ApiConfigService } from './api-config.service'
import {
  HotelOption,
  VehicleOption,
  DriverOption,
  PackageOption,
  DestinationOption,
  ProviderOption,
  CategoryOption,
  DepartureOption,
  SelectOption,
} from '../models/reference-data.types'

@Injectable({ providedIn: 'root' })
export class ReferenceDataService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)

  readonly hotels = signal<HotelOption[]>([])
  readonly vehicles = signal<VehicleOption[]>([])
  readonly drivers = signal<DriverOption[]>([])
  readonly packages = signal<PackageOption[]>([])
  readonly destinations = signal<DestinationOption[]>([])
  readonly providers = signal<ProviderOption[]>([])
  readonly categories = signal<CategoryOption[]>([])
  readonly departures = signal<DepartureOption[]>([])

  readonly hotelOptions = computed<SelectOption[]>(() =>
    this.hotels().map((h) => ({
      label: `${h.name}${h.city ? ' — ' + h.city : ''}`,
      value: h.id,
    }))
  )

  readonly vehicleOptions = computed<SelectOption[]>(() =>
    this.vehicles().map((v) => ({
      label: `${v.make} ${v.model}${v.registrationNumber ? ' (' + v.registrationNumber + ')' : ''}`,
      value: v.id,
    }))
  )

  readonly driverOptions = computed<SelectOption[]>(() =>
    this.drivers().map((d) => ({
      label: `${d.fullName} (${d.dutyStatus || 'active'})`,
      value: d.id,
    }))
  )

  readonly destinationOptions = computed<SelectOption[]>(() =>
    this.destinations().map((d) => ({
      label: `${d.name}${d.country ? ', ' + d.country : ''}`,
      value: d.id,
    }))
  )

  readonly packageOptions = computed<SelectOption[]>(() =>
    this.packages().map((p) => ({
      label: p.title,
      value: p.id,
    }))
  )

  readonly providerOptions = computed<SelectOption[]>(() =>
    this.providers().map((pr) => ({
      label: `${pr.name} (${pr.type})`,
      value: pr.id,
    }))
  )

  readonly departureOptions = computed<SelectOption[]>(() =>
    this.departures()
      .filter((dep) => dep.status === 'open' || dep.status === 'confirmed' || dep.availableCount > 0)
      .map((dep) => ({
        label: `${dep.departureCode} — ${dep.availableCount} available`,
        value: dep.id,
      }))
  )

  async loadAll(): Promise<void> {
    await Promise.allSettled([
      this.loadHotels(),
      this.loadVehicles(),
      this.loadDrivers(),
      this.loadPackages(),
      this.loadDestinations(),
      this.loadProviders(),
      this.loadCategories(),
      this.loadDepartures(),
    ])
  }

  async invalidate(entity: 'hotels' | 'vehicles' | 'drivers' | 'packages' | 'destinations' | 'providers' | 'categories' | 'departures'): Promise<void> {
    switch (entity) {
      case 'hotels':
        await this.loadHotels()
        break
      case 'vehicles':
        await this.loadVehicles()
        break
      case 'drivers':
        await this.loadDrivers()
        break
      case 'packages':
        await this.loadPackages()
        break
      case 'destinations':
        await this.loadDestinations()
        break
      case 'providers':
        await this.loadProviders()
        break
      case 'categories':
        await this.loadCategories()
        break
      case 'departures':
        await this.loadDepartures()
        break
    }
  }

  private async loadHotels(): Promise<void> {
    try {
      const url = this.apiConfig.buildUrl('hotel-properties')
      const res = await firstValueFrom(
        this.http.get<any>(url).pipe(catchError(() => of(null)))
      )
      const raw = res?.data?.items ?? res?.items ?? res
      if (Array.isArray(raw)) {
        this.hotels.set(
          raw.map((h: any) => ({
            id: h.id,
            name: h.name || h.propertyName || 'Hotel',
            city: h.city || '',
            country: h.country || '',
            starRating: h.starRating,
            propertyType: h.propertyType,
          }))
        )
        return
      }
    } catch {}

    if (!this.apiConfig.isProduction) {
      this.hotels.set([
        { id: 'prop-101', name: 'Grand Sylhet Resort & Spa', city: 'Sylhet', country: 'Bangladesh', starRating: 5 },
        { id: 'prop-102', name: 'Tea Garden Eco-Lodge Retreat', city: 'Sreemangal', country: 'Bangladesh', starRating: 4 },
        { id: 'prop-103', name: 'Bay of Bengal Luxury Suites', city: "Cox's Bazar", country: 'Bangladesh', starRating: 5 },
      ])
    } else {
      this.hotels.set([])
    }
  }

  private async loadVehicles(): Promise<void> {
    try {
      const url = this.apiConfig.buildUrl('vehicles')
      const res = await firstValueFrom(
        this.http.get<any>(url).pipe(catchError(() => of(null)))
      )
      const raw = res?.data?.items ?? res?.items ?? res
      if (Array.isArray(raw)) {
        this.vehicles.set(
          raw.map((v: any) => ({
            id: v.id,
            make: v.make || '',
            model: v.model || '',
            registrationNumber: v.registrationNumber || '',
            category: v.category,
            capacity: v.seatingCapacity,
            status: v.activeStatus,
          }))
        )
        return
      }
    } catch {}

    if (!this.apiConfig.isProduction) {
      this.vehicles.set([
        { id: 'veh-01', make: 'Toyota', model: 'Prado Land Cruiser TX-L', registrationNumber: 'DHK-MET-GA-14-8890', capacity: 7, status: 'active' },
        { id: 'veh-02', make: 'Bajaj', model: 'RE 4-Stroke CNG Auto-Rickshaw', registrationNumber: 'SYL-CHA-11-4455', capacity: 3, status: 'active' },
        { id: 'veh-03', make: 'Yamaha', model: 'NMAX 155 ABS Scooter', registrationNumber: 'CXB-HA-19-0211', capacity: 2, status: 'active' },
      ])
    } else {
      this.vehicles.set([])
    }
  }

  private async loadDrivers(): Promise<void> {
    try {
      const url = this.apiConfig.buildUrl('drivers')
      const res = await firstValueFrom(
        this.http.get<any>(url).pipe(catchError(() => of(null)))
      )
      const raw = res?.data?.items ?? res?.items ?? res
      if (Array.isArray(raw)) {
        this.drivers.set(
          raw.map((d: any) => ({
            id: d.id,
            fullName: d.fullName || d.name || 'Driver',
            licenseNumber: d.licenseNumber,
            dutyStatus: d.dutyStatus || d.status || 'available',
            phone: d.phone,
          }))
        )
        return
      }
    } catch {}

    if (!this.apiConfig.isProduction) {
      this.drivers.set([
        { id: 'drv-01', fullName: 'Abdul Jabbar', dutyStatus: 'available', phone: '+880 1711 998877' },
        { id: 'drv-02', fullName: 'Mohammad Faruk', dutyStatus: 'on_duty', phone: '+880 1722 887766' },
        { id: 'drv-03', fullName: 'Shakil Ahmed', dutyStatus: 'available', phone: '+880 1733 776655' },
      ])
    } else {
      this.drivers.set([])
    }
  }

  private async loadPackages(): Promise<void> {
    try {
      const url = this.apiConfig.buildUrl('packages')
      const res = await firstValueFrom(
        this.http.get<any>(url).pipe(catchError(() => of(null)))
      )
      const raw = res?.data?.items ?? res?.items ?? res
      if (Array.isArray(raw)) {
        this.packages.set(
          raw.map((p: any) => ({
            id: p.id,
            title: p.title || 'Package',
            destinationId: p.destinationId,
            durationDays: p.durationDays,
            basePrice: p.basePrice,
          }))
        )
        return
      }
    } catch {}

    if (!this.apiConfig.isProduction) {
      this.packages.set([
        { id: 'pkg-1', title: 'Swiss Alps Grand Panorama Express & Glacier Hike', destinationId: 'dest-1', durationDays: 5, basePrice: 1450 },
        { id: 'pkg-2', title: 'Ubud Sacred Valley, Waterfall & Cultural Immersion', destinationId: 'dest-2', durationDays: 3, basePrice: 420 },
        { id: 'pkg-3', title: 'Kyoto Imperial Temples, Arashiyama Bamboo & Tea Ritual', destinationId: 'dest-3', durationDays: 4, basePrice: 980 },
      ])
    } else {
      this.packages.set([])
    }
  }

  private async loadDestinations(): Promise<void> {
    try {
      const url = this.apiConfig.buildUrl('destinations')
      const res = await firstValueFrom(
        this.http.get<any>(url).pipe(catchError(() => of(null)))
      )
      const raw = res?.data?.items ?? res?.items ?? res
      if (Array.isArray(raw)) {
        this.destinations.set(
          raw.map((d: any) => ({
            id: d.id,
            name: d.name || 'Destination',
            country: d.country || '',
            region: d.stateRegion || d.region,
          }))
        )
        return
      }
    } catch {}

    if (!this.apiConfig.isProduction) {
      this.destinations.set([
        { id: 'dest-1', name: 'Swiss Alps & Valais', country: 'Switzerland', region: 'Valais' },
        { id: 'dest-2', name: 'Ubud & Central Bali', country: 'Indonesia', region: 'Bali' },
        { id: 'dest-3', name: 'Kyoto & Kansai Region', country: 'Japan', region: 'Kansai' },
        { id: 'dest-4', name: 'Sylhet & Tea Valley', country: 'Bangladesh', region: 'Sylhet' },
      ])
    } else {
      this.destinations.set([])
    }
  }

  private async loadProviders(): Promise<void> {
    try {
      const url = this.apiConfig.buildUrl('providers')
      const res = await firstValueFrom(
        this.http.get<any>(url).pipe(catchError(() => of(null)))
      )
      const raw = res?.data?.items ?? res?.items ?? res
      if (Array.isArray(raw)) {
        this.providers.set(
          raw.map((pr: any) => ({
            id: pr.id,
            name: pr.displayName || pr.legalName || 'Provider',
            slug: pr.slug || '',
            type: pr.providerType || 'tour_operator',
            status: pr.approvalStatus || 'approved',
          }))
        )
        return
      }
    } catch {}

    if (!this.apiConfig.isProduction) {
      this.providers.set([
        { id: 'prov-1', name: 'Alpine Wonders Agency', slug: 'alpine-wonders', type: 'tour_operator', status: 'approved' },
        { id: 'prov-2', name: 'Bali Island Escapes', slug: 'bali-escapes', type: 'agency', status: 'approved' },
        { id: 'prov-3', name: 'Kyoto Heritage Journeys', slug: 'kyoto-heritage', type: 'experience_host', status: 'approved' },
      ])
    } else {
      this.providers.set([])
    }
  }

  private async loadCategories(): Promise<void> {
    try {
      const url = this.apiConfig.buildUrl('categories')
      const res = await firstValueFrom(
        this.http.get<any>(url).pipe(catchError(() => of(null)))
      )
      const raw = res?.data?.items ?? res?.items ?? res
      if (Array.isArray(raw)) {
        this.categories.set(
          raw.map((c: any) => ({
            id: c.id,
            name: c.name || 'Category',
            slug: c.slug || '',
          }))
        )
        return
      }
    } catch {}

    if (!this.apiConfig.isProduction) {
      this.categories.set([
        { id: 'cat-1', name: 'Trekking & Hiking', slug: 'trekking-hiking' },
        { id: 'cat-2', name: 'Cultural & Heritage', slug: 'cultural-heritage' },
        { id: 'cat-3', name: 'Eco Lodges & Retreats', slug: 'eco-lodges' },
        { id: 'cat-4', name: 'Airport Transfers & Fleets', slug: 'transfers-fleets' },
      ])
    } else {
      this.categories.set([])
    }
  }

  private async loadDepartures(): Promise<void> {
    try {
      const url = this.apiConfig.buildUrl('departures')
      const res = await firstValueFrom(
        this.http.get<any>(url).pipe(catchError(() => of(null)))
      )
      const raw = res?.data?.items ?? res?.items ?? res
      if (Array.isArray(raw)) {
        this.departures.set(
          raw.map((dep: any) => ({
            id: dep.id,
            packageId: dep.packageId,
            departureCode: dep.departureCode || dep.code || 'DEP',
            startDate: dep.startDate,
            availableCount: dep.availableCount ?? (dep.capacity ? dep.capacity - (dep.bookedCount || 0) : 10),
            status: dep.status || 'open',
          }))
        )
        return
      }
    } catch {}

    if (!this.apiConfig.isProduction) {
      this.departures.set([
        { id: 'dep-101', packageId: 'pkg-1', departureCode: 'SWISS-2025-06A', availableCount: 2, status: 'open' },
        { id: 'dep-102', packageId: 'pkg-1', departureCode: 'SWISS-2025-07B', availableCount: 8, status: 'open' },
        { id: 'dep-201', packageId: 'pkg-2', departureCode: 'BALI-2025-08A', availableCount: 5, status: 'open' },
      ])
    } else {
      this.departures.set([])
    }
  }
}
