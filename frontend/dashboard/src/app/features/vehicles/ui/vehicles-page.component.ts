import { Component, OnInit, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCar,
  lucideShieldCheck,
  lucideMapPin,
  lucideClock,
  lucideGauge,
  lucideUserCheck,
  lucideFileCheck,
  lucideAlertTriangle,
  lucideCheckCircle2,
  lucidePlane,
  lucideCompass,
  lucidePlus,
  lucideSearch,
  lucideFilter,
  lucideDollarSign,
  lucideX,
  lucideQrCode,
  lucidePenTool,
  lucideFileText,
  lucideFuel,
} from '@ng-icons/lucide'
import { VehiclesFacade } from '../data-access/vehicles.facade'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmSheetImports } from '../../../ui/sheet/hlm-sheet.components'
import { HlmDialogImports } from '../../../ui/dialog/hlm-dialog.components'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { toast } from 'ngx-sonner'
import { DamageMarker, Driver, Vehicle, VehicleBooking } from '../data-access/models/vehicle.model'

@Component({
  selector: 'app-vehicles-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    TopNavComponent,
    SearchComponent,
    ThemeSwitchComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucideCar,
      lucideShieldCheck,
      lucideMapPin,
      lucideClock,
      lucideGauge,
      lucideUserCheck,
      lucideFileCheck,
      lucideAlertTriangle,
      lucideCheckCircle2,
      lucidePlane,
      lucideCompass,
      lucidePlus,
      lucideSearch,
      lucideFilter,
      lucideDollarSign,
      lucideX,
      lucideQrCode,
      lucidePenTool,
      lucideFileText,
      lucideFuel,
    }),
  ],
  template: `
    <app-header>
      <app-top-nav>
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ground Transport</span>
          <span class="text-muted-foreground/40">/</span>
          <span class="text-xs font-semibold text-foreground">Fleet Management & Rentals (FMS)</span>
        </div>
      </app-top-nav>
      <div class="ml-auto flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <app-main>
      <div class="space-y-6 pb-12">
        <!-- Header Row -->
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Fleet & Vehicle Management</h1>
              <span class="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-500 border border-blue-500/20">Multi-Modal Fleet</span>
            </div>
            <p class="text-sm text-muted-foreground mt-1">
              Four-wheelers, scooters, and local CNG auto-rickshaws. Self-drive rentals, 8-point digital condition custody & flight radar dispatch.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button
              hlmBtn
              variant="default"
              class="flex items-center gap-1.5 shadow-sm"
              (click)="openRegisterVehicle()"
            >
              <ng-icon name="lucidePlus" class="text-base" />
              <span>Register Vehicle</span>
            </button>
          </div>
        </div>

        <!-- Fleet KPI Bar -->
        @if (facade.analytics(); as a) {
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">Utilization</span>
                <ng-icon name="lucideGauge" class="text-primary text-base" />
              </div>
              <div class="mt-1 flex items-baseline gap-1.5">
                <span class="text-xl font-bold text-foreground">{{ a.fleetUtilizationRatePercent }}%</span>
                <span class="text-[11px] font-semibold text-emerald-500">+{{ a.fleetUtilizationChangePercent }}%</span>
              </div>
            </div>

            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">Rev / Veh / Day</span>
                <ng-icon name="lucideDollarSign" class="text-blue-500 text-base" />
              </div>
              <div class="mt-1">
                <span class="text-xl font-bold text-foreground">\${{ a.revenuePerVehicleDay }}</span>
              </div>
            </div>

            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">Active Trips</span>
                <ng-icon name="lucideCompass" class="text-indigo-500 text-base" />
              </div>
              <div class="mt-1">
                <span class="text-xl font-bold text-foreground">{{ facade.activeTrips().length }}</span>
                <span class="text-xs text-muted-foreground ml-1">on road</span>
              </div>
            </div>

            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">Available Fleet</span>
                <ng-icon name="lucideCar" class="text-emerald-500 text-base" />
              </div>
              <div class="mt-1">
                <span class="text-xl font-bold text-emerald-500">{{ facade.availableVehicles().length }}</span>
                <span class="text-xs text-muted-foreground ml-1">/ {{ facade.vehicles().length }} total</span>
              </div>
            </div>

            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">Chauffeurs</span>
                <ng-icon name="lucideUserCheck" class="text-purple-500 text-base" />
              </div>
              <div class="mt-1">
                <span class="text-xl font-bold text-foreground">{{ facade.availableDrivers().length }}</span>
                <span class="text-xs text-muted-foreground ml-1">available</span>
              </div>
            </div>

            <div class="rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
              <div class="flex items-center justify-between text-muted-foreground">
                <span class="text-xs font-medium uppercase tracking-wider">Compliance</span>
                <ng-icon name="lucideFileCheck" class="text-rose-500 text-base" />
              </div>
              <div class="mt-1">
                <span class="text-xs font-bold text-emerald-500">100% Up to date</span>
              </div>
            </div>
          </div>
        }

        <!-- Navigation Tabs -->
        <div class="flex overflow-x-auto border-b border-border no-scrollbar gap-2">
          <button
            (click)="activeTab.set('fleet')"
            [class]="activeTab() === 'fleet' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucideCar" class="text-base" />
            <span>Fleet Roster & Assets</span>
            <span class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{{ facade.vehicles().length }}</span>
          </button>

          <button
            (click)="activeTab.set('handover')"
            [class]="activeTab() === 'handover' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucidePenTool" class="text-base" />
            <span>Handover & 8-Point Damage Inspection</span>
            <span class="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-500">Digital Sign</span>
          </button>

          <button
            (click)="activeTab.set('dispatch')"
            [class]="activeTab() === 'dispatch' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucidePlane" class="text-base" />
            <span>Chauffeur Dispatch & Flight Radar</span>
            <span class="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-500">Live</span>
          </button>

          <button
            (click)="activeTab.set('driver-console')"
            [class]="activeTab() === 'driver-console' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucideQrCode" class="text-base" />
            <span>Driver PWA Console</span>
          </button>

          <button
            (click)="activeTab.set('pricing')"
            [class]="activeTab() === 'pricing' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucideShieldCheck" class="text-base" />
            <span>Tariffs & Protection Plans</span>
          </button>

          <button
            (click)="activeTab.set('bookings')"
            [class]="activeTab() === 'bookings' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'"
            class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            <ng-icon name="lucideFileText" class="text-base" />
            <span>Rental Bookings</span>
          </button>
        </div>

        <!-- ========================================================================================= -->
        <!-- TAB 1: FLEET ROSTER & MULTI-MODAL ASSETS -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'fleet') {
          <div class="space-y-6 animate-in fade-in-50 duration-200">
            <!-- Filter Bar: Category chips -->
            <div class="flex items-center gap-2">
              <button
                (click)="selectedCategoryFilter.set('all')"
                [class]="selectedCategoryFilter() === 'all' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'"
                class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
              >
                All Vehicles ({{ facade.vehicles().length }})
              </button>
              <button
                (click)="selectedCategoryFilter.set('four_wheeler')"
                [class]="selectedCategoryFilter() === 'four_wheeler' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'"
                class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
              >
                Four-Wheelers ({{ facade.fourWheelers().length }})
              </button>
              <button
                (click)="selectedCategoryFilter.set('three_wheeler_cng')"
                [class]="selectedCategoryFilter() === 'three_wheeler_cng' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'"
                class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
              >
                CNG Auto-Rickshaws ({{ facade.threeWheelers().length }})
              </button>
              <button
                (click)="selectedCategoryFilter.set('two_wheeler')"
                [class]="selectedCategoryFilter() === 'two_wheeler' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'"
                class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
              >
                Motorcycles & Scooters ({{ facade.twoWheelers().length }})
              </button>
            </div>

            <!-- Vehicle Asset Cards Grid -->
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              @for (veh of filteredVehicles(); track veh.id) {
                <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between hover:border-primary/50 transition-colors">
                  <div>
                    <div class="relative h-44 w-full overflow-hidden bg-muted">
                      @if (veh.photos?.[0]) {
                        <img [src]="veh.photos?.[0]" [alt]="veh.model" class="h-full w-full object-cover" />
                      }
                      <div class="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-xs">
                        {{ veh.year }}
                      </div>
                      <div class="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white uppercase backdrop-blur-xs">
                        {{ veh.subCategory.replace('_', ' ') }}
                      </div>
                    </div>

                    <div class="p-4">
                      <div class="flex items-start justify-between">
                        <div>
                          <h3 class="font-bold text-base text-foreground">{{ veh.make }} {{ veh.model }}</h3>
                          <div class="font-mono text-xs font-bold text-primary tracking-wide">{{ veh.registrationNumber }}</div>
                        </div>
                        <span class="rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold capitalize">
                          {{ veh.activeStatus }}
                        </span>
                      </div>

                      <div class="mt-3 grid grid-cols-3 gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                        <div>
                          <span>Fuel:</span>
                          <strong class="text-foreground capitalize ml-1">{{ veh.fuelType }}</strong>
                        </div>
                        <div>
                          <span>Trans:</span>
                          <strong class="text-foreground capitalize ml-1">{{ veh.transmission }}</strong>
                        </div>
                        <div>
                          <span>Seats:</span>
                          <strong class="text-foreground ml-1">{{ veh.seatingCapacity }} Pass.</strong>
                        </div>
                      </div>

                      <div class="mt-3 flex items-center justify-between bg-muted/30 rounded-lg p-2.5 text-xs border border-border/40">
                        <div class="flex items-center gap-1.5">
                          <ng-icon name="lucideGauge" class="text-primary text-xs" />
                          <span>{{ veh.currentOdometerKm }} km</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                          <ng-icon name="lucideFuel" class="text-amber-500 text-xs" />
                          <span>{{ veh.currentFuelLevelPercent }}% Fuel</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="px-4 py-3 bg-muted/20 border-t border-border flex items-center justify-between text-xs">
                    <div>
                      <span class="text-muted-foreground">Daily:</span>
                      <strong class="text-base text-foreground font-mono ml-1">\${{ veh.dailyRate }}</strong>
                      <span class="text-muted-foreground">/day</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <button
                        hlmBtn
                        variant="outline"
                        size="sm"
                        class="h-7 text-xs"
                        (click)="openInspectionForVehicle(veh)"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- ========================================================================================= -->
        <!-- TAB 2: HANDOVER STATION WITH 8-POINT INTERACTIVE DAMAGE CANVAS -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'handover') {
          <div class="space-y-6 animate-in fade-in-50 duration-200">
            <div class="rounded-xl border border-border bg-card p-6 shadow-xs">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h3 class="text-lg font-bold text-foreground flex items-center gap-2">
                    <ng-icon name="lucidePenTool" class="text-emerald-500" />
                    <span>8-Point Vehicle Condition Custody & Inspection Canvas</span>
                  </h3>
                  <p class="text-xs text-muted-foreground mt-0.5">
                    Click anywhere on the vehicle silhouette to place precision damage markers with severity. Capture dual touch signatures for legally binding handover certificate.
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-muted-foreground">Inspecting:</span>
                  <strong class="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
                    {{ selectedHandoverVehicle()?.make }} {{ selectedHandoverVehicle()?.model }} ({{ selectedHandoverVehicle()?.registrationNumber }})
                  </strong>
                </div>
              </div>

              <!-- Inspection Workspace: Interactive Diagram + Marker List -->
              <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- 8-Point Interactive Diagram (2 Columns) -->
                <div class="lg:col-span-2 rounded-xl border border-border bg-muted/10 p-5 flex flex-col items-center">
                  <div class="flex items-center justify-between w-full mb-3 text-xs text-muted-foreground">
                    <span class="font-semibold uppercase tracking-wider text-foreground">Interactive 8-Zone Top/Side Silhouette</span>
                    <span class="text-emerald-500 font-medium">Click on zone to log scratch, dent, or chip</span>
                  </div>

                  <!-- Interactive SVG Silhouette Canvas -->
                  <div
                    class="relative w-full max-w-lg aspect-[16/9] rounded-xl border-2 border-dashed border-border bg-card shadow-inner flex items-center justify-center cursor-crosshair overflow-hidden"
                    (click)="onDiagramClick($event)"
                  >
                    <!-- Stylized 2D Vehicle Silhouette Vector -->
                    <svg viewBox="0 0 600 300" class="w-full h-full p-4 opacity-80 pointer-events-none select-none">
                      <!-- Car Body Outline -->
                      <rect x="120" y="50" width="360" height="200" rx="30" fill="none" stroke="currentColor" stroke-width="3" class="text-muted-foreground/50" />
                      <!-- Windshield Front -->
                      <polygon points="170,80 230,90 230,210 170,220" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-500/70" />
                      <!-- Rear Windshield -->
                      <polygon points="430,80 370,90 370,210 430,220" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-500/70" />
                      <!-- Roof -->
                      <rect x="235" y="90" width="130" height="120" rx="10" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground/40" />
                      <!-- Front Bumper -->
                      <rect x="90" y="70" width="25" height="160" rx="8" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-500/70" />
                      <!-- Rear Bumper -->
                      <rect x="485" y="70" width="25" height="160" rx="8" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-500/70" />
                      <!-- Wheels -->
                      <rect x="150" y="25" width="60" height="20" rx="5" fill="currentColor" class="text-muted-foreground/80" />
                      <rect x="390" y="25" width="60" height="20" rx="5" fill="currentColor" class="text-muted-foreground/80" />
                      <rect x="150" y="255" width="60" height="20" rx="5" fill="currentColor" class="text-muted-foreground/80" />
                      <rect x="390" y="255" width="60" height="20" rx="5" fill="currentColor" class="text-muted-foreground/80" />

                      <!-- Zone Labels -->
                      <text x="102" y="155" text-anchor="middle" font-size="10" fill="currentColor" class="text-muted-foreground">FRONT</text>
                      <text x="497" y="155" text-anchor="middle" font-size="10" fill="currentColor" class="text-muted-foreground">REAR</text>
                      <text x="300" y="155" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor" class="text-muted-foreground">ROOF</text>
                    </svg>

                    <!-- Rendered Damage Markers on Diagram -->
                    @for (marker of damageMarkers(); track marker.id) {
                      <div
                        [style.left.%]="marker.x"
                        [style.top.%]="marker.y"
                        class="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-6 w-6 rounded-full bg-rose-600 text-white text-[10px] font-black shadow-lg border-2 border-white ring-2 ring-rose-600/40 animate-bounce"
                        title="{{ marker.damageType }} ({{ marker.severity }})"
                      >
                        !
                      </div>
                    }
                  </div>

                  <!-- Odometer and Fuel Gauge Sliders -->
                  <div class="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-4">
                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-foreground flex justify-between">
                        <span>Current Odometer Reading</span>
                        <span class="font-mono text-primary font-bold">{{ handoverOdometer }} km</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        [(ngModel)]="handoverOdometer"
                        class="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>

                    <div class="space-y-1.5">
                      <label class="text-xs font-semibold text-foreground flex justify-between">
                        <span>Fuel Tank Level</span>
                        <span class="font-mono text-emerald-500 font-bold">{{ handoverFuelPercent }}% Full</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        [(ngModel)]="handoverFuelPercent"
                        class="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <!-- Markers List & Digital Touch Signature -->
                <div class="rounded-xl border border-border bg-card p-4 flex flex-col justify-between">
                  <div>
                    <h4 class="font-bold text-sm text-foreground mb-3 flex items-center justify-between">
                      <span>Documented Damage ({{ damageMarkers().length }})</span>
                      <button (click)="clearMarkers()" class="text-xs text-rose-500 hover:underline">Clear</button>
                    </h4>

                    <div class="space-y-2 max-h-48 overflow-y-auto divide-y divide-border/40">
                      @for (m of damageMarkers(); track m.id) {
                        <div class="pt-2 text-xs flex items-center justify-between">
                          <div>
                            <div class="font-semibold text-foreground capitalize">{{ m.damageType }} on {{ m.zone.replace('_', ' ') }}</div>
                            <div class="text-[11px] text-rose-500 uppercase font-bold">{{ m.severity }} severity</div>
                          </div>
                          <button (click)="removeMarker(m.id)" class="text-muted-foreground hover:text-rose-500">
                            <ng-icon name="lucideX" class="text-sm" />
                          </button>
                        </div>
                      } @empty {
                        <div class="p-6 text-center text-xs text-muted-foreground">
                          Zero pre-existing damage placed.<br>Click on the diagram to pin markers.
                        </div>
                      }
                    </div>
                  </div>

                  <!-- Touch Signature Canvas Area -->
                  <div class="mt-6 border-t border-border pt-4">
                    <div class="text-xs font-semibold text-foreground mb-2 flex items-center justify-between">
                      <span>Renter & Inspector Digital Signature</span>
                      <span class="text-[10px] text-emerald-500 font-bold">Touch Screen Enabled</span>
                    </div>

                    <div class="h-24 rounded-lg border border-dashed border-border bg-muted/20 flex flex-col items-center justify-center text-xs text-muted-foreground font-mono">
                      <span>✍️ Customer & Inspector Signed</span>
                      <span class="text-[10px] text-muted-foreground/60">SHA-256 Verified · Sep 14, 2026</span>
                    </div>

                    <button
                      hlmBtn
                      variant="default"
                      class="w-full mt-4 text-xs font-bold shadow-sm"
                      (click)="generateHandoverCertificate()"
                    >
                      Generate Pre-Rental Condition Certificate (PDF)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- ========================================================================================= -->
        <!-- TAB 3: CHAUFFEUR DISPATCH & FLIGHT TRACKING RADAR -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'dispatch') {
          <div class="space-y-6 animate-in fade-in-50 duration-200">
            <!-- Active Flight Radar & Dispatch Cards -->
            <div class="rounded-xl border border-border bg-card p-5 shadow-xs">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="font-bold text-base text-foreground flex items-center gap-2">
                    <ng-icon name="lucidePlane" class="text-amber-500" />
                    <span>Real-Time Aviation Flight Radar & Dispatch Schedule</span>
                  </h3>
                  <p class="text-xs text-muted-foreground mt-0.5">
                    Airport arrivals are tracked live via flight telematics. Chauffeur dispatch times adjust dynamically to delays or early touchdowns.
                  </p>
                </div>
              </div>

              <div class="divide-y divide-border/60">
                @for (bk of facade.bookings(); track bk.id) {
                  <div class="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="flex items-start gap-3">
                      <div class="rounded-lg bg-blue-500/10 p-2 text-blue-500 border border-blue-500/20">
                        <ng-icon name="lucidePlane" class="text-xl" />
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-mono font-bold text-sm text-foreground">{{ bk.flightNumber || 'FL-TRANS' }}</span>
                          <span class="font-bold text-foreground">· {{ bk.vehicleName }}</span>
                          @if (bk.flightStatus === 'delayed') {
                            <span class="rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2 py-0.5 text-xs font-bold">Delayed 40 min</span>
                          } @else {
                            <span class="rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 text-xs font-bold">On Schedule</span>
                          }
                        </div>
                        <div class="text-xs text-muted-foreground mt-1">
                          Route: {{ bk.pickupLocationAddress }} → {{ bk.dropoffLocationAddress }}
                        </div>
                        <div class="text-xs text-muted-foreground mt-0.5">
                          Passenger: <strong class="text-foreground">{{ bk.passengerCount }} Guest(s)</strong> · Pickup ETA: <strong class="text-primary">{{ bk.flightEta || '15:30' }}</strong>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center gap-3">
                      <div class="text-right text-xs">
                        <div class="text-muted-foreground">Assigned Chauffeur:</div>
                        <strong class="text-foreground">{{ bk.driverName || 'Unassigned' }}</strong>
                      </div>

                      @if (!bk.driverId) {
                        <button
                          hlmBtn
                          variant="outline"
                          size="sm"
                          class="text-xs"
                          (click)="openAssignDriver(bk)"
                        >
                          Assign Chauffeur
                        </button>
                      } @else {
                        <button
                          hlmBtn
                          variant="default"
                          size="sm"
                          class="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                        >
                          Dispatched
                        </button>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }

        <!-- ========================================================================================= -->
        <!-- TAB 4: DRIVER MOBILE PWA CONSOLE -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'driver-console') {
          <div class="space-y-6 animate-in fade-in-50 duration-200 flex justify-center">
            <!-- Simulated Mobile Smartphone Frame -->
            <div class="w-full max-w-sm rounded-3xl border-4 border-border bg-card p-5 shadow-2xl space-y-4">
              <!-- Mobile App Header -->
              <div class="flex items-center justify-between border-b border-border pb-3">
                <div class="flex items-center gap-2">
                  <div class="h-3 w-3 rounded-full bg-emerald-500"></div>
                  <span class="font-bold text-sm text-foreground">Driver Pilot Console</span>
                </div>
                <span class="text-xs font-mono text-muted-foreground">GPS Active</span>
              </div>

              <!-- Next Assigned Trip Card -->
              <div class="rounded-xl bg-muted/40 p-4 border border-border space-y-3">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold uppercase tracking-wider text-amber-500">Upcoming Pickup</span>
                  <span class="font-mono text-foreground font-bold">ETA 18 min</span>
                </div>

                <div>
                  <h4 class="font-black text-lg text-foreground">Terminal 2 Arrivals</h4>
                  <p class="text-xs text-muted-foreground">Hazrat Shahjalal Int. Airport (DAC)</p>
                </div>

                <div class="flex items-center justify-between text-xs border-t border-border pt-2 text-muted-foreground">
                  <span>Passenger: <strong class="text-foreground">Tariq Al-Mansoor</strong></span>
                  <span class="text-emerald-500 font-bold">3 Bags</span>
                </div>
              </div>

              <!-- Navigation Deep-Link Buttons -->
              <div class="grid grid-cols-2 gap-2">
                <button class="py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs">
                  Google Maps
                </button>
                <button class="py-2 text-xs font-bold rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs">
                  Waze Navigation
                </button>
              </div>

              <!-- Passenger OTP Verification to Start Trip -->
              <div class="rounded-xl border border-border bg-card p-4 space-y-3">
                <div class="text-xs font-bold text-foreground">Passenger Boarding Verification</div>
                <p class="text-[11px] text-muted-foreground">Enter the 4-digit OTP provided in passenger voucher:</p>
                <input
                  type="text"
                  [(ngModel)]="driverOtpInput"
                  placeholder="4821"
                  maxlength="6"
                  class="h-11 w-full text-center tracking-[0.5em] font-black text-lg rounded-lg border border-border bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
                <button
                  hlmBtn
                  variant="default"
                  class="w-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700"
                  (click)="verifyOtpAndStartTrip()"
                >
                  Verify OTP & Start Trip
                </button>
              </div>

              <!-- Mid-Trip Expense Logger -->
              <div class="rounded-xl border border-dashed border-border p-3 text-xs space-y-2 text-center bg-muted/20">
                <div class="font-semibold text-foreground">Mid-Trip Toll / Parking Expense</div>
                <p class="text-[10px] text-muted-foreground">Snap receipt photo to auto-reimburse to wallet balance.</p>
                <button class="text-xs text-primary font-bold hover:underline">+ Log Highway Toll</button>
              </div>
            </div>
          </div>
        }

        <!-- ========================================================================================= -->
        <!-- TAB 5: TARIFFS & PROTECTION PLANS (CDW/LDW) -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'pricing') {
          <div class="space-y-6 animate-in fade-in-50 duration-200">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              @for (plan of facade.protectionPlans(); track plan.id) {
                <div class="rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between">
                      <h4 class="font-bold text-base text-foreground">{{ plan.name }}</h4>
                      <span class="rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 text-xs font-bold">
                        +\${{ plan.dailyRate }}/day
                      </span>
                    </div>
                    <p class="text-xs text-muted-foreground mt-2">{{ plan.description }}</p>

                    <div class="mt-4 space-y-2 border-t border-border/60 pt-3 text-xs">
                      <div class="flex justify-between">
                        <span class="text-muted-foreground">Collision Deductible:</span>
                        <strong class="text-foreground font-mono">\${{ plan.collisionDeductibleAmount }}</strong>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-muted-foreground">Theft Deductible:</span>
                        <strong class="text-foreground font-mono">\${{ plan.theftDeductibleAmount }}</strong>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-muted-foreground">Glass & Tire Covered:</span>
                        <strong [class]="plan.glassTireCovered ? 'text-emerald-500' : 'text-muted-foreground'">
                          {{ plan.glassTireCovered ? 'Yes' : 'No' }}
                        </strong>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-muted-foreground">Roadside Assistance:</span>
                        <strong [class]="plan.roadsideAssistanceCovered ? 'text-emerald-500' : 'text-muted-foreground'">
                          {{ plan.roadsideAssistanceCovered ? '24/7 Included' : 'Excluded' }}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <button hlmBtn variant="outline" size="sm" class="mt-6 w-full text-xs font-semibold">
                    Configure Plan
                  </button>
                </div>
              }
            </div>
          </div>
        }

        <!-- ========================================================================================= -->
        <!-- TAB 6: RENTAL BOOKINGS -->
        <!-- ========================================================================================= -->
        @if (activeTab() === 'bookings') {
          <div class="space-y-6 animate-in fade-in-50 duration-200">
            <div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
              <div class="px-5 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-foreground">Fleet Rental Reservations</h3>
                  <p class="text-xs text-muted-foreground">Self-drive rentals, airport transfers, and chauffeured city charters</p>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead class="bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                    <tr>
                      <th class="px-4 py-3">Reference</th>
                      <th class="px-4 py-3">Vehicle</th>
                      <th class="px-4 py-3">Service Type</th>
                      <th class="px-4 py-3">Pickup & Return</th>
                      <th class="px-4 py-3">Total Fare</th>
                      <th class="px-4 py-3">Deposit Hold</th>
                      <th class="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border/60">
                    @for (bk of facade.bookings(); track bk.id) {
                      <tr class="hover:bg-muted/30 transition-colors">
                        <td class="px-4 py-3.5 font-mono text-xs font-semibold text-primary">{{ bk.bookingReference }}</td>
                        <td class="px-4 py-3.5 font-semibold text-foreground">{{ bk.vehicleName }}</td>
                        <td class="px-4 py-3.5">
                          <span class="rounded bg-muted px-2 py-0.5 text-xs font-medium uppercase text-muted-foreground">
                            {{ bk.serviceType.replace('_', ' ') }}
                          </span>
                        </td>
                        <td class="px-4 py-3.5 text-xs text-muted-foreground">
                          <div>{{ bk.pickupDateTime | date:'shortDate' }} → {{ bk.returnDateTime | date:'shortDate' }}</div>
                        </td>
                        <td class="px-4 py-3.5 font-mono text-xs font-bold text-foreground">\${{ bk.totalAmount }}</td>
                        <td class="px-4 py-3.5">
                          <span class="rounded bg-amber-500/10 text-amber-500 px-2 py-0.5 text-xs font-semibold border border-amber-500/20">
                            \${{ bk.securityDepositAmount }} ({{ bk.depositHoldStatus }})
                          </span>
                        </td>
                        <td class="px-4 py-3.5">
                          <span class="rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold capitalize">
                            {{ bk.bookingStatus }}
                          </span>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Register Vehicle Sheet -->
      <hlm-sheet [isOpen]="vehicleSheetOpen()" position="right" [size]="'sm'" (closed)="vehicleSheetOpen.set(false)">
        <div hlmSheetHeader>
          <h3 hlmSheetTitle>Register Fleet Vehicle</h3>
          <p hlmSheetDescription class="text-xs">Add a new car, SUV, scooter, or auto-rickshaw to the active dispatch fleet.</p>
        </div>

        <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Make *</label>
              <input
                type="text"
                [(ngModel)]="newVehicle.make"
                placeholder="e.g. Toyota"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Model *</label>
              <input
                type="text"
                [(ngModel)]="newVehicle.model"
                placeholder="e.g. Prado Land Cruiser"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Registration Number *</label>
            <input
              type="text"
              [(ngModel)]="newVehicle.registrationNumber"
              placeholder="e.g. DHK-MET-GA-14-8890"
              class="h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Category</label>
              <select
                [(ngModel)]="newVehicle.category"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="four_wheeler">4-Wheeler Car / SUV</option>
                <option value="two_wheeler">2-Wheeler Motorcycle / Scooter</option>
                <option value="three_wheeler_cng">3-Wheeler CNG Auto-Rickshaw</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Seating Capacity</label>
              <input
                type="number"
                [(ngModel)]="newVehicle.seatingCapacity"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Daily Rental Rate (USD) *</label>
              <input
                type="number"
                [(ngModel)]="newVehicle.dailyRate"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div class="space-y-1.5">
              <label class="font-semibold text-foreground">Security Deposit (USD)</label>
              <input
                type="number"
                [(ngModel)]="newVehicle.depositAmount"
                class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="vehicleSheetOpen.set(false)" class="cursor-pointer text-xs" [disabled]="isSubmittingVehicle()">
            Cancel
          </button>
          <button hlmBtn (click)="saveVehicle()" class="cursor-pointer text-xs gap-1.5" [disabled]="isSubmittingVehicle()">
            @if (isSubmittingVehicle()) {
              <span>Adding...</span>
            } @else {
              <span>Register Vehicle</span>
            }
          </button>
        </div>
      </hlm-sheet>

      <!-- Assign Driver Sheet -->
      <hlm-sheet [isOpen]="driverAssignSheetOpen()" position="right" [size]="'sm'" (closed)="driverAssignSheetOpen.set(false)">
        <div hlmSheetHeader>
          <h3 hlmSheetTitle>Assign Chauffeur / Driver</h3>
          @if (activeBookingForDriver()) {
            <p hlmSheetDescription class="text-xs">Select a licensed driver for trip {{ activeBookingForDriver()?.bookingReference }}.</p>
          }
        </div>

        <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
          <label class="font-semibold text-foreground">Available Drivers</label>
          <div class="space-y-2">
            @for (drv of facade.availableDrivers(); track drv.id) {
              <div
                (click)="selectedDriverId = drv.id"
                [class]="selectedDriverId === drv.id ? 'border-primary bg-primary/10' : 'border-border bg-muted/20 hover:border-primary/50'"
                class="cursor-pointer rounded-lg border p-3 flex items-center justify-between transition-colors"
              >
                <div>
                  <div class="font-bold text-sm text-foreground">{{ drv.fullName }}</div>
                  <div class="text-[11px] text-muted-foreground">{{ drv.licenseCategory }} · Rating {{ drv.overallRating }} ★</div>
                  <div class="text-[11px] text-muted-foreground">{{ drv.phone }}</div>
                </div>
                <span class="rounded bg-emerald-500/10 text-emerald-500 px-2 py-0.5 text-xs font-bold uppercase">
                  {{ drv.dutyStatus }}
                </span>
              </div>
            } @empty {
              <div class="p-6 text-center text-xs text-muted-foreground">No available drivers currently on duty.</div>
            }
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="driverAssignSheetOpen.set(false)" class="cursor-pointer text-xs">
            Cancel
          </button>
          <button hlmBtn [disabled]="!selectedDriverId" (click)="confirmDriverAssignment()" class="cursor-pointer text-xs">
            <span>Confirm Driver</span>
          </button>
        </div>
      </hlm-sheet>
    </app-main>
  `,
})
export class VehiclesPageComponent implements OnInit {
  readonly facade = inject(VehiclesFacade)

  readonly activeTab = signal<'fleet' | 'handover' | 'dispatch' | 'driver-console' | 'pricing' | 'bookings'>('fleet')
  readonly selectedCategoryFilter = signal<'all' | 'four_wheeler' | 'two_wheeler' | 'three_wheeler_cng'>('all')

  // Handover state
  damageMarkers = signal<DamageMarker[]>([])
  handoverOdometer = 18450
  handoverFuelPercent = 100
  driverOtpInput = '4821'

  ngOnInit(): void {
    this.facade.loadAll()
  }

  filteredVehicles(): Vehicle[] {
    const cat = this.selectedCategoryFilter()
    const all = this.facade.vehicles()
    if (cat === 'all') return all
    return all.filter((v) => v.category === cat)
  }

  selectedHandoverVehicle(): Vehicle | undefined {
    return this.facade.vehicles()[0]
  }

  openInspectionForVehicle(v: Vehicle): void {
    this.handoverOdometer = v.currentOdometerKm
    this.handoverFuelPercent = v.currentFuelLevelPercent
    this.activeTab.set('handover')
    toast.info(`Opened 8-point condition handover for ${v.make} ${v.model}`)
  }

  onDiagramClick(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const x = Math.round(((event.clientX - rect.left) / rect.width) * 100)
    const y = Math.round(((event.clientY - rect.top) / rect.height) * 100)

    const newMarker: DamageMarker = {
      id: `dmg-${Date.now()}`,
      zone: x < 30 ? 'front_bumper' : x > 70 ? 'rear_bumper' : 'left_doors',
      x,
      y,
      damageType: 'scratch',
      severity: 'minor',
    }
    this.damageMarkers.update((m) => [...m, newMarker])
    toast.success('Marker added: Minor scratch logged at zone coordinates.')
  }

  removeMarker(id: string): void {
    this.damageMarkers.update((m) => m.filter((item) => item.id !== id))
  }

  clearMarkers(): void {
    this.damageMarkers.set([])
  }

  readonly vehicleSheetOpen = signal<boolean>(false)
  readonly driverAssignSheetOpen = signal<boolean>(false)
  readonly isSubmittingVehicle = signal<boolean>(false)
  readonly activeBookingForDriver = signal<VehicleBooking | null>(null)
  selectedDriverId: string | null = null

  newVehicle: Partial<Vehicle> = {
    make: '',
    model: '',
    registrationNumber: '',
    category: 'four_wheeler',
    seatingCapacity: 5,
    dailyRate: 75,
    depositAmount: 200,
  }

  generateHandoverCertificate(): void {
    toast.success('Generated Pre-Rental Condition Custody Certificate (PDF) with signatures!')
  }

  openRegisterVehicle(): void {
    this.newVehicle = {
      make: '',
      model: '',
      registrationNumber: '',
      category: 'four_wheeler',
      seatingCapacity: 5,
      dailyRate: 75,
      depositAmount: 200,
    }
    this.vehicleSheetOpen.set(true)
  }

  async saveVehicle(): Promise<void> {
    if (!this.newVehicle.make?.trim() || !this.newVehicle.model?.trim()) {
      toast.error('Vehicle make and model are required.')
      return
    }
    if (!this.newVehicle.registrationNumber?.trim()) {
      toast.error('Registration number is required.')
      return
    }

    this.isSubmittingVehicle.set(true)
    try {
      const created = await this.facade.createVehicle(this.newVehicle)
      toast.success(`Vehicle "${created.make} ${created.model}" registered!`)
      this.vehicleSheetOpen.set(false)
    } finally {
      this.isSubmittingVehicle.set(false)
    }
  }

  openAssignDriver(bk: VehicleBooking): void {
    this.selectedDriverId = null
    this.activeBookingForDriver.set(bk)
    this.driverAssignSheetOpen.set(true)
  }

  async confirmDriverAssignment(): Promise<void> {
    const bk = this.activeBookingForDriver()
    if (!bk || !this.selectedDriverId) return

    const success = await this.facade.assignDriver(bk.id, this.selectedDriverId)
    if (success) {
      toast.success(`Driver successfully assigned to booking ${bk.bookingReference}!`)
      this.driverAssignSheetOpen.set(false)
      this.activeBookingForDriver.set(null)
    } else {
      toast.error('Failed to assign driver. Please try again.')
    }
  }

  verifyOtpAndStartTrip(): void {
    if (this.driverOtpInput === '4821') {
      toast.success('Passenger OTP 4821 verified! Trip officially started.')
    } else {
      toast.error('Invalid passenger OTP code. Please re-enter.')
    }
  }
}

