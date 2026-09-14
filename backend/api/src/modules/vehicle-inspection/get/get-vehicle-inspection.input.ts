import { z } from 'zod';


export const GetVehicleInspectionInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetVehicleInspectionInput = z.infer<typeof GetVehicleInspectionInputSchema>;
