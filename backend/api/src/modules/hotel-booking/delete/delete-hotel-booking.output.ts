import { z } from 'zod';

const HotelBookingBaseSchema = z.object({
  id: z.string(),
  bookingReference: z.string(),
  propertyId: z.string(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  totalNights: z.number().int(),
  totalRooms: z.number().int(),
  totalAdults: z.number().int(),
  totalAmount: z.string(),
  roomChargesAmount: z.string(),
  contactName: z.string(),
  contactEmail: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteHotelBookingOutputSchema = HotelBookingBaseSchema;


export type DeleteHotelBookingOutput = z.infer<typeof DeleteHotelBookingOutputSchema>;
