import { z } from 'zod';

const VehicleBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  registrationNumber: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number().int(),
  category: z.enum(['four_wheeler', 'two_wheeler', 'three_wheeler_cng']).nullable(),
  subCategory: z.enum(['economy_sedan', 'compact_hatchback', 'midsize_sedan', 'premium_sedan', 'compact_suv', 'fullsize_suv_4x4', 'luxury_suv', 'minivan', 'minibus', 'tourist_microbus', 'tourist_coach', 'commuter_scooter', 'premium_scooter', 'adventure_touring_bike', 'electric_scooter', 'electric_bicycle', 'cng_auto_rickshaw', 'tuktuk_rickshaw', 'electric_easy_bike']).nullable(),
  activeStatus: z.enum(['active', 'maintenance', 'compliance_hold', 'retired', 'inactive']).nullable(),
  isAvailableForRental: z.boolean().nullable(),

});


export const GetVehicleOutputSchema = VehicleBaseSchema;


export type GetVehicleOutput = z.infer<typeof GetVehicleOutputSchema>;
