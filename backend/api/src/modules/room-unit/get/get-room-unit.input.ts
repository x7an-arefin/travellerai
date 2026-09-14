import { z } from 'zod';


export const GetRoomUnitInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetRoomUnitInput = z.infer<typeof GetRoomUnitInputSchema>;
