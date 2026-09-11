import { z } from 'zod';


export const ListLoyaltyAccountInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  userId: z.string().optional(),
  tier: z.string().optional(),

});


export type ListLoyaltyAccountInput = z.infer<typeof ListLoyaltyAccountInputSchema>;
