import { z } from 'zod';


export const GetCmsPageInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetCmsPageInput = z.infer<typeof GetCmsPageInputSchema>;
