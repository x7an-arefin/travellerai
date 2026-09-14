import { z } from 'zod';


export const DeleteRoomTypeInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteRoomTypeInput = z.infer<typeof DeleteRoomTypeInputSchema>;
