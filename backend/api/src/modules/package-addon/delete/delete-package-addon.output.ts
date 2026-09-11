import { z } from 'zod';

const PackageAddonBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  title: z.string(),
  price: z.string(),
  currency: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeletePackageAddonOutputSchema = PackageAddonBaseSchema;


export type DeletePackageAddonOutput = z.infer<typeof DeletePackageAddonOutputSchema>;
