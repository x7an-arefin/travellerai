import { z } from 'zod';


export const DeleteRatePlanInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteRatePlanInput = z.infer<typeof DeleteRatePlanInputSchema>;
