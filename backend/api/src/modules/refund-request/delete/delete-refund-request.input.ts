import { z } from 'zod';


export const DeleteRefundRequestInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteRefundRequestInput = z.infer<typeof DeleteRefundRequestInputSchema>;
