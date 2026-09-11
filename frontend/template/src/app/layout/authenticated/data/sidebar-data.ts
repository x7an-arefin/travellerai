import { SidebarData } from './layout.types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: 'lucideCommand',
      plan: 'Angular + Spartan UI',
    },
    {
      name: 'Acme Inc',
      logo: 'lucideGalleryVerticalEnd',
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: 'lucideAudioWaveform',
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: 'lucideLayoutDashboard',
        },
        {
          title: 'Organization Chart',
          url: '/organization',
          icon: 'lucideNetwork',
        },
        {
          title: 'Workspaces & RBAC',
          url: '/workspaces',
          icon: 'lucideBuilding2',
        },
        {
          title: 'Products Hub',
          url: '/products',
          icon: 'lucideBoxes',
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: 'lucideListTodo',
        },
        {
          title: 'Kanban Board',
          url: '/kanban',
          icon: 'lucideKanban',
        },
        {
          title: 'Calendar Schedule',
          url: '/calendar',
          icon: 'lucideCalendar',
        },
        {
          title: 'Inbox Mail',
          url: '/inbox',
          badge: '3',
          icon: 'lucideInbox',
        },
        {
          title: 'Support SLA Desk',
          url: '/tickets',
          badge: '2',
          icon: 'lucideHeadphones',
        },
        {
          title: 'Files & Media',
          url: '/files',
          icon: 'lucideFolder',
        },
        {
          title: 'Orders Pipeline',
          url: '/orders',
          icon: 'lucideShoppingBag',
        },
        {
          title: 'AI Workflows & Studio',
          url: '/ai-workflows',
          icon: 'lucideWorkflow',
        },
        {
          title: 'AI Playground',
          url: '/ai-playground',
          icon: 'lucideBot',
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: 'lucidePackage',
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: 'lucideMessagesSquare',
        },
        {
          title: 'Users',
          url: '/users',
          icon: 'lucideUsers',
        },
      ],
    },
    {
      title: 'Analytics & Growth',
      items: [
        {
          title: 'Live Telemetry & Geo',
          url: '/realtime',
          icon: 'lucideRadio',
        },
        {
          title: 'Marketing Campaigns',
          url: '/campaigns',
          icon: 'lucideMegaphone',
        },
        {
          title: 'Affiliate Portal',
          url: '/affiliates',
          icon: 'lucideShare2',
        },
        {
          title: 'Live Broadcast Studio',
          url: '/broadcast',
          icon: 'lucideTv',
        },
        {
          title: 'Conversion Funnel',
          url: '/funnel',
          icon: 'lucideTrendingUp',
        },
        {
          title: 'Customer Feedback',
          url: '/feedback',
          icon: 'lucideStar',
        },
        {
          title: 'System Uptime Status',
          url: '/status',
          icon: 'lucideActivity',
        },
      ],
    },
    {
      title: 'Enterprise & Finance',
      items: [
        {
          title: 'CRM Deals Pipeline',
          url: '/deals',
          icon: 'lucideBadgeDollarSign',
        },
        {
          title: 'Corporate Expenses',
          url: '/expenses',
          icon: 'lucideWallet',
        },
        {
          title: 'Invoice Builder',
          url: '/invoices',
          icon: 'lucideReceipt',
        },
        {
          title: 'KYC Verification',
          url: '/verification',
          icon: 'lucideShieldCheck',
        },
        {
          title: 'Database Studio',
          url: '/database-studio',
          icon: 'lucideDatabase',
        },
        {
          title: 'Security Vulnerabilities',
          url: '/security-hub',
          icon: 'lucideShieldAlert',
        },
        {
          title: 'Billing & Invoices',
          url: '/billing',
          icon: 'lucideCreditCard',
        },
        {
          title: 'Checkout Payment',
          url: '/checkout',
          icon: 'lucideLock',
        },
        {
          title: 'Pricing & Plans',
          url: '/pricing',
          icon: 'lucideSparkles',
        },
        {
          title: 'Cluster Infrastructure',
          url: '/infrastructure',
          icon: 'lucideServer',
        },
        {
          title: 'Security Audit Logs',
          url: '/audit-logs',
          icon: 'lucideShieldCheck',
        },
        {
          title: 'API Keys & Webhooks',
          url: '/api-keys',
          icon: 'lucideKey',
        },
        {
          title: 'Project Wizard',
          url: '/wizard',
          icon: 'lucideRocket',
        },
      ],
    },
    {
      title: 'Developer & Showcase',
      items: [
        {
          title: 'Learning Academy LMS',
          url: '/academy',
          icon: 'lucideGraduationCap',
        },
        {
          title: 'Design System Gallery',
          url: '/design-system',
          icon: 'lucideComponent',
        },
        {
          title: 'Product Roadmap',
          url: '/roadmap',
          icon: 'lucideMap',
        },
        {
          title: 'Profile Showcase',
          url: '/profile',
          icon: 'lucideUser',
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Secured by Clerk',
          icon: 'lucideShieldCheck',
          items: [
            {
              title: 'Sign In',
              url: '/clerk/sign-in',
            },
            {
              title: 'Sign Up',
              url: '/clerk/sign-up',
            },
            {
              title: 'User Management',
              url: '/clerk/user-management',
            },
          ],
        },
        {
          title: 'Auth',
          icon: 'lucideShieldCheck',
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: 'lucideBug',
          items: [
            {
              title: 'Unauthorized',
              url: '/errors/unauthorized',
              icon: 'lucideLock',
            },
            {
              title: 'Forbidden',
              url: '/errors/forbidden',
              icon: 'lucideUserX',
            },
            {
              title: 'Not Found',
              url: '/errors/not-found',
              icon: 'lucideFileX',
            },
            {
              title: 'Internal Server Error',
              url: '/errors/internal-server-error',
              icon: 'lucideServerOff',
            },
            {
              title: 'Maintenance Error',
              url: '/errors/maintenance-error',
              icon: 'lucideConstruction',
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: 'lucideSettings',
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: 'lucideUserCog',
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: 'lucideWrench',
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: 'lucidePalette',
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: 'lucideBell',
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: 'lucideMonitor',
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: 'lucideHelpCircle',
        },
        {
          title: 'Coming Soon',
          url: '/coming-soon',
          icon: 'lucideClock',
        },
      ],
    },
  ],
}
