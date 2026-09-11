import { z } from 'zod';

const BookingParticipantBaseSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  dietaryRequirements: z.string().nullable(),
  accessibilityRequirements: z.string().nullable(),

});


export const UpdateBookingParticipantOutputSchema = BookingParticipantBaseSchema;


export type UpdateBookingParticipantOutput = z.infer<typeof UpdateBookingParticipantOutputSchema>;
