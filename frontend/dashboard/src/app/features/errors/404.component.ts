import { Component } from '@angular/core'
import { ErrorPageComponent } from './error-page.component'

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ErrorPageComponent],
  template: `
    <app-error-page
      code="404"
      title="Page Not Found"
      message="Sorry, we couldn't find the page you're looking for. It might have been moved or deleted."
    />
  `,
})
export class NotFoundComponent {}
