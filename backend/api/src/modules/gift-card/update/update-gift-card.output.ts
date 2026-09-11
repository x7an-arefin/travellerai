import { z } from 'zod';

const GiftCardBaseSchema = z.object({
  id: z.string(),
  currentBalance: z.string(),
  status: z.enum(['active', 'redeemed', 'expired', 'cancelled']).nullable(),

});


export const UpdateGiftCardOutputSchema = GiftCardBaseSchema;


export type UpdateGiftCardOutput = z.infer<typeof UpdateGiftCardOutputSchema>;
