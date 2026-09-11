import { z } from 'zod';

const BookingAddonItemBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  addonId: z.string(),
  quantity: z.number().int(),
  unitPrice: z.string(),
  totalPrice: z.string(),
  currency: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteBookingAddonItemOutputSchema = BookingAddonItemBaseSchema;


export type DeleteBookingAddonItemOutput = z.infer<typeof DeleteBookingAddonItemOutputSchema>;
