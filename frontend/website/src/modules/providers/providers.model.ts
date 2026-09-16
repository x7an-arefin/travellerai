export interface ProviderProfile {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'Alpine Mountain Guide' | 'Heritage Cultural Guild' | 'Eco Expedition Operator' | 'Luxury Fleet Partner';
  location: string;
  country: string;
  rating: number;
  reviewsCount: number;
  yearsActive: number;
  avatarImage: string;
  coverImage: string;
  bio: string;
  verifiedKyc: boolean;
  insuranceVerified: boolean;
  activeListingsCount: number;
  languages: string[];
}

export const MOCK_PROVIDERS: ProviderProfile[] = [
  {
    id: 'prov-01',
    slug: 'helvetia-alpine-expeditions',
    name: 'Helvetia Alpine Expeditions',
    tagline: 'IFMGA-certified high-altitude alpine traverses across Zermatt & St. Moritz',
    category: 'Alpine Mountain Guide',
    location: 'Zermatt, Valais',
    country: 'Switzerland',
    rating: 4.97,
    reviewsCount: 184,
    yearsActive: 14,
    avatarImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
    bio: 'Founded by UIAGM/IFMGA certified Swiss mountain guides. We specialize in bespoke glacier treks, panoramic railway tours, and boutique chalet stays throughout the Pennine Alps.',
    verifiedKyc: true,
    insuranceVerified: true,
    activeListingsCount: 6,
    languages: ['English', 'German', 'French', 'Italian']
  },
  {
    id: 'prov-02',
    slug: 'kansai-heritage-guild',
    name: 'Kansai Heritage Guild',
    tagline: 'Centuries of preserved cultural access in Kyoto, Uji, and Nara',
    category: 'Heritage Cultural Guild',
    location: 'Kyoto',
    country: 'Japan',
    rating: 4.99,
    reviewsCount: 142,
    yearsActive: 9,
    avatarImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    bio: 'Dedicated to intimate, respectful cultural immersion. We hold privileged relationships with historical zen temple abbotts, master tea artisans, and premier Ryokan properties.',
    verifiedKyc: true,
    insuranceVerified: true,
    activeListingsCount: 4,
    languages: ['Japanese', 'English']
  },
  {
    id: 'prov-03',
    slug: 'apex-vip-fleet',
    name: 'Apex VIP Fleet Switzerland',
    tagline: 'Zero-emission electric luxury and armored alpine transport fleets',
    category: 'Luxury Fleet Partner',
    location: 'Zurich Airport (ZRH)',
    country: 'Switzerland',
    rating: 4.96,
    reviewsCount: 92,
    yearsActive: 7,
    avatarImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
    bio: 'Direct airport terminal delivery, concierge luggage transit, and chauffeured VIP transfers across Switzerland, Northern Italy, and the French Alps.',
    verifiedKyc: true,
    insuranceVerified: true,
    activeListingsCount: 8,
    languages: ['English', 'German', 'French']
  }
];

export async function getProviders(): Promise<ProviderProfile[]> {
  return MOCK_PROVIDERS;
}

export async function getProviderBySlug(slug: string): Promise<ProviderProfile | null> {
  return MOCK_PROVIDERS.find(p => p.slug === slug) || MOCK_PROVIDERS[0];
}
