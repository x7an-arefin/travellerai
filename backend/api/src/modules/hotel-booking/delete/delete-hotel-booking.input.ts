import { z } from 'zod';


export const DeleteHotelBookingInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteHotelBookingInput = z.infer<typeof DeleteHotelBookingInputSchema>;
