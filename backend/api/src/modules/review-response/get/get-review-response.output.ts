import { z } from 'zod';

const ReviewResponseBaseSchema = z.object({
  id: z.string(),
  reviewId: z.string(),
  providerId: z.string(),
  responseText: z.string(),
  status: z.enum(['published', 'hidden']).nullable(),

});


export const GetReviewResponseOutputSchema = ReviewResponseBaseSchema;


export type GetReviewResponseOutput = z.infer<typeof GetReviewResponseOutputSchema>;
