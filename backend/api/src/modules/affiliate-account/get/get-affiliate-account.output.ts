import { z } from 'zod';

const AffiliateAccountBaseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  referralCode: z.string(),
  commissionRate: z.string(),
  totalClicks: z.number().int().nullable(),
  totalBookings: z.number().int().nullable(),
  totalCommissionEarned: z.string().nullable(),
  pendingPayout: z.string().nullable(),
  currency: z.string(),
  status: z.enum(['pending', 'active', 'suspended', 'rejected']).nullable(),

});


export const GetAffiliateAccountOutputSchema = AffiliateAccountBaseSchema;


export type GetAffiliateAccountOutput = z.infer<typeof GetAffiliateAccountOutputSchema>;
