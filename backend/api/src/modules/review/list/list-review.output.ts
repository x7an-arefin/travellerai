import { z } from 'zod';

const ReviewBaseSchema = z.object({
  id: z.string(),
  travelerId: z.string(),
  overallRating: z.number().int(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  photos: z.record(z.string(), z.unknown()).nullable(),
  isVerifiedBooking: z.boolean().nullable(),
  status: z.enum(['submitted', 'published', 'flagged', 'hidden', 'rejected']).nullable(),
  publishedAt: z.date().nullable(),

});


export const ListReviewOutputSchema = z.object({
  items: z.array(ReviewBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListReviewOutput = z.infer<typeof ListReviewOutputSchema>;
