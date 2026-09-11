import { z } from 'zod';

const SupportTicketBaseSchema = z.object({
  id: z.string(),
  ticketNumber: z.string(),
  subject: z.string(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).nullable(),
  status: z.enum(['open', 'in_progress', 'awaiting_customer', 'awaiting_provider', 'resolved', 'closed']).nullable(),

});


export const CreateSupportTicketOutputSchema = SupportTicketBaseSchema;


export type CreateSupportTicketOutput = z.infer<typeof CreateSupportTicketOutputSchema>;
