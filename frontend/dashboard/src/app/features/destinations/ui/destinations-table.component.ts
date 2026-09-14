import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideEye,
  lucideEdit,
  lucideTrash2,
  lucideMapPin,
  lucideStar,
  lucidePackage,
  lucideCheck,
} from '@ng-icons/lucide'
import { Destination } from '../data-access/models/destinations.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-destinations-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideEye,
      lucideEdit,
      lucideTrash2,
      lucideMapPin,
      lucideStar,
      lucidePackage,
      lucideCheck,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Destination Hub</th>
              <th scope="col" class="py-3.5 px-4">Country & Region</th>
              <th scope="col" class="py-3.5 px-4">Active Packages</th>
              <th scope="col" class="py-3.5 px-4">Best Season</th>
              <th scope="col" class="py-3.5 px-4">Status</th>
              <th scope="col" class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3, 4]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-10 w-48 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-20 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-8 w-16 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (items.length === 0) {
              <tr>
                <td colspan="6" class="py-12 text-center text-muted-foreground text-sm">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <ng-icon name="lucideMapPin" class="size-8 text-muted-foreground/50" />
                    <p>No destinations found matching your criteria</p>
                  </div>
                </td>
              </tr>
            } @else {
              @for (item of items; track item.id) {
                <tr class="hover:bg-muted/20 transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <img
                        [src]="item.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&auto=format&fit=crop&q=80'"
                        [alt]="item.name"
                        class="size-11 rounded-lg object-cover border border-border/50 shrink-0"
                      />
                      <div class="min-w-0">
                        <div class="flex items-center gap-1.5">
                          <p class="font-semibold text-foreground truncate">{{ item.name }}</p>
                          @if (item.isFeatured) {
                            <span class="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-500 font-medium shrink-0">
                              Featured
                            </span>
                          }
                        </div>
                        <p class="text-xs text-muted-foreground truncate">{{ item.slug }}</p>
                      </div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="flex flex-col">
                      <span class="font-medium text-foreground text-xs">{{ item.country }}</span>
                      <span class="text-[11px] text-muted-foreground">{{ item.stateRegion || 'National' }}</span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <ng-icon name="lucidePackage" class="size-3.5 text-primary" />
                      <span>{{ item.activePackagesCount || 0 }} Tours</span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 text-xs text-muted-foreground">
                    {{ item.weatherInfo?.bestTimeToVisit || 'All Year' }}
                  </td>

                  <td class="py-3.5 px-4">
                    <span
                      hlmBadge
                      [variant]="item.status === 'active' ? 'default' : item.status === 'draft' ? 'secondary' : 'outline'"
                      class="text-[10px] capitalize font-medium"
                    >
                      {{ item.status }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        class="size-8 cursor-pointer text-muted-foreground hover:text-foreground"
                        title="View Details"
                        (click)="view.emit(item.id)"
                      >
                        <ng-icon name="lucideEye" class="size-4" />
                      </button>
                      <button
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        class="size-8 cursor-pointer text-muted-foreground hover:text-foreground"
                        title="Edit Destination"
                        (click)="edit.emit(item.id)"
                      >
                        <ng-icon name="lucideEdit" class="size-4" />
                      </button>
                      <button
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        class="size-8 cursor-pointer text-muted-foreground hover:text-destructive"
                        title="Delete Destination"
                        (click)="delete.emit(item.id)"
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
export class DestinationsTableComponent {
  @Input() items: Destination[] = []
  @Input() isLoading = false

  @Output() view = new EventEmitter<string>()
  @Output() edit = new EventEmitter<string>()
  @Output() delete = new EventEmitter<string>()
}
