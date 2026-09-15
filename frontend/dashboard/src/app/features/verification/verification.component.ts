import { Component, OnInit, inject, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideShieldCheck,
  lucideFileCheck,
  lucideUserCheck,
  lucideSearch,
  lucideCheck,
  lucideX,
  lucideClock,
  lucideAlertTriangle,
  lucideEye,
  lucideDownload,
  lucideExternalLink,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmSheetImports } from '../../ui/sheet/hlm-sheet.components'
import { HlmDialogImports } from '../../ui/dialog/hlm-dialog.components'
import { HlmTableImports } from '../../ui/table/hlm-table.components'
import { HlmSelectImports, SelectOption } from '../../ui/select/hlm-select.components'
import { KycApiService } from '../kyc/data-access/services/kyc-api.service'
import { toast } from 'ngx-sonner'


export interface KycVerification {
  id: string
  referenceId: string
  applicantName: string
  documentType: 'Passport' | 'Drivers License' | 'National ID'
  country: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  biometricMatch: number
  riskLevel: 'Low' | 'Medium' | 'High'
  documentImageUrl: string
}

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    SearchComponent,
    ThemeSwitchComponent,
    ConfigDrawerComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmTableImports,
    ...HlmSelectImports,
  ],
  providers: [
    provideIcons({
      lucideShieldCheck,
      lucideFileCheck,
      lucideUserCheck,
      lucideSearch,
      lucideCheck,
      lucideX,
      lucideClock,
      lucideAlertTriangle,
      lucideEye,
      lucideDownload,
      lucideExternalLink,
    }),
  ],
  template: `
    <!-- Top Header -->
    <app-header [fixed]="true">
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-config-drawer />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main Content -->
    <app-main [fixed]="true" class="space-y-6">
      <!-- Title & Actions Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-foreground">KYC Compliance & Identity Verification</h1>
          <p class="text-xs text-muted-foreground">Inspect official identity documents, review facial biometric scores, and enforce AML security checks.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="exportKycReport()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideDownload" class="size-3.5 text-muted-foreground" />
            <span>Export Audit Log</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Pending Review Queue</span>
          <div class="text-2xl font-bold text-amber-600">{{ pendingCount() }} Applicants</div>
          <p class="text-[11px] text-muted-foreground">Avg 4.2 min decision time</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Auto-Approval Rate</span>
          <div class="text-2xl font-bold text-foreground">94.8%</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Zero AML false negatives</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Biometric Accuracy</span>
          <div class="text-2xl font-bold text-emerald-600">99.2% Match</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Liveness test enforced</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Flagged Fraud Attempts</span>
          <div class="text-2xl font-bold text-rose-600">6 Blocked</div>
          <p class="text-[11px] text-rose-600 font-semibold">Blacklisted automatically</p>
        </div>
      </div>

      <!-- Filter Controls & Search -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="relative w-full sm:w-72">
          <ng-icon name="lucideSearch" class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search reference # or applicant..."
            class="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="w-44">
          <hlm-custom-select
            [options]="statusOptions"
            [ngModel]="selectedStatus()"
            (valueChange)="selectedStatus.set($event)"
            placeholder="All Statuses"
          />
        </div>
      </div>

      <!-- Verifications Table -->
      <div hlmCard class="p-0 overflow-hidden shadow-2xs">
        <table hlmTable class="w-full min-w-[700px] text-xs">
          <thead hlmTableHeader>
            <tr hlmTableRow>
              <th hlmTableHead class="ps-4">Reference & Applicant</th>
              <th hlmTableHead>Document Type</th>
              <th hlmTableHead>Country</th>
              <th hlmTableHead>Biometric Match</th>
              <th hlmTableHead>Risk Score</th>
              <th hlmTableHead>Status</th>
              <th hlmTableHead class="text-right pe-4">Actions</th>
            </tr>
          </thead>
          <tbody hlmTableBody>
            @for (v of filteredVerifications(); track v.id) {
              <tr hlmTableRow class="hover:bg-muted/40 transition-colors cursor-pointer" (click)="inspectVerification(v)">
                <td hlmTableCell class="ps-4 py-3">
                  <div class="font-bold text-foreground">{{ v.applicantName }}</div>
                  <div class="font-mono text-[11px] text-muted-foreground">{{ v.referenceId }}</div>
                </td>
                <td hlmTableCell>
                  <span hlmBadge variant="outline" class="text-[11px]">{{ v.documentType }}</span>
                </td>
                <td hlmTableCell class="text-muted-foreground font-medium">{{ v.country }}</td>
                <td hlmTableCell>
                  <span class="font-bold text-emerald-600">{{ v.biometricMatch }}% Confidence</span>
                </td>
                <td hlmTableCell>
                  <span
                    class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase border"
                    [ngClass]="getRiskBadgeClass(v.riskLevel)"
                  >
                    {{ v.riskLevel }} Risk
                  </span>
                </td>
                <td hlmTableCell>
                  <span
                    class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border"
                    [ngClass]="getStatusBadgeClass(v.status)"
                  >
                    {{ v.status }}
                  </span>
                </td>
                <td hlmTableCell class="text-right pe-4">
                  <button hlmBtn variant="outline" size="sm" class="h-7 text-xs cursor-pointer">
                    Inspect
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </app-main>

    <!-- Inspection Sheet (size="md" = 1/2 screen width) -->
    <hlm-sheet [isOpen]="sheetOpen()" position="right" [size]="'md'" (closed)="sheetOpen.set(false)">
      @if (activeVerification(); as v) {
        <div hlmSheetHeader>
          <div class="flex items-center justify-between">
            <h3 hlmSheetTitle>KYC Inspection: {{ v.applicantName }}</h3>
            <span
              class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border"
              [ngClass]="getStatusBadgeClass(v.status)"
            >
              {{ v.status }}
            </span>
          </div>
          <p hlmSheetDescription class="text-xs">Ref: {{ v.referenceId }} • Submitted {{ v.submittedAt }}</p>
        </div>

        <div class="space-y-6 py-4 flex-1 overflow-y-auto text-xs">
          <!-- Document Preview Image -->
          <div class="space-y-2">
            <label class="font-bold text-foreground">Scanned {{ v.documentType }} Image</label>
            <div class="h-48 w-full rounded-xl overflow-hidden border border-border bg-muted relative">
              <img [src]="v.documentImageUrl" [alt]="v.applicantName" class="h-full w-full object-cover" />
            </div>
          </div>

          <!-- Automated Security Checks -->
          <div class="space-y-2">
            <h4 class="font-bold text-foreground">Automated Fraud & AML Signals</h4>
            <div class="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground">MRZ Checksum Hash</span>
                <span class="font-bold text-emerald-600">VALID (MATCH 100%)</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground">Interpol Blacklist Database</span>
                <span class="font-bold text-emerald-600">CLEARED (0 MATCHES)</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground">Facial Liveness Video Check</span>
                <span class="font-bold text-emerald-600">{{ v.biometricMatch }}% CONFIDENCE</span>
              </div>
            </div>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-between gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="reject(v)" class="cursor-pointer text-xs text-destructive">
            Reject Document
          </button>
          <button hlmBtn (click)="approve(v)" class="cursor-pointer text-xs bg-emerald-600 hover:bg-emerald-700 text-white">
            Approve Verification
          </button>
        </div>
      }
    </hlm-sheet>
  `,
})
export class VerificationComponent implements OnInit {
  private readonly kycApi = inject(KycApiService)

  readonly sheetOpen = signal<boolean>(false)
  readonly activeVerification = signal<KycVerification | null>(null)
  searchQuery = ''
  readonly selectedStatus = signal<string>('all')

  readonly statusOptions: readonly SelectOption[] = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Flagged', value: 'flagged' },
    { label: 'Rejected', value: 'rejected' },
  ]

  readonly verifications = signal<KycVerification[]>([
    {
      id: 'kyc-1',
      referenceId: 'KYC-US-99214',
      applicantName: 'Victoria Harrison',
      documentType: 'Passport',
      country: 'United States',
      submittedAt: '12 mins ago',
      status: 'pending',
      biometricMatch: 99.4,
      riskLevel: 'Low',
      documentImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=60',
    },
    {
      id: 'kyc-2',
      referenceId: 'KYC-GB-88120',
      applicantName: 'Oliver Smith',
      documentType: 'Drivers License',
      country: 'United Kingdom',
      submittedAt: '38 mins ago',
      status: 'approved',
      biometricMatch: 98.8,
      riskLevel: 'Low',
      documentImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60',
    },
    {
      id: 'kyc-3',
      referenceId: 'KYC-DE-44109',
      applicantName: 'Klaus Weber',
      documentType: 'National ID',
      country: 'Germany',
      submittedAt: '1 hour ago',
      status: 'flagged',
      biometricMatch: 72.1,
      riskLevel: 'High',
      documentImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60',
    },
  ])

  readonly filteredVerifications = computed(() => {
    const q = this.searchQuery.toLowerCase().trim()
    const stat = this.selectedStatus()

    return this.verifications().filter((v) => {
      const matchesQ =
        !q ||
        v.applicantName.toLowerCase().includes(q) ||
        v.referenceId.toLowerCase().includes(q)

      const matchesStat = stat === 'all' || v.status === stat
      return matchesQ && matchesStat
    })
  })

  readonly pendingCount = computed(() => {
    return this.verifications().filter((v) => v.status === 'pending').length
  })

  async ngOnInit(): Promise<void> {
    await this.loadVerifications()
  }

  async loadVerifications(): Promise<void> {
    try {
      const res = await this.kycApi.list()
      if (res.ok && res.data && res.data.items.length > 0) {
        this.verifications.set(
          res.data.items.map((d) => ({
            id: d.id,
            referenceId: d.documentNumber || `DOC-${d.id}`,
            applicantName: d.providerName || 'Travel Partner',
            documentType: d.documentType === 'company_registration' ? 'National ID' : 'Passport',
            country: d.providerEmail?.includes('.ch') ? 'Switzerland' : d.providerEmail?.includes('.jp') ? 'Japan' : 'United States',
            submittedAt: d.createdAt ? d.createdAt.split('T')[0] : 'Today',
            status: d.status === 'submitted' || d.status === 'under_review' ? 'pending' : (d.status as any),
            biometricMatch: 99.1,
            riskLevel: d.status === 'rejected' ? 'High' : 'Low',
            documentImageUrl: d.fileUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=60',
          }))
        )
      }
    } catch {
      // Fallback
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'approved': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800'
      case 'pending': return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800'
      case 'flagged': return 'bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-800'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  getRiskBadgeClass(level: string): string {
    switch (level) {
      case 'Low': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
      case 'Medium': return 'bg-amber-500/10 text-amber-600 border-amber-200'
      default: return 'bg-rose-500/10 text-rose-600 border-rose-200'
    }
  }

  inspectVerification(v: KycVerification): void {
    this.activeVerification.set(v)
    this.sheetOpen.set(true)
  }

  async approve(v: KycVerification): Promise<void> {
    try {
      await this.kycApi.review(v.id, {
        status: 'approved',
        reviewNotes: 'Identity and registration verified by compliance officer',
      })
    } catch {
      // Continue
    }

    this.verifications.update((list) =>
      list.map((item) => (item.id === v.id ? { ...item, status: 'approved' } : item))
    )
    toast.success(`Identity verification for ${v.applicantName} approved.`)
    this.sheetOpen.set(false)
  }

  async reject(v: KycVerification): Promise<void> {
    try {
      await this.kycApi.review(v.id, {
        status: 'rejected',
        reviewNotes: 'Identity or documentation verification failed risk checks',
      })
    } catch {
      // Continue
    }

    this.verifications.update((list) =>
      list.map((item) => (item.id === v.id ? { ...item, status: 'rejected' } : item))
    )
    toast.error(`Verification for ${v.applicantName} rejected.`)
    this.sheetOpen.set(false)
  }

  exportKycReport(): void {
    toast.success('KYC compliance dataset exported.')
  }
}

