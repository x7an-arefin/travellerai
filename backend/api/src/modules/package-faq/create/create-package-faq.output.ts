import { z } from 'zod';

const PackageFaqBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  question: z.string(),
  sortOrder: z.number().int().nullable(),

});


export const CreatePackageFaqOutputSchema = PackageFaqBaseSchema;


export type CreatePackageFaqOutput = z.infer<typeof CreatePackageFaqOutputSchema>;
