export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  featuredImage: string;
  toursCount: number;
  hotelsCount: number;
  description: string;
  bestTimeToVisit: string;
}

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: 'dest-01',
    slug: 'swiss-alps',
    name: 'Swiss Alps & Valais',
    country: 'Switzerland',
    region: 'Western Europe',
    featuredImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop',
    toursCount: 18,
    hotelsCount: 42,
    description: 'Towering pyramidal peaks, crystalline glacier waters, and pristine historic chalets.',
    bestTimeToVisit: 'June – September & December – March'
  },
  {
    id: 'dest-02',
    slug: 'kyoto',
    name: 'Kyoto Sanctuaries',
    country: 'Japan',
    region: 'East Asia',
    featuredImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    toursCount: 14,
    hotelsCount: 29,
    description: 'Centuries of preserved cultural heritage, moss rock zen gardens, and kaiseki excellence.',
    bestTimeToVisit: 'March – May & October – November'
  },
  {
    id: 'dest-03',
    slug: 'sylhet',
    name: 'Sylhet & Tea Valleys',
    country: 'Bangladesh',
    region: 'South Asia',
    featuredImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    toursCount: 8,
    hotelsCount: 16,
    description: 'Emerald green tea hills, rare biodiversity canopies, and serene freshwater wetlands.',
    bestTimeToVisit: 'October – February'
  },
  {
    id: 'dest-04',
    slug: 'dolomites',
    name: 'Italian Dolomites',
    country: 'Italy',
    region: 'Southern Europe',
    featuredImage: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=1200&auto=format&fit=crop',
    toursCount: 12,
    hotelsCount: 34,
    description: 'Jagged limestone spires, historic via ferratas, and high-altitude Tyrolean dining.',
    bestTimeToVisit: 'June – October'
  }
];

export async function getDestinations(): Promise<Destination[]> {
  return MOCK_DESTINATIONS;
}
