import { z } from 'zod';

const BookingAddonItemBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  addonId: z.string(),
  quantity: z.number().int(),
  unitPrice: z.string(),
  totalPrice: z.string(),
  currency: z.string(),

});


export const GetBookingAddonItemOutputSchema = BookingAddonItemBaseSchema;


export type GetBookingAddonItemOutput = z.infer<typeof GetBookingAddonItemOutputSchema>;
