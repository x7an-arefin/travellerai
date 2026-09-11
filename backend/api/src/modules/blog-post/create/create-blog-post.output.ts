import { z } from 'zod';

const BlogPostBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']).nullable(),

});


export const CreateBlogPostOutputSchema = BlogPostBaseSchema;


export type CreateBlogPostOutput = z.infer<typeof CreateBlogPostOutputSchema>;
