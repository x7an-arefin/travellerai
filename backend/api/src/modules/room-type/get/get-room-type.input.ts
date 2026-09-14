import { z } from 'zod';


export const GetRoomTypeInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetRoomTypeInput = z.infer<typeof GetRoomTypeInputSchema>;
