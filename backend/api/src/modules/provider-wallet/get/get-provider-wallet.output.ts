import { z } from 'zod';

const ProviderWalletBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  pendingBalance: z.string().nullable(),
  availableBalance: z.string().nullable(),
  reservedBalance: z.string().nullable(),
  withdrawnBalance: z.string().nullable(),
  negativeBalance: z.string().nullable(),
  currency: z.string(),

});


export const GetProviderWalletOutputSchema = ProviderWalletBaseSchema;


export type GetProviderWalletOutput = z.infer<typeof GetProviderWalletOutputSchema>;
