import { z } from 'zod';

const ProviderPayoutAccountBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  accountType: z.enum(['bank_account', 'mobile_wallet', 'payment_gateway']).nullable(),
  providerName: z.string(),
  accountName: z.string(),
  isDefault: z.boolean().nullable(),
  status: z.enum(['active', 'inactive', 'pending_verification']).nullable(),

});


export const CreateProviderPayoutAccountOutputSchema = ProviderPayoutAccountBaseSchema;


export type CreateProviderPayoutAccountOutput = z.infer<typeof CreateProviderPayoutAccountOutputSchema>;
