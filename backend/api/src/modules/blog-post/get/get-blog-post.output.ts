import { z } from 'zod';

const BlogPostBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  content: z.string().nullable(),
  featuredImage: z.string().nullable(),
  authorId: z.string().nullable(),
  destinationId: z.string().nullable(),
  categories: z.record(z.string(), z.unknown()).nullable(),
  tags: z.record(z.string(), z.unknown()).nullable(),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']).nullable(),
  publishedAt: z.date().nullable(),
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),

});


export const GetBlogPostOutputSchema = BlogPostBaseSchema;


export type GetBlogPostOutput = z.infer<typeof GetBlogPostOutputSchema>;
