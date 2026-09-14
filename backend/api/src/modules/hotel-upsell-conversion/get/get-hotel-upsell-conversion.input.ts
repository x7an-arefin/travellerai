import { z } from 'zod';


export const GetHotelUpsellConversionInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetHotelUpsellConversionInput = z.infer<typeof GetHotelUpsellConversionInputSchema>;
