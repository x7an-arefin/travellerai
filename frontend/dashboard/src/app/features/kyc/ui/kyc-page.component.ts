import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideShieldCheck,
  lucideShieldAlert,
  lucideFileText,
  lucideCheck,
  lucideX,
  lucideBuilding2,
  lucideEye,
  lucideDownload,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmCardImports } from '../../../ui/card/hlm-card.directives'
import { toast } from 'ngx-sonner'

export interface KycSubmission {
  id: string
  providerName: string
  country: string
  documentType: 'trade_license' | 'tax_certificate' | 'liability_insurance' | 'guide_certification'
  documentNumber: string
  submittedDate: string
  status: 'under_review' | 'approved' | 'rejected'
  fileSize: string
  expiryDate: string
}

@Component({
  selector: 'app-kyc-page',
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
    ...HlmBadgeImports,
    ...HlmButtonImports,
    ...HlmCardImports,
  ],
  providers: [
    provideIcons({
      lucideShieldCheck,
      lucideShieldAlert,
      lucideFileText,
      lucideCheck,
      lucideX,
      lucideBuilding2,
      lucideEye,
      lucideDownload,
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

    <!-- Main Content -->
    <app-main>
      <!-- Page Header -->
      <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight">KYC Business Verification</h1>
            <span hlmBadge variant="outline" class="text-xs">
              {{ pendingCount() }} Pending Review
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Audit trade licenses, regulatory certifications, and liability insurance from travel providers.
          </p>
        </div>
      </div>

      <!-- Compliance Submissions Table -->
      <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
              <tr>
                <th scope="col" class="py-3.5 px-4">Provider Agency</th>
                <th scope="col" class="py-3.5 px-4">Document Type</th>
                <th scope="col" class="py-3.5 px-4">Document / License #</th>
                <th scope="col" class="py-3.5 px-4">Expiry Date</th>
                <th scope="col" class="py-3.5 px-4">Status</th>
                <th scope="col" class="py-3.5 px-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border/30">
              @for (sub of submissions(); track sub.id) {
                <tr class="hover:bg-muted/20 transition-colors">
                  <!-- Provider -->
                  <td class="py-3.5 px-4">
                    <div class="font-semibold text-foreground text-sm">
                      {{ sub.providerName }}
                    </div>
                    <div class="text-xs text-muted-foreground">
                      {{ sub.country }}
                    </div>
                  </td>

                  <!-- Document Type -->
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-1.5 text-xs font-medium text-foreground capitalize">
                      <ng-icon name="lucideFileText" class="size-4 text-primary" />
                      <span>{{ sub.documentType.replace('_', ' ') }}</span>
                    </div>
                    <span class="text-[10px] text-muted-foreground">{{ sub.fileSize }} PDF</span>
                  </td>

                  <!-- Document # -->
                  <td class="py-3.5 px-4 text-xs font-mono font-medium text-foreground">
                    {{ sub.documentNumber }}
                  </td>

                  <!-- Expiry Date -->
                  <td class="py-3.5 px-4 text-xs text-muted-foreground">
                    {{ sub.expiryDate }}
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4">
                    @if (sub.status === 'approved') {
                      <span hlmBadge variant="default" class="text-[11px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        Approved
                      </span>
                    } @else if (sub.status === 'under_review') {
                      <span hlmBadge variant="outline" class="text-[11px] text-amber-600 dark:text-amber-400 border-amber-500/30">
                        Under Review
                      </span>
                    } @else {
                      <span hlmBadge variant="destructive" class="text-[11px]">
                        Rejected
                      </span>
                    }
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 text-right">
                    @if (sub.status === 'under_review') {
                      <div class="flex items-center justify-end gap-1">
                        <button
                          hlmBtn
                          variant="outline"
                          size="sm"
                          class="text-xs h-7 text-emerald-600 dark:text-emerald-400"
                          (click)="approve(sub.id)"
                        >
                          Approve
                        </button>
                        <button
                          hlmBtn
                          variant="ghost"
                          size="sm"
                          class="text-xs h-7 text-rose-500"
                          (click)="reject(sub.id)"
                        >
                          Reject
                        </button>
                      </div>
                    } @else {
                      <span class="text-xs text-muted-foreground">Verified</span>
                    }
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
export class KycPageComponent {
  readonly submissions = signal<KycSubmission[]>([
    {
      id: 'kyc-1',
      providerName: 'Himalayan Sherpa Treks',
      country: 'Nepal',
      documentType: 'trade_license',
      documentNumber: 'NP-TL-9948201',
      submittedDate: 'Sep 10, 2026',
      status: 'under_review',
      fileSize: '3.4 MB',
      expiryDate: 'Dec 31, 2028',
    },
    {
      id: 'kyc-2',
      providerName: 'Himalayan Sherpa Treks',
      country: 'Nepal',
      documentType: 'liability_insurance',
      documentNumber: 'INS-ALLIANZ-88219',
      submittedDate: 'Sep 10, 2026',
      status: 'under_review',
      fileSize: '1.8 MB',
      expiryDate: 'Aug 30, 2027',
    },
    {
      id: 'kyc-3',
      providerName: 'Alpine Wonders AG',
      country: 'Switzerland',
      documentType: 'trade_license',
      documentNumber: 'CHE-112.345.678',
      submittedDate: 'Aug 14, 2025',
      status: 'approved',
      fileSize: '2.1 MB',
      expiryDate: 'Permanent',
    },
    {
      id: 'kyc-4',
      providerName: 'PT Bali Paradise Adventures',
      country: 'Indonesia',
      documentType: 'liability_insurance',
      documentNumber: 'INS-ID-44210',
      submittedDate: 'Aug 14, 2025',
      status: 'approved',
      fileSize: '1.2 MB',
      expiryDate: 'Dec 31, 2027',
    },
  ])

  readonly pendingCount = () => this.submissions().filter(s => s.status === 'under_review').length

  approve(id: string): void {
    this.submissions.update(prev =>
      prev.map(s => (s.id === id ? { ...s, status: 'approved' } : s))
    )
    toast.success('KYC Document Approved', {
      description: 'The verification credential has been validated.',
    })
  }

  reject(id: string): void {
    this.submissions.update(prev =>
      prev.map(s => (s.id === id ? { ...s, status: 'rejected' } : s))
    )
    toast.error('KYC Document Rejected', {
      description: 'Provider has been requested to submit updated credentials.',
    })
  }
}
