import { Routes } from '@angular/router'

export const HotelsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/hotels-page.component').then((m) => m.HotelsPageComponent),
  },
  {
    path: 'properties/:id',
    loadComponent: () =>
      import('./ui/hotel-property-detail.component').then(
        (m) => m.HotelPropertyDetailComponent
      ),
  },
  {
    path: 'reservations',
    loadComponent: () =>
      import('./ui/hotel-reservations.component').then(
        (m) => m.HotelReservationsComponent
      ),
  },
  {
    path: 'maintenance',
    loadComponent: () =>
      import('./ui/hotel-maintenance.component').then(
        (m) => m.HotelMaintenanceComponent
      ),
  },
]
