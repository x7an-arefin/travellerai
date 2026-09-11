import { z } from 'zod';

const ReviewResponseBaseSchema = z.object({
  id: z.string(),
  reviewId: z.string(),
  providerId: z.string(),
  status: z.enum(['published', 'hidden']).nullable(),

});


export const CreateReviewResponseOutputSchema = ReviewResponseBaseSchema;


export type CreateReviewResponseOutput = z.infer<typeof CreateReviewResponseOutputSchema>;
