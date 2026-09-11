import { z } from 'zod';


export const DeleteCouponInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteCouponInput = z.infer<typeof DeleteCouponInputSchema>;
