import { z } from 'zod';

const HotelUpsellOfferBaseSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  title: z.string(),
  additionalPricePerNight: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteHotelUpsellOfferOutputSchema = HotelUpsellOfferBaseSchema;


export type DeleteHotelUpsellOfferOutput = z.infer<typeof DeleteHotelUpsellOfferOutputSchema>;
