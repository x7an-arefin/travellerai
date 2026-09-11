import { z } from 'zod';


export const GetWaitlistInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetWaitlistInput = z.infer<typeof GetWaitlistInputSchema>;
