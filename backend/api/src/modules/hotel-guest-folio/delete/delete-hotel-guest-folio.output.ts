import { z } from 'zod';

const HotelGuestFolioBaseSchema = z.object({
  id: z.string(),
  hotelBookingId: z.string(),
  propertyId: z.string(),
  description: z.string(),
  amount: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteHotelGuestFolioOutputSchema = HotelGuestFolioBaseSchema;


export type DeleteHotelGuestFolioOutput = z.infer<typeof DeleteHotelGuestFolioOutputSchema>;
