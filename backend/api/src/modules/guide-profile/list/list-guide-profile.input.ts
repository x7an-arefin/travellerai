import { z } from 'zod';


export const ListGuideProfileInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  providerId: z.string().optional(),
  isAvailable: z.string().optional(),
  status: z.string().optional(),

});


export type ListGuideProfileInput = z.infer<typeof ListGuideProfileInputSchema>;
