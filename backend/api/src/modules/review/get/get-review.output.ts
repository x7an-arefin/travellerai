import { z } from 'zod';

const ReviewBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  packageId: z.string(),
  providerId: z.string(),
  travelerId: z.string(),
  overallRating: z.number().int(),
  packageRating: z.number().int().nullable(),
  providerRating: z.number().int().nullable(),
  guideRating: z.number().int().nullable(),
  valueRating: z.number().int().nullable(),
  serviceRating: z.number().int().nullable(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  photos: z.record(z.string(), z.unknown()).nullable(),
  isVerifiedBooking: z.boolean().nullable(),
  status: z.enum(['submitted', 'published', 'flagged', 'hidden', 'rejected']).nullable(),
  publishedAt: z.date().nullable(),

});


export const GetReviewOutputSchema = ReviewBaseSchema;


export type GetReviewOutput = z.infer<typeof GetReviewOutputSchema>;
