import { z } from 'zod';

const BlogPostBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  featuredImage: z.string().nullable(),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']).nullable(),
  publishedAt: z.date().nullable(),

});


export const ListBlogPostOutputSchema = z.object({
  items: z.array(BlogPostBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListBlogPostOutput = z.infer<typeof ListBlogPostOutputSchema>;
