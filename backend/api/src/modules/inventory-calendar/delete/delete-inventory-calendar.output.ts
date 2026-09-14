import { z } from 'zod';

const InventoryCalendarBaseSchema = z.object({
  id: z.string(),
  roomTypeId: z.string(),
  propertyId: z.string(),
  calendarDate: z.string(),
  totalAvailable: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteInventoryCalendarOutputSchema = InventoryCalendarBaseSchema;


export type DeleteInventoryCalendarOutput = z.infer<typeof DeleteInventoryCalendarOutputSchema>;
