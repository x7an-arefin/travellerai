import { z } from 'zod';


export const ListTicketMessageInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  ticketId: z.string().optional(),
  isInternalNote: z.string().optional(),

});


export type ListTicketMessageInput = z.infer<typeof ListTicketMessageInputSchema>;
