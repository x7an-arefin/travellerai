import { z } from 'zod';


export const GetBlogPostInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetBlogPostInput = z.infer<typeof GetBlogPostInputSchema>;
