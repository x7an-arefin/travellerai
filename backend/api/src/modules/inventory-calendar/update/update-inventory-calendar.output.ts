import { z } from 'zod';

const InventoryCalendarBaseSchema = z.object({
  id: z.string(),
  roomTypeId: z.string(),
  propertyId: z.string(),
  calendarDate: z.string(),
  totalAvailable: z.number().int(),
  bookedCount: z.number().int().nullable(),
  stopSell: z.boolean().nullable(),
  rateMultiplier: z.string().nullable(),

});


export const UpdateInventoryCalendarOutputSchema = InventoryCalendarBaseSchema;


export type UpdateInventoryCalendarOutput = z.infer<typeof UpdateInventoryCalendarOutputSchema>;
