import { z } from 'zod';


export const GetCategoryInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetCategoryInput = z.infer<typeof GetCategoryInputSchema>;
