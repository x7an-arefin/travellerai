import { z } from 'zod';


export const DeleteVehicleMaintenanceLogInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteVehicleMaintenanceLogInput = z.infer<typeof DeleteVehicleMaintenanceLogInputSchema>;
