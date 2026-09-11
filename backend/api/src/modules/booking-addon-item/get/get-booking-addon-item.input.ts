import { z } from 'zod';


export const GetBookingAddonItemInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetBookingAddonItemInput = z.infer<typeof GetBookingAddonItemInputSchema>;
