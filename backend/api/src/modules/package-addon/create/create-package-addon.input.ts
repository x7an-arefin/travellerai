import { z } from 'zod';


export const CreatePackageAddonInputSchema = z.object({
  packageId: z.string().uuid(),
  title: z.string().max(200),
  description: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d+)?$/),
  currency: z.string().max(3),
  pricingType: z.enum(['per_person', 'per_booking']).optional().default('per_person'),
  maxQuantity: z.number().int().optional(),
  isRequired: z.boolean().optional().default(false),
  status: z.enum(['active', 'inactive']).optional().default('active'),

});



export type CreatePackageAddonInput = z.infer<typeof CreatePackageAddonInputSchema>;
