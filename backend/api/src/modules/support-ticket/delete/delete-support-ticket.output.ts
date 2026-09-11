import { z } from 'zod';

const SupportTicketBaseSchema = z.object({
  id: z.string(),
  ticketNumber: z.string(),
  subject: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteSupportTicketOutputSchema = SupportTicketBaseSchema;


export type DeleteSupportTicketOutput = z.infer<typeof DeleteSupportTicketOutputSchema>;
