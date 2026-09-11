import { z } from 'zod';


export const GetAffiliateAccountInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetAffiliateAccountInput = z.infer<typeof GetAffiliateAccountInputSchema>;
