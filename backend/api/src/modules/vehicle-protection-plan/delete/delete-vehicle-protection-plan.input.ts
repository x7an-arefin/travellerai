import { z } from 'zod';


export const DeleteVehicleProtectionPlanInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteVehicleProtectionPlanInput = z.infer<typeof DeleteVehicleProtectionPlanInputSchema>;
