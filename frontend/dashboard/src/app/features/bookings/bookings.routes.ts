import { Routes } from '@angular/router'

export const BookingsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/bookings-page.component').then((m) => m.BookingsPageComponent),
  },
]
