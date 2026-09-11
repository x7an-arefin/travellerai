import { z } from 'zod';


export const DeleteWaitlistInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteWaitlistInput = z.infer<typeof DeleteWaitlistInputSchema>;
