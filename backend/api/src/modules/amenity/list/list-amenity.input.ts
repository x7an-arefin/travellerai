import { z } from 'zod';


export const ListAmenityInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(500).optional().default(100),
  category: z.string().optional(),
  status: z.string().optional(),

});


export type ListAmenityInput = z.infer<typeof ListAmenityInputSchema>;
