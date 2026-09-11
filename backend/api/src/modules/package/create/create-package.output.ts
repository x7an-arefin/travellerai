import { z } from 'zod';

const PackageBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  title: z.string(),
  slug: z.string(),
  productType: z.enum(['fixed_tour', 'flexible_tour', 'private_tour', 'group_tour', 'activity', 'day_trip', 'multi_day_package', 'guided_city_tour', 'adventure_experience', 'cruise_boat', 'transfer_service', 'transport_rental', 'accommodation_package', 'custom_trip', 'event_package', 'ticket_pass', 'travel_product', 'package_addon']).nullable(),
  status: z.enum(['draft', 'submitted', 'approved', 'published', 'unpublished', 'rejected', 'archived', 'suspended', 'expired']).nullable(),

});


export const CreatePackageOutputSchema = PackageBaseSchema;


export type CreatePackageOutput = z.infer<typeof CreatePackageOutputSchema>;
