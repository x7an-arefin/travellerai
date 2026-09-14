import { Routes } from '@angular/router'

export const VehiclesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/vehicles-page.component').then((m) => m.VehiclesPageComponent),
  },
]
