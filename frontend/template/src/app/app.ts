import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NavigationProgressComponent } from './shared/components/navigation-progress/navigation-progress.component'
import { ThemeService } from './core/services/theme.service'
import { DirectionService } from './core/services/direction.service'
import { LayoutService } from './core/services/layout.service'
import { FontService } from './core/services/font.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationProgressComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Initialize singleton core services
  readonly themeService = inject(ThemeService)
  readonly directionService = inject(DirectionService)
  readonly layoutService = inject(LayoutService)
  readonly fontService = inject(FontService)
}
