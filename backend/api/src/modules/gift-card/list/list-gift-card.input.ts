import { z } from 'zod';


export const ListGiftCardInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  purchaserId: z.string().optional(),
  status: z.string().optional(),

});


export type ListGiftCardInput = z.infer<typeof ListGiftCardInputSchema>;
