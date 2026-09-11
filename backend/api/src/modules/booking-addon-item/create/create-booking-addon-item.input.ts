import { z } from 'zod';


export const CreateBookingAddonItemInputSchema = z.object({
  bookingId: z.string().uuid(),
  addonId: z.string().uuid(),
  quantity: z.number().int(),
  unitPrice: z.string().regex(/^\d+(\.\d+)?$/),
  totalPrice: z.string().regex(/^\d+(\.\d+)?$/),
  currency: z.string().max(3),

});



export type CreateBookingAddonItemInput = z.infer<typeof CreateBookingAddonItemInputSchema>;
