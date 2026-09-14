import { Component, OnInit, inject, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowLeft,
  lucideRoute,
  lucideMapPin,
  lucidePlus,
  lucideClock,
  lucideCar,
  lucideDollarSign,
  lucideSlidersHorizontal,
  lucideSearch,
  lucideCheckCircle2,
  lucideX,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmInputImports } from '../../../ui/input/hlm-input.directive'
import { toast } from 'ngx-sonner'

export interface TransferRouteItem {
  id: string
  originName: string
  destinationName: string
  distanceKm: number
  estimatedMinutes: number
  routeCategory: 'airport' | 'intercity' | 'scenic_highland'
  fares: {
    economySedan: number
    executiveSedan: number
    luxurySuv: number
    passengerVan: number
  }
  tollIncluded: boolean
  status: 'active' | 'seasonal' | 'suspended'
}

@Component({
  selector: 'app-vehicle-routes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    TopNavComponent,
    SearchComponent,
    ThemeSwitchComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmInputImports,
  ],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideRoute,
      lucideMapPin,
      lucidePlus,
      lucideClock,
      lucideCar,
      lucideDollarSign,
      lucideSlidersHorizontal,
      lucideSearch,
      lucideCheckCircle2,
      lucideX,
    }),
  ],
  template: `
    <app-header [fixed]="true">
      <app-top-nav class="mr-auto" />
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <app-main>
      <!-- Page Navigation Header -->
      <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <button
            hlmBtn
            variant="ghost"
            size="icon"
            routerLink="/vehicles"
            class="size-9 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ng-icon name="lucideArrowLeft" class="size-4" />
          </button>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold tracking-tight text-foreground">Transfer Routes & Fare Matrix</h1>
              <span hlmBadge variant="outline" class="text-xs">
                {{ routes().length }} Configured Corridors
              </span>
            </div>
            <p class="text-xs text-muted-foreground mt-0.5">
              Fixed-rate point-to-point transfers, airport shuttles, and vehicle class fare tables.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="default"
            size="sm"
            class="gap-1.5 cursor-pointer shadow-xs"
            (click)="isCreateDrawerOpen.set(true)"
          >
            <ng-icon name="lucidePlus" class="size-4" />
            <span>Add Transfer Route</span>
          </button>
        </div>
      </div>

      <!-- Search & Filter Bar -->
      <div class="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="relative flex-1 max-w-sm">
          <ng-icon name="lucideSearch" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            hlmInput
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search by city, airport, or corridor..."
            class="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg"
          />
        </div>

        <div class="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/40 shrink-0">
          <button
            type="button"
            (click)="selectedCategory.set('all')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedCategory() === 'all'"
            [class.shadow-2xs]="selectedCategory() === 'all'"
            [class.text-foreground]="selectedCategory() === 'all'"
            [class.text-muted-foreground]="selectedCategory() !== 'all'"
          >
            All Corridors
          </button>
          <button
            type="button"
            (click)="selectedCategory.set('airport')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedCategory() === 'airport'"
            [class.shadow-2xs]="selectedCategory() === 'airport'"
            [class.text-foreground]="selectedCategory() === 'airport'"
            [class.text-muted-foreground]="selectedCategory() !== 'airport'"
          >
            Airport Transfers
          </button>
          <button
            type="button"
            (click)="selectedCategory.set('intercity')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedCategory() === 'intercity'"
            [class.shadow-2xs]="selectedCategory() === 'intercity'"
            [class.text-foreground]="selectedCategory() === 'intercity'"
            [class.text-muted-foreground]="selectedCategory() !== 'intercity'"
          >
            Intercity Express
          </button>
        </div>
      </div>

      <!-- Routes Master Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @for (r of filteredRoutes(); track r.id) {
          <div hlmCard class="p-5 bg-card border border-border/60 rounded-xl space-y-4 shadow-xs">
            <div class="flex items-start justify-between">
              <div>
                <div class="flex items-center gap-2 font-bold text-base text-foreground">
                  <span>{{ r.originName }}</span>
                  <span class="text-primary font-mono">➔</span>
                  <span>{{ r.destinationName }}</span>
                </div>
                <div class="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                  <span class="flex items-center gap-1">
                    <ng-icon name="lucideRoute" class="size-3.5 text-primary" />
                    {{ r.distanceKm }} km
                  </span>
                  <span class="flex items-center gap-1">
                    <ng-icon name="lucideClock" class="size-3.5 text-muted-foreground" />
                    ~{{ r.estimatedMinutes }} mins
                  </span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-medium">
                    {{ r.tollIncluded ? 'Tolls Included' : 'Tolls Extra' }}
                  </span>
                </div>
              </div>

              <span hlmBadge variant="outline" class="text-[10px] capitalize">
                {{ r.routeCategory.replace('_', ' ') }}
              </span>
            </div>

            <!-- Vehicle Class Pricing Matrix Table -->
            <div class="rounded-lg border border-border/40 overflow-hidden text-xs">
              <table class="w-full text-left">
                <thead class="bg-muted/40 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border/30">
                  <tr>
                    <th class="py-2 px-3">Vehicle Class</th>
                    <th class="py-2 px-3">Typical Model</th>
                    <th class="py-2 px-3 text-right">Fixed Fare</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border/20">
                  <tr>
                    <td class="py-2 px-3 font-medium text-foreground">Economy Sedan</td>
                    <td class="py-2 px-3 text-muted-foreground">Toyota Vios / Corolla</td>
                    <td class="py-2 px-3 text-right font-mono font-bold text-foreground">\${{ r.fares.economySedan }}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 font-medium text-foreground">Executive VIP Sedan</td>
                    <td class="py-2 px-3 text-muted-foreground">Mercedes E-Class / S-Class</td>
                    <td class="py-2 px-3 text-right font-mono font-bold text-primary">\${{ r.fares.executiveSedan }}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 font-medium text-foreground">Luxury SUV (7-Seat)</td>
                    <td class="py-2 px-3 text-muted-foreground">Land Cruiser / Range Rover</td>
                    <td class="py-2 px-3 text-right font-mono font-bold text-foreground">\${{ r.fares.luxurySuv }}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 font-medium text-foreground">Minivan / Van</td>
                    <td class="py-2 px-3 text-muted-foreground">Toyota Alphard / HiAce</td>
                    <td class="py-2 px-3 text-right font-mono font-bold text-foreground">\${{ r.fares.passengerVan }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex items-center justify-between pt-1">
              <span class="text-[11px] text-muted-foreground">
                Assigned Fleet: 14 Active Chauffeurs Available
              </span>
              <button hlmBtn variant="outline" size="sm" class="text-xs h-7 cursor-pointer" (click)="editFares(r)">
                Adjust Fares
              </button>
            </div>
          </div>
        }
      </div>

      <!-- Create Route Modal -->
      @if (isCreateDrawerOpen()) {
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="bg-card border border-border rounded-xl p-6 max-w-lg w-full shadow-lg space-y-4 animate-in fade-in-0 zoom-in-95">
            <div class="flex items-center justify-between pb-2 border-b border-border/40">
              <h3 class="text-base font-bold text-foreground">Create New Transfer Route</h3>
              <button hlmBtn variant="ghost" size="icon" (click)="isCreateDrawerOpen.set(false)">
                <ng-icon name="lucideX" class="size-4" />
              </button>
            </div>

            <div class="space-y-3 text-xs">
              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="font-medium text-foreground">Origin Hub *</label>
                  <input hlmInput [(ngModel)]="newRoute.originName" placeholder="e.g. Zurich Airport (ZRH)" class="w-full text-xs" />
                </div>
                <div class="space-y-1">
                  <label class="font-medium text-foreground">Destination Hub *</label>
                  <input hlmInput [(ngModel)]="newRoute.destinationName" placeholder="e.g. Zermatt Central" class="w-full text-xs" />
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div class="space-y-1">
                  <label class="font-medium text-foreground">Distance (km) *</label>
                  <input hlmInput type="number" [(ngModel)]="newRoute.distanceKm" placeholder="214" class="w-full text-xs font-mono" />
                </div>
                <div class="space-y-1">
                  <label class="font-medium text-foreground">Est. Minutes *</label>
                  <input hlmInput type="number" [(ngModel)]="newRoute.estimatedMinutes" placeholder="185" class="w-full text-xs font-mono" />
                </div>
                <div class="space-y-1">
                  <label class="font-medium text-foreground">Category</label>
                  <select [(ngModel)]="newRoute.routeCategory" class="w-full px-2.5 py-1.5 rounded-md border border-border bg-background text-xs">
                    <option value="airport">Airport Transfer</option>
                    <option value="intercity">Intercity Express</option>
                    <option value="scenic_highland">Scenic Highland</option>
                  </select>
                </div>
              </div>

              <div class="pt-2 border-t border-border/40">
                <h4 class="font-bold text-foreground mb-2">Class Base Fares (USD)</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div class="space-y-1">
                    <label class="text-[10px] text-muted-foreground">Sedan</label>
                    <input hlmInput type="number" [(ngModel)]="newRoute.fares.economySedan" placeholder="120" class="w-full text-xs font-mono" />
                  </div>
                  <div class="space-y-1">
                    <label class="text-[10px] text-muted-foreground">Exec Sedan</label>
                    <input hlmInput type="number" [(ngModel)]="newRoute.fares.executiveSedan" placeholder="195" class="w-full text-xs font-mono" />
                  </div>
                  <div class="space-y-1">
                    <label class="text-[10px] text-muted-foreground">Luxury SUV</label>
                    <input hlmInput type="number" [(ngModel)]="newRoute.fares.luxurySuv" placeholder="280" class="w-full text-xs font-mono" />
                  </div>
                  <div class="space-y-1">
                    <label class="text-[10px] text-muted-foreground">Passenger Van</label>
                    <input hlmInput type="number" [(ngModel)]="newRoute.fares.passengerVan" placeholder="320" class="w-full text-xs font-mono" />
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
              <button hlmBtn variant="outline" size="sm" (click)="isCreateDrawerOpen.set(false)">
                Cancel
              </button>
              <button hlmBtn variant="default" size="sm" (click)="confirmCreateRoute()">
                Save & Publish Route
              </button>
            </div>
          </div>
        </div>
      }
    </app-main>
  `,
})
export class VehicleRoutesComponent implements OnInit {
  readonly isCreateDrawerOpen = signal(false)
  readonly searchQuery = signal('')
  readonly selectedCategory = signal<'all' | 'airport' | 'intercity'>('all')

  readonly routes = signal<TransferRouteItem[]>([
    {
      id: 'rt-1',
      originName: 'Zurich Airport (ZRH)',
      destinationName: 'Zermatt Alpine Hub',
      distanceKm: 215,
      estimatedMinutes: 190,
      routeCategory: 'airport',
      fares: {
        economySedan: 180,
        executiveSedan: 260,
        luxurySuv: 380,
        passengerVan: 440,
      },
      tollIncluded: true,
      status: 'active',
    },
    {
      id: 'rt-2',
      originName: 'Geneva Airport (GVA)',
      destinationName: 'Chamonix-Mont-Blanc',
      distanceKm: 88,
      estimatedMinutes: 75,
      routeCategory: 'airport',
      fares: {
        economySedan: 110,
        executiveSedan: 175,
        luxurySuv: 240,
        passengerVan: 290,
      },
      tollIncluded: true,
      status: 'active',
    },
    {
      id: 'rt-3',
      originName: 'Tokyo Narita (NRT)',
      destinationName: 'Ginza Central Station',
      distanceKm: 68,
      estimatedMinutes: 65,
      routeCategory: 'airport',
      fares: {
        economySedan: 130,
        executiveSedan: 195,
        luxurySuv: 260,
        passengerVan: 310,
      },
      tollIncluded: true,
      status: 'active',
    },
    {
      id: 'rt-4',
      originName: 'Dhaka Hazrat Shahjalal (DAC)',
      destinationName: 'Sylhet Grand City',
      distanceKm: 240,
      estimatedMinutes: 280,
      routeCategory: 'intercity',
      fares: {
        economySedan: 65,
        executiveSedan: 95,
        luxurySuv: 140,
        passengerVan: 160,
      },
      tollIncluded: true,
      status: 'active',
    },
  ])

  readonly newRoute: TransferRouteItem = {
    id: '',
    originName: '',
    destinationName: '',
    distanceKm: 0,
    estimatedMinutes: 0,
    routeCategory: 'airport',
    fares: {
      economySedan: 100,
      executiveSedan: 160,
      luxurySuv: 240,
      passengerVan: 280,
    },
    tollIncluded: true,
    status: 'active',
  }

  readonly filteredRoutes = computed(() => {
    let list = this.routes()
    const cat = this.selectedCategory()
    const query = this.searchQuery().toLowerCase().trim()

    if (cat !== 'all') {
      list = list.filter((r) => r.routeCategory === cat)
    }

    if (query) {
      list = list.filter(
        (r) =>
          r.originName.toLowerCase().includes(query) ||
          r.destinationName.toLowerCase().includes(query)
      )
    }

    return list
  })

  ngOnInit(): void {}

  editFares(route: TransferRouteItem): void {
    toast.info('Adjust Fares', {
      description: `Editing rate table for ${route.originName} ➔ ${route.destinationName}.`,
    })
  }

  confirmCreateRoute(): void {
    if (!this.newRoute.originName || !this.newRoute.destinationName) {
      toast.error('Validation Error', { description: 'Origin and destination hubs are required.' })
      return
    }

    const item: TransferRouteItem = {
      ...this.newRoute,
      id: `rt-${Date.now()}`,
    }

    this.routes.update((prev) => [item, ...prev])
    this.isCreateDrawerOpen.set(false)
    toast.success('Route Published', {
      description: `${item.originName} ➔ ${item.destinationName} added to transfer booking engine.`,
    })
  }
}
