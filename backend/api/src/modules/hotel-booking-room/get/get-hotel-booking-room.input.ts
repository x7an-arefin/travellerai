import { z } from 'zod';


export const GetHotelBookingRoomInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetHotelBookingRoomInput = z.infer<typeof GetHotelBookingRoomInputSchema>;
