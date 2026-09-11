import { z } from 'zod';


export const DeleteDepartureInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteDepartureInput = z.infer<typeof DeleteDepartureInputSchema>;
