import { z } from 'zod';


export const DeleteRoomUnitInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteRoomUnitInput = z.infer<typeof DeleteRoomUnitInputSchema>;
