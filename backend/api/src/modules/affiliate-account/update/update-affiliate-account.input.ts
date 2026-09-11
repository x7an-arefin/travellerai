import { z } from 'zod';


export const UpdateAffiliateAccountInputSchema = z.object({
  userId: z.string().uuid().optional(),
  referralCode: z.string().max(30).optional(),
  commissionRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  totalClicks: z.number().int().optional(),
  totalBookings: z.number().int().optional(),
  totalCommissionEarned: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  pendingPayout: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),
  status: z.enum(['pending', 'active', 'suspended', 'rejected']).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateAffiliateAccountInput = z.infer<typeof UpdateAffiliateAccountInputSchema>;
