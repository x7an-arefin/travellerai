import { z } from 'zod';

const TicketMessageBaseSchema = z.object({
  id: z.string(),
  ticketId: z.string(),
  senderId: z.string(),
  senderType: z.enum(['traveler', 'provider', 'agent', 'system']).nullable(),
  message: z.string(),
  attachments: z.record(z.string(), z.unknown()).nullable(),
  isInternalNote: z.boolean().nullable(),
  readAt: z.date().nullable(),

});


export const GetTicketMessageOutputSchema = TicketMessageBaseSchema;


export type GetTicketMessageOutput = z.infer<typeof GetTicketMessageOutputSchema>;
