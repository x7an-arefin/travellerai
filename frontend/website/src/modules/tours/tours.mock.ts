import type { TourPackage } from './tours.model';

export const MOCK_TOURS: TourPackage[] = [
  {
    id: 'tour-001',
    slug: 'swiss-alpine-odyssey',
    title: 'Swiss Alpine Odyssey & Glacier Express',
    subtitle: '7-Day High-Altitude Traverse via Zermatt & St. Moritz',
    destination: 'Interlaken & Zermatt',
    destinationSlug: 'swiss-alps',
    country: 'Switzerland',
    durationDays: 7,
    durationNights: 6,
    priceFrom: 3450,
    currency: 'USD',
    rating: 4.96,
    reviewsCount: 142,
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Traverse the dramatic spine of the Swiss Alps aboard premier panoramic rail lines and private high-altitude cable systems. Led by IFMGA-certified alpine guides with intimate local valley heritage.',
    highlights: [
      'Panoramic 1st Class seating on the Glacier Express',
      'Exclusive sunrise ascent to Gornergrat overlooking the Matterhorn',
      'Private fondue and Pinot Noir tasting in a 17th-century Valais cellar',
      'Luggage-free door-to-door transit between boutique alpine lodges'
    ],
    inclusions: [
      '6 nights in vetted 4-star boutique alpine chalets',
      'All Swiss Pass rail vouchers & Glacier Express reservations',
      'Daily gourmet breakfast and 4 curated multi-course dinners',
      'Certified IFMGA English-speaking mountain guide'
    ],
    exclusions: [
      'International flights to Zurich/Geneva',
      'Personal travel insurance',
      'Discretionary guide gratuities'
    ],
    providerName: 'Helvetia Alpine Expeditions',
    providerVerified: true,
    category: 'Adventure',
    groupSizeMax: 10,
    difficulty: 'Moderate',
    nextDepartureDate: '2026-10-12',
    badge: 'Curator Pick'
  },
  {
    id: 'tour-002',
    slug: 'kyoto-zen-heritage',
    title: 'Kyoto Ancient Sanctuaries & Kaiseki Artistry',
    subtitle: 'Private Tea Masters, Zen Monasteries, and Arashiyama Bamboo Paths',
    destination: 'Kyoto & Uji',
    destinationSlug: 'kyoto',
    country: 'Japan',
    durationDays: 5,
    durationNights: 4,
    priceFrom: 2890,
    currency: 'USD',
    rating: 4.98,
    reviewsCount: 98,
    featuredImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Immerse yourself into classical Japanese aesthetic philosophy. Experience after-hours private temple access, personal instruction in Urasenke tea ritual, and evening dining with accredited Geiko artisans.',
    highlights: [
      'Private closed-door meditation at Kennin-ji temple sanctuary',
      'Private tea ceremony with an 11th-generation Uji tea grower',
      'Michelin-starred Kaiseki banquet in historic Gion',
      'Morning walk through Arashiyama bamboo grove before public opening'
    ],
    inclusions: [
      '4 nights in an authentic traditional luxury Ryokan with private onsen',
      'Private chauffeur transport throughout Kyoto and Nara',
      'Licensed national heritage guide',
      'All temple entry endowments and private ceremony fees'
    ],
    exclusions: [
      'Flights into Kansai International Airport (KIX)',
      'Alcoholic beverages outside designated pairings'
    ],
    providerName: 'Kansai Heritage Guild',
    providerVerified: true,
    category: 'Cultural',
    groupSizeMax: 8,
    difficulty: 'Easy',
    nextDepartureDate: '2026-10-18',
    badge: 'Verified Exclusive'
  },
  {
    id: 'tour-003',
    slug: 'sylhet-rainforest-tea-expedition',
    title: 'Sylhet Cloud Forest & Ancient Tea Estate Trails',
    subtitle: 'Biodiversity Trekking in Lawachara and Heritage Planter Bungalows',
    destination: 'Sreemangal & Sylhet',
    destinationSlug: 'sylhet',
    country: 'Bangladesh',
    durationDays: 4,
    durationNights: 3,
    priceFrom: 890,
    currency: 'USD',
    rating: 4.92,
    reviewsCount: 64,
    featuredImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Explore the verdant rolling hills of Sreemangal, the world-famous tea capital of Bangladesh. Spot rare Hoolock gibbons in Lawachara National Park and enjoy authentic colonial-era tea plantation hospitality.',
    highlights: [
      'Dawn canopy trek inside Lawachara National Park for primate tracking',
      'Stay in a restored 1910 British planter bungalow surrounded by green slopes',
      'Seven-layer artisanal tea tasting and organic garden harvest tour',
      'Boat excursion across the serene wetlands of Tanguar Haor'
    ],
    inclusions: [
      '3 nights heritage estate accommodation',
      'Dedicated 4x4 private transport throughout Sylhet region',
      'All national park conservation fees and wildlife rangers',
      'All meals featuring organic local Sylheti cuisine'
    ],
    exclusions: [
      'Domestic flights between Dhaka and Sylhet',
      'Personal camera permits'
    ],
    providerName: 'Bengal Eco-Expeditions',
    providerVerified: true,
    category: 'Wildlife',
    groupSizeMax: 6,
    difficulty: 'Moderate',
    nextDepartureDate: '2026-11-04',
    badge: 'Eco Certified'
  },
  {
    id: 'tour-004',
    slug: 'dolomites-via-ferrata',
    title: 'Italian Dolomites High Route & Rifugio Stays',
    subtitle: 'Iron Paths, Limestone Pinnacles, and Northern Italian Gastronomy',
    destination: 'Cortina d\'Ampezzo',
    destinationSlug: 'dolomites',
    country: 'Italy',
    durationDays: 6,
    durationNights: 5,
    priceFrom: 2450,
    currency: 'USD',
    rating: 4.95,
    reviewsCount: 112,
    featuredImage: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [],
    description: 'Ascend legendary World War I via ferratas through the heart of the UNESCO World Heritage Dolomites, dining every evening on handmade Tyrolean pastas and high-altitude mountain cheeses.',
    highlights: [
      'Climb the iconic Via Ferrata delle Scalette with professional equipment',
      'Sunrise panoramas from Rifugio Lagazuoi at 2,752 meters',
      'Private Cortina wine tasting with Sommelier pairing'
    ],
    inclusions: [
      '5 nights split between alpine rifugios and 4-star mountain lodge',
      'All technical climbing gear (harness, lanyard, helmet)',
      'UIAGM certified mountain guides (1:4 ratio)'
    ],
    exclusions: ['Venice airport transfer', 'Personal climbing gloves'],
    providerName: 'Dolomiti Mountain Guides',
    providerVerified: true,
    category: 'Adventure',
    groupSizeMax: 8,
    difficulty: 'Challenging',
    nextDepartureDate: '2026-09-28'
  }
];
