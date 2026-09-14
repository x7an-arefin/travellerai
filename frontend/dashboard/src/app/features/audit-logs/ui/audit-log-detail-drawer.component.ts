import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideTerminal, lucideShieldAlert, lucideCopy } from '@ng-icons/lucide'
import { AuditLog } from '../data-access/models/audit-logs.model'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-audit-log-detail-drawer',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmButtonImports, ...HlmBadgeImports],
  providers: [
    provideIcons({
      lucideTerminal,
      lucideShieldAlert,
      lucideCopy,
    }),
  ],
  template: `
    @if (log) {
      <div class="space-y-6 text-xs">
        <!-- Event Overview Box -->
        <div class="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-mono text-xs font-bold text-foreground">{{ log.action }}</span>
            <span hlmBadge [variant]="log.severity === 'critical' ? 'destructive' : 'outline'" class="text-[10px] uppercase font-bold">
              {{ log.severity }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div>
              <span class="text-muted-foreground">Actor:</span>
              <p class="font-semibold text-foreground">{{ log.actorName }} ({{ log.actorRole }})</p>
            </div>
            <div>
              <span class="text-muted-foreground">Target Entity:</span>
              <p class="font-mono text-foreground">{{ log.entityType }} • {{ log.entityId || 'Global' }}</p>
            </div>
            <div>
              <span class="text-muted-foreground">IP Address:</span>
              <p class="font-mono text-foreground">{{ log.ipAddress || 'Internal Worker' }}</p>
            </div>
            <div>
              <span class="text-muted-foreground">Logged At:</span>
              <p class="text-muted-foreground">{{ log.createdAt | date:'medium' }}</p>
            </div>
          </div>
        </div>

        <!-- Telemetry Headers -->
        <div class="space-y-1.5 p-3 rounded-lg border border-border/40 bg-card">
          <div class="flex items-center justify-between text-[11px]">
            <span class="text-muted-foreground">Correlation Request ID:</span>
            <button
              type="button"
              (click)="copy(log.correlationId || log.id)"
              class="font-mono text-primary text-[10px] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{{ log.correlationId || log.id }}</span>
              <ng-icon name="lucideCopy" class="size-2.5" />
            </button>
          </div>
          <div class="text-[11px]">
            <span class="text-muted-foreground">User Agent:</span>
            <p class="font-mono text-[10px] text-foreground mt-0.5 break-all">{{ log.userAgent || 'Not captured' }}</p>
          </div>
        </div>

        <!-- JSON State Comparison (Before vs After) -->
        <div class="space-y-3 pt-2 border-t border-border/40">
          <h4 class="font-bold text-foreground flex items-center gap-1.5">
            <ng-icon name="lucideTerminal" class="size-4 text-primary" />
            <span>State Modification Payload Diff</span>
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <!-- Previous State -->
            <div class="space-y-1">
              <span class="font-semibold text-rose-500 text-[11px]">Previous State (Before)</span>
              <div class="p-3 rounded-lg bg-zinc-950 text-zinc-300 font-mono text-[10px] overflow-x-auto max-h-52 border border-border/40">
                <pre class="whitespace-pre-wrap">{{ log.previousState ? (log.previousState | json) : '// No previous state (Creation event)' }}</pre>
              </div>
            </div>

            <!-- New State -->
            <div class="space-y-1">
              <span class="font-semibold text-emerald-500 text-[11px]">New State (Committed)</span>
              <div class="p-3 rounded-lg bg-zinc-950 text-zinc-300 font-mono text-[10px] overflow-x-auto max-h-52 border border-border/40">
                <pre class="whitespace-pre-wrap">{{ log.newState ? (log.newState | json) : '// Null state (Deletion event)' }}</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end pt-4 border-t border-border/40">
          <button
            type="button"
            hlmBtn
            variant="outline"
            size="sm"
            (click)="close.emit()"
            class="cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    }
  `,
})
export class AuditLogDetailDrawerComponent {
  @Input() log: AuditLog | null = null
  @Output() close = new EventEmitter<void>()

  copy(text: string): void {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard', { description: text })
  }
}
