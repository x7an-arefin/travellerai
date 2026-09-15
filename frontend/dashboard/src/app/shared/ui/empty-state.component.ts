import { Component, input, output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  lucideInbox,
  lucidePlus,
  lucideBuilding,
  lucideCar,
  lucideUsers,
  lucidePackage,
  lucideCalendar,
  lucideMapPin,
  lucideBookmarkCheck,
} from '@ng-icons/lucide'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideInbox,
      lucidePlus,
      lucideBuilding,
      lucideCar,
      lucideUsers,
      lucidePackage,
      lucideCalendar,
      lucideMapPin,
      lucideBookmarkCheck,
    }),
  ],
  template: `
    <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div class="size-14 rounded-2xl bg-muted/60 flex items-center justify-center mb-3">
        <ng-icon [name]="iconName()" class="size-7 text-muted-foreground/60" />
      </div>
      <h3 class="font-semibold text-foreground text-sm">{{ title() }}</h3>
      <p class="text-xs text-muted-foreground max-w-xs leading-relaxed mt-1 mb-4">
        {{ description() }}
      </p>
      @if (ctaText()) {
        <button hlmBtn size="sm" (click)="ctaClicked.emit()" class="cursor-pointer gap-1.5 shadow-xs">
          <ng-icon name="lucidePlus" class="size-3.5" />
          <span>{{ ctaText() }}</span>
        </button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  readonly iconName = input<string>('lucideInbox')
  readonly title = input.required<string>()
  readonly description = input.required<string>()
  readonly ctaText = input<string>('')

  readonly ctaClicked = output<void>()
}
