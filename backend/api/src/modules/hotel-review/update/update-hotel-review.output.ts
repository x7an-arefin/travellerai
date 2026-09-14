import { z } from 'zod';

const HotelReviewBaseSchema = z.object({
  id: z.string(),
  hotelBookingId: z.string(),
  propertyId: z.string(),
  overallRating: z.number().int(),
  reviewTitle: z.string().nullable(),
  isVerifiedStay: z.boolean().nullable(),
  createdAt: z.date(),

});


export const UpdateHotelReviewOutputSchema = HotelReviewBaseSchema;


export type UpdateHotelReviewOutput = z.infer<typeof UpdateHotelReviewOutputSchema>;
