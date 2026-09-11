import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HlmAvatarImports } from '../../../ui/avatar/hlm-avatar.components'
import { UserHoverCardComponent } from '../../../shared/components/user-hover-card/user-hover-card.component'
import { getDisplayNameInitials } from '../../../core/utils/initials'

interface SaleItem {
  name: string
  email: string
  amount: string
  avatar: string
  role?: string
}

@Component({
  selector: 'app-recent-sales',
  standalone: true,
  imports: [CommonModule, ...HlmAvatarImports, UserHoverCardComponent],
  template: `
    <div class="space-y-6">
      @for (sale of sales; track sale.email) {
        <div class="flex items-center gap-4 group">
          <!-- User Profile Hover Card on Avatar -->
          <app-user-hover-card
            [user]="{
              name: sale.name,
              email: sale.email,
              avatar: sale.avatar,
              role: sale.role || 'Customer',
              joinedDate: 'July 2024'
            }"
          >
            <hlm-avatar class="size-9 cursor-pointer transition-transform group-hover:scale-105 shadow-2xs">
              <img hlmAvatarImage [src]="sale.avatar" [alt]="sale.name" />
              <span hlmAvatarFallback>{{ initials(sale.name) }}</span>
            </hlm-avatar>
          </app-user-hover-card>

          <div class="flex flex-1 flex-wrap items-center justify-between gap-2 min-w-0">
            <div class="space-y-1 min-w-0">
              <p class="text-sm font-medium leading-none truncate">{{ sale.name }}</p>
              <p class="text-xs text-muted-foreground truncate">{{ sale.email }}</p>
            </div>
            <div class="text-sm font-semibold text-foreground shrink-0 tabular-nums">{{ sale.amount }}</div>
          </div>
        </div>
      }
    </div>
  `,
})
export class RecentSalesComponent {
  readonly sales: SaleItem[] = [
    {
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      amount: '+$1,999.00',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      role: 'Enterprise Buyer',
    },
    {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      amount: '+$39.00',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      role: 'Pro Subscriber',
    },
    {
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      amount: '+$299.00',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Team Admin',
    },
    {
      name: 'William Kim',
      email: 'will@email.com',
      amount: '+$99.00',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      role: 'Developer',
    },
    {
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      amount: '+$39.00',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
      role: 'Pro Subscriber',
    },
  ]

  initials(name: string): string {
    return getDisplayNameInitials(name)
  }
}
