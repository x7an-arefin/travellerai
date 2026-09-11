import { z } from 'zod';


export const GetLoyaltyAccountInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetLoyaltyAccountInput = z.infer<typeof GetLoyaltyAccountInputSchema>;
