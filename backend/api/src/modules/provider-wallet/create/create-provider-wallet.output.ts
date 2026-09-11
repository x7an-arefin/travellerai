import { z } from 'zod';

const ProviderWalletBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  availableBalance: z.string().nullable(),
  currency: z.string(),

});


export const CreateProviderWalletOutputSchema = ProviderWalletBaseSchema;


export type CreateProviderWalletOutput = z.infer<typeof CreateProviderWalletOutputSchema>;
