import { Routes } from '@angular/router'

export const ReviewsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/reviews-page.component').then((m) => m.ReviewsPageComponent),
  },
]
