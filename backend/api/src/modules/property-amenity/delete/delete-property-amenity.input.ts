import { z } from 'zod';


export const DeletePropertyAmenityInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeletePropertyAmenityInput = z.infer<typeof DeletePropertyAmenityInputSchema>;
