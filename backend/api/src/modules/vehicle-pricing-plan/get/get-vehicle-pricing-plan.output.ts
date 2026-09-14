import { z } from 'zod';

const VehiclePricingPlanBaseSchema = z.object({
  id: z.string(),
  vehicleId: z.string(),
  rentalModel: z.enum(['self_drive', 'with_driver', 'both']).nullable(),
  baseDailyRate: z.string(),
  weeklyRate: z.string().nullable(),
  depositAmount: z.string().nullable(),
  freeKmPerDay: z.number().int().nullable(),
  isActive: z.boolean().nullable(),

});


export const GetVehiclePricingPlanOutputSchema = VehiclePricingPlanBaseSchema;


export type GetVehiclePricingPlanOutput = z.infer<typeof GetVehiclePricingPlanOutputSchema>;
