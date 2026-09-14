import { z } from 'zod';


export const UpdateInventoryCalendarInputSchema = z.object({
  roomTypeId: z.string().uuid().optional(),
  propertyId: z.string().uuid().optional(),
  calendarDate: z.string().max(10).optional(),
  totalAvailable: z.number().int().optional(),
  bookedCount: z.number().int().optional(),
  blockedCount: z.number().int().optional(),
  stopSell: z.boolean().optional(),
  closedToArrival: z.boolean().optional(),
  closedToDeparture: z.boolean().optional(),
  minStayNights: z.number().int().optional(),
  rateMultiplier: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  customBasePrice: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateInventoryCalendarInput = z.infer<typeof UpdateInventoryCalendarInputSchema>;
