import { z } from 'zod';


export const GetHotelUpsellOfferInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetHotelUpsellOfferInput = z.infer<typeof GetHotelUpsellOfferInputSchema>;
