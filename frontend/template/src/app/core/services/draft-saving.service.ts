import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DraftSavingService {
  readonly hasDraft = signal<boolean>(false);

  saveDraft(formId: string, value: Record<string, unknown>): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`fast_app_draft_${formId}`, JSON.stringify({
        savedAt: Date.now(),
        value,
      }));
      this.hasDraft.set(true);
    } catch {
      // Ignore quota errors
    }
  }

  getDraft(formId: string): Record<string, unknown> | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(`fast_app_draft_${formId}`);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed.value ?? null;
    } catch {
      return null;
    }
  }

  clearDraft(formId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`fast_app_draft_${formId}`);
    this.hasDraft.set(false);
  }
}
