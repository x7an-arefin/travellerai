import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideFileText,
  lucideShieldCheck,
  lucideShieldAlert,
  lucideEye,
  lucideDownload,
  lucideTrash2,
  lucideAlertTriangle,
  lucideCheckCircle2,
} from '@ng-icons/lucide'
import { KycDocument } from '../data-access/models/kyc.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-kyc-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideFileText,
      lucideShieldCheck,
      lucideShieldAlert,
      lucideEye,
      lucideDownload,
      lucideTrash2,
      lucideAlertTriangle,
      lucideCheckCircle2,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Tour Operator / Provider</th>
              <th scope="col" class="py-3.5 px-4">Document Type & Ref #</th>
              <th scope="col" class="py-3.5 px-4">Attached File</th>
              <th scope="col" class="py-3.5 px-4">Validity / Expiry</th>
              <th scope="col" class="py-3.5 px-4 text-center">Status</th>
              <th scope="col" class="py-3.5 px-4 text-right">Verification</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-4 w-36 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-40 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-28 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-4 w-24 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-center"><div class="h-5 w-16 bg-muted rounded-full mx-auto"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-6 w-20 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (items.length === 0) {
              <tr>
                <td colspan="6" class="py-12 text-center text-muted-foreground text-xs">
                  No legal compliance documents found matching current filters.
                </td>
              </tr>
            } @else {
              @for (doc of items; track doc.id) {
                <tr class="hover:bg-muted/20 transition-colors text-xs">
                  <td class="py-3.5 px-4">
                    <div class="font-semibold text-foreground">{{ doc.providerName || 'Provider' }}</div>
                    <div class="text-[11px] text-muted-foreground">{{ doc.providerEmail || 'compliance@agency.com' }}</div>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="font-medium text-foreground flex items-center gap-1.5 capitalize">
                      <ng-icon name="lucideFileText" class="size-3.5 text-primary" />
                      <span>{{ formatDocType(doc.documentType) }}</span>
                    </div>
                    @if (doc.documentNumber) {
                      <div class="font-mono text-[10px] text-muted-foreground mt-0.5">{{ doc.documentNumber }}</div>
                    }
                  </td>

                  <td class="py-3.5 px-4">
                    <a
                      [href]="doc.fileUrl"
                      target="_blank"
                      class="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-mono"
                    >
                      <ng-icon name="lucideDownload" class="size-3" />
                      <span class="truncate max-w-[140px]">{{ doc.fileName || 'view_document.pdf' }}</span>
                    </a>
                  </td>

                  <td class="py-3.5 px-4">
                    @if (doc.expiryDate) {
                      <div class="font-medium text-foreground">{{ doc.expiryDate | date:'mediumDate' }}</div>
                      @if (isExpired(doc.expiryDate)) {
                        <span class="text-[10px] text-rose-500 font-semibold flex items-center gap-0.5">
                          <ng-icon name="lucideAlertTriangle" class="size-2.5" />
                          <span>Expired</span>
                        </span>
                      }
                    } @else {
                      <span class="text-muted-foreground">Permanent Validity</span>
                    }
                  </td>

                  <td class="py-3.5 px-4 text-center">
                    <span
                      hlmBadge
                      [variant]="getStatusVariant(doc.status)"
                      class="text-[10px] capitalize font-medium"
                    >
                      {{ doc.status.replace('_', ' ') }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="outline"
                        size="sm"
                        class="h-7 text-xs px-2 gap-1 cursor-pointer text-foreground"
                        (click)="reviewClick.emit(doc)"
                        title="Review Legal Document"
                      >
                        <ng-icon name="lucideEye" class="size-3.5 text-primary" />
                        <span>Review</span>
                      </button>

                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0 cursor-pointer text-muted-foreground hover:text-rose-500"
                        (click)="deleteClick.emit(doc.id)"
                        title="Delete Document"
                      >
                        <ng-icon name="lucideTrash2" class="size-3.5" />
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
export class KycTableComponent {
  @Input() items: KycDocument[] = []
  @Input() isLoading = false
  @Output() reviewClick = new EventEmitter<KycDocument>()
  @Output() deleteClick = new EventEmitter<string>()

  formatDocType(type: string): string {
    return type.replace(/_/g, ' ')
  }

  isExpired(dateStr?: string): boolean {
    if (!dateStr) return false
    return new Date(dateStr) < new Date()
  }

  getStatusVariant(status: string): 'default' | 'secondary' | 'outline' | 'destructive' {
    switch (status) {
      case 'approved':
        return 'default'
      case 'submitted':
      case 'under_review':
        return 'secondary'
      case 'rejected':
      case 'expired':
        return 'destructive'
      default:
        return 'outline'
    }
  }
}
