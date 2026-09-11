import { Routes } from '@angular/router'

export const PackagesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/packages-page.component').then((m) => m.PackagesPageComponent),
  },
]
