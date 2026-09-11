import { z } from 'zod';

const GiftCardBaseSchema = z.object({
  id: z.string(),
  code: z.string(),
  initialBalance: z.string(),
  currentBalance: z.string(),
  currency: z.string(),
  recipientEmail: z.string().nullable(),
  expiresAt: z.date().nullable(),
  status: z.enum(['active', 'redeemed', 'expired', 'cancelled']).nullable(),

});


export const GetGiftCardOutputSchema = GiftCardBaseSchema;


export type GetGiftCardOutput = z.infer<typeof GetGiftCardOutputSchema>;
