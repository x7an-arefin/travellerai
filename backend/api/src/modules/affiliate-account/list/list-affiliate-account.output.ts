import { z } from 'zod';

const AffiliateAccountBaseSchema = z.object({
  id: z.string(),
  referralCode: z.string(),
  totalBookings: z.number().int().nullable(),
  totalCommissionEarned: z.string().nullable(),
  pendingPayout: z.string().nullable(),
  status: z.enum(['pending', 'active', 'suspended', 'rejected']).nullable(),

});


export const ListAffiliateAccountOutputSchema = z.object({
  items: z.array(AffiliateAccountBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListAffiliateAccountOutput = z.infer<typeof ListAffiliateAccountOutputSchema>;
