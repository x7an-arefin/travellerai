import { z } from 'zod';

const BookingParticipantBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  fullName: z.string(),
  dateOfBirth: z.date().nullable(),
  gender: z.string().nullable(),
  nationality: z.string().nullable(),
  dietaryRequirements: z.string().nullable(),
  accessibilityRequirements: z.string().nullable(),
  isPrimaryContact: z.boolean().nullable(),

});


export const GetBookingParticipantOutputSchema = BookingParticipantBaseSchema;


export type GetBookingParticipantOutput = z.infer<typeof GetBookingParticipantOutputSchema>;
