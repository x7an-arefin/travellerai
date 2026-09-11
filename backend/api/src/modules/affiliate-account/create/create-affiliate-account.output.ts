import { z } from 'zod';

const AffiliateAccountBaseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  referralCode: z.string(),
  commissionRate: z.string(),
  status: z.enum(['pending', 'active', 'suspended', 'rejected']).nullable(),

});


export const CreateAffiliateAccountOutputSchema = AffiliateAccountBaseSchema;


export type CreateAffiliateAccountOutput = z.infer<typeof CreateAffiliateAccountOutputSchema>;
