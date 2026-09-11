import { z } from 'zod';

const PackageFaqBaseSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  sortOrder: z.number().int().nullable(),

});


export const ListPackageFaqOutputSchema = z.object({
  items: z.array(PackageFaqBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListPackageFaqOutput = z.infer<typeof ListPackageFaqOutputSchema>;
