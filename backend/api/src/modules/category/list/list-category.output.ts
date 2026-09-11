import { z } from 'zod';

const CategoryBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  parentId: z.string().nullable(),
  icon: z.string().nullable(),
  sortOrder: z.number().int().nullable(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const ListCategoryOutputSchema = z.object({
  items: z.array(CategoryBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListCategoryOutput = z.infer<typeof ListCategoryOutputSchema>;
