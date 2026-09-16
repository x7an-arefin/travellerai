import { environment } from '@environments/environment';
import type { VehicleItem, VehicleSearchParams } from './vehicles.model';
import { MOCK_VEHICLES } from './vehicles.mock';

export async function getVehicles(params?: VehicleSearchParams): Promise<VehicleItem[]> {
  if (environment.dataMode === 'mock') {
    let results = [...MOCK_VEHICLES];
    if (params?.category) {
      results = results.filter(v => v.category.toLowerCase().includes(params.category!.toLowerCase()));
    }
    if (params?.cityLocation) {
      results = results.filter(v => v.cityLocation.toLowerCase().includes(params.cityLocation!.toLowerCase()));
    }
    if (params?.chauffeur !== undefined) {
      results = results.filter(v => v.chauffeurAvailable === params.chauffeur);
    }
    return results;
  }

  // Live Backend API
  try {
    const url = new URL(`${environment.apiBaseUrl}/vehicles`);
    if (params?.category) url.searchParams.set('category', params.category);

    const res = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(4000)
    });

    if (!res.ok) return MOCK_VEHICLES;
    const json = await res.json();
    const items = (json.items || json.data || json) as any[];
    return items.map((v: any) => ({
      id: v.id,
      slug: v.slug || `vehicle-${v.id}`,
      make: v.make || 'Premium',
      model: v.model || 'Spec Class',
      year: v.year || 2024,
      category: v.category || 'Luxury SUV',
      acrissCode: v.acrissCode || 'XFAR',
      seats: v.seats || 5,
      luggageCount: v.luggageCount || 4,
      transmission: v.transmission || 'Automatic',
      fuelType: v.fuelType || 'Hybrid',
      featuredImage: v.featuredImageUrl || MOCK_VEHICLES[0].featuredImage,
      dailyRate: Number(v.dailyRate || 299),
      currency: v.currency || 'USD',
      unlimitedMileage: v.unlimitedMileage ?? true,
      providerName: v.providerName || 'Certified Fleet Partner',
      cityLocation: v.cityLocation || 'Airport Hub',
      rating: Number(v.rating || 4.9),
      reviewsCount: Number(v.reviewsCount || 15),
      protectionTierIncluded: 'Zero Excess Comprehensive',
      chauffeurAvailable: v.chauffeurAvailable ?? true
    }));
  } catch (err) {
    console.warn('[VehiclesController] API error, fallback to mock:', err);
    return MOCK_VEHICLES;
  }
}

export async function getVehicleBySlug(slug: string): Promise<VehicleItem | null> {
  const vehicles = await getVehicles();
  return vehicles.find(v => v.slug === slug) || MOCK_VEHICLES[0];
}
