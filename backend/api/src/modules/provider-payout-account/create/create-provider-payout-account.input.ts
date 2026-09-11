import { z } from 'zod';


export const CreateProviderPayoutAccountInputSchema = z.object({
  providerId: z.string().uuid(),
  accountType: z.enum(['bank_account', 'mobile_wallet', 'payment_gateway']).optional().default('bank_account'),
  providerName: z.string().max(150),
  accountNumber: z.string().max(100),
  accountName: z.string().max(200),
  routingNumber: z.string().max(50).optional(),
  bankName: z.string().max(200).optional(),
  branchCode: z.string().max(50).optional(),
  country: z.string().max(100),
  currency: z.string().max(3),
  isDefault: z.boolean().optional().default(false),
  isVerified: z.boolean().optional().default(false),
  status: z.enum(['active', 'inactive', 'pending_verification']).optional().default('pending_verification'),
  deletedAt: z.string().datetime().optional(),

});



export type CreateProviderPayoutAccountInput = z.infer<typeof CreateProviderPayoutAccountInputSchema>;
