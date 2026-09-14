import { z } from 'zod';


export const DeleteVehiclePricingPlanInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteVehiclePricingPlanInput = z.infer<typeof DeleteVehiclePricingPlanInputSchema>;
