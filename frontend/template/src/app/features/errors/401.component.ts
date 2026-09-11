import { Component } from '@angular/core'
import { ErrorPageComponent } from './error-page.component'

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [ErrorPageComponent],
  template: `
    <app-error-page
      code="401"
      title="Unauthorized Access"
      message="You do not have the required credentials or permission to view this protected resource."
    />
  `,
})
export class UnauthorizedComponent {}
