import { z } from 'zod';

const BlogPostBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  language: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteBlogPostOutputSchema = BlogPostBaseSchema;


export type DeleteBlogPostOutput = z.infer<typeof DeleteBlogPostOutputSchema>;
