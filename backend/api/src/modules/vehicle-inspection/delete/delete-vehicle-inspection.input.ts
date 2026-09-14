import { z } from 'zod';


export const DeleteVehicleInspectionInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteVehicleInspectionInput = z.infer<typeof DeleteVehicleInspectionInputSchema>;
