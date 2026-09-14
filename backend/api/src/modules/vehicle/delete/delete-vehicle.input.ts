import { z } from 'zod';


export const DeleteVehicleInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteVehicleInput = z.infer<typeof DeleteVehicleInputSchema>;
