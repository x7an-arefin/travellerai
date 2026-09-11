import { z } from 'zod';

const BookingParticipantBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  fullName: z.string(),
  isPrimaryContact: z.boolean().nullable(),

});


export const CreateBookingParticipantOutputSchema = BookingParticipantBaseSchema;


export type CreateBookingParticipantOutput = z.infer<typeof CreateBookingParticipantOutputSchema>;
