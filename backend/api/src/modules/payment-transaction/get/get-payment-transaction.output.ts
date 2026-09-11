import { z } from 'zod';

const PaymentTransactionBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  gateway: z.enum(['stripe', 'bkash', 'sslcommerz', 'paypal', 'paygov', 'manual_transfer', 'wallet', 'gift_card']).nullable(),
  paymentMode: z.enum(['platform_collection', 'direct_provider', 'hybrid']).nullable(),
  transactionType: z.enum(['full_payment', 'deposit', 'installment', 'balance_payment', 'refund', 'chargeback_reversal']).nullable(),
  transactionReference: z.string().nullable(),
  amount: z.string(),
  currency: z.string(),
  status: z.enum(['pending', 'processing', 'succeeded', 'failed', 'refunded', 'partially_refunded', 'cancelled', 'disputed']).nullable(),
  failureReason: z.string().nullable(),
  paidAt: z.date().nullable(),

});


export const GetPaymentTransactionOutputSchema = PaymentTransactionBaseSchema;


export type GetPaymentTransactionOutput = z.infer<typeof GetPaymentTransactionOutputSchema>;
