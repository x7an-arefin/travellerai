import { z } from 'zod';

const CategoryBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteCategoryOutputSchema = CategoryBaseSchema;


export type DeleteCategoryOutput = z.infer<typeof DeleteCategoryOutputSchema>;
