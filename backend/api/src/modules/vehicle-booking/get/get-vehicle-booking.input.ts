import { z } from 'zod';


export const GetVehicleBookingInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetVehicleBookingInput = z.infer<typeof GetVehicleBookingInputSchema>;
