import { z } from 'zod';


export const ListCustomerWalletInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  userId: z.string().optional(),
  status: z.string().optional(),

});


export type ListCustomerWalletInput = z.infer<typeof ListCustomerWalletInputSchema>;
