import { z } from 'zod';


export const GetDisputeInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetDisputeInput = z.infer<typeof GetDisputeInputSchema>;
