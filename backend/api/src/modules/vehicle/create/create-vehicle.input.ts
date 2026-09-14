import { z } from 'zod';


export const CreateVehicleInputSchema = z.object({
  providerId: z.string().uuid(),
  registrationNumber: z.string().max(50),
  vinNumber: z.string().max(50).optional(),
  make: z.string().max(50),
  model: z.string().max(50),
  year: z.number().int(),
  category: z.enum(['four_wheeler', 'two_wheeler', 'three_wheeler_cng']).optional().default('four_wheeler'),
  subCategory: z.enum(['economy_sedan', 'compact_hatchback', 'midsize_sedan', 'premium_sedan', 'compact_suv', 'fullsize_suv_4x4', 'luxury_suv', 'minivan', 'minibus', 'tourist_microbus', 'tourist_coach', 'commuter_scooter', 'premium_scooter', 'adventure_touring_bike', 'electric_scooter', 'electric_bicycle', 'cng_auto_rickshaw', 'tuktuk_rickshaw', 'electric_easy_bike']).optional().default('economy_sedan'),
  seatingCapacity: z.number().int().default(5),
  luggageCapacityLarge: z.number().int().optional().default(2),
  luggageCapacitySmall: z.number().int().optional().default(2),
  transmission: z.enum(['automatic', 'manual', 'direct_drive']).optional().default('automatic'),
  fuelType: z.enum(['petrol', 'octane', 'diesel', 'hybrid_petrol', 'hybrid_diesel', 'full_electric', 'cng', 'lpg']).optional().default('petrol'),
  driveTrain: z.enum(['fwd', 'rwd', 'awd_4x4']).optional().default('fwd'),
  color: z.string().max(40).optional(),
  airConditioning: z.enum(['climate_control', 'manual_ac', 'none']).optional().default('climate_control'),
  engineDisplacementCc: z.number().int().optional(),
  currentOdometerKm: z.number().int().optional().default(0),
  currentFuelLevelPercent: z.number().int().optional().default(100),
  cngCylinderTestExpiry: z.string().max(10).optional(),
  activeStatus: z.enum(['active', 'maintenance', 'compliance_hold', 'retired', 'inactive']).optional().default('active'),
  isAvailableForRental: z.boolean().optional().default(true),
  isAvailableWithDriver: z.boolean().optional().default(true),
  currentLocationAddress: z.string().max(300).optional(),
  latitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  longitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  photos: z.record(z.string(), z.unknown()).optional(),
  features: z.record(z.string(), z.unknown()).optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateVehicleInput = z.infer<typeof CreateVehicleInputSchema>;
