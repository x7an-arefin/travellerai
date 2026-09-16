import { environment } from '@environments/environment';
import type { TourPackage, TourSearchParams } from './tours.model';
import { MOCK_TOURS } from './tours.mock';

export async function getTours(params?: TourSearchParams): Promise<TourPackage[]> {
  if (environment.dataMode === 'mock') {
    let results = [...MOCK_TOURS];
    if (params?.category) {
      results = results.filter(t => t.category.toLowerCase() === params.category?.toLowerCase());
    }
    if (params?.destination) {
      results = results.filter(t => 
        t.destination.toLowerCase().includes(params.destination!.toLowerCase()) ||
        t.country.toLowerCase().includes(params.destination!.toLowerCase())
      );
    }
    if (params?.priceMax) {
      results = results.filter(t => t.priceFrom <= (params.priceMax || Infinity));
    }
    if (params?.query) {
      const q = params.query.toLowerCase();
      results = results.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q)
      );
    }
    return results;
  }

  // Live Backend API Integration
  try {
    const url = new URL(`${environment.apiBaseUrl}/packages`);
    if (params?.query) url.searchParams.set('search', params.query);
    if (params?.category) url.searchParams.set('category', params.category);

    const res = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(4000)
    });

    if (!res.ok) {
      console.warn(`[ToursController] Backend returned ${res.status}, falling back to mock data`);
      return MOCK_TOURS;
    }

    const json = await res.json();
    const items = (json.items || json.data || json) as any[];
    return items.map((pkg: any) => ({
      id: pkg.id,
      slug: pkg.slug || `tour-${pkg.id}`,
      title: pkg.name || pkg.title,
      subtitle: pkg.shortDescription || pkg.subtitle || '',
      destination: pkg.destinationName || 'Curated Location',
      destinationSlug: pkg.destinationSlug || 'destination',
      country: pkg.country || 'Global',
      durationDays: pkg.durationDays || 3,
      durationNights: (pkg.durationDays || 3) - 1,
      priceFrom: Number(pkg.basePrice || pkg.priceFrom || 999),
      currency: pkg.currency || 'USD',
      rating: Number(pkg.rating || 4.9),
      reviewsCount: Number(pkg.reviewsCount || 12),
      featuredImage: pkg.featuredImageUrl || pkg.heroImage || MOCK_TOURS[0].featuredImage,
      galleryImages: pkg.galleryImages || [],
      description: pkg.description || '',
      highlights: pkg.highlights || [],
      inclusions: pkg.inclusions || [],
      exclusions: pkg.exclusions || [],
      providerName: pkg.providerName || 'Verified Operator',
      providerVerified: true,
      category: pkg.category || 'Adventure',
      groupSizeMax: pkg.maxGroupSize || 12,
      difficulty: pkg.difficulty || 'Moderate',
      badge: pkg.badge
    }));
  } catch (err) {
    console.warn('[ToursController] Failed to connect to API, fallback to mock data:', err);
    return MOCK_TOURS;
  }
}

export async function getTourBySlug(slug: string): Promise<TourPackage | null> {
  const tours = await getTours();
  return tours.find(t => t.slug === slug) || MOCK_TOURS[0];
}
