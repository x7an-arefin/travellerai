import { z } from 'zod';

const BookingAddonItemBaseSchema = z.object({
  id: z.string(),
  addonId: z.string(),
  quantity: z.number().int(),
  totalPrice: z.string(),
  currency: z.string(),

});


export const ListBookingAddonItemOutputSchema = z.object({
  items: z.array(BookingAddonItemBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListBookingAddonItemOutput = z.infer<typeof ListBookingAddonItemOutputSchema>;
