import { z } from 'zod';

const PaymentTransactionBaseSchema = z.object({
  id: z.string(),
  transactionReference: z.string().nullable(),
  status: z.enum(['pending', 'processing', 'succeeded', 'failed', 'refunded', 'partially_refunded', 'cancelled', 'disputed']).nullable(),
  paidAt: z.date().nullable(),

});


export const UpdatePaymentTransactionOutputSchema = PaymentTransactionBaseSchema;


export type UpdatePaymentTransactionOutput = z.infer<typeof UpdatePaymentTransactionOutputSchema>;
