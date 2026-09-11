import { z } from 'zod';


export const ListCouponInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  status: z.string().optional(),
  discountType: z.string().optional(),
  providerId: z.string().optional(),

});


export type ListCouponInput = z.infer<typeof ListCouponInputSchema>;
