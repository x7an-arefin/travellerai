import { z } from 'zod';

const GiftCardBaseSchema = z.object({
  id: z.string(),
  code: z.string(),
  initialBalance: z.string(),
  currentBalance: z.string(),
  currency: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteGiftCardOutputSchema = GiftCardBaseSchema;


export type DeleteGiftCardOutput = z.infer<typeof DeleteGiftCardOutputSchema>;
