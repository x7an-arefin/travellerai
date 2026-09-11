import { z } from 'zod';

const TicketMessageBaseSchema = z.object({
  id: z.string(),
  ticketId: z.string(),
  senderId: z.string(),
  message: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteTicketMessageOutputSchema = TicketMessageBaseSchema;


export type DeleteTicketMessageOutput = z.infer<typeof DeleteTicketMessageOutputSchema>;
