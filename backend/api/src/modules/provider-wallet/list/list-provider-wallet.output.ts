import { z } from 'zod';

const ProviderWalletBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  pendingBalance: z.string().nullable(),
  availableBalance: z.string().nullable(),
  currency: z.string(),

});


export const ListProviderWalletOutputSchema = z.object({
  items: z.array(ProviderWalletBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListProviderWalletOutput = z.infer<typeof ListProviderWalletOutputSchema>;
