import { z } from 'zod';


export const ListRoomUnitInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),

});


export type ListRoomUnitInput = z.infer<typeof ListRoomUnitInputSchema>;
