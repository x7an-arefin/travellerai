import { z } from 'zod';


export const CreateVehiclePricingPlanInputSchema = z.object({
  vehicleId: z.string().uuid(),
  rentalModel: z.enum(['self_drive', 'with_driver', 'both']).optional().default('self_drive'),
  baseHourlyRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  baseDailyRate: z.string().regex(/^\d+(\.\d+)?$/),
  weeklyRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  depositAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('200.00'),
  freeKmPerDay: z.number().int().optional().default(150),
  excessKmRate: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.25'),
  fuelPolicyCode: z.enum(['full_to_full', 'same_to_same', 'pre_purchase_full', 'provider_filled']).optional().default('full_to_full'),
  isB2BExclusive: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  deletedAt: z.string().datetime().optional(),

});



export type CreateVehiclePricingPlanInput = z.infer<typeof CreateVehiclePricingPlanInputSchema>;
