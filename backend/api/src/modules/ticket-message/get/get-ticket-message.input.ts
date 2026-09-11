import { z } from 'zod';


export const GetTicketMessageInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetTicketMessageInput = z.infer<typeof GetTicketMessageInputSchema>;
