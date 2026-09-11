import { Component, Input, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '../../../core/utils/cn'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main [class]="_computedClasses()">
      <ng-content />
    </main>
  `,
})
export class MainComponent {
  @Input() fixed: boolean = false
  @Input() class: string = ''

  protected readonly _computedClasses = computed(() => {
    return cn(
      'flex-1 px-4 py-6 md:px-6 space-y-6',
      this.fixed && 'flex flex-col flex-grow overflow-hidden',
      this.class
    )
  })
}
