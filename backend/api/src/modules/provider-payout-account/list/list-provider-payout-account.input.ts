import { z } from 'zod';


export const ListProviderPayoutAccountInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
  providerId: z.string().optional(),
  status: z.string().optional(),

});


export type ListProviderPayoutAccountInput = z.infer<typeof ListProviderPayoutAccountInputSchema>;
