import { z } from 'zod';


export const ListUserInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  role: z.string().optional(),
  status: z.string().optional(),

});


export type ListUserInput = z.infer<typeof ListUserInputSchema>;
