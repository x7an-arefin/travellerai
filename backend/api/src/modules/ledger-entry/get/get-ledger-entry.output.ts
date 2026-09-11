import { z } from 'zod';

const LedgerEntryBaseSchema = z.object({
  id: z.string(),
  entryType: z.enum(['credit', 'debit']).nullable(),
  accountType: z.enum(['customer_payment', 'provider_earning', 'platform_commission', 'service_fee', 'tax', 'gateway_fee', 'coupon_discount', 'wallet_credit', 'refund', 'chargeback', 'withdrawal', 'manual_adjustment']).nullable(),
  referenceType: z.enum(['booking', 'transaction', 'withdrawal', 'refund', 'dispute', 'manual']).nullable(),
  referenceId: z.string(),
  providerId: z.string().nullable(),
  userId: z.string().nullable(),
  amount: z.string(),
  currency: z.string(),
  balanceAfter: z.string().nullable(),
  description: z.string().nullable(),

});


export const GetLedgerEntryOutputSchema = LedgerEntryBaseSchema;


export type GetLedgerEntryOutput = z.infer<typeof GetLedgerEntryOutputSchema>;
