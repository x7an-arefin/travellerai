import { z } from 'zod';


export const GetVehicleExtraChargeInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetVehicleExtraChargeInput = z.infer<typeof GetVehicleExtraChargeInputSchema>;
