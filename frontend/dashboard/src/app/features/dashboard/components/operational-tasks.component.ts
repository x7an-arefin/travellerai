import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideShieldAlert,
  lucideClock,
  lucideFileText,
  lucideAlertTriangle,
  lucideCheckCircle2,
  lucideArrowRight,
  lucideMessageSquare,
} from '@ng-icons/lucide'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

export interface OperationalTask {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: 'kyc' | 'departure' | 'payout' | 'inquiry'
  actionUrl: string
  actionLabel: string
  dueText: string
}

@Component({
  selector: 'app-operational-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideShieldAlert,
      lucideClock,
      lucideFileText,
      lucideAlertTriangle,
      lucideCheckCircle2,
      lucideArrowRight,
      lucideMessageSquare,
    }),
  ],
  template: `
    <div class="space-y-3">
      @for (task of tasks; track task.id) {
        <div class="p-3.5 rounded-lg border border-border/40 bg-card/60 hover:border-primary/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="mt-0.5 size-8 rounded-md flex items-center justify-center shrink-0"
                 [class.bg-rose-500/15]="task.priority === 'high'"
                 [class.text-rose-500]="task.priority === 'high'"
                 [class.bg-amber-500/15]="task.priority === 'medium'"
                 [class.text-amber-500]="task.priority === 'medium'"
                 [class.bg-sky-500/15]="task.priority === 'low'"
                 [class.text-sky-500]="task.priority === 'low'">
              @if (task.category === 'kyc') {
                <ng-icon name="lucideShieldAlert" class="size-4" />
              } @else if (task.category === 'departure') {
                <ng-icon name="lucideClock" class="size-4" />
              } @else if (task.category === 'payout') {
                <ng-icon name="lucideAlertTriangle" class="size-4" />
              } @else {
                <ng-icon name="lucideMessageSquare" class="size-4" />
              }
            </div>

            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h5 class="text-xs font-semibold text-foreground">{{ task.title }}</h5>
                @if (task.priority === 'high') {
                  <span hlmBadge variant="destructive" class="text-[9px] px-1 py-0 h-4">Urgent</span>
                }
              </div>
              <p class="text-[11px] text-muted-foreground">{{ task.description }}</p>
              <div class="text-[10px] text-muted-foreground/80 font-medium">{{ task.dueText }}</div>
            </div>
          </div>

          <div class="shrink-0 pl-11 sm:pl-0">
            <a [routerLink]="task.actionUrl" hlmBtn variant="outline" size="sm" class="text-xs h-7 gap-1">
              <span>{{ task.actionLabel }}</span>
              <ng-icon name="lucideArrowRight" class="size-3" />
            </a>
          </div>
        </div>
      }
    </div>
  `,
})
export class OperationalTasksComponent {
  readonly tasks: OperationalTask[] = [
    {
      id: 'task-1',
      title: '3 Travel Agencies Pending KYC Review',
      description: 'Trade license & insurance verification documents uploaded by Himalayan Expeditions.',
      priority: 'high',
      category: 'kyc',
      actionUrl: '/kyc',
      actionLabel: 'Review KYC',
      dueText: 'Requires approval within 24h',
    },
    {
      id: 'task-2',
      title: 'Tour Guide Unassigned for Swiss Alps Departure',
      description: 'Departure TRV-DEP-402 on Sep 18 (14 participants confirmed) has no assigned certified guide.',
      priority: 'high',
      category: 'departure',
      actionUrl: '/departures',
      actionLabel: 'Assign Guide',
      dueText: 'Departure in 6 days',
    },
    {
      id: 'task-3',
      title: '18 Withdrawal Requests Pending Settlement',
      description: 'Total of $21,680.00 requested by European and Asian destination operators.',
      priority: 'medium',
      category: 'payout',
      actionUrl: '/withdrawals',
      actionLabel: 'Process Payouts',
      dueText: 'Weekly batch closes tonight',
    },
    {
      id: 'task-4',
      title: 'Custom Trip Inquiry: Corporate Japan Retreat',
      description: 'Inquiry for 28 participants with private ryokan accommodations and charter bus.',
      priority: 'medium',
      category: 'inquiry',
      actionUrl: '/inquiries',
      actionLabel: 'Send Quotation',
      dueText: 'Client awaiting response',
    },
  ]
}
