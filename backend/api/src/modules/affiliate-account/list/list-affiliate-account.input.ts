import { z } from 'zod';


export const ListAffiliateAccountInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  status: z.string().optional(),

});


export type ListAffiliateAccountInput = z.infer<typeof ListAffiliateAccountInputSchema>;
