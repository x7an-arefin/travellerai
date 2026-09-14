import { z } from 'zod';


export const DeleteHotelUpsellOfferInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteHotelUpsellOfferInput = z.infer<typeof DeleteHotelUpsellOfferInputSchema>;
