import { z } from 'zod';


export const CreateReviewResponseInputSchema = z.object({
  reviewId: z.string().uuid(),
  providerId: z.string().uuid(),
  responseText: z.string(),
  status: z.enum(['published', 'hidden']).optional().default('published'),

});



export type CreateReviewResponseInput = z.infer<typeof CreateReviewResponseInputSchema>;
