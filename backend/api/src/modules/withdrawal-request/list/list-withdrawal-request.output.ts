import { z } from 'zod';

const WithdrawalRequestBaseSchema = z.object({
  id: z.string(),
  requestedAmount: z.string(),
  feeAmount: z.string().nullable(),
  netAmount: z.string().nullable(),
  currency: z.string(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'processing', 'paid', 'failed', 'rejected', 'cancelled', 'reversed']).nullable(),

});


export const ListWithdrawalRequestOutputSchema = z.object({
  items: z.array(WithdrawalRequestBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListWithdrawalRequestOutput = z.infer<typeof ListWithdrawalRequestOutputSchema>;
