import { z } from 'zod';


export const UpdateReviewInputSchema = z.object({
  bookingId: z.string().uuid().optional(),
  packageId: z.string().uuid().optional(),
  providerId: z.string().uuid().optional(),
  travelerId: z.string().uuid().optional(),
  overallRating: z.number().int().optional(),
  packageRating: z.number().int().optional(),
  providerRating: z.number().int().optional(),
  guideRating: z.number().int().optional(),
  valueRating: z.number().int().optional(),
  serviceRating: z.number().int().optional(),
  title: z.string().max(300).optional(),
  content: z.string().optional(),
  photos: z.record(z.string(), z.unknown()).optional(),
  isVerifiedBooking: z.boolean().optional(),
  status: z.enum(['submitted', 'published', 'flagged', 'hidden', 'rejected']).optional(),
  moderationNotes: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateReviewInput = z.infer<typeof UpdateReviewInputSchema>;
