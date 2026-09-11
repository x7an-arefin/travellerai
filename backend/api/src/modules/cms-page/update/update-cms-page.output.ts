import { z } from 'zod';

const CmsPageBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  status: z.enum(['draft', 'published', 'archived']).nullable(),
  publishedAt: z.date().nullable(),

});


export const UpdateCmsPageOutputSchema = CmsPageBaseSchema;


export type UpdateCmsPageOutput = z.infer<typeof UpdateCmsPageOutputSchema>;
