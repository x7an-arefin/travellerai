import { z } from 'zod';


export const DeleteCmsPageInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteCmsPageInput = z.infer<typeof DeleteCmsPageInputSchema>;
