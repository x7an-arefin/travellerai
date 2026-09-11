import { z } from 'zod';


export const UpdateProviderPayoutAccountInputSchema = z.object({
  providerId: z.string().uuid().optional(),
  accountType: z.enum(['bank_account', 'mobile_wallet', 'payment_gateway']).optional(),
  providerName: z.string().max(150).optional(),
  accountNumber: z.string().max(100).optional(),
  accountName: z.string().max(200).optional(),
  routingNumber: z.string().max(50).optional(),
  bankName: z.string().max(200).optional(),
  branchCode: z.string().max(50).optional(),
  country: z.string().max(100).optional(),
  currency: z.string().max(3).optional(),
  isDefault: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  status: z.enum(['active', 'inactive', 'pending_verification']).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateProviderPayoutAccountInput = z.infer<typeof UpdateProviderPayoutAccountInputSchema>;
