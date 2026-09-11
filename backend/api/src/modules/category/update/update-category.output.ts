import { z } from 'zod';

const CategoryBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  parentId: z.string().nullable(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const UpdateCategoryOutputSchema = CategoryBaseSchema;


export type UpdateCategoryOutput = z.infer<typeof UpdateCategoryOutputSchema>;
