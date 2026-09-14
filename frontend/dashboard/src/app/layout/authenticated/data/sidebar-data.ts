import { SidebarData } from './layout.types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Sultanul Arefin',
    email: 'arefin@traveller.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  },
  teams: [
    {
      name: 'Traveller AI Global',
      logo: 'lucideCommand',
      plan: 'Multi-Provider Marketplace',
    },
    {
      name: 'Alpine Wonders Agency',
      logo: 'lucideBuilding2',
      plan: 'Verified Tour Operator',
    },
    {
      name: 'Bali Island Escapes',
      logo: 'lucideBuilding2',
      plan: 'Verified Tour Operator',
    },
  ],
  navGroups: [
    {
      title: 'Marketplace Overview',
      roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'FinanceAdmin'],
      items: [
        {
          title: 'Executive Dashboard',
          url: '/',
          icon: 'lucideLayoutDashboard',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'FinanceAdmin'],
          permissions: ['overview.view'],
        },
        {
          title: 'Revenue Analytics',
          url: '/analytics',
          icon: 'lucideTrendingUp',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'FinanceAdmin'],
          permissions: ['analytics.view'],
        },
      ],
    },
    {
      title: 'Inventory & Experiences',
      roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'Guide', 'Staff'],
      items: [
        {
          title: 'Packages & Tours',
          url: '/packages',
          badge: '24',
          icon: 'lucidePackage',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner'],
          permissions: ['packages.manage'],
        },
        {
          title: 'Departures & Calendar',
          url: '/departures',
          icon: 'lucideClock',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'Guide', 'Staff'],
          permissions: ['departures.view', 'departures.manage'],
        },
        {
          title: 'Destinations Hub',
          url: '/destinations',
          icon: 'lucideMap',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'Guide'],
          permissions: ['destinations.view'],
        },
        {
          title: 'Categories & Tags',
          url: '/categories',
          icon: 'lucideBoxes',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner'],
          permissions: ['categories.view'],
        },
      ],
    },
    {
      title: 'Bookings & Operations',
      roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'Guide', 'Staff', 'FinanceAdmin', 'Traveler'],
      items: [
        {
          title: 'Bookings Pipeline',
          url: '/bookings',
          badge: '18 New',
          icon: 'lucideShoppingBag',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'Guide', 'Staff', 'FinanceAdmin', 'Traveler'],
          permissions: ['bookings.view', 'bookings.checkin'],
        },
        {
          title: 'Verified Reviews',
          url: '/reviews',
          badge: '4.9★',
          icon: 'lucideStar',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'Guide', 'Traveler'],
          permissions: ['reviews.view', 'reviews.write'],
        },
        {
          title: 'Trip Inquiries & Quotes',
          url: '/inquiries',
          badge: '5',
          icon: 'lucideMessagesSquare',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'Traveler'],
          permissions: ['inquiries.manage', 'inquiries.create'],
        },
      ],
    },
    {
      title: 'Provider Network',
      roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'FinanceAdmin'],
      items: [
        {
          title: 'Agencies & Operators',
          url: '/providers',
          badge: '142',
          icon: 'lucideBuilding2',
          roles: ['SuperAdmin', 'Admin'],
          permissions: ['providers.manage'],
        },
        {
          title: 'KYC & Verification',
          url: '/kyc',
          badge: '3 Review',
          icon: 'lucideShieldCheck',
          roles: ['SuperAdmin', 'Admin', 'FinanceAdmin'],
          permissions: ['kyc.manage'],
        },
        {
          title: 'Tour Guides & Staff',
          url: '/staff',
          icon: 'lucideUsers',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner'],
          permissions: ['staff.manage'],
        },
        {
          title: 'Affiliates & Creators',
          url: '/affiliates',
          icon: 'lucideShare2',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'FinanceAdmin'],
          permissions: ['affiliates.view'],
        },
      ],
    },
    {
      title: 'Finance & Payouts',
      roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'FinanceAdmin'],
      items: [
        {
          title: 'Wallets & Balance',
          url: '/wallets',
          icon: 'lucideWallet',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'FinanceAdmin'],
          permissions: ['wallets.view', 'wallets.manage'],
        },
        {
          title: 'Payout Requests',
          url: '/withdrawals',
          badge: '18 Pending',
          icon: 'lucideCreditCard',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'FinanceAdmin'],
          permissions: ['withdrawals.request', 'withdrawals.approve'],
        },
        {
          title: 'Campaigns & Coupons',
          url: '/campaigns',
          icon: 'lucideMegaphone',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'FinanceAdmin'],
          permissions: ['campaigns.manage', 'campaigns.view'],
        },
        {
          title: 'Ledger & Audit Trail',
          url: '/audit-logs',
          icon: 'lucideShield',
          roles: ['SuperAdmin', 'Admin', 'FinanceAdmin'],
          permissions: ['audit.view'],
        },
      ],
    },
    {
      title: 'Platform & Help',
      roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'Guide', 'FinanceAdmin', 'Traveler'],
      items: [
        {
          title: 'Support SLA Desk',
          url: '/tickets',
          badge: '2 Open',
          icon: 'lucideHeadphones',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'Guide', 'FinanceAdmin', 'Traveler'],
          permissions: ['tickets.view'],
        },
        {
          title: 'Marketplace Users',
          url: '/users',
          icon: 'lucideUserCheck',
          roles: ['SuperAdmin', 'Admin'],
          permissions: ['users.manage'],
        },
        {
          title: 'Platform Settings',
          url: '/settings',
          icon: 'lucideSettings',
          roles: ['SuperAdmin', 'Admin', 'ProviderOwner', 'Provider', 'AgencyOwner', 'Guide', 'FinanceAdmin', 'Traveler'],
          permissions: ['settings.manage'],
        },
      ],
    },
  ],
}
