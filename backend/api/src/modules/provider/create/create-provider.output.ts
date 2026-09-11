import { z } from 'zod';

const ProviderBaseSchema = z.object({
  id: z.string(),
  legalName: z.string(),
  displayName: z.string(),
  slug: z.string(),
  providerType: z.enum(['agency', 'tour_operator', 'guide', 'activity_provider', 'hotel', 'transport_operator', 'dmc', 'experience_host']).nullable(),
  kycStatus: z.enum(['not_submitted', 'draft', 'submitted', 'under_review', 'info_required', 'approved', 'rejected', 'suspended', 'expired']).nullable(),
  approvalStatus: z.enum(['pending', 'approved', 'rejected', 'suspended']).nullable(),

});


export const CreateProviderOutputSchema = ProviderBaseSchema;


export type CreateProviderOutput = z.infer<typeof CreateProviderOutputSchema>;
