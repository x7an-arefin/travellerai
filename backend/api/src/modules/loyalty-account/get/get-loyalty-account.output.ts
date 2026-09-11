import { z } from 'zod';

const LoyaltyAccountBaseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  pointsBalance: z.number().int().nullable(),
  lifetimeEarned: z.number().int().nullable(),
  lifetimeRedeemed: z.number().int().nullable(),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum']).nullable(),
  tierUpdatedAt: z.date().nullable(),

});


export const GetLoyaltyAccountOutputSchema = LoyaltyAccountBaseSchema;


export type GetLoyaltyAccountOutput = z.infer<typeof GetLoyaltyAccountOutputSchema>;
