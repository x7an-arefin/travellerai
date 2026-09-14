import { z } from 'zod';


export const DeleteVehicleBookingInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteVehicleBookingInput = z.infer<typeof DeleteVehicleBookingInputSchema>;
