import { z } from 'zod';


export const UpdateVehicleTransferRouteInputSchema = z.object({
  providerId: z.string().uuid().optional(),
  originName: z.string().max(150).optional(),
  originCoordinates: z.string().max(50).optional(),
  destinationName: z.string().max(150).optional(),
  destinationCoordinates: z.string().max(50).optional(),
  distanceKm: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  estimatedDurationMinutes: z.number().int().optional(),
  vehicleCategory: z.enum(['economy_sedan', 'compact_suv', 'fullsize_suv_4x4', 'minivan', 'tourist_microbus', 'cng_auto_rickshaw']).optional(),
  fixedFareAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  driverAllowanceAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  tollIncluded: z.boolean().optional(),
  isActive: z.boolean().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateVehicleTransferRouteInput = z.infer<typeof UpdateVehicleTransferRouteInputSchema>;
