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


export const ListVehiclePricingPlanOutputSchema = z.object({
  items: z.array(VehiclePricingPlanBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListVehiclePricingPlanOutput = z.infer<typeof ListVehiclePricingPlanOutputSchema>;
