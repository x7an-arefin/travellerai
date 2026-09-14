import { z } from 'zod';


export const GetVehicleTransferRouteInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetVehicleTransferRouteInput = z.infer<typeof GetVehicleTransferRouteInputSchema>;
