import { z } from 'zod';

const HotelBookingRoomBaseSchema = z.object({
  id: z.string(),
  hotelBookingId: z.string(),
  roomTypeId: z.string(),
  guestName: z.string(),
  nightlyRate: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteHotelBookingRoomOutputSchema = HotelBookingRoomBaseSchema;


export type DeleteHotelBookingRoomOutput = z.infer<typeof DeleteHotelBookingRoomOutputSchema>;
