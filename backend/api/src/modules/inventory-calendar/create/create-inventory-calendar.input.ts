import { z } from 'zod';


export const CreateInventoryCalendarInputSchema = z.object({
  roomTypeId: z.string().uuid(),
  propertyId: z.string().uuid(),
  calendarDate: z.string().max(10),
  totalAvailable: z.number().int().default(1),
  bookedCount: z.number().int().optional().default(0),
  blockedCount: z.number().int().optional().default(0),
  stopSell: z.boolean().optional().default(false),
  closedToArrival: z.boolean().optional().default(false),
  closedToDeparture: z.boolean().optional().default(false),
  minStayNights: z.number().int().optional().default(1),
  rateMultiplier: z.string().regex(/^\d+(\.\d+)?$/).optional().default('1.0000'),
  customBasePrice: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateInventoryCalendarInput = z.infer<typeof CreateInventoryCalendarInputSchema>;
