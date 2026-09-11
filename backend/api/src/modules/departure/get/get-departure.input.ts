import { z } from 'zod';


export const GetDepartureInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetDepartureInput = z.infer<typeof GetDepartureInputSchema>;
