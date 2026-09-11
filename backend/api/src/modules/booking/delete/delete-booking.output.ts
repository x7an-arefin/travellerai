import { z } from 'zod';

const BookingBaseSchema = z.object({
  id: z.string(),
  bookingReference: z.string(),
  packageId: z.string(),
  participantCount: z.number().int(),
  totalAmount: z.string(),
  currency: z.string(),
  contactName: z.string(),
  contactEmail: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteBookingOutputSchema = BookingBaseSchema;


export type DeleteBookingOutput = z.infer<typeof DeleteBookingOutputSchema>;
