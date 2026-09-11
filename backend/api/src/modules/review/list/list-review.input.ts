import { z } from 'zod';


export const ListReviewInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  packageId: z.string().optional(),
  providerId: z.string().optional(),
  travelerId: z.string().optional(),
  status: z.string().optional(),

});


export type ListReviewInput = z.infer<typeof ListReviewInputSchema>;
