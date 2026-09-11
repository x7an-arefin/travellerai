import { z } from 'zod';

const PackageFaqBaseSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  sortOrder: z.number().int().nullable(),

});


export const UpdatePackageFaqOutputSchema = PackageFaqBaseSchema;


export type UpdatePackageFaqOutput = z.infer<typeof UpdatePackageFaqOutputSchema>;
