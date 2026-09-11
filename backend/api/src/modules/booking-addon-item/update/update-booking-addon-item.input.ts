import { z } from 'zod';


export const UpdateBookingAddonItemInputSchema = z.object({
  bookingId: z.string().uuid().optional(),
  addonId: z.string().uuid().optional(),
  quantity: z.number().int().optional(),
  unitPrice: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  totalPrice: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateBookingAddonItemInput = z.infer<typeof UpdateBookingAddonItemInputSchema>;
