import { z } from 'zod';


export const UpdatePackageAddonInputSchema = z.object({
  packageId: z.string().uuid().optional(),
  title: z.string().max(200).optional(),
  description: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),
  pricingType: z.enum(['per_person', 'per_booking']).optional(),
  maxQuantity: z.number().int().optional(),
  isRequired: z.boolean().optional(),
  status: z.enum(['active', 'inactive']).optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdatePackageAddonInput = z.infer<typeof UpdatePackageAddonInputSchema>;
