import { z } from 'zod';


export const DeleteBookingAddonItemInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteBookingAddonItemInput = z.infer<typeof DeleteBookingAddonItemInputSchema>;
