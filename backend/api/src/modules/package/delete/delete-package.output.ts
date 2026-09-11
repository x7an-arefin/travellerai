import { z } from 'zod';

const PackageBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  title: z.string(),
  slug: z.string(),
  currency: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeletePackageOutputSchema = PackageBaseSchema;


export type DeletePackageOutput = z.infer<typeof DeletePackageOutputSchema>;
