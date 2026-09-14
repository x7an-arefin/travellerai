import { z } from 'zod';

const HotelUpsellConversionBaseSchema = z.object({
  id: z.string(),
  offerId: z.string(),
  hotelBookingId: z.string(),
  revenueAmount: z.string(),
  guestEmail: z.string().nullable(),
  acceptedAt: z.date(),

});


export const ListHotelUpsellConversionOutputSchema = z.object({
  items: z.array(HotelUpsellConversionBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListHotelUpsellConversionOutput = z.infer<typeof ListHotelUpsellConversionOutputSchema>;
