import { z } from 'zod';

const HotelGuestFolioBaseSchema = z.object({
  id: z.string(),
  hotelBookingId: z.string(),
  propertyId: z.string(),
  roomNumber: z.string().nullable(),
  chargeType: z.enum(['minibar', 'room_service', 'laundry', 'late_checkout', 'early_checkin', 'spa', 'damage', 'parking', 'other']).nullable(),
  description: z.string(),
  amount: z.string(),
  isPaid: z.boolean().nullable(),

});


export const ListHotelGuestFolioOutputSchema = z.object({
  items: z.array(HotelGuestFolioBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListHotelGuestFolioOutput = z.infer<typeof ListHotelGuestFolioOutputSchema>;
