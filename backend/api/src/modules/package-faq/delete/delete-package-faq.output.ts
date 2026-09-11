import { z } from 'zod';

const PackageFaqBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  question: z.string(),
  answer: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeletePackageFaqOutputSchema = PackageFaqBaseSchema;


export type DeletePackageFaqOutput = z.infer<typeof DeletePackageFaqOutputSchema>;
