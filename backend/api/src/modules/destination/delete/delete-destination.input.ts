import { z } from 'zod';


export const DeleteDestinationInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteDestinationInput = z.infer<typeof DeleteDestinationInputSchema>;
