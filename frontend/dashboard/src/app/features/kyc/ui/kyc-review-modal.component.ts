import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideFileText,
  lucideDownload,
  lucideShieldCheck,
  lucideShieldAlert,
  lucideCheckCircle2,
  lucideAlertTriangle,
} from '@ng-icons/lucide'
import { KycDocument } from '../data-access/models/kyc.model'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'

@Component({
  selector: 'app-kyc-review-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon, ...HlmButtonImports, ...HlmBadgeImports],
  providers: [
    provideIcons({
      lucideFileText,
      lucideDownload,
      lucideShieldCheck,
      lucideShieldAlert,
      lucideCheckCircle2,
      lucideAlertTriangle,
    }),
  ],
  template: `
    @if (document) {
      <div class="space-y-6 text-xs">
        <!-- Document Dossier Header -->
        <div class="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-foreground capitalize flex items-center gap-1.5">
              <ng-icon name="lucideFileText" class="size-4 text-primary" />
              <span>{{ document.documentType.replace('_', ' ') }}</span>
            </span>
            <span hlmBadge [variant]="document.status === 'approved' ? 'default' : 'secondary'" class="text-[10px] capitalize">
              {{ document.status.replace('_', ' ') }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div>
              <span class="text-muted-foreground">Provider:</span>
              <p class="font-semibold text-foreground">{{ document.providerName }}</p>
            </div>
            <div>
              <span class="text-muted-foreground">License / Ref #:</span>
              <p class="font-mono text-foreground">{{ document.documentNumber || 'None Specified' }}</p>
            </div>
            <div>
              <span class="text-muted-foreground">Validity Expiry:</span>
              <p class="font-medium" [class.text-rose-500]="isExpired(document.expiryDate)">
                {{ (document.expiryDate | date:'mediumDate') || 'No Expiry' }}
              </p>
            </div>
            <div>
              <span class="text-muted-foreground">Uploaded:</span>
              <p class="text-muted-foreground">{{ document.createdAt | date:'mediumDate' }}</p>
            </div>
          </div>
        </div>

        <!-- File Download & Verification Box -->
        <div class="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ng-icon name="lucideFileText" class="size-5" />
            </div>
            <div>
              <p class="font-semibold text-foreground">{{ document.fileName || 'legal_document.pdf' }}</p>
              <p class="text-[10px] text-muted-foreground">Official certified copy provided by tour operator</p>
            </div>
          </div>

          <a
            [href]="document.fileUrl"
            target="_blank"
            hlmBtn
            variant="outline"
            size="sm"
            class="gap-1.5 cursor-pointer text-xs"
          >
            <ng-icon name="lucideDownload" class="size-3.5" />
            <span>Open & Inspect File</span>
          </a>
        </div>

        <!-- Previous Reviewer Feedback -->
        @if (document.reviewNotes) {
          <div class="p-3 rounded-lg bg-muted/60 border border-border/40 text-[11px] space-y-1">
            <span class="font-semibold text-foreground">Compliance Review Notes:</span>
            <p class="text-muted-foreground">{{ document.reviewNotes }}</p>
            @if (document.reviewedByName) {
              <p class="text-[10px] text-muted-foreground pt-1 border-t border-border/20">
                Audited by {{ document.reviewedByName }} on {{ document.reviewedAt | date:'mediumDate' }}
              </p>
            }
          </div>
        }

        <!-- Decision Input Section -->
        <div class="space-y-2 pt-2 border-t border-border/40">
          <label class="font-semibold text-foreground">Audit Compliance Notes / Reason</label>
          <textarea
            [(ngModel)]="notes"
            rows="3"
            placeholder="Add verification notes, commercial registry confirmation, or explain reason if rejecting..."
            class="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none text-xs"
          ></textarea>
        </div>

        <!-- Action Footer -->
        <div class="flex items-center justify-between pt-4 border-t border-border/40">
          <button
            type="button"
            hlmBtn
            variant="outline"
            size="sm"
            (click)="cancel.emit()"
            class="cursor-pointer"
          >
            Cancel
          </button>

          <div class="flex items-center gap-2">
            <button
              type="button"
              hlmBtn
              variant="destructive"
              size="sm"
              (click)="onDecision('rejected')"
              class="cursor-pointer"
            >
              Reject Document
            </button>
            <button
              type="button"
              hlmBtn
              variant="default"
              size="sm"
              (click)="onDecision('approved')"
              class="cursor-pointer"
            >
              Approve Document
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class KycReviewModalComponent {
  @Input() document: KycDocument | null = null
  @Output() decide = new EventEmitter<{ id: string; status: 'approved' | 'rejected'; reviewNotes: string }>()
  @Output() cancel = new EventEmitter<void>()

  notes = ''

  isExpired(dateStr?: string): boolean {
    if (!dateStr) return false
    return new Date(dateStr) < new Date()
  }

  onDecision(status: 'approved' | 'rejected'): void {
    if (!this.document) return
    this.decide.emit({
      id: this.document.id,
      status,
      reviewNotes: this.notes.trim() || (status === 'approved' ? 'Verified and approved.' : 'Document failed compliance checks.'),
    })
  }
}
