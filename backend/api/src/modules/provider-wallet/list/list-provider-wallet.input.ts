import { z } from 'zod';


export const ListProviderWalletInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  providerId: z.string().optional(),

});


export type ListProviderWalletInput = z.infer<typeof ListProviderWalletInputSchema>;
