import { z } from 'zod';

const BookingBaseSchema = z.object({
  id: z.string(),
  bookingReference: z.string(),
  packageId: z.string(),
  bookingStatus: z.enum(['draft', 'pending_payment', 'payment_processing', 'pending_provider_confirmation', 'confirmed', 'partially_paid', 'fully_paid', 'modification_requested', 'rescheduled', 'cancellation_requested', 'cancelled_by_traveler', 'cancelled_by_provider', 'cancelled_by_admin', 'refund_pending', 'partially_refunded', 'fully_refunded', 'in_progress', 'completed', 'no_show', 'disputed', 'expired']).nullable(),
  totalAmount: z.string(),
  paidAmount: z.string().nullable(),
  currency: z.string(),
  contactName: z.string(),

});


export const ListBookingOutputSchema = z.object({
  items: z.array(BookingBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListBookingOutput = z.infer<typeof ListBookingOutputSchema>;
