import { z } from 'zod';


export const UpdateReviewResponseInputSchema = z.object({
  reviewId: z.string().uuid().optional(),
  providerId: z.string().uuid().optional(),
  responseText: z.string().optional(),
  status: z.enum(['published', 'hidden']).optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateReviewResponseInput = z.infer<typeof UpdateReviewResponseInputSchema>;
