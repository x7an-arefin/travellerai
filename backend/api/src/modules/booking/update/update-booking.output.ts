import { z } from 'zod';

const BookingBaseSchema = z.object({
  id: z.string(),
  bookingStatus: z.enum(['draft', 'pending_payment', 'payment_processing', 'pending_provider_confirmation', 'confirmed', 'partially_paid', 'fully_paid', 'modification_requested', 'rescheduled', 'cancellation_requested', 'cancelled_by_traveler', 'cancelled_by_provider', 'cancelled_by_admin', 'refund_pending', 'partially_refunded', 'fully_refunded', 'in_progress', 'completed', 'no_show', 'disputed', 'expired']).nullable(),
  paidAmount: z.string().nullable(),
  balanceDue: z.string().nullable(),
  checkinStatus: z.enum(['pending', 'checked_in', 'no_show']).nullable(),

});


export const UpdateBookingOutputSchema = BookingBaseSchema;


export type UpdateBookingOutput = z.infer<typeof UpdateBookingOutputSchema>;
