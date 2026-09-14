import { z } from 'zod';


export const GetInventoryCalendarInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetInventoryCalendarInput = z.infer<typeof GetInventoryCalendarInputSchema>;
