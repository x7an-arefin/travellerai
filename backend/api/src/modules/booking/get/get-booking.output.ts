import { z } from 'zod';

const BookingBaseSchema = z.object({
  id: z.string(),
  bookingReference: z.string(),
  travelerId: z.string().nullable(),
  packageId: z.string(),
  departureId: z.string().nullable(),
  guestEmail: z.string().nullable(),
  participantCount: z.number().int(),
  bookingStatus: z.enum(['draft', 'pending_payment', 'payment_processing', 'pending_provider_confirmation', 'confirmed', 'partially_paid', 'fully_paid', 'modification_requested', 'rescheduled', 'cancellation_requested', 'cancelled_by_traveler', 'cancelled_by_provider', 'cancelled_by_admin', 'refund_pending', 'partially_refunded', 'fully_refunded', 'in_progress', 'completed', 'no_show', 'disputed', 'expired']).nullable(),
  totalAmount: z.string(),
  paidAmount: z.string().nullable(),
  balanceDue: z.string().nullable(),
  currency: z.string(),
  contactName: z.string(),
  contactEmail: z.string(),
  contactPhone: z.string().nullable(),
  pickupLocation: z.string().nullable(),
  specialRequests: z.string().nullable(),
  qrCode: z.string().nullable(),
  voucherUrl: z.string().nullable(),
  checkinStatus: z.enum(['pending', 'checked_in', 'no_show']).nullable(),
  checkinTime: z.date().nullable(),
  confirmedAt: z.date().nullable(),
  cancelledAt: z.date().nullable(),
  completedAt: z.date().nullable(),

});


export const GetBookingOutputSchema = BookingBaseSchema;


export type GetBookingOutput = z.infer<typeof GetBookingOutputSchema>;
