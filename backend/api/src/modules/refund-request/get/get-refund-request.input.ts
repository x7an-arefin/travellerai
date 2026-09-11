import { z } from 'zod';


export const GetRefundRequestInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetRefundRequestInput = z.infer<typeof GetRefundRequestInputSchema>;
