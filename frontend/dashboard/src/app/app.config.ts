import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER } from '@angular/core'
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { authInterceptor } from './core/auth/auth.interceptor'
import { ReferenceDataService } from './core/services/reference-data.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: (refData: ReferenceDataService) => () => refData.loadAll(),
      deps: [ReferenceDataService],
      multi: true,
    },
  ],
}

