import { Component, OnInit, inject, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowLeft,
  lucideClipboardCheck,
  lucideCar,
  lucideDownload,
  lucideFileText,
  lucideSearch,
  lucideCheckCircle2,
  lucideAlertTriangle,
  lucideFuel,
  lucideGauge,
  lucideCamera,
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

export interface VehicleInspectionRecord {
  id: string
  certificateNumber: string
  vehicleModel: string
  licensePlate: string
  renterName: string
  inspectorName: string
  inspectionType: 'pre_handover' | 'post_return'
  odometerKm: number
  fuelLevelPercent: number
  damagesCount: number
  excessCharges: number
  depositReleased: boolean
  signedAt: string
  hasDigitalSignature: boolean
}

@Component({
  selector: 'app-vehicle-inspections',
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
      lucideClipboardCheck,
      lucideCar,
      lucideDownload,
      lucideFileText,
      lucideSearch,
      lucideCheckCircle2,
      lucideAlertTriangle,
      lucideFuel,
      lucideGauge,
      lucideCamera,
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
              <h1 class="text-2xl font-bold tracking-tight text-foreground">Vehicle Inspection & Condition Archive</h1>
              <span hlmBadge variant="outline" class="text-xs">
                {{ inspections().length }} Certificates Archived
              </span>
            </div>
            <p class="text-xs text-muted-foreground mt-0.5">
              Immutable digital custody chain: 8-point condition markup, odometer/fuel logs, and signed certificates.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" class="gap-1.5 cursor-pointer shadow-xs" (click)="exportBatchLog()">
            <ng-icon name="lucideDownload" class="size-4" />
            <span>Export Audit Trail (CSV)</span>
          </button>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="relative flex-1 max-w-sm">
          <ng-icon name="lucideSearch" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            hlmInput
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search by license plate, renter, or certificate #..."
            class="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg"
          />
        </div>

        <div class="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/40 shrink-0">
          <button
            type="button"
            (click)="selectedType.set('all')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedType() === 'all'"
            [class.shadow-2xs]="selectedType() === 'all'"
            [class.text-foreground]="selectedType() === 'all'"
            [class.text-muted-foreground]="selectedType() !== 'all'"
          >
            All Inspections
          </button>
          <button
            type="button"
            (click)="selectedType.set('pre_handover')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedType() === 'pre_handover'"
            [class.shadow-2xs]="selectedType() === 'pre_handover'"
            [class.text-foreground]="selectedType() === 'pre_handover'"
            [class.text-muted-foreground]="selectedType() !== 'pre_handover'"
          >
            Pre-Handover
          </button>
          <button
            type="button"
            (click)="selectedType.set('post_return')"
            class="px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer"
            [class.bg-background]="selectedType() === 'post_return'"
            [class.shadow-2xs]="selectedType() === 'post_return'"
            [class.text-foreground]="selectedType() === 'post_return'"
            [class.text-muted-foreground]="selectedType() !== 'post_return'"
          >
            Post-Return
          </button>
        </div>
      </div>

      <!-- Inspection Records Master Table -->
      <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
              <tr>
                <th scope="col" class="py-3 px-4">Certificate #</th>
                <th scope="col" class="py-3 px-4">Vehicle & Plate</th>
                <th scope="col" class="py-3 px-4">Renter / Driver</th>
                <th scope="col" class="py-3 px-4">Stage</th>
                <th scope="col" class="py-3 px-4">Odometer & Fuel</th>
                <th scope="col" class="py-3 px-4">Damage Markers</th>
                <th scope="col" class="py-3 px-4">Signed Timestamp</th>
                <th scope="col" class="py-3 px-4 text-right">PDF Certificate</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border/30 text-xs">
              @for (ins of filteredInspections(); track ins.id) {
                <tr class="hover:bg-muted/20 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-primary">
                    {{ ins.certificateNumber }}
                  </td>
                  <td class="py-3.5 px-4">
                    <div class="font-semibold text-foreground">{{ ins.vehicleModel }}</div>
                    <span class="font-mono text-[10px] text-muted-foreground">{{ ins.licensePlate }}</span>
                  </td>
                  <td class="py-3.5 px-4">
                    <div class="font-medium text-foreground">{{ ins.renterName }}</div>
                    <span class="text-[10px] text-muted-foreground">Inspected by: {{ ins.inspectorName }}</span>
                  </td>
                  <td class="py-3.5 px-4">
                    @if (ins.inspectionType === 'pre_handover') {
                      <span hlmBadge variant="outline" class="text-[10px] text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                        Pre-Handover
                      </span>
                    } @else {
                      <span hlmBadge variant="default" class="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        Post-Return
                      </span>
                    }
                  </td>
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-2 font-mono text-[11px] text-foreground">
                      <span>{{ ins.odometerKm }} km</span>
                      <span class="text-muted-foreground">•</span>
                      <span class="text-emerald-600 dark:text-emerald-400 font-bold">{{ ins.fuelLevelPercent }}% Fuel</span>
                    </div>
                  </td>
                  <td class="py-3.5 px-4">
                    @if (ins.damagesCount === 0) {
                      <span class="text-emerald-600 dark:text-emerald-400 font-medium">0 Flaws (Pristine)</span>
                    } @else {
                      <span class="text-amber-600 dark:text-amber-400 font-bold">
                        {{ ins.damagesCount }} Pre-Documented
                      </span>
                    }
                  </td>
                  <td class="py-3.5 px-4 text-muted-foreground">
                    {{ ins.signedAt }}
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button
                      hlmBtn
                      variant="outline"
                      size="sm"
                      class="h-7 text-xs gap-1 cursor-pointer"
                      (click)="downloadPdf(ins)"
                    >
                      <ng-icon name="lucideDownload" class="size-3.5" />
                      <span>PDF Certificate</span>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </app-main>
  `,
})
export class VehicleInspectionsComponent implements OnInit {
  readonly searchQuery = signal('')
  readonly selectedType = signal<'all' | 'pre_handover' | 'post_return'>('all')

  readonly inspections = signal<VehicleInspectionRecord[]>([
    {
      id: 'ins-1',
      certificateNumber: 'CERT-2026-991',
      vehicleModel: 'Tesla Model Y Long Range',
      licensePlate: 'ZH-49210',
      renterName: 'Emma Richardson',
      inspectorName: 'Hans Weber',
      inspectionType: 'pre_handover',
      odometerKm: 24150,
      fuelLevelPercent: 95,
      damagesCount: 1,
      excessCharges: 0,
      depositReleased: false,
      signedAt: 'Today, 09:30 AM',
      hasDigitalSignature: true,
    },
    {
      id: 'ins-2',
      certificateNumber: 'CERT-2026-990',
      vehicleModel: 'BMW 5-Series M Sport',
      licensePlate: 'GE-11029',
      renterName: 'Liam Chen',
      inspectorName: 'Claire Laurent',
      inspectionType: 'post_return',
      odometerKm: 18450,
      fuelLevelPercent: 100,
      damagesCount: 0,
      excessCharges: 0,
      depositReleased: true,
      signedAt: 'Yesterday, 05:15 PM',
      hasDigitalSignature: true,
    },
    {
      id: 'ins-3',
      certificateNumber: 'CERT-2026-989',
      vehicleModel: 'Toyota Land Cruiser 4x4',
      licensePlate: 'VS-88219',
      renterName: 'Sofia Martinez',
      inspectorName: 'Hans Weber',
      inspectionType: 'post_return',
      odometerKm: 42100,
      fuelLevelPercent: 70,
      damagesCount: 2,
      excessCharges: 45,
      depositReleased: true,
      signedAt: 'Sep 11, 02:00 PM',
      hasDigitalSignature: true,
    },
  ])

  readonly filteredInspections = computed(() => {
    let list = this.inspections()
    const type = this.selectedType()
    const query = this.searchQuery().toLowerCase().trim()

    if (type !== 'all') {
      list = list.filter((i) => i.inspectionType === type)
    }

    if (query) {
      list = list.filter(
        (i) =>
          i.certificateNumber.toLowerCase().includes(query) ||
          i.vehicleModel.toLowerCase().includes(query) ||
          i.licensePlate.toLowerCase().includes(query) ||
          i.renterName.toLowerCase().includes(query)
      )
    }

    return list
  })

  ngOnInit(): void {}

  downloadPdf(ins: VehicleInspectionRecord): void {
    toast.success('Certificate Downloaded', {
      description: `Official signed PDF certificate ${ins.certificateNumber} generated.`,
    })
  }

  exportBatchLog(): void {
    toast.info('Audit Log Exported', {
      description: 'The inspection custody log has been exported to CSV.',
    })
  }
}
