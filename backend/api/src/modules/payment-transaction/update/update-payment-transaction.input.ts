import { z } from 'zod';


export const UpdatePaymentTransactionInputSchema = z.object({
  bookingId: z.string().uuid().optional(),
  gateway: z.enum(['stripe', 'bkash', 'sslcommerz', 'paypal', 'paygov', 'manual_transfer', 'wallet', 'gift_card']).optional(),
  paymentMode: z.enum(['platform_collection', 'direct_provider', 'hybrid']).optional(),
  transactionType: z.enum(['full_payment', 'deposit', 'installment', 'balance_payment', 'refund', 'chargeback_reversal']).optional(),
  transactionReference: z.string().max(200).optional(),
  gatewayTransactionId: z.string().max(200).optional(),
  amount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),
  status: z.enum(['pending', 'processing', 'succeeded', 'failed', 'refunded', 'partially_refunded', 'cancelled', 'disputed']).optional(),
  failureReason: z.string().max(500).optional(),
  gatewayResponse: z.record(z.string(), z.unknown()).optional(),
  idempotencyKey: z.string().max(100).optional(),
  paidAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdatePaymentTransactionInput = z.infer<typeof UpdatePaymentTransactionInputSchema>;
