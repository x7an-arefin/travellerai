import { z } from 'zod';

const WithdrawalRequestBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  payoutAccountId: z.string(),
  requestedAmount: z.string(),
  feeAmount: z.string().nullable(),
  netAmount: z.string().nullable(),
  currency: z.string(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'processing', 'paid', 'failed', 'rejected', 'cancelled', 'reversed']).nullable(),

});


export const CreateWithdrawalRequestOutputSchema = WithdrawalRequestBaseSchema;


export type CreateWithdrawalRequestOutput = z.infer<typeof CreateWithdrawalRequestOutputSchema>;
