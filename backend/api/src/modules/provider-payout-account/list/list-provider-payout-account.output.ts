import { z } from 'zod';

const ProviderPayoutAccountBaseSchema = z.object({
  id: z.string(),
  accountType: z.enum(['bank_account', 'mobile_wallet', 'payment_gateway']).nullable(),
  providerName: z.string(),
  accountName: z.string(),
  isDefault: z.boolean().nullable(),
  isVerified: z.boolean().nullable(),
  status: z.enum(['active', 'inactive', 'pending_verification']).nullable(),

});


export const ListProviderPayoutAccountOutputSchema = z.object({
  items: z.array(ProviderPayoutAccountBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListProviderPayoutAccountOutput = z.infer<typeof ListProviderPayoutAccountOutputSchema>;
