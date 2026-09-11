import { z } from 'zod';


export const DeleteGuideProfileInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteGuideProfileInput = z.infer<typeof DeleteGuideProfileInputSchema>;
