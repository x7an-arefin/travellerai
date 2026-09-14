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


export const ListHotelReviewOutputSchema = z.object({
  items: z.array(HotelReviewBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListHotelReviewOutput = z.infer<typeof ListHotelReviewOutputSchema>;
