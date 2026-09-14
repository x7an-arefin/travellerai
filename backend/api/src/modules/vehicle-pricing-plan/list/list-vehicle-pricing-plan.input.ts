import { z } from 'zod';


export const ListVehiclePricingPlanInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),

});


export type ListVehiclePricingPlanInput = z.infer<typeof ListVehiclePricingPlanInputSchema>;
