import { z } from 'zod';

const ProviderBaseSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  slug: z.string(),
  kycStatus: z.enum(['not_submitted', 'draft', 'submitted', 'under_review', 'info_required', 'approved', 'rejected', 'suspended', 'expired']).nullable(),
  approvalStatus: z.enum(['pending', 'approved', 'rejected', 'suspended']).nullable(),

});


export const UpdateProviderOutputSchema = ProviderBaseSchema;


export type UpdateProviderOutput = z.infer<typeof UpdateProviderOutputSchema>;
