import { z } from 'zod';


export const DeleteGiftCardInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteGiftCardInput = z.infer<typeof DeleteGiftCardInputSchema>;
