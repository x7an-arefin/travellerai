import { z } from 'zod';


export const DeleteHotelUpsellConversionInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteHotelUpsellConversionInput = z.infer<typeof DeleteHotelUpsellConversionInputSchema>;
