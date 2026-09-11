import { z } from 'zod';


export const DeleteBookingParticipantInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteBookingParticipantInput = z.infer<typeof DeleteBookingParticipantInputSchema>;
