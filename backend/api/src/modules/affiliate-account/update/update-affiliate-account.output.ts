import { z } from 'zod';

const AffiliateAccountBaseSchema = z.object({
  id: z.string(),
  commissionRate: z.string(),
  status: z.enum(['pending', 'active', 'suspended', 'rejected']).nullable(),

});


export const UpdateAffiliateAccountOutputSchema = AffiliateAccountBaseSchema;


export type UpdateAffiliateAccountOutput = z.infer<typeof UpdateAffiliateAccountOutputSchema>;
