import { z } from 'zod';

const ProviderPayoutAccountBaseSchema = z.object({
  id: z.string(),
  accountName: z.string(),
  isDefault: z.boolean().nullable(),
  status: z.enum(['active', 'inactive', 'pending_verification']).nullable(),

});


export const UpdateProviderPayoutAccountOutputSchema = ProviderPayoutAccountBaseSchema;


export type UpdateProviderPayoutAccountOutput = z.infer<typeof UpdateProviderPayoutAccountOutputSchema>;
