import { z } from 'zod';


export const GetGiftCardInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetGiftCardInput = z.infer<typeof GetGiftCardInputSchema>;
