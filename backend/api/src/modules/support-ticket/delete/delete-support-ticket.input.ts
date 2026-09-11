import { z } from 'zod';


export const DeleteSupportTicketInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteSupportTicketInput = z.infer<typeof DeleteSupportTicketInputSchema>;
