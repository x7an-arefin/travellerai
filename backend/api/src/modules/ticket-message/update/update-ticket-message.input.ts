import { z } from 'zod';


export const UpdateTicketMessageInputSchema = z.object({
  ticketId: z.string().uuid().optional(),
  senderId: z.string().uuid().optional(),
  senderType: z.enum(['traveler', 'provider', 'agent', 'system']).optional(),
  message: z.string().optional(),
  attachments: z.record(z.string(), z.unknown()).optional(),
  isInternalNote: z.boolean().optional(),
  readAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateTicketMessageInput = z.infer<typeof UpdateTicketMessageInputSchema>;
