import { z } from 'zod';


export const GetReviewInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetReviewInput = z.infer<typeof GetReviewInputSchema>;
