import { z } from 'zod';

const ProviderBaseSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  slug: z.string(),
  providerType: z.enum(['agency', 'tour_operator', 'guide', 'activity_provider', 'hotel', 'transport_operator', 'dmc', 'experience_host']).nullable(),
  country: z.string(),
  logoUrl: z.string().nullable(),
  approvalStatus: z.enum(['pending', 'approved', 'rejected', 'suspended']).nullable(),
  rating: z.string().nullable(),
  verifiedBadge: z.boolean().nullable(),

});


export const ListProviderOutputSchema = z.object({
  items: z.array(ProviderBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListProviderOutput = z.infer<typeof ListProviderOutputSchema>;
