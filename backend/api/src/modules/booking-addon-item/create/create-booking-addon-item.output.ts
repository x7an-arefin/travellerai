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


export const CreateBookingAddonItemOutputSchema = BookingAddonItemBaseSchema;


export type CreateBookingAddonItemOutput = z.infer<typeof CreateBookingAddonItemOutputSchema>;
