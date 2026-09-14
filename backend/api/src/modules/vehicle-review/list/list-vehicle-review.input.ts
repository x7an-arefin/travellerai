import { z } from 'zod';


export const ListVehicleReviewInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),

});


export type ListVehicleReviewInput = z.infer<typeof ListVehicleReviewInputSchema>;
