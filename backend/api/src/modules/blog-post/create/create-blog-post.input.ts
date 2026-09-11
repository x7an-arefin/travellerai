import { z } from 'zod';


export const CreateBlogPostInputSchema = z.object({
  title: z.string().max(300),
  slug: z.string().max(350),
  excerpt: z.string().max(500).optional(),
  content: z.string().optional(),
  featuredImage: z.string().max(500).optional(),
  authorId: z.string().uuid().optional(),
  destinationId: z.string().uuid().optional(),
  categories: z.record(z.string(), z.unknown()).optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']).optional().default('draft'),
  publishedAt: z.string().datetime().optional(),
  scheduledAt: z.string().datetime().optional(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(500).optional(),
  language: z.string().max(10),
  viewCount: z.number().int().optional().default(0),
  deletedAt: z.string().datetime().optional(),

});



export type CreateBlogPostInput = z.infer<typeof CreateBlogPostInputSchema>;
