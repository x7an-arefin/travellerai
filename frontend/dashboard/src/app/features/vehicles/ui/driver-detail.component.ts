import { Component, OnInit, inject, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowLeft,
  lucideUserCheck,
  lucideShieldCheck,
  lucideShieldAlert,
  lucideCar,
  lucideStar,
  lucidePhone,
  lucideMail,
  lucideCalendar,
  lucideFileText,
  lucideClock,
  lucideReceipt,
  lucideDollarSign,
  lucideCheckCircle2,
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
import { HlmSheetImports } from '../../../ui/sheet/hlm-sheet.components'
import { ReferenceDataService } from '../../../core/services/reference-data.service'
import { toast } from 'ngx-sonner'

export interface DriverDossier {
  id: string
  fullName: string
  avatarUrl: string
  phone: string
  email: string
  assignedVehicle: string
  dutyStatus: 'available' | 'on_trip' | 'off_duty'
  rating: number
  totalTrips: number
  incidentFreeDays: number
  licenseNumber: string
  licenseExpiry: string
  daysUntilExpiry: number
  isVerified: boolean
  recentTrips: Array<{
    id: string
    date: string
    route: string
    passengerName: string
    fare: number
    rating: number
  }>
  pendingExpenses: Array<{
    id: string
    type: string
    amount: number
    receiptPhoto: string
    status: 'pending' | 'approved'
  }>
}

@Component({
  selector: 'app-driver-detail',
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
      lucideUserCheck,
      lucideShieldCheck,
      lucideShieldAlert,
      lucideCar,
      lucideStar,
      lucidePhone,
      lucideMail,
      lucideCalendar,
      lucideFileText,
      lucideClock,
      lucideReceipt,
      lucideDollarSign,
      lucideCheckCircle2,
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
              <h1 class="text-2xl font-bold tracking-tight text-foreground">{{ driver().fullName }}</h1>
              <span hlmBadge variant="default" class="text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Verified Chauffeur
              </span>
              <span hlmBadge variant="outline" class="text-xs capitalize">
                {{ driver().dutyStatus.replace('_', ' ') }}
              </span>
            </div>
            <p class="text-xs text-muted-foreground mt-0.5">
              Chauffeur certification profile, road compliance records, and expense reimbursement claims.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" class="gap-1.5 cursor-pointer" (click)="reassignVehicle()">
            <ng-icon name="lucideCar" class="size-4" />
            <span>Reassign Vehicle</span>
          </button>
        </div>
      </div>

      <!-- Driver Dossier Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile & Compliance Card -->
        <div class="space-y-6">
          <div hlmCard class="p-6 bg-card border border-border/60 rounded-xl space-y-4 shadow-xs">
            <div class="flex items-center gap-4">
              <img [src]="driver().avatarUrl" [alt]="driver().fullName" class="size-16 rounded-full object-cover border-2 border-primary/20" />
              <div>
                <h3 class="font-bold text-foreground text-base">{{ driver().fullName }}</h3>
                <div class="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
                  <ng-icon name="lucideStar" class="size-3.5 fill-amber-500" />
                  <span>{{ driver().rating }}</span>
                  <span class="text-muted-foreground font-normal">({{ driver().totalTrips }} trips)</span>
                </div>
                <span class="text-[11px] text-muted-foreground">{{ driver().assignedVehicle }}</span>
              </div>
            </div>

            <div class="space-y-2 pt-2 border-t border-border/30 text-xs">
              <div class="flex items-center justify-between py-1">
                <span class="text-muted-foreground flex items-center gap-1.5">
                  <ng-icon name="lucidePhone" class="size-3.5 text-muted-foreground" />
                  Phone Contact
                </span>
                <span class="font-medium text-foreground">{{ driver().phone }}</span>
              </div>
              <div class="flex items-center justify-between py-1">
                <span class="text-muted-foreground flex items-center gap-1.5">
                  <ng-icon name="lucideMail" class="size-3.5 text-muted-foreground" />
                  Email Address
                </span>
                <span class="font-medium text-foreground">{{ driver().email }}</span>
              </div>
              <div class="flex items-center justify-between py-1">
                <span class="text-muted-foreground">Incident-Free Record</span>
                <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ driver().incidentFreeDays }} days</span>
              </div>
            </div>
          </div>

          <!-- License Expiry Compliance Watch -->
          <div hlmCard class="p-5 bg-card border border-border/60 rounded-xl space-y-3 shadow-xs">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">License Compliance</h4>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                VALID
              </span>
            </div>

            <div class="p-3 rounded-lg bg-muted/40 border border-border/30 text-xs space-y-1">
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground">Driver License #:</span>
                <span class="font-mono font-bold text-foreground">{{ driver().licenseNumber }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground">Expires On:</span>
                <span class="font-medium text-foreground">{{ driver().licenseExpiry }}</span>
              </div>
              <div class="flex items-center justify-between pt-1 border-t border-border/20">
                <span class="text-muted-foreground">Hold Trigger:</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">{{ driver().daysUntilExpiry }} days remaining</span>
              </div>
            </div>

            <p class="text-[11px] text-muted-foreground">
              Automated compliance hold activates if unrenewed within 60 days of expiry.
            </p>
          </div>
        </div>

        <!-- Recent Trips & Expense Claims (2 Cols) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Recent Trips -->
          <div hlmCard class="p-6 bg-card border border-border/60 rounded-xl space-y-4 shadow-xs">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-foreground">Completed Dispatch Assignments</h3>
              <span class="text-xs text-muted-foreground">Showing last 4 verified trips</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-muted/40 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border/30">
                  <tr>
                    <th class="py-2.5 px-3">Date</th>
                    <th class="py-2.5 px-3">Route Itinerary</th>
                    <th class="py-2.5 px-3">Passenger</th>
                    <th class="py-2.5 px-3">Rating</th>
                    <th class="py-2.5 px-3 text-right">Fare Earned</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border/20">
                  @for (trip of driver().recentTrips; track trip.id) {
                    <tr class="hover:bg-muted/20">
                      <td class="py-2.5 px-3 font-medium text-muted-foreground">{{ trip.date }}</td>
                      <td class="py-2.5 px-3 font-semibold text-foreground">{{ trip.route }}</td>
                      <td class="py-2.5 px-3 text-foreground">{{ trip.passengerName }}</td>
                      <td class="py-2.5 px-3 text-amber-500 font-bold">★ {{ trip.rating }}</td>
                      <td class="py-2.5 px-3 text-right font-mono font-bold text-foreground">\${{ trip.fare }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <!-- Pending Expense Claims -->
          <div hlmCard class="p-6 bg-card border border-border/60 rounded-xl space-y-4 shadow-xs">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-foreground">On-Trip Expense Reimbursement Claims</h3>
                <p class="text-xs text-muted-foreground">Tolls, parking fees, and emergency fuel logged via mobile driver PWA.</p>
              </div>
              <span hlmBadge variant="outline" class="text-xs">
                {{ driver().pendingExpenses.length }} Claims
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              @for (exp of driver().pendingExpenses; track exp.id) {
                <div class="p-3.5 rounded-lg border border-border/50 bg-muted/20 space-y-2 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-foreground capitalize">{{ exp.type }}</span>
                    <span class="font-mono font-bold text-primary">\${{ exp.amount | number:'1.2-2' }}</span>
                  </div>
                  <div class="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/20">
                    <span>Receipt Photo Attached</span>
                    @if (exp.status === 'approved') {
                      <span class="text-emerald-600 dark:text-emerald-400 font-bold">Reimbursed</span>
                    } @else {
                      <button hlmBtn variant="default" size="sm" class="h-6 text-[10px] cursor-pointer" (click)="approveExpense(exp)">
                        Approve Claim
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Vehicle Assignment Drawer -->
      <hlm-sheet [isOpen]="vehicleAssignSheetOpen()" (closed)="vehicleAssignSheetOpen.set(false)">
        <div hlmSheetHeader class="space-y-1">
          <h3 hlmSheetTitle>Reassign Vehicle</h3>
          <p hlmSheetDescription>
            Select a fleet asset to pair with chauffeur {{ driver().fullName }}.
          </p>
        </div>

        <div class="py-5 space-y-4 text-xs">
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Available Fleet Vehicles</label>
            <select
              [(ngModel)]="selectedVehicleId"
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select a vehicle...</option>
              @for (v of vehicleOptions(); track v.value) {
                <option [value]="v.value">{{ v.label }}</option>
              }
            </select>
          </div>

          <div class="rounded-lg border border-border/50 bg-muted/20 p-3 space-y-1 text-muted-foreground text-[11px]">
            <p><strong>Current Pairing:</strong> {{ driver().assignedVehicle }}</p>
            <p>Reassigning pairs this driver's digital key and telematics logging to the newly selected asset.</p>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="vehicleAssignSheetOpen.set(false)" class="cursor-pointer text-xs">
            Cancel
          </button>
          <button hlmBtn (click)="confirmVehicleAssignment()" class="cursor-pointer text-xs" [disabled]="!selectedVehicleId">
            Confirm Assignment
          </button>
        </div>
      </hlm-sheet>
    </app-main>
  `,
})
export class DriverDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute)
  private readonly refData = inject(ReferenceDataService)

  readonly vehicleOptions = this.refData.vehicleOptions
  readonly vehicleAssignSheetOpen = signal<boolean>(false)
  selectedVehicleId = ''

  readonly driver = signal<DriverDossier>({
    id: 'drv-1',
    fullName: 'Marco Rossi',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    phone: '+41 79 982 1100',
    email: 'marco.rossi@swisschauffeur.ch',
    assignedVehicle: 'Mercedes-Benz S-Class (ZH-88291)',
    dutyStatus: 'available',
    rating: 4.96,
    totalTrips: 342,
    incidentFreeDays: 780,
    licenseNumber: 'CH-DL-7739182',
    licenseExpiry: '2028-11-15',
    daysUntilExpiry: 792,
    isVerified: true,
    recentTrips: [
      {
        id: 'tr-1',
        date: 'Sep 12',
        route: 'Zurich Airport ➔ Zermatt Hub',
        passengerName: 'Emma Richardson',
        fare: 260,
        rating: 5.0,
      },
      {
        id: 'tr-2',
        date: 'Sep 10',
        route: 'Geneva Airport ➔ Chamonix Center',
        passengerName: 'Hiroshi Tanaka',
        fare: 175,
        rating: 4.9,
      },
      {
        id: 'tr-3',
        date: 'Sep 06',
        route: 'Zurich Station ➔ Davos Congress Center',
        passengerName: 'David Miller',
        fare: 310,
        rating: 5.0,
      },
    ],
    pendingExpenses: [
      {
        id: 'exp-1',
        type: 'Tunnel Toll Fee (Gotthard)',
        amount: 28.5,
        receiptPhoto: 'toll_receipt.jpg',
        status: 'pending',
      },
      {
        id: 'exp-2',
        type: 'Airport Premium Parking',
        amount: 15.0,
        receiptPhoto: 'parking_ticket.jpg',
        status: 'pending',
      },
    ],
  })

  ngOnInit(): void {}

  reassignVehicle(): void {
    this.selectedVehicleId = ''
    this.vehicleAssignSheetOpen.set(true)
  }

  confirmVehicleAssignment(): void {
    const selected = this.vehicleOptions().find((v) => v.value === this.selectedVehicleId)
    if (selected) {
      this.driver.update((d) => ({
        ...d,
        assignedVehicle: selected.label,
      }))
      toast.success('Vehicle Assigned', {
        description: `Paired ${selected.label} with ${this.driver().fullName}.`,
      })
    }
    this.vehicleAssignSheetOpen.set(false)
  }

  approveExpense(exp: any): void {
    exp.status = 'approved'
    toast.success('Expense Claim Approved', {
      description: `\$${exp.amount} credited to driver Marco Rossi's payout wallet balance.`,
    })
  }
}
