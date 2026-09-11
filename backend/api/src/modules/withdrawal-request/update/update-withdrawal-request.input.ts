import { z } from 'zod';


export const UpdateWithdrawalRequestInputSchema = z.object({
  providerId: z.string().uuid().optional(),
  payoutAccountId: z.string().uuid().optional(),
  requestedAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  feeAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  netAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'processing', 'paid', 'failed', 'rejected', 'cancelled', 'reversed']).optional(),
  payoutMethod: z.string().max(100).optional(),
  transactionReference: z.string().max(200).optional(),
  providerNotes: z.string().optional(),
  adminNotes: z.string().optional(),
  reviewedBy: z.string().uuid().optional(),
  processedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateWithdrawalRequestInput = z.infer<typeof UpdateWithdrawalRequestInputSchema>;
