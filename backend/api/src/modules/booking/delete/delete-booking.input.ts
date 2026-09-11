import { z } from 'zod';


export const DeleteBookingInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteBookingInput = z.infer<typeof DeleteBookingInputSchema>;
