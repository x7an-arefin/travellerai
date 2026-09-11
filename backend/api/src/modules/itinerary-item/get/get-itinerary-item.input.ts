import { z } from 'zod';


export const GetItineraryItemInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetItineraryItemInput = z.infer<typeof GetItineraryItemInputSchema>;
