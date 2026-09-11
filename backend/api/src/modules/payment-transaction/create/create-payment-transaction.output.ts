import { z } from 'zod';

const PaymentTransactionBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  gateway: z.enum(['stripe', 'bkash', 'sslcommerz', 'paypal', 'paygov', 'manual_transfer', 'wallet', 'gift_card']).nullable(),
  transactionType: z.enum(['full_payment', 'deposit', 'installment', 'balance_payment', 'refund', 'chargeback_reversal']).nullable(),
  amount: z.string(),
  currency: z.string(),
  status: z.enum(['pending', 'processing', 'succeeded', 'failed', 'refunded', 'partially_refunded', 'cancelled', 'disputed']).nullable(),

});


export const CreatePaymentTransactionOutputSchema = PaymentTransactionBaseSchema;


export type CreatePaymentTransactionOutput = z.infer<typeof CreatePaymentTransactionOutputSchema>;
