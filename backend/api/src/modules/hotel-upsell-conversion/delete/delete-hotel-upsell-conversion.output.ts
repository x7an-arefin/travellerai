import { z } from 'zod';

const HotelUpsellConversionBaseSchema = z.object({
  id: z.string(),
  offerId: z.string(),
  hotelBookingId: z.string(),
  revenueAmount: z.string(),
  acceptedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteHotelUpsellConversionOutputSchema = HotelUpsellConversionBaseSchema;


export type DeleteHotelUpsellConversionOutput = z.infer<typeof DeleteHotelUpsellConversionOutputSchema>;
