import { z } from 'zod';

const TicketMessageBaseSchema = z.object({
  id: z.string(),
  ticketId: z.string(),
  senderId: z.string(),
  senderType: z.enum(['traveler', 'provider', 'agent', 'system']).nullable(),
  isInternalNote: z.boolean().nullable(),

});


export const CreateTicketMessageOutputSchema = TicketMessageBaseSchema;


export type CreateTicketMessageOutput = z.infer<typeof CreateTicketMessageOutputSchema>;
