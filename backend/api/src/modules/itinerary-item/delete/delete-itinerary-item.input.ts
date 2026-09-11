import { z } from 'zod';


export const DeleteItineraryItemInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteItineraryItemInput = z.infer<typeof DeleteItineraryItemInputSchema>;
