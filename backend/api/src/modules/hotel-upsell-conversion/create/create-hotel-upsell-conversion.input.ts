import { z } from 'zod';


export const CreateHotelUpsellConversionInputSchema = z.object({
  offerId: z.string().uuid(),
  hotelBookingId: z.string().uuid(),
  revenueAmount: z.string().regex(/^\d+(\.\d+)?$/),
  guestEmail: z.string().max(255).optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateHotelUpsellConversionInput = z.infer<typeof CreateHotelUpsellConversionInputSchema>;
