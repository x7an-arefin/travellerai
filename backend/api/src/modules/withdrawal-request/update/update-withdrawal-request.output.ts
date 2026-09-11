import { z } from 'zod';

const WithdrawalRequestBaseSchema = z.object({
  id: z.string(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'processing', 'paid', 'failed', 'rejected', 'cancelled', 'reversed']).nullable(),
  transactionReference: z.string().nullable(),
  adminNotes: z.string().nullable(),
  processedAt: z.date().nullable(),

});


export const UpdateWithdrawalRequestOutputSchema = WithdrawalRequestBaseSchema;


export type UpdateWithdrawalRequestOutput = z.infer<typeof UpdateWithdrawalRequestOutputSchema>;
