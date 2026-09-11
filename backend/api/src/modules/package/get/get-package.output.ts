import { z } from 'zod';

const PackageBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  categoryId: z.string().nullable(),
  destinationId: z.string().nullable(),
  title: z.string(),
  slug: z.string(),
  shortDescription: z.string().nullable(),
  description: z.string().nullable(),
  productType: z.enum(['fixed_tour', 'flexible_tour', 'private_tour', 'group_tour', 'activity', 'day_trip', 'multi_day_package', 'guided_city_tour', 'adventure_experience', 'cruise_boat', 'transfer_service', 'transport_rental', 'accommodation_package', 'custom_trip', 'event_package', 'ticket_pass', 'travel_product', 'package_addon']).nullable(),
  durationHours: z.number().int().nullable(),
  durationDays: z.number().int().nullable(),
  minParticipants: z.number().int().nullable(),
  maxParticipants: z.number().int().nullable(),
  difficultyLevel: z.enum(['easy', 'moderate', 'challenging', 'extreme']).nullable(),
  confirmationType: z.enum(['instant', 'request_to_book']).nullable(),
  cancellationPolicy: z.enum(['flexible', 'moderate', 'strict', 'non_refundable']).nullable(),
  basePrice: z.string().nullable(),
  currency: z.string(),
  featuredImage: z.string().nullable(),
  gallery: z.record(z.string(), z.unknown()).nullable(),
  inclusions: z.record(z.string(), z.unknown()).nullable(),
  exclusions: z.record(z.string(), z.unknown()).nullable(),
  amenities: z.record(z.string(), z.unknown()).nullable(),
  isFeatured: z.boolean().nullable(),
  rating: z.string().nullable(),
  reviewCount: z.number().int().nullable(),
  status: z.enum(['draft', 'submitted', 'approved', 'published', 'unpublished', 'rejected', 'archived', 'suspended', 'expired']).nullable(),

});


export const GetPackageOutputSchema = PackageBaseSchema;


export type GetPackageOutput = z.infer<typeof GetPackageOutputSchema>;
