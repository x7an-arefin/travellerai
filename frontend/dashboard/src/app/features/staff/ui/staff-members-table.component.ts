import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideShield,
  lucideMail,
} from '@ng-icons/lucide'
import { StaffMember } from '../data-access/models/staff.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'

@Component({
  selector: 'app-staff-members-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports],
  providers: [
    provideIcons({
      lucideShield,
      lucideMail,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Operator Staff Member</th>
              <th scope="col" class="py-3.5 px-4">Role & Permissions</th>
              <th scope="col" class="py-3.5 px-4">Access Status</th>
              <th scope="col" class="py-3.5 px-4 text-right">Created / Invited</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @for (m of items; track m.id) {
              <tr class="hover:bg-muted/20 transition-colors text-xs">
                <td class="py-3.5 px-4">
                  <div class="flex items-center gap-2.5">
                    <div class="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {{ m.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-semibold text-foreground">{{ m.name }}</p>
                      <p class="text-[11px] text-muted-foreground">{{ m.email }}</p>
                    </div>
                  </div>
                </td>

                <td class="py-3.5 px-4">
                  <span
                    hlmBadge
                    variant="outline"
                    class="text-[10px] capitalize font-medium inline-flex items-center gap-1"
                  >
                    <ng-icon name="lucideShield" class="size-3 text-muted-foreground" />
                    {{ m.role }}
                  </span>
                </td>

                <td class="py-3.5 px-4">
                  <span
                    hlmBadge
                    [variant]="m.status === 'active' ? 'default' : 'secondary'"
                    class="text-[10px] capitalize"
                  >
                    {{ m.status }}
                  </span>
                </td>

                <td class="py-3.5 px-4 text-right text-muted-foreground">
                  {{ (m.invitedAt || m.createdAt) | date:'mediumDate' }}
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class StaffMembersTableComponent {
  @Input() items: StaffMember[] = []
}
