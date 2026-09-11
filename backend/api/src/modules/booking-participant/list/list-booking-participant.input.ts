import { z } from 'zod';


export const ListBookingParticipantInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  bookingId: z.string().optional(),

});


export type ListBookingParticipantInput = z.infer<typeof ListBookingParticipantInputSchema>;
