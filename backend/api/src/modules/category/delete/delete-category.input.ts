import { z } from 'zod';


export const DeleteCategoryInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteCategoryInput = z.infer<typeof DeleteCategoryInputSchema>;
