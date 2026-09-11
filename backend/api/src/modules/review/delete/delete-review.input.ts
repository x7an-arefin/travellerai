import { z } from 'zod';


export const DeleteReviewInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteReviewInput = z.infer<typeof DeleteReviewInputSchema>;
