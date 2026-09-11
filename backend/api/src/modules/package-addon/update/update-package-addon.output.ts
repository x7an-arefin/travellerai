import { z } from 'zod';

const PackageAddonBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.string(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const UpdatePackageAddonOutputSchema = PackageAddonBaseSchema;


export type UpdatePackageAddonOutput = z.infer<typeof UpdatePackageAddonOutputSchema>;
