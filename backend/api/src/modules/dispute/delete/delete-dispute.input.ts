import { z } from 'zod';


export const DeleteDisputeInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteDisputeInput = z.infer<typeof DeleteDisputeInputSchema>;
