import { z } from 'zod';

const PackageAddonBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  price: z.string(),
  currency: z.string(),
  pricingType: z.enum(['per_person', 'per_booking']).nullable(),
  maxQuantity: z.number().int().nullable(),
  isRequired: z.boolean().nullable(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const GetPackageAddonOutputSchema = PackageAddonBaseSchema;


export type GetPackageAddonOutput = z.infer<typeof GetPackageAddonOutputSchema>;
