import { z } from 'zod';


export const DeleteAffiliateAccountInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteAffiliateAccountInput = z.infer<typeof DeleteAffiliateAccountInputSchema>;
