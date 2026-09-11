import { z } from 'zod';

const PackageAddonBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  title: z.string(),
  price: z.string(),
  currency: z.string(),
  pricingType: z.enum(['per_person', 'per_booking']).nullable(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const CreatePackageAddonOutputSchema = PackageAddonBaseSchema;


export type CreatePackageAddonOutput = z.infer<typeof CreatePackageAddonOutputSchema>;
