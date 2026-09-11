import { z } from 'zod';


export const ListReviewResponseInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  reviewId: z.string().optional(),
  providerId: z.string().optional(),
  status: z.string().optional(),

});


export type ListReviewResponseInput = z.infer<typeof ListReviewResponseInputSchema>;
