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


export const ListHotelBookingRoomOutputSchema = z.object({
  items: z.array(HotelBookingRoomBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListHotelBookingRoomOutput = z.infer<typeof ListHotelBookingRoomOutputSchema>;
