import { z } from 'zod';

const ReviewResponseBaseSchema = z.object({
  id: z.string(),
  responseText: z.string(),
  status: z.enum(['published', 'hidden']).nullable(),

});


export const UpdateReviewResponseOutputSchema = ReviewResponseBaseSchema;


export type UpdateReviewResponseOutput = z.infer<typeof UpdateReviewResponseOutputSchema>;
