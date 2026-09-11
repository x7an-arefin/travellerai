import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideEye,
  lucideEdit,
  lucideShieldCheck,
  lucideBuilding2,
  lucideStar,
  lucideMapPin,
  lucideMail,
  lucideLock,
} from '@ng-icons/lucide'
import { Provider } from '../data-access/models/providers.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-providers-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideEye,
      lucideEdit,
      lucideShieldCheck,
      lucideBuilding2,
      lucideStar,
      lucideMapPin,
      lucideMail,
      lucideLock,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Provider Agency</th>
              <th scope="col" class="py-3.5 px-4">Type</th>
              <th scope="col" class="py-3.5 px-4">Country & Reg.</th>
              <th scope="col" class="py-3.5 px-4">KYC Status</th>
              <th scope="col" class="py-3.5 px-4">Commission</th>
              <th scope="col" class="py-3.5 px-4">Rating & Trips</th>
              <th scope="col" class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-8 w-40 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-20 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-28 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-20 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-6 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-8 w-16 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (rows.length === 0) {
              <tr>
                <td colspan="7" class="py-12 text-center text-muted-foreground">
                  <p class="text-sm font-medium">No travel providers found.</p>
                </td>
              </tr>
            } @else {
              @for (p of rows; track p.id) {
                <tr class="hover:bg-muted/20 transition-colors group">
                  <!-- Provider Name & Badge -->
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <div class="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                        <ng-icon name="lucideBuilding2" class="size-5" />
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-1.5">
                          <span
                            class="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors cursor-pointer"
                            (click)="viewClicked.emit(p.id)"
                          >
                            {{ p.displayName }}
                          </span>
                          @if (p.verifiedBadge) {
                            <ng-icon name="lucideShieldCheck" class="size-4 text-emerald-500 shrink-0" title="Verified Provider" />
                          }
                        </div>
                        <div class="text-xs text-muted-foreground truncate">
                          {{ p.legalName }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Type -->
                  <td class="py-3.5 px-4">
                    <span hlmBadge variant="outline" class="text-[11px] capitalize font-medium">
                      {{ p.providerType.replace('_', ' ') }}
                    </span>
                  </td>

                  <!-- Country & Reg -->
                  <td class="py-3.5 px-4 text-xs font-medium text-foreground">
                    <div class="flex items-center gap-1">
                      <ng-icon name="lucideMapPin" class="size-3 text-muted-foreground" />
                      <span>{{ p.country }}</span>
                    </div>
                    <div class="text-[10px] text-muted-foreground font-mono mt-0.5">
                      {{ p.registrationNumber }}
                    </div>
                  </td>

                  <!-- KYC Status -->
                  <td class="py-3.5 px-4">
                    @if (p.kycStatus === 'approved') {
                      <span hlmBadge variant="default" class="text-[11px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        KYC Approved
                      </span>
                    } @else if (p.kycStatus === 'under_review') {
                      <span hlmBadge variant="outline" class="text-[11px] text-amber-600 dark:text-amber-400 border-amber-500/30">
                        Under Review
                      </span>
                    } @else {
                      <span hlmBadge variant="secondary" class="text-[11px]">
                        {{ p.kycStatus }}
                      </span>
                    }
                  </td>

                  <!-- Commission Rate -->
                  <td class="py-3.5 px-4 text-xs font-bold text-foreground tabular-nums">
                    {{ p.commissionRate }}%
                  </td>

                  <!-- Rating & Bookings -->
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-1 text-amber-500 font-semibold text-xs">
                      <ng-icon name="lucideStar" class="size-3.5 fill-amber-500" />
                      <span>{{ p.rating }}</span>
                    </div>
                    <div class="text-[11px] text-muted-foreground mt-0.5">
                      {{ p.totalBookings }} trips completed
                    </div>
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
                        title="View Dossier"
                        (click)="viewClicked.emit(p.id)"
                      >
                        <ng-icon name="lucideEye" class="size-4" />
                      </button>

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-8 p-0 text-muted-foreground hover:text-primary cursor-pointer"
                        title="Edit Provider"
                        (click)="editClicked.emit(p.id)"
                      >
                        <ng-icon name="lucideEdit" class="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class ProvidersTableComponent {
  @Input() rows: Provider[] = []
  @Input() isLoading: boolean = false

  @Output() viewClicked = new EventEmitter<string>()
  @Output() editClicked = new EventEmitter<string>()
}
