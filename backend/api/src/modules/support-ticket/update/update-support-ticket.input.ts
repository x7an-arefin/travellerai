import { z } from 'zod';


export const UpdateSupportTicketInputSchema = z.object({
  ticketNumber: z.string().max(20).optional(),
  userId: z.string().uuid().optional(),
  providerId: z.string().uuid().optional(),
  bookingId: z.string().uuid().optional(),
  subject: z.string().max(300).optional(),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  category: z.string().max(100).optional(),
  status: z.enum(['open', 'in_progress', 'awaiting_customer', 'awaiting_provider', 'resolved', 'closed']).optional(),
  assignedAgentId: z.string().uuid().optional(),
  slDeadline: z.string().datetime().optional(),
  resolvedAt: z.string().datetime().optional(),
  satisfactionRating: z.number().int().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateSupportTicketInput = z.infer<typeof UpdateSupportTicketInputSchema>;
