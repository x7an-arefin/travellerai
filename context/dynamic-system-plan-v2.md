# TravellerAI — Fully Dynamic System Plan (v2)
## Environment-Aware Mocks · Proper CRUD Forms · Real API Integration

**Updated:** September 2026
**Supersedes:** `dynamic-system-plan.md`
**Scope:** 7 problem domains + complete 5-sprint implementation roadmap

---

## Problem Domain 1 — Environment-Aware Mock Data Strategy

### The Two Environment Files

```typescript
// src/environments/environment.ts (DEV)
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8787/api/v1',
  authMode: 'mock',
}

// src/environments/environment.prod.ts (PROD)
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.travellerai.com/api/v1',
  authMode: 'api-contract',
}
```

### The Rule

- `production: false` → Mock data allowed as fallback when API unreachable. Show dev banner.
- `production: true` → Surface the real error. Never show fake data.

### Correct Fallback Pattern (all services must use this)

```typescript
async listProperties(): Promise<ApiResult<HotelProperty[]>> {
  const url = this.apiConfig.buildUrl('hotel-properties')
  try {
    const res = await firstValueFrom(
      this.http.get<ListResponse<HotelProperty>>(url).pipe(catchError(() => of(null)))
    )
    if (res !== null) {
      // Backend responded — use real data (even if empty array)
      return { ok: true, data: res.items ?? [], meta: res.meta }
    }
  } catch {}

  // Backend unreachable:
  if (!this.apiConfig.isProduction) {
    console.warn('[DEV] API unreachable — using mock data')
    return { ok: true, data: MOCK_PROPERTIES, isFallback: true }
  }
  // PROD: surface real error
  return { ok: false, data: [], error: 'Could not connect to API. Please try again.' }
}
```

### ApiResult Type Contract

```typescript
// src/app/core/models/api-result.type.ts
export interface ApiResult<T> {
  ok: boolean
  data: T
  meta?: { total: number; page: number; limit: number; hasMore: boolean } | null
  error?: string
  isFallback?: boolean  // true = mock data shown (DEV only)
}
```

### CRITICAL: Never do `if (items.length === 0) return mockData`

Empty array from the backend = the database is genuinely empty. Show an empty state. Do NOT substitute fake data.

### Services That Must Be Fixed

- hotels/data-access/services/hotel-api.service.ts
- vehicles/data-access/services/vehicle-api.service.ts
- workspaces/data-access/services/workspaces-api.service.ts
- bookings/data-access/services/bookings-api.service.ts
- packages/data-access/services/packages-api.service.ts
- departures/data-access/services/departures-api.service.ts
- destinations/data-access/services/destinations-api.service.ts
- providers/data-access/services/providers-api.service.ts
- All other *-api.service.ts files with MOCK_* constants

### Dev Mode Fallback Banner

Every list view that has isFallback=true must show:

```html
@if (isFallbackMode()) {
  <div class="mb-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
    <ng-icon name="lucideAlertTriangle" class="size-3.5 shrink-0" />
    <span><strong>Dev Mode:</strong> Backend unreachable — showing mock data.</span>
  </div>
}
```

---

## Problem Domain 2 — Toast-Instead-of-Form Anti-Pattern

### CRITICAL — Sidebar (found by user)

| File | Line | Method | Current | Fix |
|------|------|--------|---------|-----|
| layout/authenticated/app-sidebar/team-switcher.component.ts | 159 | openAddTeamModal() | toast.info('Workspace onboarding form: Contact admin for operator agency provisioning.') | Navigate to /workspaces?action=create |

### HIGH — Module Primary Action Buttons

| File | Line | Current | Fix |
|------|------|---------|-----|
| hotels/ui/hotels-page.component.ts | 1203 | toast.info('Property registration drawer ready.') | createSheetOpen.set(true) |
| hotels/ui/hotels-page.component.ts | 1207 | toast.info('Opening maintenance ticket creation form...') | maintenanceSheetOpen.set(true) |
| hotels/ui/hotel-property-detail.component.ts | 457 | toast.info('Room Type Creator') | roomTypeSheetOpen.set(true) |
| hotels/ui/hotel-property-detail.component.ts | 463 | toast.info('Media Upload Triggered') | mediaUploadSheetOpen.set(true) |
| vehicles/ui/vehicles-page.component.ts | 868 | toast.info('Vehicle asset registration drawer ready.') | createSheetOpen.set(true) |
| vehicles/ui/vehicles-page.component.ts | 872 | toast.info('Select driver for booking...') | driverSelectSheetOpen.set(true) |
| vehicles/ui/driver-detail.component.ts | 361 | toast.info('Vehicle Assignment') | vehicleAssignSheetOpen.set(true) |
| vehicles/ui/vehicle-routes.component.ts | 454 | toast.info('Adjust Fares') | fareEditSheetOpen.set(true) |
| academy/academy.component.ts | 265 | toast.info('Course curriculum editor opened.') | createCourseSheetOpen.set(true) |
| billing/billing.component.ts | 319 | toast.info('Plan settings opened.') | planSheetOpen.set(true) |
| billing/billing.component.ts | 327 | toast.info('Payment method editor opened.') | paymentMethodSheetOpen.set(true) |
| providers/ui/providers-page.component.ts | 201 | toast.info('Provider Invitation Sent') | Real POST /api/v1/invitations call |

### MEDIUM — Secondary Actions

| File | Fix |
|------|-----|
| bookings/ui/bookings-page.component.ts:265 | GET /api/v1/bookings/:id/voucher-pdf then window.open(url) |
| bookings/ui/bookings-page.component.ts:287 | Open confirmation dialog + PATCH /api/v1/bookings/:id/status |
| hotels/ui/hotel-reservations.component.ts:499 | Call PDF API or window.print() |

---

## Problem Domain 3 — Workspaces Module Full Dynamic Wiring

### Current Problems

1. listWorkspaces(): if (items.length === 0) return this.mockWorkspaces — fake data when DB is empty
2. createWorkspace(): catchError(() => of(item)) — silently fakes success when API fails
3. ngOnInit() uses Observable subscription not async/await pattern
4. team-switcher openAddTeamModal() shows useless toast

### Workspaces Service — Complete Rewrite Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class WorkspacesApiService {
  async list(): Promise<ApiResult<WorkspaceItem[]>> {
    const url = this.apiConfig.buildUrl('providers')
    try {
      const res = await firstValueFrom(
        this.http.get<{ items: any[]; meta: any }>(url, {
          params: { limit: '50', status: 'active,pending' }
        }).pipe(catchError(() => of(null)))
      )
      if (res !== null) {
        const items = (res.items ?? []).map(mapProviderToWorkspace)
        return { ok: true, data: items, meta: res.meta }
      }
    } catch {}
    if (!this.apiConfig.isProduction) {
      return { ok: true, data: MOCK_WORKSPACES, isFallback: true }
    }
    return { ok: false, data: [], error: 'Could not load workspaces.' }
  }

  async create(dto: NewWorkspaceDto): Promise<ApiResult<WorkspaceItem>> {
    const url = this.apiConfig.buildUrl('providers')
    try {
      const res = await firstValueFrom(
        this.http.post<any>(url, mapDtoToPayload(dto)).pipe(catchError(() => of(null)))
      )
      if (res !== null) {
        return { ok: true, data: mapProviderToWorkspace(res) }
      }
    } catch {}
    // NEVER fake success in create
    return { ok: false, data: null as any, error: 'Failed to create workspace. Please try again.' }
  }

  async delete(id: string): Promise<ApiResult<void>> { ... }
  async switchContext(workspaceId: string): Promise<void> { ... }
}
```

### Workspaces Component — Required State Signals

```typescript
export class WorkspacesComponent implements OnInit {
  readonly workspaces = signal<WorkspaceItem[]>([])
  readonly isLoading = signal<boolean>(false)
  readonly isEmpty = signal<boolean>(false)
  readonly isFallbackMode = signal<boolean>(false)
  readonly errorMessage = signal<string>('')
  readonly createSheetOpen = signal<boolean>(false)
  readonly isSubmitting = signal<boolean>(false)

  async ngOnInit(): Promise<void> {
    await this.loadWorkspaces()
    // Auto-open create sheet from sidebar navigation
    const action = this.route.snapshot.queryParamMap.get('action')
    if (action === 'create') this.openCreate()
  }

  async loadWorkspaces(): Promise<void> {
    this.isLoading.set(true)
    this.errorMessage.set('')
    try {
      const res = await this.workspacesApi.list()
      this.isFallbackMode.set(res.isFallback ?? false)
      if (res.ok) {
        this.workspaces.set(res.data)
        this.isEmpty.set(res.data.length === 0)
      } else {
        this.errorMessage.set(res.error ?? 'Failed to load workspaces.')
      }
    } finally {
      this.isLoading.set(false)
    }
  }

  async saveWorkspace(): Promise<void> {
    if (this.isSubmitting()) return
    // Validate required fields
    if (!this.newWs.name.trim()) { toast.error('Workspace name is required.'); return }
    if (!this.newWs.contactEmail.trim()) { toast.error('Contact email is required.'); return }
    this.isSubmitting.set(true)
    try {
      const res = await this.workspacesApi.create(this.newWs)
      if (res.ok) {
        toast.success('Workspace "' + res.data.name + '" provisioned! Status: ' + res.data.status)
        this.createSheetOpen.set(false)
        await this.loadWorkspaces()  // Refresh from backend
      } else {
        toast.error(res.error ?? 'Failed to create workspace.')
      }
    } finally {
      this.isSubmitting.set(false)
    }
  }
}
```

### Workspaces Create Form — Required New Fields

The create sheet must collect: Name, Slug (auto-fill), Operator Type (select), Contact Email, Contact Phone, Cloud Region.

### Team Switcher Fix

```typescript
// team-switcher.component.ts
openAddTeamModal(): void {
  // Navigate to workspaces page with auto-open flag
  this.router.navigate(['/workspaces'], { queryParams: { action: 'create' } })
}
```

---

## Problem Domain 4 — ReferenceDataService

All dropdown data must come from one central singleton loaded on app startup.

### Service Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class ReferenceDataService {
  readonly hotels = signal<HotelOption[]>([])
  readonly vehicles = signal<VehicleOption[]>([])
  readonly drivers = signal<DriverOption[]>([])
  readonly packages = signal<PackageOption[]>([])
  readonly destinations = signal<DestinationOption[]>([])
  readonly providers = signal<ProviderOption[]>([])
  readonly categories = signal<CategoryOption[]>([])
  readonly departures = signal<DepartureOption[]>([])

  readonly hotelOptions = computed(() => this.hotels().map(h => ({ label: h.name + ' — ' + h.city, value: h.id })))
  readonly vehicleOptions = computed(() => this.vehicles().map(v => ({ label: v.make + ' ' + v.model + ' (' + v.registrationNumber + ')', value: v.id })))
  readonly driverOptions = computed(() => this.drivers().map(d => ({ label: d.fullName + ' — ' + d.dutyStatus, value: d.id })))
  readonly destinationOptions = computed(() => this.destinations().map(d => ({ label: d.name + ', ' + d.country, value: d.id })))
  readonly packageOptions = computed(() => this.packages().map(p => ({ label: p.title, value: p.id })))
  readonly departureOptions = computed(() => this.departures().filter(d => d.status === 'open' && d.availableCount > 0).map(d => ({ label: d.departureCode + ' — ' + d.availableCount + ' seats', value: d.id })))

  async loadAll(): Promise<void> { ... }

  async invalidate(entity: string): Promise<void> {
    // Re-fetches and updates just that entity's signal
    // Called by feature components after any CRUD mutation
  }
}
```

### APP_INITIALIZER Registration

```typescript
// app.config.ts
{
  provide: APP_INITIALIZER,
  useFactory: (refData: ReferenceDataService) => () => refData.loadAll(),
  deps: [ReferenceDataService],
  multi: true,
}
```

### Cascade After Mutations

Every create/update/delete must call invalidate:

```typescript
async createHotel(): Promise<void> {
  const res = await this.hotelApi.create(form)
  if (res.ok) {
    toast.success('Hotel created!')
    await this.refData.invalidate('hotels')  // ← All dropdowns update instantly
    await this.loadHotels()
  }
}
```

---

## Problem Domain 5 — Empty States and Loading States

Every list/table view requires exactly 3 states:

### 1. Loading (Skeleton)

```html
@if (isLoading()) {
  <div class="space-y-3">
    @for (i of [1,2,3,4,5]; track i) {
      <div class="h-16 w-full rounded-xl bg-muted/40 animate-pulse"></div>
    }
  </div>
}
```

### 2. Error with Retry

```html
@else if (errorMessage()) {
  <div class="flex flex-col items-center py-16 gap-3 text-center">
    <ng-icon name="lucideAlertCircle" class="size-8 text-destructive opacity-70" />
    <p class="font-semibold text-sm">{{ errorMessage() }}</p>
    <button hlmBtn variant="outline" size="sm" (click)="loadData()" class="gap-1.5 cursor-pointer">
      <ng-icon name="lucideRefreshCw" class="size-3.5" /> Retry
    </button>
  </div>
}
```

### 3. Empty State with CTA

```html
@else if (isEmpty()) {
  <div class="flex flex-col items-center py-16 gap-3 text-center">
    <div class="size-14 rounded-2xl bg-muted flex items-center justify-center">
      <ng-icon name="[entity-icon]" class="size-7 text-muted-foreground/60" />
    </div>
    <h3 class="font-semibold text-foreground">No [entities] yet</h3>
    <p class="text-xs text-muted-foreground max-w-xs leading-relaxed">
      Once added, [entity] will appear automatically in all related dropdowns and booking flows.
    </p>
    <button hlmBtn (click)="openCreate()" class="mt-1 cursor-pointer gap-1.5">
      <ng-icon name="lucidePlus" class="size-3.5" /> Add First [Entity]
    </button>
  </div>
}
```

### Empty State Messages

| Entity | Message |
|--------|---------|
| Hotels | "No hotel properties registered yet. Add your first hotel to make it bookable in Search and Checkout." |
| Vehicles | "No vehicles in the fleet yet. Register your first vehicle to enable airport transfers and rentals." |
| Drivers | "No drivers registered yet. Add drivers to assign them to vehicles and bookings." |
| Packages | "No travel packages published yet. Create your first package to appear in traveler searches." |
| Departures | "No departures scheduled. Add departures to allow travelers to book specific dates." |
| Destinations | "No destinations added yet. Add destinations to enable location filtering in Search." |
| Workspaces | "No operator workspaces found. Add your first agency workspace to begin operations." |
| Bookings | "No bookings yet. Bookings appear here as travelers complete purchases." |

---

## Problem Domain 6 — Search Page

### Current: 6 hardcoded option tags, static results array
### Fix:

```typescript
// Dropdown from live data
readonly destinationOptions = this.refData.destinationOptions  // signal

// Real parallel search
async search(): Promise<void> {
  this.isSearching.set(true)
  const [hotels, vehicles, packages] = await Promise.allSettled([
    this.hotelApi.listProperties({ destinationId: this.selectedDestId, ... }),
    this.vehicleApi.list({ availableFrom: this.searchDate }),
    this.packagesApi.list({ destinationId: this.selectedDestId, ... }),
  ])
  const results = [...mapHotels(hotels), ...mapVehicles(vehicles), ...mapPackages(packages)]
  this.searchResults.set(results)
  this.isSearching.set(false)
}

// Add to cart
addToCart(result: SearchResult): void {
  this.cartFacade.addItem(UniversalCartFacade.fromResult(result))
}
```

---

## Problem Domain 7 — UniversalCartFacade

### Current: Starts with 3 hardcoded fake items
### Fix: Start empty, populate from user actions

```typescript
@Injectable({ providedIn: 'root' })
export class UniversalCartFacade {
  readonly items = signal<CartItem[]>(this.loadFromStorage())  // ← empty by default
  readonly totalItems = computed(() => this.items().length)
  readonly subtotal = computed(() => this.items().reduce((s, i) => s + i.totalPrice, 0))

  addItem(item: CartItem): void {
    if (this.items().some(i => i.id === item.id)) {
      toast.info('"' + item.title + '" is already in your cart.')
      return
    }
    const updated = [...this.items(), item]
    this.items.set(updated)
    this.persist(updated)
    toast.success('"' + item.title + '" added to cart!')
  }

  removeItem(id: string): void { ... }
  clearCart(): void { ... }

  static fromHotelResult(hotel: HotelOption, form: BookingForm): CartItem { ... }
  static fromVehicleResult(vehicle: VehicleOption, form: VehicleForm): CartItem { ... }
  static fromPackageResult(pkg: PackageOption, departure: DepartureOption): CartItem { ... }

  private loadFromStorage(): CartItem[] {
    try { return JSON.parse(localStorage.getItem('travellerai_cart_v2') ?? '[]') } catch { return [] }
  }
  private persist(items: CartItem[]): void {
    try { localStorage.setItem('travellerai_cart_v2', JSON.stringify(items)) } catch {}
  }
}
```

---

## 5-Sprint Implementation Roadmap

### Sprint 1 — Foundation (Days 1-3)

1. Create ApiResult<T> type + PaginationMeta (core/models/api-result.type.ts)
2. Create ReferenceDataService with loadAll() + invalidate() (core/services/reference-data.service.ts)
3. Create reference-data.types.ts (HotelOption, VehicleOption, DriverOption, etc.)
4. Wire APP_INITIALIZER in app.config.ts
5. Fix UniversalCartFacade — start empty, addItem(), localStorage persistence
6. Create FallbackBannerComponent (dev warning shown when isFallback=true)
7. Create EmptyStateComponent (parameterized icon, title, description, CTA)

### Sprint 2 — Fix Toast Anti-Patterns (Days 4-5)

8. team-switcher: openAddTeamModal() → navigate to /workspaces?action=create
9. WorkspacesApiService full rewrite (async/await, env-aware mock, no fake success)
10. WorkspacesComponent full rewrite (loading/empty/error + create form with all fields)
11. hotels-page: openPropertyRegistration() → createSheetOpen.set(true) + real sheet UI
12. hotels-page: openMaintenanceTicket() → maintenanceSheetOpen.set(true) + real sheet UI
13. hotel-property-detail: openRoomTypeCreator() → real sheet
14. vehicles-page: registration + driver-select: open real sheets
15. driver-detail: vehicle assignment → real assignment form
16. billing: plan settings + payment method → real sheets

### Sprint 3 — Core Entity CRUD (Days 6-10)

17. Fix all *-api.service.ts fallback pattern (env-aware, never fake empty state)
18. Hotels: full CRUD + refData.invalidate('hotels') after every mutation
19. Vehicles: full CRUD + driver assignment via refData.driverOptions()
20. Packages: dynamic category/destination/provider selects from refData
21. Departures: dynamic package select, seat count decrement on booking
22. Destinations: CRUD + refData.invalidate('destinations')
23. Providers/Categories: CRUD

### Sprint 4 — Search & Checkout (Days 11-13)

24. Search: destination dropdown from refData.destinationOptions
25. Search: real parallel API queries (hotels + vehicles + packages)
26. Search: "Add to Cart" calls cartFacade.addItem()
27. Checkout: real cart display (no hardcoded items)
28. Booking sheet: shared BookingSheetComponent for hotel/vehicle/package

### Sprint 5 — Dashboard, Bookings, Polish (Days 14-16)

29. Dashboard widgets: empty states, real API data, no hardcoded fallback arrays
30. Bookings filter dropdowns: from refData signals
31. Voucher download: real PDF endpoint
32. Cancellation: confirmation dialog + real PATCH call
33. Audit ALL remaining toast.info for placeholder patterns
34. Loading skeletons on all tables/lists
35. Retry buttons on all error states

---

## Coding Rules Summary

### ALWAYS DO

```
1. Env-aware fallback: if (!isProduction) return mock + isFallback:true; else return error
2. invalidate() after mutations: await this.refData.invalidate('hotels')
3. Three state signals: isLoading, isEmpty, errorMessage
4. Prevent double-submit: isSubmitting signal, check at top of method
5. Open form on actions: openCreate() { createSheetOpen.set(true) }
6. Reload after CRUD: if (res.ok) { await this.loadData() }
```

### NEVER DO

```
1. Never toast.info() instead of opening a form sheet
2. Never if (items.length === 0) return mockData — empty = empty!
3. Never catchError(() => of(fakeSuccess)) — surface real errors
4. Never hardcode <option> elements — use ngFor over refData signals
5. Never start cart with pre-filled items
```
