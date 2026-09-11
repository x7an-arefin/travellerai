import { z } from 'zod';

const CmsPageBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  language: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteCmsPageOutputSchema = CmsPageBaseSchema;


export type DeleteCmsPageOutput = z.infer<typeof DeleteCmsPageOutputSchema>;
