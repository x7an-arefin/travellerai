import { MOCK_DESTINATIONS, type Destination } from '@modules/destinations/destinations.model';
import { MOCK_TOURS } from '@modules/tours/tours.mock';
import { MOCK_HOTELS } from '@modules/hotels/hotels.mock';
import { MOCK_VEHICLES } from '@modules/vehicles/vehicles.mock';
import type { TourPackage } from '@modules/tours/tours.model';
import type { HotelProperty } from '@modules/hotels/hotels.model';
import type { VehicleItem } from '@modules/vehicles/vehicles.model';


export interface SelectOption {
  value: string;
  label: string;
  slug?: string;
  count?: number;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  label: string;
}

/**
 * Standard Currencies Registry
 */
export const CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'CHF', symbol: 'Fr.', label: 'CHF (Fr.)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'JPY', symbol: '¥', label: 'JPY (¥)' }
];

/**
 * Hotel Arrival Time Slots Registry
 */
export const HOTEL_ARRIVAL_SLOTS: SelectOption[] = [
  { value: '15:00 - 16:00', label: '15:00 – 16:00 (Standard Check-in)' },
  { value: '16:00 - 18:00', label: '16:00 – 18:00 (Late Afternoon)' },
  { value: '18:00 - 21:00', label: '18:00 – 21:00 (Evening Arrival)' },
  { value: 'early-request', label: 'Early Arrival Request (Subject to room availability)' }
];

/**
 * Driver Age Categories Registry
 */
export const DRIVER_AGE_TIERS: SelectOption[] = [
  { value: '25+', label: '25+ Years Old (Standard Driver Tier)' },
  { value: '21-24', label: '21–24 Years Old (Young Driver License)' }
];

/**
 * Contact Inquiry Subject Registry
 */
export const CONTACT_INQUIRY_SUBJECTS: SelectOption[] = [
  { value: 'custom-expedition', label: 'Custom Expedition Inquiry' },
  { value: 'hotel-chalet', label: 'Hotel & Chalet Booking Assistance' },
  { value: 'fleet-transfer', label: 'Fleet / Airport Transfer Logistics' },
  { value: 'provider-portal', label: 'Provider Portal & Verification' },
  { value: 'general', label: 'General Concierge Inquiry' }
];

/**
 * Extract dynamic tour destinations
 */
export function getDynamicTourDestinations(tours: TourPackage[] = MOCK_TOURS, destinations: Destination[] = MOCK_DESTINATIONS): SelectOption[] {
  const map = new Map<string, { value: string; label: string }>();

  destinations.forEach(d => {
    map.set(d.slug, { value: d.slug, label: d.name });
  });

  tours.forEach(t => {
    if (!map.has(t.destinationSlug)) {
      map.set(t.destinationSlug, { value: t.destinationSlug, label: `${t.destination}, ${t.country}` });
    }
  });

  return Array.from(map.values());
}

/**
 * Extract dynamic expedition categories
 */
export function getDynamicTourCategories(tours: TourPackage[] = MOCK_TOURS): SelectOption[] {
  const categoriesSet = new Set<string>();
  tours.forEach(t => {
    if (t.category) categoriesSet.add(t.category);
  });

  return Array.from(categoriesSet).map(cat => ({
    value: cat.toLowerCase(),
    label: cat === 'Adventure' ? 'High Altitude & Adventure' : cat === 'Cultural' ? 'Cultural Heritage' : cat === 'Wildlife' ? 'Wildlife & Nature' : cat === 'Luxury' ? 'Private Luxury' : cat
  }));
}

/**
 * Extract dynamic difficulty options
 */
export function getDynamicTourDifficulties(tours: TourPackage[] = MOCK_TOURS): SelectOption[] {
  const difficulties = new Set<string>();
  tours.forEach(t => {
    if (t.difficulty) difficulties.add(t.difficulty);
  });

  return Array.from(difficulties).map(d => ({
    value: d.toLowerCase(),
    label: d === 'Easy' ? 'Easy (Cultural / Leisure)' : d === 'Moderate' ? 'Moderate (Day Trekking)' : d === 'Challenging' ? 'Challenging (Alpine Routes)' : d
  }));
}

/**
 * Extract dynamic hotel cities
 */
export function getDynamicHotelCities(hotels: HotelProperty[] = MOCK_HOTELS): SelectOption[] {
  const citiesMap = new Map<string, string>();
  hotels.forEach(h => {
    const slug = h.city.toLowerCase().replace(/\s+/g, '-');
    citiesMap.set(slug, `${h.city}, ${h.country}`);
  });

  return Array.from(citiesMap.entries()).map(([value, label]) => ({
    value,
    label
  }));
}

/**
 * Extract dynamic hotel property types
 */
export function getDynamicHotelTypes(hotels: HotelProperty[] = MOCK_HOTELS): SelectOption[] {
  const typesMap = new Map<string, string>();
  hotels.forEach(h => {
    const slug = h.propertyType.toLowerCase().replace(/\s+/g, '-');
    typesMap.set(slug, h.propertyType);
  });

  return Array.from(typesMap.entries()).map(([value, label]) => ({
    value,
    label
  }));
}

/**
 * Extract dynamic vehicle fleet classes
 */
export function getDynamicVehicleCategories(vehicles: VehicleItem[] = MOCK_VEHICLES): SelectOption[] {
  const catMap = new Map<string, string>();
  vehicles.forEach(v => {
    const slug = v.category.toLowerCase().replace(/\s+/g, '-');
    catMap.set(slug, v.category);
  });

  return Array.from(catMap.entries()).map(([value, label]) => ({
    value,
    label
  }));
}

/**
 * Extract dynamic vehicle station hubs / locations
 */
export function getDynamicVehicleHubs(vehicles: VehicleItem[] = MOCK_VEHICLES): SelectOption[] {
  const hubMap = new Map<string, string>();
  vehicles.forEach(v => {
    const locations = v.cityLocation.split('/').map((s:any) => s.trim());
    locations.forEach((loc:any) => {
      const slug = loc.toLowerCase().replace(/\s+/g, '-');
      hubMap.set(slug, loc);
    });
  });

  return Array.from(hubMap.entries()).map(([value, label]) => ({
    value,
    label
  }));
}

/**
 * Extract dynamic transmission options
 */
export function getDynamicTransmissions(vehicles: VehicleItem[] = MOCK_VEHICLES): SelectOption[] {
  const transSet = new Set<string>();
  vehicles.forEach(v => {
    if (v.transmission) transSet.add(v.transmission);
  });

  return Array.from(transSet).map(t => ({
    value: t,
    label: `${t} Only`
  }));
}
