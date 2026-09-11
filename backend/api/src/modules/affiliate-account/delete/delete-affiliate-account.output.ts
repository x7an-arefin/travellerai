import { z } from 'zod';

const AffiliateAccountBaseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  referralCode: z.string(),
  commissionRate: z.string(),
  currency: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteAffiliateAccountOutputSchema = AffiliateAccountBaseSchema;


export type DeleteAffiliateAccountOutput = z.infer<typeof DeleteAffiliateAccountOutputSchema>;
