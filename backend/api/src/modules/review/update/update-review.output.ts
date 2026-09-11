import { z } from 'zod';

const ReviewBaseSchema = z.object({
  id: z.string(),
  status: z.enum(['submitted', 'published', 'flagged', 'hidden', 'rejected']).nullable(),
  publishedAt: z.date().nullable(),

});


export const UpdateReviewOutputSchema = ReviewBaseSchema;


export type UpdateReviewOutput = z.infer<typeof UpdateReviewOutputSchema>;
