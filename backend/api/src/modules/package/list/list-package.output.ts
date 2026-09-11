import { z } from 'zod';

const PackageBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  productType: z.enum(['fixed_tour', 'flexible_tour', 'private_tour', 'group_tour', 'activity', 'day_trip', 'multi_day_package', 'guided_city_tour', 'adventure_experience', 'cruise_boat', 'transfer_service', 'transport_rental', 'accommodation_package', 'custom_trip', 'event_package', 'ticket_pass', 'travel_product', 'package_addon']).nullable(),
  basePrice: z.string().nullable(),
  currency: z.string(),
  featuredImage: z.string().nullable(),
  isFeatured: z.boolean().nullable(),
  rating: z.string().nullable(),
  reviewCount: z.number().int().nullable(),
  status: z.enum(['draft', 'submitted', 'approved', 'published', 'unpublished', 'rejected', 'archived', 'suspended', 'expired']).nullable(),

});


export const ListPackageOutputSchema = z.object({
  items: z.array(PackageBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListPackageOutput = z.infer<typeof ListPackageOutputSchema>;
