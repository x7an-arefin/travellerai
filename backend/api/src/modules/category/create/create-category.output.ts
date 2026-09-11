import { z } from 'zod';

const CategoryBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  parentId: z.string().nullable(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const CreateCategoryOutputSchema = CategoryBaseSchema;


export type CreateCategoryOutput = z.infer<typeof CreateCategoryOutputSchema>;
