export interface HotelProperty {
  id: string;
  slug: string;
  name: string;
  propertyType: 'Boutique Hotel' | 'Luxury Resort' | 'Alpine Chalet' | 'Heritage Ryokan' | 'Eco Villa';
  starRating: number;
  city: string;
  country: string;
  address: string;
  featuredImage: string;
  galleryImages: string[];
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  description: string;
  amenities: string[];
  roomTypesCount: number;
  providerName: string;
  instantConfirmation: boolean;
  freeCancellation: boolean;
}

export interface HotelSearchParams {
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  starRating?: number;
}
