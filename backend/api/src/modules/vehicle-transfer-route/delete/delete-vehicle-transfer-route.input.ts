import { z } from 'zod';


export const DeleteVehicleTransferRouteInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteVehicleTransferRouteInput = z.infer<typeof DeleteVehicleTransferRouteInputSchema>;
