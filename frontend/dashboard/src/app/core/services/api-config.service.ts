import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class ApiConfigService {
  readonly apiBaseUrl = environment.apiBaseUrl
  readonly isProduction = environment.production
  readonly authMode = environment.authMode

  buildUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    return `${this.apiBaseUrl}/${cleanEndpoint}`
  }
}
