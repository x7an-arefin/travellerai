import { z } from 'zod';

const VehicleTransferRouteBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  originName: z.string(),
  destinationName: z.string(),
  vehicleCategory: z.enum(['economy_sedan', 'compact_suv', 'fullsize_suv_4x4', 'minivan', 'tourist_microbus', 'cng_auto_rickshaw']).nullable(),
  fixedFareAmount: z.string(),
  isActive: z.boolean().nullable(),

});


export const UpdateVehicleTransferRouteOutputSchema = VehicleTransferRouteBaseSchema;


export type UpdateVehicleTransferRouteOutput = z.infer<typeof UpdateVehicleTransferRouteOutputSchema>;
