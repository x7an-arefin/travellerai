import { z } from 'zod';


export const DeleteDriverInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteDriverInput = z.infer<typeof DeleteDriverInputSchema>;
