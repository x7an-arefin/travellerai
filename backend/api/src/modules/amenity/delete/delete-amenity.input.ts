import { z } from 'zod';


export const DeleteAmenityInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteAmenityInput = z.infer<typeof DeleteAmenityInputSchema>;
