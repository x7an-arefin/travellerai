import { z } from 'zod';

const HotelBookingBaseSchema = z.object({
  id: z.string(),
  bookingReference: z.string(),
  propertyId: z.string(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  bookingStatus: z.enum(['pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show', 'refund_pending', 'refunded']).nullable(),
  totalAmount: z.string(),
  paymentStatus: z.enum(['pending', 'authorized', 'partially_paid', 'paid', 'refunded']).nullable(),
  contactName: z.string(),

});


export const GetHotelBookingOutputSchema = HotelBookingBaseSchema;


export type GetHotelBookingOutput = z.infer<typeof GetHotelBookingOutputSchema>;
