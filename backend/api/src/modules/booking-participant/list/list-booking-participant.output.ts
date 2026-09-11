import { z } from 'zod';

const BookingParticipantBaseSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  nationality: z.string().nullable(),
  isPrimaryContact: z.boolean().nullable(),

});


export const ListBookingParticipantOutputSchema = z.object({
  items: z.array(BookingParticipantBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListBookingParticipantOutput = z.infer<typeof ListBookingParticipantOutputSchema>;
