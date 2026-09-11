import { z } from 'zod';

const BookingAddonItemBaseSchema = z.object({
  id: z.string(),
  quantity: z.number().int(),
  totalPrice: z.string(),

});


export const UpdateBookingAddonItemOutputSchema = BookingAddonItemBaseSchema;


export type UpdateBookingAddonItemOutput = z.infer<typeof UpdateBookingAddonItemOutputSchema>;
