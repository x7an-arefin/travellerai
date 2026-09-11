import { z } from 'zod';

const ProviderWalletBaseSchema = z.object({
  id: z.string(),
  pendingBalance: z.string().nullable(),
  availableBalance: z.string().nullable(),
  reservedBalance: z.string().nullable(),
  withdrawnBalance: z.string().nullable(),
  negativeBalance: z.string().nullable(),

});


export const UpdateProviderWalletOutputSchema = ProviderWalletBaseSchema;


export type UpdateProviderWalletOutput = z.infer<typeof UpdateProviderWalletOutputSchema>;
