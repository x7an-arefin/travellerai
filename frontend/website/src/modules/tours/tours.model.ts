export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  destination: string;
  destinationSlug: string;
  country: string;
  durationDays: number;
  durationNights: number;
  priceFrom: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  featuredImage: string;
  galleryImages: string[];
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  providerName: string;
  providerVerified: boolean;
  category: 'Adventure' | 'Cultural' | 'Luxury' | 'Wildlife' | 'Culinary';
  groupSizeMax: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  nextDepartureDate?: string;
  badge?: string;
}

export interface TourSearchParams {
  destination?: string;
  category?: string;
  duration?: string;
  priceMax?: number;
  query?: string;
}
