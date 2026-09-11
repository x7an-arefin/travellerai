import { Component, Input, computed } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (password.length > 0) {
      <div class="space-y-1.5 pt-1 animate-in fade-in-0 duration-150">
        <!-- Multi-segment Strength Meter -->
        <div class="flex items-center gap-1.5 h-1.5 w-full">
          <div class="flex-1 h-full rounded-full transition-colors duration-300" [ngClass]="getSegmentClass(1)"></div>
          <div class="flex-1 h-full rounded-full transition-colors duration-300" [ngClass]="getSegmentClass(2)"></div>
          <div class="flex-1 h-full rounded-full transition-colors duration-300" [ngClass]="getSegmentClass(3)"></div>
          <div class="flex-1 h-full rounded-full transition-colors duration-300" [ngClass]="getSegmentClass(4)"></div>
        </div>

        <div class="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Password strength:</span>
          <span class="font-semibold" [ngClass]="strengthColor()">{{ strengthLabel() }}</span>
        </div>
      </div>
    }
  `,
})
export class PasswordStrengthComponent {
  @Input() password: string = ''

  readonly score = computed(() => {
    const p = this.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })

  getSegmentClass(level: number): string {
    const sc = this.score()
    if (sc < level) return 'bg-muted'
    if (sc <= 1) return 'bg-destructive'
    if (sc <= 2) return 'bg-orange-500'
    if (sc <= 3) return 'bg-amber-500'
    return 'bg-emerald-500'
  }

  readonly strengthLabel = computed(() => {
    const sc = this.score()
    if (sc <= 1) return 'Weak'
    if (sc === 2) return 'Fair'
    if (sc === 3) return 'Good'
    return 'Strong'
  })

  readonly strengthColor = computed(() => {
    const sc = this.score()
    if (sc <= 1) return 'text-destructive'
    if (sc === 2) return 'text-orange-500'
    if (sc === 3) return 'text-amber-500'
    return 'text-emerald-500'
  })
}
