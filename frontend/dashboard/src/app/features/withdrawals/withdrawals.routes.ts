import { Routes } from '@angular/router'

export const WithdrawalsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/withdrawals-page.component').then((m) => m.WithdrawalsPageComponent),
  },
]
