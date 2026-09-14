import { z } from 'zod';


export const ListVehicleInspectionInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),

});


export type ListVehicleInspectionInput = z.infer<typeof ListVehicleInspectionInputSchema>;
