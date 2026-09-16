import { environment } from '@environments/environment';
import type { HotelProperty, HotelSearchParams } from './hotels.model';
import { MOCK_HOTELS } from './hotels.mock';

export async function getHotels(params?: HotelSearchParams): Promise<HotelProperty[]> {
  if (environment.dataMode === 'mock') {
    let results = [...MOCK_HOTELS];
    if (params?.city) {
      results = results.filter(h => 
        h.city.toLowerCase().includes(params.city!.toLowerCase()) ||
        h.country.toLowerCase().includes(params.city!.toLowerCase())
      );
    }
    if (params?.starRating) {
      results = results.filter(h => h.starRating >= (params.starRating || 0));
    }
    return results;
  }

  // Live Backend API
  try {
    const url = new URL(`${environment.apiBaseUrl}/hotel-properties`);
    if (params?.city) url.searchParams.set('city', params.city);

    const res = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(4000)
    });

    if (!res.ok) return MOCK_HOTELS;
    const json = await res.json();
    const items = (json.items || json.data || json) as any[];
    return items.map((p: any) => ({
      id: p.id,
      slug: p.slug || `hotel-${p.id}`,
      name: p.name,
      propertyType: p.propertyType || 'Boutique Hotel',
      starRating: Number(p.starRating || 5),
      city: p.city || 'Destination City',
      country: p.country || 'Global',
      address: p.address || '',
      featuredImage: p.featuredImageUrl || MOCK_HOTELS[0].featuredImage,
      galleryImages: p.galleryImages || [],
      pricePerNight: Number(p.baseRate || 250),
      currency: p.currency || 'USD',
      rating: Number(p.averageRating || 4.9),
      reviewsCount: Number(p.reviewsCount || 20),
      description: p.description || '',
      amenities: p.amenities || ['Free Wi-Fi', 'Room Service'],
      roomTypesCount: p.roomTypesCount || 8,
      providerName: p.providerName || 'Hospitality Guild',
      instantConfirmation: true,
      freeCancellation: true
    }));
  } catch (err) {
    console.warn('[HotelsController] API error, fallback to mock:', err);
    return MOCK_HOTELS;
  }
}

export async function getHotelBySlug(slug: string): Promise<HotelProperty | null> {
  const hotels = await getHotels();
  return hotels.find(h => h.slug === slug) || MOCK_HOTELS[0];
}
