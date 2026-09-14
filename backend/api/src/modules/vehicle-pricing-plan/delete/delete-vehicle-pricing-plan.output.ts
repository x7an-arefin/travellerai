import { z } from 'zod';

const VehiclePricingPlanBaseSchema = z.object({
  id: z.string(),
  vehicleId: z.string(),
  baseDailyRate: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteVehiclePricingPlanOutputSchema = VehiclePricingPlanBaseSchema;


export type DeleteVehiclePricingPlanOutput = z.infer<typeof DeleteVehiclePricingPlanOutputSchema>;
