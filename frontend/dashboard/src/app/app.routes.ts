import { Routes } from '@angular/router'
import { authGuard, guestGuard } from './core/guards/auth.guard'

export const routes: Routes = [
  // Authenticated App Shell Routes
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/authenticated/authenticated-layout.component').then(
        (m) => m.AuthenticatedLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'packages',
        loadChildren: () =>
          import('./features/packages/packages.routes').then((m) => m.PackagesRoutes),
      },
      {
        path: 'bookings',
        loadChildren: () =>
          import('./features/bookings/bookings.routes').then((m) => m.BookingsRoutes),
      },
      {
        path: 'hotels',
        loadChildren: () =>
          import('./features/hotels/hotels.routes').then((m) => m.HotelsRoutes),
      },
      {
        path: 'vehicles',
        loadChildren: () =>
          import('./features/vehicles/vehicles.routes').then((m) => m.VehiclesRoutes),
      },
      {
        path: 'departures',
        loadChildren: () =>
          import('./features/departures/departures.routes').then((m) => m.DeparturesRoutes),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./features/search/search.routes').then((m) => m.SearchRoutes),
      },
      {
        path: 'trip-pass',
        loadChildren: () =>
          import('./features/trip-pass/trip-pass.routes').then((m) => m.TripPassRoutes),
      },
      {
        path: 'destinations',
        loadChildren: () =>
          import('./features/destinations/destinations.routes').then((m) => m.DestinationsRoutes),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./features/categories/categories.routes').then((m) => m.CategoriesRoutes),
      },
      {
        path: 'inquiries',
        loadChildren: () =>
          import('./features/inquiries/inquiries.routes').then((m) => m.InquiriesRoutes),
      },
      {
        path: 'providers',
        loadChildren: () =>
          import('./features/providers/providers.routes').then((m) => m.ProvidersRoutes),
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./features/staff/staff.routes').then((m) => m.StaffRoutes),
      },
      {
        path: 'wallets',
        loadChildren: () =>
          import('./features/wallets/wallets.routes').then((m) => m.WalletsRoutes),
      },
      {
        path: 'withdrawals',
        loadChildren: () =>
          import('./features/withdrawals/withdrawals.routes').then((m) => m.WithdrawalsRoutes),
      },
      {
        path: 'reviews',
        loadChildren: () =>
          import('./features/reviews/reviews.routes').then((m) => m.ReviewsRoutes),
      },
      {
        path: 'kyc',
        loadChildren: () =>
          import('./features/kyc/kyc.routes').then((m) => m.KycRoutes),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/analytics-page.component').then((m) => m.AnalyticsPageComponent),
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./features/tasks/tasks.component').then((m) => m.TasksComponent),
      },
      {
        path: 'kanban',
        loadComponent: () =>
          import('./features/kanban/kanban.component').then(
            (m) => m.KanbanComponent
          ),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./features/calendar/calendar.component').then(
            (m) => m.CalendarComponent
          ),
      },
      {
        path: 'inbox',
        loadComponent: () =>
          import('./features/inbox/inbox.component').then(
            (m) => m.InboxComponent
          ),
      },
      {
        path: 'files',
        loadComponent: () =>
          import('./features/files/files.component').then((m) => m.FilesComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'ai-workflows',
        loadComponent: () =>
          import('./features/ai-workflows/ai-workflows.component').then(
            (m) => m.AiWorkflowsComponent
          ),
      },
      {
        path: 'deals',
        loadComponent: () =>
          import('./features/deals/deals.component').then(
            (m) => m.DealsComponent
          ),
      },
      {
        path: 'realtime',
        loadComponent: () =>
          import('./features/realtime/realtime.component').then(
            (m) => m.RealtimeComponent
          ),
      },
      {
        path: 'tickets',
        loadComponent: () =>
          import('./features/tickets/tickets.component').then(
            (m) => m.TicketsComponent
          ),
      },
      {
        path: 'infrastructure',
        loadComponent: () =>
          import('./features/infrastructure/infrastructure.component').then(
            (m) => m.InfrastructureComponent
          ),
      },
      {
        path: 'design-system',
        loadComponent: () =>
          import('./features/design-system/design-system.component').then(
            (m) => m.DesignSystemComponent
          ),
      },
      {
        path: 'roadmap',
        loadComponent: () =>
          import('./features/roadmap/roadmap.component').then(
            (m) => m.RoadmapComponent
          ),
      },
      {
        path: 'invoices',
        loadComponent: () =>
          import('./features/invoices/invoices.component').then(
            (m) => m.InvoicesComponent
          ),
      },
      {
        path: 'organization',
        loadComponent: () =>
          import('./features/organization/organization.component').then(
            (m) => m.OrganizationComponent
          ),
      },
      {
        path: 'campaigns',
        loadComponent: () =>
          import('./features/campaigns/campaigns.component').then(
            (m) => m.CampaignsComponent
          ),
      },
      {
        path: 'verification',
        loadComponent: () =>
          import('./features/verification/verification.component').then(
            (m) => m.VerificationComponent
          ),
      },
      {
        path: 'database-studio',
        loadComponent: () =>
          import('./features/database-studio/database-studio.component').then(
            (m) => m.DatabaseStudioComponent
          ),
      },
      {
        path: 'workspaces',
        loadComponent: () =>
          import('./features/workspaces/workspaces.component').then(
            (m) => m.WorkspacesComponent
          ),
      },
      {
        path: 'academy',
        loadComponent: () =>
          import('./features/academy/academy.component').then(
            (m) => m.AcademyComponent
          ),
      },
      {
        path: 'affiliates',
        loadChildren: () =>
          import('./features/affiliates/affiliates.routes').then(
            (m) => m.AFFILIATES_ROUTES
          ),
      },
      {
        path: 'security-hub',
        loadComponent: () =>
          import('./features/security-hub/security-hub.component').then(
            (m) => m.SecurityHubComponent
          ),
      },
      {
        path: 'expenses',
        loadComponent: () =>
          import('./features/expenses/expenses.component').then(
            (m) => m.ExpensesComponent
          ),
      },
      {
        path: 'broadcast',
        loadComponent: () =>
          import('./features/broadcast/broadcast.component').then(
            (m) => m.BroadcastComponent
          ),
      },
      {
        path: 'ai-playground',
        loadComponent: () =>
          import('./features/ai-playground/ai-playground.component').then(
            (m) => m.AiPlaygroundComponent
          ),
      },
      {
        path: 'funnel',
        loadComponent: () =>
          import('./features/funnel/funnel.component').then(
            (m) => m.FunnelComponent
          ),
      },
      {
        path: 'feedback',
        loadComponent: () =>
          import('./features/feedback/feedback.component').then(
            (m) => m.FeedbackComponent
          ),
      },
      {
        path: 'status',
        loadComponent: () =>
          import('./features/status/status.component').then(
            (m) => m.StatusComponent
          ),
      },
      {
        path: 'billing',
        loadComponent: () =>
          import('./features/billing/billing.component').then(
            (m) => m.BillingComponent
          ),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
      },
      {
        path: 'audit-logs',
        loadComponent: () =>
          import('./features/audit-logs/audit-logs.component').then(
            (m) => m.AuditLogsComponent
          ),
      },
      {
        path: 'api-keys',
        loadComponent: () =>
          import('./features/api-keys/api-keys.component').then(
            (m) => m.ApiKeysComponent
          ),
      },
      {
        path: 'pricing',
        loadComponent: () =>
          import('./features/pricing/pricing.component').then(
            (m) => m.PricingComponent
          ),
      },
      {
        path: 'wizard',
        loadComponent: () =>
          import('./features/wizard/wizard.component').then(
            (m) => m.WizardComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile-page.component').then(
            (m) => m.ProfilePageComponent
          ),
      },
      {
        path: 'apps',
        loadComponent: () =>
          import('./features/apps/apps.component').then((m) => m.AppsComponent),
      },
      {
        path: 'chats',
        loadComponent: () =>
          import('./features/chats/chats.component').then((m) => m.ChatsComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'clerk/user-management',
        loadComponent: () =>
          import('./features/clerk/clerk-user-management.component').then(
            (m) => m.ClerkUserManagementComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings-layout.component').then(
            (m) => m.SettingsLayoutComponent
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/settings/profile/profile.component').then(
                (m) => m.ProfileComponent
              ),
          },
          {
            path: 'account',
            loadComponent: () =>
              import('./features/settings/account/account.component').then(
                (m) => m.AccountComponent
              ),
          },
          {
            path: 'appearance',
            loadComponent: () =>
              import('./features/settings/appearance/appearance.component').then(
                (m) => m.AppearanceComponent
              ),
          },
          {
            path: 'notifications',
            loadComponent: () =>
              import(
                './features/settings/notifications/notifications.component'
              ).then((m) => m.NotificationsComponent),
          },
          {
            path: 'display',
            loadComponent: () =>
              import('./features/settings/display/display.component').then(
                (m) => m.DisplayComponent
              ),
          },
        ],
      },
      {
        path: 'help-center',
        loadComponent: () =>
          import('./features/help-center/help-center.component').then(
            (m) => m.HelpCenterComponent
          ),
      },
      {
        path: 'coming-soon',
        loadComponent: () =>
          import('./shared/components/coming-soon/coming-soon.component').then(
            (m) => m.ComingSoonComponent
          ),
      },

      // In-shell Named Error Routes
      {
        path: 'errors/unauthorized',
        loadComponent: () =>
          import('./features/errors/401.component').then(
            (m) => m.UnauthorizedComponent
          ),
      },
      {
        path: 'errors/forbidden',
        loadComponent: () =>
          import('./features/errors/403.component').then(
            (m) => m.ForbiddenComponent
          ),
      },
      {
        path: 'errors/not-found',
        loadComponent: () =>
          import('./features/errors/404.component').then(
            (m) => m.NotFoundComponent
          ),
      },
      {
        path: 'errors/internal-server-error',
        loadComponent: () =>
          import('./features/errors/500.component').then(
            (m) => m.InternalErrorComponent
          ),
      },
      {
        path: 'errors/maintenance-error',
        loadComponent: () =>
          import('./features/errors/503.component').then(
            (m) => m.MaintenanceComponent
          ),
      },
      {
        path: 'errors/401',
        loadComponent: () =>
          import('./features/errors/401.component').then(
            (m) => m.UnauthorizedComponent
          ),
      },
      {
        path: 'errors/403',
        loadComponent: () =>
          import('./features/errors/403.component').then(
            (m) => m.ForbiddenComponent
          ),
      },
      {
        path: 'errors/404',
        loadComponent: () =>
          import('./features/errors/404.component').then(
            (m) => m.NotFoundComponent
          ),
      },
      {
        path: 'errors/500',
        loadComponent: () =>
          import('./features/errors/500.component').then(
            (m) => m.InternalErrorComponent
          ),
      },
      {
        path: 'errors/503',
        loadComponent: () =>
          import('./features/errors/503.component').then(
            (m) => m.MaintenanceComponent
          ),
      },
    ],
  },

  // Auth & Guest Routes (Standalone Auth Layout)
  {
    path: '',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./layout/auth/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./features/auth/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
      },
      {
        path: 'sign-in-2',
        loadComponent: () =>
          import('./features/auth/sign-in-2/sign-in-2.component').then(
            (m) => m.SignIn2Component
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./features/auth/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import(
            './features/auth/forgot-password/forgot-password.component'
          ).then((m) => m.ForgotPasswordComponent),
      },
      {
        path: 'otp',
        loadComponent: () =>
          import('./features/auth/otp/otp.component').then((m) => m.OtpComponent),
      },
      {
        path: 'clerk/sign-in',
        loadComponent: () =>
          import('./features/clerk/clerk-sign-in.component').then(
            (m) => m.ClerkSignInComponent
          ),
      },
      {
        path: 'clerk/sign-up',
        loadComponent: () =>
          import('./features/clerk/clerk-sign-up.component').then(
            (m) => m.ClerkSignUpComponent
          ),
      },
    ],
  },

  // Wildcard fallback to 404
  {
    path: '**',
    redirectTo: 'errors/not-found',
  },
]
