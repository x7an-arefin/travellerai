import { z } from 'zod';


export const GetReviewResponseInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetReviewResponseInput = z.infer<typeof GetReviewResponseInputSchema>;
