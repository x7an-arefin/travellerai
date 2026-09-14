import { z } from 'zod';


export const GetVehicleProtectionPlanInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetVehicleProtectionPlanInput = z.infer<typeof GetVehicleProtectionPlanInputSchema>;
