import { z } from 'zod';

const CmsPageBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string().nullable(),
  templateType: z.enum(['static', 'landing', 'destination', 'campaign', 'legal', 'help', 'provider_info']).nullable(),
  featuredImage: z.string().nullable(),
  status: z.enum(['draft', 'published', 'archived']).nullable(),
  publishedAt: z.date().nullable(),
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),

});


export const GetCmsPageOutputSchema = CmsPageBaseSchema;


export type GetCmsPageOutput = z.infer<typeof GetCmsPageOutputSchema>;
