import { z } from 'zod';


export const GetHotelBookingInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetHotelBookingInput = z.infer<typeof GetHotelBookingInputSchema>;
