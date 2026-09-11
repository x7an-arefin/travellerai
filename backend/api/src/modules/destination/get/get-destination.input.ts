import { z } from 'zod';


export const GetDestinationInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetDestinationInput = z.infer<typeof GetDestinationInputSchema>;
