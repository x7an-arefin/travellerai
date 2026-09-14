import { z } from 'zod';


export const GetRatePlanInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetRatePlanInput = z.infer<typeof GetRatePlanInputSchema>;
