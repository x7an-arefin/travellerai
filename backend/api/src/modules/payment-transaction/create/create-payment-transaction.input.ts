import { z } from 'zod';


export const CreatePaymentTransactionInputSchema = z.object({
  bookingId: z.string().uuid(),
  gateway: z.enum(['stripe', 'bkash', 'sslcommerz', 'paypal', 'paygov', 'manual_transfer', 'wallet', 'gift_card']).optional().default('stripe'),
  paymentMode: z.enum(['platform_collection', 'direct_provider', 'hybrid']).optional().default('platform_collection'),
  transactionType: z.enum(['full_payment', 'deposit', 'installment', 'balance_payment', 'refund', 'chargeback_reversal']).optional().default('full_payment'),
  transactionReference: z.string().max(200).optional(),
  gatewayTransactionId: z.string().max(200).optional(),
  amount: z.string().regex(/^\d+(\.\d+)?$/),
  currency: z.string().max(3),
  status: z.enum(['pending', 'processing', 'succeeded', 'failed', 'refunded', 'partially_refunded', 'cancelled', 'disputed']).optional().default('pending'),
  failureReason: z.string().max(500).optional(),
  gatewayResponse: z.record(z.string(), z.unknown()).optional(),
  idempotencyKey: z.string().max(100).optional(),
  paidAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreatePaymentTransactionInput = z.infer<typeof CreatePaymentTransactionInputSchema>;
