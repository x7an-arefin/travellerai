import { z } from 'zod';


export const DeleteBlogPostInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteBlogPostInput = z.infer<typeof DeleteBlogPostInputSchema>;
