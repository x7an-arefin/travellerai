import { z } from 'zod';

const HotelBookingRoomBaseSchema = z.object({
  id: z.string(),
  hotelBookingId: z.string(),
  roomTypeId: z.string(),
  roomUnitId: z.string().nullable(),
  guestName: z.string(),
  nightlyRate: z.string(),
  roomNumberAssigned: z.string().nullable(),

});


export const CreateHotelBookingRoomOutputSchema = HotelBookingRoomBaseSchema;


export type CreateHotelBookingRoomOutput = z.infer<typeof CreateHotelBookingRoomOutputSchema>;
