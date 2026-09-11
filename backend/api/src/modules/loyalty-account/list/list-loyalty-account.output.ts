import { z } from 'zod';

const LoyaltyAccountBaseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  pointsBalance: z.number().int().nullable(),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum']).nullable(),

});


export const ListLoyaltyAccountOutputSchema = z.object({
  items: z.array(LoyaltyAccountBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListLoyaltyAccountOutput = z.infer<typeof ListLoyaltyAccountOutputSchema>;
