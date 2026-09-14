import { z } from 'zod';


export const GetVehicleInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetVehicleInput = z.infer<typeof GetVehicleInputSchema>;
