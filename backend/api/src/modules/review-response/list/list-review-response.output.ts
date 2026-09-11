import { z } from 'zod';

const ReviewResponseBaseSchema = z.object({
  id: z.string(),
  reviewId: z.string(),
  responseText: z.string(),
  status: z.enum(['published', 'hidden']).nullable(),

});


export const ListReviewResponseOutputSchema = z.object({
  items: z.array(ReviewResponseBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListReviewResponseOutput = z.infer<typeof ListReviewResponseOutputSchema>;
