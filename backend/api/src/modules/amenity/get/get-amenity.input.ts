import { z } from 'zod';


export const GetAmenityInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetAmenityInput = z.infer<typeof GetAmenityInputSchema>;
