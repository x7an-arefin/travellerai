import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideEye,
  lucideEdit,
  lucideTrash2,
  lucideStar,
  lucideMapPin,
  lucideClock,
  lucideUsers,
  lucideCheck,
} from '@ng-icons/lucide'
import { Package } from '../data-access/models/packages.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-packages-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideEye,
      lucideEdit,
      lucideTrash2,
      lucideStar,
      lucideMapPin,
      lucideClock,
      lucideUsers,
      lucideCheck,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Package</th>
              <th scope="col" class="py-3.5 px-4">Type</th>
              <th scope="col" class="py-3.5 px-4">Duration</th>
              <th scope="col" class="py-3.5 px-4">Price</th>
              <th scope="col" class="py-3.5 px-4">Rating & Bookings</th>
              <th scope="col" class="py-3.5 px-4">Status</th>
              <th scope="col" class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3, 4]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-10 w-48 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-20 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-20 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-8 w-16 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (rows.length === 0) {
              <tr>
                <td colspan="7" class="py-12 text-center text-muted-foreground">
                  <p class="text-sm font-medium">No travel packages found.</p>
                  <p class="text-xs text-muted-foreground mt-1">Try adjusting your filters or create a new package.</p>
                </td>
              </tr>
            } @else {
              @for (pkg of rows; track pkg.id) {
                <tr class="hover:bg-muted/20 transition-colors group">
                  <!-- Package Info -->
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <img
                        [src]="pkg.featuredImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100'"
                        [alt]="pkg.title"
                        class="size-11 rounded-lg object-cover shrink-0 border border-border/50"
                      />
                      <div class="min-w-0">
                        <div class="font-semibold text-foreground text-sm truncate max-w-xs group-hover:text-primary transition-colors cursor-pointer"
                             (click)="viewClicked.emit(pkg.id)">
                          {{ pkg.title }}
                        </div>
                        <div class="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                          <ng-icon name="lucideMapPin" class="size-3 text-primary" />
                          <span>{{ pkg.destinationId }}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Product Type -->
                  <td class="py-3.5 px-4">
                    <span hlmBadge variant="outline" class="text-[11px] capitalize font-medium">
                      {{ formatProductType(pkg.productType) }}
                    </span>
                  </td>

                  <!-- Duration -->
                  <td class="py-3.5 px-4 text-xs font-medium text-foreground">
                    <div class="flex items-center gap-1">
                      <ng-icon name="lucideClock" class="size-3.5 text-muted-foreground" />
                      <span>{{ pkg.durationDays }} Days</span>
                    </div>
                  </td>

                  <!-- Price -->
                  <td class="py-3.5 px-4">
                    <div class="font-bold text-foreground text-sm tabular-nums">
                      \${{ pkg.basePrice | number:'1.0-0' }}
                    </div>
                    <div class="text-[10px] text-muted-foreground uppercase">{{ pkg.currency }} / person</div>
                  </td>

                  <!-- Rating & Bookings -->
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-1 text-amber-500 font-semibold text-xs">
                      <ng-icon name="lucideStar" class="size-3.5 fill-amber-500" />
                      <span>{{ pkg.rating || 5.0 }}</span>
                      <span class="text-muted-foreground font-normal text-[11px]">({{ pkg.reviewCount || 0 }})</span>
                    </div>
                    <div class="text-[11px] text-muted-foreground mt-0.5">
                      {{ pkg.totalBookings || 0 }} booked
                    </div>
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4">
                    @if (pkg.status === 'published') {
                      <span hlmBadge variant="default" class="text-[11px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        Published
                      </span>
                    } @else if (pkg.status === 'under_review') {
                      <span hlmBadge variant="outline" class="text-[11px] text-amber-600 dark:text-amber-400 border-amber-500/30">
                        Under Review
                      </span>
                    } @else if (pkg.status === 'draft') {
                      <span hlmBadge variant="secondary" class="text-[11px]">
                        Draft
                      </span>
                    } @else {
                      <span hlmBadge variant="destructive" class="text-[11px]">
                        {{ pkg.status }}
                      </span>
                    }
                  </td>

                  <!-- Actions -->
                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
                        title="View Details"
                        (click)="viewClicked.emit(pkg.id)"
                      >
                        <ng-icon name="lucideEye" class="size-4" />
                      </button>

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-8 p-0 text-muted-foreground hover:text-primary cursor-pointer"
                        title="Edit Package"
                        (click)="editClicked.emit(pkg.id)"
                      >
                        <ng-icon name="lucideEdit" class="size-4" />
                      </button>

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-8 p-0 text-muted-foreground hover:text-rose-500 cursor-pointer"
                        title="Delete"
                        (click)="deleteClicked.emit(pkg.id)"
                      >
                        <ng-icon name="lucideTrash2" class="size-4" />
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
export class PackagesTableComponent {
  @Input() rows: Package[] = []
  @Input() isLoading: boolean = false

  @Output() viewClicked = new EventEmitter<string>()
  @Output() editClicked = new EventEmitter<string>()
  @Output() deleteClicked = new EventEmitter<string>()

  formatProductType(type: string): string {
    return type ? type.replace(/_/g, ' ') : 'Tour'
  }
}
