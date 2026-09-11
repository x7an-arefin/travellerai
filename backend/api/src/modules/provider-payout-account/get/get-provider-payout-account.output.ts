import { z } from 'zod';

const ProviderPayoutAccountBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  accountType: z.enum(['bank_account', 'mobile_wallet', 'payment_gateway']).nullable(),
  providerName: z.string(),
  accountNumber: z.string(),
  accountName: z.string(),
  bankName: z.string().nullable(),
  country: z.string(),
  currency: z.string(),
  isDefault: z.boolean().nullable(),
  isVerified: z.boolean().nullable(),
  status: z.enum(['active', 'inactive', 'pending_verification']).nullable(),

});


export const GetProviderPayoutAccountOutputSchema = ProviderPayoutAccountBaseSchema;


export type GetProviderPayoutAccountOutput = z.infer<typeof GetProviderPayoutAccountOutputSchema>;
