import { Routes } from '@angular/router'

export const DeparturesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/departures-page.component').then((m) => m.DeparturesPageComponent),
  },
]
