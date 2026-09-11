import { z } from 'zod';


export const GetSupportTicketInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetSupportTicketInput = z.infer<typeof GetSupportTicketInputSchema>;
