import { z } from 'zod';


export const GetVehiclePricingPlanInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetVehiclePricingPlanInput = z.infer<typeof GetVehiclePricingPlanInputSchema>;
