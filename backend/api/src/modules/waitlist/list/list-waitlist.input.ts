import { z } from 'zod';


export const ListWaitlistInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  departureId: z.string().optional(),
  status: z.string().optional(),

});


export type ListWaitlistInput = z.infer<typeof ListWaitlistInputSchema>;
