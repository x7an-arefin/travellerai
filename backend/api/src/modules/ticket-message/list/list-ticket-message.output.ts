import { z } from 'zod';

const TicketMessageBaseSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  senderType: z.enum(['traveler', 'provider', 'agent', 'system']).nullable(),
  message: z.string(),
  isInternalNote: z.boolean().nullable(),

});


export const ListTicketMessageOutputSchema = z.object({
  items: z.array(TicketMessageBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListTicketMessageOutput = z.infer<typeof ListTicketMessageOutputSchema>;
