import { z } from 'zod';


export const CreateAffiliateAccountInputSchema = z.object({
  userId: z.string().uuid(),
  referralCode: z.string().max(30),
  commissionRate: z.string().regex(/^\d+(\.\d+)?$/),
  totalClicks: z.number().int().optional().default(0),
  totalBookings: z.number().int().optional().default(0),
  totalCommissionEarned: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0'),
  pendingPayout: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0'),
  currency: z.string().max(3),
  status: z.enum(['pending', 'active', 'suspended', 'rejected']).optional().default('pending'),
  deletedAt: z.string().datetime().optional(),

});



export type CreateAffiliateAccountInput = z.infer<typeof CreateAffiliateAccountInputSchema>;
