import { z } from 'zod';


export const ListItineraryItemInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(500).optional().default(100),
  packageId: z.string().optional(),

});


export type ListItineraryItemInput = z.infer<typeof ListItineraryItemInputSchema>;
