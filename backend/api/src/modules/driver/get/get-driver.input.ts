import { z } from 'zod';


export const GetDriverInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetDriverInput = z.infer<typeof GetDriverInputSchema>;
