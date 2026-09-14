import { z } from 'zod';

const HotelUpsellConversionBaseSchema = z.object({
  id: z.string(),
  offerId: z.string(),
  hotelBookingId: z.string(),
  revenueAmount: z.string(),
  guestEmail: z.string().nullable(),
  acceptedAt: z.date(),

});


export const CreateHotelUpsellConversionOutputSchema = HotelUpsellConversionBaseSchema;


export type CreateHotelUpsellConversionOutput = z.infer<typeof CreateHotelUpsellConversionOutputSchema>;
