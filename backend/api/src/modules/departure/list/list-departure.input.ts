import { z } from 'zod';


export const ListDepartureInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(30),
  packageId: z.string().optional(),
  status: z.string().optional(),

});


export type ListDepartureInput = z.infer<typeof ListDepartureInputSchema>;
