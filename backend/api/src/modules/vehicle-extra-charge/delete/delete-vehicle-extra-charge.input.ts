import { z } from 'zod';


export const DeleteVehicleExtraChargeInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteVehicleExtraChargeInput = z.infer<typeof DeleteVehicleExtraChargeInputSchema>;
