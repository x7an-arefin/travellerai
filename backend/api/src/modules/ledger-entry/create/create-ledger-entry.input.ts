import { z } from 'zod';


export const CreateLedgerEntryInputSchema = z.object({
  entryType: z.enum(['credit', 'debit']).optional().default('credit'),
  accountType: z.enum(['customer_payment', 'provider_earning', 'platform_commission', 'service_fee', 'tax', 'gateway_fee', 'coupon_discount', 'wallet_credit', 'refund', 'chargeback', 'withdrawal', 'manual_adjustment']).optional().default('customer_payment'),
  referenceType: z.enum(['booking', 'transaction', 'withdrawal', 'refund', 'dispute', 'manual']).optional().default('booking'),
  referenceId: z.string().uuid(),
  providerId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  amount: z.string().regex(/^\d+(\.\d+)?$/),
  currency: z.string().max(3),
  balanceAfter: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  description: z.string().max(500).optional(),
  recordedBy: z.string().uuid().optional(),

});



export type CreateLedgerEntryInput = z.infer<typeof CreateLedgerEntryInputSchema>;
