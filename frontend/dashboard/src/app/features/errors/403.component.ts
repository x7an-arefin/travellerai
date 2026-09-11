import { Component } from '@angular/core'
import { ErrorPageComponent } from './error-page.component'

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [ErrorPageComponent],
  template: `
    <app-error-page
      code="403"
      title="Access Forbidden"
      message="You don't have authorization to access this page on the server."
    />
  `,
})
export class ForbiddenComponent {}
