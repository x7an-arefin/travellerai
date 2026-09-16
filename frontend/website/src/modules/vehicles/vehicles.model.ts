export interface VehicleItem {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  category: 'Luxury SUV' | 'Electric Sedan' | 'Executive Van' | 'Alpine 4x4';
  acrissCode: string;
  seats: number;
  luggageCount: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Electric' | 'Hybrid' | 'Petrol' | 'Diesel';
  featuredImage: string;
  dailyRate: number;
  currency: string;
  unlimitedMileage: boolean;
  providerName: string;
  cityLocation: string;
  rating: number;
  reviewsCount: number;
  protectionTierIncluded: 'Standard CDW' | 'Zero Excess Comprehensive';
  chauffeurAvailable: boolean;
}

export interface VehicleSearchParams {
  cityLocation?: string;
  category?: string;
  transmission?: string;
  chauffeur?: boolean;
}
