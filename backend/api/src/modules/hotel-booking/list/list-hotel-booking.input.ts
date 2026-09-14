import { z } from 'zod';


export const ListHotelBookingInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),

});


export type ListHotelBookingInput = z.infer<typeof ListHotelBookingInputSchema>;
