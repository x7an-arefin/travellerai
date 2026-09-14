import { Routes } from '@angular/router'

export const VehiclesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/vehicles-page.component').then((m) => m.VehiclesPageComponent),
  },
  {
    path: 'routes',
    loadComponent: () =>
      import('./ui/vehicle-routes.component').then(
        (m) => m.VehicleRoutesComponent
      ),
  },
  {
    path: 'drivers/:id',
    loadComponent: () =>
      import('./ui/driver-detail.component').then(
        (m) => m.DriverDetailComponent
      ),
  },
  {
    path: 'inspections',
    loadComponent: () =>
      import('./ui/vehicle-inspections.component').then(
        (m) => m.VehicleInspectionsComponent
      ),
  },
]
