import { z } from 'zod';

const LoyaltyAccountBaseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  pointsBalance: z.number().int().nullable(),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum']).nullable(),

});


export const CreateLoyaltyAccountOutputSchema = LoyaltyAccountBaseSchema;


export type CreateLoyaltyAccountOutput = z.infer<typeof CreateLoyaltyAccountOutputSchema>;
