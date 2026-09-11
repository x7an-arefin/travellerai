import { z } from 'zod';

const GiftCardBaseSchema = z.object({
  id: z.string(),
  code: z.string(),
  initialBalance: z.string(),
  currentBalance: z.string(),
  currency: z.string(),
  expiresAt: z.date().nullable(),
  status: z.enum(['active', 'redeemed', 'expired', 'cancelled']).nullable(),

});


export const ListGiftCardOutputSchema = z.object({
  items: z.array(GiftCardBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListGiftCardOutput = z.infer<typeof ListGiftCardOutputSchema>;
