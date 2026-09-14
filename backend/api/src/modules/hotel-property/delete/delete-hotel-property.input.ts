import { z } from 'zod';


export const DeleteHotelPropertyInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteHotelPropertyInput = z.infer<typeof DeleteHotelPropertyInputSchema>;
