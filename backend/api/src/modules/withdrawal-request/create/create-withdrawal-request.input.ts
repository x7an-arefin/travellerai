import { z } from 'zod';


export const CreateWithdrawalRequestInputSchema = z.object({
  providerId: z.string().uuid(),
  payoutAccountId: z.string().uuid(),
  requestedAmount: z.string().regex(/^\d+(\.\d+)?$/),
  feeAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  netAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'processing', 'paid', 'failed', 'rejected', 'cancelled', 'reversed']).optional().default('draft'),
  payoutMethod: z.string().max(100).optional(),
  transactionReference: z.string().max(200).optional(),
  providerNotes: z.string().optional(),
  adminNotes: z.string().optional(),
  reviewedBy: z.string().uuid().optional(),
  processedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateWithdrawalRequestInput = z.infer<typeof CreateWithdrawalRequestInputSchema>;
