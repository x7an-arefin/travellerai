import { z } from 'zod';

const WithdrawalRequestBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  payoutAccountId: z.string(),
  requestedAmount: z.string(),
  currency: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteWithdrawalRequestOutputSchema = WithdrawalRequestBaseSchema;


export type DeleteWithdrawalRequestOutput = z.infer<typeof DeleteWithdrawalRequestOutputSchema>;
