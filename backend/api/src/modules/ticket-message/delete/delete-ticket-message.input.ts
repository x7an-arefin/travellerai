import { z } from 'zod';


export const DeleteTicketMessageInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteTicketMessageInput = z.infer<typeof DeleteTicketMessageInputSchema>;
