import { z } from 'zod';

const ReviewResponseBaseSchema = z.object({
  id: z.string(),
  reviewId: z.string(),
  providerId: z.string(),
  responseText: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteReviewResponseOutputSchema = ReviewResponseBaseSchema;


export type DeleteReviewResponseOutput = z.infer<typeof DeleteReviewResponseOutputSchema>;
