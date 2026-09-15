# Dynamic System Architecture Plan
## TravellerAI — From Static Templates to Fully Dynamic Platform

**Document Status:** Implementation Roadmap  
**Target:** Full end-to-end dynamism — every dropdown, list, form, CRUD action, and booking flow driven by live backend data  
**Date:** September 2026

---

## 1. Problem Statement

### The Core Issue: Two Layers of Static Data

The current system has **two distinct layers** of hardcoded data that must be eliminated:

#### Layer 1 — Service-Level Mock Arrays (High Priority)
Every API service file defines a `MOCK_*` constant array at the module level. When the backend is unavailable, *or always*, the service returns this static data. Example:

```typescript
// ❌ CURRENT: hotel-api.service.ts
const MOCK_PROPERTIES: HotelProperty[] = [
  { id: 'prop-101', name: 'Grand Sylhet Resort & Spa', ... },
  { id: 'prop-102', name: 'Tea Garden Eco-Lodge Retreat', ... },
]

async listProperties(): Promise<...> {
  const res = await firstValueFrom(this.http.get(...))
  if (res?.items?.length > 0) return res   // Only real if backend returns data
  return { ok: true, data: MOCK_PROPERTIES } // ← Otherwise always static
}
```

**The Problem:** When the backend returns an empty array (new system with no data), the UI shows mock data instead of prompting the admin to add real data. Worse, when an admin adds a new hotel in the Hotels module, it will never show up in the Search dropdown or Checkout cart because those components render the same `MOCK_PROPERTIES` array, not a live API call.

#### Layer 2 — Template-Level Hardcoded Options (Medium Priority)
Component templates hardcode `<option>` elements and static arrays directly:

```html
<!-- ❌ CURRENT: search-page.component.ts -->
<select [(ngModel)]="searchDestination">
  <option value="">All Destinations (Global)</option>
  <option value="Sylhet">Sylhet & Tea Highlands</option>
  <option value="Cox's Bazar">Cox's Bazar Long Beach</option>
  <!-- hardcoded — never updates when admin adds a new destination -->
</select>
```

```typescript
// ❌ CURRENT: cart facade
readonly items = signal<CartItem[]>([
  { id: 'cart-1', providerName: 'Grand Sylhet 5-Star Resort & Spa', ... },
])
// Cart is pre-filled with static items, not built dynamically from search results
```

### The Ripple Effect

When a superadmin adds a new hotel (`POST /api/v1/hotel-properties`):
- ❌ It does NOT appear in the Search page destination dropdown
- ❌ It does NOT appear in the booking/checkout form hotel selector  
- ❌ It does NOT appear in the Dashboard "Top Properties" widget
- ❌ It does NOT get a booking form — because the booking form is also static

**The fix is systemic.** Every entity (Hotel, Vehicle, Driver, Package, Destination, Departure) must follow a real-time data lifecycle.

---

## 2. The Target Architecture: Fully Dynamic Data Flow

### The Golden Rule

> Every list, dropdown, table, and form must fetch data from the backend API on component mount. Static arrays serve ONLY as TypeScript type reference examples — never as rendered data.

### Data Flow for Every Entity

```
Superadmin creates Hotel via Hotels CRUD page
          ↓
POST /api/v1/hotel-properties → Backend DB
          ↓
HotelApiService.list() → returns updated list
          ↓
┌─────────────────────────────────────────────┐
│  All consumers re-fetch or use shared state │
├─────────────────────────────────────────────┤
│  Search page → hotel dropdown options       │
│  Packages page → hotel selector in form     │
│  Checkout cart → available stays to book    │
│  Dashboard → top properties widget          │
│  Bookings page → hotel filter dropdown      │
│  Calendar → departure linked to hotel       │
└─────────────────────────────────────────────┘
```

---

## 3. Core Architecture: Reference Data Services

### 3.1 The `ReferenceDataService` — Central Lookup Cache

Create a **singleton Angular service** that loads all core entity lists on app startup and exposes them as signals. This eliminates N+1 API calls for dropdowns across the app.

**File:** `src/app/core/services/reference-data.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class ReferenceDataService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)

  // === Signals exposed to all consumers ===
  readonly hotels = signal<HotelOption[]>([])
  readonly vehicles = signal<VehicleOption[]>([])
  readonly drivers = signal<DriverOption[]>([])
  readonly packages = signal<PackageOption[]>([])
  readonly destinations = signal<DestinationOption[]>([])
  readonly providers = signal<ProviderOption[]>([])
  readonly categories = signal<CategoryOption[]>([])
  readonly departures = signal<DepartureOption[]>([])
  
  // Loading states
  readonly isLoaded = signal<boolean>(false)
  readonly isLoading = signal<boolean>(false)

  // === Computed dropdown options ===
  readonly hotelOptions = computed(() =>
    this.hotels().map(h => ({ label: h.name, value: h.id }))
  )
  readonly vehicleOptions = computed(() =>
    this.vehicles().map(v => ({ label: `${v.make} ${v.model} (${v.registrationNumber})`, value: v.id }))
  )
  readonly driverOptions = computed(() =>
    this.drivers().map(d => ({ label: d.fullName, value: d.id }))
  )
  readonly destinationOptions = computed(() =>
    this.destinations().map(d => ({ label: `${d.name}, ${d.country}`, value: d.id }))
  )
  readonly packageOptions = computed(() =>
    this.packages().map(p => ({ label: p.title, value: p.id }))
  )
  readonly departureOptions = computed(() =>
    this.departures().map(d => ({ label: `${d.departureCode} (${d.availableCount} seats)`, value: d.id }))
  )

  /** Load all reference data in parallel on app start */
  async loadAll(): Promise<void> {
    if (this.isLoaded() || this.isLoading()) return
    this.isLoading.set(true)
    try {
      const [hotels, vehicles, drivers, packages, destinations, providers, categories, departures] =
        await Promise.allSettled([
          this.fetchList<HotelOption>('hotel-properties', { status: 'active' }),
          this.fetchList<VehicleOption>('vehicles', { status: 'active' }),
          this.fetchList<DriverOption>('drivers', { status: 'active' }),
          this.fetchList<PackageOption>('packages', { status: 'published' }),
          this.fetchList<DestinationOption>('destinations', { status: 'active' }),
          this.fetchList<ProviderOption>('providers', { status: 'active' }),
          this.fetchList<CategoryOption>('categories'),
          this.fetchList<DepartureOption>('departures', { status: 'open' }),
        ])

      if (hotels.status === 'fulfilled') this.hotels.set(hotels.value)
      if (vehicles.status === 'fulfilled') this.vehicles.set(vehicles.value)
      if (drivers.status === 'fulfilled') this.drivers.set(drivers.value)
      if (packages.status === 'fulfilled') this.packages.set(packages.value)
      if (destinations.status === 'fulfilled') this.destinations.set(destinations.value)
      if (providers.status === 'fulfilled') this.providers.set(providers.value)
      if (categories.status === 'fulfilled') this.categories.set(categories.value)
      if (departures.status === 'fulfilled') this.departures.set(departures.value)
      
      this.isLoaded.set(true)
    } finally {
      this.isLoading.set(false)
    }
  }

  /** 
   * Invalidate and reload a specific entity after CRUD operations.
   * Called by feature modules after create/update/delete.
   */
  async invalidate(entity: 'hotels' | 'vehicles' | 'drivers' | 'packages' | 'destinations' | 'departures' | 'all'): Promise<void> {
    if (entity === 'all') { await this.loadAll(); return }
    const endpointMap = {
      hotels: 'hotel-properties',
      vehicles: 'vehicles',
      drivers: 'drivers',
      packages: 'packages',
      destinations: 'destinations',
      departures: 'departures',
    }
    const fresh = await this.fetchList<any>(endpointMap[entity])
    ;(this[entity] as WritableSignal<any[]>).set(fresh)
  }

  private async fetchList<T>(endpoint: string, params?: Record<string, string>): Promise<T[]> {
    const url = this.apiConfig.buildUrl(endpoint)
    try {
      const res = await firstValueFrom(
        this.http.get<{ items: T[] }>(url, { params }).pipe(catchError(() => of(null)))
      )
      return res?.items ?? []
    } catch {
      return []
    }
  }
}
```

### 3.2 App Initialization — Load Reference Data on Startup

**File:** `src/app/app.config.ts`

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    // ... existing providers
    {
      provide: APP_INITIALIZER,
      useFactory: (refData: ReferenceDataService) => () => refData.loadAll(),
      deps: [ReferenceDataService],
      multi: true,
    },
  ],
}
```

This ensures that by the time any route loads, all dropdown data is already available.

### 3.3 Lightweight Option Types

**File:** `src/app/core/models/reference-data.types.ts`

```typescript
export interface HotelOption {
  id: string
  name: string
  city: string
  country: string
  starRating: number
  coverImageUrl: string
  startingPrice: number
  status: string
}

export interface VehicleOption {
  id: string
  make: string
  model: string
  registrationNumber: string
  category: string
  seatingCapacity: number
  dailyRate: number
  isAvailableForRental: boolean
  photos: string[]
}

export interface DriverOption {
  id: string
  fullName: string
  phone: string
  dutyStatus: string
  overallRating: number
  vehicleId?: string
}

export interface PackageOption {
  id: string
  title: string
  slug: string
  productType: string
  basePrice: number
  currency: string
  featuredImage: string
  rating: number
  status: string
}

export interface DestinationOption {
  id: string
  name: string
  slug: string
  country: string
  coverImage: string
  isFeatured: boolean
}

export interface DepartureOption {
  id: string
  packageId: string
  departureCode: string
  capacity: number
  bookedCount: number
  availableCount: number
  priceOverride?: number
  status: string
}

export interface ProviderOption {
  id: string
  name: string
  type: string
}

export interface CategoryOption {
  id: string
  name: string
  slug: string
}
```

---

## 4. Module-by-Module Implementation Plan

### 4.1 Search Page — Dynamic Destination & Category Dropdowns

**Problem:** `<option>` elements are hardcoded in the template  
**File:** `src/app/features/search/search-page.component.ts`

**Before:**
```html
<select [(ngModel)]="searchDestination">
  <option value="">All Destinations (Global)</option>
  <option value="Sylhet">Sylhet & Tea Highlands</option>
  <!-- 5 more hardcoded options... -->
</select>
```

**After:**
```typescript
// In component class
private readonly refData = inject(ReferenceDataService)
readonly destinations = this.refData.destinations    // live signal
readonly packages = this.refData.packages            // live signal

// Search results: call real API
readonly searchResults = signal<SearchExperienceItem[]>([])
readonly isSearching = signal<boolean>(false)

async performSearch(): Promise<void> {
  this.isSearching.set(true)
  try {
    const res = await this.searchApi.search({
      destination: this.searchDestination,
      date: this.searchDate,
      serviceType: this.selectedServiceType(),
      keyword: this.searchKeyword,
    })
    this.searchResults.set(res.data ?? [])
  } finally {
    this.isSearching.set(false)
  }
}
```

```html
<!-- In template -->
<select [(ngModel)]="searchDestination">
  <option value="">All Destinations</option>
  @for (dest of destinations(); track dest.id) {
    <option [value]="dest.id">{{ dest.name }}, {{ dest.country }}</option>
  }
</select>
```

The search results grid (`@for (exp of experiences(); track exp.id)`) must be replaced with `@for (exp of searchResults(); track exp.id)` powered by a real `SearchApiService.search()` call that queries `/api/v1/packages`, `/api/v1/hotel-properties`, and `/api/v1/vehicles` in parallel.

### 4.2 Hotel Module — Full CRUD + Auto-Booking Flow

**Current State:** Hotel list uses `MOCK_PROPERTIES` fallback permanently  
**Files to Change:**
- `src/app/features/hotels/data-access/services/hotel-api.service.ts`
- `src/app/features/hotels/ui/hotel-list.component.ts` *(or equivalent)*

**Step 1: Fix the API service — remove static fallback as default**

```typescript
// ✅ NEW PATTERN: Only use fallback if explicitly in offline mode
async listProperties(params?: ListParams): Promise<ApiResult<HotelProperty[]>> {
  const url = this.apiConfig.buildUrl('hotel-properties')
  const startMs = Date.now()
  try {
    const res = await firstValueFrom(
      this.http.get<ListResponse<HotelProperty>>(url, { params }).pipe(catchError(() => of(null)))
    )
    if (res) {
      return { ok: true, data: res.items, meta: res.meta, latencyMs: Date.now() - startMs }
    }
  } catch {}
  
  // Only use mock data if explicitly in development mode with no backend
  if (!this.apiConfig.isProduction) {
    return { ok: true, data: MOCK_PROPERTIES, meta: null, isFallback: true }
  }
  return { ok: false, data: [], error: 'Could not reach backend' }
}
```

**Step 2: After hotel CRUD success, invalidate reference data**

```typescript
async createHotel(payload: CreateHotelPayload): Promise<void> {
  const res = await this.hotelApi.createProperty(payload)
  if (res.ok) {
    toast.success(`Hotel "${payload.name}" created!`)
    // ← This makes the new hotel immediately appear in all dropdowns
    await this.refData.invalidate('hotels')
    await this.loadHotels()    // refresh local list
  }
}
```

**Step 3: Hotel Booking Flow — each hotel gets a full booking sheet**

When a user clicks "Book" on a hotel from the search page or hotel list, a booking sheet opens. The sheet pre-fills with the selected hotel's data:

```typescript
// In search-page or hotel-list component
openBookingSheet(hotel: HotelOption): void {
  this.selectedHotel.set(hotel)
  this.bookingSheetOpen.set(true)
}

// When user confirms booking
async confirmBooking(): Promise<void> {
  const hotel = this.selectedHotel()!
  const payload: CreateBookingPayload = {
    entityType: 'hotel_stay',
    entityId: hotel.id,
    guestName: this.bookingForm.guestName,
    guestEmail: this.bookingForm.guestEmail,
    checkIn: this.bookingForm.checkIn,
    checkOut: this.bookingForm.checkOut,
    guests: this.bookingForm.guests,
    totalAmount: this.calculatedTotal(),
    currency: 'USD',
  }
  const res = await this.bookingsApi.create(payload)
  if (res.ok) {
    toast.success(`Booking confirmed! Reference: ${res.data.bookingReference}`)
    this.bookingSheetOpen.set(false)
    await this.cartFacade.addBookingToCart(res.data)   // Adds to checkout cart
  }
}
```

### 4.3 Vehicle Module — Full CRUD + Driver Assignment + Booking

**Current State:** `MOCK_VEHICLES` array used; driver dropdown is hardcoded  
**Key Changes:**

```typescript
// vehicles.component.ts - Driver dropdown must be dynamic
private readonly refData = inject(ReferenceDataService)

// Use reference data signals in template
readonly driverOptions = this.refData.driverOptions   // live computed signal

// After creating/updating a vehicle, invalidate vehicle cache
async saveVehicle(): Promise<void> {
  const res = this.editingVehicle()
    ? await this.vehicleApi.update(this.editingVehicle()!.id, this.form)
    : await this.vehicleApi.create(this.form)
  
  if (res.ok) {
    await this.refData.invalidate('vehicles')  // ← All dropdowns update
    await this.loadVehicles()
  }
}
```

**Vehicle Booking Flow:**
- `/api/v1/vehicle-bookings` → POST with `vehicleId`, `driverId`, `pickupDate`, `dropoffDate`, `guestId`
- The Checkout page must create `CartItem` objects from live search results, not from a static array

**Driver Assignment:**
- When assigning a driver to a vehicle, the driver dropdown comes from `ReferenceDataService.driverOptions()`
- After assignment, call `refData.invalidate('drivers')` and `refData.invalidate('vehicles')`

### 4.4 Package Module — Dynamic Departures, Destinations, Provider

**Current State:** Package form has hardcoded `categoryOptions`, hardcoded destination selects  
**Key Changes:**

```typescript
// packages.component.ts
private readonly refData = inject(ReferenceDataService)

// Form selects wired to live signals
readonly categoryOptions = this.refData.categories().map(c => ({ label: c.name, value: c.id }))
readonly destinationOptions = this.refData.destinationOptions   // computed signal
readonly providerOptions = this.refData.providers().map(p => ({ label: p.name, value: p.id }))
```

**Package → Departure → Booking Chain:**
```
Admin creates Package → sets destinations, categories, pricing
Admin creates Departure for that Package (date, capacity, price)
Customer searches → finds Package
Customer selects Departure date
Customer books → Booking created with departureId + packageId
Departure.bookedCount increments
Departure.availableCount decrements
```

### 4.5 Checkout / Cart — Dynamic Cart Built from Search Results

**Current State:** `UniversalCartFacade.items` is hardcoded with 3 static items  
**Target:** Cart is empty on load; items are added when user clicks "Book" from search/detail pages

```typescript
// ✅ NEW: universal-cart.facade.ts
@Injectable({ providedIn: 'root' })
export class UniversalCartFacade {
  // Cart starts EMPTY — items added via addItem()
  readonly items = signal<CartItem[]>([])
  
  // Persist cart to localStorage for session continuity
  constructor() {
    const saved = this.loadFromStorage()
    if (saved.length) this.items.set(saved)
  }

  addItem(item: CartItem): void {
    if (this.items().find(i => i.id === item.id)) {
      toast.info(`"${item.title}" is already in your cart.`)
      return
    }
    const updated = [...this.items(), item]
    this.items.set(updated)
    this.saveToStorage(updated)
    toast.success(`"${item.title}" added to cart!`)
  }

  removeItem(id: string): void {
    const updated = this.items().filter(i => i.id !== id)
    this.items.set(updated)
    this.saveToStorage(updated)
  }

  clearCart(): void {
    this.items.set([])
    this.saveToStorage([])
  }

  // Build CartItem from a hotel booking
  static fromHotelBooking(hotel: HotelOption, form: BookingForm): CartItem {
    return {
      id: `cart-hotel-${hotel.id}-${Date.now()}`,
      type: 'hotel_stay',
      providerId: hotel.id,
      providerName: hotel.name,
      title: form.roomType || 'Hotel Stay',
      subtitle: `${form.nights} Nights • ${form.guests} Guests`,
      imageUrl: hotel.coverImageUrl,
      startDate: form.checkIn,
      endDate: form.checkOut,
      quantityOrGuests: form.guests,
      unitPrice: hotel.startingPrice,
      totalPrice: hotel.startingPrice * form.nights,
      cancellationPolicy: 'flexible_24h',
      metadata: { hotelId: hotel.id },
    }
  }

  // Build CartItem from a vehicle booking
  static fromVehicleBooking(vehicle: VehicleOption, form: VehicleBookingForm): CartItem {
    return {
      id: `cart-veh-${vehicle.id}-${Date.now()}`,
      type: 'vehicle_rental',
      providerId: vehicle.id,
      providerName: `${vehicle.make} ${vehicle.model}`,
      title: `${vehicle.make} ${vehicle.model} Rental`,
      subtitle: `${form.days} Days • ${vehicle.registrationNumber}`,
      imageUrl: vehicle.photos[0] ?? '',
      startDate: form.pickupDate,
      endDate: form.returnDate,
      quantityOrGuests: 1,
      unitPrice: vehicle.dailyRate,
      totalPrice: vehicle.dailyRate * form.days,
      cancellationPolicy: 'flexible_24h',
      metadata: { vehicleId: vehicle.id, driverId: form.driverId },
    }
  }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem('travellerai_cart')
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  }

  private saveToStorage(items: CartItem[]): void {
    try { localStorage.setItem('travellerai_cart', JSON.stringify(items)) } catch {}
  }
}
```

### 4.6 Dashboard Widgets — Real Data from Real Entities

**Current State:** `recent-bookings.component.ts` has hardcoded fallback data shown when backend has 0 records  
**Change:** Show empty state UI when there are no bookings instead of fake data

```typescript
// dashboard/components/recent-bookings.component.ts
async loadRecentBookings(): Promise<void> {
  this.isLoading.set(true)
  try {
    const res = await this.bookingsApi.list(undefined, 5)
    // ✅ If backend returns empty array, show empty state — not mock data
    this.bookings.set(res.ok ? res.data.items.map(mapToBookingQueueItem) : [])
    this.isEmpty.set(this.bookings().length === 0)
  } finally {
    this.isLoading.set(false)
  }
}
```

```html
@if (isEmpty()) {
  <div class="text-center py-12 text-muted-foreground text-sm">
    <ng-icon name="lucideCalendar" class="size-8 mx-auto mb-2 opacity-30" />
    <p class="font-semibold">No bookings yet</p>
    <p class="text-xs mt-1">Bookings will appear here once travelers start booking.</p>
  </div>
} @else {
  @for (booking of bookings(); track booking.reference) { ... }
}
```

### 4.7 Bookings Module — Dynamic Filters and Status Updates

**Target:**
- Package filter dropdown → from `refData.packageOptions()`
- Hotel filter → from `refData.hotelOptions()`  
- Vehicle filter → from `refData.vehicleOptions()`
- Provider filter → from `refData.providers()`
- Status updates → PATCH `/api/v1/bookings/:id/status`

```typescript
// bookings.component.ts
private readonly refData = inject(ReferenceDataService)

// Filter selects driven by live data
readonly packageFilterOptions = this.refData.packageOptions
readonly hotelFilterOptions = this.refData.hotelOptions
```

### 4.8 Departures Module — Dynamic Package & Destination Selects

**Target:**
- When creating a new departure, the Package selector pulls from `refData.packages()`
- After booking, departure `bookedCount` and `availableCount` update in real-time

```typescript
// departure form - package select
readonly packageOptions = this.refData.packageOptions   // computed signal

async createDeparture(form: CreateDepartureForm): Promise<void> {
  const res = await this.departuresApi.create(form)
  if (res.ok) {
    await this.refData.invalidate('departures')  // ← Now shows in booking form dropdowns
    this.loadDepartures()
  }
}
```

### 4.9 Destinations Module — Add New Destination → Appears Everywhere

```typescript
async createDestination(form: CreateDestinationForm): Promise<void> {
  const res = await this.destinationsApi.create(form)
  if (res.ok) {
    // ← This makes the new destination appear in:
    //   Search dropdown, Package form, Hotel form, Departure form
    await this.refData.invalidate('destinations')
    this.loadDestinations()
  }
}
```

---

## 5. Complete CRUD Lifecycle — Every Entity Must Follow This Pattern

Every entity (Hotel, Vehicle, Driver, Package, Destination, Departure, Category, Provider) must implement the following lifecycle in its component:

### 5.1 Standard Component Structure

```typescript
@Component({...})
export class HotelsComponent implements OnInit {
  private readonly hotelApi = inject(HotelApiService)
  private readonly refData = inject(ReferenceDataService)    // ← REQUIRED

  // State
  readonly hotels = signal<HotelProperty[]>([])
  readonly isLoading = signal<boolean>(false)
  readonly isEmpty = signal<boolean>(false)
  readonly selectedHotel = signal<HotelProperty | null>(null)
  readonly createSheetOpen = signal<boolean>(false)
  readonly editSheetOpen = signal<boolean>(false)
  readonly isSubmitting = signal<boolean>(false)

  // Form state
  form = this.emptyForm()

  // Pagination
  readonly meta = signal<PaginationMeta | null>(null)
  currentPage = 1
  
  // ─── Lifecycle ───────────────────────────────────────────────────────────
  async ngOnInit(): Promise<void> {
    await this.loadHotels()
  }

  // ─── List ─────────────────────────────────────────────────────────────────
  async loadHotels(page = 1): Promise<void> {
    this.isLoading.set(true)
    this.isEmpty.set(false)
    try {
      const res = await this.hotelApi.listProperties({ page, limit: 20 })
      this.hotels.set(res.ok ? res.data : [])
      this.meta.set(res.meta ?? null)
      this.isEmpty.set(this.hotels().length === 0)
    } finally {
      this.isLoading.set(false)
    }
  }

  // ─── Create ───────────────────────────────────────────────────────────────
  openCreate(): void {
    this.form = this.emptyForm()
    this.createSheetOpen.set(true)
  }

  async saveCreate(): Promise<void> {
    if (this.isSubmitting()) return
    this.isSubmitting.set(true)
    try {
      const res = await this.hotelApi.createProperty(this.form)
      if (res.ok) {
        toast.success(`Hotel "${this.form.name}" created!`)
        this.createSheetOpen.set(false)
        await this.refData.invalidate('hotels')   // ← Cascade update
        await this.loadHotels()
      } else {
        toast.error(res.error ?? 'Failed to create hotel.')
      }
    } finally {
      this.isSubmitting.set(false)
    }
  }

  // ─── Edit ─────────────────────────────────────────────────────────────────
  openEdit(hotel: HotelProperty): void {
    this.selectedHotel.set(hotel)
    this.form = { ...hotel }
    this.editSheetOpen.set(true)
  }

  async saveEdit(): Promise<void> {
    if (this.isSubmitting() || !this.selectedHotel()) return
    this.isSubmitting.set(true)
    try {
      const res = await this.hotelApi.updateProperty(this.selectedHotel()!.id, this.form)
      if (res.ok) {
        toast.success(`Hotel "${this.form.name}" updated.`)
        this.editSheetOpen.set(false)
        await this.refData.invalidate('hotels')   // ← Cascade update
        await this.loadHotels()
      }
    } finally {
      this.isSubmitting.set(false)
    }
  }

  // ─── Delete ───────────────────────────────────────────────────────────────
  async deleteHotel(hotel: HotelProperty): Promise<void> {
    const res = await this.hotelApi.deleteProperty(hotel.id)
    if (res.ok) {
      toast.success(`Hotel "${hotel.name}" deleted.`)
      await this.refData.invalidate('hotels')   // ← Cascade update
      await this.loadHotels()
    }
  }

  // ─── Booking ──────────────────────────────────────────────────────────────
  openBooking(hotel: HotelProperty): void {
    this.selectedHotel.set(hotel)
    this.bookingSheetOpen.set(true)
  }
  
  // ─── Helpers ──────────────────────────────────────────────────────────────
  private emptyForm(): CreateHotelForm {
    return { name: '', city: '', country: '', starRating: 3, propertyType: 'hotel', ... }
  }
}
```

### 5.2 Empty State Pattern

Every list view must show a proper empty state when there's no data:

```html
@if (isLoading()) {
  <!-- Loading skeleton rows -->
  <div class="space-y-3">
    @for (i of [1,2,3]; track i) {
      <div class="h-16 rounded-lg bg-muted/40 animate-pulse"></div>
    }
  </div>
} @else if (isEmpty()) {
  <!-- Empty state with CTA -->
  <div class="flex flex-col items-center justify-center py-16 text-center gap-3">
    <div class="size-14 rounded-2xl bg-muted flex items-center justify-center">
      <ng-icon name="lucideBuilding2" class="size-7 text-muted-foreground/60" />
    </div>
    <h3 class="font-semibold text-foreground">No hotels added yet</h3>
    <p class="text-xs text-muted-foreground max-w-xs">
      Add your first hotel property. Once added, it will automatically appear
      in search results and become bookable by travelers.
    </p>
    <button hlmBtn (click)="openCreate()" class="mt-2 cursor-pointer gap-1.5">
      <ng-icon name="lucidePlus" class="size-3.5" />
      Add First Hotel
    </button>
  </div>
} @else {
  @for (hotel of hotels(); track hotel.id) {
    <!-- Hotel card -->
  }
}
```

---

## 6. Cross-Module Booking Flow Architecture

### 6.1 Unified Booking Sheet Component

Create a reusable `BookingSheetComponent` that works for hotels, vehicles, and packages:

**File:** `src/app/shared/components/booking-sheet/booking-sheet.component.ts`

```typescript
@Component({
  selector: 'app-booking-sheet',
  standalone: true,
  ...
})
export class BookingSheetComponent {
  @Input() entityType: 'hotel' | 'vehicle' | 'package' = 'hotel'
  @Input() entityId = ''
  @Input() entityName = ''
  @Input() entityImage = ''
  @Input() basePrice = 0
  @Input() isOpen = false
  @Output() closed = new EventEmitter<void>()
  @Output() booked = new EventEmitter<CartItem>()

  // Inject reference data for driver/vehicle dropdowns
  private readonly refData = inject(ReferenceDataService)
  private readonly bookingsApi = inject(BookingsApiService)
  private readonly cartFacade = inject(UniversalCartFacade)

  // Driver options for vehicle bookings
  readonly driverOptions = this.refData.driverOptions   // signal

  // Form state per entity type
  guestName = ''
  guestEmail = ''
  guestPhone = ''
  checkInDate = ''
  checkOutDate = ''
  guestCount = 1
  selectedDriverId = ''

  readonly total = computed(() => {
    if (this.entityType === 'hotel') {
      const nights = this.calculateNights()
      return this.basePrice * nights * this.guestCount
    }
    if (this.entityType === 'vehicle') {
      const days = this.calculateDays()
      return this.basePrice * days
    }
    return this.basePrice
  })

  async confirmBooking(): Promise<void> {
    const res = await this.bookingsApi.create({
      entityType: this.entityType,
      entityId: this.entityId,
      guestName: this.guestName,
      guestEmail: this.guestEmail,
      startDate: this.checkInDate,
      endDate: this.checkOutDate,
      guestCount: this.guestCount,
      driverId: this.selectedDriverId || undefined,
      totalAmount: this.total(),
    })

    if (res.ok) {
      const cartItem = this.buildCartItem(res.data)
      this.cartFacade.addItem(cartItem)
      this.booked.emit(cartItem)
      toast.success(`Booking confirmed! Ref: ${res.data.bookingReference}`)
      this.closed.emit()
    }
  }
}
```

**Usage in Hotels, Vehicles, Packages:**
```html
<app-booking-sheet
  [entityType]="'hotel'"
  [entityId]="selectedHotel()?.id ?? ''"
  [entityName]="selectedHotel()?.name ?? ''"
  [entityImage]="selectedHotel()?.coverImageUrl ?? ''"
  [basePrice]="selectedHotel()?.startingPrice ?? 0"
  [isOpen]="bookingSheetOpen()"
  (closed)="bookingSheetOpen.set(false)"
  (booked)="onBooked($event)"
/>
```

### 6.2 Vehicle + Driver Booking Flow

When booking a vehicle:
1. User selects vehicle from list → opens `BookingSheetComponent` with `entityType="vehicle"`
2. Sheet shows driver dropdown from `refData.driverOptions()` (live, dynamic)
3. User picks driver (optional for self-drive)
4. User sets pickup/return dates
5. Total calculated: `vehicle.dailyRate × days`
6. On confirm: `POST /api/v1/vehicle-bookings` → returns `vehicleBookingId`
7. `CartItem` added to `UniversalCartFacade`
8. Cart → Checkout → Payment flow

### 6.3 Hotel Booking Flow

1. User selects hotel from Search or Hotels page
2. Opens `BookingSheetComponent` with `entityType="hotel"`
3. Picks room type (from `hotelApi.getRoomTypes(hotelId)`)
4. Sets check-in / check-out dates, guest count
5. Total: `roomRate × nights`
6. On confirm: `POST /api/v1/bookings` with hotel entityId
7. Added to cart → checkout

### 6.4 Package + Departure Booking Flow

1. User selects package from Search or Packages page
2. Available departures loaded: `departuresApi.listByPackage(packageId)` → only shows open departures with seats
3. User selects departure date (dropdown from live data)
4. On confirm: `POST /api/v1/bookings` with `departureId` + `packageId`
5. Backend: `departure.bookedCount++`, `departure.availableCount--`
6. If `availableCount === 0` → departure status changes to `closed` → removed from future dropdowns

---

## 7. Form Validation & Data Integrity

### 7.1 Required Validations Per Entity

| Field | Hotel | Vehicle | Driver | Package |
|-------|-------|---------|--------|---------|
| Name / Title | ✅ Required | ✅ Required | ✅ Required | ✅ Required |
| Destination | ✅ Select from live list | — | — | ✅ Select from live list |
| Provider | ✅ Select from live list | ✅ Select from live list | ✅ Select from live list | ✅ Select from live list |
| Pricing | ✅ Min 1 | ✅ Min 1 | — | ✅ Min 1 |
| Status | ✅ Enum | ✅ Enum | ✅ Enum | ✅ Enum |
| Images | ✅ At least 1 URL | ✅ At least 1 URL | — | ✅ At least 1 URL |

### 7.2 Form Pattern

```typescript
readonly formErrors = computed(() => {
  const errors: Record<string, string> = {}
  if (!this.form.name?.trim()) errors['name'] = 'Name is required'
  if (!this.form.destinationId) errors['destinationId'] = 'Select a destination'
  if (!this.form.basePrice || this.form.basePrice < 1) errors['basePrice'] = 'Price must be at least 1'
  return errors
})

readonly isFormValid = computed(() => Object.keys(this.formErrors()).length === 0)
```

---

## 8. Implementation Priority Order

### Sprint 1 — Foundation (Week 1)
1. ✅ Create `ReferenceDataService` with `loadAll()` + `invalidate(entity)`
2. ✅ Create `reference-data.types.ts` with all lightweight option types
3. ✅ Wire `APP_INITIALIZER` in `app.config.ts`
4. ✅ Fix `UniversalCartFacade` — start empty, add `addItem()` / `fromHotelBooking()` / `fromVehicleBooking()`
5. ✅ Create shared `BookingSheetComponent`

### Sprint 2 — Core Entities CRUD (Week 2)
6. ✅ Hotels — full CRUD + `refData.invalidate('hotels')` on every mutation
7. ✅ Vehicles — full CRUD + `refData.invalidate('vehicles')` + driver assignment
8. ✅ Drivers — full CRUD + `refData.invalidate('drivers')`
9. ✅ Destinations — full CRUD + `refData.invalidate('destinations')`
10. ✅ Packages — full CRUD + `refData.invalidate('packages')`
11. ✅ Departures — full CRUD + `refData.invalidate('departures')`

### Sprint 3 — Search & Discovery (Week 3)
12. ✅ Search page — destination/category dropdowns from `refData`
13. ✅ Search results from real API (hotels + vehicles + packages in parallel)
14. ✅ "Add to Cart" button on each search result card
15. ✅ Checkout cart — starts empty, populated by bookings

### Sprint 4 — Dashboard & Cross-Module Widgets (Week 4)
16. ✅ `recent-bookings.component.ts` — empty state instead of mock data
17. ✅ `top-packages.component.ts` — real packages from `refData.packages()`
18. ✅ `travel-analytics.component.ts` — real destinations from `refData.destinations()`
19. ✅ Dashboard KPIs from real API aggregations
20. ✅ Booking module — dynamic entity filter dropdowns

### Sprint 5 — Polish (Week 5)
21. Loading skeleton states on all list/table views
22. Proper error states with retry buttons
23. Confirmation dialogs for delete operations
24. Optimistic UI updates for quick feedback
25. Audit all remaining templates for any residual hardcoded `<option>` values

---

## 9. API Endpoints Required (Backend Verification)

All these endpoints must exist and return paginated list responses:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `GET /api/v1/hotel-properties?status=active&limit=100` | List | Hotel dropdown data |
| `GET /api/v1/vehicles?status=active&limit=100` | List | Vehicle dropdown data |
| `GET /api/v1/drivers?status=active&limit=100` | List | Driver dropdown data |
| `GET /api/v1/packages?status=published&limit=100` | List | Package dropdown data |
| `GET /api/v1/destinations?status=active&limit=100` | List | Destination dropdown data |
| `GET /api/v1/categories?limit=100` | List | Category filter data |
| `GET /api/v1/departures?status=open&limit=100` | List | Available departures |
| `GET /api/v1/providers?status=active&limit=100` | List | Provider dropdown data |
| `POST /api/v1/bookings` | Create | Unified booking creation |
| `GET /api/v1/bookings?limit=5&sort=createdAt:desc` | List | Recent bookings widget |
| `PATCH /api/v1/bookings/:id/status` | Update | Booking status change |

### Response Shape Contract

Every list endpoint must return:
```json
{
  "items": [...],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 100,
    "hasMore": false
  }
}
```

---

## 10. Files to Create / Modify

### New Files
| File | Purpose |
|------|---------|
| `src/app/core/services/reference-data.service.ts` | Central reference data cache |
| `src/app/core/models/reference-data.types.ts` | Lightweight option interfaces |
| `src/app/shared/components/booking-sheet/booking-sheet.component.ts` | Reusable booking UI |
| `src/app/shared/components/booking-sheet/booking-sheet.routes.ts` | Routes (if needed) |
| `src/app/shared/components/empty-state/empty-state.component.ts` | Empty state UI |
| `src/app/shared/components/loading-skeleton/loading-skeleton.component.ts` | Loading skeletons |

### Files to Modify
| File | Change |
|------|--------|
| `src/app/app.config.ts` | Add `APP_INITIALIZER` for `ReferenceDataService.loadAll()` |
| `src/app/features/checkout/data-access/universal-cart.facade.ts` | Start empty, add `addItem()`, `fromHotelBooking()`, `fromVehicleBooking()` |
| `src/app/features/search/search-page.component.ts` | Dynamic destination dropdown, real search results |
| `src/app/features/hotels/data-access/services/hotel-api.service.ts` | Remove persistent mock fallback |
| `src/app/features/hotels/*.component.ts` | Wire CRUD + `refData.invalidate()` + booking sheet |
| `src/app/features/vehicles/data-access/services/vehicle-api.service.ts` | Remove persistent mock fallback |
| `src/app/features/vehicles/*.component.ts` | Wire CRUD + `refData.invalidate()` + driver dropdown |
| `src/app/features/packages/*.component.ts` | Wire CRUD + dynamic destination/category selects |
| `src/app/features/departures/*.component.ts` | Wire CRUD + dynamic package select |
| `src/app/features/destinations/*.component.ts` | Wire CRUD + `refData.invalidate()` |
| `src/app/features/dashboard/components/recent-bookings.component.ts` | Empty state instead of mock fallback |
| `src/app/features/dashboard/components/top-packages.component.ts` | Real packages from refData |
| `src/app/features/dashboard/components/travel-analytics.component.ts` | Real destinations from refData |
| `src/app/features/bookings/*.component.ts` | Dynamic entity filter dropdowns |
| All `*-api.service.ts` files | Remove permanent static fallback pattern |

---

## 11. Coding Standards for This Implementation

### ✅ DO

```typescript
// Always inject ReferenceDataService in entity components
private readonly refData = inject(ReferenceDataService)

// Always call invalidate after mutations
await this.refData.invalidate('hotels')

// Always show empty state when list is empty
readonly isEmpty = computed(() => this.items().length === 0 && !this.isLoading())

// Always have loading state
readonly isLoading = signal<boolean>(false)

// Always prevent double-submit
readonly isSubmitting = signal<boolean>(false)
if (this.isSubmitting()) return
```

### ❌ DON'T

```typescript
// ❌ Never hardcode dropdown options in templates
<option value="Sylhet">Sylhet</option>

// ❌ Never use static fallback as primary data source
if (res.ok) return res
return MOCK_DATA   // ← This becomes the default when backend returns nothing

// ❌ Never start cart/list with pre-filled fake data
readonly items = signal<CartItem[]>([{ id: 'fake-1', ... }])

// ❌ Never skip invalidate after mutations
await this.hotelApi.create(form)
// Missing: await this.refData.invalidate('hotels')
```

---

## 12. Testing Checklist (Per Entity)

After implementing each entity, verify the following workflow end-to-end:

1. **Create** a new Hotel/Vehicle/Driver/Package/Destination
2. **Verify** it appears immediately in the entity's own list (without page reload)
3. **Navigate** to Search page → verify it appears in the destination/entity dropdown
4. **Navigate** to Packages page → verify hotel/destination/category appear in form selects
5. **Navigate** to Bookings page → verify entity appears in filter dropdowns
6. **Click "Book"** from Search/Hotel/Vehicle list → booking sheet opens
7. **Complete booking** → confirm booking reference is returned
8. **Verify** booking appears in Recent Bookings dashboard widget
9. **For packages with departures:** verify `availableCount` decrements after booking
10. **Delete** the entity → verify it disappears from all dropdowns immediately

---

*This plan covers the complete transformation from a template-driven static UI to a fully dynamic, database-driven travel marketplace platform. Each module must independently fetch its data from the backend, share common reference data via `ReferenceDataService`, and propagate changes via `invalidate()` calls after every mutation.*
