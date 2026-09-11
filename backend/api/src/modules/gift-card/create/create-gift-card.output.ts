import { z } from 'zod';

const GiftCardBaseSchema = z.object({
  id: z.string(),
  code: z.string(),
  initialBalance: z.string(),
  currency: z.string(),
  status: z.enum(['active', 'redeemed', 'expired', 'cancelled']).nullable(),

});


export const CreateGiftCardOutputSchema = GiftCardBaseSchema;


export type CreateGiftCardOutput = z.infer<typeof CreateGiftCardOutputSchema>;
