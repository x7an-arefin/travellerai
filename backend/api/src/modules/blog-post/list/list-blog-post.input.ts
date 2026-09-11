import { z } from 'zod';


export const ListBlogPostInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  status: z.string().optional(),
  destinationId: z.string().optional(),
  authorId: z.string().optional(),
  language: z.string().optional(),

});


export type ListBlogPostInput = z.infer<typeof ListBlogPostInputSchema>;
