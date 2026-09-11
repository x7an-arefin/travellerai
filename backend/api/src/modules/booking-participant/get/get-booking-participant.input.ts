import { z } from 'zod';


export const GetBookingParticipantInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetBookingParticipantInput = z.infer<typeof GetBookingParticipantInputSchema>;
