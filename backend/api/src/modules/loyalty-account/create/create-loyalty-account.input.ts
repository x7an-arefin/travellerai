import { z } from 'zod';


export const CreateLoyaltyAccountInputSchema = z.object({
  userId: z.string().uuid(),
  pointsBalance: z.number().int().optional().default(0),
  lifetimeEarned: z.number().int().optional().default(0),
  lifetimeRedeemed: z.number().int().optional().default(0),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum']).optional().default('bronze'),
  tierUpdatedAt: z.string().datetime().optional(),

});



export type CreateLoyaltyAccountInput = z.infer<typeof CreateLoyaltyAccountInputSchema>;
