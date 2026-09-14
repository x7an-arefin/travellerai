import { z } from 'zod';


export const GetPropertyAmenityInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetPropertyAmenityInput = z.infer<typeof GetPropertyAmenityInputSchema>;
