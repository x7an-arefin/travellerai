export interface TransferRoute {
  id: string;
  slug: string;
  origin: string;
  destination: string;
  distanceKm: number;
  durationMinutes: number;
  vehicleClass: string;
  vehicleModel: string;
  fixedRate: number;
  currency: string;
  featuredImage: string;
  includedAmenities: string[];
  providerName: string;
}

export const MOCK_TRANSFERS: TransferRoute[] = [
  {
    id: 'tr-01',
    slug: 'zurich-to-zermatt-vip-transfer',
    origin: 'Zurich Airport (ZRH)',
    destination: 'Täsch / Zermatt Terminal',
    distanceKm: 220,
    durationMinutes: 195,
    vehicleClass: 'Executive 4x4 SUV',
    vehicleModel: 'Range Rover Autobiography P530',
    fixedRate: 850,
    currency: 'USD',
    featuredImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
    includedAmenities: [
      'VIP Flight Tracker Meet & Greet at Gate',
      'Complimentary Bottled Mineral Water & Wi-Fi',
      'Ski & Snowboard Roof Storage Unit',
      'All Swiss Motorway Tolls & Vignette Included'
    ],
    providerName: 'Apex VIP Fleet Switzerland'
  },
  {
    id: 'tr-02',
    slug: 'kansai-to-kyoto-gion-transfer',
    origin: 'Kansai International Airport (KIX)',
    destination: 'Kyoto Gion District',
    distanceKm: 98,
    durationMinutes: 80,
    vehicleClass: 'Executive Luxury Van',
    vehicleModel: 'Mercedes-Benz V-Class Exclusive',
    fixedRate: 380,
    currency: 'USD',
    featuredImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    includedAmenities: [
      'English/Japanese Speaking Private Chauffeur',
      'Door-to-Door Ryokan Delivery',
      'Child Safety Seats Upon Request',
      'All Express Highway Tolls Included'
    ],
    providerName: 'Chauffeured Alps & Kyoto'
  }
];

export async function getTransfers(): Promise<TransferRoute[]> {
  return MOCK_TRANSFERS;
}

export async function getTransferBySlug(slug: string): Promise<TransferRoute | null> {
  return MOCK_TRANSFERS.find(t => t.slug === slug) || MOCK_TRANSFERS[0];
}
