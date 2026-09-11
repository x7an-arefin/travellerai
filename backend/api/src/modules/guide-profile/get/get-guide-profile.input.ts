import { z } from 'zod';


export const GetGuideProfileInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetGuideProfileInput = z.infer<typeof GetGuideProfileInputSchema>;
