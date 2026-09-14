import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideStar,
  lucideTrash2,
  lucideAward,
  lucidePhone,
  lucideMail,
} from '@ng-icons/lucide'
import { GuideProfile } from '../data-access/models/staff.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-staff-guides-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideStar,
      lucideTrash2,
      lucideAward,
      lucidePhone,
      lucideMail,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Tour Guide / Specialist</th>
              <th scope="col" class="py-3.5 px-4">Spoken Languages</th>
              <th scope="col" class="py-3.5 px-4">Certifications & Specialties</th>
              <th scope="col" class="py-3.5 px-4">Rating & Experience</th>
              <th scope="col" class="py-3.5 px-4">Availability</th>
              <th scope="col" class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @for (g of items; track g.id) {
              <tr class="hover:bg-muted/20 transition-colors text-xs">
                <td class="py-3.5 px-4">
                  <div class="flex items-center gap-3">
                    <img
                      [src]="g.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120'"
                      [alt]="g.name"
                      class="size-10 rounded-full object-cover border border-border/60 shrink-0"
                    />
                    <div>
                      <p class="font-bold text-foreground text-sm">{{ g.name }}</p>
                      <p class="text-[11px] text-muted-foreground">{{ g.email }}</p>
                    </div>
                  </div>
                </td>

                <td class="py-3.5 px-4">
                  <div class="flex flex-wrap gap-1 max-w-xs">
                    @for (lang of g.languages; track lang) {
                      <span class="text-[10px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground">
                        {{ lang }}
                      </span>
                    }
                  </div>
                </td>

                <td class="py-3.5 px-4">
                  <div class="space-y-0.5 max-w-xs">
                    <div class="flex items-center gap-1 text-[11px] font-medium text-foreground">
                      <ng-icon name="lucideAward" class="size-3 text-amber-500 shrink-0" />
                      <span class="truncate">{{ g.certifications[0] || 'Certified Guide' }}</span>
                    </div>
                    <p class="text-[10px] text-muted-foreground truncate">{{ g.specialties.join(', ') }}</p>
                  </div>
                </td>

                <td class="py-3.5 px-4">
                  <div class="flex items-center gap-1 text-amber-500 font-bold">
                    <ng-icon name="lucideStar" class="size-3.5 fill-amber-500" />
                    <span>{{ g.rating || 5.0 }}</span>
                  </div>
                  <span class="text-[10px] text-muted-foreground">{{ g.totalToursLed || 0 }} departures led</span>
                </td>

                <td class="py-3.5 px-4">
                  <span
                    hlmBadge
                    [variant]="g.isAvailable ? 'default' : 'secondary'"
                    class="text-[10px]"
                  >
                    {{ g.isAvailable ? 'Available' : 'On Tour / Busy' }}
                  </span>
                </td>

                <td class="py-3.5 px-4 text-right">
                  <button
                    hlmBtn
                    variant="ghost"
                    size="icon"
                    class="size-8 text-muted-foreground hover:text-destructive cursor-pointer"
                    title="Remove Guide Profile"
                    (click)="delete.emit(g.id)"
                  >
                    <ng-icon name="lucideTrash2" class="size-4" />
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class StaffGuidesTableComponent {
  @Input() items: GuideProfile[] = []
  @Output() delete = new EventEmitter<string>()
}
