import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideEye,
  lucideShieldAlert,
  lucideShieldCheck,
  lucideTerminal,
} from '@ng-icons/lucide'
import { AuditLog } from '../data-access/models/audit-logs.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-audit-logs-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideEye,
      lucideShieldAlert,
      lucideShieldCheck,
      lucideTerminal,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Timestamp & Trace ID</th>
              <th scope="col" class="py-3.5 px-4">Actor & Role</th>
              <th scope="col" class="py-3.5 px-4">Action Triggered</th>
              <th scope="col" class="py-3.5 px-4">Entity Affected</th>
              <th scope="col" class="py-3.5 px-4 text-center">Severity</th>
              <th scope="col" class="py-3.5 px-4 text-right">State Inspection</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-4 w-32 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-36 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-44 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-28 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-center"><div class="h-5 w-16 bg-muted rounded-full mx-auto"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-6 w-16 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (items.length === 0) {
              <tr>
                <td colspan="6" class="py-12 text-center text-muted-foreground text-xs">
                  No security audit records found matching current query.
                </td>
              </tr>
            } @else {
              @for (log of items; track log.id) {
                <tr class="hover:bg-muted/20 transition-colors text-xs">
                  <td class="py-3.5 px-4">
                    <div class="font-medium text-foreground">{{ log.createdAt | date:'medium' }}</div>
                    <div class="font-mono text-[10px] text-muted-foreground">{{ log.correlationId || log.id }}</div>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="font-semibold text-foreground">{{ log.actorName }}</div>
                    <span
                      hlmBadge
                      variant="outline"
                      class="text-[9px] capitalize font-mono mt-0.5"
                    >
                      {{ log.actorRole }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 font-mono text-[11px] font-bold text-foreground">
                    {{ log.action }}
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="font-medium text-foreground capitalize">{{ log.entityType.replace('_', ' ') }}</div>
                    <div class="font-mono text-[10px] text-muted-foreground">{{ log.ipAddress || 'Internal' }}</div>
                  </td>

                  <td class="py-3.5 px-4 text-center">
                    <span
                      hlmBadge
                      [variant]="getSeverityVariant(log.severity)"
                      class="text-[10px] uppercase font-bold"
                    >
                      {{ log.severity }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <button
                      hlmBtn
                      variant="outline"
                      size="sm"
                      class="h-7 text-xs px-2 gap-1 cursor-pointer"
                      (click)="inspectClick.emit(log)"
                      title="Inspect State Payload"
                    >
                      <ng-icon name="lucideTerminal" class="size-3.5 text-primary" />
                      <span>Inspect Diff</span>
                    </button>
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
export class AuditLogsTableComponent {
  @Input() items: AuditLog[] = []
  @Input() isLoading = false
  @Output() inspectClick = new EventEmitter<AuditLog>()

  getSeverityVariant(sev: string): 'default' | 'secondary' | 'outline' | 'destructive' {
    switch (sev) {
      case 'critical':
        return 'destructive'
      case 'warning':
        return 'secondary'
      default:
        return 'outline'
    }
  }
}
