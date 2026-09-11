import { Component } from '@angular/core'
import { ErrorPageComponent } from './error-page.component'

@Component({
  selector: 'app-maintenance-error',
  standalone: true,
  imports: [ErrorPageComponent],
  template: `
    <app-error-page
      code="503"
      title="Maintenance Mode"
      message="The service is temporarily unavailable due to scheduled maintenance. We'll be back shortly!"
    />
  `,
})
export class MaintenanceComponent {}
