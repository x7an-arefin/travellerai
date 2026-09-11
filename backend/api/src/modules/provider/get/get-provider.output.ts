import { z } from 'zod';

const ProviderBaseSchema = z.object({
  id: z.string(),
  legalName: z.string(),
  displayName: z.string(),
  slug: z.string(),
  providerType: z.enum(['agency', 'tour_operator', 'guide', 'activity_provider', 'hotel', 'transport_operator', 'dmc', 'experience_host']).nullable(),
  country: z.string(),
  logoUrl: z.string().nullable(),
  coverImage: z.string().nullable(),
  description: z.string().nullable(),
  kycStatus: z.enum(['not_submitted', 'draft', 'submitted', 'under_review', 'info_required', 'approved', 'rejected', 'suspended', 'expired']).nullable(),
  approvalStatus: z.enum(['pending', 'approved', 'rejected', 'suspended']).nullable(),
  rating: z.string().nullable(),
  totalBookings: z.number().int().nullable(),
  verifiedBadge: z.boolean().nullable(),

});


export const GetProviderOutputSchema = ProviderBaseSchema;


export type GetProviderOutput = z.infer<typeof GetProviderOutputSchema>;
