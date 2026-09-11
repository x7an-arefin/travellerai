import { z } from 'zod';

const BookingParticipantBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  fullName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteBookingParticipantOutputSchema = BookingParticipantBaseSchema;


export type DeleteBookingParticipantOutput = z.infer<typeof DeleteBookingParticipantOutputSchema>;
