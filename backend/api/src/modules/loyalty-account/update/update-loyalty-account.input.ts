import { z } from 'zod';


export const UpdateLoyaltyAccountInputSchema = z.object({
  userId: z.string().uuid().optional(),
  pointsBalance: z.number().int().optional(),
  lifetimeEarned: z.number().int().optional(),
  lifetimeRedeemed: z.number().int().optional(),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum']).optional(),
  tierUpdatedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateLoyaltyAccountInput = z.infer<typeof UpdateLoyaltyAccountInputSchema>;
