import { z } from 'zod';


export const CreateCmsPageInputSchema = z.object({
  title: z.string().max(300),
  slug: z.string().max(350),
  content: z.string().optional(),
  excerpt: z.string().max(500).optional(),
  templateType: z.enum(['static', 'landing', 'destination', 'campaign', 'legal', 'help', 'provider_info']).optional().default('static'),
  featuredImage: z.string().max(500).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional().default('draft'),
  publishedAt: z.string().datetime().optional(),
  scheduledAt: z.string().datetime().optional(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(500).optional(),
  canonicalUrl: z.string().max(500).optional(),
  language: z.string().max(10),
  authorId: z.string().uuid().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateCmsPageInput = z.infer<typeof CreateCmsPageInputSchema>;
