import { z } from 'zod';

const BlogPostBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']).nullable(),
  publishedAt: z.date().nullable(),

});


export const UpdateBlogPostOutputSchema = BlogPostBaseSchema;


export type UpdateBlogPostOutput = z.infer<typeof UpdateBlogPostOutputSchema>;
