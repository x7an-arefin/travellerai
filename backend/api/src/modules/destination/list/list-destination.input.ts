import { z } from 'zod';


export const ListDestinationInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(24),
  country: z.string().optional(),
  status: z.string().optional(),
  isFeatured: z.string().optional(),

});


export type ListDestinationInput = z.infer<typeof ListDestinationInputSchema>;
