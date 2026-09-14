import { Routes } from '@angular/router'

export const HotelsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/hotels-page.component').then((m) => m.HotelsPageComponent),
  },
]
