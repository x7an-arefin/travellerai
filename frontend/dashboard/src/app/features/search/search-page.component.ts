import { Component, OnInit, inject, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideSearch,
  lucideMapPin,
  lucideCalendar,
  lucideUsers,
  lucideFilter,
  lucideStar,
  lucideBedDouble,
  lucideCar,
  lucideCompass,
  lucideCheck,
  lucideSparkles,
  lucideArrowRight,
  lucideShoppingCart,
  lucideSlidersHorizontal,
  lucideShieldCheck,
  lucideX,
  lucideCheckCircle2,
  lucideTrendingDown,
  lucideBot,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmInputImports } from '../../ui/input/hlm-input.directive'
import { UniversalCartFacade } from '../checkout/data-access/universal-cart.facade'
import { CartItem, CartItemType } from '../checkout/data-access/models/cart.model'
import { toast } from 'ngx-sonner'
import { SearchExperienceItem, SearchApiService } from './data-access'
import { ReferenceDataService } from '../../core/services/reference-data.service'

@Component({

  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
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
      lucideSearch,
      lucideMapPin,
      lucideCalendar,
      lucideUsers,
      lucideFilter,
      lucideStar,
      lucideBedDouble,
      lucideCar,
      lucideCompass,
      lucideCheck,
      lucideSparkles,
      lucideArrowRight,
      lucideShoppingCart,
      lucideSlidersHorizontal,
      lucideShieldCheck,
      lucideX,
      lucideCheckCircle2,
      lucideTrendingDown,
      lucideBot,
    }),
  ],
  template: `
    <!-- App Header -->
    <app-header [fixed]="true">
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <app-main>
      <!-- Metasearch Hero Header -->
      <div class="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8 space-y-5 shadow-xs">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground uppercase tracking-wider">
              Universal Metasearch Engine
            </span>
            <span class="text-xs text-muted-foreground">• Aggregating 4 Service Verticals</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Discover Stays, Tours, Transfers & Rentals
          </h1>
          <p class="text-xs sm:text-sm text-muted-foreground">
            Search across certified local providers, compare live wholesale and retail pricing, and bundle multi-modal travel into a single cart.
          </p>
        </div>

        <!-- Multi-Tab Category Selector -->
        <div class="flex overflow-x-auto gap-2 border-b border-border/50 pb-3 no-scrollbar text-xs">
          @for (tab of serviceTabs; track tab.id) {
            <button
              type="button"
              (click)="selectedServiceType.set(tab.id)"
              [class]="selectedServiceType() === tab.id ? 'bg-primary text-primary-foreground font-bold shadow-xs' : 'bg-card text-muted-foreground hover:bg-muted border border-border/60'"
              class="px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <ng-icon [name]="tab.icon" class="size-3.5" />
              <span>{{ tab.label }}</span>
            </button>
          }
        </div>

        <!-- Universal Search Inputs Row -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <!-- Destination -->
          <div class="space-y-1">
            <label class="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <ng-icon name="lucideMapPin" class="size-3 text-primary" />
              Destination
            </label>
            <select
              [(ngModel)]="searchDestination"
              (ngModelChange)="onFilterChange()"
              class="w-full rounded-lg border border-input bg-card px-3 py-2 text-xs font-medium text-foreground focus:ring-2 focus:ring-primary shadow-2xs"
            >
              <option value="">All Destinations (Global)</option>
              @for (dest of destinations(); track dest.id) {
                <option [value]="dest.name">{{ dest.name }}{{ dest.country ? ' (' + dest.country + ')' : '' }}</option>
              }
            </select>
          </div>

          <!-- Date Selector -->
          <div class="space-y-1">
            <label class="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <ng-icon name="lucideCalendar" class="size-3 text-primary" />
              Dates
            </label>
            <input
              type="date"
              [(ngModel)]="searchDate"
              class="w-full rounded-lg border border-input bg-card px-3 py-2 text-xs font-medium text-foreground focus:ring-2 focus:ring-primary shadow-2xs"
            />
          </div>

          <!-- Keyword Search -->
          <div class="space-y-1">
            <label class="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <ng-icon name="lucideSearch" class="size-3 text-primary" />
              Keyword Filter
            </label>
            <input
              type="text"
              [(ngModel)]="searchKeyword"
              placeholder="e.g. Resort, SUV, Trek, Airport..."
              class="w-full rounded-lg border border-input bg-card px-3 py-2 text-xs text-foreground focus:ring-2 focus:ring-primary shadow-2xs"
            />
          </div>

          <!-- Action Button -->
          <div class="flex items-end">
            <button
              hlmBtn
              variant="default"
              class="w-full h-9 gap-2 shadow-xs font-bold text-xs cursor-pointer"
            >
              <ng-icon name="lucideSearch" class="size-4" />
              <span>Search Inventory</span>
            </button>
          </div>
        </div>
      </div>

      <!-- AI "Prompt-to-Trip" Instant Itinerary Builder -->
      <div class="my-5 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-background p-5 space-y-3 shadow-xs">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="size-8 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <ng-icon name="lucideSparkles" class="size-4.5" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-foreground">AI "Prompt-to-Trip" Instant Bundle Builder</h3>
              <p class="text-[11px] text-muted-foreground">Type your dream travel request — our multi-modal engine auto-bundles matching Stays, Transfers, and Tours with an automated 12% discount.</p>
            </div>
          </div>
          <button
            hlmBtn
            variant="outline"
            size="sm"
            class="h-7 text-xs gap-1 cursor-pointer"
            (click)="isAiPlannerOpen.set(!isAiPlannerOpen())"
          >
            <ng-icon name="lucideSparkles" class="size-3 text-purple-500" />
            <span>{{ isAiPlannerOpen() ? 'Hide Builder' : 'Open AI Builder' }}</span>
          </button>
        </div>

        @if (isAiPlannerOpen()) {
          <div class="pt-2 space-y-3 border-t border-purple-500/20">
            <div class="flex flex-col sm:flex-row items-center gap-2">
              <input
                hlmInput
                type="text"
                [(ngModel)]="aiTripPrompt"
                placeholder="e.g. 5 days in Switzerland for 2 with luxury mountain view suite, panoramic rail tour, and airport VIP transfer"
                class="flex-1 text-xs w-full"
              />
              <button
                hlmBtn
                variant="default"
                class="h-9 px-4 text-xs font-bold gap-1.5 shrink-0 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-xs"
                (click)="generateAiTrip()"
              >
                <ng-icon name="lucideSparkles" class="size-3.5" />
                <span>Synthesize Multi-Modal Basket</span>
              </button>
            </div>

            @if (aiGeneratedTrip(); as trip) {
              <div class="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 space-y-3 animate-in fade-in-0 duration-300">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs text-foreground flex items-center gap-1.5">
                    <ng-icon name="lucideCheckCircle2" class="size-4 text-emerald-500" />
                    <span>{{ trip.title }}</span>
                  </span>
                  <span class="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                    12% Multi-Modal Bundle Savings Applied
                  </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  @for (item of trip.items; track item.name) {
                    <div class="p-2.5 rounded-lg border border-border/50 bg-card space-y-1">
                      <div class="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span class="capitalize font-semibold text-foreground">{{ item.type }}</span>
                        <span class="font-mono text-primary font-bold">\${{ item.price }}</span>
                      </div>
                      <p class="font-medium text-foreground text-xs line-clamp-1">{{ item.name }}</p>
                      <p class="text-[10px] text-muted-foreground">{{ item.desc }}</p>
                    </div>
                  }
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-purple-500/20">
                  <div class="text-xs">
                    <span class="text-muted-foreground">Individual Item Total: <span class="line-through">\${{ trip.originalPrice }}</span></span>
                    <span class="ml-2 font-extrabold text-foreground text-sm">Bundle Total: \${{ trip.discountedPrice }}</span>
                    <span class="ml-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">(You save \${{ trip.savings }})</span>
                  </div>
                  <button
                    hlmBtn
                    variant="default"
                    size="sm"
                    class="h-8 px-4 text-xs font-bold gap-1 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-xs"
                    (click)="addAllAiItemsToCart(trip)"
                  >
                    <span>Add All 3 Items to Universal Cart & Checkout</span>
                    <ng-icon name="lucideArrowRight" class="size-3.5" />
                  </button>
                </div>
              </div>
            }
          </div>
        }
      </div>

      <!-- Main Results Layout with Filters Sidebar -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <!-- Filter Controls Sidebar -->
        <div hlmCard class="p-5 space-y-5 shadow-2xs lg:sticky lg:top-20">
          <div class="flex items-center justify-between border-b border-border pb-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <ng-icon name="lucideSlidersHorizontal" class="size-4 text-primary" />
              Faceted Filters
            </h3>
            <button
              type="button"
              (click)="resetFilters()"
              class="text-[10px] text-muted-foreground hover:text-primary cursor-pointer"
            >
              Reset All
            </button>
          </div>

          <!-- Free Cancellation Toggle -->
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-foreground">Free 24h Cancellation</span>
            <input
              type="checkbox"
              [(ngModel)]="filterFreeCancellation"
              class="size-4 accent-primary rounded cursor-pointer"
            />
          </div>

          <!-- Min Star / Quality Rating -->
          <div class="space-y-2">
            <span class="text-xs font-bold text-foreground">Minimum Guest Rating</span>
            <div class="grid grid-cols-3 gap-1.5">
              @for (r of [4.5, 4.0, 3.5]; track r) {
                <button
                  type="button"
                  (click)="filterMinRating.set(r)"
                  [class]="filterMinRating() === r ? 'bg-primary text-primary-foreground font-bold' : 'border border-border text-muted-foreground hover:bg-muted'"
                  class="py-1 rounded text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ng-icon name="lucideStar" class="size-3 fill-current text-amber-500" />
                  <span>{{ r }}+</span>
                </button>
              }
            </div>
          </div>

          <!-- Price Range Slider -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs font-semibold text-foreground">
              <span>Max Price</span>
              <span class="text-primary font-bold">\${{ filterMaxPrice() }}</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="25"
              [ngModel]="filterMaxPrice()"
              (ngModelChange)="filterMaxPrice.set($event)"
              class="w-full accent-primary cursor-pointer"
            />
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>\$50</span>
              <span>\$1,000+</span>
            </div>
          </div>

          <!-- Cart Quick View Banner -->
          <div class="rounded-xl border border-primary/20 bg-primary/5 p-3.5 space-y-2 text-xs">
            <div class="flex items-center justify-between font-bold text-foreground">
              <span class="flex items-center gap-1">
                <ng-icon name="lucideShoppingCart" class="size-3.5 text-primary" />
                Universal Cart
              </span>
              <span class="text-primary font-mono">{{ cart.items().length }} Items</span>
            </div>
            <p class="text-[11px] text-muted-foreground">
              Total: <strong>{{ cart.formatMoney(cart.grandTotal()) }}</strong>
            </p>
            <button
              hlmBtn
              variant="default"
              size="sm"
              (click)="goToCheckout()"
              class="w-full h-7 text-xs font-bold shadow-2xs cursor-pointer"
            >
              Go to Checkout
            </button>
          </div>
        </div>

        <!-- Search Results Grid (3 Cols) -->
        <div class="lg:col-span-3 space-y-4">
          <!-- Results Count & Sorting Header -->
          <div class="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>Showing <strong>{{ filteredExperiences().length }}</strong> verified travel experiences</span>
            <span class="text-[11px]">Instant Confirmation via Edge API</span>
          </div>

          <!-- Cards List -->
          <div class="grid gap-4 md:grid-cols-2">
            @for (exp of filteredExperiences(); track exp.id) {
              <div class="rounded-xl border border-border/70 bg-card overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <!-- Image & Badges Overlay -->
                  <div class="relative h-44 overflow-hidden">
                    <img
                      [src]="exp.imageUrl"
                      [alt]="exp.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-3">
                      <div class="flex items-center justify-between">
                        <span
                          class="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider text-white backdrop-blur-md shadow-xs"
                          [class]="exp.type === 'hotel_stay' ? 'bg-primary/90' : exp.type === 'airport_transfer' ? 'bg-blue-600/90' : exp.type === 'vehicle_rental' ? 'bg-amber-600/90' : 'bg-emerald-600/90'"
                        >
                          {{ exp.type.replace('_', ' ') }}
                        </span>

                        <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-xs flex items-center gap-1">
                          <ng-icon name="lucideMapPin" class="size-3 text-primary" />
                          {{ exp.destination }}
                        </span>
                      </div>

                      <div class="flex items-center justify-between text-white">
                        <div class="flex items-center gap-1 text-xs font-bold text-amber-400">
                          <ng-icon name="lucideStar" class="size-3.5 fill-current" />
                          <span>{{ exp.rating }}</span>
                          <span class="text-[10px] text-white/80 font-normal">({{ exp.reviewCount }})</span>
                        </div>

                        @if (exp.freeCancellation) {
                          <span class="text-[9px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/80 text-white">
                            Free 24h Cancel
                          </span>
                        }
                      </div>
                    </div>
                  </div>

                  <!-- Details -->
                  <div class="p-4 space-y-2">
                    <div>
                      <span class="text-[10px] font-medium text-muted-foreground">{{ exp.providerName }}</span>
                      <h4 class="font-bold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
                        {{ exp.title }}
                      </h4>
                      <p class="text-xs text-muted-foreground line-clamp-1">{{ exp.subtitle }}</p>
                    </div>

                    <!-- Highlights Pills -->
                    <div class="flex flex-wrap gap-1 pt-1">
                      @for (hl of exp.highlights; track hl) {
                        <span class="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                          {{ hl }}
                        </span>
                      }
                    </div>
                  </div>
                  <!-- Live OTA Metasearch Price Comparison Accordion -->
                  @if (exp.type === 'hotel_stay') {
                    <div class="px-4 py-2 bg-muted/20 border-t border-border/30 space-y-1.5 text-xs">
                      <div class="flex items-center justify-between cursor-pointer" (click)="toggleOtaRates(exp.id)">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                          <ng-icon name="lucideTrendingDown" class="size-3 text-emerald-500" />
                          Live Metasearch Parity Matrix
                        </span>
                        <span class="text-[10px] text-primary hover:underline font-medium">
                          {{ showPriceComparison()[exp.id] ? 'Hide' : 'Compare 4 OTAs' }}
                        </span>
                      </div>

                      @if (showPriceComparison()[exp.id]) {
                        <div class="p-2.5 rounded-lg bg-card border border-border/40 space-y-1.5 text-[11px] animate-in fade-in-0 duration-200">
                          <div class="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                            <span>Direct on Traveller AI (Includes Free Breakfast)</span>
                            <span class="font-mono">\${{ exp.basePrice }} ⭐ Best Rate</span>
                          </div>
                          <div class="flex items-center justify-between text-muted-foreground">
                            <span>Booking.com</span>
                            <span class="font-mono line-through">\${{ (exp.basePrice * 1.14) | number:'1.0-0' }}</span>
                          </div>
                          <div class="flex items-center justify-between text-muted-foreground">
                            <span>Expedia</span>
                            <span class="font-mono line-through">\${{ (exp.basePrice * 1.18) | number:'1.0-0' }}</span>
                          </div>
                          <div class="flex items-center justify-between text-muted-foreground">
                            <span>Agoda</span>
                            <span class="font-mono line-through">\${{ (exp.basePrice * 1.11) | number:'1.0-0' }}</span>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>

                <!-- Price & Action Bar -->
                <div class="p-4 pt-0 border-t border-border/40 mt-3 flex items-center justify-between">
                  <div>
                    <span class="text-[10px] text-muted-foreground">From</span>
                    <div class="text-base font-extrabold text-foreground">
                      {{ cart.formatMoney(exp.basePrice) }}
                      <span class="text-[10px] text-muted-foreground font-normal">{{ exp.priceSuffix }}</span>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <button
                      hlmBtn
                      variant="outline"
                      size="sm"
                      (click)="addToCart(exp)"
                      class="h-8 px-2.5 text-xs gap-1 cursor-pointer"
                      title="Add to Universal Cart"
                    >
                      <ng-icon name="lucideShoppingCart" class="size-3.5" />
                      <span>Add</span>
                    </button>

                    <button
                      hlmBtn
                      variant="default"
                      size="sm"
                      (click)="bookNow(exp)"
                      class="h-8 px-3 text-xs gap-1 cursor-pointer shadow-xs"
                    >
                      <span>Book Now</span>
                      <ng-icon name="lucideArrowRight" class="size-3" />
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </app-main>
  `,
})
export class SearchPageComponent implements OnInit {
  readonly cart = inject(UniversalCartFacade)
  private readonly router = inject(Router)
  private readonly searchApi = inject(SearchApiService)
  private readonly refData = inject(ReferenceDataService)

  readonly destinations = this.refData.destinations

  readonly selectedServiceType = signal<string>('all')
  readonly filterMinRating = signal<number>(4.0)
  readonly filterMaxPrice = signal<number>(1500)
  readonly filterFreeCancellation = signal<boolean>(false)

  searchDestination = ''
  searchDate = new Date().toISOString().split('T')[0]
  searchKeyword = ''

  readonly isAiPlannerOpen = signal(false)
  readonly aiTripPrompt = signal('5 days in Switzerland for 2 with luxury mountain view suite, panoramic rail tour, and airport VIP transfer')
  readonly aiGeneratedTrip = signal<any | null>(null)
  readonly showPriceComparison = signal<Record<string, boolean>>({})

  ngOnInit(): void {
    this.loadExperiences()
  }

  onFilterChange(): void {
    this.loadExperiences()
  }


  async loadExperiences(): Promise<void> {
    const res = await this.searchApi.search()
    if (res.ok && res.data.items.length > 0) {
      this.experiences.set(res.data.items)
    }
  }


  toggleOtaRates(id: string): void {
    this.showPriceComparison.update((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  generateAiTrip(): void {
    toast.loading('Synthesizing Multi-Modal Basket...', { duration: 800 })
    setTimeout(() => {
      this.aiGeneratedTrip.set({
        title: 'Alpine Splendor: 5-Day Swiss Alps Luxury Multi-Modal Package',
        originalPrice: 2450,
        discountedPrice: 2156,
        savings: 294,
        items: [
          {
            type: 'hotel',
            name: 'Grand Sylhet Resort & Spa (Mountain Panorama)',
            desc: '4 Nights • King Suite • Daily Breakfast Included',
            price: 720,
          },
          {
            type: 'transfer',
            name: 'Airport VIP Chauffeur Meet & Greet',
            desc: 'Mercedes-Benz S-Class • Airport ↔ Hotel Return',
            price: 280,
          },
          {
            type: 'tour',
            name: 'Swiss Alps Grand Glacier & Panorama Trail',
            desc: 'Full-Day Guided Trek with Mountain Guide & Lunch',
            price: 1450,
          },
        ],
      })
      toast.success('Itinerary Synthesized!', {
        description: 'Auto-bundled 3 services with 12% multi-modal savings.',
      })
    }, 850)
  }

  addAllAiItemsToCart(trip: any): void {
    this.cart.addItem({
      id: 'ai-stay-1',
      type: 'hotel_stay',
      providerId: 'prov-hotel-1',
      providerName: 'Grand Sylhet Hospitality Group',
      title: 'Grand Sylhet Resort & Spa (Mountain Panorama)',
      subtitle: '4 Nights • King Suite • Breakfast Included',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
      startDate: '2026-09-20',
      endDate: '2026-09-24',
      quantityOrGuests: 2,
      unitPrice: 720,
      totalPrice: 720,
      cancellationPolicy: 'flexible_24h',
    })
    this.cart.addItem({
      id: 'ai-trans-1',
      type: 'airport_transfer',
      providerId: 'prov-trans-1',
      providerName: 'Swiss Chauffeur Fleet Operations',
      title: 'Airport VIP Chauffeur Meet & Greet',
      subtitle: 'Mercedes-Benz S-Class • Airport ↔ Hotel Return',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600',
      startDate: '2026-09-20',
      quantityOrGuests: 2,
      unitPrice: 280,
      totalPrice: 280,
      cancellationPolicy: 'flexible_24h',
    })
    this.cart.addItem({
      id: 'ai-tour-1',
      type: 'tour_package',
      providerId: 'prov-tour-1',
      providerName: 'Alpine Adventures Switzerland',
      title: 'Swiss Alps Grand Glacier & Panorama Trail',
      subtitle: 'Full-Day Guided Trek with Certified Mountain Guide',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      startDate: '2026-09-22',
      quantityOrGuests: 2,
      unitPrice: 1450,
      totalPrice: 1450,
      cancellationPolicy: 'flexible_24h',
    })

    toast.success('3-Service Bundle Added to Cart!', {
      description: 'Redirecting to Universal Split-Escrow Checkout with 12% discount...',
    })
    this.router.navigateByUrl('/checkout')
  }

  readonly serviceTabs = [
    { id: 'all', label: 'All Combined', icon: 'lucideCompass' },
    { id: 'hotel_stay', label: 'Hotels & Stays', icon: 'lucideBedDouble' },
    { id: 'tour_package', label: 'Tours & Packages', icon: 'lucideSparkles' },
    { id: 'vehicle_rental', label: 'Vehicle Rentals', icon: 'lucideCar' },
    { id: 'airport_transfer', label: 'Airport Transfers', icon: 'lucideMapPin' },
  ]

  // Master catalog of multi-modal aggregated experiences
  readonly experiences = signal<SearchExperienceItem[]>([
    {
      id: 'exp-1',
      type: 'hotel_stay',
      title: 'Grand Sylhet 5-Star Resort & Spa',
      subtitle: 'Luxury King Suite with Mountain Panorama & Infinity Pool',
      destination: 'Sylhet',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
      rating: 4.9,
      reviewCount: 318,
      providerName: 'Grand Sylhet Hospitality Group',
      basePrice: 180,
      priceSuffix: '/ night',
      highlights: ['Breakfast Included', 'Spa Access', 'EV Charging', 'Free High-Speed WiFi'],
      freeCancellation: true,
    },
    {
      id: 'exp-2',
      type: 'tour_package',
      title: 'Sylhet Rain Forest & Ratargul Swamp Expedition',
      subtitle: 'Full-Day Guided Canoe & Tea Garden Trek with Certified Naturalist',
      destination: 'Sylhet',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      rating: 4.8,
      reviewCount: 204,
      providerName: 'Bengal Trailblazers Tour Operations',
      basePrice: 120,
      priceSuffix: '/ person',
      highlights: ['Guide Included', 'Canoe Boat Hire', 'Traditional Lunch', 'Safety Gear'],
      freeCancellation: true,
    },
    {
      id: 'exp-3',
      type: 'airport_transfer',
      title: 'Sylhet Airport (ZYL) VIP Chauffeur Meet & Greet',
      subtitle: 'Direct Private Transfer to any Sylhet Resort or Tea Estate',
      destination: 'Sylhet',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600',
      rating: 5.0,
      reviewCount: 142,
      providerName: 'Apex Chauffeur Fleet Services',
      basePrice: 65,
      priceSuffix: '/ vehicle',
      highlights: ['Flight Radar Tracking', 'Nameboard Welcome', 'Bottled Water', 'Luggage Assist'],
      freeCancellation: true,
    },
    {
      id: 'exp-4',
      type: 'vehicle_rental',
      title: 'Self-Drive 4x4 Expedition SUV (Mahindra Thar)',
      subtitle: 'Rugged Off-Road 4WD for Hill Tracts & Mountain Trails',
      destination: 'Sajek Valley',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600',
      rating: 4.7,
      reviewCount: 89,
      providerName: 'HillTracts Overland Rentals',
      basePrice: 110,
      priceSuffix: '/ day',
      highlights: ['Unlimited Km', 'CDW Protection Included', '24/7 Roadside Assist'],
      freeCancellation: true,
      securityDeposit: 150,
    },
    {
      id: 'exp-5',
      type: 'hotel_stay',
      title: 'Sajek Valley Cloud Eco-Lodge',
      subtitle: 'Cliffside Wooden Cottage with Balcony above Morning Clouds',
      destination: 'Sajek Valley',
      imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600',
      rating: 4.8,
      reviewCount: 176,
      providerName: 'Cloudscape Resorts Ltd.',
      basePrice: 140,
      priceSuffix: '/ night',
      highlights: ['Cloud View Balcony', 'BBQ Grill', 'Solar Powered', 'Local Guide'],
      freeCancellation: false,
    },
    {
      id: 'exp-6',
      type: 'tour_package',
      title: 'Sundarbans Royal Bengal Tiger 3-Day Boat Cruise',
      subtitle: 'All-Inclusive Houseboat Expedition through Deep Mangrove Rivers',
      destination: 'Sundarbans',
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600',
      rating: 4.9,
      reviewCount: 422,
      providerName: 'Sundarbans Eco Cruise Fleet',
      basePrice: 380,
      priceSuffix: '/ person',
      highlights: ['Forest Guard Escort', 'All 3 Meals', 'Forest Permits', 'Spotting Tower Tours'],
      freeCancellation: true,
    },
  ])

  readonly filteredExperiences = computed(() => {
    return this.experiences().filter((exp) => {
      // Category filter
      if (this.selectedServiceType() !== 'all' && exp.type !== this.selectedServiceType()) {
        return false
      }
      // Destination filter
      if (this.searchDestination && exp.destination !== this.searchDestination) {
        return false
      }
      // Keyword filter
      if (this.searchKeyword) {
        const q = this.searchKeyword.toLowerCase()
        const matched = exp.title.toLowerCase().includes(q) || exp.subtitle.toLowerCase().includes(q) || exp.highlights.some(h => h.toLowerCase().includes(q))
        if (!matched) return false
      }
      // Rating filter
      if (exp.rating < this.filterMinRating()) {
        return false
      }
      // Price filter
      if (exp.basePrice > this.filterMaxPrice()) {
        return false
      }
      // Cancellation filter
      if (this.filterFreeCancellation() && !exp.freeCancellation) {
        return false
      }
      return true
    })
  })

  addToCart(exp: SearchExperienceItem): void {
    const item: CartItem = {
      id: `cart-${Date.now()}`,
      type: exp.type,
      providerId: 'prov-direct',
      providerName: exp.providerName,
      title: exp.title,
      subtitle: exp.subtitle,
      imageUrl: exp.imageUrl,
      startDate: this.searchDate,
      quantityOrGuests: 1,
      unitPrice: exp.basePrice,
      totalPrice: exp.basePrice,
      securityDeposit: exp.securityDeposit,
      cancellationPolicy: exp.freeCancellation ? 'flexible_24h' : 'non_refundable',
    }
    this.cart.addItem(item)
    toast.success(`Added "${exp.title}" to your Universal Cart!`)
  }

  bookNow(exp: SearchExperienceItem): void {
    this.addToCart(exp)
    this.goToCheckout()
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout'])
  }

  resetFilters(): void {
    this.selectedServiceType.set('all')
    this.filterMinRating.set(3.5)
    this.filterMaxPrice.set(1000)
    this.filterFreeCancellation.set(false)
    this.searchDestination = ''
    this.searchKeyword = ''
  }
}
