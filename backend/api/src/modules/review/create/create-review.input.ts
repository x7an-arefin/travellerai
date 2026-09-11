import { z } from 'zod';


export const CreateReviewInputSchema = z.object({
  bookingId: z.string().uuid(),
  packageId: z.string().uuid(),
  providerId: z.string().uuid(),
  travelerId: z.string().uuid(),
  overallRating: z.number().int(),
  packageRating: z.number().int().optional(),
  providerRating: z.number().int().optional(),
  guideRating: z.number().int().optional(),
  valueRating: z.number().int().optional(),
  serviceRating: z.number().int().optional(),
  title: z.string().max(300).optional(),
  content: z.string().optional(),
  photos: z.record(z.string(), z.unknown()).optional(),
  isVerifiedBooking: z.boolean().optional().default(true),
  status: z.enum(['submitted', 'published', 'flagged', 'hidden', 'rejected']).optional().default('submitted'),
  moderationNotes: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateReviewInput = z.infer<typeof CreateReviewInputSchema>;
