import { z } from 'zod';


export const GetCouponInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetCouponInput = z.infer<typeof GetCouponInputSchema>;
