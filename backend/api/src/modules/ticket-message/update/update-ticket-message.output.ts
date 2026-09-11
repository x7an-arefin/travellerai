import { z } from 'zod';

const TicketMessageBaseSchema = z.object({
  id: z.string(),
  readAt: z.date().nullable(),

});


export const UpdateTicketMessageOutputSchema = TicketMessageBaseSchema;


export type UpdateTicketMessageOutput = z.infer<typeof UpdateTicketMessageOutputSchema>;
