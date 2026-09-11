import { z } from 'zod';

const SupportTicketBaseSchema = z.object({
  id: z.string(),
  ticketNumber: z.string(),
  userId: z.string().nullable(),
  providerId: z.string().nullable(),
  bookingId: z.string().nullable(),
  subject: z.string(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).nullable(),
  category: z.string().nullable(),
  status: z.enum(['open', 'in_progress', 'awaiting_customer', 'awaiting_provider', 'resolved', 'closed']).nullable(),
  assignedAgentId: z.string().nullable(),
  slDeadline: z.date().nullable(),
  resolvedAt: z.date().nullable(),
  satisfactionRating: z.number().int().nullable(),

});


export const GetSupportTicketOutputSchema = SupportTicketBaseSchema;


export type GetSupportTicketOutput = z.infer<typeof GetSupportTicketOutputSchema>;
