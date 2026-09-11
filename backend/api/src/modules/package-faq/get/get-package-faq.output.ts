import { z } from 'zod';

const PackageFaqBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  question: z.string(),
  answer: z.string(),
  sortOrder: z.number().int().nullable(),

});


export const GetPackageFaqOutputSchema = PackageFaqBaseSchema;


export type GetPackageFaqOutput = z.infer<typeof GetPackageFaqOutputSchema>;
