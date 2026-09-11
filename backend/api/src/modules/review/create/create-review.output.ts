import { z } from 'zod';

const ReviewBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  packageId: z.string(),
  overallRating: z.number().int(),
  status: z.enum(['submitted', 'published', 'flagged', 'hidden', 'rejected']).nullable(),

});


export const CreateReviewOutputSchema = ReviewBaseSchema;


export type CreateReviewOutput = z.infer<typeof CreateReviewOutputSchema>;
