import { z } from 'zod';

const PackageAddonBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.string(),
  currency: z.string(),
  pricingType: z.enum(['per_person', 'per_booking']).nullable(),
  isRequired: z.boolean().nullable(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const ListPackageAddonOutputSchema = z.object({
  items: z.array(PackageAddonBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListPackageAddonOutput = z.infer<typeof ListPackageAddonOutputSchema>;
