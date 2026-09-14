import { z } from 'zod';


export const UpdateVehiclePricingPlanInputSchema = z.object({
  vehicleId: z.string().uuid().optional(),
  rentalModel: z.enum(['self_drive', 'with_driver', 'both']).optional(),
  baseHourlyRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  baseDailyRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  weeklyRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  depositAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  freeKmPerDay: z.number().int().optional(),
  excessKmRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  fuelPolicyCode: z.enum(['full_to_full', 'same_to_same', 'pre_purchase_full', 'provider_filled']).optional(),
  isB2BExclusive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateVehiclePricingPlanInput = z.infer<typeof UpdateVehiclePricingPlanInputSchema>;
