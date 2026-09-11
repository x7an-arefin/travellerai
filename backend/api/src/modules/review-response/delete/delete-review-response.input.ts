import { z } from 'zod';


export const DeleteReviewResponseInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteReviewResponseInput = z.infer<typeof DeleteReviewResponseInputSchema>;
