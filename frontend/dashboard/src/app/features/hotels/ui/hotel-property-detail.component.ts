import { Component, OnInit, inject, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowLeft,
  lucideBuilding2,
  lucideMapPin,
  lucideShieldCheck,
  lucideBedDouble,
  lucideImage,
  lucideSave,
  lucidePlus,
  lucideTrash2,
  lucideClock,
  lucideInfo,
  lucideSparkles,
  lucideCompass,
} from '@ng-icons/lucide'
import { HotelsFacade } from '../data-access/hotels.facade'
import { HotelProperty, RoomType } from '../data-access/models/hotel.model'
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
import { HlmSheetImports } from '../../../ui/sheet/hlm-sheet.components'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-hotel-property-detail',
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
    ...HlmSheetImports,
  ],

  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideBuilding2,
      lucideMapPin,
      lucideShieldCheck,
      lucideBedDouble,
      lucideImage,
      lucideSave,
      lucidePlus,
      lucideTrash2,
      lucideClock,
      lucideInfo,
      lucideSparkles,
      lucideCompass,
    }),
  ],
  template: `
    <!-- Top Header -->
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
      <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <button
            hlmBtn
            variant="ghost"
            size="icon"
            routerLink="/hotels"
            class="size-9 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ng-icon name="lucideArrowLeft" class="size-4" />
          </button>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold tracking-tight text-foreground">{{ property() ? property()!.name : 'Property Profile' }}</h1>
              <span hlmBadge variant="outline" class="text-xs capitalize">
                {{ property() ? property()!.propertyType.replace('_', ' ') : 'Hotel' }}
              </span>
              <span hlmBadge variant="default" class="text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Active PMS
              </span>
            </div>
            <p class="text-xs text-muted-foreground mt-0.5">
              Configure OpenTravel Alliance policies, GPS landmarks, legal compliance, and media gallery.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="default"
            class="gap-1.5 cursor-pointer shadow-xs"
            (click)="saveChanges()"
          >
            <ng-icon name="lucideSave" class="size-4" />
            <span>Save Property Profile</span>
          </button>
        </div>
      </div>

      <!-- Detail Tabs Bar -->
      <div class="mb-6 flex border-b border-border/50 overflow-x-auto gap-1">
        <button
          type="button"
          (click)="activeTab.set('general')"
          class="px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2"
          [class.border-primary]="activeTab() === 'general'"
          [class.text-primary]="activeTab() === 'general'"
          [class.border-transparent]="activeTab() !== 'general'"
          [class.text-muted-foreground]="activeTab() !== 'general'"
        >
          <ng-icon name="lucideBuilding2" class="size-4" />
          <span>General & Legal</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('location')"
          class="px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2"
          [class.border-primary]="activeTab() === 'location'"
          [class.text-primary]="activeTab() === 'location'"
          [class.border-transparent]="activeTab() !== 'location'"
          [class.text-muted-foreground]="activeTab() !== 'location'"
        >
          <ng-icon name="lucideMapPin" class="size-4" />
          <span>Location & Landmarks</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('policies')"
          class="px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2"
          [class.border-primary]="activeTab() === 'policies'"
          [class.text-primary]="activeTab() === 'policies'"
          [class.border-transparent]="activeTab() !== 'policies'"
          [class.text-muted-foreground]="activeTab() !== 'policies'"
        >
          <ng-icon name="lucideShieldCheck" class="size-4" />
          <span>Policies & House Rules</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('rooms')"
          class="px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2"
          [class.border-primary]="activeTab() === 'rooms'"
          [class.text-primary]="activeTab() === 'rooms'"
          [class.border-transparent]="activeTab() !== 'rooms'"
          [class.text-muted-foreground]="activeTab() !== 'rooms'"
        >
          <ng-icon name="lucideBedDouble" class="size-4" />
          <span>Room Inventory ({{ rooms().length }})</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('gallery')"
          class="px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2"
          [class.border-primary]="activeTab() === 'gallery'"
          [class.text-primary]="activeTab() === 'gallery'"
          [class.border-transparent]="activeTab() !== 'gallery'"
          [class.text-muted-foreground]="activeTab() !== 'gallery'"
        >
          <ng-icon name="lucideImage" class="size-4" />
          <span>Media & Gallery</span>
        </button>
      </div>

      <!-- Tab Content Area -->
      @if (property(); as prop) {
        <div class="space-y-6">
          <!-- General & Legal Tab -->
          @if (activeTab() === 'general') {
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div hlmCard class="p-6 bg-card border border-border/60 lg:col-span-2 space-y-4 shadow-xs">
                <h3 class="text-base font-bold text-foreground">Property Specifications</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div class="space-y-1.5">
                    <label class="font-medium text-foreground">Property Name *</label>
                    <input hlmInput [(ngModel)]="prop.name" class="w-full text-xs" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="font-medium text-foreground">Property Category *</label>
                    <select [(ngModel)]="prop.propertyType" class="w-full px-3 py-2 rounded-md border border-border bg-background text-xs">
                      <option value="hotel">Full-Service Hotel</option>
                      <option value="resort">Luxury Resort</option>
                      <option value="boutique_hotel">Boutique Hotel</option>
                      <option value="eco_lodge">Eco-Lodge / Nature Retreat</option>
                      <option value="serviced_apartment">Serviced Apartment</option>
                      <option value="homestay_guesthouse">Homestay / Guesthouse</option>
                      <option value="camp_glamping">Camp & Glamping</option>
                    </select>
                  </div>
                  <div class="space-y-1.5">
                    <label class="font-medium text-foreground">Star Classification</label>
                    <select [(ngModel)]="prop.starRating" class="w-full px-3 py-2 rounded-md border border-border bg-background text-xs">
                      <option [ngValue]="5">5 Stars (Luxury / World-Class)</option>
                      <option [ngValue]="4">4 Stars (Superior First Class)</option>
                      <option [ngValue]="3">3 Stars (Standard Comfort)</option>
                      <option [ngValue]="2">2 Stars (Economy)</option>
                    </select>
                  </div>
                  <div class="space-y-1.5">
                    <label class="font-medium text-foreground">Starting Nightly Rate (USD) *</label>
                    <input hlmInput type="number" [(ngModel)]="prop.startingPrice" class="w-full text-xs font-mono font-bold" />
                  </div>
                </div>

                <div class="space-y-1.5 pt-2">
                  <label class="font-medium text-foreground">Full Description & Marketing Narrative</label>
                  <textarea
                    [(ngModel)]="prop.description"
                    rows="4"
                    class="w-full p-3 rounded-lg border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter full property narrative for search engine previews..."
                  ></textarea>
                </div>
              </div>

              <!-- Legal & Compliance Column -->
              <div hlmCard class="p-6 bg-card border border-border/60 space-y-4 shadow-xs">
                <h3 class="text-base font-bold text-foreground">Legal & Certification</h3>
                <div class="space-y-3 text-xs">
                  <div class="space-y-1.5">
                    <label class="font-medium text-foreground">Operating Tourism License #</label>
                    <input hlmInput [(ngModel)]="prop.businessRegistrationNumber" placeholder="LIC-CH-88291" class="w-full text-xs font-mono" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="font-medium text-foreground">VAT / Tax ID Registration</label>
                    <input hlmInput [(ngModel)]="prop.taxId" placeholder="CHE-109.832.411" class="w-full text-xs font-mono" />
                  </div>
                  <div class="p-3.5 rounded-lg bg-primary/5 border border-primary/20 text-xs space-y-1 text-muted-foreground">
                    <div class="flex items-center gap-1.5 font-bold text-foreground">
                      <ng-icon name="lucideShieldCheck" class="size-4 text-primary" />
                      <span>Certified Hospitality Standard</span>
                    </div>
                    <p class="text-[11px]">OTA-2017B rate parity protocol active. Double allocations locked.</p>
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- Location & Landmarks Tab -->
          @if (activeTab() === 'location') {
            <div hlmCard class="p-6 bg-card border border-border/60 space-y-6 shadow-xs">
              <h3 class="text-base font-bold text-foreground">Location Intelligence & Coordinates</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div class="space-y-1.5 sm:col-span-2">
                  <label class="font-medium text-foreground">Physical Street Address *</label>
                  <input hlmInput [(ngModel)]="prop.address" class="w-full text-xs" />
                </div>
                <div class="space-y-1.5">
                  <label class="font-medium text-foreground">City & Region *</label>
                  <input hlmInput [(ngModel)]="prop.city" class="w-full text-xs" />
                </div>
                <div class="space-y-1.5">
                  <label class="font-medium text-foreground">Country *</label>
                  <input hlmInput [(ngModel)]="prop.country" class="w-full text-xs" />
                </div>
                <div class="space-y-1.5">
                  <label class="font-medium text-foreground">GPS Latitude</label>
                  <input hlmInput type="number" step="0.0001" [(ngModel)]="prop.latitude" class="w-full text-xs font-mono" />
                </div>
                <div class="space-y-1.5">
                  <label class="font-medium text-foreground">GPS Longitude</label>
                  <input hlmInput type="number" step="0.0001" [(ngModel)]="prop.longitude" class="w-full text-xs font-mono" />
                </div>
              </div>

              <!-- Landmark Proximity Matrix -->
              <div class="pt-4 border-t border-border/40 space-y-3">
                <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nearby Key Hubs (Auto-Geocoded)</h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="p-3 rounded-lg bg-muted/40 border border-border/40 flex items-center justify-between text-xs">
                    <span class="text-muted-foreground">City Center</span>
                    <strong class="text-foreground">0.8 km (Walkable)</strong>
                  </div>
                  <div class="p-3 rounded-lg bg-muted/40 border border-border/40 flex items-center justify-between text-xs">
                    <span class="text-muted-foreground">International Airport</span>
                    <strong class="text-foreground">12.4 km (20 min transfer)</strong>
                  </div>
                  <div class="p-3 rounded-lg bg-muted/40 border border-border/40 flex items-center justify-between text-xs">
                    <span class="text-muted-foreground">Central Rail Station</span>
                    <strong class="text-foreground">1.1 km (3 min shuttle)</strong>
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- Policies Tab -->
          @if (activeTab() === 'policies') {
            <div hlmCard class="p-6 bg-card border border-border/60 space-y-6 shadow-xs">
              <h3 class="text-base font-bold text-foreground">Operational Policies & Guest Regulations</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div class="space-y-1.5">
                  <label class="font-medium text-foreground">Standard Check-In Window</label>
                  <input hlmInput [(ngModel)]="prop.checkInTime" placeholder="14:00" class="w-full text-xs" />
                </div>
                <div class="space-y-1.5">
                  <label class="font-medium text-foreground">Check-Out Deadline</label>
                  <input hlmInput [(ngModel)]="prop.checkOutTime" placeholder="11:00" class="w-full text-xs" />
                </div>
                <div class="space-y-1.5">
                  <label class="font-medium text-foreground">Security Deposit Pre-Auth</label>
                  <input hlmInput type="number" value="250" class="w-full text-xs font-mono" />
                </div>
                <div class="space-y-1.5">
                  <label class="font-medium text-foreground">Minimum Guest Age</label>
                  <input hlmInput type="number" value="18" class="w-full text-xs" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/40 text-xs">
                <div class="p-3.5 rounded-lg border border-border/40 bg-muted/20 space-y-1">
                  <div class="font-bold text-foreground">Pet Policy</div>
                  <p class="text-muted-foreground text-[11px]">Small pets welcome with prior notice ($35/stay surcharge).</p>
                </div>
                <div class="p-3.5 rounded-lg border border-border/40 bg-muted/20 space-y-1">
                  <div class="font-bold text-foreground">Smoking Policy</div>
                  <p class="text-muted-foreground text-[11px]">100% Smoke-free indoors. Designated outdoor terraces only.</p>
                </div>
                <div class="p-3.5 rounded-lg border border-border/40 bg-muted/20 space-y-1">
                  <div class="font-bold text-foreground">Quiet Hours</div>
                  <p class="text-muted-foreground text-[11px]">22:00 to 07:00 enforced across all residential corridors.</p>
                </div>
              </div>
            </div>
          }

          <!-- Room Inventory Tab -->
          @if (activeTab() === 'rooms') {
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-bold text-foreground">Configured Room Categories</h3>
                <button hlmBtn variant="default" size="sm" class="gap-1.5 text-xs shadow-xs" (click)="addRoomType()">
                  <ng-icon name="lucidePlus" class="size-3.5" />
                  <span>Add Room Type</span>
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                @for (room of rooms(); track room.id) {
                  <div hlmCard class="p-5 bg-card border border-border/50 rounded-xl space-y-3 shadow-xs">
                    <div class="flex items-start justify-between">
                      <div>
                        <h4 class="font-bold text-foreground text-sm">{{ room.name }}</h4>
                        <span class="text-[11px] text-muted-foreground font-mono">{{ room.slug }}</span>
                      </div>
                      <span class="text-sm font-bold font-mono text-primary">\${{ room.basePricePerNight }}/nt</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground pt-2 border-t border-border/30">
                      <span>Max Guests: <strong class="text-foreground">{{ room.maxTotalGuests }}</strong></span>
                      <span>Units in Hotel: <strong class="text-foreground">{{ room.totalUnitsCount }}</strong></span>
                      <span>Bed: <strong class="text-foreground">{{ room.baseBedType }}</strong></span>
                      <span>View: <strong class="text-foreground">{{ room.viewType }}</strong></span>
                    </div>

                    <div class="flex items-center justify-between pt-2">
                      <span hlmBadge variant="outline" class="text-[10px]">
                        {{ room.isActive ? 'Bookable Online' : 'Suspended' }}
                      </span>
                      <button hlmBtn variant="ghost" size="sm" class="text-xs text-primary cursor-pointer hover:underline">
                        Edit Rates
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Media Gallery Tab -->
          @if (activeTab() === 'gallery') {
            <div hlmCard class="p-6 bg-card border border-border/60 space-y-4 shadow-xs">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-base font-bold text-foreground">Property Photography Gallery</h3>
                  <p class="text-xs text-muted-foreground">High-resolution photography for direct and OTA distribution.</p>
                </div>
                <button hlmBtn variant="outline" size="sm" class="gap-1.5 text-xs cursor-pointer" (click)="addPhoto()">
                  <ng-icon name="lucidePlus" class="size-3.5" />
                  <span>Upload Image</span>
                </button>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div class="group relative rounded-lg overflow-hidden border border-border aspect-video bg-muted">
                  <img [src]="prop.coverImageUrl" alt="Hero" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span class="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">Cover Hero</span>
                </div>
                @for (img of prop.galleryUrls || []; track img) {
                  <div class="group relative rounded-lg overflow-hidden border border-border aspect-video bg-muted">
                    <img [src]="img" alt="Gallery" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }

      <!-- Add Room Type Sheet -->
      <hlm-sheet [isOpen]="roomTypeSheetOpen()" position="right" [size]="'sm'" (closed)="roomTypeSheetOpen.set(false)">
        <div hlmSheetHeader>
          <h3 hlmSheetTitle>Add Room Category</h3>
          <p hlmSheetDescription class="text-xs">Define room inventory specs, bed configuration, and pricing.</p>
        </div>

        <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Room Type Name *</label>
            <input
              type="text"
              [(ngModel)]="newRoomType.name"
              placeholder="e.g. Deluxe Ocean View Suite"
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Base Bed Type</label>
              <select
                [(ngModel)]="newRoomType.baseBedType"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="King">1 King Bed</option>
                <option value="Queen">1 Queen Bed</option>
                <option value="Twin">2 Twin Beds</option>
                <option value="Family">Family Suite</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">View Type</label>
              <select
                [(ngModel)]="newRoomType.viewType"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Valley View">Valley / Mountain View</option>
                <option value="Ocean View">Ocean / Sea View</option>
                <option value="Garden View">Garden View</option>
                <option value="City View">City View</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Max Guests</label>
              <input
                type="number"
                [(ngModel)]="newRoomType.maxTotalGuests"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Units Available</label>
              <input
                type="number"
                [(ngModel)]="newRoomType.totalUnitsCount"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Base Nightly Price (USD) *</label>
            <input
              type="number"
              [(ngModel)]="newRoomType.basePriceNightly"
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="roomTypeSheetOpen.set(false)" class="cursor-pointer text-xs" [disabled]="isSubmittingRoom()">
            Cancel
          </button>
          <button hlmBtn (click)="saveRoomType()" class="cursor-pointer text-xs" [disabled]="isSubmittingRoom()">
            <span>Create Room Type</span>
          </button>
        </div>
      </hlm-sheet>

      <!-- Media Upload Sheet -->
      <hlm-sheet [isOpen]="mediaUploadSheetOpen()" position="right" [size]="'sm'" (closed)="mediaUploadSheetOpen.set(false)">
        <div hlmSheetHeader>
          <h3 hlmSheetTitle>Upload Property Photos</h3>
          <p hlmSheetDescription class="text-xs">Add high-resolution image URLs to synchronize across distribution channels.</p>
        </div>

        <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Photo URL *</label>
            <input
              type="url"
              [(ngModel)]="newPhotoUrl"
              placeholder="https://images.unsplash.com/..."
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <p class="text-[11px] text-muted-foreground">Supported formats: WEBP, JPG, PNG up to 25MB.</p>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="mediaUploadSheetOpen.set(false)" class="cursor-pointer text-xs">
            Cancel
          </button>
          <button hlmBtn (click)="savePhoto()" class="cursor-pointer text-xs">
            <span>Add to Gallery</span>
          </button>
        </div>
      </hlm-sheet>
    </app-main>
  `,
})
export class HotelPropertyDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  protected readonly facade = inject(HotelsFacade)

  readonly activeTab = signal<'general' | 'location' | 'policies' | 'rooms' | 'gallery'>('general')
  readonly property = computed(() => this.facade.selectedProperty())
  readonly rooms = computed(() => this.facade.roomTypes())

  ngOnInit(): void {
    this.facade.loadAll()
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.facade.selectProperty(id)
    }
  }

  readonly roomTypeSheetOpen = signal<boolean>(false)
  readonly mediaUploadSheetOpen = signal<boolean>(false)
  readonly isSubmittingRoom = signal<boolean>(false)

  newRoomType = {
    name: '',
    baseBedType: 'King',
    viewType: 'Valley View',
    maxTotalGuests: 2,
    totalUnitsCount: 5,
    basePriceNightly: 120,
  }

  newPhotoUrl = ''

  saveChanges(): void {
    toast.success('Property Profile Saved', {
      description: 'Changes synchronized with OTA channel distribution.',
    })
  }

  addRoomType(): void {
    this.newRoomType = {
      name: '',
      baseBedType: 'King',
      viewType: 'Valley View',
      maxTotalGuests: 2,
      totalUnitsCount: 5,
      basePriceNightly: 120,
    }
    this.roomTypeSheetOpen.set(true)
  }

  saveRoomType(): void {
    if (!this.newRoomType.name.trim()) {
      toast.error('Room type name is required.')
      return
    }
    this.isSubmittingRoom.set(true)
    const newRt: RoomType = {
      id: `rt-${Date.now()}`,
      propertyId: this.property()?.id || 'prop-101',
      name: this.newRoomType.name,
      slug: this.newRoomType.name.toLowerCase().replace(/\s+/g, '-'),
      category: 'suite',
      baseBedType: this.newRoomType.baseBedType,
      viewType: this.newRoomType.viewType,
      maxOccupancyAdults: this.newRoomType.maxTotalGuests,
      maxOccupancyChildren: 1,
      maxTotalGuests: this.newRoomType.maxTotalGuests,
      extraBedAvailable: false,
      smokingAllowed: false,
      bathroomType: 'private_ensuite',
      roomSizeSqm: 42,
      totalUnitsCount: this.newRoomType.totalUnitsCount,
      basePricePerNight: this.newRoomType.basePriceNightly,
      amenities: ['Wi-Fi', 'Air Conditioning', 'En-Suite Bathroom'],
      photos: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80'],
      isActive: true,
    }
    this.facade.roomTypes.update((list) => [...list, newRt])
    this.isSubmittingRoom.set(false)
    this.roomTypeSheetOpen.set(false)
    toast.success(`Room category "${newRt.name}" created!`)
  }

  addPhoto(): void {
    this.newPhotoUrl = ''
    this.mediaUploadSheetOpen.set(true)
  }

  savePhoto(): void {
    if (!this.newPhotoUrl.trim()) {
      toast.error('Please provide an image URL.')
      return
    }
    const current = this.property()
    if (current) {
      const urls = current.galleryUrls ? [...current.galleryUrls, this.newPhotoUrl] : [this.newPhotoUrl]
      current.galleryUrls = urls
      toast.success('Photo added to gallery!')
    }
    this.mediaUploadSheetOpen.set(false)
  }
}

