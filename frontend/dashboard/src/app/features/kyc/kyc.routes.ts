import { Routes } from '@angular/router'

export const KycRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/kyc-page.component').then((m) => m.KycPageComponent),
  },
]
