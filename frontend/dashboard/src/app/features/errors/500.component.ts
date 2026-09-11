import { Component } from '@angular/core'
import { ErrorPageComponent } from './error-page.component'

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [ErrorPageComponent],
  template: `
    <app-error-page
      code="500"
      title="Internal Server Error"
      message="Whoops, something went wrong on our end. Please try again later or contact support."
    />
  `,
})
export class InternalErrorComponent {}
