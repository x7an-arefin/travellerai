import { z } from 'zod';


export const ListRatePlanInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),

});


export type ListRatePlanInput = z.infer<typeof ListRatePlanInputSchema>;
