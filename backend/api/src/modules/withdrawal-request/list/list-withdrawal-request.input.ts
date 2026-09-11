import { z } from 'zod';


export const ListWithdrawalRequestInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  providerId: z.string().optional(),
  status: z.string().optional(),

});


export type ListWithdrawalRequestInput = z.infer<typeof ListWithdrawalRequestInputSchema>;
