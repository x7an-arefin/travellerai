import { z } from 'zod';


export const UpdateVehicleInputSchema = z.object({
  providerId: z.string().uuid().optional(),
  registrationNumber: z.string().max(50).optional(),
  vinNumber: z.string().max(50).optional(),
  make: z.string().max(50).optional(),
  model: z.string().max(50).optional(),
  year: z.number().int().optional(),
  category: z.enum(['four_wheeler', 'two_wheeler', 'three_wheeler_cng']).optional(),
  subCategory: z.enum(['economy_sedan', 'compact_hatchback', 'midsize_sedan', 'premium_sedan', 'compact_suv', 'fullsize_suv_4x4', 'luxury_suv', 'minivan', 'minibus', 'tourist_microbus', 'tourist_coach', 'commuter_scooter', 'premium_scooter', 'adventure_touring_bike', 'electric_scooter', 'electric_bicycle', 'cng_auto_rickshaw', 'tuktuk_rickshaw', 'electric_easy_bike']).optional(),
  seatingCapacity: z.number().int().optional(),
  luggageCapacityLarge: z.number().int().optional(),
  luggageCapacitySmall: z.number().int().optional(),
  transmission: z.enum(['automatic', 'manual', 'direct_drive']).optional(),
  fuelType: z.enum(['petrol', 'octane', 'diesel', 'hybrid_petrol', 'hybrid_diesel', 'full_electric', 'cng', 'lpg']).optional(),
  driveTrain: z.enum(['fwd', 'rwd', 'awd_4x4']).optional(),
  color: z.string().max(40).optional(),
  airConditioning: z.enum(['climate_control', 'manual_ac', 'none']).optional(),
  engineDisplacementCc: z.number().int().optional(),
  currentOdometerKm: z.number().int().optional(),
  currentFuelLevelPercent: z.number().int().optional(),
  cngCylinderTestExpiry: z.string().max(10).optional(),
  activeStatus: z.enum(['active', 'maintenance', 'compliance_hold', 'retired', 'inactive']).optional(),
  isAvailableForRental: z.boolean().optional(),
  isAvailableWithDriver: z.boolean().optional(),
  currentLocationAddress: z.string().max(300).optional(),
  latitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  longitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  photos: z.record(z.string(), z.unknown()).optional(),
  features: z.record(z.string(), z.unknown()).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateVehicleInput = z.infer<typeof UpdateVehicleInputSchema>;
