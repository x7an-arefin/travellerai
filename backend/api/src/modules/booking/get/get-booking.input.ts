import { z } from 'zod';


export const GetBookingInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetBookingInput = z.infer<typeof GetBookingInputSchema>;
