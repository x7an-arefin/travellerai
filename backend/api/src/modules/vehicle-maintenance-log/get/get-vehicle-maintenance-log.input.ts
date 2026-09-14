import { z } from 'zod';


export const GetVehicleMaintenanceLogInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetVehicleMaintenanceLogInput = z.infer<typeof GetVehicleMaintenanceLogInputSchema>;
