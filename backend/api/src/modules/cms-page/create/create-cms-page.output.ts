import { z } from 'zod';

const CmsPageBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  templateType: z.enum(['static', 'landing', 'destination', 'campaign', 'legal', 'help', 'provider_info']).nullable(),
  status: z.enum(['draft', 'published', 'archived']).nullable(),

});


export const CreateCmsPageOutputSchema = CmsPageBaseSchema;


export type CreateCmsPageOutput = z.infer<typeof CreateCmsPageOutputSchema>;
