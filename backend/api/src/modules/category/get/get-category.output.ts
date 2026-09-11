import { z } from 'zod';

const CategoryBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  parentId: z.string().nullable(),
  icon: z.string().nullable(),
  coverImage: z.string().nullable(),
  description: z.string().nullable(),
  sortOrder: z.number().int().nullable(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const GetCategoryOutputSchema = CategoryBaseSchema;


export type GetCategoryOutput = z.infer<typeof GetCategoryOutputSchema>;
