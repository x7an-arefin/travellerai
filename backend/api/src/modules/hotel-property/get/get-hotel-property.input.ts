import { z } from 'zod';


export const GetHotelPropertyInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetHotelPropertyInput = z.infer<typeof GetHotelPropertyInputSchema>;
