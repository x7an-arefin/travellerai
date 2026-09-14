import { z } from 'zod';


export const DeleteHotelBookingRoomInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteHotelBookingRoomInput = z.infer<typeof DeleteHotelBookingRoomInputSchema>;
