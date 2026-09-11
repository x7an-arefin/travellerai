import { Routes } from '@angular/router'

export const ProvidersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/providers-page.component').then((m) => m.ProvidersPageComponent),
  },
]
