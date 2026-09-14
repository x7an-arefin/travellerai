import { z } from 'zod';


export const DeleteVehicleBookingExtraInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteVehicleBookingExtraInput = z.infer<typeof DeleteVehicleBookingExtraInputSchema>;
