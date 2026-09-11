import { z } from 'zod';

const CmsPageBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  templateType: z.enum(['static', 'landing', 'destination', 'campaign', 'legal', 'help', 'provider_info']).nullable(),
  status: z.enum(['draft', 'published', 'archived']).nullable(),
  publishedAt: z.date().nullable(),

});


export const ListCmsPageOutputSchema = z.object({
  items: z.array(CmsPageBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListCmsPageOutput = z.infer<typeof ListCmsPageOutputSchema>;
