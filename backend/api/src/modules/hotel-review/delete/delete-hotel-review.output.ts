import { z } from 'zod';

const HotelReviewBaseSchema = z.object({
  id: z.string(),
  hotelBookingId: z.string(),
  propertyId: z.string(),
  overallRating: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteHotelReviewOutputSchema = HotelReviewBaseSchema;


export type DeleteHotelReviewOutput = z.infer<typeof DeleteHotelReviewOutputSchema>;
