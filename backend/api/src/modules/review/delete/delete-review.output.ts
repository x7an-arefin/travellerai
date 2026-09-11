import { z } from 'zod';

const ReviewBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  packageId: z.string(),
  providerId: z.string(),
  travelerId: z.string(),
  overallRating: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteReviewOutputSchema = ReviewBaseSchema;


export type DeleteReviewOutput = z.infer<typeof DeleteReviewOutputSchema>;
