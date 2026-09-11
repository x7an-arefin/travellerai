import { z } from 'zod';

const BookingBaseSchema = z.object({
  id: z.string(),
  bookingReference: z.string(),
  travelerId: z.string().nullable(),
  packageId: z.string(),
  departureId: z.string().nullable(),
  bookingStatus: z.enum(['draft', 'pending_payment', 'payment_processing', 'pending_provider_confirmation', 'confirmed', 'partially_paid', 'fully_paid', 'modification_requested', 'rescheduled', 'cancellation_requested', 'cancelled_by_traveler', 'cancelled_by_provider', 'cancelled_by_admin', 'refund_pending', 'partially_refunded', 'fully_refunded', 'in_progress', 'completed', 'no_show', 'disputed', 'expired']).nullable(),
  totalAmount: z.string(),
  currency: z.string(),
  contactEmail: z.string(),

});


export const CreateBookingOutputSchema = BookingBaseSchema;


export type CreateBookingOutput = z.infer<typeof CreateBookingOutputSchema>;
