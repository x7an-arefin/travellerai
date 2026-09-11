import { z } from 'zod';

const ProviderPayoutAccountBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  providerName: z.string(),
  accountNumber: z.string(),
  accountName: z.string(),
  country: z.string(),
  currency: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteProviderPayoutAccountOutputSchema = ProviderPayoutAccountBaseSchema;


export type DeleteProviderPayoutAccountOutput = z.infer<typeof DeleteProviderPayoutAccountOutputSchema>;
