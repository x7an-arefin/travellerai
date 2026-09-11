import { z } from 'zod';


export const UpdateCmsPageInputSchema = z.object({
  title: z.string().max(300).optional(),
  slug: z.string().max(350).optional(),
  content: z.string().optional(),
  excerpt: z.string().max(500).optional(),
  templateType: z.enum(['static', 'landing', 'destination', 'campaign', 'legal', 'help', 'provider_info']).optional(),
  featuredImage: z.string().max(500).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  publishedAt: z.string().datetime().optional(),
  scheduledAt: z.string().datetime().optional(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(500).optional(),
  canonicalUrl: z.string().max(500).optional(),
  language: z.string().max(10).optional(),
  authorId: z.string().uuid().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateCmsPageInput = z.infer<typeof UpdateCmsPageInputSchema>;
