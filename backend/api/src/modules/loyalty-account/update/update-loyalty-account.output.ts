import { z } from 'zod';

const LoyaltyAccountBaseSchema = z.object({
  id: z.string(),
  pointsBalance: z.number().int().nullable(),
  lifetimeEarned: z.number().int().nullable(),
  lifetimeRedeemed: z.number().int().nullable(),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum']).nullable(),

});


export const UpdateLoyaltyAccountOutputSchema = LoyaltyAccountBaseSchema;


export type UpdateLoyaltyAccountOutput = z.infer<typeof UpdateLoyaltyAccountOutputSchema>;
