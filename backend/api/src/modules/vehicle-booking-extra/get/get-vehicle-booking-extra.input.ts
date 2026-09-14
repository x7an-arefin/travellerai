import { z } from 'zod';


export const GetVehicleBookingExtraInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetVehicleBookingExtraInput = z.infer<typeof GetVehicleBookingExtraInputSchema>;
