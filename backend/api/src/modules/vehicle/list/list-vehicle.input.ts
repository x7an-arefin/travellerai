import { z } from 'zod';


export const ListVehicleInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),

});


export type ListVehicleInput = z.infer<typeof ListVehicleInputSchema>;
