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
      items: [
        {
          title: 'Executive Dashboard',
          url: '/',
          icon: 'lucideLayoutDashboard',
        },
        {
          title: 'Revenue Analytics',
          url: '/analytics',
          icon: 'lucideTrendingUp',
        },
      ],
    },
    {
      title: 'Inventory & Experiences',
      items: [
        {
          title: 'Packages & Tours',
          url: '/packages',
          badge: '24',
          icon: 'lucidePackage',
        },
        {
          title: 'Departures & Calendar',
          url: '/departures',
          icon: 'lucideClock',
        },
        {
          title: 'Destinations Hub',
          url: '/destinations',
          icon: 'lucideMap',
        },
        {
          title: 'Categories & Tags',
          url: '/categories',
          icon: 'lucideBoxes',
        },
      ],
    },
    {
      title: 'Bookings & Operations',
      items: [
        {
          title: 'Bookings Pipeline',
          url: '/bookings',
          badge: '18 New',
          icon: 'lucideShoppingBag',
        },
        {
          title: 'Verified Reviews',
          url: '/reviews',
          badge: '4.9★',
          icon: 'lucideStar',
        },
        {
          title: 'Trip Inquiries & Quotes',
          url: '/inquiries',
          badge: '5',
          icon: 'lucideMessagesSquare',
        },
      ],
    },
    {
      title: 'Provider Network',
      items: [
        {
          title: 'Agencies & Operators',
          url: '/providers',
          badge: '142',
          icon: 'lucideBuilding2',
        },
        {
          title: 'KYC & Verification',
          url: '/kyc',
          badge: '3 Review',
          icon: 'lucideShieldCheck',
        },
        {
          title: 'Tour Guides & Staff',
          url: '/staff',
          icon: 'lucideUsers',
        },
      ],
    },
    {
      title: 'Finance & Payouts',
      items: [
        {
          title: 'Wallets & Balance',
          url: '/wallets',
          icon: 'lucideWallet',
        },
        {
          title: 'Payout Requests',
          url: '/withdrawals',
          badge: '18 Pending',
          icon: 'lucideCreditCard',
        },
        {
          title: 'Ledger & Audit Trail',
          url: '/audit-logs',
          icon: 'lucideShield',
        },
      ],
    },
    {
      title: 'Platform & Help',
      items: [
        {
          title: 'Support SLA Desk',
          url: '/tickets',
          badge: '2 Open',
          icon: 'lucideHeadphones',
        },
        {
          title: 'Marketplace Users',
          url: '/users',
          icon: 'lucideUserCheck',
        },
        {
          title: 'Platform Settings',
          url: '/settings',
          icon: 'lucideSettings',
        },
      ],
    },
  ],
}
