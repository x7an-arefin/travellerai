import { z } from 'zod';


export const CreateVehicleTransferRouteInputSchema = z.object({
  providerId: z.string().uuid(),
  originName: z.string().max(150),
  originCoordinates: z.string().max(50).optional(),
  destinationName: z.string().max(150),
  destinationCoordinates: z.string().max(50).optional(),
  distanceKm: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  estimatedDurationMinutes: z.number().int().optional(),
  vehicleCategory: z.enum(['economy_sedan', 'compact_suv', 'fullsize_suv_4x4', 'minivan', 'tourist_microbus', 'cng_auto_rickshaw']).optional().default('economy_sedan'),
  fixedFareAmount: z.string().regex(/^\d+(\.\d+)?$/),
  driverAllowanceAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  tollIncluded: z.boolean().optional().default(true),
  isActive: z.boolean().optional().default(true),
  deletedAt: z.string().datetime().optional(),

});



export type CreateVehicleTransferRouteInput = z.infer<typeof CreateVehicleTransferRouteInputSchema>;
